import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { fetchProjects, Project } from '../utils/api';

const projectTypeLabels: Record<string, string> = {
  'web': 'Web',
  'mobile': 'Mobile',
  'desktop': 'Desktop',
  'fullstack': 'Full Stack',
  'backend': 'Backend',
  'frontend': 'Frontend',
};

const projectTypeGradients: Record<string, string> = {
  'web': 'from-blue-400 to-blue-600',
  'mobile': 'from-purple-400 to-purple-600',
  'desktop': 'from-green-400 to-green-600',
  'fullstack': 'from-orange-400 to-orange-600',
  'backend': 'from-red-400 to-red-600',
  'frontend': 'from-cyan-400 to-cyan-600',
};

export function ProjectsPage() {
  const [selectedType, setSelectedType] = useState('전체');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projectType = selectedType === '전체' ? undefined : selectedType.toLowerCase();
        const data = await fetchProjects(projectType);
        // Data already contains actual newline characters, whitespace-pre-wrap CSS will handle it
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다.');
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [selectedType]);

  const filteredProjects = projects;

  // Get unique project types from projects
  const availableTypes = ['전체', ...Array.from(new Set(projects.map(p => p.project_type).map(type => projectTypeLabels[type] || type)))];
  
  // Helper function to format date period
  const formatPeriod = (startDate: string, endDate: string | null, isOngoing: boolean) => {
    const start = new Date(startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(0, 0, 0, 0);
      // end_date가 오늘 이후이거나 같고 is_ongoing이 true면 진행중, 그렇지 않으면 종료일 표시
      if (end >= today && isOngoing) {
        return `${start} - 진행중`;
      } else {
        return `${start} - ${end.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}`;
      }
    }
    // end_date가 없고 is_ongoing이 true면 진행중
    if (isOngoing) {
      return `${start} - 진행중`;
    }
    return start;
  };

  return (
    <div className="pt-20">
      {/* Filter & Projects */}
      <section className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          {/* Project Type Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            {availableTypes.map((type, index) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type)}
                className={`px-8 py-4 font-medium transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-600">프로젝트를 불러오는 중...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => {
                  const projectType = selectedType === '전체' ? undefined : selectedType.toLowerCase();
                  fetchProjects(projectType)
                    .then(setProjects)
                    .catch((err) => setError(err instanceof Error ? err.message : '프로젝트를 불러오는데 실패했습니다.'));
                }}
                className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white overflow-hidden border border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500"
              >
                <Link to={`/projects/${project.id}`}>
                    {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {project.app_icon ? (
                      <div className="w-full h-full bg-white flex items-center justify-center p-8">
                        <img
                          src={project.app_icon}
                          alt={project.title}
                          className="w-32 h-32 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">이미지 없음</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Icons */}
                    <motion.div
                      className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      {project.github_url && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.github_url!, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
                        >
                          <Github size={18} />
                        </button>
                      )}
                      {project.demo_url && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.demo_url!, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
                        >
                          <ExternalLink size={18} />
                        </button>
                      )}
                    </motion.div>

                    {/* Project Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-4 py-2 bg-gradient-to-r ${projectTypeGradients[project.project_type] || 'from-blue-400 to-blue-600'} text-white text-sm font-medium backdrop-blur-sm`}>
                        {projectTypeLabels[project.project_type] || project.project_type}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <Calendar size={14} />
                      <span>{formatPeriod(project.start_date, project.end_date, project.is_ongoing)}</span>
                    </div>

                    <h3 className="text-2xl mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>
                    )}

                    <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed whitespace-pre-wrap break-words">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-50 text-gray-600 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View More */}
                    <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                      <span>자세히 보기</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>

                  {/* Gradient Border on Hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${projectTypeGradients[project.project_type] || 'from-blue-400 to-blue-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ padding: '2px', zIndex: -1 }}
                  />
                </Link>
              </motion.div>
            ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-600">표시할 프로젝트가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}