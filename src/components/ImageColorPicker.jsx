import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload, ZoomIn, ZoomOut, RotateCcw, Copy, Check,
  Pipette, Download, Trash2, X,
  Palette, Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  rgbToHex, formatRgb, formatHsl, formatCmyk,
  extractDominantColors,
} from '../utils/colorConverters';
import { cn } from '../utils/cn';

/* ═══════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════ */

const LOUPE_RADIUS = 5;
const LOUPE_CELL   = 12;
const LOUPE_SIZE   = LOUPE_RADIUS * 2 + 1;   // 11
const LOUPE_PX     = LOUPE_SIZE * LOUPE_CELL; // 132

const MAX_HISTORY = 30;
const ZOOM_MIN    = 0.25;
const ZOOM_MAX    = 8;
const ZOOM_STEP   = 0.25;
const PAN_THRESHOLD = 3;

const DEFAULT_I18N = {
  dropzoneTitle: 'Drop an image here, click to browse, or',
  dropzonePaste: 'paste (Ctrl+V / Cmd+V)',
  dropzoneSubtitle: 'PNG, JPG, WEBP, SVG supported',
  trySample: 'Try a sample:',
  sampleSunset: 'Sunset',
  sampleArchitecture: 'Architecture',
  sampleGradient: 'Gradient',
  newImage: 'New Image',
  zoomOut: 'Zoom Out',
  zoomIn: 'Zoom In',
  resetView: 'Reset View',
  pickFromScreen: 'Pick from Screen',
  dominantPaletteTitle: 'Dominant Palette',
  copySuccess: 'copied!',
  recentColorsTitle: 'Recent Colors',
  exportLabel: 'Export',
  exportCss: 'CSS Variables',
  exportJson: 'JSON',
  exportTxt: 'Plain Text',
  exportSuccess: 'Exported as',
  clearHistory: 'Clear history',
};

/* ═══════════════════════════════════════════════════════════
   Programmatic Sample-Image Generator (Canvas API)
   ═══════════════════════════════════════════════════════════ */

function generateSampleImage(type) {
  const c = document.createElement('canvas');
  c.width = 480;
  c.height = 320;
  const ctx = c.getContext('2d');

  if (type === 'sunset') {
    const g = ctx.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, '#0f0c29');
    g.addColorStop(0.22, '#302b63');
    g.addColorStop(0.42, '#b91c1c');
    g.addColorStop(0.58, '#ea580c');
    g.addColorStop(0.78, '#f59e0b');
    g.addColorStop(1, '#fde68a');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 480, 320);

    const s = ctx.createRadialGradient(240, 185, 4, 240, 185, 55);
    s.addColorStop(0, 'rgba(255,247,230,0.92)');
    s.addColorStop(0.45, 'rgba(251,191,36,0.35)');
    s.addColorStop(1, 'rgba(234,88,12,0)');
    ctx.fillStyle = s;
    ctx.beginPath();
    ctx.arc(240, 185, 55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, 212, 480, 2);
  } else if (type === 'architecture') {
    ctx.fillStyle = '#e8e4df';
    ctx.fillRect(0, 0, 480, 320);
    const blocks = [
      [10, 10, 140, 100, '#2c3e50'], [160, 10, 100, 140, '#7f8c8d'],
      [270, 10, 90, 90, '#3498db'],  [370, 10, 100, 130, '#bdc3c7'],
      [10, 120, 100, 90, '#95a5a6'], [120, 160, 130, 80, '#34495e'],
      [10, 220, 200, 90, '#c0392b'], [220, 110, 80, 80, '#d5c4a1'],
      [310, 150, 160, 70, '#1abc9c'],[260, 230, 100, 80, '#8e44ad'],
      [370, 230, 100, 80, '#2980b9'],
    ];
    for (const [x, y, w, h, color] of blocks) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
  } else {
    const g = ctx.createLinearGradient(0, 0, 480, 320);
    g.addColorStop(0, '#667eea');
    g.addColorStop(0.2, '#764ba2');
    g.addColorStop(0.4, '#f093fb');
    g.addColorStop(0.6, '#f5576c');
    g.addColorStop(0.8, '#fda085');
    g.addColorStop(1, '#ffecd2');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 480, 320);
  }

  return c.toDataURL('image/png');
}

