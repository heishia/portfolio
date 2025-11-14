import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Smartphone, Database, Layers, Zap, Award, TrendingUp, ChevronLeft, ChevronRight, FileCode, Cloud, FileJson, Wrench, CircleDot, MessageSquare, Infinity } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../components/ui/hover-card';
import { fetchProjects, Project } from '../utils/api';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: FileCode,
    skills: ['Java', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'Kotlin'],
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['HTML5, CSS3/SCSS', 'Vue.js', 'Nuxt.js', 'React', 'Next.js'],
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Backend',
    icon: Layers,
    skills: ['Spring Framework/Boot', 'Django/DRF', 'FastAPI', 'Node.js (Express/Nest.js)'],
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['Flutter', 'Kotlin'],
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['MySQL', 'MongoDB', 'Supabase', 'Firebase'],
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    skills: ['AWS', 'GCP', 'Vercel', 'Railway', 'Docker'],
    gradient: 'from-blue-700 to-blue-900',
  },
  {
    title: 'Data Formats',
    icon: FileJson,
    skills: ['JSON', 'XML'],
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    title: 'Tools & Collaboration',
    icon: Wrench,
    skills: ['Git/GitHub', 'Figma', 'Photoshop', 'Illustrator', 'Notion', 'Excel', 'Cursor'],
    gradient: 'from-blue-600 to-blue-800',
  },
];

const values = [
  {
    icon: Zap,
    title: '즉각적 실행',
    description: 'AI를 활용한 빠른 프로토타이핑으로 아이디어를 즉시 현실로 구현합니다',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: CircleDot,
    title: '결과 중심',
    description: '과정보다 아웃풋, 이론보다 실제 작동하는 결과물로 능력을 증명합니다',
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: MessageSquare,
    title: '완전한 동행',
    description: '클라이언트의 목표 달성까지 끊임없는 소통과 피드백으로 함께 나아갑니다',
    color: 'from-blue-600 to-blue-800',
  },
  {
    icon: Infinity,
    title: '무한한 가능성',
    description: '불가능은 없습니다. 모든 요구사항에 구현 가능한 해답을 찾아냅니다',
    color: 'from-blue-700 to-blue-900',
  },
];

