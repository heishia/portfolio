import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Video, Download, Lock, Play, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';

// Mock data - 실제로는 Notion API 및 결제 시스템과 연동
const courses = [
  {
    id: 1,
    type: 'video',
    title: 'Next.js 풀스택 개발 완벽 가이드',
    description: '기초부터 배포까지, Next.js로 실전 프로젝트를 만들어보는 완벽한 강의',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    price: 89000,
    duration: '12시간 30분',
    chapters: 45,
    rating: 4.9,
    students: 1240,
    isPurchased: false,
  },
  {
    id: 2,
    type: 'ebook',
    title: 'Python 자동화 실전 가이드북',
    description: '반복 작업을 자동화하는 Python 스크립트 작성법',
    thumbnail: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=600&fit=crop',
    price: 29000,
    pages: 320,
    rating: 4.8,
    students: 890,
    isPurchased: false,
  },
  {
    id: 3,
    type: 'video',
    title: 'React Native로 만드는 모바일 앱',
    description: '하나의 코드로 iOS와 Android 앱을 동시에 개발하는 방법',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    price: 99000,
    duration: '15시간 20분',
    chapters: 52,
    rating: 4.9,
    students: 756,
    isPurchased: true,
  },
  {
    id: 4,
    type: 'video',
    title: 'FastAPI로 구축하는 RESTful API',
    description: '빠르고 현대적인 Python 웹 프레임워크로 API 서버 만들기',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    price: 79000,
    duration: '10시간 45분',
    chapters: 38,
    rating: 4.7,
    students: 623,
    isPurchased: false,
  },
];

export function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePurchase = (course: typeof courses[0]) => {
    // 실제로는 결제 시스템 연동
    alert(`"${course.title}" 결제 페이지로 이동합니다.`);
  };

  const handlePlay = (course: typeof courses[0]) => {
    if (!course.isPurchased) {
      alert('강의를 구매해야 시청할 수 있습니다.');
      return;
    }
    setSelectedCourse(course);
    setIsPlaying(true);
  };

  return (
    <div className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Courses</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            실무 경험을 바탕으로 제작한 고품질 강의와 전자책으로
            <br />
            개발 역량을 한 단계 업그레이드하세요.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: '전체 수강생', value: '3,500+', icon: Star },
            { label: '평균 만족도', value: '4.8/5.0', icon: Star },
            { label: '총 강의 시간', value: '50+ 시간', icon: Clock },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white"
              >
                <Icon className="mx-auto mb-4 text-blue-600" size={32} />
                <div className="text-blue-600 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handlePlay(course)}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {course.isPurchased ? <Play size={24} /> : <Lock size={24} />}
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm flex items-center gap-2">
                    {course.type === 'video' ? <Video size={16} /> : <BookOpen size={16} />}
                    {course.type === 'video' ? '동영상 강의' : '전자책'}
                  </span>
                </div>
                {course.isPurchased && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-green-600 text-white text-sm">
                      구매완료
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{course.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{course.students.toLocaleString()}명 수강</span>
                </div>

                {course.type === 'video' ? (
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{course.duration}</span>
                    </div>
                    <span>•</span>
                    <span>{course.chapters}개 챕터</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <BookOpen size={16} />
                    <span>{course.pages}페이지</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-blue-600">₩{course.price.toLocaleString()}</span>
                  </div>
                  {course.isPurchased ? (
                    <Button
                      onClick={() => handlePlay(course)}
                      className="bg-black text-white hover:bg-blue-600"
                    >
                      {course.type === 'video' ? (
                        <>
                          <Play size={18} className="mr-2" />
                          시청하기
                        </>
                      ) : (
                        <>
                          <Download size={18} className="mr-2" />
                          다운로드
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePurchase(course)}
                      className="bg-blue-600 text-white hover:bg-black"
                    >
                      구매하기
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {isPlaying && selectedCourse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
              onClick={() => setIsPlaying(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-6xl mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{selectedCourse.title}</h3>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-gray-600 hover:text-black"
                    >
                      닫기
                    </button>
                  </div>
                  <div className="aspect-video bg-gray-900 flex items-center justify-center text-white">
                    <div className="text-center">
                      <Play size={64} className="mx-auto mb-4" />
                      <p>강의 플레이어 영역</p>
                      <p className="text-sm text-gray-400 mt-2">
                        실제로는 비디오 플레이어가 표시됩니다
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-3">챕터 목록</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {[...Array(10)].map((_, i) => (
                        <button
                          key={i}
                          className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span>챕터 {i + 1}: 소개 및 환경 설정</span>
                            <span className="text-sm text-gray-500">12:34</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
