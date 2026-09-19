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
    // Chùa: Traditional Pagoda / Temple with multi-tier roof
    iconSvg = `<path d="M12 2L4 7v2h16V7l-8-5zm0 2.5l5 3.1H7l5-3.1zM5 11v8h3v-8H5zm5 0v8h4v-8h-4zm6 0v8h3v-8h-3zM3 20h18v2H3v-2z"/>`;
  } else if (relic.type === 'dinh') {
    // Đình: Traditional Vietnamese Communal House with curved roof eaves (mái đình cong)
    iconSvg = `<path d="M12 3c-3 3-6.5 4.2-10 4.5V10c2.5 0 6-.6 8.5-2v9H6v3h12v-3h-4.5V8c2.5 1.4 6 2 8.5 2V7.5c-3.5-.3-7-1.5-10-4.5z"/>`;
  } else if (relic.type === 'den') {
    // Đền: Historic sacred shrine sanctuary
    iconSvg = `<path d="M2 4h20v2.5H2V4zm2 4.5h16V11H4V8.5zm2 4.5h12v7H6V13zm2.5 2v3h7v-3h-7zM4 21h16v1.5H4V21z"/>`;
  } else {
    // Miếu: Small shrine / Altar pavilion
    iconSvg = `<path d="M12 2L3 7.5v2.5h2v9h14v-9h2V7.5L12 2zm0 3.2l5 3H7l5-3zM8 12h8v5H8v-5z"/>`;
  }

  const pinBg = relic.rankingBadge === 'QG' ? '#C62828' : '#D97706';
  const scale = isSelected ? 'scale(1.22)' : 'scale(1)';

  return L.divIcon({
    className: 'custom-relic-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%) ${scale}; transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer;">
        <div style="background: ${isSelected ? '#3B0D11' : 'rgba(59, 13, 17, 0.94)'}; color: white; padding: 3px 8px; border-radius: 8px; font-size: 11px; font-weight: 700; font-family: 'Manrope', 'Gilroy', -apple-system, sans-serif; box-shadow: 0 4px 14px rgba(59,13,17,0.35); white-space: nowrap; border: 1.5px solid #EADBCA; margin-bottom: 3px; letter-spacing: -0.01em; display: flex; align-items: center; gap: 5px;">
          <span style="background: ${pinBg}; color: white; font-size: 8.5px; font-weight: 800; padding: 1px 4.5px; border-radius: 4px;">${relic.rankingBadge}</span>
          <span>${relic.name}</span>
        </div>
        <div style="position: relative; width: 32px; height: 42px; display: flex; align-items: center; justify-content: center;">
          <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); overflow: visible;">
            ${isSelected ? `<circle cx="16" cy="14.5" r="17.5" stroke="${pinBg}" stroke-width="3" fill="none" opacity="0.5" stroke-dasharray="4, 3"/>` : ''}
            <path d="M16 1C8.544 1 2.5 7.044 2.5 14.5c0 10.2 13.5 25.5 13.5 25.5s13.5-15.3 13.5-25.5C29.5 7.044 23.456 1 16 1z" fill="${pinBg}" stroke="#ffffff" stroke-width="2"/>
            <circle cx="16" cy="14.5" r="8.5" fill="#ffffff"/>
            <g transform="translate(9, 7.5)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="${pinBg}">
                ${iconSvg}
              </svg>
            </g>
          </svg>
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

    // Render Dai Mo Ward Boundary (Imperial Heritage Style: Red border + soft gold tint)
    const geoLayer = L.geoJSON(daiMoPolygonData as unknown as GeoJSON.GeoJsonObject, {
      style: () => ({
        color: '#C62828',
        weight: 3.2,
        opacity: 0.95,
        dashArray: '8, 6',
        fillColor: '#F59E0B',
        fillOpacity: 0.12,
      }),
      onEachFeature: (feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(
          `
          <div style="font-family: 'Manrope', 'Gilroy', -apple-system, sans-serif; padding: 4px 2px;">
            <div style="font-size: 15px; font-weight: 800; color: #3B0D11; margin-bottom: 2px;">
              ${props.name || 'Phường Đại Mỗ'}
            </div>
            <div style="font-size: 12px; color: #6B4F4F; margin-bottom: 8px;">
              ${props.district || 'Quận Nam Từ Liêm'}, ${props.city || 'Hà Nội'}
            </div>
            <div style="display: flex; gap: 8px; font-size: 11px; font-weight: 600;">
              <span style="background: #FEF2F2; color: #C62828; padding: 3px 8px; border-radius: 9999px; border: 1px solid #FECACA;">
                Diện tích: ~${props.area_km2 || '8.1'} km²
              </span>
              <span style="background: #F5EFE6; color: #3B0D11; padding: 3px 8px; border-radius: 9999px; border: 1px solid #EADBCA;">
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
        <div style="font-family: 'Manrope', 'Gilroy', -apple-system, sans-serif; width: 210px; padding: 2px;">
          ${thumbHtml}
          <div style="display: flex; gap: 5px; margin-bottom: 6px;">
            <span style="background: ${
              relic.rankingBadge === 'QG' ? '#FEF2F2' : '#FEF3C7'
            }; color: ${
              relic.rankingBadge === 'QG' ? '#C62828' : '#B45309'
            }; border: 1px solid ${
              relic.rankingBadge === 'QG' ? '#FECACA' : '#FDE68A'
            }; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 9999px;">
              ${relic.rankingBadge === 'QG' ? 'Di tích Quốc gia' : 'Di tích Thành phố'}
            </span>
            <span style="background: #F5EFE6; color: #3B0D11; border: 1px solid #EADBCA; font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">
              ${relic.category}
            </span>
          </div>
          <div style="font-size: 13.5px; font-weight: 700; color: #3B0D11; margin-bottom: 3px; line-height: 1.3;">
            ${relic.name}
          </div>
          <div style="font-size: 11px; color: #6B4F4F; margin-bottom: 8px; line-height: 1.3;">
            ${relic.address}
          </div>
          <button id="btn-relic-detail-${relic.id}" style="width: 100%; background: #C62828; color: #ffffff; border: none; padding: 7px 0; border-radius: 8px; font-size: 11.5px; font-weight: 600; cursor: pointer; transition: background 0.15s; font-family: inherit;">
            Xem chi tiết di tích →
          </button>
        </div>
      `,
        { maxWidth: 230, offset: [0, -25] }
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
