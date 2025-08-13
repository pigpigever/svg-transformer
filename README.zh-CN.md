# svg2img

[English](./README.md) | 中文文档

一个将 **SVG 元素** 转换为图片（PNG/JPEG/WebP）并下载的轻量级浏览器端工具。  
支持内联样式、自动裁剪、可配置导出参数。

## ✨ 特性
- 🚀 **零依赖**，纯浏览器端运行
- 🎨 **内联样式导出**，保证样式一致性
- 📏 支持 `padding`、`scale`、`width`、`height` 等自定义
- 📂 导出多种图片格式：`image/png`、`image/jpeg`、`image/webp`
- 🛠 灵活 API，支持全局默认配置 + 单次调用覆盖

---

## 📦 安装

```bash
npm install svg2img
# 或
yarn add svg2img
# 或
pnpm add svg2img
```

## 🛠 使用示例
### 1. 创建导出器（设置默认参数）

```typescript
import createSvgExporter from 'svg2img';

const svg2img = createSvgExporter({
  fileType: 'image/png',  // 导出格式
  fileName: 'chart.png',  // 下载文件名
  quality: 1,             // 图片质量（仅 JPEG/WebP 有效）
  style: {
    width: 800,           // 导出宽度
    height: 600,          // 导出高度
    padding: 20           // 内边距
  }
});

```

### 2. 导出 SVG 为图片并下载

```typescript
const svgElement = document.querySelector('svg')!;
svg2img.exportSvg2Img(svgElement);
```

### 3. 单次调用覆盖默认配置

```typescript
svg2img.exportSvg2Img(svgElement, {
  fileType: 'image/jpeg',
  quality: 0.8,
  fileName: 'chart.jpg'
});
```

### 4. 仅下载 svg 文件

```typescript
svg2img.downloadSvg(svgElement, 'original.svg');
```

## 📄 API
`createSvgExporter(defaultOptions: Svg2ImgOptions)`
创建一个带有默认配置的导出器。

`Svg2ImgOptions`

| 参数            | 类型       | 必填 | 说明                                              |
| ------------- | -------- | -- | ----------------------------------------------- |
| fileType      | `string` | ✅  | 导出图片类型（如 `image/png`、`image/jpeg`、`image/webp`） |
| fileName      | `string` | ✅  | 导出文件名（含扩展名）                                     |
| quality       | `number` | ❌  | 图片质量（0\~1，仅 JPEG/WebP 有效）                       |
| style         | `object` | ❌  | 样式配置                                            |
| style.width   | `number` | ❌  | 图片宽度（像素）                                        |
| style.height  | `number` | ❌  | 图片高度（像素）                                        |
| style.padding | `number` | ❌  | 图片边距（像素）                                        |

### 返回方法

- exportSvg2Img(svgElement, options?)  
将 SVG 元素转换为图片并触发下载。options 会覆盖默认配置。

- downloadSvg(svgElement, fileName)  
直接将 SVG 元素下载为 .svg 文件。

- getImgExportUrl(svgElement, options?)  
将 SVG 元素转换为图片并返回 Base64 URL，不触发下载。