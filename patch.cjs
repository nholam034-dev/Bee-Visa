const fs = require('fs');

let code = fs.readFileSync('constants.ts', 'utf8');

// Replacements for destinations
const destMap = {
  'uk': 'anh-quoc',
  'usa': 'my',
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

for (const [key, slug] of Object.entries(destMap)) {
   const re = new RegExp(`(id:\\s*"${key}"[\\s\\S]*?backgroundImage:\\s*")[^"]+(")`, 'm');
   code = code.replace(re, `$1/images/destinations/${slug}.png$2`);
}

// Home has a specific one
code = code.replace(/(id:\s*"home"[\s\S]*?backgroundImage:\s*")[^"]+(")/, '$1/images/destinations/my.png$2');


// Replacements for services
const services = [
  'usa-b1b2', 'usa-f1', 'usa-renewal',
  'uk-tourist', 'uk-family', 'uk-business',
  'schengen-france', 'schengen-business', 'schengen-family',
  'au-600',
  'ca-visitor', 'ca-super', 'ca-student',
  'nz-visitor', 'nz-family',
  'jp-tourist', 'jp-business',
  'kr-tourist', 'kr-5year', 'kr-business',
  'cn-tourist', 'cn-business',
  'hk-tourist', 'hk-business', 'hk-family',
  'tw-tac', 'tw-sticker',
  'uae-tourist', 'uae-60days', 'uae-transit',
  'ru-evisa', 'ru-sticker', 'ru-business',
  'za-tourist', 'za-business', 'za-visit',
  'in-tourist', 'in-business',
  'eg-tourist', 'eg-business', 'eg-visit'
];

for (const svc of services) {
    const re = new RegExp(`image:\\s*"[^"]+"([\\s\\S]*?detailId:\\s*"${svc}")`, 'gm');
    code = code.replace(re, `image: "/images/services/${svc}.png"$1`);
}

fs.writeFileSync('constants.ts', code);
console.log('Successfully patched constants.ts!');
