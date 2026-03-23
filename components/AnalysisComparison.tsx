import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Landmark, TrendingUp, Gem, Award, Target, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TabData {
    id: string;
    num: string;
    title: string;
    icon: React.ReactNode;
    nature: string;
    measures: string[];
    colorClass: string;
    bgGlow: string;
}

const tabsData: TabData[] = [
    {
        id: 'lanh-dao',
        num: '01',
        title: 'LÃNH ĐẠO',
        icon: <Landmark size={28} />,
        nature: 'Đưa mục tiêu xây dựng gia đình vào chiến lược phát triển kinh tế–xã hội quốc gia. Gia đình là động lực quan trọng của phát triển bền vững trong thời kỳ công nghiệp hóa, hiện đại hóa đất nước.',
        measures: [
            'Nâng cao nhận thức toàn xã hội về vai trò gia đình',
            'Đưa vào kế hoạch của các bộ ngành, địa phương',
            'Tuyên truyền sâu rộng từ trung ương đến cơ sở'
        ],
        colorClass: 'text-red-500',
        bgGlow: 'bg-red-500/20'
    },
    {
        id: 'kinh-te',
        num: '02',
        title: 'KINH TẾ',
        icon: <TrendingUp size={28} />,
        nature: 'Nâng cao đời sống vật chất là nền tảng để gia đình thực hiện tốt các chức năng khác — giáo dục, tình cảm, văn hóa.',
        measures: [
            'Ưu tiên hỗ trợ gia đình chính sách, dân tộc ít người, vùng sâu vùng xa',
            'Tạo điều kiện vay vốn, xóa đói giảm nghèo',
            'Phát triển kinh tế trang trại, hỗ trợ sản xuất hàng xuất khẩu'
        ],
        colorClass: 'text-yellow-500',
        bgGlow: 'bg-yellow-500/20'
    },
    {
        id: 'van-hoa',
        num: '03',
        title: 'VĂN HÓA',
        icon: <Gem size={28} />,
        nature: 'Xây dựng gia đình Việt Nam hiện đại không có nghĩa là từ bỏ truyền thống — mà là giữ lại cái tốt, loại bỏ cái lạc hậu, tiếp thu có chọn lọc.',
        measures: [
            'Giữ gìn: Hiếu thảo, đùm bọc, trách nhiệm gia đình',
            'Loại bỏ: Hủ tục, bất bình đẳng giới, tư tưởng gia trưởng',
            'Tiếp thu: Giá trị gia đình hiện đại phù hợp với công nghiệp hóa và hội nhập quốc tế'
        ],
        colorClass: 'text-blue-400',
        bgGlow: 'bg-blue-500/20'
    },
    {
        id: 'phong-trao',
        num: '04',
        title: 'PHONG TRÀO',
        icon: <Award size={28} />,
        nature: 'Xây dựng gia đình: ẤM NO – HÒA THUẬN – TIẾN BỘ – HẠNH PHÚC. Phong trào hình thành từ những năm 60 tại Hưng Yên, nay phủ rộng toàn quốc.',
        measures: [
            'Tiêu chí thực chất, công bằng, dân chủ',
            'Tránh bệnh thành tích, chạy theo danh hiệu hình thức',
            'Nhân rộng mô hình gia đình văn hóa tiêu biểu',
            'Dự báo và giải quyết thách thức gia đình thời kỳ mới'
        ],
        colorClass: 'text-green-500',
        bgGlow: 'bg-green-500/20'
    }
];

