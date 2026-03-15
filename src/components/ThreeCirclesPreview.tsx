import { useRef, useState, useEffect } from "react";

interface ThreeCirclesPreviewProps {
  previewUrl: string;
  innerRadius: number;
  middleRadius: number;
  outerRadius: number;
  imageWidth: number;
  imageHeight: number;
}

const ThreeCirclesPreview = ({
  previewUrl,
  innerRadius,
  middleRadius,
  outerRadius,
  imageWidth,
  imageHeight,
}: ThreeCirclesPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const aspect = imageHeight / imageWidth;
      setDisplaySize({ w: width, h: width * aspect });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [imageWidth, imageHeight]);

  const scaleRatio = displaySize.w / imageWidth;
  const cx = displaySize.w / 2;
  const cy = displaySize.h / 2;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <img
        src={previewUrl}
        alt="曼陀罗预览"
        className="w-full rounded-xl"
        style={{ height: displaySize.h || "auto" }}
        draggable={false}
      />
      {displaySize.w > 0 && outerRadius > 0 && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={displaySize.w}
          height={displaySize.h}
        >
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius * scaleRatio}
            fill="none"
            stroke="hsl(142, 71%, 45%)"
            strokeWidth={2}
            strokeDasharray="6 3"
          />
          <circle
            cx={cx}
            cy={cy}
            r={middleRadius * scaleRatio}
            fill="none"
            stroke="hsl(217, 91%, 60%)"
            strokeWidth={2}
            strokeDasharray="6 3"
          />
        </svg>
      )}
    </div>
  );
};

export default ThreeCirclesPreview;
