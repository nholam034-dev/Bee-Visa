
import React, { useState, useEffect } from "react";
import { useData } from "../contexts/DataContext";
import { auth, initError } from "../firebase";
import { PageData, ServiceItem, LeadData, SiteConfig, UserRole, ServiceDetailData } from "../types";
import { ImageUploader } from "./ImageUploader";

interface AdminDashboardProps {
    onNavigateHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const { 
      pages, savePage, serviceDetails, saveServiceDetail, seedDatabase, 
      leads, refreshData, updateLeadStatus, siteConfig, saveSiteConfig,
      currentUserRole, userList, createSystemUser, deleteSystemUser 
  } = useData();
  
  const [user, setUser] = useState<any>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Login/Register Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  
  // UI State
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [showConfigFixer, setShowConfigFixer] = useState(false);
  const [showCorsGuide, setShowCorsGuide] = useState(false); 
  const [showRulesGuide, setShowRulesGuide] = useState(false);
  
  // Manual Config Fields
  const [manualApiKey, setManualApiKey] = useState("");
  const [manualAuthDomain, setManualAuthDomain] = useState("");
  const [manualProjectId, setManualProjectId] = useState("");
  const [manualStorageBucket, setManualStorageBucket] = useState("");
  const [manualMessagingSenderId, setManualMessagingSenderId] = useState("");
  const [manualAppId, setManualAppId] = useState("");

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'content' | 'leads' | 'settings' | 'account' | 'users'>('content');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Content Editing State
  const [editingMode, setEditingMode] = useState<'page' | 'detail'>('page');
  const [selectedPageId, setSelectedPageId] = useState<string>("home");
  const [selectedDetailId, setSelectedDetailId] = useState<string>("");
  
  const [editPageData, setEditPageData] = useState<PageData | null>(null);
  const [editDetailData, setEditDetailData] = useState<ServiceDetailData | null>(null);
  
  const [editConfig, setEditConfig] = useState<SiteConfig>(siteConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingSheet, setIsTestingSheet] = useState(false);

