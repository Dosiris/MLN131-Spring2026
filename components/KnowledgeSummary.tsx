import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowLeft, BookOpen, Brain, TrendingUp, Globe, Calendar, AlertTriangle, Flag, Star, Milestone, Shield, Users, Sparkles, Bot, CheckCircle2, X, Target } from 'lucide-react';
import KnowledgeTest from './KnowledgeTest';
import PhilosopherWiki from './PhilosopherWiki';

// Dữ liệu sự kiện lịch sử
const historicalEvents = [
  {
    id: 1,
    year: "1848",
    title: "Tuyên ngôn của Đảng Cộng sản",
    shortDesc: "Mác và Ăngghen công bố văn kiện lịch sử, đánh dấu sự ra đời của CNXH khoa học.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv2JNLRVNIc9VYWhEDpWSeCUFtXFSSu_5iaQ&s",
    color: "yellow",
    details: {
      background: "Cuộc cách mạng công nghiệp đã tạo ra giai cấp công nhân đông đảo nhưng bị bóc lột nặng nề. Phong trào công nhân nổ ra khắp châu Âu nhưng thiếu lý luận khoa học dẫn đường.",
      content: "Tuyên ngôn của Đảng Cộng sản được viết bởi Karl Marx và Friedrich Engels theo yêu cầu của Liên đoàn những người Cộng sản. Văn kiện này lần đầu tiên trình bày một cách hệ thống thế giới quan mới - chủ nghĩa duy vật biện chứng và chủ nghĩa duy vật lịch sử.",
      significance: [
        "Đánh dấu sự ra đời của CNXH khoa học",
        "Chỉ ra sứ mệnh lịch sử của giai cấp công nhân",
        "Đề ra khẩu hiệu bất hủ: 'Vô sản toàn thế giới, liên hiệp lại!'",
        "Trở thành cương lĩnh đầu tiên của phong trào cộng sản quốc tế"
      ],
      quote: "Lịch sử tất cả các xã hội tồn tại từ trước đến nay chỉ là lịch sử đấu tranh giai cấp."
    }
  },
  {
    id: 2,
    year: "1871",
    title: "Công xã Paris",
    shortDesc: "Nhà nước vô sản đầu tiên trong lịch sử (tồn tại 72 ngày).",
    image: "https://lyluanchinhtrivatruyenthong.vn/resize/900x506/uploads/news/2022/02/25/kim-dung-dung.jpg",
    color: "yellow",
    details: {
      background: "Sau thất bại của Pháp trong chiến tranh Pháp-Phổ, nhân dân Paris nổi dậy chống lại chính phủ tư sản đầu hàng. Ngày 18/3/1871, công nhân Paris đã chiếm giữ thành phố.",
      content: "Công xã Paris là chính quyền cách mạng đầu tiên của giai cấp công nhân, tồn tại từ 18/3 đến 28/5/1871. Dù chỉ tồn tại 72 ngày, Công xã đã thực hiện nhiều chính sách tiến bộ: tách nhà thờ khỏi nhà nước, giáo dục miễn phí bắt buộc, kiểm soát giá cả...",
      significance: [
        "Nhà nước kiểu mới đầu tiên của giai cấp vô sản",
        "Bài học về việc phải đập tan bộ máy nhà nước tư sản",
        "Chứng minh khả năng tự quản lý của giai cấp công nhân",
        "Marx rút ra những bài học quý cho phong trào cách mạng"
      ],
      quote: "Công xã Paris sẽ mãi mãi được ca ngợi như kẻ báo hiệu vinh quang của xã hội mới."
    }
  },
  {
    id: 3,
    year: "1917",
    title: "Cách mạng Tháng Mười Nga",
    shortDesc: "Lênin lãnh đạo giai cấp công nhân Nga giành chính quyền, mở ra thời đại mới.",
    image: "https://quocphongthudo.vn/upload/2001606/fck/10n.jpg",
    color: "red",
    details: {
      background: "Nước Nga Sa hoàng rơi vào khủng hoảng sâu sắc do chiến tranh thế giới thứ nhất. Giai cấp công nhân và nông dân Nga sống trong cảnh đói khổ, bất công. Đảng Bolshevik do Lênin lãnh đạo đã chuẩn bị chu đáo cho cuộc khởi nghĩa.",
      content: "Đêm 25 rạng ngày 26/10/1917 (theo lịch cũ, tức 7/11 theo lịch mới), Đảng Bolshevik lãnh đạo công nhân, binh lính khởi nghĩa chiếm Cung điện Mùa Đông, lật đổ Chính phủ lâm thời tư sản. Đây là cuộc cách mạng xã hội chủ nghĩa thắng lợi đầu tiên trên thế giới.",
      significance: [
        "Cách mạng XHCN thắng lợi đầu tiên trên thế giới",
        "Mở ra thời đại quá độ từ CNTB lên CNXH",
        "Chứng minh sức mạnh của liên minh công-nông",
        "Lênin phát triển chủ nghĩa Mác thành chủ nghĩa Mác-Lênin"
      ],
      quote: "Cách mạng Tháng Mười như tiếng sấm rền báo hiệu mùa xuân cho nhân loại."
    }
  },
  {
    id: 4,
    year: "1930",
    title: "Đảng Cộng sản Việt Nam ra đời",
    shortDesc: "Nguyễn Ái Quốc sáng lập Đảng, mở ra bước ngoặt của cách mạng Việt Nam.",
    image: "https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785fa9dfc6a9e4c7de23ad95be575b5ef89065de8bb227dec2a5b0c3ddabe79beae0fa0c5ba1fd1ea0bbf6e584495447262faea6843d5c792cba7b30f8a8d97404a73333bf318c8994ec7682e22ef4d6f968117f6129c505379f49fda687608448033a2b5406db78b12cb3ab3c4f62729e8a74f6b1bfe70b3203772c7979020cefa/dang_cong_san_viet_nam_ra_doi__buoc_ngoat_to_lon_trong_lich_su_cach_mang_viet_nam__4352194_1.jpg",
    color: "yellow",
    details: {
      background: "Cuối thế kỷ 19, thực dân Pháp xâm lược và đô hộ Việt Nam. Nhiều phong trào yêu nước nổ ra nhưng đều thất bại do thiếu đường lối đúng đắn. Nguyễn Ái Quốc (Hồ Chí Minh) đã tìm ra con đường cách mạng vô sản.",
      content: "Ngày 3/2/1930, tại Hương Cảng (Trung Quốc), Nguyễn Ái Quốc triệu tập Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng Cộng sản Việt Nam. Đây là sự kiện đánh dấu bước ngoặt vĩ đại trong lịch sử dân tộc.",
      significance: [
        "Chấm dứt thời kỳ khủng hoảng về đường lối cứu nước",
        "Kết hợp CN Mác-Lênin với phong trào công nhân và yêu nước",
        "Giai cấp công nhân VN có đội tiền phong lãnh đạo",
        "Cách mạng VN trở thành một bộ phận của cách mạng thế giới"
      ],
      quote: "Đảng ta là đạo đức, là văn minh."
    }
  },
  {
    id: 5,
    year: "1945",
    title: "Cách mạng Tháng Tám",
    shortDesc: "Nhân dân Việt Nam giành chính quyền, lập nên nước Việt Nam Dân chủ Cộng hòa.",
    image: "https://moha.gov.vn/Media_Share/BoNoiVu/PublishingImages/TinTuc/NoiDung/2025/7/16-37-16-29-07-2025-anh-2_1.jpg",
    color: "yellow",
    details: {
      background: "Chiến tranh thế giới thứ 2 kết thúc, phát xít Nhật đầu hàng. Thời cơ 'ngàn năm có một' đã đến. Đảng và Chủ tịch Hồ Chí Minh kịp thời phát động Tổng khởi nghĩa trên cả nước.",
      content: "Từ ngày 14 đến 28/8/1945, dưới sự lãnh đạo của Đảng và Chủ tịch Hồ Chí Minh, nhân dân ta đã nhất loạt nổi dậy giành chính quyền trên toàn quốc. Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
      significance: [
        "Xóa bỏ chế độ phong kiến và ách đô hộ của thực dân",
        "Lập nên nhà nước công nông đầu tiên ở Đông Nam Á",
        "Mở ra kỷ nguyên độc lập, tự do cho dân tộc Việt Nam",
        "Cổ vũ phong trào giải phóng dân tộc trên toàn thế giới"
      ],
      quote: "Không có gì quý hơn độc lập, tự do."
    }
  }
];

