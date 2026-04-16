const fs = require('fs');

let adminCode = fs.readFileSync('components/AdminDashboard.tsx', 'utf8');

if (!adminCode.includes('import { AdminBlog }')) {
    // 1. Add Import
    adminCode = adminCode.replace('import { ImageUploader } from "./ImageUploader";', 'import { ImageUploader } from "./ImageUploader";\nimport { AdminBlog } from "./AdminBlog";');
    
    // 2. Add Tab active state typing
    adminCode = adminCode.replace(`useState<'content' | 'leads' | 'settings' | 'account' | 'users'>('content')`, `useState<'content' | 'leads' | 'settings' | 'account' | 'users' | 'blog'>('content')`);

    // 3. Add Tab Navigation Button
    const blogTabButton = `
             <button
               onClick={() => { setActiveTab('blog'); setIsSidebarOpen(false); }}
               className={\`w-full text-left p-3 rounded-xl mb-2 font-bold flex items-center gap-3 transition-colors \${activeTab === 'blog' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}\`}
             >
               <span className="material-symbols-outlined">article</span> {isSidebarOpen && "Tin tức & Blog"}
             </button>
    `;

    // Inject before settings tab
    adminCode = adminCode.replace(/<button[^>]*onClick=\{\(\) => \{ setActiveTab\('settings'\).*?<\/button>/s, (match) => {
        return `${blogTabButton}\n${match}`;
    });

    // 4. Render AdminBlog in main content area
    adminCode = adminCode.replace(/\{activeTab === 'settings' && \(/se, `{activeTab === 'blog' && (\n          <AdminBlog />\n        )}\n\n        {activeTab === 'settings' && (`);

    fs.writeFileSync('components/AdminDashboard.tsx', adminCode);
    console.log('AdminDashboard patched with Blog tab!');
} else {
    console.log('Already patched!');
}
