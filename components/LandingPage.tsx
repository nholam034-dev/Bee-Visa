
import React, { useState, useEffect } from "react";
import { useData } from "../contexts/DataContext";
import { COUNTRIES_SUMMARY } from "../constants";

export const LandingPage: React.FC = () => {
  const { siteConfig, addLead } = useData();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes countdown
  const [formData, setFormData] = useState({ name: "", phone: "", dest: "", quyMo: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addLead({
        name: formData.name,
        phone: formData.phone,
        email: "",
        note: `[ADS LANDING] Quan tâm: ${formData.dest || 'Chưa chọn'} | Quy mô: ${formData.quyMo || 'Cá nhân'} | Note: ${formData.note}`,
        source: "Ads Landing Page"
      });
      alert("🎉 Đăng ký thành công! Chuyên gia sẽ gọi lại cho bạn trong 5 phút nữa.");
      setFormData({ name: "", phone: "", dest: "", quyMo: "", note: "" });
    } catch (error) {
      alert("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans pb-20 lg:pb-0">
      {/* 1. REDESIGNED HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1100px] mx-auto px-4 h-[76px] flex justify-between items-center">
          
          {/* Logo Area - Smart Display Logic */}
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             {siteConfig.logoUrl ? (
                 // Trường hợp 1: Có Logo ảnh -> Chỉ hiện ảnh (Lớn & Rõ)
                 <img 
                    src={siteConfig.logoUrl} 
                    alt={siteConfig.brandName} 
                    className="h-12 md:h-14 w-auto object-contain hover:opacity-90 transition-opacity" 
                 />
             ) : (
                // Trường hợp 2: Không có Logo ảnh -> Hiện Logo chữ cách điệu
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-secondary to-orange-400 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/20 transform -rotate-3">
                        {siteConfig.brandName.charAt(0)}
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xl font-black text-slate-900 leading-none tracking-tight">{siteConfig.brandName}</span>
                        <span className="text-[10px] font-bold text-slate-500 tracking-[0.25em] uppercase mt-1">Global Visa Services</span>
                    </div>
                </div>
             )}
          </div>

          {/* Hotline CTA - Premium Pill Style */}
          <a 
            href={`tel:${siteConfig.hotline.replace(/\D/g,'')}`}
            className="group flex items-center gap-3 bg-red-50 hover:bg-red-100 border border-red-100 pl-1 pr-5 py-1.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-xl animate-tada">call</span>
            </div>
            <div className="hidden sm:flex flex-col">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider leading-none mb-0.5">Hotline 24/7</span>
                <span className="text-xl font-black text-red-700 leading-none group-hover:text-red-800">{siteConfig.hotline}</span>
            </div>
            {/* Mobile Compact View */}
            <span className="sm:hidden text-lg font-black text-red-700">{siteConfig.hotline}</span>
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION WITH FORM */}
      <div className="relative bg-[#002f34] overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')] bg-cover bg-center opacity-20"></div>
        
        <div className="max-w-[1100px] mx-auto px-4 py-12 lg:py-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left text-white">
              <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                 🔥 Báo Giá All-In 100% - Không Phí Ẩn
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6">
                Giải Pháp An Tâm <br className="hidden md:block"/>
                <span className="text-secondary text-3xl sm:text-5xl lg:text-6xl">Cho Hồ Sơ Visa Khó</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed">
                <span className="material-symbols-outlined text-green-400 align-middle mr-1">check_circle</span> Trị dứt điểm hồ sơ yếu, hộ chiếu trắng <br/>
                <span className="material-symbols-outlined text-green-400 align-middle mr-1">check_circle</span> Luyện phỏng vấn 1-1 với Chuyên gia <br/>
                <span className="material-symbols-outlined text-green-400 align-middle mr-1">check_circle</span> Hoàn 100% phí dịch vụ nếu bị từ chối
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10">
                    <span className="text-2xl font-bold text-white">100%</span>
                    <span className="text-[10px] text-slate-300 uppercase">Minh bạch<br/>giá cả</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md border border-white/10">
                    <span className="text-2xl font-bold text-white">12k+</span>
                    <span className="text-[10px] text-slate-300 uppercase">Visa<br/>thành công</span>
                 </div>
              </div>
            </div>

            {/* Right Form - High Conversion */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-secondary/50">
              <div className="bg-secondary p-4 text-center">
                <h3 className="text-slate-900 font-black text-xl uppercase">Đăng Ký Tư Vấn Miễn Phí</h3>
                <p className="text-slate-800 text-xs font-bold mt-1 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-base">timer</span>
                  Ưu đãi kết thúc sau: <span className="bg-black text-white px-1.5 py-0.5 rounded font-mono">{formatTime(timeLeft)}</span>
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Họ và tên *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400 material-symbols-outlined text-lg">person</span>
                    <input 
                      type="text" 
                      required
                      className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900"
                      placeholder="Nhập tên của bạn"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Số điện thoại *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400 material-symbols-outlined text-lg">phone</span>
                    <input 
                      type="tel" 
                      required
                      pattern="[0-9]{10,11}"
                      className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Quy Mô Khách *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400 material-symbols-outlined text-lg">group</span>
                    <select 
                      className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 bg-white"
                      value={formData.quyMo}
                      onChange={e => setFormData({...formData, quyMo: e.target.value})}
                      required
                    >
                      <option value="">Chọn quy mô...</option>
                      <option value="Cá nhân (1 người)">Cá nhân (1 người)</option>
                      <option value="Khách Đoàn / Gia đình">Khách Đoàn / Gia đình (2+ người)</option>
                      <option value="Doanh nghiệp (B2B)">Doanh nghiệp (Cần xuất HĐ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nước muốn đến</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400 material-symbols-outlined text-lg">flight_takeoff</span>
                    <select 
                      className="w-full h-11 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-slate-900 bg-white"
                      value={formData.dest}
                      onChange={e => setFormData({...formData, dest: e.target.value})}
                    >
                      <option value="">Chọn quốc gia...</option>
                      {COUNTRIES_SUMMARY.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      <option value="Khác">Nước khác</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-1 mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Đang Gửi..." : "NHẬN TƯ VẤN NGAY"}
                  <span className="material-symbols-outlined animate-bounce">arrow_downward</span>
                </button>
                
                <p className="text-[10px] text-center text-slate-400">
                  *Thông tin của bạn được bảo mật tuyệt đối 100%.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* 3. TRUST INDICATORS (DESIGN FIX) */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4 text-center">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Đối tác chiến lược & Chứng nhận</p>
           
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-all duration-500">
              {/* VFS Global Styled */}
              <div className="flex items-center gap-2 select-none group cursor-default">
                  <span className="font-black text-2xl text-slate-800 tracking-tight group-hover:text-[#e86022] transition-colors">VFS.</span>
                  <span className="font-light text-2xl text-slate-600">Global</span>
              </div>

              {/* TLScontact Styled */}
              <div className="flex items-center gap-1 select-none group cursor-default">
                  <div className="bg-slate-800 text-white font-bold text-sm px-1.5 py-0.5 rounded-sm group-hover:bg-[#d40e14] transition-colors">TLS</div>
                  <span className="font-bold text-xl text-slate-800 tracking-tight">contact</span>
              </div>

              {/* IATA Styled */}
              <div className="flex items-center gap-2 select-none group cursor-default">
                  <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#003087] transition-colors">verified</span>
                  <span className="font-black text-2xl text-slate-800 tracking-widest group-hover:text-[#003087] transition-colors">IATA</span>
              </div>

              {/* VCCI Styled */}
              <div className="flex flex-col items-center leading-none select-none group cursor-default">
                  <span className="font-black text-xl text-slate-800 tracking-wider group-hover:text-[#c69c6d] transition-colors">VCCI</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Member</span>
              </div>
              
              {/* AmCham Styled */}
              <div className="font-black text-xl text-slate-700 tracking-tighter border-2 border-slate-300 px-2 py-0.5 rounded group-hover:border-[#002868] group-hover:text-[#002868] transition-colors select-none cursor-default">
                  AmCham
              </div>
           </div>
        </div>
      </div>

      {/* 4. WHY US (PAIN & GAIN) */}
      <div className="py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Tại Sao Chọn Beetours?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Chúng tôi không chỉ nhận hồ sơ, chúng tôi cung cấp <span className="font-bold text-primary">giải pháp tối ưu</span> để biến giấc mơ của bạn thành hiện thực.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">psychology</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 block">Phân Tích "Điểm Mù"</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Phát hiện nguyên nhân hồ sơ yếu mà bạn không nhận ra. Cam kết xây dựng kịch bản giải trình hợp lý nhất, tỷ lệ đậu cao.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">groups</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 block">Tối Ưu Khách Đoàn</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Xử lý hồ sơ nhóm gia đình tiện lợi. Bạn chỉ cần gửi danh sách cơ bản, mọi thủ tục điền form và nộp hộ đã có công ty lo liệu.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">domain</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 block">Đặc Quyền B2B</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Cung cấp báo giá All-in, hóa đơn VAT đỏ, làm hợp đồng thanh toán công nợ cuối tháng rành mạch. Không cần ứng tiền túi lắt nhắt.</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-lg hover:-translate-y-2 transition-transform duration-300 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">verified_user</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 block">Bộ Cam Kết Bảo Vệ</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Giá chốt là giá cuối cùng, không tự động thêm phí. <b>Cam kết hoàn trả 100%</b> tiền dịch vụ nếu hồ sơ rớt do nhầm lẫn sơ suất của chuyên viên.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4.5 SOCIAL PROOF */}
      <div className="bg-slate-50 py-16 border-t border-b border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Hơn 12,000 Khách Hàng Đã Tin Chọn</h2>
            <p className="text-slate-500">Những câu chuyện thực tế từ các hồ sơ "tưởng chừng vô vọng".</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="flex gap-1 text-yellow-400 mb-3">
                 <span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"Nhóm nhà em 8 người, có mẹ bỉm sữa lại thêm 2 bạn làm freelancer không sao kê lương rõ ràng. Quanh đi quẩn lại may nhờ chuyên viên phân tích đường tiền rõ ràng nên xin visa Úc pass 100% không rớt ai."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">H</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Chị Hoàng Yến</h4>
                  <p className="text-xs text-slate-400">Trưởng nhóm 8 Pax (Visa Úc)</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="flex gap-1 text-yellow-400 mb-3">
                 <span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"Sếp tôi đi công tác châu Âu gấp nhưng lại chỉ thích làm việc qua email, không muốn gặp mặt. Beetours chốt Hợp đồng chuẩn B2B, xuất hóa đơn VAT đầy đủ, thủ tục ký tá online rẹt rẹt cực kỳ nhàn cho Hành chính."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">T</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Trần Thanh Trúc</h4>
                  <p className="text-xs text-slate-400">Thư ký Giám Đốc (Visa Schengen)</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="flex gap-1 text-yellow-400 mb-3">
                 <span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span><span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"Từng trượt visa Mỹ 1 lần vì trả lời lúng túng. Sang đây được luyện phỏng vấn 1-1, bắt trúng câu hỏi của LSQ, lúc vô tự tin hẳn, chưa tới 3 phút là LSQ báo đậu rồi."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">K</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Anh Khang Nguyễn</h4>
                  <p className="text-xs text-slate-400">Visa B1/B2 Mỹ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. URGENCY BANNER */}
      <div className="bg-primary py-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="max-w-[1100px] mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Đừng Để Hồ Sơ Visa Làm Lỡ Chuyến Đi Của Bạn</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="h-14 px-8 bg-secondary hover:bg-secondary-dark text-slate-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
               >
                 Đăng Ký Nhận Báo Giá
               </button>
               <a 
                 href="https://zalo.me/0944555900"
                 target="_blank"
                 rel="noreferrer" 
                 className="h-14 px-8 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
               >
                 Chat Zalo: 0944555900
               </a>
            </div>
         </div>
      </div>

      {/* 6. SIMPLE FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm mb-14 lg:mb-0">
        <div className="max-w-[1100px] mx-auto px-4">
          <p className="font-bold text-white mb-2">{siteConfig.brandName} - Công ty TNHH Beetours Việt Nam</p>
          <p className="mb-1">{siteConfig.address}</p>
          <p>Hotline: {siteConfig.hotline} | Email: {siteConfig.email}</p>
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs">
            © 2024 All rights reserved. This is a specialized landing page for advertising purposes.
          </div>
        </div>
      </footer>

      {/* 7. MOBILE STICKY FOOTER (FOR ADS) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex gap-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
          <a 
            href="https://zalo.me/0944555900" 
            target="_blank"
            rel="noreferrer" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 h-10 shadow-lg"
          >
              <span className="font-sans text-xs font-black uppercase">Chat Zalo</span>
          </a>
          <a 
            href={`tel:${siteConfig.hotline.replace(/\D/g,'')}`} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex items-center justify-center gap-2 h-10 shadow-lg animate-pulse"
          >
              <span className="material-symbols-outlined text-lg">call</span>
              <span className="font-sans text-xs font-black uppercase">Gọi Ngay</span>
          </a>
      </div>
    </div>
  );
};