  // New User Mgmt State
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPass, setNewUserPass] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>('admin');
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Account Mgmt State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
        setManualApiKey(window.localStorage.getItem('beetours_custom_api_key') || "");
        setManualProjectId(window.localStorage.getItem('beetours_custom_project_id') || "");
        setManualAuthDomain(window.localStorage.getItem('beetours_custom_auth_domain') || "");
        setManualStorageBucket(window.localStorage.getItem('beetours_custom_storage_bucket') || "");
        setManualMessagingSenderId(window.localStorage.getItem('beetours_custom_messaging_sender_id') || "");
        setManualAppId(window.localStorage.getItem('beetours_custom_app_id') || "");
    }

    if (auth) {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }
  }, []);

  // Update Edit Data when Selection Changes
  useEffect(() => {
    if (editingMode === 'page' && pages[selectedPageId]) {
      setEditPageData(pages[selectedPageId]);
    } else if (editingMode === 'detail') {
        // Default select first available detail if none selected
        if (!selectedDetailId && Object.keys(serviceDetails).length > 0) {
            setSelectedDetailId(Object.keys(serviceDetails)[0]);
        }
        if (selectedDetailId && serviceDetails[selectedDetailId]) {
            setEditDetailData(serviceDetails[selectedDetailId]);
        }
    }
  }, [selectedPageId, selectedDetailId, pages, serviceDetails, editingMode]);

  useEffect(() => {
    setEditConfig(siteConfig);
  }, [siteConfig]);

  // ... (Config saving functions unchanged)
  const handleSaveConfigManual = () => {
      if (!manualApiKey.trim() || !manualProjectId.trim()) {
          alert("Vui lòng nhập tối thiểu API Key và Project ID.");
          return;
      }
      window.localStorage.setItem('beetours_custom_api_key', manualApiKey.trim());
      window.localStorage.setItem('beetours_custom_project_id', manualProjectId.trim());
      if (manualAuthDomain.trim()) window.localStorage.setItem('beetours_custom_auth_domain', manualAuthDomain.trim());
      if (manualStorageBucket.trim()) window.localStorage.setItem('beetours_custom_storage_bucket', manualStorageBucket.trim());
      if (manualMessagingSenderId.trim()) window.localStorage.setItem('beetours_custom_messaging_sender_id', manualMessagingSenderId.trim());
      if (manualAppId.trim()) window.localStorage.setItem('beetours_custom_app_id', manualAppId.trim());
      alert("Đã lưu cấu hình mới. Trang sẽ tự tải lại...");
      window.location.reload();
  };

  const handleClearConfig = () => {
      window.localStorage.removeItem('beetours_custom_api_key');
      window.localStorage.removeItem('beetours_custom_project_id');
      window.localStorage.removeItem('beetours_custom_auth_domain');
      window.localStorage.removeItem('beetours_custom_storage_bucket');
      window.localStorage.removeItem('beetours_custom_messaging_sender_id');
      window.localStorage.removeItem('beetours_custom_app_id');
      alert("Đã xóa cấu hình tùy chỉnh. Trang sẽ tự tải lại về mặc định...");
      window.location.reload();
  };

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setShowConfigFixer(false);
    setIsLoadingAuth(true);

    if (!auth) {
        setAuthError(`Lỗi kết nối Firebase: ${initError || "Vui lòng kiểm tra API Key."}`);
        setShowConfigFixer(true);
        setIsLoadingAuth(false);
        return;
    }

    try {
        if (authMode === 'login') {
            await auth.signInWithEmailAndPassword(email, password);
        } else {
            if (password !== confirmPass) {
                throw new Error("Mật khẩu xác nhận không khớp.");
            }
            if (password.length < 6) {
                throw new Error("Mật khẩu phải có ít nhất 6 ký tự.");
            }
            await auth.createUserWithEmailAndPassword(email, password);
            alert("Đăng ký tài khoản Admin thành công! Hệ thống đang chuyển hướng...");
        }
    } catch (error: any) {
        console.error("Auth Error:", error.code, error.message);
        if (error.code === 'auth/configuration-not-found' || error.code === 'auth/project-not-found' || error.code === 'auth/api-key-not-valid' || error.code === 'auth/internal-error') {
            setAuthError("LỖI CẤU HÌNH: Key hiện tại không khớp hoặc thiếu thông tin Project.");
            setShowConfigFixer(true);
        } else if (error.code === 'auth/operation-not-allowed') {
            setAuthError("LỖI CẤU HÌNH: Tính năng đăng nhập Email/Password chưa được BẬT trên Firebase Console.");
        } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            setAuthError("Tài khoản chưa tồn tại. Vui lòng chuyển sang tab ĐĂNG KÝ MỚI.");
        } else if (error.code === 'auth/wrong-password') {
            setAuthError("Sai mật khẩu.");
        } else {
            setAuthError(error.message || "Đã có lỗi xảy ra.");
        }
    } finally {
        setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    if (auth) auth.signOut();
    setUser(null);
    setIsDemoMode(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isDemoMode) { alert("Chế độ Demo không thể đổi mật khẩu."); return; }
      if (newPassword !== confirmPassword) { alert("Mật khẩu xác nhận không khớp!"); return; }
      setIsSaving(true);
      try { await user.updatePassword(newPassword); alert("Đổi mật khẩu thành công!"); handleLogout(); } catch (error: any) { alert("Lỗi: " + error.message); } finally { setIsSaving(false); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isDemoMode) { alert("Chế độ Demo không thể tạo user mới."); return; }
      setIsCreatingUser(true);
      try { await createSystemUser(newUserEmail, newUserPass, newUserRole, newUserName); alert("Tạo tài khoản thành công!"); setNewUserEmail(""); setNewUserPass(""); setNewUserName(""); } catch (error: any) { alert("Lỗi tạo user: " + error.message); } finally { setIsCreatingUser(false); }
  };

  const handleSaveConfig = async () => {
      if (isDemoMode) { alert("Thành công! (Demo Mode)"); return; }
      setIsSaving(true);
      try { await saveSiteConfig(editConfig); alert("Lưu cấu hình chung thành công!"); } catch (error) { alert("Lỗi khi lưu cấu hình."); } finally { setIsSaving(false); }
  };

  const handleTestGoogleSheet = async () => {
      if (!editConfig.googleSheetUrl) { alert("Vui lòng nhập URL."); return; }
      setIsTestingSheet(true);
      try { await fetch(editConfig.googleSheetUrl, { method: "POST", mode: "no-cors", headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: "name=Test&phone=000&note=Test" }); alert("Đã gửi dữ liệu test!"); } catch (e) { alert("Lỗi: " + e); } finally { setIsTestingSheet(false); }
  };

  // --- CONTENT EDITING HANDLERS ---

  const handleSaveContent = async () => {
    if (isDemoMode) { alert("Demo Mode - Không lưu được."); return; }
    setIsSaving(true);
    try {
        if (editingMode === 'page' && editPageData) {
            await savePage(selectedPageId, editPageData);
            alert(`Lưu trang '${editPageData.name}' thành công!`);
        } else if (editingMode === 'detail' && editDetailData) {
            await saveServiceDetail(selectedDetailId, editDetailData);
            alert(`Lưu chi tiết '${editDetailData.title}' thành công!`);
        }
    } catch (error) {
      alert("Lỗi khi lưu dữ liệu.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helpers for Page Editing
  const updateHero = (field: string, value: string) => {
     if (!editPageData) return;
     setEditPageData({ ...editPageData, hero: { ...editPageData.hero, [field]: value } });
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string) => {
      if (!editPageData) return;
      const newServices = [...editPageData.services];
      newServices[index] = { ...newServices[index], [field]: value };
      setEditPageData({ ...editPageData, services: newServices });
  };

  // Helpers for Detail Editing
  const updateDetail = (field: string, value: any) => {
      if (!editDetailData) return;
      setEditDetailData({ ...editDetailData, [field]: value });
  };

  const updateBenefits = (index: number, value: string) => {
      if (!editDetailData) return;
      const newBenefits = [...editDetailData.benefits];
      newBenefits[index] = value;
      setEditDetailData({ ...editDetailData, benefits: newBenefits });
  };

  const addBenefit = () => {
      if (!editDetailData) return;
      setEditDetailData({ ...editDetailData, benefits: [...editDetailData.benefits, "Lợi ích mới..."] });
  };

  const removeBenefit = (index: number) => {
      if (!editDetailData) return;
      setEditDetailData({ ...editDetailData, benefits: editDetailData.benefits.filter((_, i) => i !== index) });
  };

  const canEditContent = !!user; 
  const canManageUsers = currentUserRole === 'super_admin' && !isDemoMode;

  if (!user) {
      const apiKey = process.env.VITE_FIREBASE_API_KEY || "AIzaSyDsPE2jvUJVh0Ltt_v5FBon3obu5YsZ99A";
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
            <div className="flex flex-col w-full max-w-md gap-4">
                <div className="bg-white p-8 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] relative border border-gray-100">
                    {onNavigateHome && (<button onClick={onNavigateHome} className="absolute top-6 left-6 text-slate-400 hover:text-primary flex items-center gap-1 text-sm font-bold transition-colors"><span className="material-symbols-outlined text-sm">arrow_back</span>Về Trang Chủ</button>)}
                    <div className="text-center mt-8 mb-6"><div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary/30">B</div><h2 className="text-2xl font-black text-slate-900 tracking-tight">Beetours Admin</h2></div>
                    {showConfigFixer && (
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6 max-h-[60vh] overflow-y-auto">
                            <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2 text-sm"><span className="material-symbols-outlined text-lg">build</span>Cấu Hình Firebase</h4>
                            <div className="flex flex-col gap-2">
                                <input type="text" placeholder="API Key" className="h-9 px-2 text-xs border border-yellow-300 rounded bg-white text-slate-900" value={manualApiKey} onChange={(e) => setManualApiKey(e.target.value)}/>
                                <input type="text" placeholder="Project ID" className="h-9 px-2 text-xs border border-yellow-300 rounded bg-white text-slate-900" value={manualProjectId} onChange={(e) => setManualProjectId(e.target.value)}/>
                                <input type="text" placeholder="Storage Bucket" className="h-9 px-2 text-xs border border-yellow-300 rounded bg-white text-slate-900" value={manualStorageBucket} onChange={(e) => setManualStorageBucket(e.target.value)}/>
                                <button onClick={handleSaveConfigManual} className="h-9 px-3 bg-yellow-600 text-white text-xs font-bold rounded mt-1">Lưu Cấu Hình</button>
                            </div>
                        </div>
                    )}
                    {authError && !showConfigFixer && (<div className="bg-red-50 border border-red-200 p-4 rounded-lg text-sm mb-4"><p className="text-red-700 mb-2">{authError}</p><button onClick={() => setShowConfigFixer(true)} className="text-red-600 underline text-xs font-bold">Sửa cấu hình</button></div>)}
                    <div className="flex p-1 bg-gray-100 rounded-lg mb-6"><button onClick={() => { setAuthMode('login'); setAuthError(null); }} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}>Đăng Nhập</button><button onClick={() => { setAuthMode('register'); setAuthError(null); }} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${authMode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}>Đăng Ký</button></div>
                    <form onSubmit={handleAuthAction} className="flex flex-col gap-4">
                        <div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Email</label><input type="email" required className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoadingAuth}/></div>
                        <div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Mật khẩu</label><input type="password" required className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoadingAuth}/></div>
                        {authMode === 'register' && (<div><label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">Xác nhận mật khẩu</label><input type="password" required className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-slate-900" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} disabled={isLoadingAuth}/></div>)}
                        <button type="submit" disabled={isLoadingAuth} className="h-12 bg-secondary hover:bg-secondary-dark text-slate-900 font-bold rounded-lg shadow-lg flex items-center justify-center gap-2">{isLoadingAuth ? "Đang xử lý..." : (authMode === 'login' ? "Đăng Nhập" : "Đăng Ký")}</button>
                    </form>
                </div>
            </div>
        </div>
      );
  }

  // --- DASHBOARD UI ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2"><span className="font-bold text-lg">Admin</span>{isDemoMode && <span className="text-[10px] bg-yellow-500 text-black px-1.5 rounded font-bold">DEMO</span>}</div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-1"><span className="material-symbols-outlined">menu</span></button>
      </div>
      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white p-4 flex flex-col h-full overflow-y-auto transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}>
        <div className="mb-8 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 mb-2"><button onClick={onNavigateHome} className="p-1 hover:bg-white/10 rounded"><span className="material-symbols-outlined">home</span></button><h1 className="text-xl font-bold">Admin Panel</h1></div>
                <p className="text-xs text-slate-400 mt-1 truncate max-w-[200px]">{user.email}</p>
                {currentUserRole && (<span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-slate-900 text-[10px] font-bold rounded uppercase">{currentUserRole.replace('_', ' ')}</span>)}
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400"><span className="material-symbols-outlined">close</span></button>
        </div>
        
        <div className="flex-1 space-y-6">
            <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Chức Năng Chính</p>
                 <div className="flex flex-col gap-1">
                    {canEditContent && (
                        <>
                            <button onClick={() => { setActiveTab('content'); setIsSidebarOpen(false); }} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'content' ? 'bg-primary text-white font-bold shadow-lg' : 'text-slate-300 hover:bg-white/10'}`}><span className="material-symbols-outlined text-lg">edit_document</span>Quản Lý Nội Dung</button>
                            <button onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'settings' ? 'bg-primary text-white font-bold shadow-lg' : 'text-slate-300 hover:bg-white/10'}`}><span className="material-symbols-outlined text-lg">settings</span>Cấu Hình Chung</button>
                        </>
                    )}
                    <button onClick={() => { setActiveTab('leads'); refreshData(); setIsSidebarOpen(false); }} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'leads' ? 'bg-primary text-white font-bold shadow-lg' : 'text-slate-300 hover:bg-white/10'}`}><span className="material-symbols-outlined text-lg">group</span>Khách Hàng (Leads)</button>
                    {canManageUsers && (<button onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'users' ? 'bg-primary text-white font-bold shadow-lg' : 'text-slate-300 hover:bg-white/10'}`}><span className="material-symbols-outlined text-lg">manage_accounts</span>Quản Lý Nhân Sự</button>)}
                    <button onClick={() => { setActiveTab('account'); setIsSidebarOpen(false); }} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 ${activeTab === 'account' ? 'bg-primary text-white font-bold shadow-lg' : 'text-slate-300 hover:bg-white/10'}`}><span className="material-symbols-outlined text-lg">lock</span>Tài Khoản</button>
                 </div>
            </div>
            
            {activeTab === 'content' && (
                <div className="pb-20">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Chọn Trang Sửa</p>
                    
                    <div className="flex gap-1 mb-2 p-1 bg-white/10 rounded">
                        <button onClick={() => setEditingMode('page')} className={`flex-1 py-1 text-[10px] font-bold uppercase rounded ${editingMode === 'page' ? 'bg-primary text-white' : 'text-slate-400'}`}>Trang Chính</button>
                        <button onClick={() => setEditingMode('detail')} className={`flex-1 py-1 text-[10px] font-bold uppercase rounded ${editingMode === 'detail' ? 'bg-primary text-white' : 'text-slate-400'}`}>Trang Con</button>
                    </div>

                    <div className="flex flex-col gap-1 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                        {editingMode === 'page' ? (
                            Object.values(pages).map((page: PageData) => (
                                <button key={page.id} onClick={() => { setSelectedPageId(page.id); setIsSidebarOpen(false); }} className={`text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${selectedPageId === page.id ? 'bg-white/10 text-white border border-white/20' : 'text-slate-400 hover:text-white'}`}>{page.name}{selectedPageId === page.id && <span className="material-symbols-outlined text-xs">arrow_forward</span>}</button>
                            ))
                        ) : (
                            Object.values(serviceDetails).map((detail: ServiceDetailData) => (
                                <button key={detail.id} onClick={() => { setSelectedDetailId(detail.id); setIsSidebarOpen(false); }} className={`text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${selectedDetailId === detail.id ? 'bg-white/10 text-white border border-white/20' : 'text-slate-400 hover:text-white'}`}><span className="truncate">{detail.title}</span>{selectedDetailId === detail.id && <span className="material-symbols-outlined text-xs">arrow_forward</span>}</button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
        <div className="border-t border-slate-700 pt-4 flex flex-col gap-2 mt-auto">
            <button onClick={seedDatabase} className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold py-3 px-3 rounded-lg flex items-center justify-center gap-2"><span className="material-symbols-outlined text-sm">sync</span>Đồng bộ Dữ liệu gốc</button>
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 px-3 rounded-lg flex items-center justify-center gap-2"><span className="material-symbols-outlined text-sm">logout</span>Đăng Xuất</button>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-8 overflow-x-hidden w-full">
        <div className="max-w-6xl mx-auto">
            {activeTab === 'settings' && canEditContent && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Cấu Hình Chung</h2>
                    <div className="space-y-4 max-w-xl">
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tên Thương Hiệu</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.brandName} onChange={e => setEditConfig({...editConfig, brandName: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hotline</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.hotline} onChange={e => setEditConfig({...editConfig, hotline: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Liên Hệ</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.email} onChange={e => setEditConfig({...editConfig, email: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Địa Chỉ</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.address} onChange={e => setEditConfig({...editConfig, address: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Logo URL</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.logoUrl} onChange={e => setEditConfig({...editConfig, logoUrl: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tagline</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.tagline} onChange={e => setEditConfig({...editConfig, tagline: e.target.value})} /></div>
                         <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Google Sheet URL</label><div className="flex gap-2"><input className="flex-1 h-10 px-3 border rounded-lg bg-white text-slate-900" value={editConfig.googleSheetUrl || ""} onChange={e => setEditConfig({...editConfig, googleSheetUrl: e.target.value})} /><button onClick={handleTestGoogleSheet} disabled={isTestingSheet} className="px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-bold text-slate-700">{isTestingSheet ? '...' : 'Test'}</button></div></div>
                         <button onClick={handleSaveConfig} disabled={isSaving} className="px-6 py-2 bg-secondary hover:bg-secondary-dark text-slate-900 font-bold rounded-lg shadow-sm">{isSaving ? 'Đang lưu...' : 'Lưu Cấu Hình'}</button>
                    </div>
                </div>
            )}

            {activeTab === 'account' && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md">
                    <h2 className="text-2xl font-black text-slate-800 mb-6">Đổi Mật Khẩu</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mật khẩu mới</label><input type="password" required className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Xác nhận mật khẩu</label><input type="password" required className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} /></div>
                        <button type="submit" disabled={isSaving} className="w-full h-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg">{isSaving ? 'Đang xử lý...' : 'Cập nhật'}</button>
                    </form>
                </div>
            )}

            {activeTab === 'users' && canManageUsers && (
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Tạo Tài Khoản Mới</h2>
                        <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label><input type="email" required className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Mật khẩu</label><input type="password" required className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={newUserPass} onChange={e => setNewUserPass(e.target.value)} /></div>
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tên hiển thị</label><input type="text" required className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={newUserName} onChange={e => setNewUserName(e.target.value)} /></div>
                            <button type="submit" disabled={isCreatingUser} className="h-10 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg">{isCreatingUser ? '...' : 'Tạo User'}</button>
                        </form>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Danh Sách Nhân Viên</h2>
                        <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead><tr className="bg-gray-50 border-b"><th className="p-3">Email</th><th className="p-3">Tên</th><th className="p-3">Vai Trò</th><th className="p-3">Ngày Tạo</th><th className="p-3">Hành Động</th></tr></thead><tbody>{userList.map(u => (<tr key={u.uid} className="border-b hover:bg-gray-50"><td className="p-3">{u.email}</td><td className="p-3">{u.displayName}</td><td className="p-3 uppercase text-xs font-bold">{u.role}</td><td className="p-3 text-gray-500">{u.createdAt?.toDate?.()?.toLocaleDateString() || '-'}</td><td className="p-3"><button onClick={() => deleteSystemUser(u.uid)} className="text-red-500 hover:underline">Xóa</button></td></tr>))}</tbody></table></div>
                    </div>
                </div>
            )}

            {activeTab === 'leads' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-black text-slate-800">Danh Sách Khách Hàng (Leads)</h2><button onClick={refreshData} className="text-primary hover:underline text-sm font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">refresh</span>Làm mới</button></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="bg-gray-50 text-slate-700 uppercase font-bold text-xs"><tr><th className="px-4 py-3">Ngày</th><th className="px-4 py-3">Khách Hàng</th><th className="px-4 py-3">Liên Hệ</th><th className="px-4 py-3">Nguồn</th><th className="px-4 py-3">Ghi Chú</th><th className="px-4 py-3">Trạng Thái</th></tr></thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 whitespace-nowrap">{lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString('vi-VN') : 'N/A'}</td>
                                        <td className="px-4 py-3 font-bold text-slate-900">{lead.name}</td>
                                        <td className="px-4 py-3"><div>{lead.phone}</div><div className="text-xs text-slate-400">{lead.email}</div></td>
                                        <td className="px-4 py-3"><span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">{lead.source}</span></td>
                                        <td className="px-4 py-3 max-w-xs truncate" title={lead.note}>{lead.note}</td>
                                        <td className="px-4 py-3">
                                            <select value={lead.status} onChange={(e) => lead.id && updateLeadStatus(lead.id, e.target.value as any)} className={`border rounded px-2 py-1 text-xs font-bold outline-none cursor-pointer ${lead.status === 'new' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : lead.status === 'contacted' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-green-100 text-green-800 border-green-200'}`}>
                                                <option value="new">Mới</option><option value="contacted">Đang xử lý</option><option value="done">Hoàn thành</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                                {leads.length === 0 && (<tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400 italic">Chưa có dữ liệu khách hàng.</td></tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {activeTab === 'content' && canEditContent && (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-40 border border-gray-100 gap-4">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đang chỉnh sửa ({editingMode === 'page' ? 'Trang Chính' : 'Trang Chi Tiết'})</p>
                            <h2 className="text-2xl font-black text-slate-800">
                                {editingMode === 'page' ? editPageData?.name : editDetailData?.title}
                            </h2>
                        </div>
                        <button onClick={handleSaveContent} disabled={isSaving} className="bg-secondary hover:bg-secondary-dark text-slate-900 px-6 py-3 rounded-lg font-bold shadow-lg flex items-center gap-2 transition-all">{isSaving ? 'Đang lưu...' : 'Lưu Thay Đổi'}<span className="material-symbols-outlined">save</span></button>
                    </div>

                    {/* --- PAGE EDITING MODE --- */}
                    {editingMode === 'page' && editPageData && (
                        <>
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">image</span>Phần Đầu Trang (Hero)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-5">
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tiêu đề chính</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editPageData.hero.title} onChange={(e) => updateHero('title', e.target.value)}/></div>
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Từ khóa nổi bật</label><input className="w-full h-10 px-3 border rounded-lg bg-white text-slate-900" value={editPageData.hero.highlight} onChange={(e) => updateHero('highlight', e.target.value)}/></div>
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Mô tả ngắn</label><textarea className="w-full p-3 border rounded-lg h-32 bg-white text-slate-900" value={editPageData.hero.description} onChange={(e) => updateHero('description', e.target.value)}/></div>
                                    </div>
                                    <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ảnh Nền</label><ImageUploader currentImage={editPageData.hero.backgroundImage} folder="heroes" onImageUploaded={(url) => updateHero('backgroundImage', url)}/></div>
                                </div>
                            </div>
                            {/* Service Items Edit */}
                            {editPageData.services.length > 0 && (
                                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-100">
                                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">grid_view</span>Các Gói Dịch Vụ</h3>
                                    <div className="space-y-8">
                                        {editPageData.services.map((service, index) => (
                                            <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                                <div className="flex items-center justify-between mb-4"><h4 className="font-black text-sm text-primary uppercase">Dịch vụ #{index + 1}</h4></div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div><label className="block text-xs font-bold text-slate-500 mb-1">Tên dịch vụ</label><input className="w-full h-10 px-3 border rounded-lg font-bold bg-white text-slate-900" value={service.title} onChange={(e) => updateService(index, 'title', e.target.value)}/></div>
                                                        <div><label className="block text-xs font-bold text-slate-500 mb-1">Mô tả ngắn</label><textarea className="w-full p-3 border rounded-lg h-24 bg-white text-slate-900" value={service.description} onChange={(e) => updateService(index, 'description', e.target.value)}/></div>
                                                    </div>
                                                    <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ảnh đại diện</label><ImageUploader currentImage={service.image} folder="services" onImageUploaded={(url) => updateService(index, 'image', url)}/></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* --- DETAIL EDITING MODE (NEW) --- */}
                    {editingMode === 'detail' && editDetailData && (
                        <>
                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">article</span>Nội Dung Chi Tiết</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-5">
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tiêu đề bài viết</label><input className="w-full h-10 px-3 border rounded-lg font-bold text-lg bg-white text-slate-900" value={editDetailData.title} onChange={(e) => updateDetail('title', e.target.value)}/></div>
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tổng quan (Overview)</label><textarea className="w-full p-3 border rounded-lg h-40 bg-white text-slate-900" value={editDetailData.overview} onChange={(e) => updateDetail('overview', e.target.value)}/></div>
                                    </div>
                                    <div className="space-y-6">
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ảnh Hero (Đầu trang)</label><ImageUploader currentImage={editDetailData.heroImage} folder="details" onImageUploaded={(url) => updateDetail('heroImage', url)}/></div>
                                        
                                        {/* NEW: BANNER ADVERTISING */}
                                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                            <label className="block text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                                                <span className="material-symbols-outlined">ads_click</span>
                                                Banner Quảng Cáo (Sidebar)
                                            </label>
                                            <p className="text-[10px] text-yellow-700 mb-2">Ảnh này sẽ hiện ở cột bên phải trang chi tiết. Để trống nếu không muốn hiện.</p>
                                            <div className="mb-2">
                                                <ImageUploader currentImage={editDetailData.sidebarBannerImage || ""} folder="ads" onImageUploaded={(url) => updateDetail('sidebarBannerImage', url)}/>
                                            </div>
                                            <input className="w-full h-9 px-2 border rounded text-xs bg-white text-slate-900" placeholder="Link khi click vào banner (https://...)" value={editDetailData.sidebarBannerLink || ""} onChange={(e) => updateDetail('sidebarBannerLink', e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-8 border border-gray-100">
                                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">star</span>Quyền Lợi (Sidebar List)</h3>
                                <div className="space-y-2">
                                    {editDetailData.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <input className="flex-1 h-10 px-3 border rounded-lg bg-white text-slate-900" value={benefit} onChange={(e) => updateBenefits(idx, e.target.value)}/>
                                            <button onClick={() => removeBenefit(idx)} className="w-10 h-10 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"><span className="material-symbols-outlined">delete</span></button>
                                        </div>
                                    ))}
                                    <button onClick={addBenefit} className="mt-2 text-sm text-primary font-bold flex items-center gap-1 hover:underline"><span className="material-symbols-outlined">add</span>Thêm quyền lợi</button>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-gray-50 border rounded-xl text-center text-sm text-slate-500">
                                Các phần Requirements (Hồ sơ yêu cầu) và FAQ hiện tại cần chỉnh sửa trực tiếp trong database hoặc đợi bản cập nhật tiếp theo để có giao diện tối ưu hơn cho Nested List.
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};
