
import React, { useState } from 'react';

const TABS = [
  {
    key: 'reproduction',
    icon: '👶',
    label: 'TÁI SẢN XUẤT',
    title: '👶 TÁI SẢN XUẤT RA CON NGƯỜI',
    content: (
      <>
        <div className="font-bold text-red-400 mb-2">BẢN CHẤT CHỨC NĂNG:</div>
        <div className="mb-4">Chức năng đặc thù, không cộng đồng nào thay thế.<br/>Đáp ứng nhu cầu duy trì nòi giống và cung cấp sức lao động cho xã hội. Việc sinh con hiện nay được thực hiện chủ động, có kế hoạch.</div>
        <div className="font-bold text-red-400 mb-2">VÍ DỤ TRONG ĐỜI SỐNG:</div>
        <div className="mb-2">
          🇻🇳 <b>Chính sách → Thực tiễn</b><br/>
          1970–2000: Vận động sinh 1–2 con → Kiểm soát bùng nổ dân số<br/>
          2020–nay: Khuyến khích sinh đủ 2 con → Ứng phó già hóa dân số
        </div>
        <div className="italic text-sm text-gray-300 mb-2">Quy luật: Chức năng này phụ thuộc vào nhu cầu xã hội từng thời kỳ lịch sử</div>
      </>
    )
  },
  {
    key: 'education',
    icon: '📚',
    label: 'GIÁO DỤC',
    title: '📚 NUÔI DƯỠNG & GIÁO DỤC',
    content: (
      <>
        <div className="font-bold text-red-400 mb-2">BẢN CHẤT CHỨC NĂNG:</div>
        <div className="mb-4">Gia đình là môi trường giáo dục đầu tiên và quan trọng nhất. Những hiểu biết đầu tiên từ gia đình để lại dấu ấn sâu đậm, bền vững suốt cả cuộc đời.</div>
        <div className="font-bold text-red-400 mb-2">VÍ DỤ TRONG ĐỜI SỐNG:</div>
        <div className="mb-2">
          📖 Tri thức → Kỹ năng → Nhân cách<br/>
          Gia đình dạy → Nhà trường bổ sung → Xã hội hoàn thiện
        </div>
        <div className="italic text-sm text-gray-300 mb-2">→ Giáo dục gia đình là nền tảng. Nếu tách rời giáo dục xã hội, cá nhân khó hòa nhập. Nếu thiếu nền tảng gia đình, giáo dục xã hội không đạt hiệu quả tối đa.</div>
      </>
    )
  },
  {
    key: 'economy',
    icon: '💰',
    label: 'KINH TẾ',
    title: '💰 KINH TẾ & TỔ CHỨC TIÊU DÙNG',
    content: (
      <>
        <div className="font-bold text-red-400 mb-2">BẢN CHẤT CHỨC NĂNG:</div>
        <div className="mb-4">Gia đình vừa là đơn vị sản xuất, vừa là đơn vị tiêu dùng — và là đơn vị DUY NHẤT tái sản xuất ra sức lao động cho toàn xã hội.</div>
        <div className="font-bold text-red-400 mb-2">VÍ DỤ TRONG ĐỜI SỐNG:</div>
        <div className="mb-2">
          🔄 Bước 1: Tự cấp tự túc → Sản xuất để dùng trong gia đình<br/>
          🔄 Bước 2: Kinh tế hàng hóa → Sản xuất để đáp ứng thị trường quốc gia<br/>
          🔄 Bước 3: Kinh tế thị trường toàn cầu → Kinh tế hộ gia đình VN hội nhập quốc tế
        </div>
      </>
    )
  },
  {
    key: 'psychology',
    icon: '💞',
    label: 'TÂM SINH LÝ',
    title: '💞 THỎA MÃN NHU CẦU TÂM SINH LÝ',
    content: (
      <>
        <div className="font-bold text-red-400 mb-2">BẢN CHẤT CHỨC NĂNG:</div>
        <div className="mb-4">Gia đình là chỗ dựa tình cảm — nơi cân bằng tâm lý, chăm sóc người ốm, người già, trẻ nhỏ. Khi tình cảm gia đình rạn nứt, quan hệ xã hội cũng có nguy cơ đổ vỡ theo.</div>
        <div className="font-bold text-red-400 mb-2">VÍ DỤ TRONG ĐỜI SỐNG:</div>
        <div className="mb-2">
          ⚠️ Thực trạng VN hiện nay:<br/>
          - Gia đình nhỏ → ít thời gian cho nhau hơn<br/>
          - Người cao tuổi → đối mặt với cô đơn<br/>
          - Trẻ em một con → thiếu tình cảm anh chị em<br/>
          → Nhu cầu tình cảm tăng lên khi gia đình chuyển từ đơn vị kinh tế → đơn vị tình cảm
        </div>
      </>
    )
  },
];

const ConceptDecoder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('reproduction');

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-900 text-red-200 font-bold text-xs tracking-widest shadow border border-red-700">
          <span className="mr-2">⚙️</span> FAMILY FUNCTIONS
        </span>
      </div>
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">4 CHỨC NĂNG CỐT LÕI</h2>
        <div className="text-red-300 text-lg md:text-xl font-medium mb-2">Những vai trò không thể thay thế của gia đình</div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-red-500
              ${activeTab === tab.key ? 'bg-red-600 text-white border-red-600 shadow' : 'bg-black text-red-400 border-red-700 hover:bg-red-900/40'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion Content */}
      <div className="max-w-2xl mx-auto bg-red-950/30 border border-red-900 rounded-lg shadow-lg p-6 mb-8">
        <div className="text-xl md:text-2xl font-bold text-red-400 mb-4">{TABS.find(t => t.key === activeTab)?.title}</div>
        <div className="text-base text-gray-100 leading-relaxed">
          {TABS.find(t => t.key === activeTab)?.content}
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="w-full flex justify-center mt-8">
        <div className="bg-gradient-to-r from-red-900 via-black to-red-900 px-6 py-2 rounded-full text-xs md:text-sm text-red-200 font-mono tracking-widest shadow border border-red-700 animate-pulse">
          Quy luật: Tái sản xuất → Giáo dục → Kinh tế → Tình cảm → Tạo nên CON NGƯỜI TOÀN DIỆN
        </div>
      </div>
    </section>
  );
};

export default ConceptDecoder;