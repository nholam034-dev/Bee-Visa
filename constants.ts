
import { PageData, CountrySummary, ServiceDetailData, SiteConfig, FooterLink } from "./types";
import { CUSTOM_SYSTEM_PROMPT, CUSTOM_KNOWLEDGE_BASE } from "./ai_data";

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: "BEETOURS",
  logoUrl: "", // Để trống sẽ hiển thị chữ B mặc định
  tagline: "Book Easy Easy",
  hotline: "1900-0310",
  email: "info@beetours.com",
  address: "Tòa nhà NEWS BUILDING, Số 21/27 Đại Cồ Việt, Phường Bạch Mai, Hà Nội",
  googleSheetUrl: "https://script.google.com/macros/s/AKfycbzJ7HmxQCKbndHXC5rZP4iq6UHfsoFpC9tXA_zJePIj89CYu-PVGgIkWOFaWjAyHdHtyg/exec"
};

const COMMON_STATS = [
  { icon: "workspace_premium", label: "Kinh Nghiệm", value: "15+ Năm" },
];

const COMMON_SUPPORT_LINKS: FooterLink[] = [
    { label: "Kiểm Tra Tỷ Lệ Đậu", type: "modal", target: "assessment" },
    { label: "Dịch Thuật Công Chứng", type: "navigate", target: "process" },
    { label: "Đặt Lịch Hẹn", type: "modal", target: "form" },
    { label: "Câu Hỏi Thường Gặp", type: "navigate", target: "contact" }
];

// --- Helper to create default footer/cta for repetitive pages ---
const getDefaultFooter = (name: string) => ({
    serviceColumnTitle: `Dịch Vụ ${name}`,
    serviceLinks: [
        { label: `Visa Du Lịch ${name}`, type: "modal", target: "chat" } as FooterLink, 
        { label: `Visa Công Tác ${name}`, type: "modal", target: "chat" } as FooterLink,
        { label: `Visa Thăm Thân ${name}`, type: "modal", target: "chat" } as FooterLink
    ],
    supportLinks: COMMON_SUPPORT_LINKS,
});

const getDefaultCTA = (name: string) => ({
    icon: "flight_takeoff",
    title: `Khám Phá ${name} Ngay Hôm Nay`,
    description: "Đừng để thủ tục visa phức tạp làm lỡ kế hoạch của bạn.",
    note: "* Hỗ trợ dịch vụ khẩn và xử lý hồ sơ khó.",
});

