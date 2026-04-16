import React from "react";
import { PageData } from "../types";

interface CallToActionProps {
  data: PageData;
  onOpenModal: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ data, onOpenModal }) => {
  const { cta } = data;
  return (
    <div className="w-full bg-white py-12 lg:py-20 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#002f34] text-white p-8 lg:p-20 text-center shadow-2xl">
          {/* Background pattern */}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 20%, rgb(0, 95, 105) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgb(253, 185, 19) 0%, transparent 20%)",
            }}
          ></div>

          <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-6xl text-secondary animate-bounce">{cta.icon}</span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              {cta.title}
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              {cta.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <button 
                onClick={onOpenModal}
                className="h-14 px-10 rounded-lg bg-secondary hover:bg-secondary-dark text-slate-900 font-bold text-base transition-all shadow-lg hover:shadow-yellow-500/50 w-full sm:w-auto flex items-center justify-center"
              >
                Đăng Ký Tư Vấn Ngay
              </button>
              <button className="h-14 px-10 rounded-lg bg-transparent border-2 border-white/20 hover:bg-white/10 text-white font-bold text-base transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-lg">call</span>
                Liên Hệ: 1900-0310
              </button>
            </div>
            
            <p className="text-xs text-slate-400 opacity-80">
              {cta.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};