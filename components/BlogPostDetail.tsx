import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { SEOHead } from "./SEOHead";

export const BlogPostDetail: React.FC<{ onNavigate: Function }> = ({ onNavigate }) => {
  const { slug } = useParams<{ slug: string }>();
  const { blogs, isLoading } = useData();

  if (isLoading) {
    return <div className="min-h-screen pt-32 pb-20 text-center">Đang tải kiến thức chuyên môn...</div>;
  }

  const blog = blogs.find(b => b.slug === slug && b.published);

  if (!blog) {
    return <Navigate to="/kinh-nghiem-visa" replace />;
  }

  return (
    <>
      <SEOHead 
        customTitle={`${blog.title} | Beetours Vietnam`}
        customDescription={blog.excerpt}
      />
      <div className="pt-24 pb-20 bg-white min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-12 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-primary text-xs font-bold">
                {blog.category}
              </span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
              </span>
              <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">person</span>
                {blog.author || "Chuyên gia Beetours"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {blog.coverImage && (
              <div className="aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mt-8">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Content Body */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-primary hover:prose-a:text-secondary prose-img:rounded-xl">
             {/* Using basic dangerouslySetInnerHTML as we assume admin inputs sanitized HTML or Markdown-rendered HTML */}
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\\n/g, '<br/>') }} />
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
               <h4 className="font-bold text-lg text-slate-900">Bạn đang gặp rắc rối với hồ sơ?</h4>
               <p className="text-slate-600 text-sm">Chuyên gia Beetours sẽ thẩm định rủi ro miễn phí.</p>
            </div>
            <button 
              onClick={() => onNavigate('/lien-he')}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-primary transition-colors whitespace-nowrap"
            >
              Liên Hệ Chuyên Gia
            </button>
          </div>

        </article>
      </div>
    </>
  );
};
