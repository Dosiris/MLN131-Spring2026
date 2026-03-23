
import React, { useState } from 'react';

      const PAIRS = [
        {
          left: {
            label: 'Lý thuyết: Vai trò kinh tế quyết định gia đình',
            quote: '"Theo quan điểm duy vật, nhân tố\nquyết định trong lịch sử, quy cho\nđến cùng, là sản xuất và tái sản\nxuất ra đời sống trực tiếp."\n— Ph.Ăngghen',
          },
          right: {
            label: 'Hiện thực 2024: GIA ĐÌNH KÉP',
            summary: 'Gia đình Việt Nam hiện nay vừa là\nđơn vị sản xuất (hộ kinh doanh,\nlàm nông) vừa là đơn vị tiêu dùng\nquan trọng của nền kinh tế quốc dân.',
            detail: '→ NHẤN ĐỂ XEM CHI TIẾT',
          },
        },
        {
          left: {
            label: 'Lý thuyết: Giải phóng phụ nữ gắn liền với CNXH',
            quote: '"Nếu không giải phóng phụ nữ là\nxây dựng chủ nghĩa xã hội chỉ một nửa."\n— Chủ tịch Hồ Chí Minh',
          },
          right: {
            label: 'Hiện thực 2024: PHỤ NỮ VIỆT NAM',
            summary: 'Tỷ lệ phụ nữ tham gia Quốc hội VN\nđạt ~30% (2021–2026), cao hơn trung\nbình thế giới. Phụ nữ làm chủ doanh\nghiệp, tham gia lãnh đạo tăng mạnh.',
            detail: '→ NHẤN ĐỂ XEM CHI TIẾT',
          },
        },
        {
          left: {
            label: 'Lý thuyết: Hôn nhân phải dựa trên tình yêu',
            quote: '"Nếu chỉ riêng hôn nhân dựa trên\ncơ sở tình yêu mới hợp đạo đức,\nthì cũng chỉ riêng hôn nhân trong\nđó tình yêu được duy trì mới\nlà hợp đạo đức mà thôi."\n— Ph.Ăngghen',
          },
          right: {
            label: 'Hiện thực 2024: HÔN NHÂN VÀ LY HÔN',
            summary: 'Tỷ lệ ly hôn VN tăng gần 3 lần\ntrong 20 năm qua. Hôn nhân ngày\ncàng dựa trên tình yêu nhưng cũng\ndễ tan vỡ hơn khi tình yêu phai nhạt.',
            detail: '→ NHẤN ĐỂ XEM CHI TIẾT',
          },
        },
      ];

      const Timeline: React.FC = () => {
        const [toggle, setToggle] = useState<'theory' | 'reality'>('theory');

        return (
          <section className="py-20 bg-black relative overflow-hidden font-sans">
            {/* Badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-900 text-red-200 font-bold text-xs tracking-widest shadow border border-red-700">
                <span className="mr-2">🔄</span> BẢN ĐỒ ĐỐI CHIẾU
              </span>
            </div>
            {/* Title & Toggle */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">LÝ LUẬN  &  THỰC TIỄN</h2>
              <div className="flex justify-center items-center gap-4 mt-2">
                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${toggle === 'theory' ? 'text-yellow-300' : 'text-red-400'}`}>THẾ KỶ 19</span>
                <button
                  className="relative w-16 h-8 bg-red-900 rounded-full border-2 border-red-700 flex items-center transition-all duration-300 focus:outline-none"
                  onClick={() => setToggle(toggle === 'theory' ? 'reality' : 'theory')}
                  aria-label="Toggle theory/reality"
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-yellow-300 shadow-md transform transition-transform duration-300 ${toggle === 'reality' ? 'translate-x-8 bg-red-400' : ''}`}
                  ></span>
                </button>
                <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${toggle === 'reality' ? 'text-yellow-300' : 'text-red-400'}`}>VIỆT NAM 2024</span>
              </div>
            </div>

            {/* Comparison Pairs */}
            <div className="max-w-4xl mx-auto flex flex-col gap-12">
              {PAIRS.map((pair, idx) => (
                <div key={idx} className="relative bg-red-950/30 border border-red-900 rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Divider */}
                  <div className="absolute left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-red-700/60 to-red-900/10 rounded-full -translate-x-1/2 z-0 hidden md:block"></div>

                  {/* Left: Theory */}
                  <div className={`flex-1 flex flex-col justify-center items-center md:items-end text-right z-10 ${toggle === 'reality' ? 'opacity-60 grayscale' : ''}`}>
                    <div className="text-yellow-300 font-bold text-sm md:text-base uppercase mb-2">{pair.left.label}</div>
                    <div className="bg-black/60 border border-yellow-700 rounded-lg p-4 text-yellow-100 text-base md:text-lg font-sans whitespace-pre-line shadow-inner">
                      {pair.left.quote}
                    </div>
                  </div>

                  {/* Right: Reality */}
                  <div className={`flex-1 flex flex-col justify-center items-center md:items-start text-left z-10 ${toggle === 'theory' ? 'opacity-60 grayscale' : ''}`}>
                    <div className="text-red-300 font-bold text-sm md:text-base uppercase mb-2">{pair.right.label}</div>
                    <div className="bg-black/60 border border-red-700 rounded-lg p-4 text-red-100 text-base md:text-lg font-sans whitespace-pre-line shadow-inner mb-2">
                      {pair.right.summary}
                    </div>
                    <button className="text-xs text-yellow-300 font-bold uppercase tracking-wider hover:underline focus:outline-none">{pair.right.detail}</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      };

      export default Timeline;