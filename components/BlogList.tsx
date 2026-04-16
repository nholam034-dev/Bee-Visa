import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { BlogPost } from "../types";
import { useNavigate } from "react-router-dom";

export const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const { blogs, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<string>("Tất cả");

  const categories = ["Tất cả", "Kinh Nghiệm", "Cảnh Báo", "Chính Sách"];

  // Filter published blogs
  const publishedBlogs = blogs.filter(b => b.published);
  
  const filteredBlogs = activeTab === "Tất cả" 
    ? publishedBlogs 
    : publishedBlogs.filter(b => b.category === activeTab);

  if (isLoading) {
    return <div className="min-h-screen pt-32 pb-20 text-center">Đang tải kiến thức chuyên môn...</div>;
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-[fadeInUp_0.6s_ease-out]">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-primary text-sm font-bold tracking-wide mb-4">
            GÓC CHUYÊN GIA
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Kinh Nghiệm & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Chiến Lược Visa</span>
          </h1>
          <p className="text-lg text-slate-600">
            Học hỏi các thủ thuật giải trình, xử lý điểm đen hồ sơ và cập nhật chính sách từ đội ngũ chuyên gia di trú của Beetours.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-md shadow-primary/20 hover:-translate-y-0.5'
                  : 'bg-white text-slate-600 border border-gray-200 hover:border-primary/30 hover:text-primary hover:bg-teal-50/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">article</span>
            <p className="text-slate-500 text-lg">Chưa có bài viết nào trong chuyên mục này.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <div 
                key={blog.id} 
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/kinh-nghiem-visa/${blog.slug}`)}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm shadow-sm text-xs font-bold text-slate-800">
                    {blog.category}
                  </div>
                  <img 
                    src={blog.coverImage || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"} 
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  
                  <p className="text-slate-600 line-clamp-3 mb-6 text-sm flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-slate-600">{blog.author || "Chuyên gia Beetours"}</span>
                    <span className="flex items-center gap-1 text-primary text-sm font-bold group-hover:translate-x-1 transition-transform">
                      Đọc tiếp <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
