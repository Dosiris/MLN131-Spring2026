import React, { useState } from 'react';

const CARDS = [
  {
    myth: {
      label: '⚠️ LẦM TƯỞNG PHỔ BIẾN #1',
      text: '"Gia đình XHCN xóa bỏ\nhôn nhân và gia đình truyền thống?"',
    },
    truth: {
      label: '✅ SỰ THẬT',
      text: 'KHÔNG PHẢI VẬY. CNXH không xóa bỏ gia đình mà NÂNG CẤP gia đình.\n\"Chúng ta không phá hủy gia đình\nmà giải phóng nó khỏi áp bức kinh\ntế và sự thống trị của nam giới.'
    }
  },
  {
    myth: {
      label: '⚠️ LẦM TƯỞNG PHỔ BIẾN #2',
      text: '"Phụ nữ bình đẳng rồi thì\nvai trò gia đình không còn\nquan trọng nữa?"',
    },
    truth: {
      label: '✅ SỰ THẬT',
      text: 'NGƯỢC LẠI HOÀN TOÀN. Bình đẳng giới làm gia đình MẠNH HƠN, không yếu đi.\n\nKhi cả vợ và chồng đều phát triển bản thân, đóng góp bình đẳng.'
    }
  },
  {
    myth: {
      label: '⚠️ LẦM TƯỞNG PHỔ BIẾN #3',
      text: '"Gia đình truyền thống Việt Nam\nđang biến mất hoàn toàn?"',
    },
    truth: {
      label: '✅ SỰ THẬT',
      text: 'KHÔNG BIẾN MẤT, MÀ ĐANG CHUYỂN HÓA. Gia đình Việt Nam đang ở giai đoạn "quá độ" — từ nông nghiệp truyền thống sang hiện đại công nghiệp.'
    }
  },
];

const SocialSimulator: React.FC = () => {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (idx: number) => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <section className="py-20 bg-black px-4 border-y border-red-900/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-10 text-center">
          PHÁ VỠ <span className="text-red-600">ĐỊNH KIẾN</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className="perspective"
            >
              <div
                className={`relative w-full h-[28rem] min-h-[24rem] max-w-md mx-auto transition-transform duration-700 transform-style-preserve-3d ${flipped[idx] ? 'rotate-y-180' : ''}`}
                onClick={() => handleFlip(idx)}
                tabIndex={0}
                role="button"
                aria-pressed={flipped[idx]}
                aria-label={flipped[idx] ? 'Xem lầm tưởng' : 'Xem sự thật'}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleFlip(idx)}
                style={{ cursor: 'pointer' }}
              >
                {/* Front */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center bg-red-950/60 border border-red-700 rounded-xl shadow-lg p-8 md:p-10 transition-opacity duration-300 ${flipped[idx] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ backfaceVisibility: 'hidden' }}>
                  <div className="text-yellow-300 font-bold text-base md:text-lg uppercase mb-4 tracking-widest">{card.myth.label}</div>
                  <div className="text-white text-xl md:text-2xl font-sans whitespace-pre-line text-center mb-8">{card.myth.text}</div>
                  <div className="mt-auto text-xs text-red-300 font-bold uppercase tracking-wider">[ LẬT ĐỂ TÌM SỰ THẬT ]</div>
                </div>
                {/* Back */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black border border-green-700 rounded-xl shadow-lg p-8 md:p-10 rotate-y-180 transition-opacity duration-300 ${flipped[idx] ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ backfaceVisibility: 'hidden' }}>
                  <div className="text-green-400 font-bold text-base md:text-lg uppercase mb-4 tracking-widest">{card.truth.label}</div>
                  <div className="text-white text-lg md:text-xl font-sans whitespace-pre-line text-center mb-8">{card.truth.text}</div>
                  <div className="mt-auto text-xs text-green-300 font-bold uppercase tracking-wider">[ LẬT ĐỂ XEM LẠI LẦM TƯỞNG ]</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .perspective { perspective: 1200px; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .transform-style-preserve-3d { transform-style: preserve-3d; }
        `}</style>
      </div>
    </section>
  );
};

export default SocialSimulator;