            import React from 'react';

            const TIMELINE = [
                    {
                        label: 'ĐIỂM MỐC 1  ●  TRƯỚC 1986',
                        period: 'Trước 1986',
                        items: [
                            {
                                icon: '🏠',
                                title: 'QUY MÔ & KẾT CẤU',
                                desc: 'Gia đình truyền thống 3–4 thế hệ\ncùng sống chung một mái nhà.\nĐông con, cha mẹ quyết định mọi việc.'
                            },
                            {
                                icon: '👨',
                                title: 'QUAN HỆ VỢ CHỒNG',
                                desc: '"Chồng chúa vợ tôi" — người đàn ông\nlà trụ cột duy nhất, nắm toàn bộ\nquyền lực và tài sản gia đình.'
                            },
                            {
                                icon: '📖',
                                title: 'GIÁO DỤC',
                                desc: 'Ông bà, cha mẹ dạy dỗ trực tiếp.\nGiáo dục đạo đức, ứng xử trong gia\nđình, dòng họ, làng xã là trọng tâm.'
                            },
                            {
                                icon: '💰',
                                title: 'KINH TẾ',
                                desc: 'Tự cấp tự túc — sản xuất để phục vụ\nnhu cầu của chính gia đình, ít tham\ngia thị trường bên ngoài.'
                            },
                        ]
                    },
                    {
                        label: 'ĐIỂM MỐC 2  ●  1986 – 2000  [ĐỔI MỚI]',
                        period: '1986 – 2000',
                        items: [
                            {
                                icon: '🏠',
                                title: 'QUY MÔ & KẾT CẤU',
                                desc: 'Gia đình hạt nhân 2 thế hệ bắt đầu\nphổ biến ở đô thị. Nhà nước vận động\nsinh 1–2 con, kiểm soát dân số.'
                            },
                            {
                                icon: '👨',
                                title: 'QUAN HỆ VỢ CHỒNG',
                                desc: 'Luật Hôn nhân & Gia đình 1986 ra đời —\nchính thức ghi nhận bình đẳng vợ chồng.\nPhụ nữ bắt đầu tham gia lao động xã hội.'
                            },
                            {
                                icon: '📖',
                                title: 'GIÁO DỤC',
                                desc: 'Hệ thống giáo dục xã hội mở rộng.\nNhà trường dần thay thế một phần vai\ntrò giáo dục trực tiếp của gia đình.'
                            },
                            {
                                icon: '💰',
                                title: 'KINH TẾ',
                                desc: 'Kinh tế hộ gia đình được thừa nhận.\nChuyển từ tự cấp → kinh tế hàng hóa,\ntham gia thị trường trong nước.'
                            },
                        ]
                    },
                    {
                        label: 'ĐIỂM MỐC 3  ●  2000 – 2015  [HỘI NHẬP]',
                        period: '2000 – 2015',
                        items: [
                            {
                                icon: '🏠',
                                title: 'QUY MÔ & KẾT CẤU',
                                desc: 'Gia đình hạt nhân quy mô nhỏ chiếm\nưu thế cả đô thị lẫn nông thôn.\nXuất hiện hộ đơn thân, sống thử.'
                            },
                            {
                                icon: '👨',
                                title: 'QUAN HỆ VỢ CHỒNG',
                                desc: 'Mô hình cùng làm chủ gia đình phổ biến.\nTỷ lệ ly hôn bắt đầu tăng rõ rệt.\nBạo lực gia đình được nhận diện và lên án.'
                            },
                            {
                                icon: '📖',
                                title: 'GIÁO DỤC',
                                desc: 'Đầu tư tài chính cho giáo dục con tăng\nmạnh. Nhưng thời gian cha mẹ dạy dỗ\ntrực tiếp giảm đáng kể.'
                            },
                            {
                                icon: '💰',
                                title: 'KINH TẾ',
                                desc: 'Kinh tế hộ gia đình hội nhập thị trường\ntoàn cầu. Phân hóa giàu nghèo sâu sắc\nhơn giữa các hộ gia đình.'
                            },
                        ]
                    },
                    {
                        label: 'ĐIỂM MỐC 4  ●  2015 – NAY  [KỶ NGUYÊN SỐ]',
                        period: '2015 – Nay',
                        items: [
                            {
                                icon: '🏠',
                                title: 'QUY MÔ & KẾT CẤU',
                                desc: 'Già hóa dân số — Nhà nước khuyến khích\nsinh đủ 2 con. Xuất hiện nhiều mô hình\ngia đình mới: đồng giới, đơn thân, xuyên quốc gia.'
                            },
                            {
                                icon: '👨',
                                title: 'QUAN HỆ VỢ CHỒNG',
                                desc: 'Bình đẳng giới được đề cao. Phụ nữ VN\ntham gia Quốc hội đạt ~30% (2021–2026).\nHôn nhân dựa nhiều hơn vào tình yêu\nvà hòa hợp tâm lý — nhưng cũng dễ tan vỡ hơn.'
                            },
                            {
                                icon: '📖',
                                title: 'GIÁO DỤC',
                                desc: 'Trẻ em tiếp cận công nghệ từ rất sớm.\nCha mẹ đầu tư học vấn cao nhưng lo ngại\nvề nghiện mạng xã hội, game, suy giảm\nđạo đức trong môi trường số.'
                            },
                            {
                                icon: '💰',
                                title: 'KINH TẾ',
                                desc: 'Kinh tế số, bán hàng online — hộ gia đình\ntham gia thương mại điện tử. Nhưng quy mô\nnhỏ, khó cạnh tranh với doanh nghiệp lớn\nvà nền tảng xuyên quốc gia.'
                            },
                        ]
                    },
                ];

                const SUMMARY = {
                    title: '⚡ QUY LUẬT BIẾN ĐỔI:',
                    desc: 'Gia đình Việt Nam đang trong giai đoạn "quá độ" — chuyển từ nông nghiệp truyền thống sang công nghiệp hiện đại.\nKhông phải tan rã — mà là CHUYỂN HÓA.'
                };

                const DialecticalFlow: React.FC = () => {
                    return (
                        <section className="py-20 bg-black relative overflow-hidden">
                            {/* Badge */}
                            <div className="flex justify-center mb-4">
                                <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-900 text-red-200 font-bold text-xs tracking-widest shadow border border-red-700">
                                    <span className="mr-2">📅</span> FAMILY TIMELINE
                                </span>
                            </div>
                            {/* Title & Subtitle */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl md:text-5xl font-black text-red-600 mb-2 uppercase tracking-tighter text-glow">BIẾN ĐỔI  GIA ĐÌNH VIỆT NAM</h2>
                                <div className="text-red-300 text-lg md:text-xl font-medium mb-2">// Hành trình chuyển đổi từ truyền thống → hiện đại</div>
                            </div>

                            {/* Timeline */}
                            <div className="max-w-3xl mx-auto relative">
                                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-700/60 to-red-900/10 rounded-full z-0" style={{transform: 'translateX(-50%)'}}></div>
                                <div className="relative z-10 flex flex-col gap-16">
                                    {TIMELINE.map((milestone, idx) => (
                                        <div key={milestone.label} className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                                            {/* Milestone label */}
                                            <div className="md:w-56 flex-shrink-0 flex flex-col items-center md:items-end text-right">
                                                <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">{milestone.label}</div>
                                            </div>
                                            {/* Milestone content */}
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {milestone.items.map((item, i) => (
                                                    <div key={item.title} className="bg-red-950/40 border border-red-900 rounded-lg shadow p-4 flex flex-col gap-2">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-2xl md:text-3xl">{item.icon}</span>
                                                            <span className="font-bold text-red-200 text-sm md:text-base uppercase tracking-wide">{item.title}</span>
                                                        </div>
                                                        <div className="text-red-300 text-xs md:text-sm whitespace-pre-line">{item.desc}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Banner */}
                            <div className="mt-20 flex justify-center">
                                <div className="bg-gradient-to-r from-red-800/80 to-red-900/80 border-2 border-red-700 rounded-xl shadow-lg px-8 py-6 max-w-2xl text-center">
                                    <div className="text-2xl md:text-3xl font-black text-yellow-300 mb-2">{SUMMARY.title}</div>
                                    <div className="text-red-100 text-base md:text-lg whitespace-pre-line font-semibold">{SUMMARY.desc}</div>
                                </div>
                            </div>
                        </section>
                    );
                };

                export default DialecticalFlow;
            