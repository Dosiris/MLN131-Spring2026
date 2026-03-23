import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, ArrowRight, RefreshCcw, BookOpen, AlertCircle, Award } from 'lucide-react';

// Data Câu hỏi
const questions = [
  // CƠ BẢN
  {
    id: 1,
    level: 'CƠ BẢN',
    text: 'Theo C.Mác và Ph.Ăngghen, cơ sở hình thành gia đình gồm mấy mối quan hệ cơ bản?',
    options: ['1 mối quan hệ', '2 mối quan hệ', '3 mối quan hệ', '4 mối quan hệ'],
    correct: 1,
    explanation: 'Hai mối quan hệ cơ bản là: quan hệ hôn nhân (vợ và chồng) và quan hệ huyết thống (cha mẹ và con cái). Quan hệ nuôi dưỡng phát sinh từ hai mối quan hệ này.'
  },
  {
    id: 2,
    level: 'CƠ BẢN',
    text: 'Ai đã khẳng định "Hạt nhân của xã hội chính là gia đình"?',
    options: ['C.Mác', 'Ph.Ăngghen', 'V.I.Lênin', 'Chủ tịch Hồ Chí Minh'],
    correct: 3,
    explanation: 'Chủ tịch Hồ Chí Minh đã khẳng định: "Nhiều gia đình cộng lại mới thành xã hội, xã hội tốt thì gia đình càng tốt, gia đình tốt thì xã hội mới tốt. Hạt nhân của xã hội chính là gia đình."'
  },
  {
    id: 3,
    level: 'CƠ BẢN',
    text: 'Chức năng nào của gia đình là đặc thù, không cộng đồng nào có thể thay thế?',
    options: ['Chức năng giáo dục', 'Chức năng kinh tế', 'Tái sản xuất ra con người', 'Thỏa mãn nhu cầu tâm sinh lý'],
    correct: 2,
    explanation: 'Chức năng tái sản xuất ra con người là đặc thù riêng của gia đình. Không một cộng đồng nào có thể thay thế chức năng duy trì nòi giống và cung cấp sức lao động cho xã hội này.'
  },
  {
    id: 4,
    level: 'CƠ BẢN',
    text: 'Gia đình đóng vai trò gì đối với xã hội?',
    options: ['Là tổ chức chính trị duy nhất', 'Là tế bào của xã hội', 'Là đơn vị kinh tế cơ bản', 'Là thiết chế văn hóa'],
    correct: 1,
    explanation: 'Gia đình là tế bào của xã hội — đơn vị cơ sở tạo nên cơ thể xã hội. Muốn xã hội phát triển lành mạnh, phải xây dựng tế bào gia đình tốt.'
  },
  {
    id: 5,
    level: 'CƠ BẢN',
    text: 'Hôn nhân tiến bộ dựa trên nguyên tắc nào sau đây?',
    options: ['Do cha mẹ sắp xếp', 'Vì lợi ích kinh tế', 'Xuất phát từ tình yêu tự nguyện', 'Theo phong tục truyền thống'],
    correct: 2,
    explanation: 'Hôn nhân tiến bộ là hôn nhân xuất phát từ tình yêu tự nguyện giữa nam và nữ — đây là nền tảng của hôn nhân một vợ một chồng bình đẳng trong CNXH.'
  },
  // NÂNG CAO
  {
    id: 6,
    level: 'NÂNG CAO',
    text: 'Cơ sở kinh tế để xây dựng gia đình trong thời kỳ quá độ là gì?',
    options: ['Phát triển kinh tế thị trường', 'Xóa bỏ chế độ tư hữu về tư liệu sản xuất', 'Tăng thu nhập hộ gia đình', 'Hội nhập kinh tế quốc tế'],
    correct: 1,
    explanation: 'Xóa bỏ chế độ tư hữu về tư liệu sản xuất là xóa bỏ gốc rễ của bất bình đẳng trong gia đình — nguồn gốc của sự thống trị nam giới và áp bức phụ nữ trong các xã hội trước đó.'
  },
  {
    id: 7,
    level: 'NÂNG CAO',
    text: 'Xu hướng biến đổi quy mô gia đình Việt Nam hiện nay là?',
    options: ['Gia đình nhiều thế hệ tăng lên', 'Quy mô gia đình mở rộng hơn', 'Gia đình hạt nhân nhỏ phổ biến hơn', 'Tỷ lệ sinh con tăng mạnh'],
    correct: 2,
    explanation: 'Gia đình hạt nhân (2 thế hệ: cha mẹ — con cái, 1–2 con) đang thay thế gia đình truyền thống nhiều thế hệ. Đây là xu hướng tất yếu trong quá trình công nghiệp hóa, đô thị hóa.'
  },
  {
    id: 8,
    level: 'NÂNG CAO',
    text: 'Điểm đặc thù của chức năng kinh tế gia đình so với các đơn vị kinh tế khác là gì?',
    options: ['Quy mô sản xuất lớn nhất', 'Lợi nhuận cao nhất', 'Là đơn vị duy nhất tái sản xuất ra sức lao động', 'Tham gia nhiều ngành nghề nhất'],
    correct: 2,
    explanation: 'Gia đình là đơn vị kinh tế duy nhất vừa sản xuất ra của cải vật chất, vừa tái sản xuất ra sức lao động cho xã hội — điều mà không một đơn vị kinh tế nào khác có thể thực hiện được.'
  },
  {
    id: 9,
    level: 'NÂNG CAO',
    text: 'V.I.Lênin đánh giá bước chủ yếu để giải phóng phụ nữ là gì?',
    options: ['Cho phụ nữ đi bầu cử', 'Thủ tiêu chế độ tư hữu về ruộng đất, công xưởng, nhà máy', 'Tăng lương cho phụ nữ', 'Xây dựng nhiều trường học'],
    correct: 1,
    explanation: 'Lênin viết: "Bước thứ hai và là bước chủ yếu là thủ tiêu chế độ tư hữu về ruộng đất, công xưởng và nhà máy. Chính như thế... mới mở được con đường giải phóng hoàn toàn và thật sự cho phụ nữ."'
  },
  {
    id: 10,
    level: 'NÂNG CAO',
    text: 'Phong trào "Gia đình Văn hóa" bắt đầu từ đâu?',
    options: ['Hà Nội', 'TP. Hồ Chí Minh', 'Hưng Yên', 'Nghệ An'],
    correct: 2,
    explanation: 'Phong trào xây dựng Gia đình Văn hóa được hình thành từ những năm 60 của thế kỷ XX, tại một địa phương của tỉnh Hưng Yên — và đến nay đã phủ rộng hầu hết các địa phương trên cả nước.'
  },
  // VẬN DỤNG
  {
    id: 11,
    level: 'VẬN DỤNG',
    text: 'Một gia đình vì áp lực kinh tế mà ép con gái kết hôn với người giàu dù không có tình yêu. Điều này vi phạm nguyên tắc nào?',
    options: ['Nguyên tắc một vợ một chồng', 'Nguyên tắc hôn nhân tự nguyện', 'Nguyên tắc đảm bảo pháp lý', 'Nguyên tắc bình đẳng giới'],
    correct: 1,
    explanation: 'Hôn nhân tiến bộ đòi hỏi phải xuất phát từ tình yêu tự nguyện. Ép buộc kết hôn vì lý do kinh tế vi phạm nguyên tắc tự nguyện — đây là biểu hiện của tư tưởng hôn nhân phong kiến, lạc hậu.'
  },
  {
    id: 12,
    level: 'VẬN DỤNG',
    text: 'Tỷ lệ ly hôn ở Việt Nam tăng trong những năm gần đây phản ánh điều gì về gia đình?',
    options: ['Gia đình Việt Nam đang suy thoái hoàn toàn', 'Hôn nhân ngày càng dựa trên tình yêu, nên dễ tan vỡ khi tình yêu phai nhạt', 'Pháp luật về ly hôn quá dễ dãi', 'Phụ nữ không còn muốn lập gia đình'],
    correct: 1,
    explanation: 'Ph.Ăngghen từng viết: nếu hôn nhân chỉ hợp đạo đức khi dựa trên tình yêu, thì khi tình yêu phai nhạt, ly hôn là điều hợp lý. Tỷ lệ ly hôn tăng phản ánh hôn nhân đang dựa nhiều hơn vào tình yêu — tích cực, nhưng cần được nhìn nhận đúng.'
  },
  {
    id: 13,
    level: 'VẬN DỤNG',
    text: 'Cha mẹ ngày nay đầu tư nhiều tiền cho con học nhưng ít dành thời gian dạy dỗ trực tiếp. Điều này ảnh hưởng đến chức năng nào?',
    options: ['Chức năng kinh tế', 'Chức năng tái sản xuất', 'Chức năng nuôi dưỡng và giáo dục', 'Chức năng tâm sinh lý'],
    correct: 2,
    explanation: 'Chức năng giáo dục của gia đình đang suy giảm về chiều sâu — dù tăng về đầu tư tài chính. Khi cha mẹ ít dạy dỗ trực tiếp, vai trò hình thành nhân cách, đạo đức của gia đình bị suy yếu đáng kể.'
  },
  {
    id: 14,
    level: 'VẬN DỤNG',
    text: 'Liên hệ: Chính sách "mỗi cặp vợ chồng nên sinh đủ 2 con" hiện nay thể hiện điều gì?',
    options: ['Nhà nước can thiệp vào quyền tự do cá nhân', 'Chức năng tái sản xuất phụ thuộc vào nhu cầu xã hội từng thời kỳ', 'Gia đình phải phục tùng Nhà nước', 'Kinh tế quyết định số con trong gia đình'],
    correct: 1,
    explanation: 'Đây là minh chứng rõ ràng cho luận điểm: chức năng tái sản xuất ra con người không chỉ là việc riêng của gia đình mà còn là vấn đề xã hội — phụ thuộc vào nhu cầu dân số và sức lao động của từng giai đoạn lịch sử.'
  },
  {
    id: 15,
    level: 'VẬN DỤNG',
    text: 'Câu nào sau đây thể hiện ĐÚNG nhất quan điểm của CNXHKH về gia đình?',
    options: ['CNXH xóa bỏ gia đình để giải phóng cá nhân', 'Gia đình truyền thống cần được giữ nguyên không thay đổi', 'Gia đình XHCN nâng cao chất lượng hôn nhân — bình đẳng, tự nguyện, dựa trên tình yêu', 'Kinh tế là yếu tố duy nhất quyết định hạnh phúc gia đình'],
    correct: 2,
    explanation: 'CNXHKH không xóa bỏ gia đình mà NÂNG CẤP gia đình — loại bỏ áp bức, bất bình đẳng, xây dựng quan hệ gia đình dựa trên tình yêu thực sự, bình đẳng thực sự, và được pháp luật bảo vệ.'
  }
];

