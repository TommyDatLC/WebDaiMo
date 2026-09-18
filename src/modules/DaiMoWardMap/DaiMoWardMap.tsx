import { useEffect, useRef, useState, type FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import daiMoPolygonData from '../../data/dai_mo_ward_polygon.json';
import { WardInfoPanel } from './WardInfoPanel';
import { GoogleMapControls } from './GoogleMapControls';
import { MapType } from './types';

// Fix Leaflet default marker icons for Vite bundler
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Monotone black, white and gray base map tile layers
const TILE_CONFIGS: Record<MapType, { url: string; subdomains: string[]; maxZoom: number }> = {
  roadmap: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
  },
  satellite: {
    url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    maxZoom: 20,
  },
  terrain: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 20,
  },
};

const TRAFFIC_TILE_URL = 'https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}';

export const DaiMoWardMap: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const trafficLayerRef = useRef<L.TileLayer | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);

  const [mapType, setMapType] = useState<MapType>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const centerCoords: [number, number] = [20.993, 105.772];

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: centerCoords,
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Base Monotone Light Tile Layer
    const config = TILE_CONFIGS.roadmap;
    const baseLayer = L.tileLayer(config.url, {
      maxZoom: config.maxZoom,
      subdomains: config.subdomains,
    }).addTo(map);
    baseTileLayerRef.current = baseLayer;

    // Render Dai Mo Ward Boundary (Monotone Style: Purple border + soft purple tint)
    const geoLayer = L.geoJSON(daiMoPolygonData as unknown as GeoJSON.GeoJsonObject, {
      style: () => ({
        color: '#5B4DF5', // Signature Purple
        weight: 3.2,
        opacity: 1,
        dashArray: '8, 6', // Monotone dashed boundary
        fillColor: '#5B4DF5',
        fillOpacity: 0.16, // Soft purple wash
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(`
          <div style="font-family: 'SF Pro Display', -apple-system, sans-serif; padding: 4px 2px;">
            <div style="font-size: 15px; font-weight: bold; color: #111827; margin-bottom: 2px;">
              ${props.name || 'Phường Đại Mỗ'}
            </div>
            <div style="font-size: 11.5px; color: #6b7280; margin-bottom: 6px;">
              ${props.district || 'Quận Nam Từ Liêm'}, ${props.city || 'Hà Nội'}
            </div>
            <div style="display: flex; gap: 8px; font-size: 11px; font-weight: 600; color: #374151;">
              <span style="background: #f4f2ff; color: #5B4DF5; padding: 2px 6px; border-radius: 6px; border: 1px solid #e9e6ff;">
                Diện tích: ~${props.area_km2 || '8.1'} km²
              </span>
              <span style="background: #f3f4f6; color: #111827; padding: 2px 6px; border-radius: 6px;">
                Dân số: ${props.population ? Number(props.population).toLocaleString() : '80.462'}
              </span>
            </div>
          </div>
        `, { maxWidth: 280 });

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 4.5,
              fillOpacity: 0.3,
            });
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
        });
      },
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;

    // Add Center Marker (Signature Purple Pin & Label)
    const customPin = L.divIcon({
      className: 'custom-purple-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #5B4DF5; color: white; padding: 4px 10px; border-radius: 10px; font-size: 11.5px; font-weight: 800; font-family: -apple-system, 'SF Pro Display', sans-serif; box-shadow: 0 4px 14px rgba(91,77,245,0.45); white-space: nowrap; border: 1.5px solid white; margin-bottom: 3px; letter-spacing: -0.01em;">
            Phường Đại Mỗ
          </div>
          <svg width="28" height="36" viewBox="0 0 24 32" fill="none" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35));">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="#5B4DF5"/>
            <circle cx="12" cy="12" r="5" fill="#ffffff"/>
            <circle cx="12" cy="12" r="2.5" fill="#5B4DF5"/>
          </svg>
        </div>
      `,
      iconSize: [0, 0],
    });

    L.marker(centerCoords, { icon: customPin }).addTo(map);

    // Fit map smoothly to Dai Mo Ward bounds
    map.fitBounds(geoLayer.getBounds(), { padding: [60, 60] });

    // Ensure map takes 100% of the document height immediately & on container resize
    const invalidate = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      invalidate();
    });

    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    window.addEventListener('resize', invalidate);

    const animId = requestAnimationFrame(invalidate);
    const t1 = setTimeout(invalidate, 80);
    const t2 = setTimeout(invalidate, 250);
    const t3 = setTimeout(invalidate, 500);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', invalidate);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Map Type Change
  useEffect(() => {
    if (!mapInstanceRef.current || !baseTileLayerRef.current) return;
    const map = mapInstanceRef.current;

    baseTileLayerRef.current.remove();
    const config = TILE_CONFIGS[mapType];
    const newLayer = L.tileLayer(config.url, {
      maxZoom: config.maxZoom,
      subdomains: config.subdomains,
    }).addTo(map);
    baseTileLayerRef.current = newLayer;
  }, [mapType]);

  // Handle Traffic Toggle
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (showTraffic) {
      if (!trafficLayerRef.current) {
        trafficLayerRef.current = L.tileLayer(TRAFFIC_TILE_URL, {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        });
      }
      trafficLayerRef.current.addTo(map);
    } else if (trafficLayerRef.current) {
      trafficLayerRef.current.remove();
    }
  }, [showTraffic]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleRecenter = () => {
    if (geojsonLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(geojsonLayerRef.current.getBounds(), {
        padding: [60, 60],
        animate: true,
      });
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f3f4f6] font-sans monotone-map">
      {/* Monotone Leaflet Map Canvas (Black & White with Purple Accents) */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Place Details Drawer for Dai Mo Ward (Positioned top-left without search bar) */}
      <WardInfoPanel
        onDirectionsClick={handleRecenter}
        onSaveClick={() => alert('Đã lưu Phường Đại Mỗ vào danh sách yêu thích')}
        onShareClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Ranh giới Phường Đại Mỗ, Nam Từ Liêm, Hà Nội',
              url: window.location.href,
            });
          } else {
            alert('Đã sao chép liên kết Phường Đại Mỗ!');
          }
        }}
      />

      {/* Map Controls (Layers, Zoom, Pegman, Re-center) */}
      <GoogleMapControls
        mapType={mapType}
        onMapTypeChange={setMapType}
        showTraffic={showTraffic}
        onToggleTraffic={() => setShowTraffic(!showTraffic)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={handleRecenter}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
};
