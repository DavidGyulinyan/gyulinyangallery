"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ZoomableImage({
  src,
  alt,
  width = 800,
  height = 800,
  className = "",
}: ZoomableImageProps) {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.5}
      maxScale={4}
      wheel={{ step: 0.1 }}
      pinch={{ step: 0.1 }}
      doubleClick={{ mode: "reset" }}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div
          className={`relative flex items-center justify-center min-h-full ${className}`}
        >
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button
              onClick={() => zoomIn()}
              className="bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-md"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              onClick={() => zoomOut()}
              className="bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-md"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              onClick={() => resetTransform()}
              className="bg-white/80 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md"
              aria-label="Reset zoom"
            >
              ↻
            </button>
          </div>
          <TransformComponent>
            <Image
              src={src}
              alt={alt}
              width={width || undefined}
              height={height || undefined}
              className="max-w-full max-h-full cursor-grab active:cursor-grabbing"
              draggable={false}
            />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
}
