// src/components/AdsterraAd.tsx
import { useEffect } from "react";

type AdsterraAdProps = {
  adKey: string;
  format?: string;
  height?: number;
  width?: number;
  className?: string;
};

export const AdsterraAd = ({
  adKey,
  format = "iframe",
  height = 250,
  width = 300,
  className = "",
}: AdsterraAdProps) => {
  useEffect(() => {
    // Only load ads in production
    if (process.env.NODE_ENV === "production") {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
        atOptions = {
          'key': '${adKey}',
          'format': '${format}',
          'height': ${height},
          'width': ${width},
          'params': {}
        };
      `;
      document.body.appendChild(script);

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
      document.body.appendChild(invokeScript);

      return () => {
        document.body.removeChild(script);
        document.body.removeChild(invokeScript);
      };
    }
  }, [adKey, format, height, width]);

  // In development, show a placeholder
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <p className="text-gray-500">Ad Space ({width}x{height})</p>
      </div>
    );
  }

  return <div id={`adsterra-${adKey}`} className={className} />;
};