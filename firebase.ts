
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Helper to clean key
const clean = (val: string | undefined) => (val || "").trim();

// Kiểm tra xem có Key được lưu thủ công trong trình duyệt không (Do người dùng nhập từ giao diện Admin)
// Mở rộng: Đọc thêm các config khác nếu có
const storedApiKey = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_api_key') : null;
const storedAuthDomain = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_auth_domain') : null;
const storedProjectId = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_project_id') : null;
const storedStorageBucket = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_storage_bucket') : null;
const storedMessagingSenderId = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_messaging_sender_id') : null;
const storedAppId = typeof window !== 'undefined' ? window.localStorage.getItem('beetours_custom_app_id') : null;

// Cấu hình Firebase — Ưu tiên: localStorage (Admin) > .env > fallback rỗng
const firebaseConfig = {
  apiKey: storedApiKey || clean(process.env.VITE_FIREBASE_API_KEY) || "",
  authDomain: storedAuthDomain || clean(process.env.VITE_FIREBASE_AUTH_DOMAIN) || "",
  projectId: storedProjectId || clean(process.env.VITE_FIREBASE_PROJECT_ID) || "",
  storageBucket: storedStorageBucket || clean(process.env.VITE_FIREBASE_STORAGE_BUCKET) || "",
  messagingSenderId: storedMessagingSenderId || clean(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || "",
  appId: storedAppId || clean(process.env.VITE_FIREBASE_APP_ID) || ""
};

// Khởi tạo Firebase
let app;
let auth;
let db;
let storage;
let initError = "";

console.log("Firebase Init Config:", {
    usingStoredKey: !!storedApiKey,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    keyPrefix: firebaseConfig.apiKey.substring(0, 5) + "..."
});

try {
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.app();
        }
        auth = firebase.auth();
        db = firebase.firestore();
        storage = firebase.storage();
    } else {
        initError = "Thiếu cấu hình Firebase.";
    }
} catch (error: any) {
    initError = error.message;
    console.error("Firebase Init Error:", error);
    // Nếu lỗi do Key không hợp lệ, thử xóa key cũ để reset
    if (storedApiKey && error.code === 'app/invalid-configuration') {
        window.localStorage.removeItem('beetours_custom_api_key');
        window.localStorage.removeItem('beetours_custom_auth_domain');
        window.localStorage.removeItem('beetours_custom_project_id');
        window.localStorage.removeItem('beetours_custom_storage_bucket');
        window.localStorage.removeItem('beetours_custom_messaging_sender_id');
        window.localStorage.removeItem('beetours_custom_app_id');
        window.location.reload();
    }
}

export { auth, db, storage, initError };
