
import React from "react";
import { PageData } from "../types";

interface HeroProps {
  data: PageData;
  onOpenModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onOpenModal }) => {
  const { hero, stats } = data;

  return (
    <>
      <div className="relative w-full bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Main Hero Card */}
          <div
            className="relative overflow-hidden rounded-[2rem] min-h-[600px] flex items-center justify-center text-center p-8 lg:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group"
            style={{
              backgroundImage: `url('${hero.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-slate-900/70 to-slate-900/90 z-0 transition-opacity duration-700 group-hover:opacity-90"></div>
            
            <div className="relative z-10 max-w-4xl flex flex-col items-center gap-8 animate-[fadeIn_0.8s_ease-out]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-[pulse_2s_infinite]"></span>
                <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">
                  {hero.badge}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl">
                {hero.title} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-200 to-secondary bg-[length:200%_auto] animate-[shine_3s_linear_infinite]">
                  {hero.highlight}
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-100 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md opacity-90">
                {hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                <button 
                    onClick={onOpenModal}
                    className="h-14 px-8 rounded-xl bg-secondary hover:bg-white hover:text-primary text-slate-900 font-bold text-base transition-all shadow-[0_0_20px_rgba(253,185,19,0.4)] hover:shadow-[0_0_30px_rgba(253,185,19,0.6)] flex items-center justify-center gap-2 group/btn transform hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined group-hover/btn:rotate-45 transition-transform">rocket_launch</span>
                  {hero.buttonPrimary}
                </button>
                <button 
                    onClick={onOpenModal}
                    className="h-14 px-8 rounded-xl bg-white/5 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-base transition-all flex items-center justify-center gap-2 group/btn2"
                >
                  <span className="material-symbols-outlined group-hover/btn2:translate-x-1 transition-transform">{hero.buttonSecondaryIcon || 'arrow_forward'}</span>
                  {hero.buttonSecondary}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Section */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-12 mb-16 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-[0_15px_30px_rgb(0,0,0,0.08)] border border-gray-50 flex items-center gap-5 group hover:border-primary/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
                  <span className="material-symbols-outlined text-3xl filled-icon">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-slate-900 text-3xl font-black tracking-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
