import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, X, Calendar, Tag } from 'lucide-react';

// Mock data - 실제로는 Notion API에서 가져올 데이터
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    summary: 'Next.js와 Stripe를 활용한 풀스택 전자상거래 플랫폼',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    period: '2024.01 - 2024.03',
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    overview: '중소기업을 위한 확장 가능한 전자상거래 솔루션입니다. 관리자 대시보드, 재고 관리, 결제 시스템을 통합했습니다.',
    challenges: [
      '실시간 재고 관리 시스템 구현',
      'Stripe 결제 연동 및 웹훅 처리',
      '검색 엔진 최적화(SEO) 구현',
    ],
    learnings: [
      'Next.js의 SSR/SSG를 활용한 성능 최적화',
      '결제 시스템의 보안 및 에러 핸들링',
      '관리자 도구의 UX 설계',
    ],
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'Mobile',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    summary: 'Flutter로 제작한 크로스플랫폼 업무 관리 애플리케이션',
    tags: ['Flutter', 'Firebase', 'Dart'],
    period: '2023.10 - 2023.12',
    githubUrl: 'https://github.com',
    overview: '팀 협업을 위한 간편한 업무 관리 도구입니다. 실시간 동기화와 푸시 알림을 지원합니다.',
    challenges: [
      'Flutter 상태 관리 최적화',
      'Firebase 실시간 동기화 구현',
      '오프라인 모드 지원',
    ],
    learnings: [
      'Provider 패턴을 활용한 상태 관리',
      'Firebase의 실시간 데이터베이스 활용',
      '모바일 앱 성능 프로파일링',
    ],
  },
  {
    id: 3,
    title: 'Data Automation Tool',
    category: 'Automation',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    summary: 'Python 기반 데이터 수집 및 분석 자동화 프로그램',
    tags: ['Python', 'FastAPI', 'Pandas', 'Selenium'],
    period: '2023.08 - 2023.09',
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    overview: '반복적인 데이터 수집 작업을 자동화하여 업무 효율을 300% 향상시킨 프로젝트입니다.',
    challenges: [
      '다양한 웹사이트 구조 파싱',
      '데이터 정합성 검증',
      '스케줄링 및 에러 복구',
    ],
    learnings: [
      'Selenium을 활용한 동적 웹 크롤링',
      'FastAPI로 RESTful API 구축',
      '에러 핸들링 및 로깅 전략',
    ],
  },
  {
    id: 4,
    title: 'AI Content Generator',
    category: 'Web',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    summary: 'OpenAI API를 활용한 AI 콘텐츠 생성 플랫폼',
    tags: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    period: '2024.04 - 진행중',
    githubUrl: 'https://github.com',
    demoUrl: 'https://example.com',
    overview: '마케팅 콘텐츠를 AI로 생성하고 관리할 수 있는 SaaS 플랫폼입니다.',
    challenges: [
      'AI 프롬프트 엔지니어링',
      '사용량 기반 요금제 구현',
      '실시간 콘텐츠 생성 UI/UX',
    ],
    learnings: [
      'OpenAI API 통합 및 최적화',
      'Stripe 구독 결제 시스템',
      'React Query를 활용한 상태 관리',
    ],
  },
];

const categories = ['All', 'Web', 'Mobile', 'Automation'];

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

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
          <h2 className="mb-4">Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            문제 해결 능력 중심으로 정리한 프로젝트 포트폴리오입니다.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 border-2 transition-all ${
                selectedCategory === category
                  ? 'bg-black text-white border-black'
                  : 'border-black text-black hover:bg-blue-600 hover:text-white hover:border-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-500">{project.period}</span>
                </div>
                <h3 className="mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-2 bg-blue-600 text-white">
                      {selectedProject.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="text-sm">{selectedProject.period}</span>
                    </div>
                  </div>

                  <h2 className="mb-4">{selectedProject.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 flex items-center gap-1"
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3">프로젝트 개요</h4>
                      <p className="text-gray-600">{selectedProject.overview}</p>
                    </div>

                    <div>
                      <h4 className="mb-3">주요 문제 및 해결 과정</h4>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map((challenge, i) => (
                          <li key={i} className="text-gray-600 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-3">배운 점</h4>
                      <ul className="space-y-2">
                        {selectedProject.learnings.map((learning, i) => (
                          <li key={i} className="text-gray-600 flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-blue-600 transition-colors"
                      >
                        <Github size={20} />
                        GitHub
                      </a>
                    )}
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
                      >
                        <ExternalLink size={20} />
                        Live Demo
                      </a>
                    )}
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
