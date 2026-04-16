const fs = require('fs');
let code = fs.readFileSync('constants.ts', 'utf8');

const heroUpdates = {
  "usa": {
    highlight: "Sàng Lọc DS-160",
    description: "Chuyên xử lý hồ sơ rớt, hộ chiếu trắng. Phá vỡ định kiến rớt visa nhờ chiến thuật luyện phỏng vấn 1-1 giả định và nộp kèm hồ sơ VssID (Bảo hiểm xã hội) minh bạch tuyệt đối."
  },
  "uk": { // Since UK info from notebook LM is wrong, we keep it mostly generic but professional
    highlight: "Tư Vấn Provenance of Funds",
    description: "Visa Anh Quốc 6 tháng, 2/5/10 năm. Chuyên xử lý chứng minh nguồn tài chính phức tạp, tháo gỡ điểm kẹt trong lịch sử di trú khối chia sẻ thông tin Five Eyes."
  },
  "schengen": {
    highlight: "Quy Tắc Điểm Đến Chính",
    description: "Khám phá Châu Âu khối Schengen (Pháp làm cửa ngõ). Loại bỏ triệt để rủi ro từ 'lịch trình ảo' và 'sổ tiết kiệm ốp'. Chuyên gia tư vấn hành trình chân thật nhất để lấy visa 15-45 ngày."
  },
  "australia": {
    highlight: "Giải Trình Tiêu Chí GTE",
    description: "Xử lý Visa Úc (Subclass 600) online. Áp dụng kỹ thuật nộp Group Processing trên ImmiAccount. Phân tích dòng tiền kỹ càng để không bị đánh rớt vì tiêu chí Mục đích nhập cảnh (GTE)."
  },
  "canada": {
    highlight: "CAN+ & Client Info Letter",
    description: "Nộp visa TRV hoặc CAN+ (miễn tài chính nếu có visa Mỹ). Đội ngũ thiết kế Thư Giải Trình (Client Information Letter) gộp chung siêu chuẩn 4MB. Xử lý GCMS cho ca trượt."
  },
  "newzealand": {
    highlight: "E-Visa Sạch & Đắt",
    description: "Tầm soát Visa New Zealand điện tử. Dịch thuật công chứng minh bạch, nộp và đóng phí bảo tồn IVL trực tuyến. Tối ưu hóa hồ sơ cho chuyến khám phá New Zealand hùng vĩ."
  },
  "japan": {
    highlight: "Rà Soát Tiêu Chuẩn Gốc",
    description: "Cấp visa Nhật Bản E-Visa tự túc / Dán. Soi kỹ ảnh thẻ tỷ lệ 4.5 vuông, mẫu tờ khai có QR code. Không để bị đánh lọt lỗi sai sót hình thức cơ bản nhất từ Đại sứ quán Nhật."
  },
  "korea": {
    highlight: "C-3 & Check CT07 Gốc",
    description: "Visa Đại Đô Thị 5 năm hoặc C-3. Chúng tôi kiểm duyệt siêu gắt gao mẫu giấy xác nhận gốc CT07 trước khi dịch công chứng. Tránh mọi rủi ro bị LSQ Hàn Quốc nhấc máy soi xét."
  },
  "china": {
    highlight: "Khai COVA Bao Đậu Cấp Tốc",
    description: "Dịch vụ thương mại / du lịch khẩn 4-5 ngày. Rà soát mộc xuất nhập cảnh khó (ví dụ Thổ Nhĩ Kỳ), nắn form COVA và chuẩn hóa ảnh thẻ theo quy chuẩn khó nhất."
  },
  "hongkong": {
    highlight: "E-Visa Đặc Ân Freelancer",
    description: "Làm E-Visa Hong Kong. Nhận tháo gỡ khó khăn chứng minh tài chính cho đối tượng không hợp đồng lao động / tự do (Review hồ sơ kỹ, được cấp Visa mới phải thanh toán phí phí)."
  },
  "taiwan": {
    highlight: "TAC & BHYT Khớp",
    description: "Tư vấn visa điện tử miễn phí TAC ngay trong ngày. Thiết kế lộ trình visa dán, rà soát lại mọi vấn đề trong Sổ đỏ / thẻ BHYT nhằm đối chiếu mượt mà tại Quầy TECO."
  },
  "uae": {
    highlight: "Bảo Lãnh Hãng Bay / Dubai",
    description: "Giải pháp visa Dubai nhanh chóng trong 3-5 ngày qua cơ chế bảo lãnh điện tử. Tránh lỗi quét AI hình ảnh do độ lóa sáng. Chỉ cần hộ chiếu là có thể đặt chân đến Dubai."
  },
  "russia": {
    highlight: "Khai E-Visa Chuẩn Số Ngày",
    description: "Tư vấn E-Visa Nga 16 ngày hoặc Visa Dán. Luôn cảnh báo các quy luật nghiêm ngặt (vd: qua đêm là tính ngày). Phải hoàn thành thủ tục đăng ký tạm trú 'Registration' chuẩn."
  },
  "southafrica": {
    highlight: "Mực Đen In Hoa & Safari",
    description: "Thủ tục dán Visa Nam Phi. Tuân thủ bộ form DHA-84 nguyên tắc mực đen. Dịch công chứng Unabridged và tư vấn sát sao luật tiêm chủng Sốt vàng da."
  },
  "india": {
    highlight: "Multiple Entry 1/5 Năm",
    description: "Xử lý E-Visa Ấn Độ 1 đến 5 năm nhanh nhất. Đặc trị các lỗi hệ thống như cổng thanh toán đơ ngắt, tỷ lệ ảnh thẻ không đạt pixel. Hành trình du ngoạn văn hóa nhẹ nhàng."
  },
  "egypt": {
    highlight: "Visa Dán Trực Tiếp ĐSQ",
    description: "Triển khai Visa Sticker nộp trực tiếp tại Đại sứ quán thay khách (Tránh các loại Visa cấp tốc cửa khẩu hay bị kẹt). Cảnh báo quy tắc rà soát 2000 USD của hải quan."
  }
};

for (const [id, data] of Object.entries(heroUpdates)) {
  const highlightRe = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?hero:\\s*\\{[\\s\\S]*?highlight:\\s*")[^"]+(")`, 'm');
  code = code.replace(highlightRe, `$1${data.highlight}$2`);

  const descRe = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?hero:\\s*\\{[\\s\\S]*?description:\\s*")[^"]+(")`, 'm');
  code = code.replace(descRe, `$1${data.description}$2`);
}

fs.writeFileSync('constants.ts', code);
console.log('constants.ts Hero SEO patched!');
