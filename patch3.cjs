const fs = require('fs');

let code = fs.readFileSync('constants.ts', 'utf8');

const replacements = [
  {
    find: /{\s*title:\s*"Visa Công Tác \(Business\)",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/au-600\.png"/,
    replace: (match) => match.replace('/images/services/au-600.png', '/images/services/au-business.png')
  },
  {
    find: /{\s*title:\s*"Visa Thăm Thân \(Family\)",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/au-600\.png"/,
    replace: (match) => match.replace('/images/services/au-600.png', '/images/services/au-family.png')
  },
  {
    find: /{\s*title:\s*"Visa Nhóm \(Group\)",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/nz-visitor\.png"/,
    replace: (match) => match.replace('/images/services/nz-visitor.png', '/images/services/nz-group.png')
  },
  {
    find: /{\s*title:\s*"Visa Thăm Thân",\s*description:\s*"Thăm người thân, bạn bè đang sống tại Nhật\.",\s*image:\s*"\/images\/services\/jp-tourist\.png"/,
    replace: (match) => match.replace('/images/services/jp-tourist.png', '/images/services/jp-family.png')
  },
  {
    find: /{\s*title:\s*"Visa 6 Tháng\/1 Năm",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/cn-business\.png"/,
    replace: (match) => match.replace('/images/services/cn-business.png', '/images/services/cn-multiple.png')
  },
  {
    find: /{\s*title:\s*"Visa Quan Hồng \(Đoàn\)",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/tw-sticker\.png"/,
    replace: (match) => match.replace('/images/services/tw-sticker.png', '/images/services/tw-group.png')
  },
  {
    find: /{\s*title:\s*"E-Visa 1 Năm \/ 5 Năm",\s*description:\s*"[^"]+",\s*image:\s*"\/images\/services\/in-tourist\.png"/,
    replace: (match) => match.replace('/images/services/in-tourist.png', '/images/services/in-multiple.png')
  }
];

let modified = false;
for (const r of replacements) {
    if (r.find.test(code)) {
        code = code.replace(r.find, r.replace);
        modified = true;
    } else {
        console.warn('Could not find match for:', r.find);
    }
}

if (modified) {
    fs.writeFileSync('constants.ts', code);
    console.log('Successfully applied patch3.cjs!');
} else {
    console.log('No modifications made.');
}
