
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { COUNTRIES_SUMMARY, SERVICE_DETAILS } from "../constants";
import { useData } from "../contexts/DataContext";

interface HeaderProps {
    onNavigate: (pageId: string) => void;
    onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onOpenModal }) => {
  const { siteConfig } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  
  let activePage = 'home';
  if (path.includes('quy-trinh')) activePage = 'process';
  else if (path.includes('lien-he')) activePage = 'contact';
  else if (path.includes('kinh-nghiem-visa')) activePage = 'kinh-nghiem-visa';
  else {
      // Logic from MainLayout for countries
      // Extract from path like /visa-my
      const match = path.match(/^\/visa-([^\/]+)/);
      if (match) {
          const slug = match[1];
          // Find country by slug
          const parentMap: Record<string, string> = {
            "my": "usa", "anh-quoc": "uk", "chau-au": "schengen", "uc": "au",
            "canada": "ca", "new-zealand": "nz", "nhat-ban": "jp", "han-quoc": "kr",
            "trung-quoc": "cn", "hong-kong": "hk", "dai-loan": "tw", "dubai": "uae",
            "nga": "ru", "nam-phi": "za", "an-do": "in", "ai-cap": "eg",
          };
          activePage = parentMap[slug] || 'home';
      }
  }

  // Determine display name for dropdown
  let activeCountryName = "Trang Chủ";
  const country = COUNTRIES_SUMMARY.find(c => c.id === activePage);
  if (country) {
      activeCountryName = country.name;
  } else if (SERVICE_DETAILS[activePage]) {
      // If on a detail page (e.g., usa-b1b2), show parent name (e.g., Mỹ)
      const parentId = SERVICE_DETAILS[activePage].parentId;
      const parentCountry = COUNTRIES_SUMMARY.find(c => c.id === parentId);
      if (parentCountry) activeCountryName = parentCountry.name;
  }

  // Check if we are in any "Service" related area to highlight the menu item
  const isServiceActive = activePage === 'home' || 
                          activePage === 'contact' || 
                          activePage === 'process' || 
                          COUNTRIES_SUMMARY.some(c => c.id === activePage) ||
                          SERVICE_DETAILS[activePage] !== undefined;

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none" 
            onClick={() => onNavigate('home')}
            onDoubleClick={() => onNavigate('admin')}
            title="Double click to access Admin"
          >
             {siteConfig.logoUrl ? (
                 <img src={siteConfig.logoUrl} alt={siteConfig.brandName} className="h-10 object-contain" />
             ) : (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center text-white font-bold text-lg">
                    {siteConfig.brandName.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-800 leading-none tracking-tight">{siteConfig.brandName}</span>
                        {siteConfig.tagline && (
                            <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase mt-0.5">
                                {siteConfig.tagline}
                            </span>
                        )}
                    </div>
                </div>
             )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
             <button 
                onClick={() => onNavigate('home')}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${activePage === 'home' ? 'text-primary' : 'text-slate-700 hover:text-primary'}`}
             >
                Trang Chủ
             </button>
             
             {/* Country Dropdown */}
             <div className="relative group">
                <button 
                    className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide py-2 ${isServiceActive ? 'text-primary' : 'text-slate-700 hover:text-primary'}`}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                >
                    {activePage === 'home' || activePage === 'contact' || activePage === 'process' ? 'Dịch Vụ Visa' : activeCountryName}
                    <span className="material-symbols-outlined text-lg">expand_more</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="grid grid-cols-1 gap-1 p-2">
                        {COUNTRIES_SUMMARY.map(country => (
                            <button
                                key={country.id}
                                onClick={() => {
                                    onNavigate(country.id);
                                    setIsDropdownOpen(false);
                                }}
                                className={`text-left px-4 py-2.5 text-sm font-bold rounded-lg hover:bg-teal-50 hover:text-primary transition-colors flex items-center justify-between ${activePage === country.id || (SERVICE_DETAILS[activePage]?.parentId === country.id) ? 'bg-teal-50 text-primary' : 'text-slate-600'}`}
                            >
                                {country.name}
                                {(activePage === country.id || SERVICE_DETAILS[activePage]?.parentId === country.id) && <span className="material-symbols-outlined text-sm">check</span>}
                            </button>
                        ))}
                    </div>
                </div>
             </div>

             <button 
                onClick={() => onNavigate('process')}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${activePage === 'process' ? 'text-primary' : 'text-slate-700 hover:text-primary'}`}
             >
                Quy Trình
             </button>
             
             <button 
                onClick={() => onNavigate('contact')}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${activePage === 'contact' ? 'text-primary' : 'text-slate-700 hover:text-primary'}`}
             >
                Liên Hệ
             </button>
             
             <button 
                onClick={() => onNavigate('blog')}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${activePage === 'kinh-nghiem-visa' ? 'text-primary' : 'text-slate-700 hover:text-primary'}`}
             >
                Kinh Nghiệm
             </button>
          </nav>

          {/* Contact & CTA */}
          <div className="flex items-center gap-4 lg:gap-6">
            <a href={`tel:${siteConfig.hotline.replace(/\D/g,'')}`} className="hidden md:flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">call</span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hotline</span>
                <span className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">
                  {siteConfig.hotline}
                </span>
              </div>
            </a>

            <button 
                onClick={onOpenModal}
                className="hidden sm:flex items-center justify-center h-10 px-6 rounded-lg bg-secondary hover:bg-secondary-dark text-slate-900 text-sm font-bold transition-all shadow-[0_4px_14px_0_rgba(253,185,19,0.39)] hover:shadow-[0_6px_20px_rgba(253,185,19,0.23)]"
            >
              <span>Tư Vấn Ngay</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              <button onClick={() => {onNavigate('home'); setIsMenuOpen(false);}} className="text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg">Trang Chủ</button>
              <button onClick={() => {onNavigate('process'); setIsMenuOpen(false);}} className="text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg">Quy Trình</button>
               <button onClick={() => {onNavigate('contact'); setIsMenuOpen(false);}} className="text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg">Liên Hệ</button>
               <button onClick={() => {onNavigate('blog'); setIsMenuOpen(false);}} className="text-left px-4 py-3 text-sm font-bold text-slate-700 hover:bg-gray-50 rounded-lg">Kinh Nghiệm</button>
              <div className="px-4 py-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chọn Quốc Gia</p>
                  <div className="grid grid-cols-2 gap-2">
                       {COUNTRIES_SUMMARY.map(country => (
                            <button
                                key={country.id}
                                onClick={() => {
                                    onNavigate(country.id);
                                    setIsMenuOpen(false);
                                }}
                                className={`text-left px-3 py-2 text-sm font-medium rounded border ${activePage === country.id ? 'border-primary text-primary bg-teal-50' : 'border-gray-100 text-slate-600'}`}
                            >
                                {country.name}
                            </button>
                        ))}
                  </div>
              </div>
              {/* Admin link ẩn — Truy cập qua double-click logo hoặc ?page=admin */}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};
