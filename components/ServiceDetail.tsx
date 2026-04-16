
import React from "react";
import { ServiceDetailData } from "../types";

interface ServiceDetailProps {
  data: ServiceDetailData;
  onBack: () => void;
  onContact: () => void;
  onOpenModal: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ data, onBack, onContact, onOpenModal }) => {
  return (
    <div className="w-full bg-white min-h-screen pb-16">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] lg:h-[500px] bg-cover bg-center flex items-end"
        style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('${data.heroImage}')` }}
      >
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-20">
            <button 
                onClick={onBack}
                className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all font-bold text-sm border border-white/30"
            >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Quay lại
            </button>
        </div>

        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 relative z-10">
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
                {data.title}
            </h1>
            <div className="h-1 w-24 bg-secondary rounded-full"></div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
                {/* Overview Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Tổng Quan
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                        {data.overview}
                    </p>
                </div>

                {/* Requirements Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">assignment</span>
                        Hồ Sơ Cần Chuẩn Bị
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.requirements.map((req, idx) => (
                            <div key={idx}>
                                <h3 className="font-bold text-secondary-dark uppercase text-sm tracking-wider mb-3 border-b border-gray-100 pb-2">
                                    {req.title}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {req.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                                            <span className="material-symbols-outlined text-green-500 text-base mt-0.5">check_circle</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">quiz</span>
                        Câu Hỏi Thường Gặp
                    </h2>
                    <div className="flex flex-col gap-4">
                        {data.faq.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                                    <span className="text-secondary font-black">Q:</span>
                                    {item.question}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed pl-6">
                                    {item.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-[350px] flex flex-col gap-6">
                {/* Benefits Card */}
                <div className="bg-[#002f34] rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="material-symbols-outlined text-9xl">workspace_premium</span>
                    </div>
                    <h3 className="text-lg font-bold mb-4 relative z-10">Quyền Lợi Nổi Bật</h3>
                    <ul className="flex flex-col gap-4 relative z-10">
                        {data.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                                <span className="material-symbols-outlined text-secondary text-base mt-0.5">star</span>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* NEW: PROMOTIONAL BANNER */}
                {data.sidebarBannerImage && (
                    <div className="rounded-2xl overflow-hidden shadow-xl group relative">
                        <a href={data.sidebarBannerLink || "#"} target={data.sidebarBannerLink ? "_blank" : "_self"} rel="noreferrer">
                            <img 
                                src={data.sidebarBannerImage} 
                                alt="Promotion" 
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {data.sidebarBannerLink && (
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full shadow-lg">Xem Ngay</span>
                                </div>
                            )}
                        </a>
                    </div>
                )}

                {/* CTA Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-primary mx-auto mb-3">
                            <span className="material-symbols-outlined text-3xl">support_agent</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">Cần Tư Vấn Thêm?</h3>
                        <p className="text-slate-500 text-sm mt-2">
                            Để lại thông tin, chuyên gia của chúng tôi sẽ phân tích hồ sơ miễn phí cho bạn.
                        </p>
                    </div>
                    <button 
                        onClick={onOpenModal}
                        className="w-full h-12 rounded-lg bg-secondary hover:bg-secondary-dark text-slate-900 font-bold transition-all shadow-lg hover:shadow-yellow-500/50 flex items-center justify-center gap-2 mb-3"
                    >
                        Đăng Ký Tư Vấn
                    </button>
                    <a href="tel:19000310" className="w-full h-12 rounded-lg border-2 border-gray-200 hover:border-primary hover:text-primary text-slate-600 font-bold transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">call</span>
                        1900 0310
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
