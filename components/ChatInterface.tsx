
import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, ChatAttachment } from "../types";
import { sendMessageStream, fileToBase64 } from "../services/gemini";
import { useData } from "../contexts/DataContext";

interface ChatInterfaceProps {
    activeContext?: string; // e.g., "Mỹ (USA)", "Trang chủ"
}

// Improved Text Formatter
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Split by newlines first to handle paragraphs/lists
    const lines = text.split('\n');
    
    return (
      <div className="whitespace-pre-wrap font-sans">
        {lines.map((line, idx) => {
            // Handle bullet points
            if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                return (
                    <div key={idx} className="flex gap-2 ml-1 my-1">
                        <span className="text-secondary font-bold">•</span>
                        <span>{renderBold(line.replace(/^[-*]\s/, ''))}</span>
                    </div>
                );
            }
            // Handle Headers (simple detection)
            if (line.trim().startsWith('### ') || line.trim().startsWith('**') && line.trim().endsWith('**') && line.length < 50) {
                 return <div key={idx} className="font-bold text-slate-800 mt-3 mb-1">{renderBold(line.replace(/###\s/, ''))}</div>;
            }

            // Normal text
            return <div key={idx} className="min-h-[1.2em]">{renderBold(line)}</div>;
        })}
      </div>
    );
};

const renderBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const SUGGESTED_QUESTIONS: Record<string, string[]> = {
    'default': [
        "Xin visa nước nào khó nhất?",
        "Dịch vụ visa bao gồm những gì?",
        "Kiểm tra tỷ lệ đậu visa của tôi?"
    ],
    'usa': [
        "Phí xin visa Mỹ trọn gói?",
        "Tôi từng rớt visa Mỹ, làm lại được không?",
        "Chứng minh tài chính đi Mỹ cần gì?"
    ],
    'uk': [
        "Xin visa Anh mất bao lâu?",
        "Phí visa khẩn Anh Quốc?",
        "Du lịch Anh có cần thư mời không?"
    ],
    'schengen': [
        "Visa Schengen đi được những nước nào?",
        "Nên xin visa Pháp hay Đức dễ hơn?",
        "Bảo hiểm du lịch Châu Âu?"
    ]
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ activeContext = "Trang Chủ" }) => {
  const { addLead } = useData();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: `Xin chào! Em là trợ lý tư vấn của Beetours. \nEm thấy anh/chị đang quan tâm đến **${activeContext}** đúng không ạ?\n\nAnh/Chị cần em hỗ trợ thông tin gì không?`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead Form State
  const [hasProvidedInfo, setHasProvidedInfo] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "" });
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false);
  const [isChatLocked, setIsChatLocked] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLimitReached = messages.filter(m => m.role === 'user').length >= 3 && !hasProvidedInfo && !isTyping;

  const getSuggestions = () => {
      const lowerContext = activeContext.toLowerCase();
      if (lowerContext.includes('mỹ') || lowerContext.includes('usa')) return SUGGESTED_QUESTIONS['usa'];
      if (lowerContext.includes('anh') || lowerContext.includes('uk')) return SUGGESTED_QUESTIONS['uk'];
      if (lowerContext.includes('âu') || lowerContext.includes('schengen') || lowerContext.includes('pháp') || lowerContext.includes('đức')) return SUGGESTED_QUESTIONS['schengen'];
      return SUGGESTED_QUESTIONS['default'];
  };

  const suggestions = getSuggestions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isLimitReached, isChatLocked]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newAttachments: ChatAttachment[] = [];
      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > 5 * 1024 * 1024) {
              alert(`File ${file.name} quá lớn (tối đa 5MB)`);
              continue;
          }
          try {
              const base64 = await fileToBase64(file);
              const isImage = file.type.startsWith('image/');
              newAttachments.push({
                  type: isImage ? 'image' : 'pdf',
                  url: isImage ? URL.createObjectURL(file) : '', 
                  base64: base64,
                  mimeType: file.type,
                  name: file.name
              });
          } catch (err) {
              console.error("File read error", err);
          }
      }
      setAttachments(prev => [...prev, ...newAttachments]);
      if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (index: number) => {
      setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (textOverride?: string) => {
    if (isLimitReached || isChatLocked) return;

    const textToSend = textOverride || input;
    if ((!textToSend.trim() && attachments.length === 0) || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend,
      attachments: [...attachments],
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachments([]);
    setIsTyping(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsgPlaceholder: ChatMessage = {
        id: botMsgId,
        role: "model",
        text: "",
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, botMsgPlaceholder]);

    try {
      const stream = await sendMessageStream(messages, textToSend, userMsg.attachments || [], activeContext);
      
      let fullText = "";
      for await (const chunk of stream) {
          fullText += chunk;
          setMessages(prev => prev.map(msg => 
              msg.id === botMsgId ? { ...msg, text: fullText } : msg
          ));
      }

    } catch (error: any) {
      // Hiển thị lỗi chi tiết để debug
      const errText = error.message && error.message.includes('404') 
        ? "Lỗi Model: Có thể Key chưa được cấp quyền dùng model 'gemini-3-flash-preview'. Hãy thử Key khác."
        : error.message || "Lỗi kết nối server.";

      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId ? { 
            ...msg, 
            text: `⚠️ Đã xảy ra lỗi: ${errText}\n\nVui lòng thử lại hoặc liên hệ Hotline 1900-0310.`, 
            isError: true 
        } : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.phone) return;
      
      setIsLeadSubmitting(true);
      try {
          await addLead({
              name: contactForm.name,
              phone: contactForm.phone,
              email: "",
              note: `Chatbot Lead - Context: ${activeContext}`,
              source: "AI Chat Interface"
          });
          setHasProvidedInfo(true);
          setIsChatLocked(true); // Lock chat after submission
          setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role: 'model',
              text: `Cảm ơn **${contactForm.name}**. Thông tin của anh/chị đã được chuyển đến bộ phận chuyên môn. Chuyên gia tư vấn sẽ liên hệ trực tiếp qua số **${contactForm.phone}** trong ít phút tới để hỗ trợ chi tiết hơn.`,
              timestamp: Date.now()
          }]);
      } catch (err) {
          alert("Có lỗi xảy ra, vui lòng thử lại.");
      } finally {
          setIsLeadSubmitting(false);
      }
  };

  return (
    <div className="flex flex-col h-[550px] bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center text-xs text-gray-400 my-2">
            Hôm nay, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[90%] md:max-w-[80%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm border border-gray-100 ${msg.role === "user" ? "bg-gray-200 text-gray-600" : "bg-white text-primary"}`}>
                {msg.role === "user" ? (
                    <span className="material-symbols-outlined text-xl">person</span>
                ) : (
                   <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="Bot" className="w-6 h-6 object-contain" />
                )}
              </div>

              <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl text-[15px] shadow-sm leading-relaxed border ${
                      msg.role === "user"
                        ? "bg-secondary text-slate-900 rounded-tr-sm border-transparent"
                        : msg.isError 
                            ? "bg-red-50 text-red-600 border-red-100 rounded-tl-sm"
                            : "bg-gray-50 text-slate-800 rounded-tl-sm border-gray-100"
                    }`}
                  >
                    {msg.attachments && msg.attachments.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {msg.attachments.map((att, idx) => (
                                <div key={idx} className="bg-white/40 p-1 rounded border border-black/5">
                                    {att.type === 'image' ? (
                                        <img src={att.url} alt="attached" className="h-20 w-auto rounded object-cover" />
                                    ) : (
                                        <div className="flex items-center gap-1 text-xs px-2 py-1">
                                            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                                            <span className="max-w-[120px] truncate">{att.name}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    <FormattedText text={msg.text} />
                  </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start w-full">
             <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-primary flex-shrink-0 flex items-center justify-center border border-gray-100">
                     <img src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" alt="Bot" className="w-6 h-6 object-contain" />
                </div>
                <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {!isTyping && !isLimitReached && !isChatLocked && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {suggestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="flex-shrink-0 px-3 py-1.5 bg-white border border-secondary text-slate-700 text-xs font-bold rounded-full hover:bg-secondary hover:text-slate-900 transition-colors shadow-sm whitespace-nowrap"
                  >
                      {q}
                  </button>
              ))}
          </div>
      )}

      <div className="p-3 bg-white border-t border-gray-100">
        {isChatLocked ? (
            <div className="p-4 bg-green-50 text-green-800 text-sm font-bold text-center rounded-xl border border-green-200 animate-[fadeIn_0.5s] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl">verified</span>
                <span>Thông tin đã được gửi. Chuyên gia sẽ sớm liên hệ.</span>
            </div>
        ) : isLimitReached ? (
            <div className="animate-[fadeIn_0.3s]">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-1">
                    <div className="flex items-center gap-2 mb-2 text-yellow-800 font-bold text-sm">
                        <span className="material-symbols-outlined text-lg">lock</span>
                        Tiếp tục tư vấn miễn phí
                    </div>
                    <p className="text-xs text-slate-600 mb-3">
                        Vui lòng để lại thông tin để chuyên gia hỗ trợ chính xác hơn.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                required
                                placeholder="Tên của bạn" 
                                value={contactForm.name}
                                onChange={e => setContactForm({...contactForm, name: e.target.value})}
                                className="flex-1 h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-slate-900 transition-all"
                            />
                            <input 
                                type="tel" 
                                required
                                placeholder="Số điện thoại" 
                                value={contactForm.phone}
                                onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                                className="flex-1 h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-slate-900 transition-all"
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLeadSubmitting}
                            className="w-full h-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isLeadSubmitting ? 'Đang gửi...' : 'Gửi thông tin để tư vấn trực tiếp'}
                        </button>
                    </form>
                </div>
            </div>
        ) : (
            <>
                {attachments.length > 0 && (
                    <div className="flex gap-3 mb-2 px-1">
                        {attachments.map((att, idx) => (
                            <div key={idx} className="relative group">
                                {att.type === 'image' ? (
                                    <img src={att.url} alt="preview" className="h-14 w-14 object-cover rounded-lg border border-gray-200" />
                                ) : (
                                    <div className="h-14 w-14 bg-red-50 rounded-lg border border-red-100 flex flex-col items-center justify-center text-red-500">
                                        <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                                    </div>
                                )}
                                <button 
                                    onClick={() => removeAttachment(idx)}
                                    className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xs block">close</span>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2 bg-gray-100 rounded-3xl px-2 py-1.5 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white rounded-full transition-all"
                    title="Gửi ảnh/PDF"
                >
                    <span className="material-symbols-outlined text-xl">attach_file</span>
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*,application/pdf" 
                    multiple
                    onChange={handleFileSelect}
                />

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 bg-transparent border-none focus:ring-0 outline-none resize-none max-h-24 py-2.5 text-sm text-slate-800 placeholder:text-slate-400"
                    rows={1}
                    style={{height: 'auto'}}
                />

                <button
                    onClick={() => handleSend()}
                    disabled={(!input.trim() && attachments.length === 0) || isTyping}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                        (!input.trim() && attachments.length === 0) || isTyping 
                        ? 'text-slate-300 bg-transparent' 
                        : 'bg-primary text-white hover:bg-primary-dark shadow-sm'
                    }`}
                >
                    <span className="material-symbols-outlined text-xl filled-icon">send</span>
                </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
};
