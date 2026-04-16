// ĐƯA ĐOẠN MÃ NÀY VÀO GOOGLE APPS SCRIPT ĐỂ NHẬN DỮ LIỆU TỪ WEB
// Hướng dẫn:
// 1. Mở file Google Sheets chứa thông tin khách hàng.
// 2. Click "Tiện ích mở rộng" (Extensions) -> "Apps Script"
// 3. Copy toàn bộ đoạn code này dán đè lên file Code.gs cũ rồi bấm Lưu.
// 4. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment).
// 5. Chọn loại "Ứng dụng web" (Web app).
// 6. Cấp quyền truy cập "Bất kỳ ai" (Anyone).
// 7. Bấm "Triển khai", copy lấy "URL của ứng dụng web" (Web app URL).
// 8. Dán URL đó vào ô "Google Sheet URL" trong phần "Cấu Hình Chung" của trang Admin trên web.

const SHEET_NAME = "Trang tính 1"; // Đổi tên này nếu tab Sheet của bạn có tên khác

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
        return ContentService.createTextOutput("Sheet not found").setMimeType(ContentService.MimeType.TEXT);
    }
    
    // Nếu sheet trống, tự động thêm Header Row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Ngày giờ", "Tên Khách Hàng", "Số Điện Thoại", "Email", "Nguồn / Context", "Ghi chú (Assessment Score)", "Trạng thái xử lý"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#f3f3f3");
    }

    // Lấy thông tin từ request của React (xem DataContext.tsx -> addLead)
    const name = e.parameter.name || "";
    const phone = e.parameter.phone || "";
    const email = e.parameter.email || "";
    const source = e.parameter.source || "";
    const note = e.parameter.note || "";
    const timestamp = new Date();
    const status = "Mới nhận";

    // Thêm bản ghi mới
    sheet.appendRow([timestamp, name, phone, email, source, note, status]);

    return ContentService.createTextOutput(JSON.stringify({"result":"success", "data": e.parameter}))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Bật CORS cho phép gọi từ mọi domain
function doOptions(e) {
  return HtmlService.createHtmlOutput('OK');
}
