const fs = require('fs');
let code = fs.readFileSync('seo.ts', 'utf8');

const newGetPageSEO = `export function getPageSEO(path: string, pageName?: string): PageSEO {
  const base = "https://beevisa.vn";
  
  if (path === "/") {
    return {
      title: "Beetours Vietnam - Dịch Vụ Visa Toàn Cầu | Tỷ Lệ Đậu 99%",
      description: "Dịch vụ tư vấn và xử lý visa chuyên nghiệp tại Việt Nam. Chuyên trị hồ sơ khó, hộ chiếu trắng. Giải quyết triệt để rủi ro từ VssID và lịch trình lịch sử di trú.",
      canonical: base + "/",
    };
  }
  
  if (path === "/quy-trinh") {
    return {
      title: "Quy Trình Xử Lý Hồ Sơ Visa Chuyên Nghiệp | Beetours Vietnam",
      description: "Quy trình xử lý hồ sơ Visa tiêu chuẩn: Tư vấn E-E-A-T, Thẩm định rủi ro GTE, Xử lý thư giải trình (Client Information Letter), Lấy sinh trắc học và đậu Visa.",
      canonical: base + "/quy-trinh",
    };
  }
  
  if (path === "/lien-he") {
    return {
      title: "Liên Hệ Beetours Vietnam | Hotline Tư Vấn Visa 1900-0310",
      description: "Gặp gỡ Chuyên gia Visa 25 năm kinh nghiệm. Văn phòng: 21/27 Đại Cồ Việt, Hà Nội. Hotline: 1900-0310. Đừng để lỡ kế hoạch vì lỗi chuẩn bị hồ sơ tự túc (DIY).",
      canonical: base + "/lien-he",
    };
  }

  // Country SEO Mappings based on Expert Knowledge Base
  if (path.includes("/visa-my")) {
    return {
      title: "Visa Mỹ Trọn Gói | Khai DS-160 Chuẩn Tỷ Lệ Đậu Cao",
      description: "Chuyên gia làm Visa Mỹ: Khai tờ khai DS-160 chính xác 100%, Luyện phỏng vấn 1-1, tối ưu hồ sơ cho C-level, giải trình hộ chiếu trắng. Bao đậu phỏng vấn Lãnh sự.",
      canonical: base + path,
    };
  }
  
  if (path.includes("/visa-anh-quoc")) {
    return {
      title: "Dịch Vụ Visa Anh Quốc | Visa 6 Tháng, 2-5-10 Năm (Standard Visitor)",
      description: "Dịch vụ xin Visa Anh (UK) 6 tháng, 2 năm, 5 năm, 10 năm. Xử lý chứng minh nguồn tài chính (Provenance of Funds) phức tạp, xử lý lịch sử từng bị Lãnh sự từ chối.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-chau-au")) {
    return {
      title: "Visa Châu Âu Schengen | Nộp Pháp & Tư Vấn Lịch Trình (Main Destination)",
      description: "Dịch vụ làm Visa Châu Âu khối Schengen chuyên nghiệp. Thiết kế lịch trình thật (Không dùng sổ tiết kiệm ốp), tuân thủ tuyệt đối quy tắc Điểm đến chính (Pháp/Hà Lan).",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-uc")) {
    return {
      title: "Visa Úc (Subclass 600) | Group Processing & Thẩm Định GTE Xét Đậu Nhanh",
      description: "Xin visa Úc diện 600 Online. Beetours sử dụng Group Processing của ImmiAccount, thẩm định dòng tiền chặt chẽ để thỏa mãn tiêu chí GTE phức tạp của Lãnh sự quán.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-canada")) {
    return {
      title: "Visa Canada (Visitor/TRV) | Tư Vấn CAN+ & Thư Giải Trình Dual Intent",
      description: "Xin visa Canada diện phổ thông & CAN+ (có visa Mỹ). Chúng tôi xây dựng Bộ hồ sơ gộp chuẩn 4MB kèm Thư giải trình (Client Information Letter) đập tan nghi ngờ định cư.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-new-zealand")) {
    return {
      title: "E-Visa New Zealand | Xử Lý Form Chuẩn, Dịch Thuật Công Chứng 100%",
      description: "Dịch vụ E-Visa New Zealand trọn gói. Đóng phí bảo tồn IVL, xử lý hồ sơ 'sạch & đắt' đáp ứng yêu cầu khắt khe. Nộp nhóm cho gia đình đi du lịch.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-nhat-ban")) {
    return {
      title: "Visa Nhật Bản | E-Visa, Dán Nhiều Lần, Nhanh Gọn & Khớp Lịch Trình",
      description: "Tư vấn Visa Nhật Bản du lịch tự túc. Đảm bảo đúng chuẩn hình thẻ vuông, sử dụng mẫu form kèm mã QR, xét duyệt điểm hồ sơ gốc chuẩn xác.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-han-quoc")) {
    return {
      title: "Visa Hàn Quốc | Visa Đại Đô Thị 5 Năm (Miễn Tài Chính) & C-3",
      description: "Thủ tục Visa Hàn Quốc nhanh chóng. Rà soát nghiêm ngặt mẫu giấy CT07 bản gốc, bổ sung Hợp đồng độ uy tín cao, né lỗi gọi xác minh điện thoại từ ĐSQ.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-trung-quoc")) {
    return {
      title: "Visa Trung Quốc (L, M, Đoàn) | Bao Đậu Khẩn 4-5 Ngày Hộ Chiếu Lịch Sử Khó",
      description: "Chuyên trị Visa Trung Quốc cực gắt về hình thức. Xử lý hộ chiếu từng đi máy bay rủi ro, điền form COVA 100% chuẩn, dịch vụ khẩn đi ngay hỗ trợ kịp Hội chợ.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-hong-kong")) {
    return {
      title: "E-Visa Hong Kong | Xử Lý Giải Trình Hồ Sơ Tự Do Freelancer, Bao Đậu",
      description: "Xin E-visa Hong Kong 100% online. Beetours giúp các đối tượng Freelancer giải trình nguồn thu nhập, thủ tục nộp trước - cấp visa xong mới thanh toán nhà nước.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-dai-loan")) {
    return {
      title: "Visa Đài Loan | E-Visa Miễn Phí (TAC) & Visa Dán Quan Hồng Bắt Buộc",
      description: "Tư vấn khai E-Visa (TAC) Đài Loan ngay lập tức nếu có visa tiên tiến. Hỗ trợ visa dán (cầm sổ đỏ, sổ BHYT xác thực với TECO) và visa đoàn Quan Hồng uy tín.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-dubai")) {
    return {
      title: "E-Visa Dubai (UAE) | 30/60 Ngày Nhanh Cấp Tốc Bằng Hộ Chiếu",
      description: "Cách nhanh nhất tới Dubai: Cơ chế bảo lãnh điện tử. Không cần chứng minh tài chính, cam kết hình thù thẻ quét AI tránh rớt do lóa flash.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-nga")) {
    return {
      title: "Visa Nga (E-Visa 16 Ngày) & Visa Dán | Đảm Bảo Thủ Tục Registration",
      description: "Khai E-visa Nga chuẩn 16 ngày, né rủi ro phạt nặng di trú. Tư vấn kỹ thủ tục đăng ký tạm trú khắt khe (Registration) khi đến nơi trong vòng 7 ngày.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-nam-phi")) {
    return {
      title: "Visa Nam Phi (Sticker) | Quy Trình Form DHA-84 Mực Đen In Hoa",
      description: "Làm Visa đi Nam Phi Safari trọn gói. Chuyên xử lý form DHA-84 quy chuẩn, tư vấn về tiêm Sốt Vàng Da, giấy Unabridged cho trẻ nhỏ theo sát luật hành chính ĐSQ.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-an-do")) {
    return {
      title: "E-Visa Ấn Độ 1 Năm / 5 Năm Đi Lại Nhiều Lần (Multiple Entry Tourist/Business)",
      description: "Làm E-visa Ấn Độ nhanh gọn. Giải quyết tình trạng lỗi thẻ thanh toán quốc gia, định vị ảnh chụp tỷ lệ 1:1 chuẩn xác, hỗ trợ ngay trong 3 ngày.",
      canonical: base + path,
    };
  }

  if (path.includes("/visa-ai-cap")) {
    return {
      title: "Visa Ai Cập (Visa Dán) Nộp Trực Tiếp ĐSQ | Dịch Vụ Nộp Thay An Toàn",
      description: "Xin visa Ai Cập dạng Sticker an toàn, tránh rủi ro E-visa kẹt tại máy bay. Tư vấn các nguyên tắc bất thành văn mang ngoại tệ mặt khi nhập qua hải quan.",
      canonical: base + path,
    };
  }
  
  return {
    title: pageName ? \`Dịch Vụ Visa \${pageName} Cấp Tốc Trọn Gói | Beetours Vietnam\` : "Beetours Vietnam - Tư Vấn Visa & Giải Pháp Di Trú",
    description: pageName ? \`Dịch vụ visa \${pageName} cùng đội ngũ Chuyên gia kinh nghiệm. Hỗ trợ rà soát VssID, đánh giá độ mạnh hồ sơ và lên chiến lược giải trình hạn chế từ chối.\` : "Tư vấn visa chuyên nghiệp 16 quốc gia, giải trình hồ sơ xấu, xử lý hộ chiếu trắng, luyện phỏng vấn đỉnh cao.",
    canonical: base + path,
  };
}`;

const re = /export function getPageSEO.*?^}/sm;
code = code.replace(re, newGetPageSEO);

fs.writeFileSync('seo.ts', code);
console.log('Seo.ts updated successfully.');
