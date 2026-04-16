
import React from "react";
import { useData } from "../contexts/DataContext";

export const ContactWidget: React.FC = () => {
  const { siteConfig } = useData();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 group">
      {/* Zalo Button */}
      <a 
        href="https://zalo.me/0944555900" 
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative overflow-hidden"
        title="Chat Zalo"
      >
        <span className="font-black text-white text-[10px] uppercase">Zalo</span>
        <div className="absolute inset-0 rounded-full border-2 border-white opacity-20 animate-ping"></div>
      </a>

      {/* Phone Button */}
      <a 
        href={`tel:${siteConfig.hotline.replace(/\D/g,'')}`}
        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative"
        title="Gọi Hotline"
      >
        <span className="material-symbols-outlined text-white animate-tada">call</span>
        <span className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Tư vấn ngay: {siteConfig.hotline}
        </span>
        <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-50 animate-[ping_1.5s_ease-in-out_infinite]"></div>
      </a>
    </div>
  );
};
