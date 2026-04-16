
import React, { createContext, useContext, useState, useEffect } from "react";
import { PAGES, COUNTRIES_SUMMARY, SERVICE_DETAILS, DEFAULT_SITE_CONFIG } from "../constants";
import { PageData, CountrySummary, ServiceDetailData, LeadData, SiteConfig, UserProfile, UserRole, BlogPost } from "../types";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";

interface DataContextType {
  blogs: BlogPost[];
  saveBlogPost: (blog: BlogPost) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  pages: Record<string, PageData>;
  countries: CountrySummary[];
  serviceDetails: Record<string, ServiceDetailData>;
  leads: LeadData[];
  siteConfig: SiteConfig;
  isLoading: boolean;
  currentUserRole: UserRole | null; // Quyền hạn hiện tại
  userList: UserProfile[]; // Danh sách nhân viên (chỉ Super Admin thấy)
  
  refreshData: () => Promise<void>;
  savePage: (pageId: string, data: PageData) => Promise<void>;
  saveServiceDetail: (detailId: string, data: ServiceDetailData) => Promise<void>; // New function
  saveSiteConfig: (config: SiteConfig) => Promise<void>;
  addLead: (lead: Omit<LeadData, "id" | "createdAt" | "status">) => Promise<void>;
  updateLeadStatus: (id: string, status: LeadData['status']) => Promise<void>;
  seedDatabase: () => Promise<void>;
  
