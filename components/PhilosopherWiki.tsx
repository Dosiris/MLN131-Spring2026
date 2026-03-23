import React, { useState } from 'react';
import { Book, ChevronDown, CheckCircle2, Home, MapPin, Settings2, Construction, RefreshCcw } from 'lucide-react';

type TopicKey = 'ALL' | 'KHAI_NIEM' | 'VI_TRI' | 'CHUC_NANG' | 'CO_SO' | 'BIEN_DOI';

interface AccordionItemData {
    id: string;
    title: string;
    topic: TopicKey;
    icon: string;
    content: {
        title1: string;
        text1: string | string[];
        title2?: string;
        text2?: string | string[];
        title3?: string;
        text3?: string | string[];
        noteTitle?: string;
        noteText?: string | string[];
        isWarning?: boolean;
    };
}

const accordionData: AccordionItemData[] = [
    // NHÓM 1 — KHÁI NIỆM GIA ĐÌNH
    {
        id: '1.1',
        topic: 'KHAI_NIEM',
        icon: '💍',
        title: 'Quan hệ Hôn nhân là gì?',
        content: {
            title1: 'ĐỊNH NGHĨA',
            text1: 'Là cơ sở pháp lý hình thành gia đình. Xuất phát từ tình yêu tự nguyện giữa nam và nữ, được Nhà nước thừa nhận và bảo vệ bằng pháp luật.',
            title2: 'VAI TRÒ',
            text2: '→ Là nền tảng để các quan hệ khác trong gia đình được xác lập (huyết thống, nuôi dưỡng).',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Hôn nhân ≠ tình yêu. Tình yêu là riêng tư, hôn nhân là quan hệ xã hội có pháp lý.',
            isWarning: true
        }
    },
    {
        id: '1.2',
        topic: 'KHAI_NIEM',
        icon: '🩸',
        title: 'Quan hệ Huyết thống là gì?',
        content: {
            title1: 'ĐỊNH NGHĨA',
            text1: 'Quan hệ giữa những người cùng dòng máu: cha mẹ, con cái, ông bà, anh chị em. Nảy sinh từ quan hệ hôn nhân.',
            title2: 'VAI TRÒ',
            text2: '→ Là sợi dây tự nhiên gắn kết mạnh mẽ nhất trong gia đình.',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Ngày nay VN còn thừa nhận quan hệ cha mẹ nuôi — con nuôi (có thủ tục pháp lý) trong quan hệ gia đình.',
            isWarning: true
        }
    },
    {
        id: '1.3',
        topic: 'KHAI_NIEM',
        icon: '🤝',
        title: 'Quan hệ Nuôi dưỡng là gì?',
        content: {
            title1: 'ĐỊNH NGHĨA',
            text1: 'Sự quan tâm chăm sóc giữa các thành viên cả về vật chất lẫn tinh thần. Vừa là trách nhiệm đạo lý, vừa là quyền lợi thiêng liêng.',
            title2: 'VAI TRÒ',
            text2: '→ Xã hội hiện đại có thể chia sẻ nhưng KHÔNG thể thay thế hoàn toàn quan hệ nuôi dưỡng trong gia đình.',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Đây là mối quan hệ phát sinh từ cả hôn nhân lẫn huyết thống — không phải quan hệ độc lập.',
            isWarning: true
        }
    },
    {
        id: '1.4',
        topic: 'KHAI_NIEM',
        icon: '📜',
        title: 'Định nghĩa tổng hợp về Gia đình?',
        content: {
            title1: 'ĐỊNH NGHĨA ĐẦY ĐỦ',
            text1: 'Gia đình là hình thức cộng đồng xã hội đặc biệt, hình thành và duy trì dựa trên quan hệ hôn nhân, huyết thống và nuôi dưỡng — cùng với các quyền, nghĩa vụ của các thành viên được pháp luật và đạo lý quy định.',
            title2: 'TỪ KHÓA CẦN NHỚ',
            text2: [
                '→ Cộng đồng xã hội ĐẶC BIỆT',
                '→ 3 quan hệ: HN + HT + ND',
                '→ Quyền & nghĩa vụ pháp lý'
            ]
        }
    },

    // NHÓM 2 — VỊ TRÍ CỦA GIA ĐÌNH
    {
        id: '2.1',
        topic: 'VI_TRI',
        icon: '🧬',
        title: 'Gia đình là "tế bào của xã hội" — giải thích?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Gia đình là đơn vị cơ sở tạo nên cơ thể xã hội — tái sản xuất ra con người, cung cấp sức lao động. Không có gia đình, xã hội không thể tồn tại và phát triển.',
            title2: 'DẪN CHỨNG',
            text2: '"Nhiều gia đình cộng lại mới thành xã hội... Hạt nhân của xã hội chính là gia đình." — Chủ tịch Hồ Chí Minh',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Mức độ tác động của gia đình với XH phụ thuộc vào bản chất từng chế độ xã hội — không hoàn toàn giống nhau qua các thời kỳ lịch sử.',
            isWarning: true
        }
    },
    {
        id: '2.2',
        topic: 'VI_TRI',
        icon: '🏠',
        title: 'Gia đình là "tổ ấm" — giải thích?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Môi trường tốt nhất để mỗi người được yêu thương, nuôi dưỡng và phát triển nhân cách. Hạnh phúc gia đình là tiền đề để cá nhân cống hiến cho XH.',
            title2: 'Ý NGHĨA',
            text2: '→ Chỉ khi yên ấm trong gia đình, cá nhân mới có động lực phấn đấu trở thành công dân tốt cho xã hội.'
        }
    },
    {
        id: '2.3',
        topic: 'VI_TRI',
        icon: '🌉',
        title: 'Gia đình là "cầu nối cá nhân ↔ xã hội" — giải thích?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Gia đình là cộng đồng đầu tiên mỗi cá nhân sinh sống — nơi học quan hệ xã hội đầu tiên. Xã hội tác động đến cá nhân thông qua gia đình và ngược lại.',
            title2: 'HAI CHIỀU TÁC ĐỘNG',
            text2: [
                '→ CÁ NHÂN → GĐ → XÃ HỘI',
                '→ XÃ HỘI → GĐ → CÁ NHÂN'
            ],
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Không có cá nhân bên ngoài gia đình, cũng không thể có cá nhân bên ngoài xã hội.',
            isWarning: true
        }
    },

    // NHÓM 3 — CHỨC NĂNG GIA ĐÌNH
    {
        id: '3.1',
        topic: 'CHUC_NANG',
        icon: '👶',
        title: 'Chức năng Tái sản xuất ra con người?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Chức năng đặc thù, không cộng đồng nào thay thế. Đáp ứng nhu cầu duy trì nòi giống và cung cấp sức lao động. Thực hiện chủ động, có kế hoạch theo chính sách Nhà nước.',
            title2: 'THỰC TIỄN VIỆT NAM',
            text2: [
                '1970–2000: Sinh 1–2 con → kiểm soát bùng nổ dân số',
                '2020–nay: Sinh đủ 2 con → ứng phó già hóa dân số'
            ],
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Đây là vấn đề xã hội, không chỉ là việc riêng gia đình.',
            isWarning: true
        }
    },
    {
        id: '3.2',
        topic: 'CHUC_NANG',
        icon: '📚',
        title: 'Chức năng Nuôi dưỡng & Giáo dục?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Gia đình là môi trường giáo dục đầu tiên và quan trọng nhất. Những hiểu biết đầu tiên từ gia đình để lại dấu ấn sâu đậm, bền vững suốt cuộc đời.',
            title2: 'MỐI QUAN HỆ',
            text2: [
                'GĐ dạy → Nhà trường bổ sung → Xã hội hoàn thiện',
                '→ Không thể tách rời hoặc thay thế lẫn nhau.'
            ],
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Tránh 2 cực đoan: coi trọng GĐ hạ thấp XH và ngược lại.',
            isWarning: true
        }
    },
    {
        id: '3.3',
        topic: 'CHUC_NANG',
        icon: '💰',
        title: 'Chức năng Kinh tế & Tổ chức tiêu dùng?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Gia đình vừa là đơn vị sản xuất, vừa là đơn vị tiêu dùng — và là đơn vị DUY NHẤT tái sản xuất ra sức lao động cho toàn xã hội.',
            title2: 'BƯỚC CHUYỂN KINH TẾ HỘ GĐ',
            text2: [
                'Tự cấp tự túc',
                '→ Kinh tế hàng hóa',
                '→ Kinh tế thị trường toàn cầu'
            ],
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Điểm đặc thù: tái SX sức lao động — không đơn vị kinh tế nào khác làm được điều này.',
            isWarning: true
        }
    },
    {
        id: '3.4',
        topic: 'CHUC_NANG',
        icon: '💞',
        title: 'Chức năng Thỏa mãn nhu cầu Tâm sinh lý?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Gia đình là chỗ dựa tình cảm — nơi cân bằng tâm lý, chăm sóc người ốm, người già, trẻ nhỏ. Là chức năng thường xuyên, liên tục.',
            title2: 'THỰC TIỄN VN HIỆN NAY',
            text2: [
                '→ GĐ nhỏ: ít thời gian nhau',
                '→ Người già: đối mặt cô đơn',
                '→ Con một: thiếu tình cảm anh chị em'
            ],
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Khi tình cảm GĐ rạn nứt, quan hệ xã hội cũng có nguy cơ đổ vỡ theo.',
            isWarning: true
        }
    },

    // NHÓM 4 — CƠ SỞ XÂY DỰNG GIA ĐÌNH
    {
        id: '4.1',
        topic: 'CO_SO',
        icon: '🏭',
        title: 'Cơ sở Kinh tế – Xã hội?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Xóa bỏ chế độ tư hữu về tư liệu sản xuất = xóa gốc rễ bất bình đẳng trong gia đình. Phụ nữ tham gia lao động XH bình đẳng. Hôn nhân dựa trên tình yêu, không phải tính toán kinh tế hay địa vị xã hội.',
            title2: 'DẪN CHỨNG',
            text2: 'Lênin: "Bước thứ hai và là bước chủ yếu là thủ tiêu chế độ tư hữu về ruộng đất, công xưởng và nhà máy."',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Đây là cơ sở NỀN TẢNG nhất — quyết định các cơ sở khác.',
            isWarning: true
        }
    },
    {
        id: '4.2',
        topic: 'CO_SO',
        icon: '⚖️',
        title: 'Cơ sở Chính trị – Xã hội?',
        content: {
            title1: 'NỘI DUNG',
            text1: 'Nhà nước XHCN lần đầu tiên trong lịch sử xóa bỏ toàn bộ đặc quyền của đàn ông, đảm bảo bình đẳng giới thực sự. Luật HN&GĐ + hệ thống chính sách XH bảo vệ hạnh phúc GĐ.',
            title2: 'DẪN CHỨNG',
            text2: 'Lênin: "Chính quyền Xô viết là chính quyền đầu tiên và duy nhất trên thế giới đã hoàn toàn thủ tiêu tất cả pháp luật cũ kỹ... đặt người phụ nữ vào tình trạng không bình đẳng."',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Hệ thống pháp luật chưa hoàn thiện → xây dựng GĐ còn hạn chế.',
            isWarning: true
        }
    },
    {
        id: '4.3',
        topic: 'CO_SO',
        icon: '💒',
        title: 'Chế độ Hôn nhân Tiến bộ — 3 nguyên tắc?',
        content: {
            title1: 'NGUYÊN TẮC 1: TỰ NGUYỆN',
            text1: 'Hôn nhân xuất phát từ tình yêu, không áp đặt. Có quyền tự do kết hôn VÀ tự do ly hôn khi tình yêu không còn.',
            title2: 'NGUYÊN TẮC 2: MỘT VỢ MỘT CHỒNG',
            text2: 'Bình đẳng thực sự CẢ HAI phía — không chỉ ràng buộc phía người vợ như xã hội cũ.',
            title3: 'NGUYÊN TẮC 3: ĐẢM BẢO PHÁP LÝ',
            text3: 'Được Nhà nước thừa nhận và bảo vệ quyền lợi các bên.',
            noteTitle: 'LƯU Ý ÔN THI',
            noteText: '⚡ Hôn nhân tiến bộ KHÔNG khuyến khích ly hôn — nhưng thừa nhận quyền ly hôn khi tình yêu thực sự không còn.',
            isWarning: true
        }
    },

    // NHÓM 5 — BIẾN ĐỔI & PHƯƠNG HƯỚNG
    {
        id: '5.1',
        topic: 'BIEN_DOI',
        icon: '🔄',
        title: 'Xu hướng biến đổi chính của gia đình VN hiện nay?',
        content: {
            title1: 'QUY MÔ',
            text1: 'Gia đình hạt nhân (2 thế hệ, 1–2 con) thay thế gia đình truyền thống nhiều thế hệ.',
            title2: 'CHỨC NĂNG',
            text2: 'GĐ chuyển từ đơn vị kinh tế → đơn vị tình cảm là chính.',
            title3: 'QUAN HỆ',
            text3: 'Từ gia trưởng → bình đẳng. Mâu thuẫn thế hệ tăng lên.',
            noteTitle: 'BẢN CHẤT',
            noteText: '⚡ Đây là "gia đình quá độ" — không tan rã mà CHUYỂN HÓA từ nông nghiệp → công nghiệp.',
            isWarning: true
        }
    },
    {
        id: '5.2',
        topic: 'BIEN_DOI',
        icon: '🇻🇳',
        title: '4 Phương hướng xây dựng gia đình VN?',
        content: {
            title1: '01 — TĂNG CƯỜNG LÃNH ĐẠO CỦA ĐẢNG',
            text1: 'Đưa mục tiêu xây dựng GĐ vào chiến lược phát triển KT–XH. GĐ là động lực của phát triển bền vững đất nước.',
            title2: '02 — PHÁT TRIỂN KINH TẾ HỘ GĐ',
            text2: 'Hỗ trợ GĐ chính sách, dân tộc ít người, vùng sâu vùng xa. Vay vốn, xóa đói giảm nghèo.',
            title3: '03 — KẾ THỪA & TIẾP THU',
            text3: 'Giữ: hiếu thảo, đùm bọc. Bỏ: hủ tục, bất bình đẳng. Tiếp thu: giá trị GĐ hiện đại',
            noteTitle: '04 — PHONG TRÀO GĐ VĂN HÓA',
            noteText: 'Tiêu chí: Ấm no – Hòa thuận – Tiến bộ – Hạnh phúc. Tránh bệnh thành tích, hình thức trong bình xét danh hiệu.',
            isWarning: false
        }
    }
];