export function AboutPage() {
  const navigate = useNavigate();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const projects = await fetchProjects();
        // 최대 5개까지만 표시
        setFeaturedProjects(projects.slice(0, 5));
        setCurrentProjectIndex(0);
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
        setFeaturedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectChange = (direction: 'prev' | 'next') => {
    if (featuredProjects.length === 0) return;
    
    if (direction === 'prev') {
      setCurrentProjectIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : featuredProjects.length - 1));
    } else {
      setCurrentProjectIndex((prevIndex) => (prevIndex < featuredProjects.length - 1 ? prevIndex + 1 : 0));
    }
  };

  return (
    <div className="pt-20">
      {/* Intro Section */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
              저는{' '}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <strong className="text-blue-600 cursor-help border-b-2 border-blue-200 hover:border-blue-600 transition-colors">
                    바이브코딩
                  </strong>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">바이브코딩이란?</h4>
                    <p className="text-sm text-gray-600">
                      AI를 활용하는 개발 방식
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {' '}개발자 김뽑희로 활동하고 있는 진푸른이라고합니다.
            </p>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
              기존 개발자의 형태와 다르지만 저는 제 능력을 <span className="text-blue-600 font-medium">뛰어난 아웃풋</span>으로 증명해왔습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Carousel Section */}
      {loading ? (
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center py-20">
              <p className="text-gray-600">프로젝트를 불러오는 중...</p>
            </div>
          </div>
        </section>
      ) : featuredProjects.length > 0 ? (
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="relative flex items-center justify-center">
              {/* Navigation Buttons - Minimalist Style */}
              <button
                onClick={() => handleProjectChange('prev')}
                className="absolute left-0 lg:left-4 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={() => handleProjectChange('next')}
                className="absolute right-0 lg:right-4 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors duration-300"
                aria-label="Next project"
              >
                <ChevronRight size={32} />
              </button>

              {/* Carousel Container */}
              <div className="flex items-center justify-center gap-6 lg:gap-10 w-full max-w-5xl mx-auto py-12">
                {featuredProjects.length > 0 && [-1, 0, 1].map((offset) => {
                  const index = (currentProjectIndex + offset + featuredProjects.length) % featuredProjects.length;
                  const project = featuredProjects[index];
                  const isCenter = offset === 0;

                  return (
                    <motion.div
                      key={`${index}-${offset}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isCenter ? 1 : 0.4,
                        scale: isCenter ? 1 : 0.65,
                        y: isCenter ? 0 : 30,
                      }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                        stiffness: 260,
                        damping: 25,
                      }}
                      onClick={() => {
                        if (isCenter) {
                          navigate(`/projects/${project.id}`);
                        } else {
                          setCurrentProjectIndex(index);
                        }
                      }}
                      className={`relative cursor-pointer group ${
                        isCenter ? 'w-44 h-44 lg:w-56 lg:h-56' : 'w-28 h-28 lg:w-36 lg:h-36'
                      }`}
                    >
                      {/* App Icon - iOS Style */}
                      <div className="relative w-full h-full overflow-hidden rounded-[22.5%] shadow-lg">
                        {project.app_icon || project.thumbnail_url ? (
                          <img
                            src={project.app_icon || project.thumbnail_url || ''}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">이미지 없음</span>
                          </div>
                        )}
                        
                        {/* Hover Overlay - Only on center */}
                        {isCenter && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black/80 flex flex-col items-center justify-end pb-6 px-4"
                          >
                            <p className="text-white text-sm text-center opacity-90">자세히 보기</p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Project Title Display */}
            {featuredProjects.length > 0 && (
              <motion.div
                key={currentProjectIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-10"
              >
                <h3 className="text-2xl text-gray-900">{featuredProjects[currentProjectIndex].title}</h3>
              </motion.div>
            )}

            {/* Dots Indicator - Equal Size */}
            {featuredProjects.length > 0 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {featuredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentProjectIndex
                        ? 'w-2 h-2 bg-gray-900'
                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {/* Skills Section */}
      <section className="py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-2xl lg:text-3xl font-bold">기술 스택</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-8 bg-white border border-gray-100 hover:border-transparent overflow-hidden transition-all duration-500"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="mb-6 text-xl">{category.title}</h3>
                    
                    <ul className="space-y-3">
                      {category.skills.map((skill) => (
                        <li key={skill} className="text-gray-600 flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 bg-gradient-to-r ${category.gradient}`} />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 lg:px-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="mb-6 text-[30px] font-bold">개발 철학</h2>
            <div className="text-xl text-gray-800 max-w-2xl mx-auto leading-relaxed space-y-2">
              <p className="font-medium">
                <motion.span 
                  className="text-blue-600 text-[32px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Do not say no
                </motion.span>
              </p>
              <p>안 되는 건 없습니다.</p>
              <p>구현을 최우선으로 합니다.</p>
              <p>코드를 전부 수정하는 한이 있더라도</p>
              <p>피드백과 소통을 통해</p>
              <p>클라이언트의 목적지까지 함께합니다</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative flex gap-6 p-10 bg-white border border-gray-100 hover:border-transparent overflow-hidden transition-all duration-500"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="mb-4 text-2xl">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl">함께하고 싶은 분야</h2>
              </div>

              <div className="space-y-4">
                {[
                  { text: 'SaaS 제품 개발 및 런칭', gradient: 'from-blue-400 to-blue-600' },
                  { text: '스타트업 기술 파트너십', gradient: 'from-blue-500 to-blue-700' },
                  { text: '교육 플랫폼 구축', gradient: 'from-blue-600 to-blue-800' },
                  { text: '자동화 및 생산성 도구', gradient: 'from-blue-500 to-blue-700' },
                  { text: 'AI/ML 기반 서비스', gradient: 'from-blue-600 to-blue-800' },
                  { text: '모바일 퍼스트 애플리케이션', gradient: 'from-blue-700 to-blue-900' },
                ].map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="group relative flex items-center gap-4 p-6 bg-white border border-gray-100 hover:border-transparent overflow-hidden transition-all duration-300"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${area.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />
                    <div className={`w-2 h-2 bg-gradient-to-r ${area.gradient} group-hover:scale-150 transition-transform duration-300`} />
                    <span className="relative z-10 text-gray-700 group-hover:text-gray-900 transition-colors">{area.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}