const KnowledgeTest: React.FC<{ onReviewTheory?: () => void }> = ({ onReviewTheory }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentQuestionIdx];
  const progressPercent = Math.round(((currentQuestionIdx + (isFinished ? 1 : 0)) / questions.length) * 100);

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === currentQ.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  const getResultData = () => {
    if (score === 15) return {
      label: 'XUẤT SẮC',
      icon: '🔴',
      text: 'Bạn đã nắm vững toàn bộ lý luận Chương 7. Sẵn sàng cho kỳ thi!',
      color: 'text-red-500',
      border: 'border-red-500/50',
      bg: 'bg-red-500/10'
    };
    if (score >= 10) return {
      label: 'KHÁ',
      icon: '🟡',
      text: 'Nắm được phần lớn. Ôn lại lý thuyết phần còn yếu trước khi thi.',
      color: 'text-yellow-500',
      border: 'border-yellow-500/50',
      bg: 'bg-yellow-500/10'
    };
    if (score >= 5) return {
      label: 'TRUNG BÌNH',
      icon: '🟢',
      text: 'Cần ôn tập thêm. Hãy quay lại phần Ôn Lý thuyết để củng cố kiến thức.',
      color: 'text-green-500',
      border: 'border-green-500/50',
      bg: 'bg-green-500/10'
    };
    return {
      label: 'CẦN CỐ GẮNG',
      icon: '⚪',
      text: 'Hãy đọc lại toàn bộ nội dung Chương 7 từ đầu nhé!',
      color: 'text-stone-300',
      border: 'border-stone-500/50',
      bg: 'bg-stone-500/10'
    };
  };

  return (
    <section className="py-20 relative overflow-hidden" id="knowledge-test">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none -z-10"></div>

      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-900/50 text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-6">
            <Target size={14} /> KNOWLEDGE TEST
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 text-glow">
            KIỂM TRA <span className="text-red-600 border-b-4 border-red-600">NĂNG LỰC</span>
          </h2>
          <p className="text-red-200/70 text-sm md:text-base font-medium tracking-wide font-mono">
            // {questions.length} câu · 3 cấp độ · Xem kết quả ngay
          </p>
        </div>

        {/* Progress & Badges */}
        <div className="mb-10 bg-black/60 border border-red-900/30 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="font-mono text-white/80 font-bold">
              Câu {isFinished ? questions.length : currentQuestionIdx + 1}/{questions.length}
            </div>

            {/* Custom Progress Bar */}
            <div className="flex-1 w-full flex items-center gap-3">
              <div className="h-2 w-full bg-stone-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="font-mono text-red-400 text-xs font-bold w-8">{progressPercent}%</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold tracking-wider">
            <span className={`px-4 py-2 rounded-full border transition-colors ${currentQ?.level === 'CƠ BẢN' && !isFinished ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-black text-stone-500 border-stone-800'}`}>
              🟢 CƠ BẢN (5 câu)
            </span>
            <span className={`px-4 py-2 rounded-full border transition-colors ${currentQ?.level === 'NÂNG CAO' && !isFinished ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' : 'bg-black text-stone-500 border-stone-800'}`}>
              🟡 NÂNG CAO (5 câu)
            </span>
            <span className={`px-4 py-2 rounded-full border transition-colors ${currentQ?.level === 'VẬN DỤNG' && !isFinished ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-black text-stone-500 border-stone-800'}`}>
              🔴 VẬN DỤNG (5 câu)
            </span>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="relative">
          {!isFinished ? (
            <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-6 md:p-8 animate-fadeIn">

              <div className="flex items-center gap-3 mb-8">
                <div className="h-px bg-stone-800 flex-1"></div>
                <h3 className={`font-black uppercase tracking-widest text-sm bg-black px-4 py-1 border rounded-full
                  ${currentQ.level === 'CƠ BẢN' ? 'text-green-500 border-green-900/50' :
                    currentQ.level === 'NÂNG CAO' ? 'text-yellow-500 border-yellow-900/50' :
                      'text-red-500 border-red-900/50'}`}
                >
                  CẤP ĐỘ {currentQ.level}
                </h3>
                <div className="h-px bg-stone-800 flex-1"></div>
              </div>

              <h4 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                <span className="text-red-500 opacity-50 mr-2">Q{currentQ.id}.</span> {currentQ.text}
              </h4>

              <div className="space-y-3 mb-8">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectAnswer = currentQ.correct === idx;

                  let optionStateClass = "bg-black/50 border-stone-800 hover:border-red-500/50 hover:bg-red-950/20 text-stone-300";

                  if (showExplanation) {
                    if (isCorrectAnswer) {
                      optionStateClass = "bg-green-950/30 border-green-500/50 text-green-300";
                    } else if (isSelected && !isCorrectAnswer) {
                      optionStateClass = "bg-red-950/30 border-red-500/50 text-red-300 opacity-70";
                    } else {
                      optionStateClass = "bg-black/20 border-stone-800 text-stone-500 opacity-50";
                    }
                  } else if (isSelected) {
                    optionStateClass = "bg-red-900/20 border-red-500 text-white";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-start gap-4 ${optionStateClass}`}
                    >
                      <div className={`mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-full border text-xs font-bold
                        ${showExplanation && isCorrectAnswer ? 'border-green-500 bg-green-500/20 text-green-500' :
                          showExplanation && isSelected && !isCorrectAnswer ? 'border-red-500 bg-red-500/20 text-red-500' :
                            isSelected ? 'border-red-500 text-red-500' : 'border-stone-700 text-stone-500'}`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 font-medium leading-relaxed">{opt}</span>

                      {showExplanation && isCorrectAnswer && (
                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      )}
                      {showExplanation && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className={`transition-all duration-500 overflow-hidden ${showExplanation ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                {showExplanation && (
                  <div className={`p-5 rounded-xl border mb-6 ${selectedOption === currentQ.correct ? 'bg-green-950/20 border-green-900/30' : 'bg-yellow-950/20 border-yellow-900/30'}`}>
                    <h5 className={`font-bold uppercase tracking-widest text-xs mb-2 flex items-center gap-2 
                      ${selectedOption === currentQ.correct ? 'text-green-500' : 'text-yellow-500'}`}>
                      {selectedOption === currentQ.correct ? <><CheckCircle2 size={16} /> CHÍNH XÁC</> : <><AlertCircle size={16} /> CHƯA CHÍNH XÁC</>}
                    </h5>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                >
                  {currentQuestionIdx < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight size={18} />
                </button>
              </div>

            </div>
          ) : (
            /* Result Screen */
            <div className="bg-stone-900/40 border border-stone-800 rounded-3xl p-8 md:p-12 text-center animate-fadeIn">
              <Award className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h3 className="text-2xl text-stone-400 font-bold uppercase tracking-widest mb-2">KẾT QUẢ CỦA BẠN</h3>

              <div className="my-8">
                <span className="text-6xl md:text-8xl font-black text-white">{score}</span>
                <span className="text-2xl text-stone-500 font-bold">/{questions.length}</span>
              </div>

              <div className={`mx-auto max-w-md p-6 rounded-2xl border ${getResultData().border} ${getResultData().bg} mb-12`}>
                <h4 className={`text-2xl font-black uppercase mb-3 ${getResultData().color} flex items-center justify-center gap-2`}>
                  <span className="text-3xl" aria-hidden="true">{getResultData().icon}</span> {getResultData().label}
                </h4>
                <p className="text-white/90 font-medium">
                  {getResultData().text}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleRetry}
                  className="px-8 py-4 bg-black border border-stone-700 hover:border-red-500/50 text-white rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 hover:bg-red-950/20"
                >
                  <RefreshCcw size={18} /> Làm lại
                </button>
                {onReviewTheory && (
                  <button
                    onClick={onReviewTheory}
                    className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                  >
                    <BookOpen size={18} /> Ôn lý thuyết
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeTest;
