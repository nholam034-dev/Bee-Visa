const fs = require('fs');
const content = fs.readFileSync('constants.ts', 'utf8');
const detailIdRegex = /detailId:\s*'([^']+)'|detailId:\s*"([^"]+)"/g;
let match;
const foundIds = [];
while ((match = detailIdRegex.exec(content)) !== null) {
  const id = match[1] || match[2];
  foundIds.push(id);
}
const counts = {};
foundIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
for (const id in counts) {
  if (counts[id] > 1) {
    console.log(id + ': ' + counts[id]);
  }
}
