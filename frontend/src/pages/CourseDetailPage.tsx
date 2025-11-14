import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Play, Clock, Star, Users, BookOpen, CheckCircle, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';

// Mock data
const courseData: Record<string, any> = {
  '1': {
    id: 1,
    type: 'video',
    title: 'Next.js 풀스택 개발 완벽 가이드',
    description: '기초부터 배포까지, Next.js로 실전 프로젝트를 만들어보는 완벽한 강의',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
    price: 89000,
    duration: '12시간 30분',
    chapters: 45,
    rating: 4.9,
    reviews: 328,
    students: 1240,
    level: '중급',
    isPurchased: false,
    instructor: {
      name: '개발자 포트폴리오',
      bio: '5년차 풀스택 개발자',
    },
    whatYouLearn: [
      'Next.js 13+ App Router 완벽 이해',
      'Server Components와 Client Components 활용',
      'API Routes로 백엔드 구축',
      'Prisma ORM과 PostgreSQL 연동',
      'NextAuth.js로 인증 시스템 구현',
      'Vercel을 통한 프로덕션 배포',
      '실전 프로젝트: 블로그 플랫폼 제작',
      '성능 최적화 및 SEO 전략',
    ],
    curriculum: [
      {
        title: 'Chapter 1: Next.js 시작하기',
        lessons: [
          { title: '강의 소개 및 환경 설정', duration: '12:34', isFree: true },
          { title: 'Next.js 프로젝트 생성', duration: '15:22', isFree: true },
          { title: 'App Router 이해하기', duration: '18:45', isFree: false },
          { title: '라우팅과 내비게이션', duration: '20:11', isFree: false },
        ],
      },
      {
        title: 'Chapter 2: 컴포넌트와 스타일링',
        lessons: [
          { title: 'Server Components 활용', duration: '22:15', isFree: false },
          { title: 'Client Components 이해', duration: '16:33', isFree: false },
          { title: 'Tailwind CSS 통합', duration: '14:28', isFree: false },
          { title: '반응형 디자인 구현', duration: '19:52', isFree: false },
        ],
      },
      {
        title: 'Chapter 3: 데이터 페칭',
        lessons: [
          { title: 'Server-side Data Fetching', duration: '24:18', isFree: false },
          { title: 'Static Generation vs SSR', duration: '21:45', isFree: false },
          { title: 'ISR로 페이지 재생성', duration: '17:30', isFree: false },
          { title: 'Loading과 Error 처리', duration: '15:22', isFree: false },
        ],
      },
    ],
    requirements: [
      'JavaScript 기초 지식',
      'React 기�� 문법 이해',
      'HTML/CSS 기초',
      'Node.js 설치',
    ],
  },
};

export function CourseDetailPage() {
  const { id } = useParams();
  const course = courseData[id || '1'] || courseData['1'];
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');

  const handlePurchase = () => {
    alert('결제 페이지로 이동합니다.');
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-black text-white py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            강의 목록으로
          </Link>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-sm">{course.level}</span>
                  <span className="px-3 py-1 bg-white/10 text-sm">
                    {course.type === 'video' ? '동영상 강의' : '전자책'}
                  </span>
                </div>

                <h1 className="mb-6">{course.title}</h1>
                <p className="text-xl text-white/80 mb-8">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={20} />
                    <span>{course.rating}</span>
                    <span className="text-white/60">({course.reviews}개 리뷰)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={20} />
                    <span>{course.students.toLocaleString()}명 수강</span>
                  </div>
                  {course.type === 'video' && (
                    <div className="flex items-center gap-2">
                      <Clock size={20} />
                      <span>{course.duration}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pb-8 border-b border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {course.instructor.name[0]}
                  </div>
                  <div>
                    <p>{course.instructor.name}</p>
                    <p className="text-sm text-white/60">{course.instructor.bio}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Purchase Card */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white text-black p-8 sticky top-24"
              >
                <div className="aspect-video mb-6 overflow-hidden bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-6">
                  <div className="text-blue-600 mb-2">
                    ₩{course.price.toLocaleString()}
                  </div>
                </div>

                {course.isPurchased ? (
                  <Button className="w-full bg-blue-600 text-white hover:bg-black py-6 mb-4">
                    <Play size={20} className="mr-2" />
                    강의 시청하기
                  </Button>
                ) : (
                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-blue-600 text-white hover:bg-black py-6 mb-4"
                  >
                    지금 구매하기
                  </Button>
                )}

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>평생 소장</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>모바일/PC 시청 가능</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>수료증 제공</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>30일 환불 보장</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 transition-colors relative ${
                activeTab === 'overview' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              강의 소개
              {activeTab === 'overview' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`pb-4 px-2 transition-colors relative ${
                activeTab === 'curriculum' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              커리큘럼
              {activeTab === 'curriculum' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* What You'll Learn */}
              <div>
                <h2 className="mb-6">무엇을 배우나요?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.whatYouLearn.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50">
                      <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="mb-6">수강 요구사항</h2>
                <ul className="space-y-3">
                  {course.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2>전체 커리큘럼</h2>
                <p className="text-gray-600">
                  {course.chapters}개 챕터 • {course.duration}
                </p>
              </div>

              {course.curriculum.map((chapter: any, chapterIndex: number) => (
                <div key={chapterIndex} className="border-2 border-gray-100">
                  <div className="p-6 bg-gray-50 border-b border-gray-100">
                    <h3>{chapter.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {chapter.lessons.length}개 강의
                    </p>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {chapter.lessons.map((lesson: any, lessonIndex: number) => (
                      <div
                        key={lessonIndex}
                        className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.isFree ? (
                            <Play className="text-blue-600" size={20} />
                          ) : (
                            <Lock className="text-gray-400" size={20} />
                          )}
                          <span className="text-gray-700">{lesson.title}</span>
                          {lesson.isFree && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs">
                              무료
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
