import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { BlogPost } from "../types";

export const AdminBlog: React.FC = () => {
    const { blogs, saveBlogPost, deleteBlogPost } = useData();
    const [isEditing, setIsEditing] = useState(false);
    
    const [currentBlog, setCurrentBlog] = useState<Partial<BlogPost>>({
        category: 'Kinh Nghiệm',
        published: true
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = (blog: BlogPost) => {
        setCurrentBlog(blog);
        setIsEditing(true);
    };

    const handleCreateNew = () => {
        setCurrentBlog({
            category: 'Kinh Nghiệm',
            published: true,
            createdAt: Date.now()
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!currentBlog.title || !currentBlog.slug) {
            alert("Tiêu đề và Slug không được để trống");
            return;
        }

        setIsSaving(true);
        try {
            const blogToSave: BlogPost = {
                id: currentBlog.id || `blog_${Date.now()}`,
                slug: currentBlog.slug || '',
                title: currentBlog.title || '',
                excerpt: currentBlog.excerpt || '',
                content: currentBlog.content || '',
                coverImage: currentBlog.coverImage || '',
                category: (currentBlog.category as any) || 'Kinh Nghiệm',
                createdAt: currentBlog.createdAt || Date.now(),
                published: currentBlog.published ?? false,
                author: currentBlog.author || 'Beetours Expert'
            };
            
            await saveBlogPost(blogToSave);
            alert("Lưu bài viết thành công!");
            setIsEditing(false);
        } catch (error) {
            alert("Lỗi khi lưu bài viết");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này vĩnh viễn?")) {
            await deleteBlogPost(id);
        }
    };

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
            .replace(/đ/gi, 'd')
            .replace(/\s+/g, '-')
            .replace(/[^\w\\-]+/g, '')
            .replace(/\\-\\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-xl border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{currentBlog.id ? "Sửa bài viết" : "Tạo bài viết mới"}</h2>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Quay lại</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Tiêu đề *</label>
                        <input 
                            className="w-full border p-2 rounded" 
                            value={currentBlog.title || ''} 
                            onChange={e => {
                                const title = e.target.value;
                                setCurrentBlog({...currentBlog, title, slug: generateSlug(title)});
                            }} 
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Đường dẫn tĩnh (Slug) *</label>
                            <input className="w-full border p-2 rounded" value={currentBlog.slug || ''} onChange={e => setCurrentBlog({...currentBlog, slug: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Chuyên mục</label>
                            <select className="w-full border p-2 rounded" value={currentBlog.category} onChange={e => setCurrentBlog({...currentBlog, category: e.target.value as any})}>
                                <option value="Kinh Nghiệm">Kinh Nghiệm</option>
                                <option value="Cảnh Báo">Cảnh Báo</option>
                                <option value="Chính Sách">Chính Sách</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1">Ảnh Bìa (URL)</label>
                        <input className="w-full border p-2 rounded" value={currentBlog.coverImage || ''} onChange={e => setCurrentBlog({...currentBlog, coverImage: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1">Mô tả ngắn (SEO Excerpt)</label>
                        <textarea className="w-full border p-2 rounded h-20" value={currentBlog.excerpt || ''} onChange={e => setCurrentBlog({...currentBlog, excerpt: e.target.value})} />
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-1">Nội dung bài viết (Hỗ trợ HTML)</label>
                        <textarea 
                            className="w-full border p-2 rounded h-96 font-mono text-sm" 
                            value={currentBlog.content || ''} 
                            onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} 
                            placeholder="<p>Nhập nội dung HTML hoặc văn bản...</p>"
                        />
                    </div>

                    <div className="flex items-center gap-4 py-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={currentBlog.published} onChange={e => setCurrentBlog({...currentBlog, published: e.target.checked})} className="w-5 h-5" />
                            <span className="font-bold">Xuất bản công khai</span>
                        </label>
                    </div>

                    <button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 w-full md:w-auto"
                    >
                        {isSaving ? "Đang lưu..." : "Lưu Bài Viết"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl border">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Quản Lý Blog & Kinh Nghiệm</h2>
                <button onClick={handleCreateNew} className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span> Thêm bài mới
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-y">
                            <th className="p-3 text-sm font-bold w-1/2">Tiêu đề</th>
                            <th className="p-3 text-sm font-bold">Chuyên mục</th>
                            <th className="p-3 text-sm font-bold">Trạng thái</th>
                            <th className="p-3 text-sm font-bold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500">Chưa có bài viết nào</td></tr>
                        ) : (
                            blogs.map(blog => (
                                <tr key={blog.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">
                                        <div className="font-bold text-slate-800">{blog.title}</div>
                                        <div className="text-xs text-gray-500">/{blog.slug}</div>
                                    </td>
                                    <td className="p-3 text-sm">{blog.category}</td>
                                    <td className="p-3 text-sm">
                                        {blog.published ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded">Công khai</span> : <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded">Bản nháp</span>}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(blog)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                            <button onClick={() => handleDelete(blog.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