  // User Management
  checkUserRole: (user: firebase.User) => Promise<UserRole | null>;
  createSystemUser: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  deleteSystemUser: (uid: string) => Promise<void>;
  refreshUserList: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Record<string, PageData>>(PAGES);
  const [countries, setCountries] = useState<CountrySummary[]>(COUNTRIES_SUMMARY);
  const [serviceDetails, setServiceDetails] = useState<Record<string, ServiceDetailData>>(SERVICE_DETAILS);
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentUserRole, setCurrentUserRole] = useState<UserRole | null>(null);
  const [userList, setUserList] = useState<UserProfile[]>([]);

  // Listen to Auth State to fetch Role
  useEffect(() => {
      if (auth) {
          const unsubscribe = auth.onAuthStateChanged(async (user) => {
              if (user) {
                  const role = await checkUserRole(user);
                  setCurrentUserRole(role);
                  // Chỉ Super Admin mới cần load danh sách user
                  if (role === 'super_admin') {
                      refreshUserList();
                  }
              } else {
                  setCurrentUserRole(null);
                  setUserList([]);
              }
          });
          return () => unsubscribe();
      }
  }, []);

  const refreshData = async () => {
    setIsLoading(true);
    try {
      if (!db) {
         throw new Error("Firebase not configured");
      }

      // 1. Fetch Pages Content
      const pagesSnapshot = await db.collection("pages").get();
      if (!pagesSnapshot.empty) {
        const newPages: Record<string, PageData> = {};
        pagesSnapshot.forEach((doc) => {
            newPages[doc.id] = doc.data() as PageData;
        });
        setPages(prev => ({...prev, ...newPages}));
      }

      // 2. Fetch Service Details (NEW)
      const detailsSnapshot = await db.collection("service_details").get();
      if (!detailsSnapshot.empty) {
          const newDetails: Record<string, ServiceDetailData> = {};
          detailsSnapshot.forEach((doc) => {
              newDetails[doc.id] = doc.data() as ServiceDetailData;
          });
          setServiceDetails(prev => ({...prev, ...newDetails}));
      }

      // 3. Fetch Global Settings
      const settingsDoc = await db.collection("settings").doc("general").get();
      if (settingsDoc.exists) {
          setSiteConfig(settingsDoc.data() as SiteConfig);
      }

      // 4. Fetch Leads
      try {
          const leadsSnapshot = await db.collection("leads").orderBy("createdAt", "desc").limit(50).get();
          const fetchedLeads: LeadData[] = [];
          leadsSnapshot.forEach(doc => {
              fetchedLeads.push({ id: doc.id, ...doc.data() } as LeadData);
          });
          setLeads(fetchedLeads);
      } catch (err) {
          console.log("Could not fetch leads (permission issues or collection empty)", err);
      }
      
    
      // 5. Fetch Blogs
      try {
          const blogsSnapshot = await db.collection("blogs").orderBy("createdAt", "desc").get();
          const fetchedBlogs: BlogPost[] = [];
          blogsSnapshot.forEach((doc: any) => {
              fetchedBlogs.push({ id: doc.id, ...doc.data() } as BlogPost);
          });
          setBlogs(fetchedBlogs);
      } catch (err) {
          console.log("Could not fetch blogs", err);
      }
  
    } catch (error) {
      if (error.message !== "Firebase not configured") {
        console.error("Error fetching data from Firebase:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const savePage = async (pageId: string, data: PageData) => {
      if (!db) {
          alert("Bạn chưa cấu hình Firebase API Key.");
          return;
      }
      try {
          await db.collection("pages").doc(pageId).set(data);
          // Cập nhật local state để UI phản hồi nhanh
          setPages(prev => ({ ...prev, [pageId]: data }));
      } catch (error) {
          console.error("Error saving page:", error);
          throw error;
      }
  };

  const saveServiceDetail = async (detailId: string, data: ServiceDetailData) => {
      if (!db) {
          alert("Bạn chưa cấu hình Firebase API Key.");
          return;
      }
      try {
          await db.collection("service_details").doc(detailId).set(data);
          // Cập nhật local state
          setServiceDetails(prev => ({ ...prev, [detailId]: data }));
      } catch (error) {
          console.error("Error saving service detail:", error);
          throw error;
      }
  };

  
  const saveBlogPost = async (blog: BlogPost) => {
      if (!db) { alert("Thiếu Firebase"); return; }
      try {
          await db.collection("blogs").doc(blog.id).set(blog);
          setBlogs(prev => {
              const existingIndex = prev.findIndex(b => b.id === blog.id);
              if (existingIndex >= 0) {
                  const newBlogs = [...prev];
                  newBlogs[existingIndex] = blog;
                  return newBlogs;
              }
              return [blog, ...prev];
          });
      } catch (err) {
          console.error("Error saving blog", err); throw err;
      }
  };

  const deleteBlogPost = async (id: string) => {
      if (!db) return;
      try {
          await db.collection("blogs").doc(id).delete();
          setBlogs(prev => prev.filter(b => b.id !== id));
      } catch (err) {
          console.error("Error deleting blog", err); throw err;
      }
  };
  
  const saveSiteConfig = async (config: SiteConfig) => {
    if (!db) return;
    try {
        await db.collection("settings").doc("general").set(config);
        setSiteConfig(config); // Update local immediately
    } catch (error) {
        console.error("Error saving site config:", error);
        throw error;
    }
  };

  const addLead = async (leadData: Omit<LeadData, "id" | "createdAt" | "status">) => {
      // 1. Send to Google Sheet (if configured)
      if (siteConfig.googleSheetUrl) {
          try {
              const formData = new URLSearchParams();
              formData.append("name", leadData.name);
              formData.append("phone", leadData.phone);
              formData.append("email", leadData.email || "");
              formData.append("note", leadData.note || "");
              formData.append("source", leadData.source || "");

              fetch(siteConfig.googleSheetUrl, {
                  method: "POST",
                  mode: "no-cors",
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: formData.toString()
              });
          } catch (e) {
              console.error("Error sending to Google Sheet", e);
          }
      }

      // 2. Save to Firebase (Backup)
      if (!db) {
          console.warn("Firebase not configured, lead not saved to DB.");
          return;
      }
      try {
          await db.collection("leads").add({
              ...leadData,
              status: 'new',
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
      } catch (error) {
          console.error("Error adding lead:", error);
          throw error;
      }
  };

  const updateLeadStatus = async (id: string, status: LeadData['status']) => {
      if (!db) return;
      try {
          await db.collection("leads").doc(id).update({ status });
          setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      } catch (error) {
          console.error("Error updating status:", error);
          throw error;
      }
  };

  const seedDatabase = async () => {
      if (!db) {
          alert("Bạn chưa cấu hình Firebase API Key.");
          return;
      }
      
      // Seed Pages
      const pagePromises = Object.values(PAGES).map(page => 
          db.collection("pages").doc(page.id).set(page)
      );
      
      // Seed Service Details (NEW)
      const detailPromises = Object.values(SERVICE_DETAILS).map(detail => 
          db.collection("service_details").doc(detail.id).set(detail)
      );

      const settingsPromise = db.collection("settings").doc("general").set(DEFAULT_SITE_CONFIG);

      await Promise.all([...pagePromises, ...detailPromises, settingsPromise]);
      
      alert("Đã đồng bộ dữ liệu mẫu (Pages & Details) lên Firebase thành công!");
      await refreshData();
  };

  // --- USER MANAGEMENT LOGIC ---

  const checkUserRole = async (user: firebase.User): Promise<UserRole | null> => {
      // HARDCODE: Luôn cấp quyền Super Admin cho email này
      if (user.email && user.email.toLowerCase() === 'lamminh@beetours.com') {
          return 'super_admin';
      }

      if (!db) return null;
      try {
          const doc = await db.collection("users").doc(user.uid).get();
          if (doc.exists) {
              return doc.data()?.role as UserRole;
          }
      } catch (e) {
          console.error("Check role error", e);
      }
      return null;
  };

  const createSystemUser = async (email: string, password: string, role: UserRole, name: string) => {
      if (!db || !auth) {
          alert("Firebase chưa được cấu hình (Thiếu API Key). Không thể tạo user.");
          return;
      }
      
      let secondaryApp;
      try {
          secondaryApp = firebase.initializeApp(firebase.app().options, "SecondaryApp");
      } catch (e) {
          console.error("Init secondary app failed:", e);
          return;
      }
      
      try {
          const userCredential = await secondaryApp.auth().createUserWithEmailAndPassword(email, password);
          const uid = userCredential.user?.uid;
          
          if (uid) {
              await db.collection("users").doc(uid).set({
                  uid,
                  email,
                  role,
                  displayName: name,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
              });
          }
          
          await secondaryApp.auth().signOut();
          secondaryApp.delete();
          
          await refreshUserList();
      } catch (error: any) {
          console.error("Create user error:", error);
          if (secondaryApp) secondaryApp.delete(); 
          throw error;
      }
  };

  const deleteSystemUser = async (uid: string) => {
      if (!db) return;
      try {
          await db.collection("users").doc(uid).delete();
          await refreshUserList();
          alert("Đã xóa quyền truy cập của user này (Xóa khỏi Firestore).");
      } catch (e) {
          alert("Lỗi khi xóa user: " + e);
      }
  };

  const refreshUserList = async () => {
      if (!db) return;
      try {
          const snapshot = await db.collection("users").orderBy("createdAt", "desc").get();
          const users: UserProfile[] = [];
          snapshot.forEach(doc => users.push(doc.data() as UserProfile));
          setUserList(users);
      } catch (e) {
          console.error("Fetch users error", e);
      }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{ 
        pages, countries, serviceDetails, leads, siteConfig, isLoading, 
        currentUserRole, userList,
        refreshData, savePage, saveServiceDetail, saveSiteConfig, addLead, updateLeadStatus, seedDatabase,
        checkUserRole, createSystemUser, deleteSystemUser, refreshUserList
    ,
      blogs,
      saveBlogPost,
      deleteBlogPost
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
