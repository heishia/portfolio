import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, Globe, Code, Check, ChevronRight, ChevronLeft, Send, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const serviceTypes = [
  { id: 'app', title: '앱 개발', icon: Smartphone, basePrice: 5000000, description: 'iOS/Android 크로스플랫폼 앱' },
  { id: 'web', title: '웹사이트 제작', icon: Globe, basePrice: 3000000, description: '반응형 웹사이트 & 웹앱' },
  { id: 'program', title: '프로그램 개발', icon: Code, basePrice: 4000000, description: '자동화 & 맞춤 솔루션' },
];

const featureCategories = [
  {
    category: '회원·계정 기능',
    features: [
      { name: '이메일 회원가입/로그인', isFree: true },
      { name: '소셜 로그인(카카오/구글/애플)', isFree: true },
      { name: '비밀번호 재설정/변경', isFree: false },
      { name: '프로필 관리', isFree: true },
      { name: '회원 탈퇴', isFree: true },
      { name: '권한 구분(관리자/유저/판매자)', isFree: false },
      { name: '차단/신고 기능', isFree: false },
      { name: '2차 인증(OTP/문자)', isFree: false },
    ],
  },
  {
    category: '결제·구독',
    features: [
      { name: '일반 결제(카드/계좌이체)', isFree: false },
      { name: '정기결제(멤버십/구독)', isFree: false },
      { name: '인앱결제', isFree: false },
      { name: '환불/취소 처리', isFree: false },
      { name: '결제내역·영수증', isFree: false },
      { name: '할인 쿠폰/프로모션', isFree: false },
      { name: '포인트/적립 시스템', isFree: false },
      { name: '간편결제 연동', isFree: false },
    ],
  },
  {
    category: '콘텐츠 업로드·관리',
    features: [
      { name: '이미지/파일 업로드', isFree: false },
      { name: '영상 업로드(압축/변환)', isFree: false },
      { name: '텍스트 에디터', isFree: false },
      { name: '썸네일 자동 생성', isFree: false },
      { name: '카테고리·태그 분류', isFree: false },
      { name: '콘텐츠 일정 예약', isFree: false },
      { name: '콘텐츠 통계', isFree: false },
      { name: '공개/비공개 설정', isFree: false },
    ],
  },
  {
    category: '커뮤니티·소통',
    features: [
      { name: '댓글/대댓글', isFree: true },
      { name: '좋아요/찜하기/북마크', isFree: true },
      { name: '팔로우/언팔로우', isFree: false },
      { name: '커뮤니티 게시판', isFree: false },
      { name: '리뷰 & 별점', isFree: false },
      { name: '신고하기 시스템', isFree: false },
      { name: '1:1 채팅', isFree: false },
      { name: '그룹채팅/단톡방', isFree: false },
      { name: '푸시/이메일 알림', isFree: false },
    ],
  },
  {
    category: '쇼핑·상품',
    features: [
      { name: '상품 업로드', isFree: false },
      { name: '옵션/재고 관리', isFree: false },
      { name: '장바구니', isFree: false },
      { name: '주문조회', isFree: false },
      { name: '배송 조회/상태 관리', isFree: false },
      { name: '판매자 대시보드', isFree: false },
      { name: '위시리스트', isFree: false },
      { name: '정기배송', isFree: false },
    ],
  },
  {
    category: '검색·탐색',
    features: [
      { name: '검색창(자동완성)', isFree: false },
      { name: '고급 필터', isFree: false },
      { name: '추천 시스템', isFree: false },
      { name: '인기 키워드/트렌드', isFree: false },
    ],
  },
  {
    category: '운영·관리',
    features: [
      { name: '관리자 대시보드', isFree: false },
      { name: '회원/콘텐츠/주문 관리', isFree: false },
      { name: '로그 모니터링', isFree: false },
      { name: '배너/팝업 관리', isFree: false },
      { name: '공지사항', isFree: false },
      { name: '다국어/지역 설정', isFree: false },
      { name: '반응형 UI + 다크모드', isFree: false },
    ],
  },
];

const additionalExamples = [
  '실시간 위치 기반 서비스',
  'AI 챗봇 통합',
  '블록체인 NFT 연동',
  '음성/영상 통화 기능',
  '증강현실(AR) 기능',
  '데이터 분석 대시보드',
];

