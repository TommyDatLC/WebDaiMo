import { useEffect, useRef, useState, type FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import daiMoPolygonData from '../../data/dai_mo_ward_polygon.json';
import { GoogleSearchBar } from './GoogleSearchBar';
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

const TILE_URLS: Record<MapType, string> = {
  roadmap: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  satellite: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
  terrain: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
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

    // Base Google Tile Layer
    const baseLayer = L.tileLayer(TILE_URLS.roadmap, {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);
    baseTileLayerRef.current = baseLayer;

    // Render Dai Mo Ward Boundary (Google Maps Style: red dashed border + soft tint)
    const geoLayer = L.geoJSON(daiMoPolygonData as unknown as GeoJSON.GeoJsonObject, {
      style: () => ({
        color: '#EA4335', // Google Red
        weight: 2.8,
        opacity: 0.95,
        dashArray: '6, 6', // Google Maps administrative boundary dash
        fillColor: '#EA4335',
        fillOpacity: 0.12,
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
              <span style="background: #fee2e2; color: #991b1b; padding: 2px 6px; rounded: 6px;">
                Diện tích: ~${props.area_km2 || '8.1'} km²
              </span>
              <span style="background: #e0e7ff; color: #3730a3; padding: 2px 6px; rounded: 6px;">
                Dân số: ${props.population ? Number(props.population).toLocaleString() : '80.462'}
              </span>
            </div>
          </div>
        `, { maxWidth: 280 });

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 3.8,
              fillOpacity: 0.22,
            });
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
        });
      },
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;

    // Add Center Marker (Google Maps Red Pin)
    const customPin = L.divIcon({
      className: 'custom-google-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
          <div style="background: #EA4335; color: white; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: bold; font-family: -apple-system, sans-serif; box-shadow: 0 4px 10px rgba(0,0,0,0.25); white-space: nowrap; border: 1.5px solid white; margin-bottom: 2px;">
            Phường Đại Mỗ
          </div>
          <svg width="28" height="36" viewBox="0 0 24 32" fill="none" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12z" fill="#EA4335"/>
            <circle cx="12" cy="12" r="5" fill="#ffffff"/>
          </svg>
        </div>
      `,
      iconSize: [0, 0],
    });

    L.marker(centerCoords, { icon: customPin }).addTo(map);

    // Fit map smoothly to Dai Mo Ward bounds
    map.fitBounds(geoLayer.getBounds(), { padding: [60, 60] });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Map Type Change
  useEffect(() => {
    if (!mapInstanceRef.current || !baseTileLayerRef.current) return;
    const map = mapInstanceRef.current;

    baseTileLayerRef.current.remove();
    const newLayer = L.tileLayer(TILE_URLS[mapType], {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
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
    <div className="relative w-full h-full min-h-[500px] overflow-hidden bg-[#e5e3df] font-sans">
      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Google Maps Search Bar */}
      <GoogleSearchBar
        onRecenter={handleRecenter}
        onDirectionsClick={handleRecenter}
        onSearch={() => handleRecenter()}
      />

      {/* Google Maps Place Details Drawer for Dai Mo Ward */}
      <WardInfoPanel
        onDirectionsClick={handleRecenter}
        onSaveClick={() => alert('Đã lưu Phường Đại Mỗ vào danh sách địa điểm yêu thích')}
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

      {/* Google Maps Controls (Layers, Zoom, Pegman, Re-center) */}
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
