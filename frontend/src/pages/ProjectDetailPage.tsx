import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Tag, ExternalLink, Github, CheckCircle } from 'lucide-react';
import { fetchProjectById, ProjectDetail } from '../utils/api';

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setError('프로젝트 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        if (!id) {
          throw new Error('프로젝트 ID가 없습니다.');
        }
        const data = await fetchProjectById(id);
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다.');
        console.error('Failed to fetch project:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">프로젝트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || '프로젝트를 찾을 수 없습니다.'}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              프로젝트 목록으로
            </button>
            {id && (
              <button
                onClick={() => {
                  fetchProjectById(id)
                    .then(setProject)
                    .catch((err) => setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다.'));
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                다시 시도
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        {project.app_icon || project.thumbnail_url ? (
          <img
            src={project.app_icon || project.thumbnail_url || ''}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-lg">이미지 없음</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} />
                프로젝트 목록으로
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-blue-600 text-white text-sm">
                  {project.project_type}
                </span>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Calendar size={16} />
                  <span>
                    {new Date(project.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })}
                    {project.is_ongoing ? ' - 진행중' : project.end_date ? ` - ${new Date(project.end_date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' })}` : ''}
                  </span>
                </div>
              </div>
              
              <h1 className="text-white mb-2">{project.title}</h1>
              {project.subtitle && (
                <p className="text-white/70 text-lg mb-4">{project.subtitle}</p>
              )}
              <p className="text-white/80 text-xl max-w-3xl">{project.description}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-12 pb-12 border-b border-gray-200"
          >
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-blue-600 transition-colors"
              >
                <Github size={20} />
                GitHub 보기
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                <ExternalLink size={20} />
                Live Demo
              </a>
            )}
            {project.documentation_url && (
              <a
                href={project.documentation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <ExternalLink size={20} />
                문서 보기
              </a>
            )}
          </motion.div>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="mb-4">기술 스택</h3>
              <div className="space-y-4">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">{tech.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-blue-600/10 text-blue-600 border border-blue-600/20 text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-12"
            >
              <h3 className="mb-4">태그</h3>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-2"
                  >
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Detailed Description */}
          {project.detailed_description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="mb-6">프로젝트 상세 설명</h2>
              <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {project.detailed_description}
              </div>
            </motion.div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="mb-6">주요 기능</h2>
              <div className="space-y-6">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 border-l-4 border-blue-600"
                  >
                    <h4 className="mb-2 text-lg font-semibold">{feature.name}</h4>
                    <p className="text-gray-700 mb-2">{feature.description}</p>
                    {feature.details && (
                      <p className="text-gray-600 text-sm">{feature.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="mb-6">주요 도전과제</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.challenges}
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          {project.achievements && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <h2 className="mb-6">주요 성과</h2>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {project.achievements}
              </div>
            </motion.div>
          )}

          {/* Code Snippets */}
          {project.code_snippets && project.code_snippets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <h2 className="mb-6">코드 스니펫</h2>
              <div className="space-y-6">
                {project.code_snippets.map((snippet, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto"
                  >
                    <div className="mb-3">
                      <h4 className="text-white font-semibold mb-1">{snippet.title}</h4>
                      <p className="text-gray-400 text-sm mb-2">{snippet.description}</p>
                      <p className="text-gray-500 text-xs">{snippet.file_path}</p>
                    </div>
                    <pre className="text-sm">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Statistics */}
          {(project.lines_of_code || project.commit_count || project.contributor_count) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-12"
            >
              <h2 className="mb-6">프로젝트 통계</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {project.lines_of_code && (
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-black text-white text-center">
                    <p className="text-2xl font-bold mb-2">{project.lines_of_code.toLocaleString()}</p>
                    <p className="text-sm">코드 라인 수</p>
                  </div>
                )}
                {project.commit_count && (
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-black text-white text-center">
                    <p className="text-2xl font-bold mb-2">{project.commit_count.toLocaleString()}</p>
                    <p className="text-sm">커밋 수</p>
                  </div>
                )}
                {project.contributor_count && (
                  <div className="p-6 bg-gradient-to-br from-blue-600 to-black text-white text-center">
                    <p className="text-2xl font-bold mb-2">{project.contributor_count}</p>
                    <p className="text-sm">기여자 수</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="mb-6">비슷한 프로젝트가 필요하신가요?</h3>
          <p className="text-gray-600 mb-8">
            이러한 경험을 바탕으로 여러분의 프로젝트를 성공으로 이끌어드립니다.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white hover:bg-black transition-colors"
          >
            프로젝트 의뢰하기
            <ArrowLeft size={20} className="rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
