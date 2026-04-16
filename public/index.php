
<?php
// Đây là file Entry Point của PHP Hosting
// Xử lý Dynamic Meta Tags cho Facebook Ads/Share

header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");

// Kiểm tra file giao diện React đã build
if (file_exists('index.html')) {
    $html = file_get_contents('index.html');
    
    // Nếu đang truy cập trang Landing Page (dành cho Quảng cáo)
    if (isset($_GET['page']) && $_GET['page'] === 'landing') {
        // 1. Thay đổi Tiêu đề Trang (Title)
        $newTitle = 'Ưu Đãi Visa Trọn Gói - Giảm Ngay 500K - Beetours Vietnam';
        $html = preg_replace('/<title>(.*?)<\/title>/', "<title>$newTitle</title>", $html);
        
        // 2. Thêm Meta Tags cho Facebook (Open Graph)
        // Lưu ý: Thay đường dẫn ảnh content="..." bằng ảnh banner quảng cáo thực tế của bạn
        $metaTags = '
        <meta name="description" content="Chuyên xử lý hồ sơ khó, hộ chiếu trắng. Cam kết tỷ lệ đậu 99%. Đăng ký nhận ưu đãi giảm giá ngay hôm nay!">
        <meta property="og:title" content="Ưu Đãi Visa - Đậu Visa Mới Thu Phí Dịch Vụ">
        <meta property="og:description" content="Hỗ trợ trọn gói A-Z. Xử lý hồ sơ khẩn. Tư vấn miễn phí 24/7.">
        <meta property="og:image" content="https://beevisa.vn/assets/ads-banner.jpg">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://beevisa.vn/?page=landing">
        ';
        
        $html = str_replace('</head>', $metaTags . '</head>', $html);
    }

    echo $html;
} else {
    echo "Lỗi: Chưa tìm thấy file giao diện. Vui lòng chạy lệnh 'npm run build' và upload toàn bộ thư mục 'dist' lên hosting.";
}
?>