const topics = [
    { key: 'ALL', label: 'TẤT CẢ' },
    { key: 'KHAI_NIEM', label: 'KHÁI NIỆM', icon: <Home size={14} /> },
    { key: 'VI_TRI', label: 'VỊ TRÍ', icon: <MapPin size={14} /> },
    { key: 'CHUC_NANG', label: 'CHỨC NĂNG', icon: <Settings2 size={14} /> },
    { key: 'CO_SO', label: 'CƠ SỞ', icon: <Construction size={14} /> },
    { key: 'BIEN_DOI', label: 'BIẾN ĐỔI & PHƯƠNG HƯỚNG', icon: <RefreshCcw size={14} /> },
];

const AccordionItem: React.FC<{ item: AccordionItemData; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className={`mb-4 rounded-xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-red-500/50 bg-black shadow-[0_0_15px_rgba(220,38,38,0.15)]' : 'border-red-900/30 bg-black/40 hover:border-red-500/30'}`}>

            {/* Header */}
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <h3 className={`font-bold md:text-lg transition-colors duration-300 ${isOpen ? 'text-red-400' : 'text-white/90 group-hover:text-white'}`}>
                        {item.title}
                    </h3>
                </div>
                <ChevronDown
                    className={`shrink-0 text-red-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>

            {/* Content */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-5 pt-0 border-t border-red-900/20 mt-1 space-y-5">

                        {/* Box 1 */}
                        <div>
                            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                                <CheckCircle2 size={14} /> {item.content.title1}
                            </h4>
                            <div className="text-white/80 text-sm leading-relaxed pl-5 border-l-2 border-red-900/30">
                                {Array.isArray(item.content.text1) ? (
                                    <ul className="space-y-1">
                                        {item.content.text1.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                ) : (
                                    <p>{item.content.text1}</p>
                                )}
                            </div>
                        </div>

                        {/* Box 2 (Optional) */}
                        {item.content.title2 && item.content.text2 && (
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                                    <CheckCircle2 size={14} /> {item.content.title2}
                                </h4>
                                <div className="text-white/80 text-sm leading-relaxed pl-5 border-l-2 border-red-900/30">
                                    {Array.isArray(item.content.text2) ? (
                                        <ul className="space-y-1">
                                            {item.content.text2.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    ) : (
                                        <p>{item.content.text2}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Box 3 (Optional) */}
                        {item.content.title3 && item.content.text3 && (
                            <div>
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
                                    <CheckCircle2 size={14} /> {item.content.title3}
                                </h4>
                                <div className="text-white/80 text-sm leading-relaxed pl-5 border-l-2 border-red-900/30">
                                    {Array.isArray(item.content.text3) ? (
                                        <ul className="space-y-1">
                                            {item.content.text3.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    ) : (
                                        <p>{item.content.text3}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Note Box (Optional) */}
                        {item.content.noteTitle && item.content.noteText && (
                            <div className={`mt-4 p-4 rounded-lg bg-black/50 border ${item.content.isWarning ? 'border-yellow-900/50' : 'border-red-900/30'}`}>
                                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${item.content.isWarning ? 'text-yellow-500' : 'text-red-400'}`}>
                                    {item.content.noteTitle}
                                </h4>
                                <div className="text-white/70 text-sm italic">
                                    {Array.isArray(item.content.noteText) ? (
                                        <ul className="space-y-1">
                                            {item.content.noteText.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    ) : (
                                        <p>{item.content.noteText}</p>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

const TheoryReview: React.FC = () => {
    const [activeTopic, setActiveTopic] = useState<TopicKey>('ALL');
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredData = activeTopic === 'ALL'
        ? accordionData
        : accordionData.filter(item => item.topic === activeTopic);

    // Nhóm data theo các phần (để render tiêu đề từng phần nếu chọn 'ALL')
    const groupedData = topics.filter(t => t.key !== 'ALL').map(topic => ({
        ...topic,
        items: filteredData.filter(item => item.topic === topic.key)
    })).filter(group => group.items.length > 0);


    return (
        <section className="py-20 border-t border-red-900/30 min-h-screen relative" id="theory-review">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black pointer-events-none -z-10"></div>

            {/* Header Area */}
            <div className="max-w-4xl mx-auto px-4 mb-12 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-900/50 text-red-500 font-bold tracking-[0.2em] text-xs uppercase mb-6">
                    <Book size={14} /> THEORY REVIEW
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 text-glow">
                    ÔN LÝ <span className="text-red-600 border-b-4 border-red-600">THUYẾT</span>
                </h2>
                <p className="text-red-200/70 text-sm md:text-base font-medium tracking-wide font-mono">
          // Click từng mục để xem nội dung chi tiết · 5 chủ đề · {accordionData.length} nội dung
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-red-900/30">
                    {topics.map(topic => (
                        <button
                            key={topic.key}
                            onClick={() => setActiveTopic(topic.key as TopicKey)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${activeTopic === topic.key
                                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                                    : 'bg-black border border-red-900/30 text-red-400 hover:bg-red-950/50 hover:border-red-500/50'
                                }
              `}
                        >
                            {topic.icon} {topic.label}
                        </button>
                    ))}
                </div>

                {/* Accordions */}
                <div className="space-y-12">
                    {groupedData.map((group, gIdx) => (
                        <div key={group.key} className="animate-fadeIn" style={{ animationDelay: `${gIdx * 100}ms` }}>
                            {/* Group Title (Only show if ALL is selected to separate sections) */}
                            {activeTopic === 'ALL' && (
                                <div className="flex items-center gap-3 mb-6 mt-8">
                                    <div className="h-px bg-red-900/30 flex-1"></div>
                                    <h3 className="text-red-600 font-black uppercase tracking-widest text-sm bg-black px-4 py-1 border border-red-900/30 rounded-full flex items-center gap-2">
                                        {group.icon} NHÓM {gIdx + 1} — {group.label}
                                    </h3>
                                    <div className="h-px bg-red-900/30 flex-1"></div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {group.items.map((item) => (
                                    <AccordionItem
                                        key={item.id}
                                        item={item}
                                        isOpen={openItems.includes(item.id)}
                                        onClick={() => toggleItem(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {filteredData.length === 0 && (
                        <div className="text-center py-12 text-red-500/50 italic border border-dashed border-red-900/30 rounded-xl">
                            Không có dữ liệu cho chủ đề này.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TheoryReview;