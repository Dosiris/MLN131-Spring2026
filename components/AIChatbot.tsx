import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, Minimize2, Maximize2, RefreshCw, Trash2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
const SYSTEM_PROMPT = `
Bạn là một trợ lý AI học thuật, chuyên sâu về **Chủ nghĩa Mác – Lênin**, **Triết học Marxist** và **Chủ nghĩa xã hội khoa học**. 
Bạn được thiết kế để hỗ trợ người học trên **website giáo dục chính thống**, phục vụ học tập, ôn thi, nghiên cứu các môn lý luận chính trị ở Việt Nam.

========================
I. PHẠM VI KIẾN THỨC
========================
Bạn nắm vững và trình bày chính xác các nội dung sau:

1. **Triết học Mác – Lênin**
   - Chủ nghĩa duy vật biện chứng
   - Chủ nghĩa duy vật lịch sử
   - Các quy luật cơ bản của phép biện chứng (thống nhất và đấu tranh của các mặt đối lập, lượng – chất, phủ định của phủ định)
   - Mối quan hệ giữa vật chất – ý thức, tồn tại xã hội – ý thức xã hội

2. **Kinh tế chính trị Mác – Lênin**
   - Học thuyết giá trị lao động
   - Học thuyết giá trị thặng dư
   - Quy luật kinh tế của chủ nghĩa tư bản
   - Các hình thái kinh tế – xã hội và quá trình vận động lịch sử

3. **Chủ nghĩa xã hội khoa học**
   - Sứ mệnh lịch sử của giai cấp công nhân
   - Cách mạng xã hội chủ nghĩa
   - Thời kỳ quá độ lên chủ nghĩa xã hội
   - Vai trò của Đảng Cộng sản và Nhà nước xã hội chủ nghĩa

4. **Lịch sử phong trào cộng sản và công nhân quốc tế**
   - Quốc tế Cộng sản
   - Các cuộc cách mạng xã hội chủ nghĩa tiêu biểu
   - Những bài học lịch sử rút ra

5. **Vận dụng ở Việt Nam**
   - Tư tưởng Hồ Chí Minh
   - Đường lối cách mạng của Đảng Cộng sản Việt Nam
   - Công cuộc Đổi mới
   - Kinh tế thị trường định hướng xã hội chủ nghĩa

========================
II. NGUYÊN TẮC TRẢ LỜI (BẮT BUỘC TUÂN THỦ)
========================
Khi trả lời, bạn phải:

- Trình bày **đúng quan điểm khoa học của Chủ nghĩa Mác – Lênin**, sử dụng thuật ngữ chính xác
- Lập luận **logic, chặt chẽ, có hệ thống**, tránh kể chuyện hoặc diễn giải cảm tính
- Ưu tiên cấu trúc:
  **Khái niệm → Bản chất → Nội dung → Ý nghĩa / Vai trò → Liên hệ thực tiễn**
- Phân tích theo tinh thần **khoa học, khách quan, biện chứng**
- Khi có nhiều quan điểm, phải làm rõ **quan điểm Mác – Lênin là trung tâm**
- Liên hệ thực tiễn Việt Nam khi câu hỏi cho phép (không gượng ép)
- Tránh ngôn ngữ suồng sã, tránh ví dụ phản cảm hoặc không mang tính học thuật

========================
III. HÌNH THỨC TRÌNH BÀY
========================
- Trả lời **bằng tiếng Việt**
- Sử dụng **Markdown**
- Tiêu đề chính in đậm
- Gạch đầu dòng rõ ràng
- Nếu là câu hỏi học thuộc / thi:
  → Ưu tiên trả lời **đúng trọng tâm, dễ ghi nhớ**
- Nếu là câu hỏi phân tích:
  → Trình bày **đầy đủ luận điểm – luận cứ – kết luận**

========================
IV. MỤC TIÊU CUỐI CÙNG
========================
Câu trả lời của bạn phải:
- Phù hợp để **sinh viên học – chép – ôn thi**
- Dùng được cho **bài thuyết trình, bài tự luận, bài kiểm tra**
- Đảm bảo **tính chính thống, khoa học và chuẩn mực học thuật**
`;

