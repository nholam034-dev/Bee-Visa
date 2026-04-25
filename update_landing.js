const fs = require('fs');
let code = fs.readFileSync('components/LandingPage.tsx', 'utf8');

// 1. Update State
code = code.replace(
  `const [formData, setFormData] = useState({ name: "", phone: "", dest: "", note: "" });`,
  `const [formData, setFormData] = useState({ name: "", phone: "", dest: "", quyMo: "", note: "" });`
);

// 2. Update handleSubmit
code = code.replace(
  `note: \`[ADS LANDING] Quan tâm: \${formData.dest || 'Chưa chọn'} - Note: \${formData.note}\`,`,
  `note: \`[ADS LANDING] Khách: \${formData.quyMo || 'Khách Nhỏ'} - Nước: \${formData.dest || 'Chưa chọn'} - Note: \${formData.note}\`,`
);

// 3. Clear FormData in handleSubmit
code = code.replace(
  `setFormData({ name: "", phone: "", dest: "", note: "" });`,
  `setFormData({ name: "", phone: "", dest: "", quyMo: "", note: "" });`
);

fs.writeFileSync('components/LandingPage.tsx', code);
