const fs = require('fs');

let appCode = fs.readFileSync('App.tsx', 'utf8');

// Add module imports
if (!appCode.includes('import { BlogList }')) {
    appCode = appCode.replace('import { ContactWidget } from "./components/ContactWidget";', 
                              'import { ContactWidget } from "./components/ContactWidget";\nimport { BlogList } from "./components/BlogList";\nimport { BlogPostDetail } from "./components/BlogPostDetail";');

    // Add wrappers
    const wrappers = `
const BlogListPage: React.FC<{ onNavigate?: Function }> = ({ onNavigate }) => (
  <>
    <SEOHead customTitle="Kinh Nghiệm & Phân Tích Thực Chiến | Beetours Vietnam" />
    <BlogList onNavigate={onNavigate as any} />
  </>
);

const BlogDetailPage: React.FC<{ onNavigate?: Function }> = ({ onNavigate }) => (
  <>
    <BlogPostDetail onNavigate={onNavigate as any} />
  </>
);
`;
    // Insert wrappers right after ProcessPage
    appCode = appCode.replace('const ProcessPage: React.FC = () => (', `${wrappers}\nconst ProcessPage: React.FC = () => (`);

    // Add routes inside <Routes> under MainLayout
    const routes = `
            <Route path="/kinh-nghiem-visa" element={<MainLayout><BlogListPage /></MainLayout>} />
            <Route path="/kinh-nghiem-visa/:slug" element={<MainLayout><BlogDetailPage /></MainLayout>} />
    `;
    appCode = appCode.replace('<Route path="/quy-trinh" element={<MainLayout><ProcessPage /></MainLayout>} />', `<Route path="/quy-trinh" element={<MainLayout><ProcessPage /></MainLayout>} />${routes}`);
    
    // Support navigation helper
    appCode = appCode.replace(`else if (pageId === 'admin') navigate('/admin');`, `else if (pageId === 'admin') navigate('/admin');\n    else if (pageId === 'blog') navigate('/kinh-nghiem-visa');`);

    fs.writeFileSync('App.tsx', appCode);
    console.log('App.tsx routing patched');
}
