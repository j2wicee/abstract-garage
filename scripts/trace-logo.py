"""Trace the logo image into outline data for the 3D hero.

The logo's front faces are solid black with blue extruded sides, so the black
regions are the shapes we want. Each connected black region becomes one piece
of the 3D logo (the gear, plus the A and G fragments between overlaps). The
wordmark text is small and gets filtered out by area.

Usage (needs numpy and opencv-python-headless):
    python scripts/trace-logo.py design/logo-source.jpg src/data/logo-shapes.json

Re-run this if a cleaner logo file becomes available. A high-resolution PNG
or an export of the original vector art will give sharper edges.
"""

import json
import sys

import cv2
import numpy as np

MIN_PIECE_AREA = 5000  # px; the wordmark letters are ~1500
SIMPLIFY_PX = 1.2  # polygon simplification tolerance
TARGET_WIDTH = 4.0  # width of the whole logo in scene units


def main(src, out):
    img = cv2.imread(src)
    b, g, r = [img[:, :, i].astype(int) for i in range(3)]
    black = ((r < 80) & (g < 80) & (b < 80)).astype(np.uint8)

    n, labels, stats, _ = cv2.connectedComponentsWithStats(black, connectivity=4)
    ids = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] >= MIN_PIECE_AREA]
    # Largest first, so piece 0 is the gear
    ids.sort(key=lambda i: -stats[i, cv2.CC_STAT_AREA])

    kernel = np.ones((3, 3), np.uint8)
    pieces = []
    for i in ids:
        # Grow slightly to recover anti-aliased edge pixels
        mask = cv2.dilate((labels == i).astype(np.uint8), kernel, iterations=1)
        contours, hierarchy = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
        hierarchy = hierarchy[0]
        outer = max(
            (k for k in range(len(contours)) if hierarchy[k][3] == -1),
            key=lambda k: cv2.contourArea(contours[k]),
        )
        holes = [
            k for k in range(len(contours))
            if hierarchy[k][3] == outer and cv2.contourArea(contours[k]) > 50
        ]
        simplify = lambda c: cv2.approxPolyDP(c, SIMPLIFY_PX, True).reshape(-1, 2).tolist()
        pieces.append({
            "outline": simplify(contours[outer]),
            "holes": [simplify(contours[k]) for k in holes],
        })

    # Normalize: center on the logo, scale to TARGET_WIDTH, flip y to point up
    pts = np.array([p for piece in pieces for p in piece["outline"]], dtype=float)
    lo, hi = pts.min(axis=0), pts.max(axis=0)
    center = (lo + hi) / 2
    scale = TARGET_WIDTH / (hi - lo)[0]

    def norm(path):
        return [[round((x - center[0]) * scale, 4), round((center[1] - y) * scale, 4)] for x, y in path]

    data = {
        "source": src.replace("\\", "/").split("/")[-1],
        "width": TARGET_WIDTH,
        "height": round(float((hi - lo)[1] * scale), 4),
        "pieces": [
            {"outline": norm(p["outline"]), "holes": [norm(h) for h in p["holes"]]}
            for p in pieces
        ],
    }
    with open(out, "w") as f:
        json.dump(data, f, separators=(",", ":"))
    total = sum(len(p["outline"]) + sum(len(h) for h in p["holes"]) for p in pieces)
    print(f"{len(pieces)} pieces, {total} points -> {out}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
