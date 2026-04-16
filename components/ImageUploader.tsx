
import React, { useState, useEffect, useRef } from "react";
import { storage } from "../firebase";

interface ImageUploaderProps {
  currentImage: string;
  onImageUploaded: (url: string) => void;
  folder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ currentImage, onImageUploaded, folder = "general" }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
      // Clear timer on unmount
      return () => {
          if (timerRef.current) window.clearTimeout(timerRef.current);
      };
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!storage) {
        alert("Firebase Storage chưa được cấu hình. Vui lòng kiểm tra API Key và Storage Bucket trong Admin Panel.");
        return;
    }

    setUploading(true);
    setProgress(0);
    setStatusText("Đang kết nối...");
    
    // Watchdog Timer for CORS issue
    timerRef.current = window.setTimeout(() => {
        if (progress === 0) {
            alert("⚠️ CẢNH BÁO: Quá trình upload bị treo ở 0%.\n\nNguyên nhân: Do bạn chưa cấu hình CORS cho Storage Bucket mới.\n\nCách sửa: Vào Admin Dashboard -> Cấu hình chung -> Hướng dẫn Sửa lỗi Upload (CORS).");
            setUploading(false);
            setStatusText("Lỗi CORS");
        }
    }, 10000); // 10 seconds check

    // Create a unique filename
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`; // Sanitize filename
    const storageRef = storage.ref(`${folder}/${fileName}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
        setStatusText(p < 100 ? "Đang tải..." : "Xử lý...");
        
        // If progress moves, clear the watchdog
        if (p > 0 && timerRef.current) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
        }
      },
      (error: any) => {
        console.error("Upload error details:", error);
        setUploading(false);
        setStatusText("");
        if (timerRef.current) window.clearTimeout(timerRef.current);

        let msg = "Lỗi khi tải ảnh lên!";
        if (error.code === 'storage/unauthorized') {
            msg = "⛔ LỖI QUYỀN TRUY CẬP (Authorized): Bạn không có quyền ghi vào Storage Bucket này.\n\nCách sửa: Vào Admin Dashboard -> Cấu hình chung -> Nhấn nút 'Sửa lỗi Unauthorized (Rules)' và làm theo hướng dẫn.";
        } else if (error.code === 'storage/canceled') {
            msg = "Đã hủy tải lên.";
        } else if (error.code === 'storage/retry-limit-exceeded') {
            msg = "Lỗi kết nối: Quá thời gian chờ (Timeout). Kiểm tra mạng hoặc cấu hình CORS.";
        } else if (error.code === 'storage/unknown') {
            msg = `Lỗi không xác định: ${error.message}`;
        } else {
            msg = `Lỗi: ${error.code} - ${error.message}`;
        }
        alert(msg);
      },
      () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          onImageUploaded(downloadURL);
          setUploading(false);
          setStatusText("");
        }).catch(err => {
            console.error("Get URL error:", err);
            setUploading(false);
            alert("Upload thành công nhưng không lấy được URL ảnh.");
        });
      }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {currentImage && (
        <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
           <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <a href={currentImage} target="_blank" rel="noreferrer" className="text-white text-xs font-bold hover:underline">Xem ảnh gốc</a>
           </div>
        </div>
      )}
      
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${folder}-${Date.now()}`} 
          disabled={uploading}
        />
        <label
          htmlFor={`file-upload-${folder}-${Date.now()}`}
          className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
        >
           {uploading ? (
             <div className="flex items-center gap-2">
                 <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-sm text-primary font-bold">{Math.round(progress)}% {statusText && `- ${statusText}`}</span>
             </div>
           ) : (
             <>
                <span className="material-symbols-outlined text-gray-500">cloud_upload</span>
                <span className="text-sm text-gray-600 font-medium">Chọn ảnh thay thế</span>
             </>
           )}
        </label>
      </div>
    </div>
  );
};
