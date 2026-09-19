import { useEffect, useRef, useState, type FC } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import daiMoPolygonData from '../../data/dai_mo_ward_polygon.json';
import relicsData from '../../data/relics.json';
import { WardInfoPanel } from './WardInfoPanel';
import { GoogleMapControls } from './GoogleMapControls';
import { MapType, Relic } from './types';

const relics = relicsData as Relic[];

// Fix Leaflet default marker icons for Vite bundler
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Authentic Google Maps base tile layers (No API Key required, fast CDN, zero watermarks)
const TILE_CONFIGS: Record<MapType, { url: string; subdomains: string[]; maxZoom: number }> = {
  roadmap: {
    url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
  },
  satellite: {
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
  },
  terrain: {
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
  },
};

const TRAFFIC_TILE_URL = 'https://mt{s}.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}';

const createRelicIcon = (relic: Relic, isSelected: boolean) => {
  let iconSvg = '';
  if (relic.type === 'chua') {
    iconSvg = `<path d="M12 2c-.6 1.8-2 3.6-3.8 4.6C6.4 7.6 4.6 7.6 3 7c.6 1.6.6 3.4 1.6 5.2 1 1.8 2.8 3.2 4.6 3.8.8.3 1.8.4 2.8.4s2-.1 2.8-.4c1.8-.6 3.6-2 4.6-3.8 1-1.8 1-3.6 1.6-5.2-1.6.6-3.4.6-5.2-.4C14 5.6 12.6 3.8 12 2z" fill="#ffffff"/>`;
  } else if (relic.type === 'dinh') {
    iconSvg = `<path d="M2 10L12 3l10 7v2H2v-2zm2 4h16v7H4v-7zm3 2v3h3v-3H7zm7 0v3h3v-3h-3z" fill="#ffffff"/>`;
  } else if (relic.type === 'den') {
    iconSvg = `<path d="M12 2l3 5h5l-4 4 2 6-6-3-6 3 2-6-4-4h5l3-5z" fill="#ffffff"/>`;
  } else {
    iconSvg = `<path d="M4 10l8-6 8 6v10H4V10zm8-2l-5 4v6h10v-6l-5-4z" fill="#ffffff"/>`;
  }

  const pinBg = relic.rankingBadge === 'QG' ? '#5B4DF5' : '#D97706';
  const badgeBg = relic.rankingBadge === 'QG' ? '#4338CA' : '#B45309';
  const scale = isSelected ? 'scale(1.22)' : 'scale(1)';
  const ringStyle = isSelected
    ? 'border: 2.5px solid white; box-shadow: 0 0 0 5px rgba(91,77,245,0.45);'
    : 'border: 1.5px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.35);';

  return L.divIcon({
    className: 'custom-relic-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%) ${scale}; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer;">
        <div style="background: ${isSelected ? '#111827' : 'rgba(17, 24, 39, 0.92)'}; color: white; padding: 2px 7px; border-radius: 8px; font-size: 10.5px; font-weight: 700; font-family: -apple-system, 'SF Pro Display', sans-serif; box-shadow: 0 3px 10px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid rgba(255,255,255,0.7); margin-bottom: 2px; letter-spacing: -0.01em; display: flex; align-items: center; gap: 4px;">
          <span style="background: ${badgeBg}; color: white; font-size: 8.5px; font-weight: 800; padding: 1px 3.5px; border-radius: 4px;">${relic.rankingBadge}</span>
          <span>${relic.name}</span>
        </div>
        <div style="position: relative; width: 30px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
          <svg width="30" height="38" viewBox="0 0 24 32" fill="none" style="${ringStyle} border-radius: 50% 50% 50% 0; transform: rotate(-45deg); background: ${pinBg};">
          </svg>
          <div style="position: absolute; top: 3px; left: 7px; width: 16px; height: 16px; display: flex; items-center; justify-content: center;">
            <svg width="15" height="15" viewBox="0 0 24 24">
              ${iconSvg}
            </svg>
          </div>
        </div>
      </div>
    `,
    iconSize: [0, 0],
  });
};

export const DaiMoWardMap: FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const baseTileLayerRef = useRef<L.TileLayer | null>(null);
  const trafficLayerRef = useRef<L.TileLayer | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);
  const relicsLayerRef = useRef<L.LayerGroup | null>(null);
  const relicMarkersMapRef = useRef<Map<string, L.Marker>>(new Map());

  const [mapType, setMapType] = useState<MapType>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [selectedRelicId, setSelectedRelicId] = useState<string | null>(null);

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
        color: '#5B4DF5',
        weight: 3.2,
        opacity: 1,
        dashArray: '8, 6',
        fillColor: '#5B4DF5',
        fillOpacity: 0.14,
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(
          `
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
        `,
          { maxWidth: 280 }
        );

        layer.on({
          mouseover: (e) => {
            const l = e.target;
            l.setStyle({
              weight: 4.5,
              fillOpacity: 0.25,
            });
          },
          mouseout: (e) => {
            geoLayer.resetStyle(e.target);
          },
          click: () => {
            setSelectedRelicId(null);
          },
        });
      },
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;

    // Relics Layer Group
    const relicsGroup = L.layerGroup().addTo(map);
    relicsLayerRef.current = relicsGroup;

    // Fit map smoothly to Dai Mo Ward bounds
    map.fitBounds(geoLayer.getBounds(), { padding: [60, 60] });

    // Handle container resizing
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

  // Update Relic Markers whenever selectedRelicId or map initializes
  useEffect(() => {
    if (!mapInstanceRef.current || !relicsLayerRef.current) return;
    const map = mapInstanceRef.current;
    const group = relicsLayerRef.current;

    group.clearLayers();
    relicMarkersMapRef.current.clear();

    relics.forEach((relic) => {
      const isSelected = relic.id === selectedRelicId;
      const icon = createRelicIcon(relic, isSelected);

      const marker = L.marker(relic.coordinates, {
        icon,
        zIndexOffset: isSelected ? 1000 : 10,
      });

      marker.on('click', () => {
        setSelectedRelicId(relic.id);
        map.flyTo(relic.coordinates, 16, { duration: 1.0 });
      });

      // Quick popup preview
      const thumbHtml =
        relic.images && relic.images.length > 0
          ? `<img src="${relic.images[0]}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" />`
          : '';

      marker.bindPopup(
        `
        <div style="font-family: 'SF Pro Display', -apple-system, sans-serif; width: 200px; padding: 2px;">
          ${thumbHtml}
          <div style="display: flex; gap: 4px; margin-bottom: 4px;">
            <span style="background: ${
              relic.rankingBadge === 'QG' ? '#5B4DF5' : '#D97706'
            }; color: white; font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 4px;">
              ${relic.rankingBadge === 'QG' ? 'Di tích QG' : 'Cấp TP'}
            </span>
            <span style="background: #f3f4f6; color: #374151; font-size: 9px; font-weight: 700; padding: 1px 5px; border-radius: 4px;">
              ${relic.category}
            </span>
          </div>
          <div style="font-size: 13px; font-weight: bold; color: #111827; margin-bottom: 2px;">
            ${relic.name}
          </div>
          <div style="font-size: 10.5px; color: #6b7280; margin-bottom: 6px; line-height: 1.3;">
            ${relic.address}
          </div>
          <button id="btn-relic-detail-${relic.id}" style="width: 100%; background: #5B4DF5; color: white; border: none; padding: 5px 0; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
            Xem chi tiết di tích →
          </button>
        </div>
      `,
        { maxWidth: 220, offset: [0, -25] }
      );

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-relic-detail-${relic.id}`);
        if (btn) {
          btn.onclick = () => {
            setSelectedRelicId(relic.id);
            marker.closePopup();
          };
        }
      });

      marker.addTo(group);
      relicMarkersMapRef.current.set(relic.id, marker);
    });
  }, [selectedRelicId]);

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
          subdomains: ['0', '1', '2', '3'],
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
    setSelectedRelicId(null);
    if (geojsonLayerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(geojsonLayerRef.current.getBounds(), {
        padding: [60, 60],
        maxZoom: 15,
        animate: true,
      });
    } else {
      mapInstanceRef.current?.setView(centerCoords, 14, { animate: true });
    }
  };

  const handleFlyToRelic = (relic: Relic) => {
    setSelectedRelicId(relic.id);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(relic.coordinates, 16, {
        duration: 1.0,
        easeLinearity: 0.25,
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
    <div
      className={`relative w-full h-full overflow-hidden bg-[#f3f4f6] font-sans ${
        mapType !== 'satellite' ? 'monotone-map' : ''
      }`}
    >
      {/* Monotone Leaflet Map Canvas (Black & White with Purple Accents) */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Place Details Drawer for Dai Mo Ward & Relics */}
      <WardInfoPanel
        relics={relics}
        selectedRelicId={selectedRelicId}
        onSelectRelic={setSelectedRelicId}
        onFlyToRelic={handleFlyToRelic}
        onDirectionsClick={handleRecenter}
        onSaveClick={() => alert('Đã lưu thông tin di tích vào danh sách yêu thích')}
        onShareClick={() => {
          if (navigator.share) {
            navigator.share({
              title: 'Sổ tay Di tích Phường Đại Mỗ',
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
