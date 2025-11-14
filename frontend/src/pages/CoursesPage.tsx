import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Video, Clock, Star, Play, Lock, Users } from 'lucide-react';

// Mock data
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
    level: '중급',
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
    level: '초급',
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
    level: '중급',
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
    level: '중급',
    isPurchased: false,
  },
  {
    id: 5,
    type: 'video',
    title: 'TypeScript 마스터클래스',
    description: 'JavaScript 개발자를 위한 TypeScript 완벽 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    price: 69000,
    duration: '9시간 15분',
    chapters: 32,
    rating: 4.8,
    students: 1105,
    level: '초급',
    isPurchased: false,
  },
  {
    id: 6,
    type: 'ebook',
    title: 'Flutter 앱 개발 실전 노트',
    description: '실무에서 바로 쓰는 Flutter 개발 팁과 베스트 프랙티스',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    price: 35000,
    pages: 280,
    rating: 4.7,
    students: 542,
    level: '중급',
    isPurchased: false,
  },
];

const stats = [
  { icon: Users, label: '전체 수강생', value: '5,000+' },
  { icon: Star, label: '평균 평점', value: '4.8/5.0' },
  { icon: Video, label: '총 강의', value: '50+' },
];

export function CoursesPage() {
  return (
    <div className="pt-20 relative">
      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-40 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-12 max-w-md mx-4 text-center shadow-2xl"
        >
          <div className="mb-6">
            <Video size={64} className="mx-auto text-blue-600 mb-4" />
            <h2 className="mb-4">강의 페이지 준비중</h2>
            <p className="text-gray-600">
              더 나은 강의 콘텐츠로 곧 찾아뵙겠습니다.
            </p>
          </div>
          <div className="inline-block px-6 py-3 bg-blue-600 text-white">
            Coming Soon
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center px-6 lg:px-12 overflow-hidden">
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
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              현업에서 쓰는 걸 가르칩니다
            </p>
            
            <h1 className="leading-tight">
              <span className="text-blue-600 font-medium">이론보다 실전</span>, 문서보다 실제 코드로 배웁니다.
              <br />
              처음부터 끝까지 <span className="text-blue-600 font-medium">직접 만들어보는</span> 강의입니다.
            </h1>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-3xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="mx-auto mb-4 text-blue-600" size={36} />
                  <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white border-2 border-gray-100 hover:border-blue-600 transition-all overflow-hidden"
              >
                <Link to={`/courses/${course.id}`}>
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        {course.isPurchased ? (
                          <Play className="text-blue-600" size={28} />
                        ) : (
                          <Lock className="text-gray-600" size={28} />
                        )}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs flex items-center gap-2">
                        {course.type === 'video' ? <Video size={14} /> : <BookOpen size={14} />}
                        {course.type === 'video' ? '동영상' : '전자책'}
                      </span>
                    </div>
                    
                    {course.isPurchased && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-green-600 text-white text-xs">
                          구매완료
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 bg-black/80 text-white text-xs">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                        <span>{course.rating}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{course.students.toLocaleString()}명</span>
                      </div>
                    </div>

                    {course.type === 'video' ? (
                      <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <span>•</span>
                        <span>{course.chapters}개 챕터</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
                        <BookOpen size={16} />
                        <span>{course.pages}페이지</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-blue-600">
                        ₩{course.price.toLocaleString()}
                      </div>
                      <span className="text-sm text-blue-600 group-hover:underline">
                        {course.isPurchased ? '시청하기' : '자세히 보기'} →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">강의 제작을 의뢰하고 싶으신가요?</h2>
            <p className="text-gray-400 text-lg mb-8">
              기업 맞춤형 교육 콘텐츠 제작도 가능합니다.
            </p>
            <Link
              to="/services"
              className="inline-block px-8 py-4 bg-blue-600 text-white hover:bg-white hover:text-black transition-all"
            >
              문의하기
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}