export const PAGES: Record<string, PageData> = {
  home: {
      id: "home",
      name: "Trang Chủ",
      navItems: [],
      stats: [],
      services: [], 
      process: [],
      hero: {
        badge: "Beetours Vietnam",
        title: "Chuyên Gia Visa",
        highlight: "Toàn Cầu",
        description: "Giải pháp visa toàn diện cho 11 thị trường khó tính nhất. Chúng tôi biến giấc mơ du lịch, du học và định cư của bạn thành hiện thực với tỷ lệ đậu lên tới 99%.",
        backgroundImage: "/images/destinations/my.png",
        buttonPrimary: "Chọn Điểm Đến",
        buttonSecondary: "",
        buttonSecondaryIcon: ""
      },
      cta: { icon: "", title: "", description: "", note: "" },
      footer: { serviceColumnTitle: "", serviceLinks: [], supportLinks: [] }
  },
  uk: {
    id: "uk",
    name: "Anh Quốc (UK)",
    navItems: [{ label: "Visa Anh", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "98%" }, ...COMMON_STATS, { icon: "timer", label: "Xét Duyệt", value: "3 Tuần" }],
    services: [
      { title: "Visa Du Lịch (Standard)", description: "Du lịch tự túc, khám phá London, Scotland.", image: "/images/services/eg-visit.png", icon: "attractions", detailId: "uk-tourist" },
      { title: "Visa Thăm Thân", description: "Thăm con du học, dự lễ tốt nghiệp, người thân.", image: "/images/services/usa-b1b2.png", icon: "family_restroom", detailId: "uk-family" },
      { title: "Visa Công Tác", description: "Hội họp, thương thảo hợp đồng ngắn hạn.", image: "/images/services/usa-f1.png", icon: "business_center", detailId: "uk-business" },
    ],
    process: [
      { number: 1, title: "Đánh Giá", description: "Phân tích hồ sơ và nguồn gốc tài chính.", icon: "rate_review" },
      { number: 2, title: "Khai Form", description: "Điền đơn GOV.UK và đóng phí bảo hiểm (nếu có).", icon: "edit_document" },
      { number: 3, title: "Biometrics", description: "Đặt lịch & lăn tay tại VFS Global.", icon: "fingerprint" },
      { number: 4, title: "Kết Quả", description: "Nhận visa sau 3 tuần (Có dịch vụ khẩn 5 ngày).", icon: "mark_email_read" },
    ],
    hero: {
      badge: "Xứ Sở Sương Mù",
      title: "Visa Anh Quốc",
      highlight: "Standard Visitor",
      description: "Chinh phục Visa Anh Quốc 6 tháng, 2 năm, 5 năm, 10 năm. Chuyên gia xử lý hồ sơ khó, hộ chiếu trắng, chứng minh nguồn tài chính phức tạp (Provenance of Funds).",
      backgroundImage: "/images/destinations/anh-quoc.png",
      buttonPrimary: "Tư Vấn Báo Giá",
      buttonSecondary: "Hồ Sơ Cần Có",
      buttonSecondaryIcon: "inventory"
    },
    cta: getDefaultCTA("Anh Quốc"),
    footer: getDefaultFooter("Anh Quốc"),
  },
  usa: {
    id: "usa",
    name: "Mỹ (USA)",
    navItems: [{ label: "Visa Mỹ", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "96%" }, ...COMMON_STATS, { icon: "flag", label: "Visa Đã Cấp", value: "12.000+" }],
    services: [
      { title: "Visa B1/B2", description: "Du lịch, công tác, thăm thân (1 năm).", image: "/images/services/usa-renewal.png", icon: "flight_takeoff", detailId: "usa-b1b2" },
      { title: "Visa Du Học (F1)", description: "Tư vấn chọn trường, luyện phỏng vấn 1:1.", image: "/images/services/schengen-france.png", icon: "school", detailId: "usa-f1" },
      { title: "Gia Hạn Visa", description: "Làm qua đường bưu điện (Không phỏng vấn).", image: "/images/services/schengen-business.png", icon: "autorenew", detailId: "usa-renewal" },
    ],
    process: [
      { number: 1, title: "Khai DS-160", description: "Khai form online chính xác tuyệt đối.", icon: "edit_document" },
      { number: 2, title: "Đóng Phí", description: "Tạo tài khoản & đóng phí MRV ($185).", icon: "payments" },
      { number: 3, title: "Phỏng Vấn", description: "Luyện phỏng vấn giả định 1:1 với chuyên gia.", icon: "groups" },
      { number: 4, title: "Nhận Visa", description: "Visa gửi về tận nhà sau 2-3 ngày.", icon: "local_post_office" },
    ],
    hero: {
      badge: "Giấc Mơ Mỹ Trong Tầm Tay",
      title: "Visa Mỹ Trọn Gói",
      highlight: "Bao Đậu Phỏng Vấn",
      description: "Chuyên xử lý hồ sơ khó, hộ chiếu trắng, từng rớt visa. Dịch vụ luyện phỏng vấn chuyên sâu giúp bạn tự tin thuyết phục viên chức Lãnh sự ngay lần đầu.",
      backgroundImage: "/images/destinations/my.png",
      buttonPrimary: "Đánh Giá Hồ Sơ",
      buttonSecondary: "Lịch Phỏng Vấn",
      buttonSecondaryIcon: "calendar_month",
    },
    cta: getDefaultCTA("Mỹ"),
    footer: getDefaultFooter("Mỹ"),
  },
  schengen: {
    id: "schengen",
    name: "Schengen (Châu Âu)",
    navItems: [{ label: "Visa Châu Âu", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "98.5%" }, ...COMMON_STATS, { icon: "public", label: "Đi Lại", value: "29 Nước" }],
    services: [
      { title: "Visa Pháp (Du Lịch)", description: "Cửa ngõ phổ biến nhất. Xét duyệt nhanh.", image: "/images/services/schengen-family.png", icon: "wine_bar", detailId: "schengen-france" },
      { title: "Visa Công Tác", description: "Dự hội chợ, gặp gỡ đối tác tại Châu Âu.", image: "/images/services/au-600.png", icon: "business_center", detailId: "schengen-business" },
      { title: "Visa Thăm Thân", description: "Thăm con du học, người thân định cư.", image: "/images/services/ca-visitor.png", icon: "family_restroom", detailId: "schengen-family" },
    ],
    process: [
      { number: 1, title: "Chọn Nước", description: "Xác định 'Điểm đến chính' (Main Destination).", icon: "map" },
      { number: 2, title: "Hồ Sơ", description: "Dịch thuật, mua bảo hiểm 30.000 EUR.", icon: "folder_zip" },
      { number: 3, title: "TLS/VFS", description: "Nộp hồ sơ & Lấy sinh trắc học.", icon: "domain" },
      { number: 4, title: "Kết Quả", description: "Nhận visa sau 15-45 ngày.", icon: "check_circle" },
    ],
    hero: {
      badge: "Một Visa - 29 Quốc Gia",
      title: "Visa Châu Âu Schengen",
      highlight: "Pháp - Đức - Ý",
      description: "Khám phá Châu Âu không giới hạn. Beetours chuyên xử lý Visa Pháp (cửa ngõ dễ nhất), hỗ trợ chứng minh tài chính, bảo hiểm du lịch quốc tế và xử lý hồ sơ từng bị từ chối.",
      backgroundImage: "/images/destinations/chau-au.png",
      buttonPrimary: "Tư Vấn Free",
      buttonSecondary: "Danh Sách Nước",
      buttonSecondaryIcon: "public",
    },
    cta: getDefaultCTA("Châu Âu"),
    footer: getDefaultFooter("Schengen"),
  },
  australia: {
    id: "australia",
    name: "Úc (Australia)",
    navItems: [{ label: "Visa Úc", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "95%" }, ...COMMON_STATS, { icon: "beach_access", label: "Visa Du Lịch", value: "5.000+" }],
    services: [
        { title: "Visa 600 (Visitor)", description: "Du lịch, thăm thân, công tác ngắn hạn.", image: "/images/services/ca-super.png", icon: "hiking", detailId: "au-600" },
        { title: "Visa Công Tác (Business)", description: "Khảo sát thị trường, dự hội nghị.", image: "/images/services/au-business.png", icon: "business_center", detailId: "au-600" },
        { title: "Visa Thăm Thân (Family)", description: "Thăm con cái, người thân bảo lãnh.", image: "/images/services/au-family.png", icon: "family_restroom", detailId: "au-600" },
    ],
    process: [
        { number: 1, title: "Nộp Online", description: "Tạo tài khoản ImmiAccount và nộp hồ sơ.", icon: "computer" },
        { number: 2, title: "Sinh Trắc", description: "Đặt lịch hẹn lăn tay tại VFS Global.", icon: "fingerprint" },
        { number: 3, title: "Xét Duyệt", description: "Bộ Di trú Úc xét duyệt (2-4 tuần).", icon: "hourglass_top" },
        { number: 4, title: "E-Visa", description: "Nhận kết quả file PDF qua email.", icon: "email" },
    ],
    hero: {
        badge: "Khám Phá Xứ Sở Kangaroo",
        title: "Visa Úc Online 100%",
        highlight: "Không Giữ Hộ Chiếu",
        description: "Dịch vụ làm visa Úc trọn gói: Du lịch, Thăm thân, Công tác. Nộp hồ sơ online 100% qua ImmiAccount, không cần nộp hộ chiếu gốc. Tư vấn tối ưu hồ sơ tài chính để đạt visa 3 năm.",
        backgroundImage: "/images/destinations/uc.png",
        buttonPrimary: "Tư Vấn Visa Úc",
        buttonSecondary: "Chi Phí",
        buttonSecondaryIcon: "attach_money"
    },
    cta: getDefaultCTA("Úc"),
    footer: getDefaultFooter("Úc"),
  },
  canada: {
    id: "canada",
    name: "Canada",
    navItems: [{ label: "Visa Canada", href: "#services" }, { label: "Quy Trình", href: "#process" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "92%" }, ...COMMON_STATS, { icon: "calendar_month", label: "Thời Hạn", value: "Đến 10 Năm" }],
    services: [
        { title: "Visitor Visa (V1)", description: "Du lịch, thăm thân 10 năm.", image: "/images/services/ca-student.png", icon: "flight", detailId: "ca-visitor" },
        { title: "Super Visa (PG-1)", description: "Ông bà/Cha mẹ ở liên tục 5-7 năm.", image: "/images/services/nz-visitor.png", icon: "elderly", detailId: "ca-super" },
        { title: "Study Permit", description: "Giấy phép du học (SDS & Non-SDS).", image: "/images/services/nz-family.png", icon: "school", detailId: "ca-student" },
    ],
    process: [
        { number: 1, title: "Chuẩn Bị", description: "Dịch thuật & Điền form IMM.", icon: "folder_open" },
        { number: 2, title: "Nộp Online", description: "Tạo tài khoản & nộp qua cổng IRCC.", icon: "cloud_upload" },
        { number: 3, title: "Lăn Tay", description: "Lấy sinh trắc học tại VFS Canada.", icon: "fingerprint" },
        { number: 4, title: "Dán Visa", description: "Gửi hộ chiếu để dán tem visa.", icon: "local_shipping" },
    ],
    hero: {
        badge: "Xứ Sở Lá Phong Đỏ",
        title: "Visa Canada 10 Năm",
        highlight: "Quyền Lực",
        description: "Chinh phục Visa Canada với thời hạn cấp theo hộ chiếu (tối đa 10 năm). Ưu tiên chương trình CAN+ (miễn chứng minh tài chính) cho khách đã có visa Mỹ. Tư vấn Super Visa ở lại 5 năm.",
        backgroundImage: "/images/destinations/canada.png",
        buttonPrimary: "Đánh Giá Hồ Sơ",
        buttonSecondary: "Quy Trình CAN+",
        buttonSecondaryIcon: "verified"
    },
    cta: getDefaultCTA("Canada"),
    footer: getDefaultFooter("Canada"),
  },
  newzealand: {
    id: "newzealand",
    name: "New Zealand",
    navItems: [{ label: "Visa NZ", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "94%" }, ...COMMON_STATS, { icon: "payments", label: "Phí IVL", value: "100 NZD" }],
    services: [
        { title: "Visitor Visa", description: "Du lịch tự túc, nộp online qua RealMe.", image: "/images/services/jp-tourist.png", icon: "landscape", detailId: "nz-visitor" },
        { title: "Visa Thăm Thân", description: "Thăm con du học hoặc người thân.", image: "/images/services/nz-visitor.png", icon: "family_restroom", detailId: "nz-family" },
        { title: "Visa Nhóm (Group)", description: "Gia đình nộp chung hồ sơ, xét duyệt cùng lúc.", image: "/images/services/nz-group.png", icon: "groups", detailId: "nz-visitor" },
    ],
    process: [
        { number: 1, title: "Chuẩn Bị", description: "Dịch thuật công chứng toàn bộ hồ sơ.", icon: "translate" },
        { number: 2, title: "RealMe", description: "Tạo tài khoản & Upload hồ sơ PDF.", icon: "cloud_upload" },
        { number: 3, title: "Thanh Toán", description: "Phí Visa + Phí bảo tồn IVL (Bắt buộc).", icon: "payments" },
        { number: 4, title: "E-Visa", description: "Nhận kết quả qua email sau 4-6 tuần.", icon: "mark_email_read" },
    ],
    hero: {
        badge: "Thiên Đường Nam Bán Cầu",
        title: "Visa New Zealand",
        highlight: "Online & Tiện Lợi",
        description: "Dịch vụ visa New Zealand chuyên nghiệp. Hỗ trợ nộp hồ sơ Online qua hệ thống RealMe, xử lý visa nhóm gia đình và tư vấn đóng phí bảo tồn IVL đúng quy định.",
        backgroundImage: "/images/destinations/new-zealand.png",
        buttonPrimary: "Báo Giá Trọn Gói",
        buttonSecondary: "Quy Trình RealMe",
        buttonSecondaryIcon: "laptop_mac"
    },
    cta: getDefaultCTA("New Zealand"),
    footer: getDefaultFooter("New Zealand"),
  },
  japan: {
    id: "japan",
    name: "Nhật Bản",
    navItems: [{ label: "Visa Nhật", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "99%" }, ...COMMON_STATS, { icon: "schedule", label: "Xét Duyệt", value: "7-10 Ngày" }],
    services: [
        { title: "Visa Du Lịch Tự Túc", description: "Single Entry (3 tháng), lưu trú 15 ngày.", image: "/images/services/jp-business.png", icon: "photo_camera", detailId: "jp-tourist" },
        { title: "Visa Công Tác", description: "Thương mại, hội nghị. Cần thư mời gốc.", image: "/images/services/jp-tourist.png", icon: "business_center", detailId: "jp-business" },
        { title: "Visa Thăm Thân", description: "Thăm người thân, bạn bè đang sống tại Nhật.", image: "/images/services/jp-family.png", icon: "family_restroom", detailId: "jp-tourist" },
    ],
    process: [
        { number: 1, title: "Chuẩn Bị", description: "Hồ sơ bản gốc, sắp xếp theo thứ tự.", icon: "folder_special" },
        { number: 2, title: "Nộp Hồ Sơ", description: "Nộp tại Đại lý ủy thác (VFS) hoặc ĐSQ.", icon: "apartment" },
        { number: 3, title: "Xét Duyệt", description: "Thời gian 7-10 ngày làm việc.", icon: "hourglass_top" },
        { number: 4, title: "Nhận Visa", description: "Dán visa vào hộ chiếu.", icon: "check" },
    ],
    hero: {
        badge: "Xứ Sở Hoa Anh Đào",
        title: "Visa Nhật Bản",
        highlight: "Bao Đậu 99%",
        description: "Dịch vụ làm visa Nhật Bản trọn gói: Du lịch tự túc, Thăm thân, Công tác. Hỗ trợ xử lý hồ sơ không cần thư mời (gói cao cấp), tư vấn lịch trình chuẩn logic để tăng tỷ lệ đậu. Cam kết hoàn phí nếu trượt (theo điều kiện).",
        backgroundImage: "/images/destinations/nhat-ban.png",
        buttonPrimary: "Báo Giá Visa",
        buttonSecondary: "Thủ Tục",
        buttonSecondaryIcon: "description"
    },
    cta: getDefaultCTA("Nhật Bản"),
    footer: getDefaultFooter("Nhật Bản"),
  },
  korea: {
    id: "korea",
    name: "Hàn Quốc",
    navItems: [{ label: "Visa Hàn", href: "#services" }],
    stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "96%" }, ...COMMON_STATS],
    services: [
        { title: "Visa C-3-9", description: "Du lịch tự túc.", image: "/images/services/kr-tourist.png", icon: "attractions", detailId: "kr-tourist" },
        { title: "Visa 5 Năm", description: "Đại đô thị (Hà Nội, TP.HCM, Đà Nẵng).", image: "/images/services/kr-5year.png", icon: "looks_5", detailId: "kr-5year" },
        { title: "Visa Công Tác", description: "Thương mại, hội nghị.", image: "/images/services/kr-business.png", icon: "work", detailId: "kr-business" },
    ],
    process: [
        { number: 1, title: "Đặt Lịch", description: "Đăng ký lịch hẹn KVAC.", icon: "calendar_today" },
        { number: 2, title: "Nộp Hồ Sơ", description: "Nộp tại trung tâm KVAC.", icon: "place" },
        { number: 3, title: "Chờ Duyệt", description: "Khoảng 12-16 ngày làm việc.", icon: "pending" },
        { number: 4, title: "Kết Quả", description: "Nhận hộ chiếu và visa.", icon: "done_all" },
    ],
    hero: {
        badge: "Làn Sóng Hallyu",
        title: "Vi Vu",
        highlight: "Hàn Quốc",
        description: "Chuyên visa 5 năm, 10 năm cho công dân đại đô thị. Hỗ trợ chứng minh tài chính và lịch trình.",
        backgroundImage: "/images/destinations/han-quoc.png",
        buttonPrimary: "Check Tỷ Lệ Đậu",
        buttonSecondary: "Visa 5 Năm",
        buttonSecondaryIcon: "star"
    },
    cta: getDefaultCTA("Hàn Quốc"),
    footer: getDefaultFooter("Hàn Quốc"),
  },
  china: {
      id: "china",
      name: "Trung Quốc",
      navItems: [{ label: "Visa Trung", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Thủ Tục", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "99.9%" }, ...COMMON_STATS, { icon: "speed", label: "Visa Khẩn", value: "2-3 Ngày" }],
      services: [
          { title: "Visa Du Lịch (L)", description: "3 tháng 1 lần, lưu trú 15-30 ngày. Thủ tục đơn giản.", image: "/images/services/cn-tourist.png", icon: "camera_alt", detailId: "cn-tourist" },
          { title: "Visa Thương Mại (M)", description: "Dành cho đối tác kinh doanh, hội chợ Canton Fair.", image: "/images/services/cn-business.png", icon: "store", detailId: "cn-business" },
          { title: "Visa 6 Tháng/1 Năm", description: "Nhập cảnh nhiều lần (Multiple) cho khách đi thường xuyên.", image: "/images/services/cn-multiple.png", icon: "repeat", detailId: "cn-business" },
      ],
      process: [
        { number: 1, title: "Khai COVA", description: "Điền tờ khai tiếng Trung/Anh cực chuẩn xác.", icon: "description" },
        { number: 2, title: "Đặt Hẹn", description: "Lấy lịch hẹn lăn tay tại trung tâm (AVAS).", icon: "event" },
        { number: 3, title: "Lăn Tay", description: "Khách hàng đến chụp ảnh và lấy vân tay (Bắt buộc).", icon: "fingerprint" },
        { number: 4, title: "Kết Quả", description: "Nhận visa sau 4-5 ngày (Có gói khẩn).", icon: "check_circle" },
      ],
      hero: {
          badge: "Khám Phá Trung Hoa Đại Lục",
          title: "Visa Trung Quốc",
          highlight: "Bao Đậu 99%",
          description: "Dịch vụ làm visa Trung Quốc trọn gói: Điền tờ khai COVA, đặt lịch hẹn lăn tay VIP, xử lý visa đoàn và thương mại khẩn 2 ngày. Không cần thư mời gốc (tùy diện).",
          backgroundImage: "/images/destinations/trung-quoc.png",
          buttonPrimary: "Báo Giá Trọn Gói",
          buttonSecondary: "Hồ Sơ Cần Có",
          buttonSecondaryIcon: "folder"
      },
      cta: getDefaultCTA("Trung Quốc"),
      footer: getDefaultFooter("Trung Quốc"),
  },
  hongkong: {
      id: "hongkong",
      name: "Hong Kong",
      navItems: [{ label: "E-Visa HK", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "96%" }, ...COMMON_STATS, { icon: "schedule", label: "Thời Gian", value: "3-4 Tuần" }],
      services: [
          { title: "E-Visa Du Lịch", description: "Visa điện tử nhập cảnh 1 lần hoặc 2 lần.", image: "/images/services/hk-tourist.png", icon: "flight_takeoff", detailId: "hk-tourist" },
          { title: "E-Visa Công Tác", description: "Dành cho thương nhân dự hội chợ, họp đối tác.", image: "/images/services/hk-business.png", icon: "business_center", detailId: "hk-business" },
          { title: "Visa Thăm Thân", description: "Thăm con cái, vợ chồng đang làm việc tại HK.", image: "/images/services/hk-family.png", icon: "family_restroom", detailId: "hk-family" },
      ],
      process: [
        { number: 1, title: "Chuẩn Bị", description: "Scan hộ chiếu và hồ sơ theo quy chuẩn.", icon: "scanner" },
        { number: 2, title: "Nộp Online", description: "Khai đơn trên cổng Sở Di trú (ImmD).", icon: "send" },
        { number: 3, title: "Xét Duyệt", description: "Thời gian chờ từ 3-4 tuần làm việc.", icon: "hourglass_top" },
        { number: 4, title: "E-Visa", description: "Thanh toán phí và tải visa về điện thoại.", icon: "download" },
      ],
      hero: {
          badge: "Hương Cảng Phồn Hoa",
          title: "Dịch Vụ Visa Hong Kong",
          highlight: "Trọn Gói & Uy Tín",
          description: "Chuyên xử lý E-Visa Hong Kong (Du lịch, Công tác) cho khách Việt Nam. Cam kết tỷ lệ đậu cao, hỗ trợ giải trình hồ sơ tài chính và công việc tự do.",
          backgroundImage: "/images/destinations/hong-kong.png",
          buttonPrimary: "Tư Vấn Báo Giá",
          buttonSecondary: "Thủ Tục E-Visa",
          buttonSecondaryIcon: "article"
      },
      cta: getDefaultCTA("Hong Kong"),
      footer: getDefaultFooter("Hong Kong")
  },
  taiwan: {
      id: "taiwan",
      name: "Đài Loan",
      navItems: [{ label: "Visa Đài Loan", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Điều Kiện", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "99%" }, ...COMMON_STATS, { icon: "speed", label: "TAC E-Visa", value: "Trong Ngày" }],
      services: [
          { title: "E-Visa (Miễn Thị Thực TAC)", description: "Dành cho khách có visa Mỹ, Úc, Nhật, Âu... còn hạn hoặc hết hạn <10 năm.", image: "/images/services/tw-tac.png", icon: "travel_explore", detailId: "tw-tac" },
          { title: "Visa Du Lịch Dán (Hồ sơ)", description: "Nộp trực tiếp tại văn phòng kinh tế Đài Bắc (TECO).", image: "/images/services/tw-sticker.png", icon: "article", detailId: "tw-sticker" },
          { title: "Visa Quan Hồng (Đoàn)", description: "Dành cho đoàn du lịch qua công ty lữ hành chỉ định.", image: "/images/services/tw-group.png", icon: "groups", detailId: "tw-sticker" },
      ],
      process: [
        { number: 1, title: "Check Điều Kiện", description: "Kiểm tra xem có đủ điều kiện làm TAC miễn phí không.", icon: "fact_check" },
        { number: 2, title: "Khai Form", description: "Khai đơn online (Website BOCA hoặc NIA).", icon: "edit_note" },
        { number: 3, title: "Nộp Hồ Sơ", description: "Nộp tại TECO (Nếu làm visa dán) hoặc nhận file PDF (Nếu TAC).", icon: "send" },
        { number: 4, title: "Kết Quả", description: "Nhận visa sau 5-7 ngày làm việc (Visa dán).", icon: "done" },
      ],
      hero: {
          badge: "Trái Tim Châu Á",
          title: "Visa Đài Loan",
          highlight: "E-Visa / Dán",
          description: "Hỗ trợ xin E-visa Đài Loan (TAC) miễn phí nếu đủ điều kiện. Dịch vụ làm visa dán bao đậu, xử lý hồ sơ không có BHXH/VssID.",
          backgroundImage: "/images/destinations/dai-loan.png",
          buttonPrimary: "Check Điều Kiện TAC",
          buttonSecondary: "Hồ Sơ Visa Dán",
          buttonSecondaryIcon: "description"
      },
      cta: getDefaultCTA("Đài Loan"),
      footer: getDefaultFooter("Đài Loan")
  },
  uae: {
      id: "uae",
      name: "Dubai (UAE)",
      navItems: [{ label: "Visa Dubai", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "99%" }, ...COMMON_STATS, { icon: "bolt", label: "Visa Khẩn", value: "4-8 Giờ" }],
      services: [
          { title: "E-Visa Du Lịch 30 Ngày", description: "Nhập cảnh 1 lần, lưu trú 30 ngày. Phổ biến nhất.", image: "/images/services/uae-tourist.png", icon: "luggage", detailId: "uae-tourist" },
          { title: "Visa 2 Tháng (60 Ngày)", description: "Dành cho khách đi thăm thân hoặc công tác dài hạn.", image: "/images/services/uae-60days.png", icon: "date_range", detailId: "uae-60days" },
          { title: "Visa Transit 48h/96h", description: "Dành cho khách quá cảnh tại sân bay Dubai/Abu Dhabi.", image: "/images/services/uae-transit.png", icon: "transit_enterexit", detailId: "uae-transit" },
      ],
      process: [
        { number: 1, title: "Gửi Hồ Sơ", description: "Chỉ cần chụp ảnh Hộ chiếu + Ảnh thẻ.", icon: "upload_file" },
        { number: 2, title: "Thanh Toán", description: "Thanh toán phí dịch vụ trọn gói.", icon: "payments" },
        { number: 3, title: "Xét Duyệt", description: "Thời gian chờ 1-3 ngày làm việc.", icon: "hourglass_bottom" },
        { number: 4, title: "Nhận Visa", description: "Gửi E-Visa qua Zalo/Email để in ra.", icon: "print" },
      ],
      hero: {
          badge: "Tiểu Vương Quốc Ả Rập Thống Nhất",
          title: "Visa Dubai",
          highlight: "Chỉ Cần Hộ Chiếu",
          description: "Dịch vụ làm E-Visa Dubai (UAE) nhanh chóng, uy tín. Không cần chứng minh tài chính, không cần đặt cọc chống trốn (cho khách có lịch sử du lịch tốt). Hỗ trợ vé máy bay và khách sạn.",
          backgroundImage: "/images/destinations/dubai.png",
          buttonPrimary: "Làm Visa Ngay",
          buttonSecondary: "Bảng Giá",
          buttonSecondaryIcon: "price_check"
      },
      cta: getDefaultCTA("Dubai"),
      footer: getDefaultFooter("Dubai")
  },
  russia: {
      id: "russia",
      name: "Nga (Russia)",
      navItems: [{ label: "E-Visa Nga", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "98%" }, ...COMMON_STATS, { icon: "timer", label: "E-Visa", value: "4 Ngày" }],
      services: [
          { title: "Unified E-Visa", description: "Visa điện tử 16 ngày, thủ tục online 100%.", image: "/images/services/ru-evisa.png", icon: "laptop_chromebook", detailId: "ru-evisa" },
          { title: "Visa Du Lịch (Dán)", description: "Lưu trú tới 30 ngày hoặc 3 năm nhiều lần.", image: "/images/services/ru-sticker.png", icon: "confirmation_number", detailId: "ru-sticker" },
          { title: "Visa Công Tác", description: "Dành cho đối tác làm việc, khảo sát thị trường.", image: "/images/services/ru-business.png", icon: "business_center", detailId: "ru-business" },
      ],
      process: [
        { number: 1, title: "Chuẩn Bị", description: "Chụp ảnh hộ chiếu và ảnh thẻ mềm.", icon: "upload_file" },
        { number: 2, title: "Khai Form", description: "Khai đơn E-Visa hoặc Tờ khai xin thị thực.", icon: "edit_document" },
        { number: 3, title: "Nộp Hồ Sơ", description: "Nộp online (E-Visa) hoặc nộp ĐSQ (Visa dán).", icon: "send" },
        { number: 4, title: "Kết Quả", description: "Nhận Visa sau 4 ngày (E-Visa) hoặc 1-2 tuần (Dán).", icon: "done_all" },
      ],
      hero: {
          badge: "Xứ Sở Bạch Dương",
          title: "Visa Nga",
          highlight: "E-Visa 16 Ngày",
          description: "Khám phá nước Nga vĩ đại dễ dàng hơn với E-Visa điện tử mới. Thủ tục đơn giản, không cần thư mời gốc, xét duyệt nhanh chóng.",
          backgroundImage: "/images/destinations/nga.png",
          buttonPrimary: "Làm E-Visa Ngay",
          buttonSecondary: "Visa Dán 30 Ngày",
          buttonSecondaryIcon: "contact_page"
      },
      cta: getDefaultCTA("Nga"),
      footer: getDefaultFooter("Nga")
  },
  southafrica: {
      id: "southafrica",
      name: "Nam Phi",
      navItems: [{ label: "Visa Nam Phi", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Lưu Ý", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "92%" }, ...COMMON_STATS],
      services: [
          { title: "Visa Du Lịch", description: "Khám phá Cape Town, Safari. Visa dán 3 tháng.", image: "/images/services/za-tourist.png", icon: "landscape", detailId: "za-tourist" },
          { title: "Visa Công Tác", description: "Thương mại, hội nghị. Cần thư mời chuẩn.", image: "/images/services/za-business.png", icon: "business_center", detailId: "za-business" },
          { title: "Visa Thăm Thân", description: "Thăm người nhà đang sinh sống tại Nam Phi.", image: "/images/services/za-visit.png", icon: "family_restroom", detailId: "za-visit" },
      ],
      process: [
        { number: 1, title: "Chuẩn Bị", description: "Dịch thuật công chứng hồ sơ sang tiếng Anh.", icon: "translate" },
        { number: 2, title: "Điền Đơn", description: "Khai form DHA-84 bằng mực đen, chữ in hoa.", icon: "edit_note" },
        { number: 3, title: "Nộp Hồ Sơ", description: "Nộp trực tiếp tại ĐSQ Hà Nội hoặc LSQ TP.HCM.", icon: "apartment" },
        { number: 4, title: "Kết Quả", description: "Nhận visa sau 7-14 ngày làm việc.", icon: "passport" },
      ],
      hero: {
          badge: "Cầu Vồng Châu Phi",
          title: "Visa Nam Phi",
          highlight: "Trọn Gói",
          description: "Dịch vụ làm visa Nam Phi uy tín. Hỗ trợ khai form DHA-84 chuẩn xác, dịch thuật công chứng và nộp hồ sơ thay (tùy trường hợp). Tư vấn tiêm phòng Sốt vàng da.",
          backgroundImage: "/images/destinations/nam-phi.png",
          buttonPrimary: "Tư Vấn Ngay",
          buttonSecondary: "Thủ Tục",
          buttonSecondaryIcon: "list"
      },
      cta: getDefaultCTA("Nam Phi"),
      footer: getDefaultFooter("Nam Phi")
  },
  india: {
      id: "india",
      name: "Ấn Độ (India)",
      navItems: [{ label: "E-Visa Ấn Độ", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Bảng Phí", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "99%" }, ...COMMON_STATS, { icon: "timer", label: "Xét Duyệt", value: "3-5 Ngày" }],
      services: [
          { title: "E-Visa Du Lịch 30 Ngày", description: "Nhập cảnh 2 lần (Double Entry).", image: "/images/services/in-tourist.png", icon: "temple_hindu", detailId: "in-tourist" },
          { title: "E-Visa 1 Năm / 5 Năm", description: "Nhập cảnh nhiều lần (Multiple Entry).", image: "/images/services/in-multiple.png", icon: "history_edu", detailId: "in-tourist" },
          { title: "E-Visa Thương Mại", description: "Dành cho doanh nhân, thời hạn 1 năm.", image: "/images/services/in-business.png", icon: "business_center", detailId: "in-business" },
      ],
      process: [
        { number: 1, title: "Gửi Hồ Sơ", description: "Chụp ảnh hộ chiếu và ảnh thẻ mềm.", icon: "upload_file" },
        { number: 2, title: "Khai Form", description: "Khai đơn E-Visa Ấn Độ trực tuyến.", icon: "edit_document" },
        { number: 3, title: "Thanh Toán", description: "Thanh toán phí dịch vụ trọn gói.", icon: "payments" },
        { number: 4, title: "Nhận ETA", description: "Nhận Visa điện tử qua email sau 3 ngày.", icon: "mark_email_read" },
      ],
      hero: {
          badge: "Vùng Đất Phật Giáo",
          title: "Visa Ấn Độ Online",
          highlight: "Nhanh & Tiện Lợi",
          description: "Dịch vụ làm E-Visa Ấn Độ trọn gói. Xử lý ảnh thẻ chuẩn vuông, khai form chính xác, cam kết tỷ lệ đậu cao. Không cần gửi hộ chiếu gốc.",
          backgroundImage: "/images/destinations/an-do.png",
          buttonPrimary: "Làm E-Visa Ngay",
          buttonSecondary: "Bảng Phí",
          buttonSecondaryIcon: "price_check"
      },
      cta: getDefaultCTA("Ấn Độ"),
      footer: getDefaultFooter("Ấn Độ")
  },
  egypt: {
      id: "egypt",
      name: "Ai Cập",
      navItems: [{ label: "Visa Ai Cập", href: "#services" }, { label: "Quy Trình", href: "#process" }, { label: "Lưu Ý", href: "#" }],
      stats: [{ icon: "verified", label: "Tỷ Lệ Đậu", value: "96%" }, ...COMMON_STATS, { icon: "calendar_month", label: "Xử Lý", value: "7-10 Ngày" }],
      services: [
          { title: "Visa Du Lịch (Dán)", description: "Nộp trực tiếp tại ĐSQ. An toàn nhất.", image: "/images/services/eg-tourist.png", icon: "confirmation_number", detailId: "eg-tourist" },
          { title: "Visa Công Tác", description: "Thương mại, khảo sát thị trường.", image: "/images/services/eg-business.png", icon: "business_center", detailId: "eg-business" },
          { title: "Visa Thăm Thân", description: "Thăm người nhà đang sinh sống tại Ai Cập.", image: "/images/services/eg-visit.png", icon: "family_restroom", detailId: "eg-visit" },
      ],
      process: [
        { number: 1, title: "Chuẩn Bị", description: "Dịch thuật hồ sơ sang tiếng Anh/Pháp.", icon: "translate" },
        { number: 2, title: "Nộp Hồ Sơ", description: "Nộp tại ĐSQ Ai Cập (Hà Nội).", icon: "account_balance" },
        { number: 3, title: "Đóng Phí", description: "Thanh toán phí lãnh sự (USD tiền mặt).", icon: "payments" },
        { number: 4, title: "Kết Quả", description: "Nhận visa sau 1-2 tuần làm việc.", icon: "passport" },
      ],
      hero: {
          badge: "Bí Ẩn Kim Tự Tháp",
          title: "Visa Ai Cập",
          highlight: "Trọn Gói",
          description: "Dịch vụ làm visa Ai Cập uy tín (Visa dán). Hỗ trợ nộp thay tại Đại sứ quán Hà Nội cho khách hàng toàn quốc. Tư vấn quy định mang tiền mặt khi nhập cảnh.",
          backgroundImage: "/images/destinations/ai-cap.png",
          buttonPrimary: "Tư Vấn Ngay",
          buttonSecondary: "Thủ Tục",
          buttonSecondaryIcon: "list"
      },
      cta: getDefaultCTA("Ai Cập"),
      footer: getDefaultFooter("Ai Cập")
  },
};

export const COUNTRIES_SUMMARY: CountrySummary[] = [
  { id: "usa", name: "Mỹ", badge: "Hot", description: "Visa 1 năm, phỏng vấn trực tiếp", image: "/images/destinations/anh-quoc.png" },
  { id: "uk", name: "Anh Quốc", badge: "Phổ biến", description: "Visa 6 tháng, 2/5/10 năm", image: "/images/destinations/anh-quoc.png" },
  { id: "schengen", name: "Châu Âu", badge: "Cao cấp", description: "29 nước khối Schengen", image: "/images/destinations/my.png" },
  { id: "australia", name: "Úc", badge: "E-Visa", description: "Nộp online, visa 1-3 năm", image: "/images/destinations/chau-au.png" },
  { id: "canada", name: "Canada", badge: "10 Năm", description: "Visa theo hạn hộ chiếu", image: "/images/destinations/uc.png" },
  { id: "newzealand", name: "New Zealand", badge: "Online", description: "Visa điện tử tiện lợi", image: "/images/destinations/canada.png" },
  { id: "japan", name: "Nhật Bản", badge: "Nhanh", description: "E-visa đoàn hoặc dán", image: "/images/destinations/new-zealand.png" },
  { id: "korea", name: "Hàn Quốc", badge: "Trend", description: "Đại đô thị & 5 năm", image: "/images/destinations/nhat-ban.png" },
  { id: "china", name: "Trung Quốc", badge: "Dễ", description: "Visa đoàn & thương mại", image: "/images/destinations/han-quoc.png" },
  { id: "hongkong", name: "Hong Kong", badge: "E-Visa", description: "Visa điện tử 100%", image: "/images/destinations/trung-quoc.png" },
  { id: "taiwan", name: "Đài Loan", badge: "Miễn phí", description: "Có điều kiện miễn thị thực", image: "/images/destinations/hong-kong.png" },
  { id: "uae", name: "Dubai (UAE)", badge: "24h", description: "Visa điện tử nhanh gọn", image: "/images/destinations/dai-loan.png" },
  { id: "russia", name: "Nga", badge: "E-Visa", description: "Visa điện tử 16 ngày", image: "/images/destinations/dubai.png" },
  { id: "southafrica", name: "Nam Phi", badge: "Safari", description: "Nộp tại ĐSQ/LSQ", image: "/images/destinations/nga.png" },
  { id: "india", name: "Ấn Độ", badge: "E-Visa", description: "Visa 1 năm/5 năm online", image: "/images/destinations/nam-phi.png" },
  { id: "egypt", name: "Ai Cập", badge: "Kỳ quan", description: "Visa dán hoặc E-visa", image: "/images/destinations/an-do.png" },
];

export const SERVICE_DETAILS: Record<string, ServiceDetailData> = {
  // ================= USA (UPDATED) =================
  "usa-b1b2": {
    id: "usa-b1b2",
    parentId: "usa",
    title: "Visa Mỹ B1/B2 (Du Lịch & Công Tác)",
    heroImage: "/images/services/usa-b1b2.png",
    overview: "Visa B1/B2 (Visitor Visa) là loại thị thực không định cư dành cho người muốn đến Mỹ tạm thời để công tác (B-1), du lịch (B-2) hoặc kết hợp cả hai. Thời hạn visa thường là 1 năm nhưng cho phép nhập cảnh nhiều lần (Multiple Entry). Yếu tố quyết định thành bại nằm ở vòng phỏng vấn trực tiếp 3-5 phút với viên chức Lãnh sự.",
    benefits: [
      "Quyền lực 'Passport thứ 2': Dễ dàng xin visa Canada, Châu Âu, Anh Quốc.",
      "Miễn thị thực (E-visa) vào Đài Loan, Thổ Nhĩ Kỳ và nhiều nước Nam Mỹ.",
      "Nhập cảnh nhiều lần trong 1 năm, thời gian lưu trú do hải quan quyết định (thường là 6 tháng).",
      "Được phép gia hạn qua đường bưu điện mà không cần phỏng vấn lại (nếu đủ điều kiện)."
    ],
    requirements: [
      {
        title: "Hồ sơ mang đi phỏng vấn (Bắt buộc)",
        items: ["Hộ chiếu gốc còn hạn trên 6 tháng (Ký tên trang 3).", "Trang xác nhận DS-160 (Có mã vạch rõ nét).", "Thư xác nhận cuộc hẹn phỏng vấn.", "01 ảnh 5x5cm nền trắng (lộ rõ 2 tai, không đeo kính)."]
      },
      {
        title: "Chứng minh sự ràng buộc (Ties to Home)",
        items: ["Hợp đồng lao động / Quyết định bổ nhiệm (bản gốc).", "Sao kê lương 3-6 tháng hoặc Phiếu lương.", "Sổ BHXH (VssID) - Bằng chứng thép về công việc.", "Giấy phép ĐKKD + Tờ khai thuế (nếu là chủ DN)."]
      },
      {
        title: "Tài sản & Tài chính",
        items: ["Sổ tiết kiệm (Kỳ hạn > 1 tháng, càng nhiều càng tốt).", "Sổ đỏ nhà đất (Bản gốc).", "Đăng ký xe ô tô (nếu có)."]
      }
    ],
    faq: [
      { question: "Phỏng vấn bằng tiếng Anh hay tiếng Việt?", answer: "Viên chức Lãnh sự đều nói được tiếng Việt. Bạn hoàn toàn có thể trả lời bằng tiếng Việt. Tuy nhiên, nếu bạn đi diện Công tác hoặc Du học, trả lời bằng tiếng Anh sẽ là điểm cộng lớn." },
      { question: "Tôi có cần mua vé máy bay trước không?", answer: "TUYỆT ĐỐI KHÔNG. ĐSQ Mỹ khuyến cáo không được xuất vé máy bay hoặc thanh toán khách sạn trước khi có visa. Bạn chỉ cần lên lịch trình dự kiến." },
      { question: "Rớt visa Mỹ bao lâu thì xin lại được?", answer: "Không có quy định cứng. Tuy nhiên, bạn chỉ nên nộp lại sau 3-6 tháng KHI VÀ CHỈ KHI hồ sơ có sự thay đổi tích cực (ví dụ: đã đi thêm nước khác, lương tăng, có thêm tài sản). Nộp lại ngay lập tức với hồ sơ cũ thì 99% sẽ rớt tiếp." }
    ]
  },
  "usa-f1": {
      id: "usa-f1",
      parentId: "usa",
      title: "Visa Du Học Mỹ (F1)",
      heroImage: "/images/services/usa-f1.png",
      overview: "Visa F1 dành cho du học sinh tham gia các chương trình học thuật toàn thời gian tại các trường được chứng nhận (SEVP). Đây là một trong những loại visa khó nhất vì viên chức Lãnh sự luôn nghi ngờ mục đích định cư (Immigrant Intent). Chìa khóa thành công nằm ở việc chứng minh lộ trình học tập hợp lý, năng lực tài chính của gia đình và kế hoạch quay về Việt Nam rõ ràng.",
      benefits: ["Được phép làm thêm trong trường (on-campus) 20h/tuần.", "Cơ hội ở lại thực tập (OPT) từ 1-3 năm sau khi tốt nghiệp.", "Vợ/chồng và con cái được đi cùng (Visa F2)."],
      requirements: [
          { title: "Hồ sơ nhập học", items: ["I-20 (Bản gốc có chữ ký của trường và học sinh).", "Thư mời nhập học (Offer Letter).", "Biên lai đóng phí an ninh SEVIS I-901."] },
          { title: "Học lực & Ngoại ngữ", items: ["Học bạ / Bảng điểm 3 năm gần nhất.", "Chứng chỉ tiếng Anh (IELTS/TOEFL/Duolingo).", "Bằng cấp cao nhất (Bản gốc)."] },
          { title: "Tài chính (Người bảo trợ)", items: ["Sổ tiết kiệm bao phủ học phí + sinh hoạt phí năm đầu.", "Chứng minh thu nhập hàng tháng của Bố Mẹ (Lương, Cho thuê nhà, Kinh doanh).", "Cam kết bảo trợ tài chính."] }
      ],
      faq: [{ question: "Có cần phỏng vấn không?", answer: "BẮT BUỘC. Phỏng vấn du học Mỹ rất xoáy sâu vào 'Tại sao chọn trường này?', 'Tại sao chọn Mỹ?', và 'Ai trả tiền cho bạn?'. Beetours có các lớp luyện phỏng vấn 1:1 giả định." }]
  },
  "usa-renewal": {
      id: "usa-renewal",
      parentId: "usa",
      title: "Gia Hạn Visa Mỹ (Qua Bưu Điện)",
      heroImage: "/images/services/usa-renewal.png",
      overview: "Chương trình gia hạn visa qua đường bưu điện (Interview Waiver) cho phép bạn làm mới visa mà không cần đến Đại sứ quán phỏng vấn lại. Đây là cách thuận tiện nhất để duy trì thị thực Mỹ. Tuy nhiên, quy định mới từ 2025 đã siết chặt thời gian visa hết hạn.",
      benefits: ["Không cần phỏng vấn lại.", "Không cần lấy lại vân tay.", "Tiết kiệm thời gian và chi phí đi lại."],
      requirements: [
          { title: "Điều kiện kiên quyết", items: ["Là công dân Việt Nam, đang có mặt tại Việt Nam.", "Có visa cũ cùng loại (B1/B2) đã hết hạn KHÔNG QUÁ 12 THÁNG (hoặc 48 tháng tùy thời điểm chính sách, hiện tại ưu tiên <12 tháng).", "Không bị từ chối visa trong lần nộp gần nhất."] },
          { title: "Hồ sơ gửi đi", items: ["Hộ chiếu gốc (còn hạn 6 tháng).", "Hộ chiếu cũ có visa Mỹ gần nhất.", "Trang xác nhận DS-160 mới.", "01 ảnh 5x5cm mới chụp.", "Biên lai đóng phí gia hạn."] }
      ],
      faq: [
          { question: "Gia hạn có bị gọi phỏng vấn lại không?", answer: "CÓ THỂ. Khoảng 10-20% hồ sơ gia hạn sẽ bị yêu cầu đến phỏng vấn để xác minh lại thông tin, đặc biệt nếu bạn ở Mỹ quá lâu trong các lần trước." },
          { question: "Thời gian bao lâu?", answer: "Khoảng 8-10 ngày làm việc. Nếu vào mùa cao điểm có thể lên tới 2 tuần." }
      ]
  },

  // ================= UK (UPDATED) =================
  "uk-tourist": {
      id: "uk-tourist",
      parentId: "uk",
      title: "Visa Anh Quốc (Standard Visitor)",
      heroImage: "/images/services/uk-tourist.png",
      overview: "Standard Visitor Visa là loại thị thực phổ biến nhất dành cho khách du lịch tự túc muốn khám phá Vương quốc Anh (London, Scotland, Wales, Bắc Ireland). Khác với khối Schengen, Anh Quốc xét duyệt hồ sơ cực kỳ kỹ lưỡng về 'Nguồn gốc tài chính' (Provenance of Funds). Số tiền trong sổ tiết kiệm không quan trọng bằng việc bạn chứng minh số tiền đó Ở ĐÂU RA. Mọi giấy tờ nộp vào đều phải được dịch thuật sang tiếng Anh.",
      benefits: ["Thời hạn visa 6 tháng, nhập cảnh nhiều lần (Multiple Entry).", "Được phép tham gia các khóa học ngắn hạn dưới 30 ngày.", "Có thể nâng cấp lên visa dài hạn 2 năm, 5 năm hoặc 10 năm nếu lịch sử đi lại tốt.", "Thời gian xét duyệt minh bạch (có gói Khẩn 5 ngày)."],
      requirements: [
          { title: "Hồ sơ nhân thân", items: ["Hộ chiếu gốc (còn ít nhất 2 trang trống).", "Hộ chiếu cũ (nếu có) để chứng minh lịch sử du lịch.", "Sổ hộ khẩu hoặc Xác nhận cư trú CT07 (Dịch thuật).", "Đăng ký kết hôn (nếu có)."] },
          { title: "Chứng minh nguồn tiền (Key Success Factor)", items: ["Sao kê tài khoản ngân hàng cá nhân 6 tháng gần nhất (Highlight dòng lương nhận hàng tháng).", "Sổ tiết kiệm (Nên mở trước ít nhất 28 ngày).", "Giấy tờ nhà đất, xe hơi (Bản sao y công chứng).", "Giấy tờ bán đất/thừa kế/chứng khoán (nếu có số tiền lớn đột biến trong tài khoản)."] },
          { title: "Công việc", items: ["Hợp đồng lao động dài hạn.", "Đơn xin nghỉ phép đi du lịch (Ghi rõ thời gian).", "Bảng lương chi tiết 3 tháng gần nhất."] }
      ],
      faq: [
          { question: "Có visa Anh rồi có đi được Ireland không?", answer: "Có thể, nếu bạn nhập cảnh vào Anh trước rồi mới qua Ireland (theo chương trình thị thực Anh-Ireland BIVS). Tuy nhiên cần kiểm tra kỹ quy định tại thời điểm đi." },
          { question: "Tôi có thể nộp sổ tiết kiệm mới mở không?", answer: "Anh Quốc không thích sổ 'ốp' (mới gửi sát ngày nộp). Nếu gửi sổ mới, BẮT BUỘC phải giải trình nguồn tiền (rút từ sổ cũ ra, bán vàng, bán đất...). Nếu không giải trình được -> Từ chối ngay lập tức vì nghi ngờ 'Parking Funds'." },
          { question: "Phỏng vấn visa Anh như thế nào?", answer: "Visa Anh thường KHÔNG phỏng vấn. Hồ sơ được xét duyệt hoàn toàn dựa trên giấy tờ bạn nộp. Do đó, việc chuẩn bị hồ sơ đẹp và giải trình chi tiết là yếu tố quyết định." }
      ]
  },
  "uk-family": {
      id: "uk-family",
      parentId: "uk",
      title: "Visa Thăm Thân Anh Quốc",
      heroImage: "/images/services/uk-family.png",
      overview: "Dành cho cha mẹ muốn sang thăm con cái đang du học, dự lễ tốt nghiệp hoặc thăm người thân đang định cư tại Anh. Hồ sơ thăm thân yêu cầu sự rõ ràng về mối quan hệ và tình trạng cư trú hợp pháp của người mời tại Anh.",
      benefits: ["Tỷ lệ đậu cao hơn du lịch tự túc nếu người mời có công việc ổn định.", "Thời gian lưu trú lên đến 6 tháng.", "Được phép kết hợp du lịch cùng gia đình."],
      requirements: [
          { title: "Người mời (Tại Anh)", items: ["Thư mời (Invitation Letter) viết tay hoặc đánh máy, có chữ ký.", "Bản sao Hộ chiếu và Visa/Thẻ cư trú (BRP) tại Anh.", "Giấy tờ chứng minh chỗ ở (Hợp đồng thuê nhà/Sổ đỏ).", "Sao kê ngân hàng 3 tháng (nếu bảo lãnh tài chính)."] },
          { title: "Người được mời (Tại VN)", items: ["Giấy khai sinh/Đăng ký kết hôn chứng minh mối quan hệ.", "Hồ sơ công việc và tài chính cá nhân (Dù được bảo lãnh vẫn nên có để tăng tỷ lệ đậu)."] }
      ],
      faq: [
          { question: "Tôi sang dự lễ tốt nghiệp của con thì cần giấy tờ gì?", answer: "Cần Thư mời dự lễ tốt nghiệp chính thức từ trường Đại học gửi cho bạn (có tên sinh viên và ngày giờ buổi lễ)." }
      ]
  },
  "uk-business": {
      id: "uk-business",
      parentId: "uk",
      title: "Visa Công Tác Anh Quốc",
      heroImage: "/images/services/uk-business.png",
      overview: "Dành cho các chuyến đi thương mại, dự hội nghị, hội thảo, đàm phán hợp đồng hoặc khảo sát thị trường tại Anh. Loại visa này cấm làm việc hưởng lương tại Anh.",
      benefits: ["Hỗ trợ xuất hóa đơn VAT cho doanh nghiệp.", "Xử lý hồ sơ nhanh chóng, chuyên nghiệp."],
      requirements: [
          { title: "Hồ sơ pháp nhân", items: ["Thư mời từ đối tác tại Anh (Ghi rõ mục đích, lịch trình, ai chi trả).", "Quyết định cử đi công tác từ công ty Việt Nam.", "Đăng ký kinh doanh, Sao kê tài khoản công ty (nếu công ty chi trả)."] },
          { title: "Cá nhân", items: ["Hợp đồng lao động.", "Sao kê lương cá nhân."] }
      ],
      faq: []
  },

  // ================= SCHENGEN =================
  "schengen-france": {
      id: "schengen-france",
      parentId: "schengen",
      title: "Visa Pháp (Schengen)",
      heroImage: "/images/services/schengen-france.png",
      overview: "Pháp là quốc gia cấp visa Schengen phổ biến nhất và thường có thời gian xét duyệt ổn định. Visa Schengen cho phép bạn tự do đi lại 29 nước trong khối. Tuy nhiên, bạn bắt buộc phải tuân thủ quy tắc 'Điểm đến chính' (Main Destination): Pháp phải là nơi ở lâu nhất, hoặc là nơi nhập cảnh đầu tiên nếu thời gian ở các nước bằng nhau.",
      benefits: ["Tự do đi lại 29 nước Châu Âu (Pháp, Đức, Ý, Hà Lan...)", "Hồ sơ xét duyệt tương đối nhanh (7-15 ngày)", "Cơ hội nhận visa dài hạn (Circulation Visa 1-5 năm) nếu lịch sử du lịch tốt"],
      requirements: [
          { title: "Hồ sơ bắt buộc", items: ["Hộ chiếu gốc (còn hạn 3 tháng sau ngày về)", "02 Ảnh 3.5x4.5 nền trắng", "Bảo hiểm du lịch (Quyền lợi >30.000 EUR)", "Tờ khai France-Visas"] },
          { title: "Tài chính", items: ["Sao kê tài khoản 3 tháng (Có mộc đỏ ngân hàng)", "Sổ tiết kiệm và Xác nhận số dư (> 200 triệu)", "Sao kê thẻ tín dụng (nếu có)"] },
          { title: "Công việc", items: ["HĐLĐ / Quyết định bổ nhiệm", "Đơn nghỉ phép (Ghi rõ ngày đi/về)", "Xác nhận lương 3 tháng"] }
      ],
      faq: [
          { question: "Tôi nộp hồ sơ ở đâu?", answer: "Hồ sơ nộp tại Trung tâm TLSContact (Hà Nội hoặc TP.HCM). Bạn bắt buộc phải đến để lấy dấu vân tay và chụp ảnh kỹ thuật số (trừ khi đã làm trong 59 tháng qua)." },
          { question: "Có cần phỏng vấn không?", answer: "Thường là KHÔNG. Tuy nhiên ĐSQ Pháp có quyền gọi điện thoại để kiểm tra lịch trình và công việc của bạn." }
      ]
  },
  "schengen-business": {
      id: "schengen-business",
      parentId: "schengen",
      title: "Visa Công Tác Châu Âu (Schengen)",
      heroImage: "/images/services/schengen-business.png",
      overview: "Dành cho các chuyến đi thương mại, dự hội chợ, gặp gỡ đối tác tại khối Schengen. Yếu tố quan trọng nhất là Thư mời từ phía đối tác Châu Âu và bằng chứng mối quan hệ hợp tác giữa hai bên.",
      benefits: ["Được phép tham gia các hoạt động thương mại", "Có thể xin visa nhiều lần (Multiple)"],
      requirements: [
          { title: "Hồ sơ pháp nhân", items: ["Thư mời (Invitation Letter) từ công ty Châu Âu (Bản scan màu/gốc)", "Quyết định cử đi công tác phía Việt Nam", "Vé tham dự hội chợ (nếu có)"] },
          { title: "Chứng minh quan hệ", items: ["Hợp đồng thương mại", "Invoice, Chứng từ xuất nhập khẩu", "Email trao đổi công việc"] },
          { title: "Chi phí", items: ["Xác nhận ai là người chi trả (Công ty mời hay công ty Việt Nam)"] }
      ],
      faq: []
  },
  "schengen-family": {
      id: "schengen-family",
      parentId: "schengen",
      title: "Visa Thăm Thân Châu Âu",
      heroImage: "/images/services/schengen-family.png",
      overview: "Dành cho người muốn sang Châu Âu thăm con cái du học, dự lễ tốt nghiệp hoặc thăm người thân định cư. Thủ tục này yêu cầu giấy tờ bảo lãnh từ phía bên Châu Âu.",
      benefits: ["Được bảo lãnh chỗ ở", "Tỷ lệ đậu cao nếu người mời uy tín"],
      requirements: [
          { title: "Người mời (Tại Châu Âu)", items: ["Giấy bảo lãnh lưu trú (Attestation d'accueil - Pháp / Verpflichtungserklärung - Đức) xin tại Tòa thị chính", "Hộ chiếu + Thẻ cư trú", "Chứng minh tài chính/nhà ở"] },
          { title: "Người được mời (VN)", items: ["Chứng minh mối quan hệ (Giấy khai sinh/ĐKKH)", "Chứng minh công việc & tài chính cá nhân"] }
      ],
      faq: [{ question: "Giấy bảo lãnh xin ở đâu?", answer: "Người mời phải ra Tòa thị chính (Mairie/Rathaus) nơi họ sống để xin giấy này. Thời gian cấp từ 1-2 tuần." }]
  },

  // ================= AUSTRALIA =================
  "au-600": {
      id: "au-600",
      parentId: "australia",
      title: "Visa Úc 600 (Du Lịch & Công Tác)",
      heroImage: "/images/services/au-600.png",
      overview: "Visa 600 là loại thị thực phổ biến nhất, cho phép nhập cảnh Úc để du lịch, thăm thân hoặc công tác ngắn hạn. Úc áp dụng hệ thống xét duyệt E-Visa hiện đại, hồ sơ được nộp 100% Online qua cổng ImmiAccount và KHÔNG giữ hộ chiếu gốc. Yếu tố quan trọng nhất là chứng minh được mục đích chuyến đi thực sự (GTE) và khả năng tài chính.",
      benefits: ["Nộp Online 100%, không cần nộp hộ chiếu gốc (rất tiện nếu cần đi nước khác)", "Nhận kết quả qua Email (File PDF), không sợ thất lạc hộ chiếu", "Thời hạn linh hoạt: 1 năm, 3 năm (tùy lịch sử du lịch)", "Được phép nhập cảnh nhiều lần (Multiple Entry)"],
      requirements: [
          { title: "Hồ sơ cá nhân (Scan màu)", items: ["Hộ chiếu (Tất cả các trang có dấu)", "Ảnh thẻ file mềm", "CCCD, Hộ khẩu (Tất cả các trang)", "Giấy khai sinh"] },
          { title: "Hồ sơ công việc", items: ["Hợp đồng lao động", "Sao kê lương/Bảng lương 3 tháng", "Đơn nghỉ phép (Du lịch) hoặc Quyết định cử đi công tác"] },
          { title: "Hồ sơ tài chính", items: ["Sổ tiết kiệm (Scan bản gốc)", "Sao kê tài khoản ngân hàng", "Giấy tờ nhà đất, xe hơi (Càng nhiều càng tốt)"] },
          { title: "Thủ tục sinh trắc học", items: ["Sau khi nộp online, bạn bắt buộc phải đến VFS Global để lấy dấu vân tay và chụp ảnh"] }
      ],
      faq: [
          { question: "Visa Úc có phỏng vấn không?", answer: "Thường là KHÔNG. ĐSQ xét duyệt dựa trên hồ sơ upload. Tuy nhiên, họ có thể gọi điện kiểm tra thông tin công việc và lịch trình." },
          { question: "Xin visa 3 năm được không?", answer: "Được, nếu bạn có lịch sử du lịch tốt và tài chính mạnh, hoặc có con cái là thường trú nhân Úc (diện Parent Visa)." },
          { question: "Visa này có được đi làm không?", answer: "TUYỆT ĐỐI KHÔNG. Visa 600 cấm làm việc dưới mọi hình thức (kể cả không lương). Vi phạm sẽ bị hủy visa và cấm nhập cảnh 3 năm." }
      ]
  },

  // ================= CANADA =================
  "ca-visitor": {
      id: "ca-visitor",
      parentId: "canada",
      title: "Visa Du Lịch Canada (V1)",
      heroImage: "/images/services/ca-visitor.png",
      overview: "Visa Canada (Visitor Visa - V1) được cấp với thời hạn lên đến 10 năm (theo hộ chiếu), cho phép nhập cảnh nhiều lần. Đây là một trong những visa 'quyền lực' nhất thế giới. Tuy nhiên, thời gian xét duyệt của Canada khá lâu. Đặc biệt, nếu bạn đã có Visa Mỹ (Non-immigrant), bạn có thể nộp theo chương trình CAN+ để được MIỄN chứng minh tài chính và xét duyệt nhanh hơn.",
      benefits: ["Thời hạn visa siêu dài (đến 10 năm)", "Nhập cảnh nhiều lần (Multiple Entry)", "Miễn chứng minh tài chính nếu nộp theo diện CAN+ (Có visa Mỹ còn hạn)"],
      requirements: [
          { title: "Hồ sơ bắt buộc", items: ["Hộ chiếu gốc (còn hạn dài để xin visa 10 năm)", "Tờ khai IMM5257 và IMM5645 (Điền trên máy tính)", "Lịch sử du lịch tốt (đã đi các nước phát triển)"] },
          { title: "Tài chính (Nếu không có visa Mỹ)", items: ["Sổ tiết kiệm > 200 triệu (Kỳ hạn > 4 tháng)", "Sao kê tài khoản ngân hàng 4 tháng", "Giấy tờ nhà đất, xe hơi (Dịch thuật công chứng)"] },
          { title: "Công việc & Ràng buộc", items: ["HĐLĐ / ĐKKD", "Sao kê lương", "BHXH (VssID) - Rất quan trọng để chứng minh không trốn ở lại"] }
      ],
      faq: [
          { question: "Visa Canada có cần phỏng vấn không?", answer: "Thường là KHÔNG. Bạn chỉ cần đến VFS Global để lấy sinh trắc học (Lăn tay & Chụp ảnh). Trừ trường hợp hồ sơ có vấn đề cần xác minh." },
          { question: "Thời gian xét duyệt bao lâu?", answer: "Trung bình từ 3-6 tuần. Có thể lâu hơn vào mùa cao điểm du lịch." },
          { question: "Chương trình CAN+ là gì?", answer: "Dành cho người đã có visa Canada trong 10 năm qua HOẶC đang có visa Mỹ còn hạn. Được miễn chứng minh tài chính và ưu tiên xét duyệt." }
      ]
  },
  "ca-super": {
      id: "ca-super",
      parentId: "canada",
      title: "Super Visa (Siêu Visa Thăm Thân)",
      heroImage: "/images/services/ca-super.png",
      overview: "Super Visa là loại thị thực đặc biệt dành riêng cho Ông bà/Cha mẹ muốn sang Canada thăm con cháu dài hạn. Khác với visa du lịch thông thường chỉ cho phép ở lại 6 tháng mỗi lần, Super Visa cho phép ở lại LIÊN TỤC lên đến 5 năm (có thể gia hạn thêm 2 năm) mà không cần phải xuất cảnh.",
      benefits: ["Thời gian lưu trú liên tục 5 năm mỗi lần nhập cảnh", "Visa có giá trị 10 năm, nhập cảnh nhiều lần", "Giải pháp tuyệt vời để đoàn tụ gia đình trong lúc chờ bảo lãnh định cư"],
      requirements: [
          { title: "Điều kiện người con (Bảo lãnh)", items: ["Là thường trú nhân (PR) hoặc công dân Canada", "Có thu nhập đạt mức tối thiểu (LICO) quy định", "Viết thư mời bảo lãnh cam kết chi trả"] },
          { title: "Điều kiện đương đơn (Cha mẹ)", items: ["Đậu kiểm tra sức khỏe (Khám phổi tại IOM/Care1)", "Mua bảo hiểm y tế Canada 1 năm (Mức bồi thường > $100,000, đã thanh toán đủ)"] }
      ],
      faq: [{ question: "Mua bảo hiểm ở VN được không?", answer: "Không. Bắt buộc phải mua bảo hiểm của các công ty bảo hiểm Canada hoặc quốc tế được chấp thuận." }]
  },
  "ca-student": {
      id: "ca-student",
      parentId: "canada",
      title: "Visa Du Học Canada (SDS / Non-SDS)",
      heroImage: "/images/services/ca-student.png",
      overview: "Du học Canada là con đường định cư phổ biến nhất. Có 2 diện chính: SDS (Miễn chứng minh tài chính, yêu cầu IELTS 6.0) và Non-SDS (Chứng minh tài chính thông thường). Việc chọn diện nộp phụ thuộc vào năng lực học tập và tài chính của gia đình.",
      benefits: ["Cơ hội định cư cao sau khi tốt nghiệp (PGWP)", "Được phép làm thêm 20h/tuần"],
      requirements: [
          { title: "Diện SDS (Ưu tiên)", items: ["IELTS Academic 6.0 (không kỹ năng nào dưới 6.0)", "Đóng đủ học phí 1 năm", "Mua chứng chỉ đầu tư đảm bảo (GIC) $10,000 - $20,635 CAD"] },
          { title: "Diện Non-SDS (Thường)", items: ["Chứng minh tài chính thu nhập hàng tháng của bố mẹ", "Sổ tiết kiệm lớn", "Giải trình kế hoạch học tập (Study Plan) chi tiết"] }
      ],
      faq: []
  },

  // ================= NEW ZEALAND (UPDATED) =================
  "nz-visitor": {
      id: "nz-visitor",
      parentId: "newzealand",
      title: "Visa Du Lịch New Zealand (Visitor Visa)",
      heroImage: "/images/services/nz-visitor.png",
      overview: "New Zealand (Aotearoa) áp dụng hệ thống xét duyệt visa online hiện đại thông qua tài khoản RealMe. Đây là một trong những quốc gia có quy trình xét duyệt nghiêm ngặt nhất về tính trung thực của hồ sơ. Đặc biệt, New Zealand yêu cầu tất cả giấy tờ tiếng Việt phải được dịch thuật công chứng sang tiếng Anh. Ngoài phí visa, du khách cũng phải đóng thêm phí Bảo tồn và Du lịch quốc tế (IVL).",
      benefits: ["Visa điện tử (E-Visa), không dán tem vào hộ chiếu", "Cho phép nộp hồ sơ theo nhóm gia đình (Group) để xét duyệt đồng bộ", "Thường cấp visa ra vào nhiều lần (Multiple Entry)"],
      requirements: [
          { title: "Hồ sơ Scan màu (PDF < 10MB)", items: ["Hộ chiếu gốc (Còn hạn trên 6 tháng)", "File ảnh thẻ 3.5x4.5 nền trắng", "Sổ hộ khẩu, Giấy khai sinh, ĐKKH (Dịch thuật công chứng)"] },
          { title: "Chứng minh tài chính", items: ["Sao kê tài khoản ngân hàng 6 tháng (Bắt buộc)", "Sổ tiết kiệm và Xác nhận số dư", "Sổ đỏ, Đăng ký xe ô tô (Dịch thuật)"] },
          { title: "Công việc", items: ["Hợp đồng lao động, Đơn nghỉ phép (Dịch thuật)", "Nếu là chủ DN: ĐKKD và báo cáo thuế"] }
      ],
      faq: [
          { question: "Phí IVL là gì?", answer: "Đây là phí Bảo tồn và Du lịch quốc tế (International Visitor Conservation and Tourism Levy), bắt buộc phải đóng cùng lúc khi nộp hồ sơ visa. Mức phí hiện tại là 100 NZD." },
          { question: "Nộp theo nhóm có rẻ hơn không?", answer: "Phí visa vẫn tính theo đầu người, nhưng việc nộp theo nhóm (Group Application) giúp hồ sơ của cả gia đình được xét duyệt cùng lúc, tránh trường hợp người đậu người rớt." }
      ]
  },
  "nz-family": {
      id: "nz-family",
      parentId: "newzealand",
      title: "Visa Thăm Thân New Zealand",
      heroImage: "/images/services/nz-family.png",
      overview: "Dành cho cha mẹ, vợ/chồng hoặc người thân muốn sang New Zealand thăm con cái đang du học hoặc làm việc. Hồ sơ thăm thân New Zealand yêu cầu sự rõ ràng về mối quan hệ và khả năng tài chính của người bảo lãnh (Sponsor) tại New Zealand.",
      benefits: ["Tỷ lệ đậu cao nếu người bảo lãnh có công việc ổn định", "Thời gian lưu trú linh hoạt theo thư mời"],
      requirements: [
          { title: "Người bảo lãnh (Tại NZ)", items: ["Form bảo lãnh tài chính (Sponsorship Form INZ 1025) - Nếu chi trả", "Bản sao Hộ chiếu/Visa/Thẻ cư trú", "Bằng chứng về chỗ ở và thu nhập tại NZ"] },
          { title: "Người đương đơn (Tại VN)", items: ["Chứng minh mối quan hệ (Giấy khai sinh/ĐKKH - Dịch thuật)", "Bằng chứng liên lạc (Ảnh chụp chung, tin nhắn)"] }
      ],
      faq: []
  },

  // ================= JAPAN (UPDATED) =================
  "jp-tourist": {
      id: "jp-tourist",
      parentId: "japan",
      title: "Visa Du Lịch Nhật Bản (Tự Túc)",
      heroImage: "/images/services/jp-tourist.png",
      overview: "Visa du lịch Nhật Bản hiện nay đã thông thoáng hơn nhưng vẫn yêu cầu sự chỉn chu tuyệt đối về hình thức hồ sơ. Đặc biệt, Đại sứ quán Nhật Bản phân chia vùng nộp hồ sơ rất rõ ràng (Hà Nội & TP.HCM). Hồ sơ không cần phỏng vấn nhưng phải chứng minh được năng lực tài chính mạnh (Sổ tiết kiệm > 200 triệu) và công việc ổn định.",
      benefits: ["Không cần phỏng vấn (trừ trường hợp đặc biệt)", "Thời gian xét duyệt chuẩn (7-8 ngày làm việc)", "Visa có giá trị 3 tháng, lưu trú tối đa 15 ngày"],
      requirements: [
          { title: "Hồ sơ cá nhân & Hình thức", items: ["Hộ chiếu gốc (Ký tên trang 3)", "Tờ khai có mã QR (Khai máy, không viết tay)", "01 Ảnh 4.5x4.5cm nền trắng (Vuông, chụp < 3 tháng) - Rất quan trọng, sai khổ bị trả hồ sơ."] },
          { title: "Tài chính (Bắt buộc)", items: ["Sổ tiết kiệm bản gốc (Tối thiểu 200 triệu, kỳ hạn > 3 tháng)", "Xác nhận số dư song ngữ (Bản gốc ngân hàng)", "Sao kê lương 3 tháng (nếu có)"] },
          { title: "Công việc", items: ["Hợp đồng lao động (Sao y/Bản gốc đối chiếu)", "Đơn xin nghỉ phép (Bản gốc)"] }
      ],
      faq: [
          { question: "Tôi có hộ khẩu tỉnh nộp ở đâu?", answer: "Hộ khẩu từ Gia Lai, Bình Định trở ra Bắc nộp tại ĐSQ Hà Nội. Từ Đắk Lắk, Phú Yên trở vào Nam nộp tại LSQ TP.HCM. Nộp trái tuyến cần Sổ tạm trú (CT07) dài hạn." },
          { question: "Sổ tiết kiệm mới gửi có được không?", answer: "Được, nhưng kỳ hạn phải trên 3 tháng. Nhật Bản ưu tiên số dư lớn và ổn định." }
      ]
  },
  "jp-business": {
      id: "jp-business",
      parentId: "japan",
      title: "Visa Thương Mại Nhật Bản",
      heroImage: "/images/services/jp-business.png",
      overview: "Dành cho khách hàng sang Nhật công tác, dự hội thảo, đàm phán hợp đồng. Yếu tố quan trọng nhất của diện này là bộ hồ sơ gốc từ phía đối tác Nhật Bản gửi về (bao gồm Thư mời và Thư bảo lãnh).",
      benefits: ["Được phép tham gia các hoạt động thương mại hợp pháp", "Có thể xin visa nhiều lần (Multiple 5 năm) nếu đủ điều kiện"],
      requirements: [
          { title: "Hồ sơ phía Nhật Bản (Gửi bản gốc về)", items: ["Giấy lý do mời (Letter of Reason for Invitation) có dấu đỏ công ty", "Lịch trình lưu trú (Schedule of Stay)", "Sổ bộ đăng ký kinh doanh (Tokibo) - Bản gốc cấp trong 3 tháng"] },
          { title: "Hồ sơ phía Việt Nam", items: ["Quyết định cử đi công tác (Bản gốc)", "Hợp đồng lao động", "Sao kê tài khoản công ty (nếu công ty chi trả)"] }
      ],
      faq: [
          { question: "Có cần thư mời bản gốc không?", answer: "BẮT BUỘC. ĐSQ Nhật Bản yêu cầu thư mời và các giấy tờ phía Nhật phải là bản gốc có dấu đỏ, gửi chuyển phát nhanh về. Không chấp nhận bản Scan/Email (trừ trường hợp khẩn cấp đặc biệt)." }
      ]
  },
  "jp-evisa": {
      id: "jp-evisa",
      parentId: "japan",
      title: "E-Visa Nhật Bản (Du Lịch Đoàn)",
      heroImage: "/logo.png",
      overview: "Hiện tại, E-Visa (Thị thực điện tử) Nhật Bản chủ yếu áp dụng cho khách du lịch theo đoàn (Package Tour) thông qua các công ty du lịch được chỉ định. Khách nhận được thông báo cấp visa qua điện thoại để xuất trình tại sân bay.",
      benefits: ["Không dán tem vào hộ chiếu", "Thủ tục đơn giản hóa (do công ty du lịch bảo lãnh)"],
      requirements: [
          { title: "Điều kiện", items: ["Tham gia tour trọn gói của công ty du lịch chỉ định", "Hộ chiếu còn hạn > 6 tháng"] },
          { title: "Lưu ý nhập cảnh", items: ["Phải có điện thoại kết nối internet tại sân bay để hiển thị 'Visa Issuance Notice' trực tuyến (Không chấp nhận ảnh chụp màn hình/Bản in giấy)"] }
      ],
      faq: []
  },

  // ================= KOREA =================
  "kr-5year": {
      id: "kr-5year",
      parentId: "korea",
      title: "Visa Đại Đô Thị (5 Năm)",
      heroImage: "/images/services/kr-5year.png",
      overview: "Đây là loại visa 'Hot' nhất hiện nay. Dành riêng cho công dân có hộ khẩu thường trú (hoặc tạm trú dài hạn) tại 3 thành phố lớn: Hà Nội, Đà Nẵng, TP.HCM. Nếu bạn thuộc diện này, bạn được MIỄN CHỨNG MINH TÀI CHÍNH và được cấp visa 5 năm, nhập cảnh không giới hạn số lần.",
      benefits: ["Không cần sổ tiết kiệm", "Visa 5 năm Multiple Entry (Đi lúc nào cũng được)", "Thủ tục đơn giản nhất trong các loại visa Hàn"],
      requirements: [
          { title: "Điều kiện tiên quyết", items: ["Sổ hộ khẩu (Bản gốc hoặc VNeID mức 2) hoặc CT07 xác nhận cư trú > 1 năm tại HN/ĐN/HCM"] },
          { title: "Hồ sơ cá nhân", items: ["Hộ chiếu", "Ảnh 3.5x4.5", "CCCD công chứng"] },
          { title: "Hồ sơ công việc (Khuyến khích)", items: ["Hợp đồng lao động (Để tăng độ uy tín, dù không bắt buộc)"] }
      ],
      faq: [{ question: "Tôi có hộ khẩu tỉnh nhưng sống ở Hà Nội 10 năm rồi?", answer: "Được, nếu bạn có Sổ tạm trú (KT3) hoặc xin được giấy xác nhận cư trú CT07 thể hiện đã cư trú trên 1 năm. Nếu không có giấy này thì không làm được diện 5 năm." }]
  },

  // ================= CHINA =================
  "cn-tourist": {
      id: "cn-tourist",
      parentId: "china",
      title: "Visa Trung Quốc 3 Tháng 1 Lần",
      heroImage: "/images/services/cn-tourist.png",
      overview: "Hiện nay, Trung Quốc đã mở cửa hoàn toàn du lịch. Visa 3 tháng 1 lần (Single Entry) là loại phổ biến nhất cho khách du lịch tự túc. Khó khăn lớn nhất hiện nay là tờ khai COVA rất phức tạp (gần 20 trang thông tin) và lịch hẹn lăn tay tại trung tâm AVAS thường xuyên kín chỗ. Beetours cung cấp dịch vụ trọn gói bao gồm khai form chuẩn xác và đặt lịch lăn tay VIP, giúp bạn tiết kiệm thời gian xếp hàng.",
      benefits: ["Tỷ lệ đậu lên tới 99% (nếu hồ sơ sạch)", "Được hỗ trợ xếp lịch lăn tay sớm", "Không cần phỏng vấn (chỉ cần đến lăn tay)", "Có thể nâng cấp lên Visa 6 tháng nhiều lần nếu đã từng đi Trung Quốc"],
      requirements: [
          { title: "Quy chuẩn Ảnh thẻ (Rất khắt khe)", items: ["Kích thước 33mm x 48mm (Không phải 4x6)", "Nền trắng tinh, lộ rõ trán, tai, không đeo trang sức", "Áo tối màu (tránh màu trắng)"] },
          { title: "Hồ sơ nhân thân", items: ["Hộ chiếu gốc (còn hạn 6 tháng)", "Photo CCCD", "Nếu hộ khẩu mới cấp/ngoại tỉnh cần thêm CT07 (Xác nhận cư trú)"] },
          { title: "Tài chính & Công việc", items: ["Sổ tiết kiệm tối thiểu 50 triệu (Bản gốc + Photo)", "Xác nhận công việc hoặc Hợp đồng lao động (Photo)"] }
      ],
      faq: [
          { question: "Tôi có bắt buộc phải đi lăn tay không?", answer: "CÓ. Quy định mới bắt buộc mọi đương đơn từ 14 đến 70 tuổi phải đến trung tâm để lấy dấu vân tay và chụp ảnh kỹ thuật số. Trừ khi bạn đã từng lăn tay xin visa TQ trên cùng cuốn hộ chiếu này trong vòng 5 năm qua." },
          { question: "Thời gian làm việc bao lâu?", answer: "Thông thường là 4-5 ngày làm việc sau khi lăn tay. Nếu cần gấp, Beetours có thể xử lý khẩn 2-3 ngày với chi phí phụ thu." }
      ]
  },
  "cn-business": {
      id: "cn-business",
      parentId: "china",
      title: "Visa Thương Mại Trung Quốc (M)",
      heroImage: "/images/services/cn-business.png",
      overview: "Dành cho khách hàng sang Trung Quốc công tác, làm việc với đối tác, tham dự hội chợ (Canton Fair...). Yếu tố quan trọng nhất của diện này là THƯ MỜI từ phía đối tác Trung Quốc. Thư mời phải tuân thủ đúng mẫu của Đại sứ quán, có dấu đỏ tròn (dấu bầu dục hoặc dấu sao thường bị từ chối) và chữ ký của người đại diện pháp luật.",
      benefits: ["Nhập cảnh làm việc hợp pháp", "Có thể xin loại 6 tháng/1 năm nhiều lần (Multiple) nếu lịch sử đi lại tốt", "Hỗ trợ xuất hóa đơn VAT cho doanh nghiệp"],
      requirements: [
          { title: "Hồ sơ pháp nhân (Phía VN & TQ)", items: ["Thư mời chuẩn mẫu (Scan màu rõ nét)", "Đăng ký kinh doanh phía Việt Nam (Sao y công chứng)", "Đăng ký kinh doanh phía Trung Quốc (Scan)"] },
          { title: "Quyết định cử đi công tác", items: ["Bản gốc tiếng Việt/Anh", "Ghi rõ thông tin nhân viên, thời gian đi, ai chi trả chi phí"] },
          { title: "Hồ sơ cá nhân", items: ["Hộ chiếu, Ảnh thẻ 33x48mm", "Hợp đồng lao động dài hạn"] }
      ],
      faq: [
          { question: "Tôi có thể dùng thư mời bản Scan không?", answer: "ĐƯỢC. Hiện tại ĐSQ chấp nhận thư mời bản scan màu rõ nét, không bắt buộc gửi bản gốc về (trừ trường hợp hồ sơ bị nghi ngờ)." },
          { question: "Làm sao để xin visa nhiều lần (Multiple)?", answer: "Để xin visa 6 tháng hoặc 1 năm nhiều lần, bạn cần chứng minh đã từng nhập cảnh Trung Quốc bằng visa M ít nhất 2-3 lần trong thời gian gần đây." }
      ]
  },

  // ================= HONG KONG =================
  "hk-tourist": {
      id: "hk-tourist",
      parentId: "hongkong",
      title: "E-Visa Du Lịch Hong Kong",
      heroImage: "/images/services/hk-tourist.png",
      overview: "Hong Kong hiện tại áp dụng E-Visa (Thị thực điện tử) cho công dân Việt Nam, thay thế hoàn toàn cho việc nộp hồ sơ giấy dán tem trước đây. Tuy nhiên, Hong Kong là một trong những nơi xét duyệt hồ sơ khó tính nhất Châu Á. Sở Di trú (ImmD) yêu cầu hồ sơ tài chính và công việc cực kỳ rõ ràng. Thời gian xét duyệt cũng khá lâu (thường từ 4-6 tuần), vì vậy bạn cần lên kế hoạch sớm.",
      benefits: ["Nộp online 100%, không giữ hộ chiếu gốc", "Nhận kết quả qua Email (File PDF)", "Không cần phỏng vấn (trừ trường hợp đặc biệt)"],
      requirements: [
          { title: "Hồ sơ cá nhân", items: ["File ảnh thẻ 4x6 nền trắng (Chụp không quá 6 tháng, không đeo kính)", "Scan Hộ chiếu (Tất cả các trang có thông tin/dấu mộc)"] },
          { title: "Công việc (Quan trọng)", items: ["Hợp đồng lao động / Giấy phép kinh doanh", "Đơn xin nghỉ phép đi du lịch", "Sao kê lương 3 tháng gần nhất"] },
          { title: "Tài chính", items: ["Sổ tiết kiệm tối thiểu 50-100 triệu (Scan màu)", "Sao kê tài khoản ngân hàng thể hiện số dư (song ngữ)"] }
      ],
      faq: [
          { question: "Xin visa Hong Kong mất bao lâu?", answer: "Trung bình từ 4 đến 6 tuần làm việc. Sở Di trú Hong Kong xét duyệt rất kỹ và không có dịch vụ làm khẩn chính thống." },
          { question: "Phí visa Hong Kong tính thế nào?", answer: "Phí chính phủ (230 HKD) chỉ phải đóng KHI ĐẬU visa. Tuy nhiên, phí dịch vụ xử lý hồ sơ của Beetours sẽ thu trước để thực hiện các công việc: dịch thuật, khai form, theo dõi và giải trình." },
          { question: "Tôi làm nghề tự do (Freelancer) có xin được không?", answer: "Khá khó. Bạn cần chứng minh nguồn thu nhập đều đặn qua sao kê ngân hàng và viết thư giải trình chi tiết về công việc. Beetours có kinh nghiệm hỗ trợ các trường hợp này." }
      ]
  },
  "hk-business": {
      id: "hk-business",
      parentId: "hongkong",
      title: "Visa Công Tác Hong Kong",
      heroImage: "/images/services/hk-business.png",
      overview: "Dành cho khách hàng có nhu cầu sang Hong Kong làm việc với đối tác, tham dự hội chợ (như Hội chợ Quà tặng, Điện tử...). Điểm mấu chốt của hồ sơ công tác là Thư mời từ phía Hong Kong và mối quan hệ thương mại giữa hai công ty.",
      benefits: ["Được phép tham gia các hoạt động thương mại hợp pháp", "Thời gian lưu trú thường là 7 ngày hoặc 14 ngày", "Hỗ trợ xuất hóa đơn VAT dịch vụ"],
      requirements: [
          { title: "Hồ sơ pháp nhân", items: ["Thư mời từ công ty Hong Kong (Scan màu, ký đóng dấu)", "Đăng ký kinh doanh phía Việt Nam", "Quyết định cử đi công tác"] },
          { title: "Chứng minh quan hệ", items: ["Hợp đồng mua bán, Invoice, Email giao dịch giữa 2 bên", "Danh thiếp (Name card) của đương đơn"] }
      ],
      faq: [
          { question: "Có cần thư mời bản gốc không?", answer: "Hiện tại nộp E-visa nên chỉ cần bản Scan màu rõ nét." }
      ]
  },
  "hk-family": {
      id: "hk-family",
      parentId: "hongkong",
      title: "Visa Thăm Thân Hong Kong",
      heroImage: "/images/services/hk-family.png",
      overview: "Dành cho người muốn sang thăm vợ/chồng, con cái đang làm việc hoặc học tập tại Hong Kong. Người bảo lãnh tại Hong Kong cần có Visa làm việc (Employment Visa) hoặc Thẻ cư trú dài hạn.",
      benefits: ["Tỷ lệ đậu cao nếu người bảo lãnh uy tín", "Thời gian lưu trú linh hoạt"],
      requirements: [
          { title: "Người bảo lãnh (Tại HK)", items: ["Mặt hộ chiếu + Visa/Thẻ cư trú Hong Kong", "Hợp đồng thuê nhà / Giấy tờ nhà", "Xác nhận công việc và mức lương tại HK"] },
          { title: "Chứng minh mối quan hệ", items: ["Giấy khai sinh / Đăng ký kết hôn", "Ảnh chụp chung, tin nhắn qua lại"] }
      ],
      faq: []
  },

  // ================= TAIWAN =================
  "tw-tac": {
      id: "tw-tac",
      parentId: "taiwan",
      title: "Miễn Thị Thực Đài Loan (TAC)",
      heroImage: "/images/services/tw-tac.png",
      overview: "Đây là loại hình visa hấp dẫn nhất (Travel Authorization Certificate - TAC). Công dân Việt Nam được miễn thị thực (cấp phép online miễn phí) nếu sở hữu visa còn hạn hoặc hết hạn trong vòng 10 năm của các nước tiên tiến: Mỹ, Canada, Anh, Nhật Bản, Hàn Quốc, Úc, New Zealand và khối Schengen. Thủ tục cực nhanh, có kết quả ngay lập tức.",
      benefits: ["Miễn phí hoàn toàn lệ phí chính phủ", "Nhập cảnh nhiều lần (Multiple Entry) trong 90 ngày", "Mỗi lần lưu trú 14 ngày", "Không cần chứng minh tài chính hay công việc"],
      requirements: [
          { title: "Điều kiện tiên quyết", items: ["Hộ chiếu còn hạn 6 tháng", "Có visa/thẻ cư trú của các nước: Mỹ, Canada, Anh, Nhật, Hàn, Úc, NZ, Schengen (Chưa từng đi lao động phổ thông tại Đài Loan)"] },
          { title: "Thông tin cần khai", items: ["Số thẻ visa/thẻ cư trú nước tiên tiến", "Ngày nhập cảnh dự kiến", "Tên khách sạn tại Đài Loan"] }
      ],
      faq: [
          { question: "Tôi có visa Nhật nhưng là visa dán (Sticker) chưa đi lần nào có được không?", answer: "Được. Quy định mới chấp nhận cả visa chưa sử dụng (trừ visa điện tử của Úc/NZ bắt buộc phải còn hạn)." },
          { question: "Điền sai thông tin TAC có sửa được không?", answer: "Không. Nếu điền sai (đặc biệt là Số thẻ Visa), bạn phải khai lại từ đầu. Nếu sai mà vẫn mang ra sân bay sẽ bị từ chối xuất cảnh." }
      ]
  },
  "tw-sticker": {
      id: "tw-sticker",
      parentId: "taiwan",
      title: "Visa Du Lịch Đài Loan (Visa Dán)",
      heroImage: "/images/services/tw-sticker.png",
      overview: "Dành cho khách hàng KHÔNG đủ điều kiện làm miễn thị thực (TAC). Hồ sơ xin visa dán Đài Loan hiện nay khá khó, đặc biệt là yêu cầu về Bảo hiểm xã hội và Bảo hiểm y tế để tránh tình trạng lao động bất hợp pháp. Bạn cần nộp hồ sơ trực tiếp tại Văn phòng Kinh tế Văn hóa Đài Bắc (TECO).",
      benefits: ["Thời hạn visa 3 tháng, lưu trú 14 ngày", "Được dán tem visa vào hộ chiếu", "Là cơ sở để sau này xin TAC dễ dàng hơn"],
      requirements: [
          { title: "Hồ sơ công việc (Bắt buộc)", items: ["Hợp đồng lao động (Bản gốc + Photo)", "Đơn xin nghỉ phép (Gốc)", "Sổ Bảo hiểm xã hội hoặc Thẻ BHYT và Mở App VssID để đối chiếu (Rất quan trọng)"] },
          { title: "Hồ sơ tài chính", items: ["Sổ tiết kiệm bản gốc (Tối thiểu 50-100 triệu)", "Xác nhận số dư ngân hàng"] },
          { title: "Lịch trình", items: ["Vé máy bay khứ hồi (Booking)", "Đặt phòng khách sạn", "Lịch trình chi tiết từng ngày"] }
      ],
      faq: [
          { question: "Tôi làm tự do (Freelancer) không đóng BHXH có xin được không?", answer: "Rất khó. TECO thường yêu cầu BHXH để loại trừ lao động chui. Nếu không có, bạn cần viết thư giải trình cực kỳ thuyết phục và chứng minh tài sản lớn (nhà đất, ô tô). Tỷ lệ đậu thấp hơn." },
          { question: "Sổ tiết kiệm online có được không?", answer: "Không. TECO yêu cầu Sổ tiết kiệm bản gốc (sổ giấy) để soi tại quầy. Nếu dùng sổ online, phải ra ngân hàng xin xác nhận số dư có dấu đỏ." }
      ]
  },

  // ================= UAE / DUBAI =================
  "uae-tourist": {
      id: "uae-tourist",
      parentId: "uae",
      title: "E-Visa Du Lịch Dubai (30 Ngày)",
      heroImage: "/images/services/uae-tourist.png",
      overview: "Visa du lịch Dubai loại 30 ngày (Tourist Visa) là loại phổ biến nhất dành cho du khách Việt Nam. Đây là E-Visa (Thị thực điện tử), được cấp dưới dạng file PDF. Bạn chỉ cần in ra và kẹp cùng hộ chiếu khi nhập cảnh. Dubai không quá khắt khe về tài chính như Âu-Mỹ, nhưng yêu cầu sự rõ ràng về nhân thân để tránh lao động bất hợp pháp.",
      benefits: ["Thủ tục 100% Online, không giữ hộ chiếu gốc", "Không cần phỏng vấn", "Thời gian xét duyệt nhanh (thường 1-2 ngày)", "Bao đậu (với hồ sơ sạch)"],
      requirements: [
          { title: "Hồ sơ bắt buộc", items: ["Scan mặt hộ chiếu (Trang 2-3) rõ nét, không bị lóa đèn", "File ảnh thẻ 4x6 nền trắng (Mặt nhìn thẳng, không đeo kính)", "Vé máy bay khứ hồi (Booking)"] },
          { title: "Trẻ em đi cùng", items: ["Giấy khai sinh dịch thuật tiếng Anh", "Hộ chiếu của Bố/Mẹ đi cùng"] },
          { title: "Lưu ý quan trọng", items: ["Khách hàng sinh năm 1980 - 2000 chưa đi nước nào có thể bị yêu cầu đặt cọc chống trốn."] }
      ],
      faq: [
          { question: "Xin visa Dubai có cần chứng minh tài chính không?", answer: "Thông thường là KHÔNG. Tuy nhiên, với khách hàng trẻ, hộ chiếu trắng, Beetours có thể yêu cầu chứng minh công việc hoặc tài chính để đảm bảo hồ sơ được duyệt nhanh nhất." },
          { question: "Visa này có đi được Abu Dhabi không?", answer: "CÓ. Visa UAE cho phép bạn nhập cảnh vào tất cả 7 tiểu vương quốc: Dubai, Abu Dhabi, Sharjah, Ajman, v.v." }
      ]
  },
  "uae-transit": {
      id: "uae-transit",
      parentId: "uae",
      title: "Visa Quá Cảnh Dubai (48h / 96h)",
      heroImage: "/images/services/uae-transit.png",
      overview: "Nếu bạn bay của hãng Emirates hoặc Etihad và có thời gian quá cảnh (layover) tại Dubai hoặc Abu Dhabi trên 8 tiếng, bạn có thể xin visa quá cảnh để ra ngoài tham quan thành phố trong thời gian ngắn. Có 2 loại: 48 giờ (miễn phí phí chính phủ, chỉ tốn phí dịch vụ) và 96 giờ.",
      benefits: ["Tiết kiệm chi phí", "Tận dụng thời gian chờ để du lịch", "Thủ tục nhanh gọn theo vé máy bay"],
      requirements: [
          { title: "Điều kiện tiên quyết", items: ["Vé máy bay của hãng Emirates hoặc Etihad (đã xuất vé)", "Thời gian quá cảnh phù hợp (tối thiểu 8 tiếng)"] },
          { title: "Hồ sơ", items: ["Hộ chiếu còn hạn 6 tháng", "Ảnh thẻ 4x6", "Vé máy bay chặng tiếp theo đi nước thứ 3"] }
      ],
      faq: [
          { question: "Bay hãng khác (như Qatar, Vietnam Airlines) có xin được không?", answer: "Khó hơn. Visa Transit ưu tiên cho các hãng hàng không quốc gia UAE. Nếu bay hãng khác, bạn nên xin E-Visa du lịch thông thường (loại 30 ngày) để chủ động." }
      ]
  },
  "uae-60days": {
      id: "uae-60days",
      parentId: "uae",
      title: "Visa Dubai 2 Tháng (60 Ngày)",
      heroImage: "/images/services/uae-60days.png",
      overview: "Dành cho những du khách muốn khám phá sâu hơn về UAE, thăm thân nhân đang làm việc tại Dubai hoặc đi công tác dài hạn. Loại visa này cho phép lưu trú liên tục lên đến 60 ngày.",
      benefits: ["Thời gian lưu trú dài gấp đôi visa thường", "Thích hợp thăm thân, tìm hiểu thị trường"],
      requirements: [
          { title: "Hồ sơ cơ bản", items: ["Scan Hộ chiếu", "Ảnh thẻ", "CCCD"] },
          { title: "Bổ sung (Tùy trường hợp)", items: ["Thông tin người thân tại Dubai (nếu thăm thân)", "Lịch trình dự kiến"] }
      ],
      faq: []
  },

  // ================= RUSSIA =================
  "ru-evisa": {
      id: "ru-evisa",
      parentId: "russia",
      title: "Unified E-Visa Nga (16 Ngày)",
      heroImage: "/images/services/ru-evisa.png",
      overview: "Unified E-Visa (Thị thực điện tử thống nhất) là bước tiến lớn của Nga, cho phép công dân Việt Nam nhập cảnh du lịch, công tác, thăm thân ngắn hạn mà không cần thư mời gốc phức tạp. Visa có giá trị 60 ngày kể từ ngày cấp, cho phép lưu trú tối đa 16 ngày kể từ ngày nhập cảnh.",
      benefits: ["Thủ tục 100% Online", "Không cần thư mời gốc (Tourist Voucher)", "Thời gian xét duyệt nhanh (4 ngày)", "Chi phí tiết kiệm hơn visa dán"],
      requirements: [
          { title: "Hồ sơ đơn giản", items: ["Scan mặt hộ chiếu (Trang 2-3) còn hạn trên 6 tháng", "File ảnh thẻ kỹ thuật số (3.5x4.5cm, nền trắng, mặt chiếm 70%)"] },
          { title: "Thông tin khai báo", items: ["Ngày dự kiến nhập cảnh/xuất cảnh", "Khách sạn dự kiến ở", "Nghề nghiệp và chức vụ hiện tại"] }
      ],
      faq: [
          { question: "E-Visa Nga có gia hạn được không?", answer: "Không. Bạn bắt buộc phải xuất cảnh trước hoặc đúng ngày thứ 16 (tính cả ngày nhập cảnh). Quá hạn sẽ bị phạt rất nặng và cấm nhập cảnh." },
          { question: "16 ngày tính như thế nào?", answer: "Nga tính ngày theo lịch, không phải 24h. Ví dụ nhập cảnh 23:55 ngày 1/1 thì 00:00 ngày 2/1 đã là ngày thứ 2. Bạn nên cẩn trọng khi đặt vé máy bay." }
      ]
  },
  "ru-sticker": {
      id: "ru-sticker",
      parentId: "russia",
      title: "Visa Du Lịch Nga (Dán Sticker)",
      heroImage: "/images/services/ru-sticker.png",
      overview: "Dành cho du khách muốn lưu trú tại Nga lâu hơn 16 ngày (thường là gói 30 ngày hoặc 90 ngày). Loại visa này được dán trực tiếp vào hộ chiếu và yêu cầu bộ hồ sơ giấy đầy đủ nộp tại Đại sứ quán/Lãnh sự quán.",
      benefits: ["Thời gian lưu trú dài hơn (tùy theo thư mời)", "Được dán tem visa kỷ niệm vào hộ chiếu", "Phù hợp đi xuyên Việt-Nga hoặc tàu hỏa xuyên Siberia"],
      requirements: [
          { title: "Hồ sơ bắt buộc", items: ["Hộ chiếu gốc (Còn hạn 6 tháng, 2 trang trống)", "Tờ khai xin visa (Khai online, in ra, dán ảnh)", "01 Ảnh 3.5x4.5cm nền trắng quốc tế"] },
          { title: "Thư mời (Quan trọng nhất)", items: ["Tourist Voucher (Bản gốc hoặc Scan màu tùy LSQ) từ công ty lữ hành Nga", "Thư xác nhận của công ty du lịch Nga"] },
          { title: "Bảo hiểm", items: ["Bảo hiểm du lịch quốc tế có giá trị tại Nga"] }
      ],
      faq: [
          { question: "Tôi có cần đăng ký tạm trú khi sang Nga không?", answer: "CÓ. Trong vòng 7 ngày làm việc sau khi đến nơi, bạn phải làm thủ tục Registration (Khai báo tạm trú). Thường khách sạn sẽ làm giúp bạn. Giữ tờ giấy này cẩn thận để xuất trình khi về." }
      ]
  },
  "ru-business": {
      id: "ru-business",
      parentId: "russia",
      title: "Visa Thương Mại Nga",
      heroImage: "/images/services/ru-business.png",
      overview: "Dành cho doanh nhân sang Nga làm việc, ký kết hợp đồng. Visa thương mại có thể cấp thời hạn 3 tháng (1 hoặc 2 lần) hoặc 1 năm (nhiều lần). Yếu tố quyết định là Thư mời từ phía Nga (thường là từ Bộ Nội vụ hoặc công ty đối tác).",
      benefits: ["Nhập cảnh làm việc hợp pháp", "Thời gian lưu trú linh hoạt", "Có thể xin visa 1 năm nhiều lần"],
      requirements: [
          { title: "Thư mời (Invitation)", items: ["Thư mời điện tử (của Bộ Nội vụ Nga - FMS) HOẶC Thư mời gốc của công ty Nga (trên giấy tiêu đề)"] },
          { title: "Pháp nhân Việt Nam", items: ["Quyết định cử đi công tác", "Hợp đồng lao động"] },
          { title: "Lưu ý", items: ["Xét nghiệm HIV (nếu xin visa > 3 tháng)"] }
      ],
      faq: []
  },

  // ================= SOUTH AFRICA =================
  "za-tourist": {
      id: "za-tourist",
      parentId: "southafrica",
      title: "Visa Du Lịch Nam Phi",
      heroImage: "/images/services/za-tourist.png",
      overview: "Nam Phi là điểm đến hấp dẫn với thiên nhiên hoang dã và các thành phố hiện đại. Visa du lịch Nam Phi (Visitor's Visa Section 11) được cấp dưới dạng dán vào hộ chiếu. Quá trình xét duyệt yêu cầu hồ sơ tài chính minh bạch và tuân thủ nghiêm ngặt các quy định về hình thức (màu mực, khổ giấy).",
      benefits: ["Thời hạn visa 3 tháng", "Nhập cảnh 1 lần (Single) hoặc nhiều lần (nếu giải trình tốt)", "Cơ hội trải nghiệm Safari đẳng cấp thế giới"],
      requirements: [
          { title: "Quy tắc 'Bất di bất dịch'", items: ["Tờ khai DHA-84 phải viết bằng MỰC ĐEN và CHỮ IN HOA", "Trẻ em đi cùng phải có Giấy khai sinh dịch thuật & Giấy đồng ý của bố mẹ (nếu không đi cùng cả 2)"] },
          { title: "Hồ sơ nhân thân", items: ["Hộ chiếu gốc (Còn hạn ít nhất 30 ngày sau ngày về)", "2 ảnh 3x4cm nền trắng (Khác khổ 4x6 thường)", "Sổ hộ khẩu, Giấy kết hôn (Dịch thuật)"] },
          { title: "Tài chính & Công việc", items: ["Sao kê tài khoản ngân hàng 3 tháng gần nhất (Bắt buộc, bản gốc)", "Sổ tiết kiệm (Bổ trợ)", "Hợp đồng lao động, Đơn nghỉ phép"] },
          { title: "Y tế", items: ["Giấy chứng nhận tiêm chủng Sốt vàng da (Yellow Fever) nếu bay quá cảnh qua vùng dịch (Châu Phi/Nam Mỹ)"] }
      ],
      faq: [
          { question: "Tôi nộp hồ sơ ở đâu?", answer: "Đại sứ quán Nam Phi tại Hà Nội hoặc Lãnh sự quán danh dự tại TP.HCM. Nếu ở tỉnh xa, Beetours có thể hỗ trợ nộp thay (tùy thời điểm chính sách)." },
          { question: "Có cần phỏng vấn không?", answer: "Thường là KHÔNG. Tuy nhiên ĐSQ có thể yêu cầu phỏng vấn nếu hồ sơ nghi vấn." }
      ]
  },
  "za-business": {
      id: "za-business",
      parentId: "southafrica",
      title: "Visa Công Tác Nam Phi",
      heroImage: "/images/services/za-business.png",
      overview: "Dành cho doanh nhân sang Nam Phi tham dự hội nghị, gặp gỡ đối tác, khảo sát thị trường. Điểm quan trọng nhất là Thư mời từ phía Nam Phi phải chuẩn xác.",
      benefits: ["Nhập cảnh đúng mục đích thương mại", "Thời gian lưu trú phù hợp lịch công tác"],
      requirements: [
          { title: "Hồ sơ pháp nhân", items: ["Thư mời từ công ty Nam Phi (Ghi rõ số hộ chiếu người được mời, mục đích, ai chi trả)", "Bản sao CMND/Hộ chiếu của người ký thư mời", "Đăng ký kinh doanh công ty Nam Phi (CIPC)"] },
          { title: "Phía Việt Nam", items: ["Quyết định cử đi công tác (Bản gốc)", "Hợp đồng lao động", "Sao kê tài khoản cá nhân (dù công ty chi trả vẫn nên nộp)"] }
      ],
      faq: []
  },
  "za-visit": {
      id: "za-visit",
      parentId: "southafrica",
      title: "Visa Thăm Thân Nam Phi",
      heroImage: "/images/services/za-visit.png",
      overview: "Thăm người thân, bạn bè đang sinh sống/làm việc tại Nam Phi.",
      benefits: ["Được bảo lãnh chỗ ở"],
      requirements: [
          { title: "Người mời (Tại Nam Phi)", items: ["Thư mời (Invitation Letter) có xác nhận của Cảnh sát Nam Phi (Police Station) hoặc Ủy viên tuyên thệ", "Bản sao Hộ chiếu/ID/Visa hợp pháp", "Chứng minh chỗ ở (Hóa đơn điện nước)"] },
          { title: "Chứng minh mối quan hệ", items: ["Giấy khai sinh, hình ảnh chụp chung"] }
      ],
      faq: []
  },

  // ================= INDIA =================
  "in-tourist": {
      id: "in-tourist",
      parentId: "india",
      title: "E-Visa Du Lịch Ấn Độ (1 Năm / 5 Năm)",
      heroImage: "/images/services/in-tourist.png",
      overview: "Ấn Độ áp dụng E-Visa (Thị thực điện tử) cho công dân Việt Nam với thủ tục cực kỳ đơn giản. Bạn không cần đến Đại sứ quán, không cần gửi hộ chiếu gốc. Có các loại: 30 ngày (nhập cảnh 2 lần), 1 năm và 5 năm (nhập cảnh nhiều lần). Đây là giải pháp tối ưu cho những ai yêu thích khám phá văn hóa và tâm linh Ấn Độ.",
      benefits: ["Nộp online 100%, nhận kết quả qua email (ETA)", "Phê duyệt nhanh trong 3-5 ngày làm việc", "Visa 1 năm/5 năm cho phép nhập cảnh nhiều lần (Multiple Entry), mỗi lần ở tối đa 90 ngày"],
      requirements: [
          { title: "Hồ sơ kỹ thuật số", items: ["Scan trang thông tin Hộ chiếu (Rõ nét, không mất góc, còn hạn 6 tháng)", "File ảnh thẻ mềm (Hình vuông tỷ lệ 1:1, nền trắng, rõ mặt)"] },
          { title: "Thông tin cá nhân", items: ["Họ tên cha/mẹ, vợ/chồng", "Đặc điểm nhận dạng trên cơ thể (Ví dụ: Nốt ruồi...)", "Tôn giáo, Nghề nghiệp"] }
      ],
      faq: [
          { question: "Ảnh thẻ 4x6 thường có được không?", answer: "Không. Hệ thống E-Visa Ấn Độ bắt buộc file ảnh hình vuông (tối thiểu 350x350 pixels). Nếu không có file gốc, bạn cần chụp lại đúng chuẩn." },
          { question: "Tôi có thể nhập cảnh bằng đường bộ không?", answer: "E-Visa Ấn Độ chỉ áp dụng cho việc NHẬP CẢNH tại các sân bay và cảng biển quy định (29 sân bay, 5 cảng biển). Bạn KHÔNG THỂ nhập cảnh lần đầu bằng đường bộ (ví dụ đi từ Nepal sang), nhưng có thể XUẤT CẢNH bằng đường bộ." }
      ]
  },
  "in-business": {
      id: "in-business",
      parentId: "india",
      title: "E-Visa Thương Mại Ấn Độ",
      heroImage: "/images/services/in-business.png",
      overview: "Dành cho doanh nhân sang Ấn Độ làm việc, dự hội chợ, gặp gỡ đối tác. Visa thương mại có thời hạn 1 năm, nhập cảnh nhiều lần (Multiple), mỗi lần lưu trú tối đa 180 ngày.",
      benefits: ["Thời gian lưu trú dài hơn visa du lịch (180 ngày/lần)", "Thủ tục online nhanh gọn"],
      requirements: [
          { title: "Hồ sơ cá nhân", items: ["Hộ chiếu + Ảnh thẻ vuông (như diện du lịch)"] },
          { title: "Hồ sơ công việc", items: ["Danh thiếp (Name card) tiếng Anh của đương đơn (Scan)", "Thư mời từ công ty Ấn Độ (Bản scan màu)"] }
      ],
      faq: []
  },

  // ================= EGYPT =================
  "eg-tourist": {
      id: "eg-tourist",
      parentId: "egypt",
      title: "Visa Du Lịch Ai Cập (Visa Dán)",
      heroImage: "/images/services/eg-tourist.png",
      overview: "Hiện tại, Visa dán (Sticker Visa) nộp tại Đại sứ quán là phương án an toàn nhất cho du khách Việt Nam muốn đến Ai Cập tự túc. Mặc dù có thông tin về E-visa hoặc Visa on Arrival, nhưng rủi ro bị từ chối khi check-in hoặc nhập cảnh khá cao nếu không đi theo tour đoàn lớn. Visa thường có thời hạn 3 tháng, lưu trú tối đa 30 ngày.",
      benefits: ["Đảm bảo khả năng nhập cảnh cao nhất", "Được hỗ trợ nộp thay (không cần trình diện nếu ủy quyền)", "Thời gian lưu trú linh hoạt theo lịch trình"],
      requirements: [
          { title: "Hồ sơ nhân thân", items: ["Hộ chiếu gốc (Còn hạn 6 tháng)", "02 ảnh 4x6 nền trắng", "Hộ khẩu/CT07 (Photo)"] },
          { title: "Chứng minh nghề nghiệp", items: ["Hợp đồng lao động", "Đơn xin nghỉ phép (Tiếng Anh/Song ngữ)"] },
          { title: "Tài chính & Chuyến đi", items: ["Sao kê tài khoản ngân hàng (Số dư > 60 triệu)", "Vé máy bay khứ hồi (Booking)", "Booking khách sạn"] }
      ],
      faq: [
          { question: "Tôi có thể xin E-visa Ai Cập không?", answer: "Về lý thuyết là có, nhưng hệ thống E-visa Ai Cập thường không ổn định với hộ chiếu Việt Nam và hay bị từ chối không lý do. Beetours khuyên bạn nên làm visa dán để an tâm nhất." },
          { question: "Khi nhập cảnh cần lưu ý gì?", answer: "Hải quan Ai Cập thường kiểm tra tiền mặt. Bạn nên mang theo tối thiểu 2000 USD (hoặc ngoại tệ tương đương) để chứng minh khả năng chi trả tại cửa khẩu." }
      ]
  },
  "eg-business": {
      id: "eg-business",
      parentId: "egypt",
      title: "Visa Công Tác Ai Cập",
      heroImage: "/images/services/eg-business.png",
      overview: "Dành cho doanh nhân sang Ai Cập làm việc với đối tác. Yêu cầu quan trọng nhất là Thư mời gốc hoặc bản Scan màu rõ nét từ đối tác Ai Cập.",
      benefits: ["Hỗ trợ xuất hóa đơn VAT", "Xử lý nhanh hồ sơ"],
      requirements: [
          { title: "Hồ sơ pháp nhân", items: ["Thư mời từ công ty Ai Cập (Ghi rõ mục đích, thời gian)", "Quyết định cử đi công tác phía Việt Nam"] },
          { title: "Cá nhân", items: ["Hộ chiếu, Ảnh thẻ, HĐLĐ"] }
      ],
      faq: []
  },
  "eg-visit": {
      id: "eg-visit",
      parentId: "egypt",
      title: "Visa Thăm Thân Ai Cập",
      heroImage: "/images/services/eg-visit.png",
      overview: "Thăm người thân đang sinh sống, học tập tại Ai Cập.",
      benefits: ["Tư vấn thư mời chuẩn", "Hỗ trợ dịch thuật"],
      requirements: [
          { title: "Người mời", items: ["Thư mời cá nhân", "Bản sao Hộ chiếu/Visa/Thẻ cư trú tại Ai Cập"] },
          { title: "Người được mời", items: ["Chứng minh mối quan hệ (Giấy khai sinh/ĐKKH)", "Chứng minh công việc & tài chính cá nhân"] }
      ],
      faq: []
  },

  // ================= OTHER SERVICES (FALLBACK) =================
  "uk-student": { id: "uk-student", parentId: "uk", title: "Visa Du Học Anh", heroImage: "", overview: "Hỗ trợ xin CAS và Visa du học Anh.", benefits: [], requirements: [], faq: [] },
  "uk-worker": { id: "uk-worker", parentId: "uk", title: "Visa Làm Việc Anh", heroImage: "", overview: "Skilled Worker Visa.", benefits: [], requirements: [], faq: [] },
  "usa-eb5": { id: "usa-eb5", parentId: "usa", title: "Định Cư Mỹ EB5", heroImage: "", overview: "Đầu tư định cư Mỹ.", benefits: [], requirements: [], faq: [] },
  "schengen-germany": { id: "schengen-germany", parentId: "schengen", title: "Visa Đức", heroImage: "", overview: "Visa công tác/du lịch Đức.", benefits: [], requirements: [], faq: [] },
  "schengen-italy": { id: "schengen-italy", parentId: "schengen", title: "Visa Ý", heroImage: "", overview: "Visa du lịch Ý.", benefits: [], requirements: [], faq: [] },
  "au-500": { id: "au-500", parentId: "australia", title: "Visa Du Học Úc", heroImage: "", overview: "Visa du học Úc.", benefits: [], requirements: [], faq: [] },
  "au-462": { id: "au-462", parentId: "australia", title: "Visa Lao Động Kỳ Nghỉ", heroImage: "", overview: "Work & Holiday Visa.", benefits: [], requirements: [], faq: [] },
  "kr-tourist": { id: "kr-tourist", parentId: "korea", title: "Visa Du Lịch Hàn", heroImage: "", overview: "Visa C-3-9.", benefits: [], requirements: [], faq: [] },
  "kr-business": { id: "kr-business", parentId: "korea", title: "Visa Công Tác Hàn", heroImage: "", overview: "Visa thương mại.", benefits: [], requirements: [], faq: [] },
};

// =========================================================================================
// 🔴 LOGIC TỰ ĐỘNG (KHÔNG CẦN CHỈNH SỬA)
// =========================================================================================

// Tự động tạo KB từ dữ liệu website nếu người dùng không cung cấp KB riêng
const AUTO_GENERATED_KB = Object.values(PAGES).map(p => 
    `- Dịch vụ ${p.name}: ${p.hero.description}. Các loại visa: ${p.services.map(s => s.title).join(", ")}. Quy trình: ${p.process.map(step => step.title).join(" -> ")}`
).join("\n") + "\n" + Object.values(SERVICE_DETAILS).map(s => 
    `- Chi tiết ${s.title}: ${s.overview}. Yêu cầu: ${s.requirements.map(r => r.items.join(", ")).join("; ")}`
).join("\n");

export const SYSTEM_INSTRUCTION = `
${CUSTOM_SYSTEM_PROMPT}

DỮ LIỆU KIẾN THỨC (KNOWLEDGE BASE):
${CUSTOM_KNOWLEDGE_BASE.trim() !== "" ? CUSTOM_KNOWLEDGE_BASE : AUTO_GENERATED_KB}
`;
