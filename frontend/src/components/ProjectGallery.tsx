import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageViewer } from './ImageViewer';

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // 빈 값, null, undefined 필터링 및 유효한 이미지만 필터링
  // 이미지 파일 확장자만 허용하고, 플레이스홀더 파일 제외
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  const validImages = (images?.filter((img) => {
    if (!img || img.trim() === '') return false;
    // .emptyFolderPlaceholder 같은 플레이스홀더 파일 제외
    if (img.includes('.emptyFolderPlaceholder') || img.includes('.gitkeep')) return false;
    // 이미지 확장자 확인
    const lowerImg = img.toLowerCase();
    return imageExtensions.some(ext => lowerImg.includes(ext));
  }) || []).map((img) => {
    // URL 끝의 불필요한 ? 제거
    let cleanUrl = img.trim();
    if (cleanUrl.endsWith('?')) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    // 이미 절대 URL인 경우 그대로 반환
    if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
      return cleanUrl;
    }
    // 상대 경로인 경우 현재 origin과 결합
    if (cleanUrl.startsWith('/')) {
      return `${window.location.origin}${cleanUrl}`;
    }
    // 그 외의 경우 그대로 반환
    return cleanUrl;
  }).sort((a, b) => {
    // 파일명에서 숫자 추출하여 숫자 순서로 정렬
    const getNumberFromUrl = (url: string): number => {
      // URL에서 파일명 추출
      const fileName = url.split('/').pop() || '';
      // 파일명에서 숫자 추출 (확장자 제거 후)
      const match = fileName.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    const numA = getNumberFromUrl(a);
    const numB = getNumberFromUrl(b);
    
    // 숫자 순서로 정렬
    return numA - numB;
  });


  if (!validImages || validImages.length === 0) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedIndex(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-6">프로젝트 갤러리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {validImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  setImageErrors((prev) => new Set(prev).add(index));
                  // 이미지 로드 실패 시 숨김 처리
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => {
                  // 이미지 로드 성공 시 에러 목록에서 제거
                  setImageErrors((prev) => {
                    const next = new Set(prev);
                    next.delete(index);
                    return next;
                  });
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedIndex !== null && (
        <ImageViewer
          images={validImages}
          initialIndex={selectedIndex}
          isOpen={selectedIndex !== null}
          onClose={handleCloseViewer}
        />
      )}
    </>
  );
}

