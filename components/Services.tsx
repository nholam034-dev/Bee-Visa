import React from "react";
import { PageData } from "../types";

interface ServicesProps {
  data: PageData;
  onNavigate: (pageId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ data, onNavigate }) => {
  return (
    <div id="services" className="w-full bg-background-light py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3 max-w-3xl mx-auto">
            <h2 className="text-primary text-sm font-bold tracking-[0.2em] uppercase">DỊCH VỤ CỦA BEETOURS</h2>
            <h1 className="text-slate-900 text-3xl sm:text-4xl font-black leading-tight">
              Giải Pháp Visa {data.name}
            </h1>
            <p className="text-slate-600 text-lg">
              Chúng tôi cung cấp các gói dịch vụ chuyên nghiệp được thiết kế riêng, tối đa hóa khả năng đậu visa của bạn.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((service, index) => (
              <div
                key={index}
                className="group flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="h-56 overflow-hidden bg-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <div className="w-12 h-12 rounded-full bg-secondary/90 backdrop-blur-md flex items-center justify-center mb-2 text-slate-900 shadow-lg group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                    </div>
                  </div>
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    style={{ backgroundImage: `url("${service.image}")` }}
                  ></div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="text-slate-900 text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <button 
                        onClick={() => service.detailId ? onNavigate(service.detailId) : null}
                        className={`inline-flex items-center text-primary font-bold text-sm hover:underline group/btn ${!service.detailId ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Tìm Hiểu Thêm
                      <span className="material-symbols-outlined text-sm ml-1 group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};