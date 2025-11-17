import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  Brain,
  Zap,
  Search,
  Check,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import memeImage from "../assets/7c4736a7b96c7c2fd1894318650492550baad73d.png";

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const isExpanded = useInView(circleRef, {
    once: false,
    amount: 0.5,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 500);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="pt-20" ref={containerRef}>
      {/* Section 1 - Problem Hook */}
      <section className="relative min-h-screen xs:min-h-0 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0, 0, 0, 0.5) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />
        </div>

        <div className="max-w-screen-2xl mx-auto px-6 xs:px-4 lg:px-12 py-20 xs:py-16 lg:py-32 w-full">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Hook */}
            <div className="mb-12 xs:mb-4">
              {/* Meme Image */}
              <div className="mb-12 xs:mb-4 flex justify-center">
                <img
                  src={memeImage}
                  alt="개발자는 안된다고 말했다 밈"
                  className="w-48 xs:w-32 h-auto"
                />
              </div>

              <p className="text-gray-600 mb-12 xs:mb-4 text-[24px] xs:text-lg">
                여기 유명한 밈이 있습니다.
              </p>

              <h1 className="leading-tight text-black text-2xl lg:text-3xl font-bold">
                "개발자는 항상{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3,
                    ease: "easeOut",
                  }}
                  className="text-blue-600"
                >
                  안 된다
                </motion.span>
                고 한다"
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Insight (Cause Analysis) */}
      <section className="relative py-32 xs:py-20 px-6 xs:px-4 lg:px-12 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 xs:mb-12">
              <h2 className="mb-12 xs:mb-8 text-[24px] xs:text-lg">
                왜 개발자들은 늘 안 된다고만 할까요?
                <br />
                <span className="text-blue-600">
                  클라이언트는 새로운 기능에 초점을
                </span>
                <br />
                <span className="text-blue-600">
                  개발자는 안정성에 초점을
                  <br />
                </span>{" "}
                두기 때문입니다.
              </h2>
            </div>

            {/* Cards */}
            <div className="flex justify-center items-center py-0">
              {/* Motion Graphic: One circle splits into three */}
              <div
                className="relative w-full max-w-4xl h-[500px] flex items-center justify-center overflow-hidden"
                style={{
                  height: isSmallScreen ? '300px' : '500px'
                }}
                ref={circleRef}
              >
                {/* Label - 클라이언트/개발자 */}
                <motion.div className="absolute top-0 xs:top-0 left-1/2 -translate-x-1/2 -translate-y-full xs:-translate-y-[calc(100%+8px)] text-center z-10">
                  <motion.div
                    animate={{
                      opacity: isExpanded ? 0 : 1,
                      y: isExpanded ? -10 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="px-5 xs:px-3 py-2 xs:py-1 rounded-full bg-gray-100 shadow-sm">
                      <p className="text-gray-700 text-sm xs:text-[10px] tracking-wide">
                        클라이언트
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      y: isExpanded ? 0 : 10,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="px-5 xs:px-3 py-2 xs:py-1 rounded-full bg-gray-900 shadow-lg">
                      <p className="text-white text-sm xs:text-[10px] tracking-wide">
                        개발자
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Initial Circle - "새로운 기능" */}
                <motion.div
                  animate={{
                    scale: isExpanded ? [1, 1.2, 0] : 1,
                    opacity: isExpanded ? [1, 1, 0] : 1,
                    rotate: isExpanded ? [0, 5, -5, 0] : 0,
                    y: isSmallScreen ? 16 : -64,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="absolute cursor-pointer -translate-y-64"
                >
                  <div className="relative">
                    {/* Quote below circle */}
                    <motion.div
                      animate={{
                        opacity: isExpanded ? 0 : 1,
                        y: isExpanded ? 10 : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 xs:mt-2"
                    >
                      <p className="text-blue-600 whitespace-nowrap xs:whitespace-normal xs:text-[10px] text-center">
                        "결제 기능을 추가하고 싶어요!"
                      </p>
                    </motion.div>

                    <div className="w-32 xs:w-20 h-32 xs:h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white xs:text-xs text-center px-1">
                        새로운 기능
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Split into 3 circles - Triangle formation */}

                {/* Top: 예외 */}
                <motion.div
                  animate={{
                    x: isExpanded ? 0 : 0,
                    y: isExpanded ? (isSmallScreen ? -35 : -100) : 0,
                    scale: isExpanded ? [0, 0.5, 1] : 0,
                    opacity: isExpanded ? [0, 0.7, 1] : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isExpanded ? 0.2 : 0,
                    ease: "easeOut",
                  }}
                  className="absolute"
                >
                  {/* Circle */}
                  <div className="relative">
                    <div className="w-24 xs:w-14 h-24 xs:h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm xs:text-[10px]">
                        예외
                      </span>
                    </div>

                    {/* Line and Text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isExpanded ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: isExpanded ? 0.5 : 0,
                      }}
                      className="absolute top-1/2 left-full ml-4 xs:ml-1 flex items-center gap-3 xs:gap-1 xs:hidden"
                    >
                      <div className="w-12 xs:w-2 h-px bg-gray-400"></div>
                      <p className="text-gray-700 text-sm xs:text-[8px] whitespace-nowrap xs:whitespace-normal xs:max-w-[80px]">
                        카드사 서버가 응답하지 않으면?
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bottom Left: 변수 */}
                <motion.div
                  animate={{
                    x: isExpanded ? (isSmallScreen ? -40 : -90) : 0,
                    y: isExpanded ? (isSmallScreen ? 30 : 50) : 0,
                    scale: isExpanded ? [0, 0.5, 1] : 0,
                    opacity: isExpanded ? [0, 0.7, 1] : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isExpanded ? 0.2 : 0,
                    ease: "easeOut",
                  }}
                  className="absolute"
                >
                  {/* Circle */}
                  <div className="relative">
                    <div className="w-24 xs:w-14 h-24 xs:h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm xs:text-[10px]">
                        변수
                      </span>
                    </div>

                    {/* Line and Text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isExpanded ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: isExpanded ? 0.5 : 0,
                      }}
                      className="absolute top-1/2 right-full mr-4 xs:mr-1 flex items-center gap-3 xs:gap-1 xs:flex-row-reverse xs:hidden"
                    >
                      <p className="text-gray-700 text-sm xs:text-[8px] whitespace-nowrap xs:whitespace-normal text-right xs:text-left xs:max-w-[80px]">
                        어떤 결제 방식을 지원하지?
                      </p>
                      <div className="w-12 xs:w-2 h-px bg-gray-400"></div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Bottom Right: 버그 */}
                <motion.div
                  animate={{
                    x: isExpanded ? (isSmallScreen ? 40 : 90) : 0,
                    y: isExpanded ? (isSmallScreen ? 30 : 50) : 0,
                    scale: isExpanded ? [0, 0.5, 1] : 0,
                    opacity: isExpanded ? [0, 0.7, 1] : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isExpanded ? 0.2 : 0,
                    ease: "easeOut",
                  }}
                  className="absolute"
                >
                  {/* Circle */}
                  <div className="relative">
                    <div className="w-24 xs:w-14 h-24 xs:h-14 bg-gray-700 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm xs:text-[10px]">
                        버그
                      </span>
                    </div>

                    {/* Line and Text */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isExpanded ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: isExpanded ? 0.5 : 0,
                      }}
                      className="absolute top-1/2 left-full ml-4 xs:ml-1 flex items-center gap-3 xs:gap-1 xs:hidden"
                    >
                      <div className="w-12 xs:w-2 h-px bg-gray-400"></div>
                      <p className="text-gray-700 text-sm xs:text-[8px] whitespace-nowrap xs:whitespace-normal xs:max-w-[80px]">
                        모바일에서는 결제창이 안 뜨네?
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Example List for Mobile */}
            <div className="mt-8 hidden xs:block" style={{ transform: 'translateY(-50px)' }}>
              <div className="space-y-2 text-center">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">예외:</span> 카드사 서버가 응답하지 않으면?
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">변수:</span> 어떤 결제 방식을 지원하지?
                </p>
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">버그:</span> 모바일에서는 결제창이 안 뜨네?
                </p>
              </div>
            </div>

            {/* Conclusion - Desktop Only */}
            <div className="-mt-12 text-center xs:hidden">
              <div className="py-2 px-8">
                <p className="text-gray-900 text-[24px]">
                  불확실성을 제거해야하기 때문에
                  <br />
                  대부분의 개발자들은 일단{" "}
                  <span className="text-blue-600">
                    "안된다"
                  </span>
                  고 말합니다.
                </p>
              </div>
            </div>

            {/* Conclusion - Mobile Only */}
            <div className="mt-8 hidden xs:block text-center">
              <div className="py-2 px-4">
                <p className="text-gray-900 text-lg">
                  불확실성을 제거해야하기 때문에
                  <br />
                  대부분의 개발자들은 일단{" "}
                  <span className="text-blue-600">
                    "안된다"
                  </span>
                  고 말합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Differentiation (My Position) + AI Development */}
      <section className="relative py-32 xs:py-20 px-6 xs:px-4 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white" />
        </div>

        <div className="max-w-screen-2xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              <div className="mb-20 xs:mb-12">
                <p className="text-[24px] xs:text-lg">
                  저는{" "}
                  <span className="text-blue-600">
                    바이브 코딩 개발자
                  </span>
                  입니다.
                  <br />
                  물론 바이브 코딩이 만능은 아닙니다.
                  <br />
                  단,{" "}
                  <span className="text-blue-600">
                    빠른 수용성
                  </span>
                  이라는 압도적인 장점이 있죠.
                </p>
              </div>

              {/* AI Development Grid */}
              <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Left - AI Development */}
                  <div className="space-y-6">
                    <h3 className="mb-8">AI 개발은</h3>

                    <div className="space-y-4">
                      {[
                        "코드 린트 오류 하나에 몇 시간을 잡아먹거나",
                        "사소한 문법 문제 때문에 멈춰 서는 일이 적습니다",
                      ].map((text, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-6 bg-white border border-gray-200"
                        >
                          <Check
                            size={24}
                            className="text-blue-600 flex-shrink-0 mt-1"
                          />
                          <p className="text-gray-700">
                            {text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right - Results */}
                  <div className="flex flex-col justify-center space-y-6">
                    <h3 className="mb-8">덕분에 저는</h3>

                    <div className="space-y-4">
                      {[
                        {
                          icon: Zap,
                          text: "기술 구현 자체에 더 많은 시간을 쏟고",
                        },
                        {
                          icon: Search,
                          text: "새로운 방향을 더 빠르게 시도할 수 있습니다",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-6 bg-black text-white"
                        >
                          <item.icon
                            size={24}
                            className="text-blue-400 flex-shrink-0 mt-1"
                          />
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Brand Statement (Attitude & Value) */}
      <section className="relative py-40 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-black" />

        <div className="max-w-screen-2xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div>
              {/* Description */}
              <div className="space-y-8 xs:space-y-6 mb-16 xs:mb-12">
                <p className="text-gray-300 text-[24px] xs:text-lg">
                  저는 클라이언트에게 안 된다는 말 대신
                  <br />
                  <motion.span
                    className="text-blue-600 font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    가능한 방법
                  </motion.span>
                  을 제안합니다
                </p>

                <div className="pt-8">
                  {/* Diamond Flash Animation */}
                  <div className="relative h-20 mb-12 flex items-center justify-center">
                    {/* Outer glow */}
                    <motion.div
                      className="absolute"
                      initial={{ opacity: 0, scale: 0.3, rotate: 45 }}
                      whileInView={{ 
                        opacity: [0, 0.8, 1, 0.8, 0],
                        scale: [0.3, 1.5, 1.8, 2, 2.5],
                        rotate: 45
                      }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{
                        duration: 4,
                        ease: "easeOut",
                        times: [0, 0.2, 0.5, 0.8, 1]
                      }}
                    >
                      <div 
                        className="w-20 h-20"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0) 70%)',
                          filter: 'blur(12px)'
                        }}
                      />
                    </motion.div>
                    
                    {/* Sharp rays */}
                    {[0, 45, 90, 135].map((rotation) => (
                      <motion.div
                        key={rotation}
                        className="absolute w-40 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                        style={{ 
                          rotate: `${rotation}deg`,
                          filter: 'blur(1px)'
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ 
                          opacity: [0, 1, 1, 0.5, 0],
                          scaleX: [0, 1, 1.2, 1, 0.8]
                        }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{
                          duration: 4,
                          ease: "easeOut",
                          times: [0, 0.25, 0.5, 0.75, 1],
                          delay: 0.1
                        }}
                      />
                    ))}
                    
                    {/* Center glow - bright gradient fade */}
                    <motion.div
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ 
                        opacity: [0, 1, 1, 0.6, 0],
                        scale: [0, 0.8, 1, 1.3, 1.6]
                      }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{
                        duration: 4,
                        ease: "easeOut",
                        times: [0, 0.2, 0.5, 0.8, 1]
                      }}
                    >
                      <div 
                        className="w-16 h-16"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%)',
                          filter: 'blur(2px)'
                        }}
                      />
                    </motion.div>
                  </div>

                  <p className="text-gray-400 text-[24px] xs:text-lg">
                    이것이 <br />
                    제가 가진 가장 큰{" "}
                    <span className="text-white">경쟁력</span>
                    입니다.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 xs:gap-4">
                <Link to="/projects" className="w-full xs:w-full sm:w-auto">
                  <button className="group relative w-full xs:w-full sm:w-auto px-10 xs:px-6 py-5 xs:py-4 bg-white text-gray-900 overflow-hidden hover:bg-blue-600 hover:text-white transition-colors min-h-12 xs:min-h-14">
                    <span className="relative z-10 flex items-center justify-center gap-3 xs:text-sm">
                      프로젝트 보기
                      <ArrowRight
                        className="group-hover:translate-x-1 transition-transform xs:w-4 xs:h-4"
                        size={20}
                      />
                    </span>
                  </button>
                </Link>

                <Link to="/services" className="w-full xs:w-full sm:w-auto">
                  <button className="w-full xs:w-full sm:w-auto px-10 xs:px-6 py-5 xs:py-4 bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-colors min-h-12 xs:min-h-14 xs:text-sm">
                    상담 시작하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}