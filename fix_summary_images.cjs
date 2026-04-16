const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

// Fix COUNTRIES_SUMMARY - images are offset/wrong
const correctMapping = {
  'usa': 'my',
  'uk': 'anh-quoc', 
  'schengen': 'chau-au',
  'australia': 'uc',
  'canada': 'canada',
  'newzealand': 'new-zealand',
  'japan': 'nhat-ban',
  'korea': 'han-quoc',
  'china': 'trung-quoc',
  'hongkong': 'hong-kong',
  'taiwan': 'dai-loan',
  'uae': 'dubai',
  'russia': 'nga',
  'southafrica': 'nam-phi',
  'india': 'an-do',
  'egypt': 'ai-cap'
};

for (const [id, slug] of Object.entries(correctMapping)) {
  // Match the line in COUNTRIES_SUMMARY that has this id and replace the image
  const re = new RegExp(
    `(id:\\s*"${id}"[^}]*?image:\\s*")[^"]+(")`,
    'g'
  );
  code = code.replace(re, `$1/images/destinations/${slug}.png$2`);
}

fs.writeFileSync('constants.ts', code);
console.log('Fixed COUNTRIES_SUMMARY images!');
