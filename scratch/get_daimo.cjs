const https = require('https');
const fs = require('fs');

const query = `[out:json][timeout:30];
relation["name"~"Đại Mỗ"]["boundary"="administrative"];
out geom;`;

const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

console.log('Querying Overpass API...');

https.get(url, { headers: { 'User-Agent': 'WebDaiMoScraper/1.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Elements found:', json.elements ? json.elements.length : 0);
      if (json.elements && json.elements.length > 0) {
        if (!fs.existsSync('src/data')) fs.mkdirSync('src/data', { recursive: true });
        fs.writeFileSync('src/data/dai_mo_osm.json', JSON.stringify(json, null, 2));
        json.elements.forEach((el, i) => {
          console.log(`[${i}] ID: ${el.id}, Name: ${el.tags.name}, AdminLevel: ${el.tags.admin_level}`);
          console.log('Bounds:', el.bounds);
        });
      } else {
        console.log('No elements found. Response:', data.slice(0, 300));
      }
    } catch (e) {
      console.error('Parse error:', e.message, data.slice(0, 300));
    }
  });
}).on('error', err => console.error('Request error:', err.message));
