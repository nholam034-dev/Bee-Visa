import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { GeneralProcess } from "./components/GeneralProcess";
import { ServiceDetail } from "./components/ServiceDetail";
import { ConsultationModal } from "./components/ConsultationModal";
import { AdminDashboard } from "./components/AdminDashboard";
import { LandingPage } from "./components/LandingPage";
import { ContactWidget } from "./components/ContactWidget";
import { SEOHead } from "./components/SEOHead";
import { DataProvider, useData } from "./contexts/DataContext";
import { SERVICE_DETAILS, COUNTRIES_SUMMARY, PAGES as FALLBACK_PAGES } from "./constants";
import { COUNTRY_SLUGS, SERVICE_SLUGS, getCountryPath, getServicePath } from "./seo";

// ========================================================
// Layout wrapper — Header + Footer + Floating widgets
// ========================================================
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { pages } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'chat' | 'form' | 'assessment'>('chat');
  const [modalContext, setModalContext] = useState<string | undefined>(undefined);

  const openModal = (tab: 'chat' | 'form' | 'assessment' = 'chat', context?: string) => {
    setModalTab(tab);
    setModalContext(context);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContext(undefined);
  };

  // Navigation helper — converts old page IDs to new URL paths
  const navigateTo = (pageId: string) => {
    if (pageId === 'home') navigate('/');
    else if (pageId === 'contact') navigate('/lien-he');
    else if (pageId === 'process') navigate('/quy-trinh');
    else if (pageId === 'admin') navigate('/admin');
    else if (pageId === 'landing') navigate('/landing');
    else if (SERVICE_DETAILS[pageId]) {
      const detail = SERVICE_DETAILS[pageId];
      navigate(getServicePath(pageId, detail.parentId));
    }
    else navigate(getCountryPath(pageId));
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Footer data — default to UK page
  const footerData = pages['uk'] || FALLBACK_PAGES['uk'];

  return (
    <div className="min-h-screen flex flex-col font-display bg-white">
      <Header onNavigate={navigateTo} activePage="home" onOpenModal={() => openModal('chat')} />
      
      <main className="flex-grow">
        {/* Inject navigateTo and openModal into children via context or clone */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { onNavigate: navigateTo, onOpenModal: openModal });
          }
          return child;
        })}
      </main>

      {footerData && <Footer data={footerData} onNavigate={navigateTo} onOpenModal={openModal} />}
      <ContactWidget />

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        activeContext={modalContext || "Trang Chủ"}
        initialTab={modalTab}
      />
    </div>
  );
};

// ========================================================
// Page Components — Route wrappers
// ========================================================

const HomePage: React.FC<{ onNavigate?: Function; onOpenModal?: Function }> = ({ onNavigate, onOpenModal }) => {
  const { pages } = useData();
  const homeData = pages['home'] || FALLBACK_PAGES['home'];
  return (
    <>
      <SEOHead />
      <Home onNavigate={onNavigate as any} data={homeData} />
    </>
  );
};

const CountryPage: React.FC<{ explicitCountryId?: string; onNavigate?: Function; onOpenModal?: Function }> = ({ explicitCountryId, onNavigate, onOpenModal }) => {
  const { pages } = useData();

  if (!explicitCountryId) return <Navigate to="/" replace />;

  const pageData = pages[explicitCountryId] || FALLBACK_PAGES[explicitCountryId];
  if (!pageData) return <Navigate to="/" replace />;

  return (
    <>
      <SEOHead pageName={pageData.name} />
      <Hero data={pageData} onOpenModal={() => onOpenModal?.('chat')} />
      <Services data={pageData} onNavigate={onNavigate as any} />
      <Process data={pageData} />
      <CallToAction data={pageData} onOpenModal={() => onOpenModal?.('form')} />
    </>
  );
};

const ServiceDetailPage: React.FC<{ explicitDetailId?: string; onNavigate?: Function; onOpenModal?: Function }> = ({ explicitDetailId, onNavigate, onOpenModal }) => {
  const navigate = useNavigate();

  if (!explicitDetailId) return <Navigate to="/" replace />;

  const detailData = SERVICE_DETAILS[explicitDetailId];
  if (!detailData) return <Navigate to="/" replace />;

  return (
    <>
      <SEOHead 
        customTitle={`${detailData.title} | Beetours Vietnam`}
        customDescription={detailData.overview.slice(0, 160)}
      />
      <ServiceDetail
        data={detailData}
        onBack={() => navigate(getCountryPath(detailData.parentId))}
        onContact={() => navigate('/lien-he')}
        onOpenModal={() => onOpenModal?.('form')}
      />
    </>
  );
};

const ProcessPage: React.FC = () => (
  <>
    <SEOHead />
    <GeneralProcess />
  </>
);

const ContactPage: React.FC = () => (
  <>
    <SEOHead />
    <Contact />
  </>
);

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  return <AdminDashboard onNavigateHome={() => navigate('/')} />;
};

const LandingPageWrapper: React.FC = () => (
  <>
    <SEOHead customTitle="Ưu Đãi Visa Đặc Biệt - Beetours Vietnam" />
    <LandingPage />
  </>
);

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-white text-4xl">travel_explore</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">404</h1>
        <p className="text-slate-500 mb-6">Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
        >
          Về Trang Chủ
        </button>
      </div>
    </div>
  );
};

// ========================================================
// App Root — Router + Providers
// ========================================================
const AppRoutes: React.FC = () => {
  const { isLoading, pages } = useData();

  if (isLoading && Object.keys(pages).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Admin & Landing — no layout */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/landing" element={<LandingPageWrapper />} />

      {/* Public pages — with layout */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      <Route path="/quy-trinh" element={<MainLayout><ProcessPage /></MainLayout>} />
      <Route path="/lien-he" element={<MainLayout><ContactPage /></MainLayout>} />

      {/* Country pages — Generate exact routes since RRv6 doesn't support partial dynamic segments like /visa-:slug */}
      {Object.entries(COUNTRY_SLUGS).map(([countryId, countrySlug]) => (
        <Route 
          key={countryId} 
          path={`/visa-${countrySlug}`} 
          element={<MainLayout><CountryPage explicitCountryId={countryId} /></MainLayout>} 
        />
      ))}

      {/* Service detail pages */}
      {Object.entries(SERVICE_SLUGS).map(([detailId, serviceSlug]) => {
        const countryId = detailId.split("-")[0];
        // Ensure we map the prefix correctly just like getServicePath
        const parentMap: Record<string, string> = {
          usa: "my", uk: "anh-quoc", schengen: "chau-au", au: "uc",
          ca: "canada", nz: "new-zealand", jp: "nhat-ban", kr: "han-quoc",
          cn: "trung-quoc", hk: "hong-kong", tw: "dai-loan", uae: "dubai",
          ru: "nga", za: "nam-phi", in: "an-do", eg: "ai-cap",
        };
        const countrySlug = parentMap[countryId];
        if (!countrySlug) return null;
        
        return (
          <Route 
            key={detailId} 
            path={`/visa-${countrySlug}/${serviceSlug}`} 
            element={<MainLayout><ServiceDetailPage explicitDetailId={detailId} /></MainLayout>} 
          />
        );
      })}

      {/* Legacy support: ?page=landing redirect */}
      <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;