export function ServicesPage() {
  const [step, setStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState<typeof serviceTypes[0] | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const basePrice = selectedServiceType?.basePrice || 0;
  
  // 모든 기능 목록을 flat하게 만들어서 isFree 체크
  const allFeatures = featureCategories.flatMap(cat => cat.features);
  
  // 유료 기능만 카운트 (무료 기능 제외)
  const paidFeaturesCount = selectedFeatures.filter(featureName => {
    const feature = allFeatures.find(f => f.name === featureName);
    return feature && !feature.isFree;
  }).length;
  
  const extraFeaturesCount = Math.max(0, paidFeaturesCount - 15);
  const extraBatches = Math.ceil(extraFeaturesCount / 10);
  const extraCost = extraBatches * 500000;
  const totalPrice = basePrice + extraCost;
  
  // 무료 기능 개수
  const freeFeatureCount = selectedFeatures.filter(featureName => {
    const feature = allFeatures.find(f => f.name === featureName);
    return feature && feature.isFree;
  }).length;

  const handleFeatureToggle = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.');
    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', company: '', message: '' });
  };

  const resetBuilder = () => {
    setStep(1);
    setSelectedServiceType(null);
    setSelectedFeatures([]);
    setAdditionalFeatures('');
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center px-6 lg:px-12 overflow-hidden py-12">
        <div className="absolute inset-0 bg-white -z-10" />
        <div 
          className="absolute inset-0 opacity-[0.02] -z-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />

        <div className="max-w-screen-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-xl lg:text-2xl text-gray-600 mb-6 leading-relaxed">
              어떤 것을 상상하시든 만들어드립니다
            </p>
            
            <h1 className="leading-tight">
              저의 모든 아웃풋은 저가형 노코드 빌드가 아니기에
              <br />
              디자인부터 기능까지 모든 면을 <span className="text-blue-600 font-medium">클라이언트에 맞게 커스텀</span>해드립니다.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Custom Builder Section */}
      <section className="py-12 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12 gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step >= s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > s ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Service Type Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-center mb-12">개발 유형 선택</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    const isSelected = selectedServiceType?.id === service.id;
                    
                    return (
                      <motion.button
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedServiceType(service)}
                        className={`p-8 border-2 transition-all text-left ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-600 bg-white'
                        }`}
                      >
                        <Icon
                          size={48}
                          className={`mb-6 ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}
                        />
                        <h3 className="mb-3">{service.title}</h3>
                        <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                        <p className="text-blue-600">
                          ₩{service.basePrice.toLocaleString()}~
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedServiceType}
                    className="bg-blue-600 text-white hover:bg-black px-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    다음 단계
                    <ChevronRight size={20} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Feature Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-center mb-4">기본 기능 선택</h2>
                <p className="text-center text-gray-600 mb-12">
                  기본 15개 무료 · 추가 10개당 +50만원
                </p>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left: Feature Selection */}
                  <div className="lg:col-span-2 space-y-8">
                    {featureCategories.map((category) => (
                      <div key={category.category} className="bg-white p-6 border border-gray-200">
                        <h4 className="mb-4">{category.category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.features.map((feature) => {
                            const isSelected = selectedFeatures.includes(feature.name);
                            return (
                              <button
                                key={feature.name}
                                onClick={() => handleFeatureToggle(feature.name)}
                                className={`px-4 py-2 text-sm border transition-all relative ${
                                  isSelected
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                                }`}
                              >
                                {feature.name}
                                {feature.isFree && (
                                  <span className={`ml-2 px-1.5 py-0.5 text-xs rounded ${
                                    isSelected 
                                      ? 'bg-white text-blue-600' 
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    무료
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Selected Features Display */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-white border-2 border-gray-300 p-6">
                      {/* Phone mockup header */}
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-4">
                          <Smartphone size={16} />
                          <span className="text-sm">선택된 기능</span>
                        </div>
                      </div>

                      {/* Selected features list */}
                      <div className="space-y-2 mb-6 max-h-[400px] overflow-y-auto">
                        {selectedFeatures.length === 0 ? (
                          <p className="text-center text-gray-400 py-8 text-sm">
                            기능을 선택해주세요
                          </p>
                        ) : (
                          selectedFeatures.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-2 p-2 bg-blue-50 text-sm"
                            >
                              <Check size={14} className="text-blue-600 flex-shrink-0" />
                              <span className="flex-1">{feature}</span>
                              <button
                                onClick={() => handleFeatureToggle(feature)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <X size={14} />
                              </button>
                            </motion.div>
                          ))
                        )}
                      </div>

                      {/* Price Summary */}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>기본 가격</span>
                          <span>₩{basePrice.toLocaleString()}</span>
                        </div>
                        {freeFeatureCount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>무료 기능</span>
                            <span>{freeFeatureCount}개</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm">
                          <span>유료 기능</span>
                          <span className={paidFeaturesCount > 15 ? 'text-blue-600' : ''}>
                            {paidFeaturesCount}개 / 15개
                          </span>
                        </div>
                        {extraFeaturesCount > 0 && (
                          <div className="flex justify-between text-sm text-blue-600">
                            <span>추가 비용 ({extraFeaturesCount}개)</span>
                            <span>+₩{extraCost.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t">
                          <span>예상 금액</span>
                          <span className="text-blue-600">
                            ₩{totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={() => setStep(1)}
                    className="bg-gray-200 text-black hover:bg-gray-300 px-8 py-6"
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    이전
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="bg-blue-600 text-white hover:bg-black px-8 py-6"
                  >
                    다음 단계
                    <ChevronRight size={20} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Features */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-center mb-4">추가로 구현하고 싶은 기능</h2>
                <p className="text-center text-gray-600 mb-12">
                  그외에 필요한 기능
                </p>

                <div className="max-w-4xl mx-auto">
                  {/* Difficulty-based pricing info */}
                  <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600">
                    <h4 className="mb-4 font-semibold">기능 구현 난이도별 가격 안내</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>기본</span>
                        <span className="text-green-600 font-medium">무료</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Easy</span>
                        <span className="font-medium">₩200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Normal</span>
                        <span className="font-medium">₩300,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hard</span>
                        <span className="font-medium">₩700,000</span>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-200 text-gray-600">
                        <p className="text-xs">※ 기본값은 미팅 후에 금액이 결정됩니다.</p>
                      </div>
                    </div>
                  </div>

                  {/* Example suggestions */}
                  <div className="mb-8">
                    <p className="mb-4 text-sm text-gray-600">예시 (클릭하여 추가)</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      {additionalExamples.map((example) => (
                        <button
                          key={example}
                          onClick={() => {
                            if (additionalFeatures) {
                              setAdditionalFeatures(additionalFeatures + '\n' + example);
                            } else {
                              setAdditionalFeatures(example);
                            }
                          }}
                          className="p-4 border border-gray-300 hover:border-blue-600 bg-white text-left text-sm transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text area */}
                  <Textarea
                    value={additionalFeatures}
                    onChange={(e) => setAdditionalFeatures(e.target.value)}
                    rows={8}
                    placeholder="예시:&#10;- AI 기반 추천 알고리즘&#10;- 실시간 협업 기능&#10;- 외부 API 연동 (네이버/카카오 등)&#10;- 특정 산업에 특화된 기능&#10;&#10;구체적으로 작성할수록 정확한 견적이 가능합니다."
                    className="mb-8"
                  />

                  {/* Final Summary */}
                  <div className="bg-gradient-to-br from-black to-gray-800 text-white p-8 mb-8">
                    <h3 className="mb-6">견적 요약</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>개발 유형</span>
                        <span>{selectedServiceType?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>기본 기능</span>
                        <span>{selectedFeatures.length}개</span>
                      </div>
                      {extraFeaturesCount > 0 && (
                        <div className="flex justify-between text-blue-400">
                          <span>추가 기능 ({extraFeaturesCount}개)</span>
                          <span>+₩{extraCost.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-3 border-t border-gray-600 text-xl">
                        <span>예상 총액</span>
                        <span className="text-blue-400">₩{totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep(2)}
                      className="bg-gray-200 text-black hover:bg-gray-300 px-8 py-6"
                    >
                      <ChevronLeft size={20} className="mr-2" />
                      이전
                    </Button>
                    <Button
                      onClick={() => setShowContactForm(true)}
                      className="flex-1 bg-blue-600 text-white hover:bg-black px-8 py-6"
                    >
                      <Send size={20} className="mr-2" />
                      상담 신청하기
                    </Button>
                    <Button
                      onClick={resetBuilder}
                      className="bg-gray-200 text-black hover:bg-gray-300 px-8 py-6"
                    >
                      처음부터 다시
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 md:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-6 right-6 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="mb-8">프로젝트 문의</h2>
            
            <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-600 space-y-2">
              <p>
                <strong>개발 유형:</strong> {selectedServiceType?.title}
              </p>
              <p>
                <strong>선택 기능:</strong> {selectedFeatures.length}개
              </p>
              <p className="text-blue-600">
                <strong>예상 금액:</strong> ₩{totalPrice.toLocaleString()}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="company">회사명</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">이메일 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="message">상세 내용</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="mt-2"
                  placeholder="프로젝트에 대한 추가 정보나 일정, 예산 등을 자유롭게 작성해주세요."
                />
              </div>
              
              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="flex-1 bg-blue-600 text-white hover:bg-black py-6"
                >
                  문의 보내기
                </Button>
                <Button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-8 bg-gray-200 text-black hover:bg-gray-300"
                >
                  취소
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}