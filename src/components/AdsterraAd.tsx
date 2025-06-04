// src/components/AdsterraAd.tsx
import { useEffect, useRef } from "react";

type AdsterraAdProps = {
  adKey: string;
  format?: string;
  height?: number;
  width?: number;
  className?: string;
  isLoggedIn?: boolean;
};

export const AdsterraAd = ({
  adKey,
  format = "iframe",
  height = 250,
  width = 300,
  className = "",
  isLoggedIn = false,
}: AdsterraAdProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always load ads regardless of environment
    // Clear previous content
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = '';
    }

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
    
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;

    // Append scripts to the ad container instead of body
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(script);
      adContainerRef.current.appendChild(invokeScript);
    }

    return () => {
      // Cleanup when component unmounts
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = '';
      }
    };
  }, [adKey, format, height, width, isLoggedIn]);

  return <div ref={adContainerRef} id={`adsterra-${adKey}`} className={className} />;
};