const SUGGESTED_QUESTIONS = [
  "Gia đình là gì? Các mối quan hệ cơ bản?",
  "4 chức năng của gia đình thời kỳ quá độ?",
  "Cơ sở xây dựng gia đình XHCN gồm?",
  "Gia đình Việt Nam đang biến đổi như nào?",
];

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const callGroqAPI = async (userMessage: string): Promise<string> => {
    const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    if (!API_KEY) {
      throw new Error('API key chưa được cấu hình. Vui lòng thêm VITE_GROQ_API_KEY vào file .env');
    }

    const conversationHistory = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT
            },
            ...conversationHistory,
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Không nhận được phản hồi từ AI');
    }

    return data.choices[0].message.content;
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    setError(null);
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callGroqAPI(textToSend);
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
      setLastFailedMessage(textToSend);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      setError(null);
      // Remove the last user message that failed
      setMessages(prev => prev.slice(0, -1));
      handleSend(lastFailedMessage);
      setLastFailedMessage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, i) => {
        // Headers first - màu đỏ nổi bật cho tiêu đề
        if (line.startsWith('### ')) {
          return <h4 key={i} className="text-red-400 font-bold mt-4 mb-2 border-l-2 border-red-500 pl-2">{line.slice(4)}</h4>;
        }
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-red-400 font-bold text-lg mt-4 mb-2">{line.slice(3)}</h3>;
        }
        if (line.startsWith('# ')) {
          return <h2 key={i} className="text-red-400 font-bold text-xl mt-4 mb-2">{line.slice(2)}</h2>;
        }

        // Bold text - màu trắng sáng, không quá chói
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
        // Italic text
        line = line.replace(/\*(.*?)\*/g, '<em class="text-stone-300 italic">$1</em>');
        // Code inline
        line = line.replace(/`(.*?)`/g, '<code class="bg-stone-800/80 px-1.5 py-0.5 rounded text-emerald-400 text-xs">$1</code>');

        // Bullet points
        if (line.startsWith('- ') || line.startsWith('• ')) {
          return <li key={i} className="ml-4 list-disc text-stone-300" dangerouslySetInnerHTML={{ __html: line.slice(2) }} />;
        }
        // Numbered list
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return <li key={i} className="ml-4 list-decimal text-stone-300" dangerouslySetInnerHTML={{ __html: line.slice(numberedMatch[0].length) }} />;
        }
        // Regular paragraph
        if (line.trim()) {
          return <p key={i} className="mb-2 text-stone-300" dangerouslySetInnerHTML={{ __html: line }} />;
        }
        return <br key={i} />;
      });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-24 z-[70] group transition-all duration-500 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
          }`}
        aria-label="Mở trợ lý AI"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />

          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] border border-red-500/50 group-hover:scale-110 transition-transform duration-300">
            <Bot className="w-7 h-7 text-white" />
          </div>

          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-3 h-3 text-red-600" />
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-red-900/50 pointer-events-none">
          <span className="text-red-400 font-semibold">AI</span> Trợ lý Mác-Lênin
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-[80] transition-all duration-500 ease-out ${isExpanded
          ? 'inset-4 md:inset-8'
          : 'bottom-8 right-8 w-[calc(100vw-4rem)] max-w-md h-[70vh] max-h-[600px]'
          } ${isOpen
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        <div className="w-full h-full bg-black/95 backdrop-blur-xl rounded-2xl border border-red-900/50 shadow-[0_0_60px_rgba(220,38,38,0.3)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-950/80 to-black border-b border-red-900/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Trợ Lý AI Mác-Lênin</h3>
                <p className="text-red-400 text-xs">Powered by Gemini</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    setMessages([]);
                    setError(null);
                    setLastFailedMessage(null);
                  }}
                  className="p-2 text-stone-400 hover:text-white hover:bg-red-900/30 rounded-lg transition-colors"
                  aria-label="Xóa cuộc trò chuyện"
                  title="Xóa cuộc trò chuyện"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-stone-400 hover:text-white hover:bg-red-900/30 rounded-lg transition-colors"
                aria-label={isExpanded ? 'Thu nhỏ' : 'Mở rộng'}
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-white hover:bg-red-900/30 rounded-lg transition-colors"
                aria-label="Đóng chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-red-900/50 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-900/20 rounded-2xl flex items-center justify-center mb-4 border border-red-900/30">
                  <Sparkles className="w-8 h-8 text-red-500" />
                </div>
                <h4 className="text-white font-bold mb-2">Xin chào! 👋</h4>
                <p className="text-stone-400 text-sm mb-6">
                  Tôi là trợ lý AI chuyên về Chủ nghĩa Mác-Lênin. Hãy hỏi tôi bất cứ điều gì về triết học, kinh tế chính trị hay chủ nghĩa xã hội khoa học!
                </p>

                {/* Suggested Questions */}
                <div className="w-full space-y-2">
                  <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Gợi ý câu hỏi</p>
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="w-full text-left px-4 py-3 bg-red-950/30 hover:bg-red-900/40 border border-red-900/30 hover:border-red-700/50 rounded-xl text-sm text-stone-300 hover:text-white transition-all duration-200 group"
                    >
                      <span className="text-red-500 mr-2">→</span>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-stone-600 to-stone-800'
                      : 'bg-gradient-to-br from-red-600 to-red-800'
                      }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block px-4 py-3 rounded-2xl ${msg.role === 'user'
                        ? 'bg-red-600/90 text-white rounded-br-sm'
                        : 'bg-stone-900/80 text-stone-200 rounded-bl-sm border border-red-900/20'
                        }`}>
                        <div className="text-sm leading-relaxed prose prose-invert prose-red max-w-none">
                          {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
                        </div>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-1 px-2">
                        {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-stone-900/80 border border-red-900/20 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex items-center gap-2 text-stone-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Đang suy nghĩ...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="bg-red-950/50 border border-red-700/50 rounded-xl px-4 py-3 text-sm text-red-300">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold mb-1">⚠️ Lỗi</p>
                        <p>{error}</p>
                      </div>
                      <button
                        onClick={handleRetry}
                        className="flex-shrink-0 p-2 bg-red-600/30 hover:bg-red-600/50 border border-red-600/50 rounded-lg transition-colors group"
                        title="Thử lại"
                      >
                        <RefreshCw className="w-4 h-4 text-red-300 group-hover:text-white" />
                      </button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gradient-to-t from-red-950/30 to-transparent border-t border-red-900/20">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi của bạn..."
                  rows={1}
                  className="w-full bg-stone-900/80 border border-red-900/30 focus:border-red-600/50 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-stone-500 resize-none outline-none transition-colors scrollbar-thin scrollbar-thumb-red-900/50"
                  style={{ maxHeight: '120px' }}
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-stone-700 disabled:to-stone-800 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg shadow-red-900/30 disabled:shadow-none"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-stone-500 mt-2 text-center">
              Nhấn Enter để gửi • Shift+Enter để xuống dòng
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop for expanded mode */}
      {isOpen && isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[75]"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default AIChatbot;
