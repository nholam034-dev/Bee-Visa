
import React, { useState, useEffect } from "react";
import { useData } from "../contexts/DataContext";
import { ChatInterface } from "./ChatInterface";
import { COUNTRIES_SUMMARY } from "../constants";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string; // e.g. "Mỹ (USA)"
  initialTab?: 'chat' | 'form' | 'assessment';
}

// --- SUB-COMPONENT: PROFILE ASSESSMENT WIZARD ---
const ProfileAssessment = ({ onFinish, onBack }: { onFinish: (result: any) => void, onBack: () => void }) => {
    // ... [Logic remains same]
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        destination: "",
        ageGroup: "",
        maritalStatus: "",
        jobType: "",
        socialInsurance: "", // VssID
        finance: "",
        travelHistory: "",
        name: "",
        phone: ""
    });

    const totalSteps = 7; 

    // Helper to get labels for summary
    const getCountryName = (id: string) => COUNTRIES_SUMMARY.find(c => c.id === id)?.name || id;
    const getMaritalLabel = (val: string) => val === 'single' ? 'Độc thân' : val === 'married' ? 'Đã kết hôn' : 'Ly hôn';
    const getJobLabel = (val: string) => {
        const map: Record<string, string> = {
            'employee': 'Nhân viên văn phòng',
            'business_owner': 'Chủ doanh nghiệp',
            'state_official': 'Viên chức nhà nước',
            'freelancer': 'Tự do / Freelancer',
            'retired': 'Hưu trí / HS-SV'
        };
        return map[val] || val;
    };
    const getFinanceLabel = (val: string) => val === 'strong' ? 'Mạnh (>200tr + TS)' : val === 'medium' ? 'Trung bình (Sổ TK)' : 'Yếu (Ít/Không có)';
    const getHistoryLabel = (val: string) => val === 'advanced' ? 'Đã đi nước tiên tiến' : val === 'basic' ? 'Đã đi ĐNA/Trung Quốc' : 'Hộ chiếu trắng';

    const handleSelect = (field: string, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
        if (['destination', 'finance', 'travelHistory'].includes(field)) {
            setTimeout(() => setStep(prev => prev + 1), 250);
        }
    };

    const calculateScore = () => {
        let score = 50; 
        let advice = [];
        const difficultCountries = ['usa', 'uk', 'canada', 'australia', 'newzealand', 'schengen'];
        const isDifficult = difficultCountries.includes(data.destination);

        if (data.jobType === 'business_owner' || data.jobType === 'state_official') score += 20;
        else if (data.jobType === 'freelancer') {
            score -= 10;
            advice.push("Công việc tự do cần chuẩn bị kỹ bằng chứng thu nhập/hình ảnh làm việc.");
        }

        if (data.socialInsurance === 'yes') score += 15;
        else if (['employee', 'state_official'].includes(data.jobType) && data.socialInsurance === 'no') {
             if (isDifficult) {
                score -= 15;
                advice.push("Thiếu BHXH/VssID là điểm yếu lớn với các nước phát triển. Cần giải trình kỹ.");
             }
        }

        if (data.travelHistory === 'advanced') score += 30;
        else if (data.travelHistory === 'none') {
            if (isDifficult) {
                score -= 25;
                advice.push("Hộ chiếu trắng rất khó xin visa nước lớn. Nên đi du lịch các nước Châu Á (Thái, Sing, Nhật...) trước để làm đẹp hồ sơ.");
            }
        }

        if (data.ageGroup === '18-30' && data.maritalStatus === 'single') {
            if (isDifficult) score -= 10;
        }

        if (score > 99) score = 99;
        if (score < 10) score = 10;

        return { score, advice };
    };

    const handleSubmit = () => {
        const { score, advice } = calculateScore();
        onFinish({ ...data, score, advice });
    };

    // Render Steps
    return (
        <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-black text-slate-900">Đánh Giá Hồ Sơ</h3>
                    <p className="text-xs text-slate-500">Bước {step}/{totalSteps}: {getStepTitle(step)}</p>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                </div>
            </div>

            {/* Step Content */}
            <div className="flex-1">
                {step === 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {COUNTRIES_SUMMARY.map(c => (
                            <button
                                key={c.id}
                                onClick={() => handleSelect('destination', c.id)}
                                className={`p-4 rounded-xl border text-left transition-all hover:shadow-md ${data.destination === c.id ? 'border-primary bg-teal-50 ring-1 ring-primary' : 'border-gray-200 hover:border-secondary'}`}
                            >
                                <span className="block text-sm font-bold text-slate-800">{c.name}</span>
                                <span className="text-[10px] text-slate-500">{c.badge}</span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-[fadeIn_0.3s]">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Độ tuổi của bạn?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Dưới 18', '18 - 30', '31 - 50', 'Trên 50'].map(opt => (
                                    <button key={opt} onClick={() => handleSelect('ageGroup', opt)} className={`p-3 rounded-lg border text-sm font-medium transition-all ${data.ageGroup === opt ? 'bg-secondary border-secondary text-slate-900 shadow-sm' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'}`}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Tình trạng hôn nhân?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[{v: 'single', l: 'Độc thân'}, {v: 'married', l: 'Đã kết hôn'}, {v: 'divorced', l: 'Ly hôn'}].map(opt => (
                                    <button key={opt.v} onClick={() => handleSelect('maritalStatus', opt.v)} className={`p-3 rounded-lg border text-sm font-medium transition-all ${data.maritalStatus === opt.v ? 'bg-secondary border-secondary text-slate-900 shadow-sm' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'}`}>
                                        {opt.l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-[fadeIn_0.3s]">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Công việc hiện tại?</label>
                            <div className="grid grid-cols-1 gap-3">
                                {[{v: 'employee', l: 'Nhân viên văn phòng / Công ty'}, {v: 'business_owner', l: 'Chủ doanh nghiệp / Hộ kinh doanh'}, {v: 'state_official', l: 'Viên chức nhà nước'}, {v: 'freelancer', l: 'Làm tự do (Freelancer) / Online'}, {v: 'retired', l: 'Hưu trí / HS-SV'}].map(opt => (
                                    <button key={opt.v} onClick={() => handleSelect('jobType', opt.v)} className={`p-3 rounded-lg border text-left text-sm font-medium flex items-center justify-between transition-all ${data.jobType === opt.v ? 'bg-secondary border-secondary text-slate-900 shadow-sm' : 'bg-white border-gray-200 text-slate-600 hover:bg-gray-50'}`}>
                                        {opt.l}
                                        {data.jobType === opt.v && <span className="material-symbols-outlined text-sm">check</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {['employee', 'state_official'].includes(data.jobType) && (
                             <div className="animate-[fadeIn_0.3s]">
                                <label className="block text-sm font-bold text-slate-700 mb-3">Có đóng BHXH (App VssID) không?</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => handleSelect('socialInsurance', 'yes')} className={`p-3 rounded-lg border text-sm font-medium transition-all ${data.socialInsurance === 'yes' ? 'bg-teal-50 border-primary text-primary shadow-sm' : 'bg-white hover:bg-gray-50'}`}>Có, đầy đủ</button>
                                    <button onClick={() => handleSelect('socialInsurance', 'no')} className={`p-3 rounded-lg border text-sm font-medium transition-all ${data.socialInsurance === 'no' ? 'bg-red-50 border-red-500 text-red-500 shadow-sm' : 'bg-white hover:bg-gray-50'}`}>Không / Đóng không đều</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 animate-[fadeIn_0.3s]">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Tài chính & Tài sản?</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button onClick={() => handleSelect('finance', 'strong')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.finance === 'strong' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Tài chính mạnh</span>
                                    <span className="text-xs opacity-80">Sổ tiết kiệm &gt; 200tr + Nhà/Xe chính chủ</span>
                                </button>
                                <button onClick={() => handleSelect('finance', 'medium')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.finance === 'medium' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Tài chính trung bình</span>
                                    <span className="text-xs opacity-80">Có sổ tiết kiệm, chưa có nhà/xe</span>
                                </button>
                                <button onClick={() => handleSelect('finance', 'weak')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.finance === 'weak' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Tài chính yếu</span>
                                    <span className="text-xs opacity-80">Không có sổ tiết kiệm hoặc rất ít</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-6 animate-[fadeIn_0.3s]">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">Lịch sử du lịch nước ngoài?</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button onClick={() => handleSelect('travelHistory', 'advanced')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.travelHistory === 'advanced' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Đã đi nước tiên tiến</span>
                                    <span className="text-xs opacity-80">Mỹ, Úc, Anh, Châu Âu, Nhật, Hàn...</span>
                                </button>
                                <button onClick={() => handleSelect('travelHistory', 'basic')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.travelHistory === 'basic' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Đã đi Đông Nam Á / Trung Quốc</span>
                                    <span className="text-xs opacity-80">Thái Lan, Singapore, TQ...</span>
                                </button>
                                <button onClick={() => handleSelect('travelHistory', 'none')} className={`p-3 rounded-lg border text-left text-sm transition-all ${data.travelHistory === 'none' ? 'bg-secondary border-secondary shadow-sm' : 'bg-white border-gray-200 hover:border-secondary'}`}>
                                    <span className="font-bold block">Hộ chiếu trắng</span>
                                    <span className="text-xs opacity-80">Chưa đi nước nào</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="space-y-4 animate-[fadeIn_0.3s]">
                        <div className="text-center mb-4">
                            <span className="material-symbols-outlined text-4xl text-primary mb-2">person_pin</span>
                            <h4 className="font-bold text-slate-900">Thông tin liên hệ</h4>
                            <p className="text-xs text-slate-500">Bước cuối cùng để xác nhận hồ sơ.</p>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ tên *</label>
                            <input type="text" className="w-full h-12 px-4 border rounded-lg bg-white outline-none focus:border-primary text-slate-900 font-medium" placeholder="Nhập họ tên" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số điện thoại *</label>
                            <input type="tel" className="w-full h-12 px-4 border rounded-lg bg-white outline-none focus:border-primary text-slate-900 font-medium" placeholder="09xxxxxxx" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} />
                        </div>
                    </div>
                )}

                {/* SUMMARY STEP */}
                {step === 7 && (
                    <div className="space-y-4 animate-[fadeIn_0.3s]">
                        <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100 flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary text-2xl">fact_check</span>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">Xác nhận thông tin</h4>
                                <p className="text-xs text-slate-600">Vui lòng kiểm tra lại thông tin trước khi hệ thống AI chấm điểm.</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                            {/* Summary Rows... */}
                            <div className="flex border-b border-gray-100">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Điểm đến</div>
                                <div className="w-2/3 p-3 font-bold text-primary bg-white">{getCountryName(data.destination)}</div>
                            </div>
                            <div className="flex border-b border-gray-100">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Nhân thân</div>
                                <div className="w-2/3 p-3 bg-white text-slate-800">{data.ageGroup} • {getMaritalLabel(data.maritalStatus)}</div>
                            </div>
                            <div className="flex border-b border-gray-100">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Công việc</div>
                                <div className="w-2/3 p-3 bg-white text-slate-800">
                                    {getJobLabel(data.jobType)}
                                    {['employee', 'state_official'].includes(data.jobType) && (
                                        <div className="text-xs text-slate-500 mt-1">
                                            {data.socialInsurance === 'yes' ? '✅ Có BHXH/VssID' : '❌ Không có BHXH'}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex border-b border-gray-100">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Tài chính</div>
                                <div className="w-2/3 p-3 bg-white text-slate-800">{getFinanceLabel(data.finance)}</div>
                            </div>
                            <div className="flex border-b border-gray-100">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Lịch sử</div>
                                <div className="w-2/3 p-3 bg-white text-slate-800">{getHistoryLabel(data.travelHistory)}</div>
                            </div>
                            <div className="flex">
                                <div className="w-1/3 bg-gray-50 p-3 font-bold text-slate-600">Liên hệ</div>
                                <div className="w-2/3 p-3 bg-white text-slate-800">
                                    <p className="font-bold">{data.name}</p>
                                    <p className="text-xs text-slate-500">{data.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-between">
                {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">arrow_back</span> Quay lại
                    </button>
                ) : (
                    <div></div>
                )}
                
                {step < totalSteps && (
                    <button 
                        onClick={() => setStep(step + 1)} 
                        disabled={
                            (step === 1 && !data.destination) ||
                            (step === 2 && (!data.ageGroup || !data.maritalStatus)) ||
                            (step === 3 && !data.jobType) ||
                            (step === 3 && ['employee', 'state_official'].includes(data.jobType) && !data.socialInsurance) ||
                            (step === 4 && !data.finance) ||
                            (step === 5 && !data.travelHistory) ||
                            (step === 6 && (!data.name || !data.phone))
                        }
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Tiếp tục
                    </button>
                )}

                {step === totalSteps && (
                    <button 
                        onClick={handleSubmit} 
                        className="bg-secondary hover:bg-secondary-dark text-slate-900 px-6 py-2 rounded-lg text-sm font-bold shadow-lg transition-all flex items-center gap-2 animate-pulse"
                    >
                        <span className="material-symbols-outlined text-sm">analytics</span>
                        Chấm Điểm Ngay
                    </button>
                )}
            </div>
        </div>
    );
};

const getStepTitle = (step: number) => {
    switch(step) {
        case 1: return "Chọn điểm đến";
        case 2: return "Thông tin cá nhân";
        case 3: return "Công việc";
        case 4: return "Tài chính";
        case 5: return "Lịch sử du lịch";
        case 6: return "Thông tin liên hệ";
        case 7: return "Tổng hợp hồ sơ";
        default: return "";
    }
};

const getResultContent = (score: number) => {
    if (score >= 90) return {
        title: "Hồ Sơ Rất Mạnh!",
        text: "Tuyệt vời! Hồ sơ của bạn gần như hoàn hảo. Khả năng đậu visa rất cao (trên 95%). Hãy liên hệ ngay để chuyên viên Beetours hỗ trợ nộp hồ sơ chuẩn xác, tránh sai sót nhỏ đáng tiếc.",
        color: "text-green-600",
        icon: "verified"
    };
    if (score >= 75) return {
        title: "Hồ Sơ Tiềm Năng",
        text: "Hồ sơ của bạn khá tốt. Bạn có nền tảng nhân thân và công việc ổn định. Tuy nhiên, đừng chủ quan! Hãy chuẩn bị kỹ lưỡng giấy tờ chứng minh tài chính để đảm bảo kết quả tốt nhất.",
        color: "text-blue-600",
        icon: "thumb_up"
    };
    if (score >= 50) return {
        title: "Cần Cải Thiện Thêm",
        text: "Hồ sơ ở mức trung bình. Tỷ lệ đậu phụ thuộc hoàn toàn vào cách giải trình hồ sơ (Cover Letter) và sự logic trong lịch trình. Bạn RẤT CẦN sự hỗ trợ của chuyên gia để tối ưu điểm mạnh.",
        color: "text-yellow-600",
        icon: "warning"
    };
    return {
        title: "Rủi Ro Cao",
        text: "Hồ sơ hiện tại còn nhiều điểm yếu (Tài chính yếu/Lịch sử trắng/Không BHXH). Beetours khuyên bạn KHÔNG NÊN tự nộp lúc này để tránh bị từ chối. Hãy liên hệ để được tư vấn lộ trình cải thiện hồ sơ trước.",
        color: "text-red-600",
        icon: "block"
    };
};

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, activeContext, initialTab }) => {
  const { addLead } = useData();
  const [activeTab, setActiveTab] = useState<'chat' | 'form' | 'assessment'>('chat'); 
  const [assessmentResult, setAssessmentResult] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", note: "" });

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setFormData({ name: "", phone: "", email: "", note: "" });
      setActiveTab(initialTab || 'chat'); 
      setAssessmentResult(null); 
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const handleAssessmentFinish = async (result: any) => {
      setAssessmentResult(result);
      try {
          await addLead({
              name: result.name,
              phone: result.phone,
              email: "",
              note: `[KẾT QUẢ ĐÁNH GIÁ] Điểm: ${result.score}/100. Điểm đến: ${result.destination.toUpperCase()}. Lời khuyên: ${result.advice.join(' ')}`,
              source: "Assessment Tool"
          });
      } catch (err) {
          console.error("Save lead error", err);
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await addLead({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            note: formData.note,
            source: `Popup Form (${activeContext || 'General'})`
        });
        setIsSubmitted(true);
    } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to render assessment result
  const renderAssessmentResult = () => {
      if (!assessmentResult) return null;
      const content = getResultContent(assessmentResult.score);

      return (
        <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-[fadeIn_0.5s] overflow-y-auto">
            <div className="relative w-32 h-32 mb-6 shrink-0">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className={`${assessmentResult.score > 70 ? 'text-green-500' : assessmentResult.score > 40 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000 ease-out`} strokeDasharray={`${assessmentResult.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-black text-slate-800">{assessmentResult.score}%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ đậu</span>
                </div>
            </div>
            
            <h3 className={`text-2xl font-black mb-2 flex items-center gap-2 ${content.color}`}>
                <span className="material-symbols-outlined text-2xl">{content.icon}</span>
                {content.title}
            </h3>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-sm text-slate-600 mb-6 w-full max-w-sm text-left shadow-inner">
                <p className="mb-4 font-medium leading-relaxed border-b border-slate-200 pb-3">{content.text}</p>
                
                {assessmentResult.advice.length > 0 && (
                    <div className="mt-3">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Lưu ý quan trọng:</p>
                        <ul className="space-y-2">
                            {assessmentResult.advice.map((tip: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-2 text-xs">
                                    <span className="material-symbols-outlined text-red-500 text-sm mt-0.5">error</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
                <button onClick={() => setActiveTab('chat')} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-lg transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Chat Tư Vấn
                </button>
                <button onClick={() => setActiveTab('form')} className="px-6 py-3 bg-secondary hover:bg-secondary-dark text-slate-900 font-bold rounded-lg shadow-lg transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">support_agent</span>
                    Liên hệ chuyên gia
                </button>
            </div>
        </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white md:rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden animate-[fadeIn_0.3s_ease-out] flex flex-col-reverse md:flex-row h-[100dvh] md:h-auto md:max-h-[85vh]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all z-20 bg-white/80"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Navigation Area (Left on Desktop, Bottom on Mobile) */}
        <div className="w-full md:w-1/3 bg-white p-2 md:p-6 text-slate-900 flex flex-row md:flex-col justify-between md:justify-start gap-0 md:gap-2 shrink-0 md:shrink border-t md:border-t-0 md:border-r border-gray-100">
            <div className="hidden md:block mb-6">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-3xl text-primary">support_agent</span>
                </div>
                <h2 className="text-2xl font-black leading-tight mb-2 text-slate-900">Trung Tâm <br/>Tư Vấn Visa</h2>
                <p className="text-slate-500 text-sm">Giải đáp thắc mắc 24/7 với Chuyên gia hoặc Đặt lịch hẹn với Chuyên viên cao cấp.</p>
            </div>

            <div className="flex md:flex-col gap-1 w-full md:mt-auto">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 flex flex-col md:flex-row items-center md:gap-3 p-2 md:p-4 rounded-lg md:rounded-xl transition-all ${activeTab === 'chat' ? 'bg-secondary text-slate-900 font-bold shadow-lg' : 'bg-transparent text-slate-500 hover:bg-gray-50'}`}
                >
                    <span className="material-symbols-outlined text-2xl md:text-xl">smart_toy</span>
                    <div className="text-center md:text-left">
                        <div className="text-[10px] md:text-sm font-bold md:font-normal">Chat</div>
                        <div className="hidden md:block text-[10px] opacity-80 font-normal">Trả lời ngay lập tức</div>
                    </div>
                </button>

                <button 
                    onClick={() => setActiveTab('assessment')}
                    className={`flex-1 flex flex-col md:flex-row items-center md:gap-3 p-2 md:p-4 rounded-lg md:rounded-xl transition-all ${activeTab === 'assessment' ? 'bg-secondary text-slate-900 font-bold shadow-lg' : 'bg-transparent text-slate-500 hover:bg-gray-50'}`}
                >
                    <span className="material-symbols-outlined text-2xl md:text-xl">fact_check</span>
                     <div className="text-center md:text-left">
                        <div className="text-[10px] md:text-sm font-bold md:font-normal">Đánh Giá</div>
                        <div className="hidden md:block text-[10px] opacity-80 font-normal">Chấm điểm tỷ lệ đậu</div>
                    </div>
                </button>

                <button 
                    onClick={() => setActiveTab('form')}
                    className={`flex-1 flex flex-col md:flex-row items-center md:gap-3 p-2 md:p-4 rounded-lg md:rounded-xl transition-all ${activeTab === 'form' ? 'bg-secondary text-slate-900 font-bold shadow-lg' : 'bg-transparent text-slate-500 hover:bg-gray-50'}`}
                >
                    <span className="material-symbols-outlined text-2xl md:text-xl">contact_mail</span>
                     <div className="text-center md:text-left">
                        <div className="text-[10px] md:text-sm font-bold md:font-normal">Liên Hệ</div>
                        <div className="hidden md:block text-[10px] opacity-80 font-normal">Chuyên viên gọi lại sau</div>
                    </div>
                </button>
            </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-2/3 bg-white relative flex flex-col flex-1 overflow-hidden h-full">
            
            {/* CHAT TAB */}
            {activeTab === 'chat' && (
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm z-10 shrink-0">
                        <div>
                             <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Chuyên Gia Visa Beetours
                             </h3>
                             <p className="text-xs text-slate-500 truncate max-w-[200px] md:max-w-none">
                                Đang tư vấn về: <span className="font-bold text-primary">{activeContext || "Dịch vụ chung"}</span>
                             </p>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <ChatInterface key={activeContext} activeContext={activeContext} />
                    </div>
                </div>
            )}

            {/* ASSESSMENT TAB */}
            {activeTab === 'assessment' && (
                <div className="h-full bg-white overflow-hidden flex flex-col">
                    {!assessmentResult ? (
                        <ProfileAssessment onFinish={handleAssessmentFinish} onBack={() => setActiveTab('chat')} />
                    ) : (
                        renderAssessmentResult()
                    )}
                </div>
            )}

            {/* FORM TAB */}
            {activeTab === 'form' && (
                <div className="h-full overflow-y-auto p-6 md:p-10">
                    {!isSubmitted ? (
                        <div className="max-w-md mx-auto">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">edit_document</span>
                                Để Lại Lời Nhắn
                            </h3>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Họ và tên <span className="text-red-500">*</span>
                                </label>
                                <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                                placeholder="Nhập họ tên"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Số điện thoại <span className="text-red-500">*</span>
                                </label>
                                <input
                                type="tel"
                                name="phone"
                                required
                                pattern="[0-9]{10,11}"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                                placeholder="09xxxxxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Email
                                </label>
                                <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black"
                                placeholder="example@gmail.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Nội dung cần hỗ trợ
                                </label>
                                <textarea
                                rows={4}
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                className="w-full p-4 rounded-lg bg-white border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-black resize-none"
                                placeholder="Nội dung cần tư vấn..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSubmitting ? 'Đang gửi...' : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Gửi Yêu Cầu
                                    </>
                                )}
                            </button>
                            </form>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                            <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Đã Gửi Thành Công!</h3>
                            <p className="text-slate-600 mb-8 max-w-[280px]">
                            Cảm ơn <strong>{formData.name}</strong>. Chúng tôi sẽ liên hệ lại qua số <strong>{formData.phone}</strong> sớm nhất.
                            </p>
                            <button
                            onClick={onClose}
                            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-slate-800 font-bold rounded-lg transition-all"
                            >
                            Đóng
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};
