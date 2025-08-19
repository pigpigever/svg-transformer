# svg-transformer

English | [中文文档](./README.zh-CN.md)

A lightweight browser-side utility to convert SVG elements into images (PNG/JPEG/WebP) and download them.
Supports inline styles, automatic cropping, and configurable export parameters.

## ✨ Features
- 🚀 Zero dependencies, runs entirely in the browser

- 🎨 Inline style export to preserve visual consistency

- 📏 Customizable padding, scale, width, height

- 📂 Supports multiple image formats: image/png, image/jpeg, image/webp

- 🛠 Flexible API — global default options with per-call overrides

---

## 📦 Installation

```bash
npm install svg-transformer
# or
yarn add svg-transformer
# or
pnpm add svg-transformer
```

## 🛠 Usage Examples
### 1. Create an exporter with default options

```typescript
import createSvgExporter from 'svg-transformer';

const svgTransformer = createSvgExporter({
  fileType: 'image/png',  // export format
  fileName: 'chart.png',  // download file name
  quality: 1,             // image quality (JPEG/WebP only)
  style: {
    width: 800,           // export width
    height: 600,          // export height
    padding: 20           // inner padding
  }
});
```

### 2. Export an SVG to an image and download it

```typescript
const svgElement = document.querySelector('svg')!;
svgTransformer.exportSvg2Img(svgElement);
```

### 3. Override default options for a single call

```typescript
svgTransformer.exportSvg2Img(svgElement, {
  fileType: 'image/jpeg',
  quality: 0.8,
  fileName: 'chart.jpg'
});
```

### 4. Download the original SVG file only

```typescript
svgTransformer.downloadSvg(svgElement, 'original.svg');
```

## 📄 API
`createSvgExporter(defaultOptions: SvgTransformerOptions)`
Creates an exporter instance with default settings.

`SvgTransformerOptions`

| Parameter     | Type     | Required | Description                                                       |
| ------------- | -------- | -------- | ----------------------------------------------------------------- |
| fileType      | `string` | ✅        | Image export type (e.g., `image/png`, `image/jpeg`, `image/webp`) |
| fileName      | `string` | ✅        | Exported file name (with extension)                               |
| quality       | `number` | ❌        | Image quality (0–1, for JPEG/WebP only)                           |
| style         | `object` | ❌        | Style settings                                                    |
| style.width   | `number` | ❌        | Image width in pixels                                             |
| style.height  | `number` | ❌        | Image height in pixels                                            |
| style.padding | `number` | ❌        | Padding in pixels                                                 |


### Returned Methods

- `exportSvg2Img(svgElement, options?)`  
  Converts an SVG element into an image and triggers a download.
  options will override the default settings.

- `downloadSvg(svgElement, fileName)`  
  Downloads the given SVG element as a .svg file.

- `generateImageUrlFromSvg(svgElement, options?)`  
  Converts an SVG element into an image and returns its Base64 URL without downloading.