/* ═══════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════ */

function contrastText(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b > 128 ? '#1e293b' : '#ffffff';
}

function getTouchDistance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

/* ═══════════════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════════════ */

export default function ImageColorPicker({ i18n = DEFAULT_I18N }) {
  const t = { ...DEFAULT_I18N, ...i18n };

  /* ─── State ──────────────────────────────────────────── */
  const [image, setImage]                 = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [hoveredColor, setHoveredColor]   = useState(null);
  const [dominantPalette, setDominantPalette] = useState([]);
  const [colorHistory, setColorHistory]   = useState([]);
  const [zoom, setZoom]                   = useState(1);
  const [pan, setPan]                     = useState({ x: 0, y: 0 });
  const [showLoupe, setShowLoupe]         = useState(false);
  const [loupePos, setLoupePos]           = useState({ x: 0, y: 0 });
  const [isDragOver, setIsDragOver]       = useState(false);
  const [toastMessage, setToastMessage]   = useState('');
  const [copiedFormat, setCopiedFormat]   = useState(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  /* ─── Refs ───────────────────────────────────────────── */
  const canvasRef          = useRef(null);
  const loupeCanvasRef     = useRef(null);
  const canvasContainerRef = useRef(null);
  const imageRef           = useRef(null);
  const imageDataRef       = useRef(null);
  const transformRef       = useRef({ drawX: 0, drawY: 0, totalScale: 1, fitScale: 1 });
  const fileInputRef       = useRef(null);
  const panStartRef        = useRef(null);
  const hasDraggedRef      = useRef(false);
  const toastTimerRef      = useRef(null);
  const zoomRef            = useRef(1);
  const panRef             = useRef({ x: 0, y: 0 });
  const touchPinchDistRef  = useRef(null);
  const touchStartZoomRef  = useRef(1);

  // Keep refs in sync with state
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { panRef.current = pan; }, [pan]);

  /* ─── Feature Detection ──────────────────────────────── */
  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  const samples = [
    {
      id: 'sunset',
      name: t.sampleSunset,
      emoji: '🌅',
      bg: 'linear-gradient(to bottom, #0f0c29, #302b63, #e74c3c, #f39c12, #f1c40f)',
    },
    {
      id: 'architecture',
      name: t.sampleArchitecture,
      emoji: '🏛️',
      bg: 'linear-gradient(135deg, #2c3e50 25%, #bdc3c7 50%, #3498db 75%, #c0392b)',
    },
    {
      id: 'gradient',
      name: t.sampleGradient,
      emoji: '🎨',
      bg: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c, #fda085)',
    },
  ];

  /* ─── Canvas Drawing ─────────────────────────────────── */
  const redraw = useCallback(() => {
    const canvas    = canvasRef.current;
    const img       = imageRef.current;
    const container = canvasContainerRef.current;
    if (!canvas || !img || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width  = Math.round(rect.width);
    canvas.height = Math.round(rect.height);

    const ctx = canvas.getContext('2d');

    // Check dark mode
    const isDark = document.documentElement.classList.contains('dark');
    ctx.fillStyle = isDark ? '#090d16' : '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fit-scale & transforms
    const z = zoomRef.current;
    const p = panRef.current;
    const fitScale  = Math.min(canvas.width / img.width, canvas.height / img.height);
    const totalScale = fitScale * z;
    const drawX = (canvas.width  - img.width  * totalScale) / 2 + p.x;
    const drawY = (canvas.height - img.height * totalScale) / 2 + p.y;

    ctx.imageSmoothingEnabled = z <= 2;
    ctx.drawImage(img, drawX, drawY, img.width * totalScale, img.height * totalScale);

    transformRef.current = { drawX, drawY, totalScale, fitScale };
  }, []);

  /* ─── Pixel Helpers ──────────────────────────────────── */
  const getPixelAt = (x, y) => {
    const d = imageDataRef.current;
    if (!d || x < 0 || y < 0 || x >= d.width || y >= d.height) return null;
    const i = (y * d.width + x) * 4;
    return { r: d.data[i], g: d.data[i + 1], b: d.data[i + 2] };
  };

  const canvasToImage = (cx, cy) => {
    const { drawX, drawY, totalScale } = transformRef.current;
    if (!totalScale || totalScale <= 0) return { imgX: 0, imgY: 0 };
    return {
      imgX: Math.floor((cx - drawX) / totalScale),
      imgY: Math.floor((cy - drawY) / totalScale),
    };
  };

  /* ─── Loupe Drawing ──────────────────────────────────── */
  const drawLoupe = (imgX, imgY) => {
    const lc = loupeCanvasRef.current;
    if (!lc) return;
    const ctx = lc.getContext('2d');
    const d = imageDataRef.current;
    if (!d) return;

    lc.width  = LOUPE_PX;
    lc.height = LOUPE_PX;

    for (let dy = -LOUPE_RADIUS; dy <= LOUPE_RADIUS; dy++) {
      for (let dx = -LOUPE_RADIUS; dx <= LOUPE_RADIUS; dx++) {
        const px = imgX + dx;
        const py = imgY + dy;
        const cellX = (dx + LOUPE_RADIUS) * LOUPE_CELL;
        const cellY = (dy + LOUPE_RADIUS) * LOUPE_CELL;

        if (px >= 0 && px < d.width && py >= 0 && py < d.height) {
          const i = (py * d.width + px) * 4;
          ctx.fillStyle = `rgb(${d.data[i]},${d.data[i + 1]},${d.data[i + 2]})`;
        } else {
          ctx.fillStyle = '#cbd5e1';
        }
        ctx.fillRect(cellX, cellY, LOUPE_CELL, LOUPE_CELL);

        // Grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(cellX + 0.25, cellY + 0.25, LOUPE_CELL - 0.5, LOUPE_CELL - 0.5);
      }
    }

    // Center-pixel crosshair
    const cc = LOUPE_RADIUS * LOUPE_CELL;
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = 1;
    ctx.strokeRect(cc - 0.5, cc - 0.5, LOUPE_CELL + 1, LOUPE_CELL + 1);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(cc + 1, cc + 1, LOUPE_CELL - 2, LOUPE_CELL - 2);
  };

  /* ─── Image Loading ──────────────────────────────────── */
  const loadImage = (src) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;

      const hc = document.createElement('canvas');
      hc.width = img.width;
      hc.height = img.height;
      const hctx = hc.getContext('2d');
      hctx.drawImage(img, 0, 0);
      const fullData = hctx.getImageData(0, 0, img.width, img.height);
      imageDataRef.current = fullData;

      const palette = extractDominantColors(fullData, 8);
      setDominantPalette(palette);

      if (palette.length > 0) setSelectedColor(palette[0]);

      setZoom(1);
      setPan({ x: 0, y: 0 });
      zoomRef.current = 1;
      panRef.current = { x: 0, y: 0 };

      setImage(img);
    };
    img.src = src;
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    loadImage(URL.createObjectURL(file));
  };

  const loadSample = (type) => {
    const dataUrl = generateSampleImage(type);
    loadImage(dataUrl);
  };

  const handleNewImage = () => {
    setImage(null);
    setSelectedColor(null);
    setHoveredColor(null);
    setDominantPalette([]);
    setShowLoupe(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    imageRef.current = null;
    imageDataRef.current = null;
  };

  /* ─── Color Operations ───────────────────────────────── */
  const selectColor = (color, addToHistory = true) => {
    setSelectedColor(color);
    if (addToHistory) {
      setColorHistory((prev) => {
        const hex = rgbToHex(color.r, color.g, color.b);
        const filtered = prev.filter((c) => rgbToHex(c.r, c.g, c.b) !== hex);
        return [color, ...filtered].slice(0, MAX_HISTORY);
      });
    }
  };

  const showToast = (msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(msg);
    toastTimerRef.current = setTimeout(() => setToastMessage(''), 2500);
  };

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    setCopiedFormat(label);
    setTimeout(() => setCopiedFormat(null), 1500);
    showToast(`${label} ${t.copySuccess}`);

    confetti({
      particleCount: 25,
      spread: 40,
      startVelocity: 15,
      gravity: 1.2,
      scalar: 0.7,
      ticks: 40,
      origin: { y: 0.85 },
      colors: ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'],
      disableForReducedMotion: true,
    });
  };

  const handleEyeDropper = async () => {
    if (!hasEyeDropper) return;
    try {
      const dropper = new window.EyeDropper();
      const result = await dropper.open();
      const hex = result.sRGBHex;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      selectColor({ r, g, b }, true);
    } catch {
      /* user cancelled */
    }
  };

  /* ─── Export Palette ─────────────────────────────────── */
  const exportPalette = (format) => {
    const colors = colorHistory;
    let content, filename, mime;

    if (format === 'json') {
      content = JSON.stringify(
        colors.map((c) => ({
          hex: rgbToHex(c.r, c.g, c.b),
          rgb: formatRgb(c.r, c.g, c.b),
          hsl: formatHsl(c.r, c.g, c.b),
          cmyk: formatCmyk(c.r, c.g, c.b),
        })),
        null,
        2,
      );
      filename = 'palette.json';
      mime = 'application/json';
    } else if (format === 'css') {
      content =
        ':root {\n' +
        colors
          .map((c, i) => `  --color-${i + 1}: ${rgbToHex(c.r, c.g, c.b)};`)
          .join('\n') +
        '\n}';
      filename = 'palette.css';
      mime = 'text/css';
    } else {
      content = colors
        .map(
          (c) =>
            `${rgbToHex(c.r, c.g, c.b)}  ${formatRgb(c.r, c.g, c.b)}  ${formatHsl(c.r, c.g, c.b)}`,
        )
        .join('\n');
      filename = 'palette.txt';
      mime = 'text/plain';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setShowExportMenu(false);
    showToast(`${t.exportSuccess} ${format.toUpperCase()}`);
  };

  /* ─── Zoom Helpers ───────────────────────────────────── */
  const zoomIn  = () => setZoom((z) => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)));
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  /* ─── Mouse Handlers ─────────────────────────────────── */
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (panStartRef.current) {
      const dx = e.clientX - panStartRef.current.clientX;
      const dy = e.clientY - panStartRef.current.clientY;
      if (Math.abs(dx) > PAN_THRESHOLD || Math.abs(dy) > PAN_THRESHOLD) {
        hasDraggedRef.current = true;
      }
      if (hasDraggedRef.current) {
        setPan({
          x: panStartRef.current.panX + dx,
          y: panStartRef.current.panY + dy,
        });
      }
    }

    const { imgX, imgY } = canvasToImage(mouseX, mouseY);
    const img = imageRef.current;
    const inBounds = imgX >= 0 && imgY >= 0 && imgX < img.width && imgY < img.height;

    if (inBounds) {
      const px = getPixelAt(imgX, imgY);
      if (px) setHoveredColor(px);

      drawLoupe(imgX, imgY);
      setShowLoupe(true);

      const container = canvasContainerRef.current;
      const cRect = container ? container.getBoundingClientRect() : rect;
      const cW = cRect.width;
      const loupeW = LOUPE_PX + 8;
      const loupeH = LOUPE_PX + 34;
      const off = 24;

      let lx = mouseX + off;
      let ly = mouseY - loupeH - 10;
      if (lx + loupeW > cW) lx = mouseX - loupeW - off + 8;
      if (ly < 4) ly = mouseY + off;
      if (lx < 4) lx = 4;

      setLoupePos({ x: lx, y: ly });
    } else {
      setShowLoupe(false);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    panStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
    };
    hasDraggedRef.current = false;
  };

  const handleMouseUp = (e) => {
    if (!hasDraggedRef.current && canvasRef.current && imageRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const { imgX, imgY } = canvasToImage(mouseX, mouseY);
      const px = getPixelAt(imgX, imgY);
      if (px) selectColor(px, true);
    }
    panStartRef.current = null;
    hasDraggedRef.current = false;
  };

  const handleMouseLeave = () => {
    setShowLoupe(false);
    panStartRef.current = null;
    hasDraggedRef.current = false;
  };

  /* ─── Touch Handlers (1-finger pan/tap + 2-finger pinch zoom) ──── */
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      panStartRef.current = {
        clientX: touch.clientX,
        clientY: touch.clientY,
        panX: panRef.current.x,
        panY: panRef.current.y,
      };
      hasDraggedRef.current = false;

      // Show loupe above the touch
      const canvas = canvasRef.current;
      if (canvas && imageRef.current) {
        const rect = canvas.getBoundingClientRect();
        const tx = touch.clientX - rect.left;
        const ty = touch.clientY - rect.top;
        const { imgX, imgY } = canvasToImage(tx, ty);
        const px = getPixelAt(imgX, imgY);
        if (px) {
          setHoveredColor(px);
          drawLoupe(imgX, imgY);
          setShowLoupe(true);

          let lx = tx - LOUPE_PX / 2;
          let ly = ty - LOUPE_PX - 50; // Position comfortably above finger
          if (ly < 10) ly = ty + 40;
          if (lx < 10) lx = 10;
          if (lx + LOUPE_PX > rect.width - 10) lx = rect.width - LOUPE_PX - 10;

          setLoupePos({ x: lx, y: ly });
        }
      }
    } else if (e.touches.length === 2) {
      // 2-finger pinch zoom start
      touchPinchDistRef.current = getTouchDistance(e.touches[0], e.touches[1]);
      touchStartZoomRef.current = zoomRef.current;
      setShowLoupe(false);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && panStartRef.current) {
      const touch = e.touches[0];
      const dx = touch.clientX - panStartRef.current.clientX;
      const dy = touch.clientY - panStartRef.current.clientY;

      if (Math.abs(dx) > PAN_THRESHOLD || Math.abs(dy) > PAN_THRESHOLD) {
        hasDraggedRef.current = true;
      }

      if (hasDraggedRef.current) {
        setPan({
          x: panStartRef.current.panX + dx,
          y: panStartRef.current.panY + dy,
        });
      }

      // Update loupe position as finger moves
      const canvas = canvasRef.current;
      if (canvas && imageRef.current) {
        const rect = canvas.getBoundingClientRect();
        const tx = touch.clientX - rect.left;
        const ty = touch.clientY - rect.top;
        const { imgX, imgY } = canvasToImage(tx, ty);
        const px = getPixelAt(imgX, imgY);
        if (px) {
          setHoveredColor(px);
          drawLoupe(imgX, imgY);
          setShowLoupe(true);

          let lx = tx - LOUPE_PX / 2;
          let ly = ty - LOUPE_PX - 50;
          if (ly < 10) ly = ty + 40;
          if (lx < 10) lx = 10;
          if (lx + LOUPE_PX > rect.width - 10) lx = rect.width - LOUPE_PX - 10;

          setLoupePos({ x: lx, y: ly });
        } else {
          setShowLoupe(false);
        }
      }
    } else if (e.touches.length === 2 && touchPinchDistRef.current) {
      // Pinch zooming
      e.preventDefault();
      const currentDist = getTouchDistance(e.touches[0], e.touches[1]);
      const factor = currentDist / touchPinchDistRef.current;
      const newZoom = +(touchStartZoomRef.current * factor).toFixed(2);
      setZoom(Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom)));
    }
  };

  const handleTouchEnd = (e) => {
    if (!hasDraggedRef.current && e.changedTouches.length === 1 && canvasRef.current && imageRef.current) {
      const touch = e.changedTouches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      const { imgX, imgY } = canvasToImage(touch.clientX - rect.left, touch.clientY - rect.top);
      const px = getPixelAt(imgX, imgY);
      if (px) selectColor(px, true);
    }

    if (e.touches.length === 0) {
      panStartRef.current = null;
      hasDraggedRef.current = false;
      touchPinchDistRef.current = null;
      setShowLoupe(false);
    }
  };

  /* ─── Drag-and-Drop ──────────────────────────────────── */
  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  /* ─── Effects ────────────────────────────────────────── */

  useEffect(() => {
    const onPaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          handleFile(item.getAsFile());
          return;
        }
      }
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);

  useEffect(() => {
    if (image) redraw();
  }, [image, zoom, pan, redraw]);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      if (imageRef.current) redraw();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [redraw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoom((z) => {
        const next = +(z + delta).toFixed(2);
        return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, next));
      });
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, [image]);

  useEffect(() => {
    if (!showExportMenu) return;
    const close = () => setShowExportMenu(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [showExportMenu]);

  /* ─── Computed Values ────────────────────────────────── */
  const colorFormats = selectedColor
    ? [
        { label: 'HEX',  value: rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) },
        { label: 'RGB',  value: formatRgb(selectedColor.r, selectedColor.g, selectedColor.b) },
        { label: 'HSL',  value: formatHsl(selectedColor.r, selectedColor.g, selectedColor.b) },
        { label: 'CMYK', value: formatCmyk(selectedColor.r, selectedColor.g, selectedColor.b) },
      ]
    : [];

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */
  return (
    <div className="space-y-4">

      {/* ── Toast Notification ─────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 right-3 sm:right-4 z-[100] animate-slide-up max-w-[90vw]">
          <div className="bg-slate-900 dark:bg-slate-800 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700">
            <Check size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          DROPZONE (no image loaded)
          ═══════════════════════════════════════════════════ */}
      {!image && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-8 animate-fade-in transition-colors duration-200">
          {/* Drop area */}
          <div
            className={cn(
              'border-2 border-dashed rounded-xl p-6 sm:p-14 text-center cursor-pointer transition-all duration-200',
              isDragOver
                ? 'border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/40',
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload
              className={cn(
                'mx-auto h-8 w-8 sm:h-10 sm:w-10 mb-3 sm:mb-4 transition-colors',
                isDragOver ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500',
              )}
              strokeWidth={1.5}
            />
            <p className="text-slate-700 dark:text-slate-200 font-medium text-sm sm:text-base leading-snug">
              {t.dropzoneTitle}{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold block sm:inline mt-1 sm:mt-0">{t.dropzonePaste}</span>
            </p>
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1.5">
              {t.dropzoneSubtitle}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
                e.target.value = '';
              }}
            />
          </div>

          {/* Sample images */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 justify-center">
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{t.trySample}</span>
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
              {samples.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSample(s.id)}
                  className="group flex flex-col items-center gap-1 sm:gap-1.5 focus:outline-none cursor-pointer"
                >
                  <div
                    className="w-14 h-10 sm:w-16 sm:h-12 rounded-lg shadow-xs border border-slate-200 dark:border-slate-700 group-hover:shadow-md group-hover:scale-105 transition-all duration-200"
                    style={{ background: s.bg }}
                  />
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
                    {s.emoji} {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          CANVAS WORKSPACE (image loaded)
          ═══════════════════════════════════════════════════ */}
      {image && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden animate-fade-in transition-colors duration-200">
          {/* Responsive Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90">
            {/* Left: New Image */}
            <button
              onClick={handleNewImage}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 sm:bg-transparent dark:sm:bg-transparent border border-slate-200 dark:border-slate-700 sm:border-transparent dark:sm:border-transparent px-2.5 py-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={14} className="flex-shrink-0" />
              <span>{t.newImage}</span>
            </button>

            {/* Right: Zoom + EyeDropper */}
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
              <div className="inline-flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 shadow-2xs">
                <button
                  onClick={zoomOut}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title={t.zoomOut}
                  aria-label={t.zoomOut}
                >
                  <ZoomOut size={15} />
                </button>
                <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 font-mono w-10 sm:w-12 text-center select-none font-medium">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  title={t.zoomIn}
                  aria-label={t.zoomIn}
                >
                  <ZoomIn size={15} />
                </button>
                <button
                  onClick={resetView}
                  className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border-l border-slate-100 dark:border-slate-700 ml-0.5 cursor-pointer"
                  title={t.resetView}
                  aria-label={t.resetView}
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {hasEyeDropper && (
                <button
                  onClick={handleEyeDropper}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100/90 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors shadow-2xs cursor-pointer"
                  title={t.pickFromScreen}
                >
                  <Pipette size={14} className="flex-shrink-0" />
                  <span className="hidden md:inline">{t.pickFromScreen}</span>
                </button>
              )}
            </div>
          </div>

          {/* Canvas Area (Responsive heights across devices) */}
          <div
            ref={canvasContainerRef}
            className="relative h-[260px] xs:h-[320px] sm:h-[420px] md:h-[480px] select-none touch-none bg-slate-100 dark:bg-slate-950"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair block"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />

            {/* Magnifying Loupe */}
            {showLoupe && hoveredColor && (
              <div
                className="absolute pointer-events-none z-30 transition-transform duration-75"
                style={{ left: loupePos.x, top: loupePos.y }}
              >
                <div
                  className="rounded-full border-[3px] border-white shadow-2xl overflow-hidden bg-slate-900"
                  style={{ width: LOUPE_PX, height: LOUPE_PX }}
                >
                  <canvas
                    ref={loupeCanvasRef}
                    width={LOUPE_PX}
                    height={LOUPE_PX}
                    className="block"
                  />
                </div>
                {/* Real-time HEX Badge */}
                <div className="mt-1.5 flex justify-center">
                  <span className="bg-slate-900/95 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md shadow-lg border border-white/20">
                    {rgbToHex(hoveredColor.r, hoveredColor.g, hoveredColor.b)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          DOMINANT PALETTE (Responsive Grid)
          ═══════════════════════════════════════════════════ */}
      {image && dominantPalette.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 animate-fade-in transition-colors duration-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">
            <Palette size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            {t.dominantPaletteTitle}
          </div>
          <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
            {dominantPalette.map((c, i) => {
              const hex = rgbToHex(c.r, c.g, c.b);
              const isActive =
                selectedColor &&
                rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) === hex;
              return (
                <button
                  key={i}
                  onClick={() => selectColor(c, false)}
                  className={cn(
                    'group relative w-full sm:flex-1 sm:min-w-[48px] sm:max-w-[84px] h-11 sm:h-14 rounded-xl transition-all duration-200 border-2 shadow-2xs cursor-pointer',
                    isActive
                      ? 'border-indigo-600 dark:border-indigo-400 shadow-md scale-[1.03] ring-2 ring-indigo-200 dark:ring-indigo-900'
                      : 'border-black/5 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-[1.03]',
                  )}
                  style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                  title={hex}
                  aria-label={`Select dominant color ${hex}`}
                >
                  <span className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded shadow-xs border border-slate-100 dark:border-slate-700">
                    {hex}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          COLOR INSPECTOR
          ═══════════════════════════════════════════════════ */}
      {selectedColor && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-6 animate-fade-in transition-colors duration-200">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Large Swatch Preview */}
            <div
              className="w-full sm:w-32 h-20 sm:h-auto sm:min-h-[120px] rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-inner flex-shrink-0 flex items-center justify-center transition-colors duration-200 p-2"
              style={{
                backgroundColor: `rgb(${selectedColor.r},${selectedColor.g},${selectedColor.b})`,
              }}
            >
              <span
                className="font-mono text-sm sm:text-base font-bold px-2 py-0.5 rounded-md backdrop-blur-xs bg-black/20 shadow-xs"
                style={{ color: contrastText(selectedColor.r, selectedColor.g, selectedColor.b) }}
              >
                {rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)}
              </span>
            </div>

            {/* Code Cards Grid */}
            <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-2.5">
              {colorFormats.map((fmt) => (
                <div
                  key={fmt.label}
                  className="flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl px-3.5 py-2.5 border border-slate-200/60 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-colors group"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                      {fmt.label}
                    </span>
                    <p className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-semibold mt-0.5 truncate select-all">
                      {fmt.value}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(fmt.value, fmt.label)}
                    className="p-2 sm:p-2.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200/80 dark:border-slate-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-500 dark:text-slate-300 shadow-2xs transition-all active:scale-90 flex-shrink-0 cursor-pointer"
                    title={`Copy ${fmt.label}`}
                    aria-label={`Copy ${fmt.label} code`}
                  >
                    {copiedFormat === fmt.label ? (
                      <Check size={15} className="text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          COLOR HISTORY
          ═══════════════════════════════════════════════════ */}
      {colorHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 sm:p-5 animate-fade-in transition-colors duration-200">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Clock size={16} className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <span>{t.recentColorsTitle}</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">({colorHistory.length})</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Export Dropdown */}
              <div
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowExportMenu((v) => !v)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors border border-slate-200/60 dark:border-slate-700 cursor-pointer"
                  aria-label="Export color palette"
                >
                  <Download size={13} className="flex-shrink-0" />
                  <span>{t.exportLabel}</span>
                </button>
                {showExportMenu && (
                  <div className="absolute bottom-full right-0 mb-1.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 min-w-[150px] z-50 animate-scale-in">
                    <button
                      onClick={() => exportPalette('css')}
                      className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer"
                    >
                      {t.exportCss}
                    </button>
                    <button
                      onClick={() => exportPalette('json')}
                      className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer"
                    >
                      {t.exportJson}
                    </button>
                    <button
                      onClick={() => exportPalette('txt')}
                      className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium cursor-pointer"
                    >
                      {t.exportTxt}
                    </button>
                  </div>
                )}
              </div>

              {/* Clear button */}
              <button
                onClick={() => setColorHistory([])}
                className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                title={t.clearHistory}
                aria-label={t.clearHistory}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Swatch row with touch momentum scrolling */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {colorHistory.map((c, i) => {
              const hex = rgbToHex(c.r, c.g, c.b);
              const isActive =
                selectedColor &&
                rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b) === hex;
              return (
                <button
                  key={`${hex}-${i}`}
                  onClick={() => selectColor(c, false)}
                  className={cn(
                    'w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex-shrink-0 transition-all duration-150 border-2 shadow-2xs cursor-pointer',
                    isActive
                      ? 'border-indigo-600 dark:border-indigo-400 scale-110 shadow-sm ring-2 ring-indigo-200 dark:ring-indigo-900'
                      : 'border-black/5 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-110',
                  )}
                  style={{ backgroundColor: `rgb(${c.r},${c.g},${c.b})` }}
                  title={hex}
                  aria-label={`Select color ${hex}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
