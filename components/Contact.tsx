
import React, { useState } from "react";
import { useData } from "../contexts/DataContext";

export const Contact: React.FC = () => {
  const { addLead } = useData();
  const [formData, setFormData] = useState({
      name: "",
      phone: "",
      email: "",
      note: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
          await addLead({
              ...formData,
              source: "Contact Page"
          });
          alert("Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm.");
          setFormData({ name: "", phone: "", email: "", note: "" });
      } catch (error) {
          alert("Có lỗi xảy ra, vui lòng thử lại.");
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
    <div className="w-full bg-background-light min-h-screen pb-16">
      {/* Header / Hero for Contact Page */}
      <div className="bg-[#002f34] relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/office/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Đội ngũ chuyên gia của Beetours luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc về hồ sơ visa của bạn.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-fit">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">business</span>
              Thông Tin Liên Hệ
            </h2>

            <div className="flex flex-col gap-6">
              {/* Company Name */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Đơn vị chủ quản</p>
                <p className="text-lg font-bold text-primary">Công ty TNHH Beetours Việt Nam</p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Địa chỉ</p>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    Toà nhà News Building, Số 21 ngõ 27 Đại Cồ Việt, Phường Bạch Mai, Hà Nội, Việt Nam
                  </p>
                </div>
              </div>

              {/* Hotline */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hotline tư vấn</p>
                  <a href="tel:19000310" className="text-xl font-black text-slate-900 hover:text-secondary transition-colors">
                    1900 0310
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email hỗ trợ</p>
                  <a href="mailto:info@beetours.com" className="text-slate-700 font-medium hover:text-primary transition-colors">
                    info@beetours.com
                  </a>
                </div>
              </div>

              {/* License Info */}
              <div className="mt-4 pt-6 border-t border-gray-100">
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                   <span className="material-symbols-outlined text-yellow-600 text-2xl">verified</span>
                   <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Giấy phép KDLHQT</p>
                      <p className="text-sm font-bold text-slate-800">01-136/2015 /TCDL-GP LHQT</p>
                      <p className="text-xs text-slate-500 mt-1">Cấp ngày: 27/10/2015</p>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 lg:p-10 border border-gray-100">
             <h2 className="text-2xl font-black text-slate-900 mb-2">Gửi Tin Nhắn</h2>
             <p className="text-slate-500 mb-8">Để lại thông tin, chuyên viên tư vấn sẽ liên hệ lại trong vòng 30 phút.</p>
             
             <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-700">Họ và tên *</label>
                   <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="Nguyễn Văn A" 
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-slate-700">Số điện thoại *</label>
                   <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="09xxxxxxx" 
                   />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-sm font-bold text-slate-700">Email</label>
                   <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    placeholder="example@gmail.com" 
                   />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                   <label className="text-sm font-bold text-slate-700">Nội dung cần tư vấn</label>
                   <textarea 
                    rows={4} 
                    value={formData.note}
                    onChange={(e) => setFormData({...formData, note: e.target.value})}
                    className="p-4 rounded-lg border border-gray-300 bg-white text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" 
                    placeholder="Tôi muốn xin visa du lịch Anh Quốc..."
                   ></textarea>
                </div>
                <div className="md:col-span-2 mt-2">
                   <button 
                    disabled={isSubmitting}
                    className="h-14 px-8 rounded-lg bg-secondary hover:bg-secondary-dark text-slate-900 font-bold text-base transition-all shadow-lg hover:shadow-yellow-500/50 w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                      {isSubmitting ? 'Đang gửi...' : (
                          <>
                              <span className="material-symbols-outlined">send</span>
                              Gửi Yêu Cầu
                          </>
                      )}
                   </button>
                </div>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
};
