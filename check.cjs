const fs = require('fs');

const content = fs.readFileSync('constants.ts', 'utf8');

// Use a simple text search for "requirements: []"
// Since all the fallback lines look like:
// "uk-worker": { id: "uk-worker", parentId: "uk", title: "Visa Làm Việc Anh", heroImage: "", overview: "Skilled Worker Visa.", benefits: [], requirements: [], faq: [] },

const lines = content.split('\n');
let emptyStubs = [];

lines.forEach((line, index) => {
    if (line.includes('requirements: []')) {
        // extract the id string
        const match = line.match(/"([^"]+)"\s*:\s*\{[^}]*requirements:/);
        if (match && match[1]) {
            emptyStubs.push(match[1]);
        }
    }
});

console.log("Empty stubs found:", emptyStubs);

// Now cross-reference with ALL detailIds actually requested by INITIAL_PAGES
const detailIds = new Set();
const rx = /detailId:\s*"([^"]+)"/g;
let m;
while (m = rx.exec(content)) {
  detailIds.add(m[1]);
}

const missingForUI = emptyStubs.filter(id => detailIds.has(id));
console.log("Critical missing pages (called by UI but empty):", missingForUI);