interface KnowledgeSummaryProps {
  onBack: () => void;
  onTransparency: () => void;
}

const KnowledgeSummary: React.FC<KnowledgeSummaryProps> = ({ onBack, onTransparency }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof historicalEvents[0] | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for sections
      gsap.from(".summary-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // Header animation
      gsap.from(".summary-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-red-500 p-6 md:p-12 relative overflow-x-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #500000 0%, transparent 70%)' }}
      />

      {/* Navigation - Fixed Position */}
      <button
        onClick={onBack}
        className="summary-header fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-md border border-red-600 text-red-500 hover:bg-red-600 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm group shadow-[0_0_20px_rgba(220,38,38,0.2)] rounded-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Quay về trải nghiệm
      </button>

      <div className="max-w-6xl mx-auto pt-16 md:pt-12">

        <div id="summary-intro" className="space-y-16 mb-24 relative">

          {/* Main Title Area */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-900/50 text-red-500 font-bold tracking-[0.2em] text-xs uppercase mx-auto">
              <Globe size={14} /> KNOWLEDGE MAP
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter text-glow">
              SƠ ĐỒ <span className="text-red-600 border-b-4 border-red-600">TƯ DUY</span>
            </h2>
            <p className="text-red-200/70 text-lg md:text-xl font-medium tracking-wide font-mono">
              // Toàn bộ Chương 7 trong một tầm nhìn
            </p>
          </div>

          {/* Central Node & Branches Container */}
          <div className="relative py-20 flex flex-col items-center justify-center min-h-[600px]">

            {/* Background Lines connecting to center (Decorative) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 hidden md:block" style={{ zIndex: 0 }}>
              {/* Lines from center to nodes - approximations based on visual layout */}
              <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Central Node */}
            <div className="relative z-20 w-48 h-48 md:w-56 md:h-56 bg-red-600 rounded-full flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-black group cursor-pointer hover:scale-105 transition-transform duration-500 mb-12 md:mb-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase leading-tight drop-shadow-md z-10">
                GIA ĐÌNH
              </h3>
              <div className="w-12 h-1 bg-white/50 my-2 z-10"></div>
              <p className="text-white/90 font-bold text-sm uppercase px-4 z-10">
                TRONG THỜI KỲ QUÁ ĐỘ
              </p>
            </div>

            {/* Branches - Grid Layout for Mobile, Absolute for Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:block z-10 md:w-full md:h-[600px] relative">

              {/* Nhánh 1 */}
              <div className="mindmap-branch group bg-black/80 border border-blue-500/30 hover:border-blue-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-blue-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] md:absolute md:top-[12%] md:left-[15%] md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <span className="font-black">01</span>
                  </div>
                  <h4 className="text-blue-400 font-bold uppercase tracking-wider text-sm md:text-base">KHÁI NIỆM</h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-blue-500/30">
                  <span className="text-blue-500 shrink-0">→</span>
                  <p>Hôn nhân <span className="text-blue-500 mx-1">·</span> Huyết thống <span className="text-blue-500 mx-1">·</span> Nuôi dưỡng</p>
                </div>
              </div>

              {/* Nhánh 2 */}
              <div className="mindmap-branch group bg-black/80 border border-green-500/30 hover:border-green-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-green-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] md:absolute md:top-[5%] md:left-1/2 md:-translate-x-1/2 md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                    <span className="font-black">02</span>
                  </div>
                  <h4 className="text-green-400 font-bold uppercase tracking-wider text-sm md:text-base">VỊ TRÍ</h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-green-500/30">
                  <span className="text-green-500 shrink-0">→</span>
                  <p>Tế bào <span className="text-green-500 mx-1">·</span> Tổ ấm <span className="text-green-500 mx-1">·</span> Cầu nối</p>
                </div>
              </div>

              {/* Nhánh 3 */}
              <div className="mindmap-branch group bg-black/80 border border-yellow-500/30 hover:border-yellow-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-yellow-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] md:absolute md:top-[12%] md:right-[15%] md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0">
                    <span className="font-black">03</span>
                  </div>
                  <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-sm md:text-base">CHỨC NĂNG</h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-yellow-500/30">
                  <span className="text-yellow-500 shrink-0">→</span>
                  <p>Tái SX <span className="text-yellow-500 mx-1">·</span> Giáo dục <span className="text-yellow-500 mx-1">·</span> Kinh tế <span className="text-yellow-500 mx-1">·</span> Tâm sinh lý</p>
                </div>
              </div>

              {/* Nhánh 4 */}
              <div className="mindmap-branch group bg-black/80 border border-purple-500/30 hover:border-purple-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-purple-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] md:absolute md:bottom-[12%] md:left-[15%] md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <span className="font-black">04</span>
                  </div>
                  <h4 className="text-purple-400 font-bold uppercase tracking-wider text-sm md:text-base">CƠ SỞ XÂY DỰNG</h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-purple-500/30">
                  <span className="text-purple-500 shrink-0">→</span>
                  <p>Kinh tế <span className="text-purple-500 mx-1">·</span> Chính trị <span className="text-purple-500 mx-1">·</span> Văn hóa <span className="text-purple-500 mx-1">·</span> Hôn nhân</p>
                </div>
              </div>

              {/* Nhánh 5 */}
              <div className="mindmap-branch group bg-black/80 border border-orange-500/30 hover:border-orange-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-orange-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] md:absolute md:bottom-[5%] md:left-1/2 md:-translate-x-1/2 md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <span className="font-black">05</span>
                  </div>
                  <h4 className="text-orange-400 font-bold uppercase tracking-wider text-sm md:text-base">BIẾN ĐỔI VN</h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-orange-500/30">
                  <span className="text-orange-500 shrink-0">→</span>
                  <p>Quy mô <span className="text-orange-500 mx-1">·</span> Vợ chồng <span className="text-orange-500 mx-1">·</span> Giáo dục <span className="text-orange-500 mx-1">·</span> Kinh tế</p>
                </div>
              </div>

              {/* Nhánh 6 */}
              <div className="mindmap-branch group bg-black/80 border border-pink-500/30 hover:border-pink-500 p-5 rounded-xl cursor-pointer transition-all hover:bg-pink-950/30 hover:-translate-y-1 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] md:absolute md:bottom-[12%] md:right-[15%] md:w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                    <span className="font-black">06</span>
                  </div>
                  <h4 className="text-pink-400 font-bold uppercase tracking-wider text-sm md:text-base flex items-center gap-2">
                    PHƯƠNG HƯỚNG
                  </h4>
                </div>
                <div className="flex items-start gap-2 text-white/80 text-sm pl-2 border-l border-pink-500/30">
                  <span className="text-pink-500 shrink-0">→</span>
                  <p>4 định hướng của Đảng & Nhà nước</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Philosopher Wiki Section */}
        <div id="summary-philosophers" className="summary-card mb-24">
          <PhilosopherWiki />
        </div>

        {/* KNOWLEDGE TEST INTEGRATION */}
        <div id="summary-quiz" className="summary-card mt-24">
          <KnowledgeTest onReviewTheory={() => {
            const theorySection = document.getElementById('theory-review');
            if (theorySection) {
              theorySection.scrollIntoView({ behavior: 'smooth' });
            }
          }} />
        </div>

        {/* Historical Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <div
              className="relative bg-gradient-to-b from-yellow-950/30 to-black border border-yellow-900/50 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-yellow-900/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-yellow-600/20 hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Year badge */}
              <div className={`absolute top-4 left-4 px-4 py-2 ${selectedEvent.color === 'red' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'} text-lg font-black rounded-full border flex items-center gap-2`}>
                <Calendar className="w-4 h-4" /> {selectedEvent.year}
              </div>

              {/* Header Image */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-2xl md:text-3xl font-black text-white">{selectedEvent.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Background */}
                <div className="bg-yellow-950/20 border-l-4 border-yellow-600 p-4 rounded-r-lg">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Bối cảnh lịch sử
                  </h4>
                  <p className="text-stone-300 leading-relaxed">{selectedEvent.details.background}</p>
                </div>

                {/* Main content */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-3 flex items-center gap-2">
                    <Milestone className="w-4 h-4" /> Diễn biến sự kiện
                  </h4>
                  <p className="text-stone-300 leading-relaxed">{selectedEvent.details.content}</p>
                </div>

                {/* Significance */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" /> Ý nghĩa lịch sử
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.details.significance.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-stone-400">
                        <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <div className="pt-4 border-t border-stone-800">
                  <p className="text-center italic text-yellow-400 text-lg">
                    "{selectedEvent.details.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-24 text-center">
          <BookOpen size={48} className="mx-auto text-red-600 mb-6 animate-pulse" />
          <p className="text-red-400 italic mb-8">"Chủ nghĩa Mác không phải là một giáo điều, mà là kim chỉ nam cho hành động."</p>

          {/* Footer Button - Minh Bạch AI */}
          <button
            onClick={onTransparency}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-950/50 to-red-900/30 border border-red-900/50 rounded-full hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 group"
          >
            <Bot className="w-5 h-5 text-red-500 group-hover:text-red-400" />
            <span className="text-white font-bold uppercase text-sm tracking-wider">Minh Bạch AI & Tác Giả</span>
          </button>
          <p className="text-stone-500 text-xs mt-4">© 2025-2026 Nhóm 7 - Chủ nghĩa xã hội khoa học</p>
        </div>


      </div>
    </div>
  );
};

export default KnowledgeSummary;