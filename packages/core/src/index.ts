export type ImageFileType =
  | 'image/png'
  | 'image/jpg'
  | 'image/jpeg'
  | 'image/webp'
  | (string & {});

export type CustomStyle = {
  width?: number;
  height?: number;
  padding?: number;
  backgroundColor?: string;
}

export interface Svg2ImgOptions {
  fileType: ImageFileType;
  fileName: string;
  quality?: number;
  scaleFactor?: number;
  style?: CustomStyle;
}

const createSvgExporter = (defaultOptions: Svg2ImgOptions) => {
  const makeInlineStyles = (source: SVGSVGElement, target: SVGElement) => {
    const sourceElements = source.querySelectorAll('*');
    const targetElements = target.querySelectorAll('*');

    sourceElements.forEach((elem, index) => {
      const computedStyles = window.getComputedStyle(elem);
      const properties = [
        'fill',
        'stroke',
        'stroke-width',
        'font-size',
        'font-family',
        'margin',
        'padding',
        'box-sizing'
      ];
      const inlineStyle = properties
        .map((prop) => `${prop}:${computedStyles.getPropertyValue(prop)};`)
        .join('');
      targetElements[index].setAttribute('style', inlineStyle);
    });
  };

  const initSvg = (svgElement: SVGSVGElement, options: Svg2ImgOptions) => {
    const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;
    makeInlineStyles(svgElement, clonedSvg);

    const bbox = svgElement.getBBox();
    const padding = options.style?.padding ?? 20;

    clonedSvg.setAttribute(
      'viewBox',
      `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + 2 * padding} ${bbox.height + 2 * padding}`
    );
    clonedSvg.setAttribute('width', String(options.style?.width ?? bbox.width));
    clonedSvg.setAttribute('height', String(options.style?.height ?? bbox.height));

    return {
      clonedSvg,
      width: bbox.width,
      height: bbox.height,
      pixelRatio: window.devicePixelRatio || 1,
      scaleFactor: options.scaleFactor ?? 2
    };
  };

  const serializeSvg = (svg: SVGSVGElement) => {
    const serializer = new XMLSerializer();
    const source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg);
    const image = new Image();
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
    return { image, url };
  };

  const toSvgUrl = (svg: SVGSVGElement, options: Svg2ImgOptions) => {
    const { clonedSvg } = initSvg(svg, options);
    return serializeSvg(clonedSvg).url;
  };

  const downloadFile = (url: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const generateImageUrlFromSvg = (svg: SVGSVGElement, options: Svg2ImgOptions) =>
    new Promise<string>((resolve, reject) => {
      const { clonedSvg, width, height, pixelRatio, scaleFactor } = initSvg(svg, options);
      const { image, url } = serializeSvg(clonedSvg);

      const canvas = document.createElement('canvas');
      canvas.width = width * pixelRatio * scaleFactor;
      canvas.height = height * pixelRatio * scaleFactor;

      const context = canvas.getContext('2d');
      if (!context) return reject('Canvas context not available');

      context.scale(pixelRatio * scaleFactor, pixelRatio * scaleFactor);
      context.fillStyle = options.style?.backgroundColor ?? '#fff';
      context.fillRect(0, 0, width, height);

      image.onload = () => {
        context.drawImage(image, 0, 0, width, height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL(options.fileType, options.quality ?? 1));
      };
      image.onerror = () => reject('Image load failed');

      image.src = url;
    });

  const downloadSvg = (svg: SVGSVGElement, fileName?: string) => {
    const url = toSvgUrl(svg, defaultOptions);
    const name = fileName ?? defaultOptions.fileName ?? 'download';
    downloadFile(url, name);
  };

  const exportSvg2Img = async (svg: SVGSVGElement, options?: Partial<Svg2ImgOptions>) => {
    const finalOptions: Svg2ImgOptions = { ...defaultOptions, ...options };
    try {
      const url = await generateImageUrlFromSvg(svg, finalOptions);
      downloadFile(url, finalOptions.fileName);
    } catch (e) {
      console.error('[svg2Img] exportSvg2Img error', e);
    }
  };

  return { downloadFile, generateImageUrlFromSvg, downloadSvg, exportSvg2Img };
};

export default createSvgExporter;
