const fs = require('fs');

// --- 1. UPDATE types.ts ---
let typesCode = fs.readFileSync('types.ts', 'utf8');

if (!typesCode.includes('export interface BlogPost')) {
  const blogType = `
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / HTML
  coverImage: string;
  category: 'Kinh Nghiệm' | 'Cảnh Báo' | 'Phân Tích' | 'Chính Sách';
  createdAt: number;
  published: boolean;
  author: string;
}
`;
  typesCode += blogType;
  fs.writeFileSync('types.ts', typesCode);
  console.log('types.ts updated');
}

// --- 2. UPDATE DataContext.tsx ---
let contextCode = fs.readFileSync('contexts/DataContext.tsx', 'utf8');

if (!contextCode.includes('blogs: BlogPost[]')) {
  // Add import and interface props
  contextCode = contextCode.replace(
    'export interface DataContextType {',
    "import { BlogPost } from '../types';\nexport interface DataContextType {\n  blogs: BlogPost[];\n  saveBlogPost: (blog: BlogPost) => Promise<void>;\n  deleteBlogPost: (id: string) => Promise<void>;"
  );

  // Add state
  contextCode = contextCode.replace(
    'const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);',
    'const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);\n  const [blogs, setBlogs] = useState<BlogPost[]>([]);'
  );

  // Add fetch logic in refreshData
  const fetchBlogLogic = `
      // 5. Fetch Blogs
      try {
          const blogsSnapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
          const fetchedBlogs: BlogPost[] = [];
          blogsSnapshot.forEach((doc: any) => {
              fetchedBlogs.push({ id: doc.id, ...doc.data() } as BlogPost);
          });
          setBlogs(fetchedBlogs);
      } catch (err) {
          console.log("Could not fetch blogs", err);
      }
  `;
  contextCode = contextCode.replace('} catch (error) {', `${fetchBlogLogic}\n    } catch (error) {`);

  // Add save & delete functions
  const contextFuncs = `
  const saveBlogPost = async (blog: BlogPost) => {
      if (!db) { alert("Thiếu Firebase"); return; }
      try {
          await db.collection("blogs").doc(blog.id).set(blog);
          setBlogs(prev => {
              const existingIndex = prev.findIndex(b => b.id === blog.id);
              if (existingIndex >= 0) {
                  const newBlogs = [...prev];
                  newBlogs[existingIndex] = blog;
                  return newBlogs;
              }
              return [blog, ...prev];
          });
      } catch (err) {
          console.error("Error saving blog", err); throw err;
      }
  };

  const deleteBlogPost = async (id: string) => {
      if (!db) return;
      try {
          await db.collection("blogs").doc(id).delete();
          setBlogs(prev => prev.filter(b => b.id !== id));
      } catch (err) {
          console.error("Error deleting blog", err); throw err;
      }
  };
  `;
  contextCode = contextCode.replace('const saveSiteConfig = async', `${contextFuncs}\n  const saveSiteConfig = async`);

  // Return values
  contextCode = contextCode.replace(
    /return \(\s*<DataContext\.Provider\s+value=\{\{([\s\S]*?)\}\}\s*>/m,
    (match, p1) => {
       return `return (\n    <DataContext.Provider value={{${p1},\n      blogs,\n      saveBlogPost,\n      deleteBlogPost\n    }}>`;
    }
  );

  fs.writeFileSync('contexts/DataContext.tsx', contextCode);
  console.log('DataContext.tsx updated');
}
