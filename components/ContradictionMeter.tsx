
import React, { useState } from 'react';

const ACCORDIONS = [
  {
    key: 'kinhte',
    icon: '🏭',
    title: 'CƠ SỞ KINH TẾ – XÃ HỘI',
    content: (
      <>
        Xóa bỏ chế độ tư hữu về tư liệu sản xuất là xóa bỏ gốc rễ của bất bình đẳng trong gia đình.<br/>
        Người phụ nữ tham gia lao động xã hội bình đẳng.<br/>
        Hôn nhân dựa trên tình yêu — không phải tính toán kinh tế hay địa vị xã hội.
      </>
    )
  },
  {
    key: 'chinhtri',
    icon: '⚖️',
    title: 'CƠ SỞ CHÍNH TRỊ – XÃ HỘI',
    content: (
      <>
        Nhà nước XHCN — lần đầu tiên trong lịch sử — xóa bỏ toàn bộ đặc quyền của đàn ông, đảm bảo bình đẳng giới thực sự.<br/>
        Luật Hôn nhân và Gia đình cùng hệ thống chính sách xã hội bảo vệ hạnh phúc gia đình.
      </>
    )
  },
  {
    key: 'vanhoa',
    icon: '🎨',
    title: 'CƠ SỞ VĂN HÓA',
    content: (
      <>
        Hệ tư tưởng tiến bộ của giai cấp công nhân dần thay thế phong tục lạc hậu.<br/>
        Giáo dục, khoa học và công nghệ nâng cao dân trí — hình thành chuẩn mực và giá trị mới trong quan hệ gia đình.
      </>
    )
  },
  {
    key: 'honnhan',
    icon: '💒',
    title: 'CHẾ ĐỘ HÔN NHÂN TIẾN BỘ',
    content: (
      <>
        Ba nguyên tắc cốt lõi:<br/>
        • Tự nguyện — xuất phát từ tình yêu, không áp đặt<br/>
        • Một vợ một chồng — bình đẳng thực sự cả hai phía<br/>
        • Đảm bảo pháp lý — được Nhà nước thừa nhận, bảo vệ quyền lợi các bên
      </>
    )
  },
];

const DIAGRAM_LAYERS = [
  {
    icon: '💒',
    label: 'HÔN NHÂN TIẾN BỘ',
    desc: 'Biểu hiện trực tiếp nhất của gia đình mới XHCN',
  },
  {
    icon: '🎨',
    label: 'VĂN HÓA',
    desc: 'Hình thành nhận thức và chuẩn mực mới trong xã hội',
  },
  {
    icon: '⚖️',
    label: 'CHÍNH TRỊ',
    desc: 'Pháp luật & chính sách định hướng và bảo vệ',
  },
  {
    icon: '🏭',
    label: 'KINH TẾ (nền tảng)',
    desc: 'Xóa tư hữu = Xóa gốc rễ bất bình đẳng',
  },
];

const ContradictionMeter: React.FC = () => {
  const [tab, setTab] = useState('co-so');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-900 text-red-200 font-bold text-xs tracking-widest shadow border border-red-700">
          <span className="mr-2">🏗️</span> SOCIALIST FOUNDATION
        </span>
      </div>
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">CƠ SỞ XÂY DỰNG GIA ĐÌNH</h2>
        <div className="text-red-300 text-lg md:text-xl font-medium mb-2">// Bốn nền tảng của gia đình XHCN</div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        <button
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-red-500
            ${tab === 'co-so' ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-black text-red-400 border-red-700 hover:bg-red-900/40'}`}
          onClick={() => setTab('co-so')}
        >
          4 CƠ SỞ
        </button>
        <button
          className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-red-500
            ${tab === 'moi-quan-he' ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-black text-red-400 border-red-700 hover:bg-red-900/40'}`}
          onClick={() => setTab('moi-quan-he')}
        >
          MỐI QUAN HỆ
        </button>
      </div>

      {/* Tab 1: Accordion */}
      {tab === 'co-so' && (
        <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-900 rounded-lg shadow-lg p-6 mb-8">
          {ACCORDIONS.map((item, idx) => (
            <div key={item.key} className="mb-4 last:mb-0">
              <button
                className={`w-full flex items-center justify-between px-4 py-3 rounded font-bold text-left transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-red-500
                  ${open === item.key ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-black text-red-400 border-red-700 hover:bg-red-900/40'}`}
                onClick={() => setOpen(open === item.key ? null : item.key)}
              >
                <span className="mr-2 text-xl">{item.icon}</span> {item.title}
                <span className="ml-auto text-lg">{open === item.key ? '−' : '+'}</span>
              </button>
              {open === item.key && (
                <div className="p-4 text-base text-gray-100 leading-relaxed border-l-4 border-red-600 bg-black/40 mt-2">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Layered Diagram */}
      {tab === 'moi-quan-he' && (
        <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-900 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col items-center gap-4 mb-6">
            {DIAGRAM_LAYERS.map((layer, idx) => (
              <div key={layer.label} className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg border-2 ${idx === 0 ? 'border-red-400 bg-red-900/30' : idx === DIAGRAM_LAYERS.length-1 ? 'border-red-700 bg-black/30' : 'border-red-600 bg-black/20'}`}>
                <span className="text-2xl">{layer.icon}</span>
                <div>
                  <div className="font-bold text-red-200 uppercase text-sm">TẦNG {idx+1} — {layer.label}</div>
                  <div className="text-gray-200 text-sm">{layer.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 mt-6">
            <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
              <span>↑</span> <span>CHIỀU QUYẾT ĐỊNH</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
              <span>↓</span> <span>CHIỀU TÁC ĐỘNG NGƯỢC LẠI</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContradictionMeter;