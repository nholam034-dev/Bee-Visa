
import React, { useState } from "react";

export const GeneralProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      title: "Tư Vấn & Thẩm Định",
      subtitle: "Chiến lược hồ sơ cá nhân hóa",
      description: "Chuyên gia Beetours sẽ phân tích sâu hồ sơ (Tài chính, Nhân thân, Lịch sử du lịch) để tìm ra 'điểm mạnh' và 'tử huyệt'. Chúng tôi không chỉ nhận hồ sơ, chúng tôi xây dựng chiến lược để tối đa hóa tỷ lệ đậu.",
      icon: "strategy", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      shadowColor: "shadow-blue-200",
      time: "Ngay lập tức",
      image: "/images/process_step_1.png",
      deliverables: ["Đánh giá tỷ lệ đậu thực tế", "Danh sách hồ sơ cá nhân hóa", "Báo giá trọn gói minh bạch"]
    },
    {
      id: 2,
      title: "Xử Lý & Dịch Thuật",
      subtitle: "Chuẩn hóa hồ sơ chuyên nghiệp",
      description: "Đội ngũ xử lý sẽ tiến hành dịch thuật công chứng, điền các tờ khai phức tạp (DS-160, Schengen Form...) và viết thư giải trình (Cover Letter) đắt giá. Mọi thông tin được khớp nối logic để thuyết phục viên chức Lãnh sự.",
      icon: "edit_document",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      shadowColor: "shadow-orange-200",
      time: "2 - 3 Ngày làm việc",
      image: "/images/process_step_2.png",
      deliverables: ["Bộ hồ sơ hoàn chỉnh 100%", "Thư giải trình (Cover Letter)", "Booking vé máy bay & khách sạn"]
    },
    {
      id: 3,
      title: "Nộp Hồ Sơ & Sinh Trắc",
      subtitle: "Đồng hành tại trung tâm",
      description: "Chúng tôi hỗ trợ đặt lịch hẹn giờ vàng. Vào ngày nộp, nhân viên Beetours sẽ đón và hướng dẫn bạn trực tiếp tại VFS/TLS/Đại sứ quán để nộp hồ sơ và lấy dấu vân tay. Bạn không bao giờ phải loay hoay một mình.",
      icon: "fingerprint",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      shadowColor: "shadow-purple-200",
      time: "Theo lịch hẹn",
      image: "/images/process_step_3.png",
      deliverables: ["Biên lai nộp hồ sơ", "Dữ liệu sinh trắc học", "Hướng dẫn phỏng vấn giả định"]
    },
    {
      id: 4,
      title: "Nhận Kết Quả Visa",
      subtitle: "Giao nhận tận tay",
      description: "Beetours theo dõi sát sao trạng thái xử lý 24/7. Ngay khi có kết quả, chúng tôi sẽ thay bạn nhận hộ chiếu, kiểm tra kỹ thông tin trên visa để đảm bảo không có sai sót và gửi chuyển phát nhanh bảo đảm về tận nhà.",
      icon: "celebration",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      shadowColor: "shadow-green-200",
      time: "7 - 15 Ngày (Tùy nước)",
      image: "/images/process_step_4.png",
      deliverables: ["Hộ chiếu đã dán Visa", "E-Visa (File mềm)", "Hỗ trợ đặt vé máy bay giá tốt"]
    }
  ];

  const faqs = [
      { q: "Tôi có cần phải có mặt trực tiếp không?", a: "Tùy quốc gia. Các nước như Mỹ, Châu Âu, Úc (lần đầu), Anh bắt buộc bạn phải đến để lấy dấu vân tay/phỏng vấn. Các nước như Nhật, Hàn (đại đô thị), Trung Quốc (tùy diện) có thể không cần." },
      { q: "Thời gian xét duyệt visa tính từ khi nào?", a: "Tính từ lúc bạn nộp hồ sơ vào Lãnh sự quán/Trung tâm tiếp nhận, không tính thời gian chuẩn bị hồ sơ." },
      { q: "Nếu bị từ chối thì sao?", a: "Beetours sẽ phân tích lý do từ chối (qua thư từ chối hoặc ghi chú GCMS) và tư vấn phương án nộp lại hoặc khiếu nại nếu khả thi." }
  ];

  return (
    <div className="w-full bg-white min-h-screen font-sans">
        {/* Hero Section */}
        <div className="bg-[#002f34] relative overflow-hidden pt-20 pb-20 lg:pt-28 lg:pb-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(253,185,19,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md animate-[fadeInDown_0.5s]">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span className="text-secondary font-bold text-xs uppercase tracking-widest">Quy trình chuẩn 4 bước</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight animate-[fadeInUp_0.5s_0.2s]">
                    Lộ Trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-yellow-200">Chinh Phục Visa</span>
                </h1>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light animate-[fadeInUp_0.5s_0.4s]">
                    Chúng tôi đơn giản hóa quy trình xin visa phức tạp thành một trải nghiệm minh bạch, chuyên nghiệp và an tâm tuyệt đối.
                </p>
            </div>
            
            {/* Curved Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0">
                <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                </svg>
            </div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 md:pt-32">
            <div className="relative">
                {/* Central Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 md:-translate-x-1/2 rounded-full">
                    <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary/20 via-primary/50 to-transparent"></div>
                </div>

                <div className="flex flex-col gap-16 md:gap-32">
                    {steps.map((step, index) => (
                        <div 
                            key={step.id} 
                            className={`relative flex flex-col md:flex-row gap-8 items-center md:justify-between group ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            onMouseEnter={() => setActiveStep(step.id)}
                            onMouseLeave={() => setActiveStep(null)}
                        >
                            {/* Node / Number */}
                            <div className={`absolute left-6 md:left-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full z-10 -translate-x-1/2 flex items-center justify-center shadow-[0_0_0_8px_white] transition-all duration-500 ${activeStep === step.id ? 'scale-110 bg-primary text-white shadow-[0_0_0_12px_rgba(0,95,105,0.1)]' : 'bg-white border-4 border-gray-100 text-gray-400'}`}>
                                <span className="font-black text-lg md:text-2xl">{step.id}</span>
                            </div>

                            {/* Image Section (Desktop Opposite) */}
                            <div className={`md:flex md:w-[45%] justify-center items-center w-full ml-14 md:ml-0 ${index % 2 === 0 ? 'order-1 justify-end pr-0 md:pr-12' : 'order-2 justify-start pl-0 md:pl-12'}`}>
                                <div className={`relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-white transition-all duration-500 ${activeStep === step.id ? 'scale-[1.02] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]' : 'opacity-90 grayscale-[20%]'}`}>
                                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl border border-white/50 text-slate-700 text-xs font-bold shadow-sm flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${step.color.replace('text-', 'bg-')}`}></div>
                                        {step.time}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className={`w-full ml-14 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'order-2 md:pl-12' : 'order-1 md:pr-12'}`}>
                                <div className={`bg-white p-6 md:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2 lg:mt-0 -mt-6 ${activeStep === step.id ? `border-transparent shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] ring-1 ring-black/5` : 'border-gray-100 shadow-sm'}`}>
                                    
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${step.bgColor.replace('bg-', 'from-')}/30 to-transparent pointer-events-none`}></div>

                                    {/* Header */}
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-6 ${step.bgColor} ${step.color}`}>
                                                <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                                            </div>
                                        </div>

                                        <h3 className={`text-xl font-black text-slate-900 mb-2 transition-colors duration-300 ${activeStep === step.id ? step.color : ''}`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-4">{step.subtitle}</p>

                                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                            {step.description}
                                        </p>

                                        {/* Deliverables Box */}
                                        <div className={`rounded-xl p-4 transition-colors duration-300 ${activeStep === step.id ? 'bg-white shadow-sm border border-gray-100' : 'bg-gray-50 border border-transparent'}`}>
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                                                Kết quả nhận được
                                            </p>
                                            <ul className="space-y-2.5">
                                                {step.deliverables.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] ${step.color.replace('text-', 'bg-')}`}>
                                                            <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 py-20 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-secondary">
                        <span className="material-symbols-outlined text-4xl">quiz</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">Câu Hỏi Thường Gặp</h2>
                    <p className="text-slate-500">Giải đáp nhanh những thắc mắc phổ biến về quy trình xin visa.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-primary/30 transition-all hover:-translate-y-1 hover:shadow-lg">
                            <h3 className="font-bold text-slate-800 flex items-start gap-3 text-base mb-3">
                                <span className="text-secondary font-black text-xl">Q.</span>
                                {faq.q}
                            </h3>
                            <div className="pl-7 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                                <p className="text-slate-600 text-sm leading-relaxed pl-4">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                    {/* Call to Action Box in Grid */}
                    <div className="bg-[#002f34] rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white shadow-lg relative overflow-hidden group cursor-pointer">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                        <span className="material-symbols-outlined text-4xl mb-3 text-secondary animate-bounce">support_agent</span>
                        <h3 className="font-bold text-lg mb-2">Vẫn còn thắc mắc?</h3>
                        <p className="text-slate-300 text-sm mb-4">Chuyên gia của chúng tôi sẵn sàng giải đáp miễn phí.</p>
                        <a href="tel:19000310" className="px-6 py-2 bg-secondary text-slate-900 font-bold rounded-lg hover:bg-white transition-colors text-sm">
                            Gọi Ngay: 1900 0310
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
