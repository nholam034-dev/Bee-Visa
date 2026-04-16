
import React, { useState } from "react";
import { COUNTRIES_SUMMARY } from "../constants";
import { PageData } from "../types";
import { useData } from "../contexts/DataContext";

interface HomeProps {
  onNavigate: (pageId: string) => void;
  data: PageData;
}

const TESTIMONIALS = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    role: "Du học sinh Mỹ",
    content: "Mình từng bị từ chối visa F1 hai lần. Đến với Beetours, các anh chị đã giúp mình xây dựng lại kịch bản phỏng vấn và giải trình tài chính. Kết quả đậu ngay lần nộp lại đầu tiên!",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop",
    visa: "Visa Mỹ F1"
  },
  {
    id: 2,
    name: "Chị Lan Anh",
    role: "Kinh doanh tự do",
    content: "Hồ sơ của mình khá yếu vì không chứng minh được thu nhập qua ngân hàng. Beetours đã tư vấn gói hồ sơ diện du lịch tự túc Nhật Bản rất hợp lý. Dịch vụ tận tâm, 5 sao!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    visa: "Visa Nhật Bản"
  },
  {
    id: 3,
    name: "Gia đình anh Hùng",
    role: "Định cư Úc",
    content: "Cảm ơn team đã hỗ trợ gia đình mình xin visa thăm thân Úc 3 năm. Thủ tục online nhanh gọn, mình không cần phải đi lại nhiều. Rất uy tín.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    visa: "Visa Úc 600"
  }
];

