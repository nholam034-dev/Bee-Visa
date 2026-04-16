/**
 * SEO Routing Configuration
 * Maps country IDs → SEO-friendly Vietnamese slugs (không dấu)
 */

// Country ID → URL slug mapping
export const COUNTRY_SLUGS: Record<string, string> = {
  usa: "my",
  uk: "anh-quoc",
  schengen: "chau-au",
  australia: "uc",
  canada: "canada",
  newzealand: "new-zealand",
  japan: "nhat-ban",
  korea: "han-quoc",
  china: "trung-quoc",
  hongkong: "hong-kong",
  taiwan: "dai-loan",
  uae: "dubai",
  russia: "nga",
  southafrica: "nam-phi",
  india: "an-do",
  egypt: "ai-cap",
};

// Reverse: slug → country ID
export const SLUG_TO_COUNTRY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_SLUGS).map(([id, slug]) => [slug, id])
);

// Service detail ID → URL slug mapping
export const SERVICE_SLUGS: Record<string, string> = {
  "usa-b1b2": "b1-b2-du-lich-cong-tac",
  "usa-f1": "du-hoc-f1",
  "usa-renewal": "gia-han",
  "uk-tourist": "du-lich",
  "uk-family": "tham-than",
  "uk-business": "cong-tac",
  "schengen-france": "phap",
  "schengen-business": "cong-tac",
  "schengen-family": "tham-than",
  "au-600": "visa-600",
  "ca-visitor": "du-lich",
  "ca-super": "super-visa",
  "ca-student": "du-hoc",
  "nz-visitor": "du-lich",
  "nz-family": "tham-than",
  "jp-tourist": "du-lich",
  "jp-business": "cong-tac",
  "kr-tourist": "du-lich",
  "kr-5year": "5-nam",
  "kr-business": "cong-tac",
  "cn-tourist": "du-lich",
  "cn-business": "thuong-mai",
  "hk-tourist": "du-lich",
  "hk-business": "cong-tac",
  "hk-family": "tham-than",
  "tw-tac": "e-visa-tac",
  "tw-sticker": "visa-dan",
  "uae-tourist": "du-lich-30-ngay",
  "uae-60days": "60-ngay",
  "uae-transit": "transit",
  "ru-evisa": "e-visa",
  "ru-sticker": "visa-dan",
  "ru-business": "cong-tac",
  "za-tourist": "du-lich",
  "za-business": "cong-tac",
  "za-visit": "tham-than",
  "in-tourist": "du-lich",
  "in-business": "thuong-mai",
  "eg-tourist": "du-lich",
  "eg-business": "cong-tac",
  "eg-visit": "tham-than",
};

// Reverse: [countrySlug + serviceSlug] → service detail ID
export const SLUG_TO_SERVICE: Record<string, Record<string, string>> = {};
Object.entries(SERVICE_SLUGS).forEach(([detailId, serviceSlug]) => {
  const parentId = detailId.split("-")[0]; // e.g., "usa" from "usa-b1b2"
  // Map parent abbreviation to country slug
  const parentMap: Record<string, string> = {
    usa: "my", uk: "anh-quoc", schengen: "chau-au", au: "uc",
    ca: "canada", nz: "new-zealand", jp: "nhat-ban", kr: "han-quoc",
    cn: "trung-quoc", hk: "hong-kong", tw: "dai-loan", uae: "dubai",
    ru: "nga", za: "nam-phi", in: "an-do", eg: "ai-cap",
  };
  const countrySlug = parentMap[parentId];
  if (countrySlug) {
    if (!SLUG_TO_SERVICE[countrySlug]) SLUG_TO_SERVICE[countrySlug] = {};
    SLUG_TO_SERVICE[countrySlug][serviceSlug] = detailId;
  }
});

// Helper: get URL path for a country
export function getCountryPath(countryId: string): string {
  const slug = COUNTRY_SLUGS[countryId];
  return slug ? `/visa-${slug}` : "/";
}

// Helper: get URL path for a service detail
export function getServicePath(detailId: string, parentCountryId: string): string {
  const countrySlug = COUNTRY_SLUGS[parentCountryId];
  const serviceSlug = SERVICE_SLUGS[detailId];
  if (countrySlug && serviceSlug) {
    return `/visa-${countrySlug}/${serviceSlug}`;
  }
  return getCountryPath(parentCountryId);
}

// SEO meta data per page
export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
}

export function getPageSEO(path: string, pageName?: string): PageSEO {
  const base = "https://beevisa.vn";
  
  if (path === "/") {
    return {
      title: "Beetours Vietnam - Dịch vụ Visa Toàn Cầu | Anh, Mỹ, Úc, Châu Âu",
      description: "Dịch vụ làm visa chuyên nghiệp tại Việt Nam. Chuyên xử lý hồ sơ khó, hộ chiếu trắng, từng bị từ chối. Tỷ lệ đậu 99%. Cam kết hoàn phí nếu trượt. Hotline: 1900-0310",
      canonical: base + "/",
    };
  }
  
  if (path === "/quy-trinh") {
    return {
      title: "Quy Trình Xin Visa 4 Bước | Beetours Vietnam",
      description: "Quy trình xin visa chuyên nghiệp 4 bước: Tư vấn → Xử lý hồ sơ → Nộp & Sinh trắc → Nhận kết quả. Minh bạch, nhanh chóng, an tâm tuyệt đối.",
      canonical: base + "/quy-trinh",
    };
  }
  
  if (path === "/lien-he") {
    return {
      title: "Liên Hệ Beetours Vietnam | Hotline 1900-0310",
      description: "Liên hệ Beetours Vietnam - Dịch vụ Visa Toàn Cầu. Văn phòng: 21/27 Đại Cồ Việt, Hà Nội. Hotline: 1900-0310. Email: info@beetours.com",
      canonical: base + "/lien-he",
    };
  }
  
  // Country pages
  if (pageName) {
    return {
      title: `Dịch Vụ Visa ${pageName} Trọn Gói | Beetours Vietnam`,
      description: `Dịch vụ làm visa ${pageName} chuyên nghiệp. Tỷ lệ đậu cao, xử lý hồ sơ khó, cam kết hoàn phí nếu trượt. Hotline: 1900-0310`,
      canonical: base + path,
    };
  }
  
  return {
    title: "Beetours Vietnam - Dịch vụ Visa Toàn Cầu",
    description: "Dịch vụ làm visa chuyên nghiệp. Tỷ lệ đậu 99%. Hotline: 1900-0310",
    canonical: base + path,
  };
}
