import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

interface GuidingQuestionProps {
  question: string;
  index?: number;
  isTopicQuestion?: boolean;
}

const GuidingQuestion: React.FC<GuidingQuestionProps> = ({ question, index, isTopicQuestion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line drawing animation
      gsap.fromTo(".connector-line", 
        { height: 0, opacity: 0 },
        { 
          height: "100%", 
          opacity: 1, 
          duration: 1, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

      // Text reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`py-24 md:py-32 bg-black flex flex-col items-center justify-center relative z-20 overflow-hidden ${isTopicQuestion ? 'min-h-[50vh]' : ''}`}>
       {/* Narrative Axis Line */}
       <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent ${isTopicQuestion ? 'via-yellow-600/40' : 'via-red-900/50'} to-transparent h-full`}></div>
       
       {/* Animated Connector */}
       <div className={`connector-line absolute top-0 left-1/2 -translate-x-1/2 ${isTopicQuestion ? 'w-[3px]' : 'w-0.5'} bg-gradient-to-b from-transparent ${isTopicQuestion ? 'via-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]' : 'via-red-600 shadow-[0_0_10px_#ff0000]'} to-transparent h-0`}></div>

       <div className={`relative z-10 text-center px-4 md:px-8 max-w-5xl bg-black/90 backdrop-blur-md ${isTopicQuestion ? 'py-12 md:py-16 border-y-2 border-yellow-600/30 box-shadow-glow' : 'py-8 border-y border-red-900/10'}`}
            style={isTopicQuestion ? { boxShadow: '0 0 60px -20px rgba(234,179,8,0.3), inset 0 0 40px -20px rgba(234,179,8,0.1)' } : {}}>
          
          {isTopicQuestion && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          )}

          <span className={`${isTopicQuestion ? 'text-yellow-500 text-[12px] md:text-[14px] font-bold tracking-[0.4em]' : 'text-red-600 text-[10px] tracking-[0.3em]'} font-mono uppercase mb-6 block animate-pulse`}>
             {isTopicQuestion ? 'Câu hỏi chủ đề' : `Câu hỏi dẫn đường 0${index}`}
          </span>
          
          <h3 ref={textRef} className={`${isTopicQuestion ? 'text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-yellow-50 to-yellow-200' : 'text-2xl md:text-4xl font-light text-white'} leading-tight`}>
             "{question}"
          </h3>

          <div className="mt-8 flex justify-center">
             <ChevronDown className={`${isTopicQuestion ? 'text-yellow-500 opacity-90' : 'text-red-600 opacity-50'} animate-bounce`} size={isTopicQuestion ? 28 : 20} />
          </div>

          {isTopicQuestion && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
          )}
       </div>
    </div>
  );
};

export default GuidingQuestion;