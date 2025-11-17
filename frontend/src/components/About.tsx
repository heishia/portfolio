import { motion } from 'motion/react';
import { Code2, Smartphone, Database, Layers, Zap, Users } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    color: 'blue',
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Flutter', 'iOS/Android'],
    color: 'blue',
  },
  {
    title: 'Backend',
    icon: Database,
    skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL'],
    color: 'blue',
  },
  {
    title: 'DevOps',
    icon: Layers,
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD'],
    color: 'blue',
  },
];

const values = [
  {
    icon: Zap,
    title: '빠른 실행력',
    description: '아이디어를 빠르게 프로토타입으로 구현하고, 피드백을 통해 개선합니다.',
  },
  {
    icon: Users,
    title: '협업 중심',
    description: '명확한 커뮤니케이션과 문서화를 통해 팀과 함께 성장합니다.',
  },
  {
    icon: Code2,
    title: '클린 코드',
    description: '유지보수 가능한 코드와 확장 가능한 아키텍처를 지향합니다.',
  },
];

export function About() {
  return (
    <div className="py-24 xs:py-16 px-6 xs:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            기술을 통해 사람들의 문제를 해결하는 것에 보람을 느끍니다.
            <br />
            단순히 코드를 작성하는 것을 넘어, 사용자 경험과 비즈니스 가치를 고민합니다.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-4 mb-20 xs:mb-12">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="border-2 border-black p-6 xs:p-4 h-full hover:bg-black hover:text-white transition-all duration-300">
                  <Icon className="mb-4 xs:mb-3 group-hover:text-blue-600 xs:w-7 xs:h-7" size={32} />
                  <h3 className="mb-4 xs:mb-3 xs:text-base">{category.title}</h3>
                  <ul className="space-y-2 xs:space-y-1.5">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm xs:text-xs opacity-80">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-center mb-12 xs:mb-8 xs:text-xl">개발 철학</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 xs:w-14 h-16 xs:h-14 bg-blue-600 text-white mb-4 xs:mb-3">
                    <Icon size={28} className="xs:w-6 xs:h-6" />
                  </div>
                  <h4 className="mb-3 xs:mb-2 xs:text-base">{value.title}</h4>
                  <p className="text-gray-600 text-sm xs:text-xs">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Current Focus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 xs:mt-12 bg-gray-50 p-8 xs:p-4 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 xs:gap-6">
            <div>
              <h4 className="mb-4 xs:mb-3 xs:text-base">현재 진행 중인 프로젝트</h4>
              <ul className="space-y-2 xs:space-y-1.5 text-gray-600 xs:text-sm">
                <li>• AI 기반 콘텐츠 생성 플랫폼</li>
                <li>• 실시간 협업 도구 개발</li>
                <li>• 자동화 솔루션 컨설팅</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 xs:mb-3 xs:text-base">함께하고 싶은 분야</h4>
              <ul className="space-y-2 xs:space-y-1.5 text-gray-600 xs:text-sm">
                <li>• SaaS 제품 개발</li>
                <li>• 스타트업 기술 파트너십</li>
                <li>• 교육 플랫폼 구축</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
