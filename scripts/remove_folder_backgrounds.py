from pathlib import Path
from PIL import Image
import math
import colorsys
from collections import deque

files = [
    "public/folder-about.png",
    "public/folder-contact.png",
    "public/folder-experience.png",
    "public/folder-leadership.png",
    "public/folder-projects.png",
    "public/folder-resume.png",
    "public/folder-skills.png",
]

threshold = 16


def color_distance(c1, c2):
    return math.sqrt((c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2)


def is_background_color(r, g, b, bg_ref):
    if color_distance((r, g, b), bg_ref) > threshold:
        return False
    h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
    return (s < 0.12 and v > 0.92) or (s < 0.06 and v > 0.88)

for file_path in files:
    img = Image.open(file_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    seeds = []
    for x in range(w):
        seeds.append((x, 0))
        seeds.append((x, h - 1))
    for y in range(h):
        seeds.append((0, y))
        seeds.append((w - 1, y))

    corners = [pixels[0, 0], pixels[w - 1, 0], pixels[0, h - 1], pixels[w - 1, h - 1]]
    corner_colors = [c[:3] for c in corners]
    bg_ref = tuple(sum(component) / len(component) for component in zip(*corner_colors))

    visited = [[False] * h for _ in range(w)]
    background_mask = [[False] * h for _ in range(w)]
    queue = deque()

    for x, y in seeds:
        if not visited[x][y]:
            visited[x][y] = True
            queue.append((x, y))

    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        if a == 0:
            background_mask[x][y] = True
        elif is_background_color(r, g, b, bg_ref):
            background_mask[x][y] = True
            for nx, ny in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
                if 0 <= nx < w and 0 <= ny < h and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    out = Image.new("RGBA", (w, h))
    out_pixels = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if background_mask[x][y] and a > 0:
                out_pixels[x, y] = (r, g, b, 0)
            else:
                out_pixels[x, y] = (r, g, b, a)

    # Crop to the actual folder artwork by ignoring background-like pixels.
    alpha = out.split()[-1]
    content_pixels = []
    for y in range(h):
        for x in range(w):
            r, g, b, a = out_pixels[x, y]
            if a == 0:
                continue
            if not is_background_color(r, g, b, bg_ref):
                content_pixels.append((x, y))

    if content_pixels:
        xs, ys = zip(*content_pixels)
        left, upper, right, lower = min(xs), min(ys), max(xs) + 1, max(ys) + 1
    else:
        bbox = alpha.getbbox()
        left, upper, right, lower = bbox

    cropped = out.crop((left, upper, right, lower))
    w2, h2 = cropped.size
    target_size = max(w2, h2)
    square = Image.new("RGBA", (target_size, target_size), (0, 0, 0, 0))
    square.paste(cropped, ((target_size - w2) // 2, (target_size - h2) // 2))
    out = square

    output_path = Path(file_path).with_name(Path(file_path).stem + "-no-bg.png")
    out.save(output_path)
    print(f"saved {output_path}")
