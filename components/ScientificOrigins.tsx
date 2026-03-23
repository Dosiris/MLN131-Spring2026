
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const ACCORDIONS = [
  {
    icon: '💍',
    title: 'QUAN HỆ HÔN NHÂN',
    content: 'Là cơ sở pháp lý hình thành gia đình. Hôn nhân xuất phát từ tình yêu tự nguyện giữa nam và nữ, được Nhà nước thừa nhận và bảo vệ bằng pháp luật. Đây là nền tảng để các quan hệ khác trong gia đình được xác lập.'
  },
  {
    icon: '🩸',
    title: 'QUAN HỆ HUYẾT THỐNG',
    content: 'Quan hệ giữa những người cùng dòng máu: cha mẹ, con cái, ông bà, anh chị em. Đây là sợi dây tự nhiên gắn kết mạnh mẽ nhất trong gia đình, nảy sinh từ quan hệ hôn nhân.'
  },
  {
    icon: '🤝',
    title: 'QUAN HỆ NUÔI DƯỠNG',
    content: 'Sự quan tâm chăm sóc giữa các thành viên — cả về vật chất lẫn tinh thần. Vừa là trách nhiệm đạo lý, vừa là quyền lợi thiêng liêng. Xã hội hiện đại có thể chia sẻ nhưng không thể thay thế hoàn toàn.'
  },
  {
    icon: '📜',
    title: 'ĐỊNH NGHĨA TỔNG HỢP',
    content: 'Gia đình là hình thức cộng đồng xã hội đặc biệt, hình thành và duy trì dựa trên quan hệ hôn nhân, huyết thống và nuôi dưỡng — cùng với các quyền, nghĩa vụ của các thành viên được pháp luật và đạo lý quy định.'
  }
];

const DIAGRAM_LAYERS = [
  {
    icon: '🌉',
    title: 'CẦU NỐI CÁ NHÂN ↔ XÃ HỘI',
    desc: 'Gia đình là cộng đồng đầu tiên mỗi cá nhân sinh sống. Xã hội tác động đến cá nhân và cá nhân phản hồi xã hội — đều thông qua lăng kính gia đình.'
  },
  {
    icon: '🏠',
    title: 'TỔ ẤM CỦA CÁ NHÂN',
    desc: 'Môi trường tốt nhất để mỗi người được yêu thương, nuôi dưỡng và phát triển nhân cách. Hạnh phúc gia đình là tiền đề để cá nhân cống hiến cho xã hội.'
  },
  {
    icon: '🧬',
    title: 'TẾ BÀO CỦA XÃ HỘI',
    desc: 'Gia đình là đơn vị cơ sở tạo nên cơ thể xã hội. Không có gia đình tái tạo con người, xã hội không thể tồn tại.\n"Hạt nhân của xã hội chính là gia đình." — Chủ tịch Hồ Chí Minh'
  }
];

const ScientificOrigins: React.FC = () => {
  const [tab, setTab] = useState<'concept' | 'position'>('concept');
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section className="py-20 min-h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Badge */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🏠</span>
        <span className="font-bold text-xs uppercase tracking-widest bg-red-900/40 text-red-200 px-3 py-1 rounded-full border border-red-700">Family Foundation</span>
      </div>

      {/* Title & Subtitle */}
      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter text-glow mb-2 text-center">GIẢI MÃ <span className="text-red-600">GIA ĐÌNH</span></h2>
      <div className="text-red-400/80 text-lg mb-10 text-center"> Cấu trúc nền tảng xã hội</div>

      {/* Tabs */}
      <div className="flex gap-4 mb-10">
        <button onClick={() => setTab('concept')} className={`px-6 py-2 rounded-full font-bold uppercase text-sm border-2 transition-all ${tab==='concept' ? 'bg-red-600 text-white border-red-600' : 'bg-black text-red-400 border-red-800 hover:bg-red-900/30'}`}>Khái niệm</button>
        <button onClick={() => setTab('position')} className={`px-6 py-2 rounded-full font-bold uppercase text-sm border-2 transition-all ${tab==='position' ? 'bg-red-600 text-white border-red-600' : 'bg-black text-red-400 border-red-800 hover:bg-red-900/30'}`}>Vị trí</button>
      </div>

      {/* Tab Content */}
      {tab === 'concept' ? (
        <div className="w-full max-w-2xl mx-auto space-y-4">
          {ACCORDIONS.map((item, idx) => (
            <div key={idx} className="bg-black/80 border border-red-900/40 rounded-xl overflow-hidden shadow-lg">
              <button
                className="w-full flex items-center gap-3 px-6 py-4 text-left text-lg font-bold text-white hover:bg-red-900/20 transition-all"
                onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.title}</span>
                <span className="ml-auto text-red-400">{openAccordion === idx ? '−' : '+'}</span>
              </button>
              {openAccordion === idx && (
                <div className="px-6 pb-5 text-stone-200 text-base animate-fade-in">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-end mb-8">
            {DIAGRAM_LAYERS.map((layer, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLayer(idx)}
                className={`flex-1 cursor-pointer rounded-xl border-2 p-6 transition-all duration-300 flex flex-col items-center gap-3 ${activeLayer === idx ? 'bg-red-900/30 border-red-600 scale-105 shadow-lg' : 'bg-black/70 border-red-900 hover:border-red-600'}`}
              >
                <div className="text-3xl mb-2">{layer.icon}</div>
                <div className="font-bold text-lg text-white text-center mb-1">{layer.title}</div>
                <div className="text-stone-300 text-center text-base whitespace-pre-line min-h-[80px]">{layer.desc.split('\n').map((line, i) => <div key={i}>{line}</div>)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ScientificOrigins;