export const Home: React.FC<HomeProps> = ({ onNavigate, data }) => {
  const { addLead } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [consultForm, setConsultForm] = useState({ name: "", phone: "", dest: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter countries for search
  const filteredCountries = COUNTRIES_SUMMARY.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await addLead({
            name: consultForm.name,
            phone: consultForm.phone,
            email: "",
            note: `Đăng ký từ Landing Page - Quan tâm: ${consultForm.dest || 'Chưa chọn'}`,
            source: "Home Landing Page"
        });
        alert("Đã gửi thông tin! Chuyên viên sẽ gọi lại cho bạn trong 5 phút.");
        setConsultForm({ name: "", phone: "", dest: "" });
    } catch (err) {
        alert("Lỗi kết nối. Vui lòng thử lại.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white font-sans">
      {/* 1. HERO SECTION - MODERNIZED */}
      <div className="relative w-full h-[650px] lg:h-[800px] bg-slate-900 overflow-hidden flex items-center justify-center">
         {/* Background Image with Parallax Effect */}
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-[pulse_10s_infinite_alternate]"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')` }}
         ></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
         
         <div className="relative z-10 w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl mb-6 animate-[fadeInDown_1s]">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs font-bold text-white uppercase tracking-widest">Tỷ lệ đậu visa 99%</span>
             </div>

             {/* Main Headline */}
             <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tight drop-shadow-2xl max-w-4xl animate-[fadeInUp_1s_0.2s]">
                Chinh Phục Visa <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-200 to-secondary">Đi Khắp Thế Giới</span>
             </h1>

             {/* Sub Headline */}
             <p className="text-lg text-slate-200 max-w-2xl mb-10 leading-relaxed font-light animate-[fadeInUp_1s_0.4s]">
                Chuyên gia xử lý hồ sơ khó, hộ chiếu trắng, từng bị từ chối. 
                Cam kết hoàn phí dịch vụ nếu không đạt kết quả.
             </p>

             {/* Quick Search Bar */}
             <div className="w-full max-w-3xl bg-white p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row gap-2 animate-[fadeInUp_1s_0.6s]">
                 <div className="flex-1 relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400">flight_takeoff</span>
                    </div>
                    <input 
                        type="text" 
                        placeholder="Bạn muốn đi đâu? (Mỹ, Úc, Nhật...)" 
                        className="w-full h-14 pl-10 pr-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary outline-none text-slate-900 font-medium transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* Dropdown Suggestions */}
                    {searchTerm && (
                        <div className="absolute top-full left-0 w-full bg-white rounded-xl shadow-xl mt-2 border border-gray-100 overflow-hidden z-50">
                            {filteredCountries.length > 0 ? filteredCountries.map(c => (
                                <div key={c.id} onClick={() => onNavigate(c.id)} className="flex items-center gap-3 p-3 hover:bg-teal-50 cursor-pointer transition-colors text-left">
                                    <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-bold text-slate-900">{c.name}</p>
                                        <p className="text-xs text-slate-500">{c.description}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-4 text-slate-500 text-sm">Không tìm thấy kết quả</div>
                            )}
                        </div>
                    )}
                 </div>
                 <button 
                    onClick={() => document.getElementById('consult-form')?.scrollIntoView({behavior: 'smooth'})}
                    className="h-14 px-8 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                 >
                    <span>Tư Vấn Ngay</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                 </button>
             </div>

             {/* Quick Stats */}
             <div className="mt-12 flex items-center justify-center gap-8 md:gap-16 text-white/80 animate-[fadeIn_2s_1s]">
                 <div className="text-center">
                     <p className="text-2xl md:text-3xl font-black text-white">15+</p>
                     <p className="text-[10px] uppercase tracking-wider">Năm Kinh Nghiệm</p>
                 </div>
                 <div className="w-px h-8 bg-white/20"></div>
                 <div className="text-center">
                     <p className="text-2xl md:text-3xl font-black text-white">12k+</p>
                     <p className="text-[10px] uppercase tracking-wider">Visa Thành Công</p>
                 </div>
                 <div className="w-px h-8 bg-white/20"></div>
                 <div className="text-center">
                     <p className="text-2xl md:text-3xl font-black text-white">24/7</p>
                     <p className="text-[10px] uppercase tracking-wider">Hỗ Trợ Tận Tâm</p>
                 </div>
             </div>
         </div>
      </div>

      {/* 2. VALUE PROPOSITION (WHY CHOOSE US) */}
      <div className="py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">Tại Sao Chọn Beetours?</h2>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Giải Pháp Visa Toàn Diện <br/> Cho Người Việt</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-4xl">verified_user</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">Tỷ Lệ Đậu Cao</h4>
                      <p className="text-slate-500 leading-relaxed">Quy trình thẩm định hồ sơ 3 lớp (Sơ thẩm - Pháp lý - Lãnh sự) giúp phát hiện và khắc phục điểm yếu trước khi nộp.</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-4xl">bolt</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">Xử Lý Khẩn Cấp</h4>
                      <p className="text-slate-500 leading-relaxed">Hỗ trợ các ca cần visa gấp trong 2-3 ngày. Đặt lịch hẹn VIP lăn tay sớm, không phải chờ đợi lâu.</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:-translate-y-2">
                      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <span className="material-symbols-outlined text-4xl">gavel</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">Xử Lý Hồ Sơ Khó</h4>
                      <p className="text-slate-500 leading-relaxed">Chuyên trị các ca: Hộ chiếu trắng, Freelancer không chứng minh thu nhập, từng bị từ chối visa nhiều lần.</p>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. POPULAR DESTINATIONS */}
      <div id="services" className="py-20 bg-white">
         <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                 <div>
                     <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-3">Điểm Đến Hàng Đầu</h2>
                     <h3 className="text-3xl md:text-4xl font-black text-slate-900">Dịch Vụ Visa Phổ Biến</h3>
                 </div>
                 <button onClick={() => onNavigate('process')} className="hidden md:flex items-center gap-2 text-slate-500 font-bold hover:text-primary transition-colors group">
                     Xem quy trình làm việc
                     <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </button>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                 {COUNTRIES_SUMMARY.map((country) => (
                     <div 
                        key={country.id}
                        onClick={() => onNavigate(country.id)}
                        className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
                     >
                         <div 
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: `url('${country.image}')` }}
                         ></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                         
                         <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                             {country.badge}
                         </div>

                         <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                             <h4 className="text-xl font-bold text-white mb-1">{country.name}</h4>
                             <p className="text-slate-300 text-xs line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{country.description}</p>
                             <div className="flex items-center gap-2 text-secondary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                 Xem chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>

      {/* 4. TESTIMONIALS (SOCIAL PROOF) */}
      <div className="py-20 bg-[#002f34] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                  <span className="material-symbols-outlined text-5xl text-secondary mb-4">format_quote</span>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">Khách Hàng Nói Về Beetours</h2>
                  <p className="text-slate-300 max-w-2xl mx-auto">Sự hài lòng của hơn 12.000 khách hàng là minh chứng rõ nhất cho chất lượng dịch vụ của chúng tôi.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((item) => (
                      <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                          <div className="flex items-center gap-4 mb-6">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-secondary" />
                              <div>
                                  <h5 className="font-bold text-white">{item.name}</h5>
                                  <p className="text-xs text-slate-400 uppercase tracking-wider">{item.visa}</p>
                              </div>
                          </div>
                          <div className="mb-4">
                              {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-secondary text-sm filled-icon">star</span>)}
                          </div>
                          <p className="text-slate-200 text-sm leading-relaxed italic">"{item.content}"</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 5. CONSULTATION FORM & CTA */}
      <div id="consult-form" className="py-20 bg-slate-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                  {/* Left: Image & Text */}
                  <div className="md:w-1/2 bg-primary p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                      <div className="relative z-10">
                          <h3 className="text-3xl font-black mb-4">Đừng Để Visa <br/> Cản Bước Chân Bạn</h3>
                          <p className="text-slate-100 mb-8 leading-relaxed opacity-90">
                              Để lại thông tin, chuyên gia Beetours sẽ phân tích hồ sơ và tính toán tỷ lệ đậu miễn phí cho bạn ngay hôm nay.
                          </p>
                          <ul className="space-y-3">
                              <li className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-secondary text-slate-900 flex items-center justify-center"><span className="material-symbols-outlined text-sm">check</span></span>
                                  <span className="font-medium">Phản hồi trong 5 phút</span>
                              </li>
                              <li className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-secondary text-slate-900 flex items-center justify-center"><span className="material-symbols-outlined text-sm">check</span></span>
                                  <span className="font-medium">Bảo mật thông tin 100%</span>
                              </li>
                              <li className="flex items-center gap-3">
                                  <span className="w-6 h-6 rounded-full bg-secondary text-slate-900 flex items-center justify-center"><span className="material-symbols-outlined text-sm">check</span></span>
                                  <span className="font-medium">Không phát sinh chi phí ẩn</span>
                              </li>
                          </ul>
                      </div>
                  </div>

                  {/* Right: Form */}
                  <div className="md:w-1/2 p-10 md:p-16 bg-white">
                      <form onSubmit={handleQuickConsult} className="flex flex-col gap-5">
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Họ và tên</label>
                              <input 
                                required
                                value={consultForm.name}
                                onChange={e => setConsultForm({...consultForm, name: e.target.value})}
                                type="text" 
                                className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary outline-none transition-all text-slate-900"
                                placeholder="Nguyễn Văn A" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Số điện thoại</label>
                              <input 
                                required
                                type="tel" 
                                value={consultForm.phone}
                                onChange={e => setConsultForm({...consultForm, phone: e.target.value})}
                                className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary outline-none transition-all text-slate-900"
                                placeholder="09xxxxxxx" 
                              />
                          </div>
                          <div>
                              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nước muốn đi</label>
                              <select 
                                value={consultForm.dest}
                                onChange={e => setConsultForm({...consultForm, dest: e.target.value})}
                                className="w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-primary outline-none transition-all text-slate-900 cursor-pointer"
                              >
                                  <option value="">Chọn điểm đến...</option>
                                  {COUNTRIES_SUMMARY.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                              </select>
                          </div>
                          <button 
                            disabled={isSubmitting}
                            className="h-14 mt-4 w-full bg-secondary hover:bg-secondary-dark text-slate-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                              {isSubmitting ? 'Đang gửi...' : 'Đăng Ký Tư Vấn Miễn Phí'}
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
