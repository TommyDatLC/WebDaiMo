const fs = require('fs');

const osm = JSON.parse(fs.readFileSync('src/data/dai_mo_osm.json', 'utf8'));
const relation = osm.elements[0];

console.log('Tags:', relation.tags);
console.log('Members count:', relation.members.length);

// Extract outer ways
const outerWays = relation.members.filter(m => m.role === 'outer' && m.geometry && m.geometry.length > 0);
console.log('Outer ways:', outerWays.length);

// Stitch segments into closed ring(s)
function stitchSegments(segments) {
  let remaining = segments.map(s => s.geometry.map(p => [p.lon, p.lat]));
  const rings = [];

  while (remaining.length > 0) {
    let currentRing = [...remaining.shift()];
    let matched = true;

    while (matched && remaining.length > 0) {
      matched = false;
      const lastPoint = currentRing[currentRing.length - 1];

      for (let i = 0; i < remaining.length; i++) {
        const seg = remaining[i];
        const first = seg[0];
        const last = seg[seg.length - 1];

        // Check if starts near lastPoint
        const dStart = Math.hypot(first[0] - lastPoint[0], first[1] - lastPoint[1]);
        const dEnd = Math.hypot(last[0] - lastPoint[0], last[1] - lastPoint[1]);

        if (dStart < 0.0001) {
          currentRing = currentRing.concat(seg.slice(1));
          remaining.splice(i, 1);
          matched = true;
          break;
        } else if (dEnd < 0.0001) {
          currentRing = currentRing.concat(seg.slice().reverse().slice(1));
          remaining.splice(i, 1);
          matched = true;
          break;
        }
      }
    }
    rings.push(currentRing);
  }
  return rings;
}

const rings = stitchSegments(outerWays);
console.log('Rings created:', rings.length, 'lengths:', rings.map(r => r.length));

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: relation.id,
        name: relation.tags.name || 'Phường Đại Mỗ',
        admin_level: relation.tags.admin_level || '6',
        district: 'Quận Nam Từ Liêm',
        city: 'Thành phố Hà Nội',
        country: 'Việt Nam',
        bounds: relation.bounds,
        center: [
          (relation.bounds.minlon + relation.bounds.maxlon) / 2,
          (relation.bounds.minlat + relation.bounds.maxlat) / 2
        ]
      },
      geometry: {
        type: rings.length === 1 ? 'Polygon' : 'MultiPolygon',
        coordinates: rings.length === 1 ? rings : rings.map(r => [r])
      }
    }
  ]
};

fs.writeFileSync('src/data/dai_mo_ward_geojson.json', JSON.stringify(geojson, null, 2));
console.log('Saved to src/data/dai_mo_ward_geojson.json successfully!');
