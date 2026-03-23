import React, { useEffect, useState, Suspense, lazy } from 'react';
import Hero from './components/Hero';
import IntroSequence from './components/IntroSequence';
import GuidingQuestion from './components/GuidingQuestion';
import Sidebar from './components/Sidebar';
import AIChatbot from './components/AIChatbot';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ArrowUp, Bot } from 'lucide-react';

// Lazy load heavy components
const ScientificOrigins = lazy(() => import('./components/ScientificOrigins'));
const SocialStructure = lazy(() => import('./components/SocialStructure'));
const ContradictionMeter = lazy(() => import('./components/ContradictionMeter'));
const DialecticalFlow = lazy(() => import('./components/DialecticalFlow'));
const Timeline = lazy(() => import('./components/Timeline'));
const SocialSimulator = lazy(() => import('./components/SocialSimulator'));
const AnalysisComparison = lazy(() => import('./components/AnalysisComparison'));
const MythBreaker = lazy(() => import('./components/MythBreaker'));
const CollectiveFuture = lazy(() => import('./components/CollectiveFuture'));
const KnowledgeSummary = lazy(() => import('./components/KnowledgeSummary'));
const TextRealityMapper = lazy(() => import('./components/TextRealityMapper'));
const ContradictionAnalyzer = lazy(() => import('./components/ContradictionAnalyzer'));
const TransparencyPage = lazy(() => import('./components/TransparencyPage'));

// Register plugins globally
gsap.registerPlugin(ScrollTrigger);

