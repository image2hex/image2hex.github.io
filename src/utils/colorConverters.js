/**
 * Color Conversion Utilities
 * ──────────────────────────────────────────────────────────────
 * Pixel-perfect algorithms for HEX, RGB, HSL, CMYK, HSV
 * conversions and dominant color extraction via median-cut
 * quantization on HTML5 Canvas ImageData.
 */

// ─── Clamping Helper ────────────────────────────────────────

function clamp(value, min = 0, max = 255) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

// ─── RGB → HEX ─────────────────────────────────────────────

/**
 * Converts RGB values to a 6-digit uppercase HEX string.
 * @param {number} r - Red (0–255)
 * @param {number} g - Green (0–255)
 * @param {number} b - Blue (0–255)
 * @returns {string} e.g. "#4F46E5"
 */
export function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map((c) => clamp(c).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

// ─── RGB → HSL ─────────────────────────────────────────────

/**
 * Converts RGB to HSL object.
 * @returns {{ h: number, s: number, l: number }}
 *          h ∈ [0, 360], s ∈ [0, 100], l ∈ [0, 100]
 */
export function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    // Saturation
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // Hue
    switch (max) {
      case rn:
        h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / delta + 2) * 60;
        break;
      case bn:
        h = ((rn - gn) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Formatted HSL string.
 * @returns {string} e.g. "hsl(244, 75%, 60%)"
 */
export function formatHsl(r, g, b) {
  const { h, s, l } = rgbToHsl(r, g, b);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// ─── RGB → CMYK ────────────────────────────────────────────

/**
 * Converts RGB to CMYK percentages.
 * @returns {{ c: number, m: number, y: number, k: number }}
 *          Each value ∈ [0, 100]
 */
export function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const k = 1 - Math.max(rn, gn, bn);
  const divisor = 1 - k;

  return {
    c: Math.round(((1 - rn - k) / divisor) * 100),
    m: Math.round(((1 - gn - k) / divisor) * 100),
    y: Math.round(((1 - bn - k) / divisor) * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Formatted CMYK string.
 * @returns {string} e.g. "cmyk(66%, 69%, 0%, 10%)"
 */
export function formatCmyk(r, g, b) {
  const { c, m, y, k } = rgbToCmyk(r, g, b);
  return `cmyk(${c}%, ${m}%, ${y}%, ${k}%)`;
}

// ─── RGB → HSV ─────────────────────────────────────────────

/**
 * Converts RGB to HSV object.
 * @returns {{ h: number, s: number, v: number }}
 *          h ∈ [0, 360], s ∈ [0, 100], v ∈ [0, 100]
 */
export function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / delta + (gn < bn ? 6 : 0)) * 60;
        break;
      case gn:
        h = ((bn - rn) / delta + 2) * 60;
        break;
      case bn:
        h = ((rn - gn) / delta + 4) * 60;
        break;
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

// ─── Format RGB ─────────────────────────────────────────────

/**
 * Formatted RGB string.
 * @returns {string} e.g. "rgb(79, 70, 229)"
 */
export function formatRgb(r, g, b) {
  return `rgb(${r}, ${g}, ${b})`;
}

// ─── Dominant Color Extraction (Median-Cut Quantization) ────

/**
 * Extracts dominant colors from canvas ImageData using the
 * median-cut quantization algorithm.
 *
 * Algorithm:
 * 1. Sample pixels from the image (capped at ~10 000 for speed).
 * 2. Place all samples into a single "bucket".
 * 3. Find the bucket whose color channel (R, G, or B) has the
 *    widest numeric range.
 * 4. Sort that bucket by the widest channel and split at the median.
 * 5. Repeat until we reach the target bucket count.
 * 6. Average each bucket to produce a representative color.
 * 7. Sort the final palette by luminance (dark → light).
 *
 * @param {ImageData} imageData - Canvas getImageData() result
 * @param {number}    count     - Desired palette size (default 8)
 * @returns {Array<{r: number, g: number, b: number}>}
 */
export function extractDominantColors(imageData, count = 8) {
  const data = imageData.data;
  const totalPixels = data.length / 4;
  const pixels = [];

  // Sample ≈10 000 pixels for performance on large images
  const step = Math.max(1, Math.floor(totalPixels / 10000));

  for (let i = 0; i < totalPixels; i += step) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Skip near-pure white & near-pure black for richer palettes
    if (r > 248 && g > 248 && b > 248) continue;
    if (r < 7 && g < 7 && b < 7) continue;

    pixels.push([r, g, b]);
  }

  // Fallback: neutral gray ramp if the image has no usable pixels
  if (pixels.length === 0) {
    return Array.from({ length: count }, (_, i) => {
      const v = Math.round((i / (count - 1)) * 200 + 28);
      return { r: v, g: v, b: v };
    });
  }

  // ── Median-cut ────────────────────────────────────────────
  let buckets = [pixels];

  while (buckets.length < count) {
    let maxRange = -1;
    let splitIndex = 0;
    let splitChannel = 0;

    // Find the bucket + channel with the widest range
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      if (bucket.length < 2) continue;

      for (let ch = 0; ch < 3; ch++) {
        let lo = 255;
        let hi = 0;
        for (const px of bucket) {
          if (px[ch] < lo) lo = px[ch];
          if (px[ch] > hi) hi = px[ch];
        }
        const range = hi - lo;
        if (range > maxRange) {
          maxRange = range;
          splitIndex = i;
          splitChannel = ch;
        }
      }
    }

    // No further splitting possible
    if (maxRange <= 0) break;

    // Sort by the widest channel and split at the median
    const bucket = buckets[splitIndex];
    bucket.sort((a, b) => a[splitChannel] - b[splitChannel]);

    const mid = Math.floor(bucket.length / 2);
    buckets.splice(splitIndex, 1, bucket.slice(0, mid), bucket.slice(mid));
  }

  // ── Average each bucket ──────────────────────────────────
  const colors = buckets
    .filter((b) => b.length > 0)
    .map((bucket) => {
      let rSum = 0;
      let gSum = 0;
      let bSum = 0;
      for (const px of bucket) {
        rSum += px[0];
        gSum += px[1];
        bSum += px[2];
      }
      const len = bucket.length;
      return {
        r: Math.round(rSum / len),
        g: Math.round(gSum / len),
        b: Math.round(bSum / len),
      };
    });

  // Sort by perceived luminance (BT.601): dark → light
  colors.sort((a, b) => {
    const lumA = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
    const lumB = 0.299 * b.r + 0.587 * b.g + 0.114 * b.b;
    return lumA - lumB;
  });

  return colors.slice(0, count);
}
