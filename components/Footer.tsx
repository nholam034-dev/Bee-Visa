
import React from "react";
import { PageData, FooterLink } from "../types";
import { useData } from "../contexts/DataContext";

interface FooterProps {
  data: PageData;
  onNavigate: (pageId: string) => void;
  onOpenModal: (tab?: 'chat' | 'form' | 'assessment', context?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ data, onNavigate, onOpenModal }) => {
  const { siteConfig } = useData();

  const handleLinkClick = (e: React.MouseEvent, link: FooterLink) => {
      e.preventDefault();
      if (link.type === 'navigate' && link.target) {
          onNavigate(link.target);
      } else if (link.type === 'modal') {
          // If target is chat, use the label as context
          const context = link.target === 'chat' ? link.label : undefined;
          onOpenModal(link.target as any, context);
      }
  };

  return (
    <footer className="w-full bg-slate-50 border-t border-gray-200 py-12 lg:py-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
                {siteConfig.logoUrl ? (
                    <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="h-8 object-contain" />
                ) : (
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white font-bold text-lg">
                        {siteConfig.brandName.charAt(0)}
                    </div>
                )}
                {!siteConfig.logoUrl && (
                    <span className="text-xl font-black text-slate-800 tracking-tight">{siteConfig.brandName}</span>
                )}
            </div>
            <p className="text-sm font-bold text-primary uppercase tracking-wider">
              Công ty TNHH Beetours Việt Nam
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Đối tác tin cậy hàng đầu về dịch vụ Visa chuyên nghiệp. Kinh nghiệm xử lý hồ sơ khó, giải trình tài chính phức tạp.
            </p>
          </div>

          {/* Service Links Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">{data.footer.serviceColumnTitle || "Dịch Vụ Visa"}</h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              {data.footer.serviceLinks.map((link, idx) => (
                 <li key={idx}>
                     <a 
                        href="#" 
                        onClick={(e) => handleLinkClick(e, link)}
                        className="hover:text-primary transition-colors flex items-center gap-1 group"
                     >
                         {link.label}
                         {link.type === 'modal' && <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity">chat</span>}
                     </a>
                 </li>
              ))}
            </ul>
          </div>

          {/* Support Links Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Hỗ Trợ Khách Hàng</h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-600">
              {data.footer.supportLinks.map((link, idx) => (
                 <li key={idx}>
                     <a 
                        href="#" 
                        onClick={(e) => handleLinkClick(e, link)}
                        className="hover:text-primary transition-colors font-medium"
                     >
                         {link.label}
                     </a>
                 </li>
              ))}

            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6 text-lg">Liên Hệ</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded bg-teal-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                </div>
                <span className="leading-relaxed whitespace-pre-line">
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-teal-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">phone</span>
                </div>
                <a className="hover:text-primary font-bold" href={`tel:${siteConfig.hotline.replace(/\D/g,'')}`}>
                  {siteConfig.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-teal-50 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">mail</span>
                </div>
                <a className="hover:text-primary font-medium" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 text-center md:text-left">
            © 2026 Công ty TNHH Beetours Việt Nam. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
             <button 
                onClick={() => onNavigate('admin')}
                className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold px-3 py-2 rounded hover:bg-slate-100"
                title="Truy cập trang quản trị"
             >
                 <span className="material-symbols-outlined text-lg">vpn_key</span>
                 <span>Admin Login</span>
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