const AnalysisComparison: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>(tabsData[0].id);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const activeData = tabsData.find(t => t.id === activeTab) || tabsData[0];

    const handleTabChange = (id: string) => {
        if (id === activeTab) return;

        gsap.to(contentRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            onComplete: () => {
                setActiveTab(id);
                gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3, clearProps: "all" });
                
                // Animate lists
                gsap.fromTo(".measure-item", 
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, stagger: 0.1, duration: 0.4, delay: 0.1 }
                );
            }
        });
    };

    // Ticker Animation
    useEffect(() => {
        gsap.to(".bottom-ticker", {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: "linear"
        });
    }, []);

    return (
        <section ref={containerRef} className="py-24 bg-black border-y border-red-900/30 relative overflow-hidden min-h-screen flex flex-col justify-center pb-32">
            {/* Background Glow based on Active Tab */}
            <div className={`absolute inset-0 opacity-10 pointer-events-none transition-colors duration-1000 ${activeData.bgGlow}`}
                style={{ backgroundImage: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)', color: 'inherit' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-900/50 text-red-500 font-bold tracking-[0.2em] text-xs uppercase">
                        <span>🇻🇳 BUILDING STRATEGY</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter text-glow">
                        4 PHƯƠNG HƯỚNG <span className="text-red-600 border-b-4 border-red-600">XÂY DỰNG</span>
                    </h2>
                    <p className="text-red-200/70 text-lg md:text-xl font-medium tracking-wide">
                        Định hướng phát triển gia đình VN trong thời kỳ quá độ
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Left: Desktop Tabs */}
                    <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar w-full lg:w-1/3 hide-scrollbar-mobile">
                        {tabsData.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center gap-4 p-4 md:p-6 text-left rounded-xl border transition-all duration-300 min-w-[280px] lg:min-w-0 group relative overflow-hidden flex-shrink-0 lg:flex-shrink
                                    ${activeTab === tab.id 
                                        ? `bg-red-950/60 border-${tab.colorClass.split('-')[1]}-500/50 shadow-[0_0_20px_rgba(220,38,38,0.15)]` 
                                        : 'bg-black/50 border-red-900/20 hover:bg-red-950/20 hover:border-red-900/50'
                                    }
                                `}
                            >
                                {/* Background Highlight */}
                                {activeTab === tab.id && (
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${tab.bgGlow.replace('/20', '').replace('/60', '')} bg-red-500`}></div>
                                )}
                                
                                <div className={`font-black text-3xl md:text-4xl opacity-20 transition-colors ${activeTab === tab.id ? tab.colorClass : 'text-red-500'}`}>
                                    {tab.num}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider transition-colors ${activeTab === tab.id ? 'text-white' : 'text-red-400'}`}>
                                        {tab.title}
                                    </h3>
                                </div>
                                <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 ' + tab.colorClass : 'text-red-900 opacity-50 group-hover:translate-x-1'}`}>
                                    {activeTab === tab.id ? tab.icon : <ChevronRight />}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: Content Area */}
                    <div className="w-full lg:w-2/3">
                        <div 
                            ref={contentRef}
                            className={`h-full bg-gradient-to-br from-red-950/20 to-black border border-red-900/30 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl backdrop-blur-sm`}
                        >
                            {/* Watermark Icon */}
                            <div className={`absolute -right-10 -bottom-10 opacity-5 drop-shadow-[0_0_50px_currentColor] scale-[3] pointer-events-none ${activeData.colorClass}`}>
                                {activeData.icon}
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Bản chất */}
                                <div className="mb-10">
                                    <h4 className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${activeData.colorClass.replace('text-', 'bg-')} animate-pulse`}></div>
                                        Bản chất
                                    </h4>
                                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium pl-6 border-l-2 border-red-800">
                                        {activeData.nature}
                                    </p>
                                </div>

                                {/* Biện pháp cụ thể */}
                                <div>
                                    <h4 className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 flex items-center gap-2">
                                        <Target size={16} /> Biện pháp cụ thể
                                    </h4>
                                    <ul className="space-y-4">
                                        {activeData.measures.map((measure, idx) => (
                                            <li key={idx} className="measure-item flex items-start gap-4 p-4 rounded-xl bg-red-900/10 border border-red-900/20 hover:bg-red-900/20 transition-colors">
                                                <div className={`mt-0.5 flex-shrink-0 ${activeData.colorClass}`}>
                                                    <CheckCircle2 size={24} />
                                                </div>
                                                <span className="text-red-100 text-base md:text-lg">
                                                    {measure.includes(':') ? (
                                                        <>
                                                            <strong className="text-white block sm:inline mr-2">{measure.split(':')[0]}:</strong>
                                                            {measure.split(':')[1]}
                                                        </>
                                                    ) : (
                                                        measure
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Ticker */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-red-950/80 border-t border-red-900/50 py-4 z-20 backdrop-blur-md">
                <div className="flex whitespace-nowrap bottom-ticker w-max">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center text-red-200/80 font-bold uppercase tracking-widest text-sm md:text-base mx-4">
                            Quy luật: <span className="text-red-500 mx-2">Lãnh đạo</span> → <span className="text-yellow-500 mx-2">Kinh tế</span> → <span className="text-blue-400 mx-2">Văn hóa</span> → <span className="text-green-500 mx-2">Phong trào</span>
                            <span className="text-red-700 mx-4">///</span>
                            <span className="text-white mx-2 font-black drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">GIA ĐÌNH VIỆT NAM VỮNG MẠNH TRONG THỜI ĐẠI MỚI</span>
                            <span className="text-red-700 mx-4">///</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .text-glow {
                    text-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
                }
                @media (max-width: 1024px) {
                    .hide-scrollbar-mobile {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    .hide-scrollbar-mobile::-webkit-scrollbar {
                        display: none;
                    }
                }
            `}} />
        </section>
    );
};

export default AnalysisComparison;