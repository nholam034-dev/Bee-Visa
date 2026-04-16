import React from "react";
import { PageData } from "../types";

interface ProcessProps {
  data: PageData;
}

export const Process: React.FC<ProcessProps> = ({ data }) => {
  return (
    <div id="process" className="w-full bg-white py-16 lg:py-24 border-t border-gray-100">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto mb-16">
          <h2 className="text-primary text-sm font-bold tracking-widest uppercase">QUY TRÌNH LÀM VIỆC</h2>
          <h1 className="text-slate-900 text-3xl sm:text-4xl font-black leading-tight">
            Quy Trình Xử Lý Hồ Sơ
          </h1>
          <p className="text-slate-600 text-lg">
            Lộ trình rõ ràng, minh bạch giúp bạn nắm bắt từng giai đoạn của hồ sơ {data.name} một cách dễ dàng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] w-[75%] h-0.5 bg-gray-100 -z-10"></div>

          {data.process.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-teal-50 flex items-center justify-center shadow-lg group-hover:border-primary group-hover:scale-110 transition-all duration-300 relative z-10">
                  <span className="material-symbols-outlined text-4xl text-primary">{step.icon}</span>
                </div>
                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-secondary text-slate-900 flex items-center justify-center font-bold text-sm ring-4 ring-white shadow-sm">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};