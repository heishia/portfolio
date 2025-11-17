import { useState } from 'react';
import { motion } from 'motion/react';
import { Smartphone, Globe, Zap, Check, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const services = [
  {
    id: 'app',
    icon: Smartphone,
    title: '앱 개발',
    description: 'React Native / Flutter를 활용한 크로스플랫폼 모바일 앱',
    packages: [
      { name: '기본형', price: 3000000, features: ['기본 기능 구현', '1개 플랫폼', '3개월 유지보수'] },
      { name: '고급형', price: 5000000, features: ['고급 기능 구현', '2개 플랫폼', '6개월 유지보수', 'API 연동'] },
      { name: '맞춤형', price: 0, features: ['맞춤 제작', '무제한 기능', '1년 유지보수', '전담 지원'] },
    ],
  },
  {
    id: 'web',
    icon: Globe,
    title: '웹사이트 제작',
    description: 'Next.js / FastAPI / CMS 연동을 통한 현대적인 웹사이트',
    packages: [
      { name: '기본형', price: 2000000, features: ['반응형 웹', '5페이지', 'SEO 최적화'] },
      { name: '고급형', price: 4000000, features: ['CMS 연동', '10페이지', 'SEO 최적화', '관리자 대시보드'] },
      { name: '맞춤형', price: 0, features: ['풀스택 개발', '무제한 페이지', 'DB 설계', '전담 지원'] },
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    title: '자동화 프로그램',
    description: 'Python Script / Bot을 활용한 업무 자동화 솔루션',
    packages: [
      { name: '기본형', price: 1000000, features: ['단순 자동화', '1개 작업', '기본 스케줄링'] },
      { name: '고급형', price: 2500000, features: ['복합 자동화', '3개 작업', '고급 스케줄링', '알림 기능'] },
      { name: '맞춤형', price: 0, features: ['맞춤 솔루션', '무제한 작업', 'API 개발', '전담 지원'] },
    ],
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const currentService = services.find((s) => s.id === selectedService) || services[0];
  const currentPackage = currentService.packages[selectedPackage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제로는 여기서 이메일 전송 또는 DB 저장
    alert('문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.');
    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="py-24 xs:py-16 px-6 xs:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Services</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            프로젝트의 규모와 요구사항에 맞는 최적의 솔루션을 제공합니다.
          </p>
        </motion.div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-4 xs:gap-3 mb-12 xs:mb-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setSelectedPackage(0);
                }}
                className={`flex items-center gap-3 xs:gap-2 px-6 xs:px-4 py-4 xs:py-3.5 border-2 transition-all xs:text-sm min-h-12 xs:min-h-14 ${
                  selectedService === service.id
                    ? 'bg-black text-white border-black'
                    : 'border-black text-black hover:bg-blue-600 hover:text-white hover:border-blue-600'
                }`}
              >
                <Icon size={24} className="xs:w-5 xs:h-5" />
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Service Description */}
        <motion.div
          key={selectedService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-gray-600">{currentService.description}</p>
        </motion.div>

        {/* Package Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-4 mb-12 xs:mb-8">
          {currentService.packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedPackage(index)}
              className={`cursor-pointer p-8 xs:p-4 border-2 transition-all ${
                selectedPackage === index
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-600'
              }`}
            >
              <h3 className="mb-4 xs:mb-3 xs:text-base">{pkg.name}</h3>
              <div className="mb-6 xs:mb-4">
                {pkg.price > 0 ? (
                  <div>
                    <span className="text-blue-600 xs:text-base">
                      ₩{pkg.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm xs:text-xs ml-2">부터</span>
                  </div>
                ) : (
                  <span className="text-blue-600 xs:text-base">견적 문의</span>
                )}
              </div>
              <ul className="space-y-3 xs:space-y-2">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm xs:text-xs text-gray-600">
                    <Check size={18} className="xs:w-4 xs:h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Price Summary & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-50 p-8 xs:p-4 md:p-12"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 xs:gap-4">
              <div>
                <h4 className="mb-2 xs:mb-1 xs:text-base">선택한 패키지</h4>
                <p className="text-gray-600 xs:text-sm">
                  {currentService.title} - {currentPackage.name}
                </p>
                {currentPackage.price > 0 && (
                  <p className="text-blue-600 mt-2 xs:mt-1 xs:text-base">
                    예상 금액: ₩{currentPackage.price.toLocaleString()}~
                  </p>
                )}
              </div>
              <Button
                onClick={() => setShowContactForm(true)}
                className="bg-black text-white hover:bg-blue-600 px-8 xs:px-6 py-6 xs:py-4 xs:text-sm min-h-12 xs:min-h-14"
              >
                <Send size={20} className="xs:w-5 xs:h-5 mr-2" />
                프로젝트 의뢰하기
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 xs:p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 xs:p-4 max-w-2xl w-full xs:w-[calc(100%-1rem)] max-h-[90vh] xs:max-h-[95vh] overflow-y-auto"
            >
              <h3 className="mb-6 xs:mb-4 xs:text-xl">프로젝트 의뢰하기</h3>
              <form onSubmit={handleSubmit} className="space-y-6 xs:space-y-4">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">이메일</Label>
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
                  <Label htmlFor="phone">연락처</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message">프로젝트 설명</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-2"
                    placeholder="프로젝트에 대해 자세히 설명해주세요..."
                  />
                </div>
                <div className="bg-gray-50 p-4 xs:p-3 text-sm xs:text-xs text-gray-600">
                  <p>선택한 서비스: {currentService.title} - {currentPackage.name}</p>
                  {currentPackage.price > 0 && (
                    <p>예상 금액: ₩{currentPackage.price.toLocaleString()}~</p>
                  )}
                </div>
                <div className="flex gap-4 xs:gap-3 xs:flex-col">
                  <Button type="submit" className="flex-1 bg-black text-white hover:bg-blue-600 xs:text-sm min-h-12 xs:min-h-14">
                    문의 보내기
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-200 text-black hover:bg-gray-300 xs:text-sm min-h-12 xs:min-h-14"
                  >
                    취소
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
