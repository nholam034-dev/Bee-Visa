const fs = require('fs');

let code = fs.readFileSync('constants.ts', 'utf8');

// Replace all remaining `image: "https://picsum.photos..."` 
// with `/images/services/${detailId}.png` by finding the closest detailId after it!
// Oh wait, `heroImage:` inside `SERVICE_DETAILS` doesn't have a detailId after it, it IS the object with key.

// Actually, simpler: Any `https://picsum...` inside an object that has `id: "some_key"` (in PAGES) or `id: "some_svc"` (in SERVICE_DETAILS)
const servicesList = [
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

// 1. Replace `image:` inside the arrays
for (const svc of servicesList) {
    // This will replace all occurrences of `image: "https://picsum..."` that are followed by `detailId: "svc"`
    const re = new RegExp(`image:\\s*"https://picsum\\.photos[^"]+"([\\s\\S]*?detailId:\\s*"${svc}")`, 'gm');
    code = code.replace(re, `image: "/images/services/${svc}.png"$1`);
}

// 2. Replace `heroImage:` inside SERVICE_DETAILS
for (const svc of servicesList) {
    const re = new RegExp(`("${svc}":\\s*\\{[\\s\\S]*?heroImage:\\s*")https://picsum\\.photos[^"]+(")`, 'gm');
    code = code.replace(re, `$1/images/services/${svc}.png$2`);
}

// 3. Replace any stragglers in `PAGES` shortcuts
// e.g. { id: "usa", name: "Mỹ", ..., image: "https://..." } => /images/destinations/my.png
const destMap2 = {
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
for (const [key, slug] of Object.entries(destMap2)) {
    const re = new RegExp(`(id:\\s*"${key}"[\\s\\S]*?image:\\s*")https://picsum\\.photos[^"]+(")`, 'gm');
    code = code.replace(re, `$1/images/destinations/${slug}.png$2`);
}

// Any remaining picsum? Just set to generic logo or empty
code = code.replace(/https:\/\/picsum\.photos\/[^"]+/g, '/logo.png');

fs.writeFileSync('constants.ts', code);
console.log('Successfully patched constants.ts part 2!');