const LoadingFallback = () => (
  <div className="w-full py-24 flex items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <Activity className="w-8 h-8 text-red-600 animate-pulse" />
      <span className="text-red-500 font-mono text-xs uppercase tracking-widest">Đang tải dữ liệu...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'summary' | 'transparency'>(() => {
    // Khôi phục view từ sessionStorage
    const savedView = sessionStorage.getItem('currentView');
    if (savedView === 'summary') return 'summary';
    if (savedView === 'transparency') return 'transparency';
    return 'home';
  });
  // Luôn bỏ qua intro, luôn vào thẳng trang chính
  const showIntro = false;
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Lưu view hiện tại khi thay đổi
  useEffect(() => {
    sessionStorage.setItem('currentView', view);
  }, [view]);

  useEffect(() => {
    // Global cursor effect for "Society in Motion" feel
    // Hide custom cursor on touch devices for performance and UX
    if (window.matchMedia("(pointer: fine)").matches) {
      const cursor = document.createElement('div');
      cursor.className = 'fixed w-4 h-4 bg-red-600 rounded-full pointer-events-none mix-blend-screen z-50 blur-sm hidden md:block transition-transform duration-75 will-change-transform';
      document.body.appendChild(cursor);

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX - 8,
          y: e.clientY - 8,
          duration: 0.1,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', moveCursor);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        if (document.body.contains(cursor)) document.body.removeChild(cursor);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      // Lưu vị trí cuộn trang vào sessionStorage theo từng view
      const scrollKey = view === 'summary' ? 'scrollProgressSummary' : view === 'transparency' ? 'scrollProgressTransparency' : 'scrollProgressHome';
      sessionStorage.setItem(scrollKey, String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // Khôi phục vị trí cuộn trang khi tải lại
  useEffect(() => {
    if (!showIntro) {
      const scrollKey = view === 'summary' ? 'scrollProgressSummary' : view === 'transparency' ? 'scrollProgressTransparency' : 'scrollProgressHome';
      const savedScrollPosition = sessionStorage.getItem(scrollKey);

      if (savedScrollPosition && parseInt(savedScrollPosition, 10) > 0) {
        const targetPosition = parseInt(savedScrollPosition, 10);

        // Đợi cho đến khi tất cả content load xong
        const scrollToTarget = () => {
          window.scrollTo({ top: targetPosition, behavior: 'instant' });
        };

        // Thử scroll ngay lập tức
        scrollToTarget();

        // Sau đó tiếp tục thử khi có thay đổi DOM (lazy components load)
        const observer = new MutationObserver(() => {
          scrollToTarget();
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Thử scroll thêm một vài lần với delay
        const delays = [100, 300, 500, 800, 1200, 2000, 3000];
        const timeouts = delays.map(delay =>
          setTimeout(scrollToTarget, delay)
        );

        // Cleanup sau 4 giây
        const cleanupTimeout = setTimeout(() => {
          observer.disconnect();
        }, 4000);

        return () => {
          observer.disconnect();
          timeouts.forEach(t => clearTimeout(t));
          clearTimeout(cleanupTimeout);
        };
      } else {
        // Nếu không có vị trí đã lưu, scroll về đầu trang
        window.scrollTo(0, 0);
      }
    }
  }, [showIntro, view]);



  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <>
      {view === 'summary' ? (
        <Suspense fallback={<LoadingFallback />}>
          <KnowledgeSummary onBack={() => setView('home')} onTransparency={() => setView('transparency')} />
        </Suspense>
      ) : view === 'transparency' ? (
        <Suspense fallback={<LoadingFallback />}>
          <TransparencyPage onBack={() => setView('home')} />
        </Suspense>
      ) : (
        <main className="bg-black min-h-screen text-red-500 font-sans selection:bg-red-900 selection:text-white relative">

          {/* 1. MỞ ĐẦU: ĐẶT VẤN ĐỀ (Eager Loaded) */}
          <section id="hero">
            <Hero />
          </section>

          <Suspense fallback={<LoadingFallback />}>
            {/* 2. NGUỒN GỐC: TẠI SAO CÓ LÝ LUẬN NÀY? */}
            <section id="origins">
              <GuidingQuestion index={1} question="Gia đình là gì — và tại sao nó quyết định sự tồn vong của xã hội?" />
              <ScientificOrigins />
            </section>

            {/* 3. CẤU TRÚC: XÃ HỘI VẬN HÀNH THẾ NÀO? */}
            <section id="structure">
              <GuidingQuestion index={2} question="Gia đình thực hiện những gì cho xã hội?" />
              <SocialStructure />
            </section>

            {/* 4. ĐỘNG LỰC: CÁI GÌ ĐẨY XÃ HỘI ĐI LÊN? */}
            <section id="contradiction">
              <GuidingQuestion index={3} question="Điều gì tạo nền tảng để xây dựng gia đình mới trong thời kỳ quá độ?" />
              <ContradictionMeter />
            </section>

            {/* 5. QUY LUẬT: SỰ THAY ĐỔI DIỄN RA RA SAO? */}
            <section id="dialectics">
              <GuidingQuestion index={4} question="Gia đình Việt Nam đang
thay đổi như thế nào?" />
              <DialecticalFlow />
            </section>

            {/* 6. LỊCH SỬ: CHỨNG MINH QUA THỜI GIAN */}
            <section id="timeline">
              <GuidingQuestion index={5} question="Lý luận Mác về gia đình —
còn đúng trong xã hội Việt Nam 2024?" />
              <Timeline />
            </section>

            {/* 7. CƠ CHẾ: THỬ NGHIỆM */}
            <section id="simulator">
              <GuidingQuestion index={6} question="Chúng ta có đang hiểu sai
về gia đình XHCN không?" />
              <SocialSimulator />
            </section>

            {/* 7.1. BÀI HỌC LỊCH SỬ: THÀNH CÔNG VÀ THẤT BẠI */}
            <section id="analysis">
              <GuidingQuestion index={7} question="Việt Nam cần làm gì để xây dựng
gia đình vững mạnh hơn?" />
              <AnalysisComparison />
            </section>

            {/* 8. KẾT: ĐÍCH ĐẾN */}
            <section id="future">
              <GuidingQuestion isTopicQuestion={true} question="Tại sao một xã hội lý tưởng phải xây dựng từ một gia đình lý tưởng?" />
              <CollectiveFuture onNavigate={() => setView('summary')} />
            </section>
          </Suspense>

          {/* Footer Button - Minh Bạch AI */}
          <footer className="bg-black border-t border-red-900/30 py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
              <button
                onClick={() => setView('transparency')}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-950/50 to-red-900/30 border border-red-900/50 rounded-full hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300 group"
              >
                <Bot className="w-5 h-5 text-red-500 group-hover:text-red-400" />
                <span className="text-white font-bold uppercase text-sm tracking-wider">Minh Bạch AI & Tác Giả</span>
              </button>
              <p className="text-stone-500 text-xs">© 2025-2026 Nhóm 7 - Chủ nghĩa xã hội khoa học</p>
            </div>
          </footer>

          {/* Back To Top Button */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[60] w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] group transition-all duration-500 ease-out ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
            aria-label="Back to top"
          >
            <ArrowUp className="text-white group-hover:text-red-600 transition-colors duration-300" size={24} />
          </button>

          {/* Floating Sticky Indicator */}
          <div className="fixed bottom-24 right-4 md:right-10 z-50 text-right opacity-80 mix-blend-difference pointer-events-none hidden md:block">
            <div className="text-xs text-red-500 uppercase tracking-widest mb-1">Trạng thái</div>
            <div className="text-sm font-bold text-white animate-pulse">ĐANG VẬN ĐỘNG</div>
          </div>
        </main>
      )}

      {/* Music Player removed: background audio widget disabled per request */}

      {/* Sidebar Navigation - theo từng trang */}
      <Sidebar page={view} />

      {/* AI Chatbot */}
      <AIChatbot />
    </>
  );
};

export default App;