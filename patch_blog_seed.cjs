const fs = require('fs');

let contextCode = fs.readFileSync('contexts/DataContext.tsx', 'utf8');

// Add import
if (!contextCode.includes('import { DEFAULT_BLOGS }')) {
    contextCode = contextCode.replace(
        'import { PAGES, COUNTRIES_SUMMARY, SERVICE_DETAILS, DEFAULT_SITE_CONFIG } from "../constants";',
        'import { PAGES, COUNTRIES_SUMMARY, SERVICE_DETAILS, DEFAULT_SITE_CONFIG } from "../constants";\nimport { DEFAULT_BLOGS } from "../blog_data";'
    );
    
    // Set initial state
    contextCode = contextCode.replace(
        'const [blogs, setBlogs] = useState<BlogPost[]>([]);',
        'const [blogs, setBlogs] = useState<BlogPost[]>(DEFAULT_BLOGS);'
    );
    
    // In refreshData, if empty, set DEFAULT_BLOGS
    // previously I had:
    /*
      if (!db) {
         throw new Error("Firebase not configured");
      }
    */
   const blogFetchLogic = `
      // 5. Fetch Blogs
      try {
          const blogsSnapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
          if (!blogsSnapshot.empty) {
              const fetchedBlogs: BlogPost[] = [];
              blogsSnapshot.forEach((doc: any) => {
                  fetchedBlogs.push({ id: doc.id, ...doc.data() } as BlogPost);
              });
              setBlogs(fetchedBlogs);
          }
      } catch (err) {
          console.log("Could not fetch blogs, using defaults", err);
      }
  `;
    contextCode = contextCode.replace(
        /\/\/ 5. Fetch Blogs[\s\S]*?catch \(err\) \{[\s\S]*?\}/m,
        blogFetchLogic.trim()
    );

    // Update Seed Database to push blogs
    const blogSeedLogic = `
      const batch2 = db.batch();
      DEFAULT_BLOGS.forEach(blog => {
          batch2.set(db.collection("blogs").doc(blog.id), blog);
      });
      await batch2.commit();
    `;
    
    if (contextCode.includes('// Service Details')) {
        contextCode = contextCode.replace(
           '} catch (error) {\n          console.error("Error seeding databases:',
           `${blogSeedLogic}\n      } catch (error) {\n          console.error("Error seeding databases:`
        );
    }
    
    fs.writeFileSync('contexts/DataContext.tsx', contextCode);
    console.log('DataContext updated with DEFAULT_BLOGS');
} else {
    console.log('Already patched with DEFAULT_BLOGS');
}
