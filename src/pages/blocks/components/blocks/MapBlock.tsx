import GoogleMapReact from "google-map-react";
import { useState } from "react";
import Marker from "./map/Marker";

interface MapBlockProps {
  className?: string;
  center: { lat: number; lng: number };
  zoom?: number;
  title?: string;
}

export default function MapBlock(props: MapBlockProps) {
  const {
    title,
    className,
    center = { lat: 30.358313, lng: 120.026599 },
    zoom = 10,
  } = props;
  const googleKey = import.meta.env.VITE_GOOGLE_MAP_KEY || "";

  // 使用 sessionStorage 记忆 loading 状态，key 由 googleKey+center+zoom 组成
  const sessionKey = `mapblock-loading-${googleKey}-${center.lat}-${center.lng}-${zoom}`;
  const [loading, setLoading] = useState(() => {
    const stored = sessionStorage.getItem(sessionKey);
    return stored === null ? true : stored === "true";
  });

  // 地图加载完成时同步 sessionStorage
  const handleMapLoaded = () => {
    setLoading(false);
    sessionStorage.setItem(sessionKey, "false");
  };
  const [error] = useState<string | null>(null);
  const hasKey = !!googleKey;
  const centerObj = center;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className || ""}`}
    >
      {/* 隐藏 Google logo 和版权 */}
      <style>{`
        .gmnoprint, .gm-style-cc, a[href^="https://maps.google.com/maps"], a[href^="https://www.google.com/maps"], .gmnoprint[style*="z-index: 1000001"] {
          display: none !important;
        }
      `}</style>
      {!hasKey && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[11px] text-gray-500 bg-white/60 backdrop-blur-sm z-10">
          <span>Need Google Map Key</span>
        </div>
      )}
      {hasKey && (
        <div className="w-full h-full" style={{ minHeight: 120 }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: googleKey }}
            defaultCenter={centerObj}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleMapLoaded}
            options={{
              fullscreenControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              zoomControl: false,
              clickableIcons: false,
              scaleControl: false,
              rotateControl: false,
              panControl: false,
              keyboardShortcuts: false,
              draggableCursor: "default",
              disableDefaultUI: true,
              mapId: "551e820942aed4209e064cbc",
            }}
          >
            <Marker lat={centerObj.lat} lng={centerObj.lng} />
          </GoogleMapReact>
        </div>
      )}
      {(loading || error) && (
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-20">
          {error ? (
            <span className="text-[11px] text-gray-500">{error}</span>
          ) : (
            <div className="size-6 max-w-md rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse shadow-inner" />
          )}
        </div>
      )}
      {title && (
        <div
          className="absolute p-2 bottom-4 max-w-4/5 truncate left-4 border border-black/3 rounded-lg bg-white/60 backdrop-blur-xs font-sans text-black/80 text-sm"
          title={title}
        >
          {title}
        </div>
      )}
    </div>
  );
}
