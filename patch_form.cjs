const fs = require('fs');

let modalCode = fs.readFileSync('components/ConsultationModal.tsx', 'utf8');

// The ConsultationModal modification:
// Enhance the data state: added visaRefusal
if (!modalCode.includes('visaRefusal: "none"')) {
    modalCode = modalCode.replace(
        'jobType: "",',
        'jobType: "",\n        visaRefusal: "none",\n        contactTime: "any",'
    );

    // Increase total steps
    modalCode = modalCode.replace('const totalSteps = 7;', 'const totalSteps = 8;');

    const newScoreLogic = `
        let score = 50; 
        let advice = [];
        const difficultCountries = ['usa', 'uk', 'canada', 'australia', 'newzealand', 'schengen'];
        const isDifficult = difficultCountries.includes(data.destination);

        if (data.jobType === 'business_owner' || data.jobType === 'state_official') score += 20;
        else if (data.jobType === 'freelancer') {
            score -= 10;
            advice.push("Công việc tự do cần chuẩn bị kỹ bằng chứng thu nhập/hình ảnh làm việc để giải trình mục đích (GTE).");
        }

        if (data.socialInsurance === 'yes') score += 15;
        else if (['employee', 'state_official'].includes(data.jobType) && data.socialInsurance === 'no') {
             if (isDifficult) {
                score -= 15;
                advice.push("Thiếu BHXH/VssID là điểm tử huyệt lớn. Cần thư giải trình từ công ty hoặc chứng minh thu nhập thụ động mạnh.");
             }
        }

        if (data.travelHistory === 'advanced') score += 30;
        else if (data.travelHistory === 'none') {
            if (isDifficult) {
                score -= 25;
                advice.push("Hộ chiếu trắng rất dễ trượt. Chúng tôi có chiến lược làm đẹp hồ sơ (ví dụ nộp Nhật/Hàn trước).");
            }
        }

        // Refusal history check - Crucial for Five Eyes
        if (data.visaRefusal !== 'none') {
             if (data.visaRefusal === 'five_eyes') {
                 score -= 30;
                 advice.push("Trượt Visa khối Five Eyes (Mỹ/Úc/Anh/Canada/NZ) sẽ lưu vết chia sẻ dữ liệu. BẮT BUỘC phải đọc thư rớt/GCMS notes nội bộ trước khi nộp lại.");
             } else {
                 score -= 15;
             }
        }

        if (data.ageGroup === '18-30' && data.maritalStatus === 'single') {
            if (isDifficult) score -= 10;
        }

        if (score > 99) score = 99;
        if (score < 10) score = 10;

        return { score, advice };
    `;

    // Replace calculateScore
    modalCode = modalCode.replace(/let score = 50;[\s\S]*?return \{ score, advice \};/m, newScoreLogic);

    // Add Step 6 (history refusal) and shift step 6/7 to 7/8
    modalCode = modalCode.replace(/\{step === 6 && \(/g, '{step === 7 && (');
    modalCode = modalCode.replace(/\{step === 7 && \(/g, '{step === 8 && (');

    const newStep6 = `
                {step === 6 && (
                    <div className="space-y-6 animate-[fadeIn_0.3s]">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Bạn đã từng bị trượt Visa nước nào chưa?</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button onClick={() => handleSelect('visaRefusal', 'none')} className={\`p-3 rounded-lg border text-left text-sm transition-all \${data.visaRefusal === 'none' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}\`}>
                                    <span className="font-bold block">Chưa từng trượt (Hồ sơ sạch)</span>
                                </button>
                                <button onClick={() => handleSelect('visaRefusal', 'asian')} className={\`p-3 rounded-lg border text-left text-sm transition-all \${data.visaRefusal === 'asian' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}\`}>
                                    <span className="font-bold block">Từng trượt / Bị từ chối ở Châu Á</span>
                                    <span className="text-xs opacity-80">(Ví dụ: Hàn, Nhật, Đài Loan...)</span>
                                </button>
                                <button onClick={() => handleSelect('visaRefusal', 'five_eyes')} className={\`p-3 rounded-lg border text-left text-sm transition-all \${data.visaRefusal === 'five_eyes' ? 'bg-red-50 border-red-400 shadow-sm text-red-700' : 'bg-white border-gray-200 hover:border-secondary'}\`}>
                                    <span className="font-bold block text-red-600">⚠ Từng trượt / Bị hủy ở nước phát triển</span>
                                    <span className="text-xs opacity-80">(Mỹ, Úc, Anh, Canada, Schengen...)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
    `;

    modalCode = modalCode.replace('{step === 7 && (', `${newStep6}\n\n                {step === 7 && (`);

    // Update titles enum if it exists
    modalCode = modalCode.replace(`const getStepTitle = (s: number) => ['Điểm đến', 'Cá nhân', 'Công việc', 'Tài chính', 'Du lịch', 'Liên hệ', 'Xác nhận'][s - 1];`, 
                                  `const getStepTitle = (s: number) => ['Điểm đến', 'Cá nhân', 'Công việc', 'Tài chính', 'Du lịch', 'Lịch sử Rớt', 'Liên hệ', 'Xác nhận'][s - 1];`);

    fs.writeFileSync('components/ConsultationModal.tsx', modalCode);
    console.log('ConsultationModal patched with Visa Risk fields!');
} else {
    console.log('ConsultationModal already patched!');
}
