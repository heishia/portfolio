import React from 'react';

/**
 * 텍스트를 토큰으로 분리합니다 (공백 기준)
 */
export function tokenizeText(text: string): string[] {
  if (!text) return [];
  // 공백을 기준으로 토큰화하되, 공백도 유지
  return text.split(/(\s+)/).filter(token => token.length > 0);
}

/**
 * 텍스트를 지정된 너비에 맞게 줄바꿈합니다
 * @param text 원본 텍스트
 * @param maxCharsPerLine 한 줄에 들어갈 최대 문자 수
 */
export function wrapText(text: string, maxCharsPerLine: number = 30): string[] {
  if (!text) return [];
  
  const tokens = tokenizeText(text);
  const lines: string[] = [];
  let currentLine = '';

  tokens.forEach(token => {
    // 공백 토큰인 경우
    if (/^\s+$/.test(token)) {
      currentLine += token;
      return;
    }

    // 현재 줄에 토큰을 추가했을 때 길이 확인
    const testLine = currentLine + token;
    
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      // 현재 줄이 비어있지 않으면 저장하고 새 줄 시작
      if (currentLine.trim()) {
        lines.push(currentLine.trim());
      }
      currentLine = token;
    }
  });

  // 마지막 줄 추가
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  return lines;
}

/**
 * 장문 텍스트를 20px 높이의 일정한 크기로 렌더링하는 컴포넌트
 */
interface UniformTextProps {
  text: string;
  fontSize?: number; // px 단위
  lineHeight?: number; // px 단위
  className?: string;
  maxCharsPerLine?: number;
}

export function UniformText({ 
  text, 
  fontSize = 20, 
  lineHeight = 20,
  className = '',
  maxCharsPerLine = 30
}: UniformTextProps) {
  const lines = wrapText(text, maxCharsPerLine);

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            height: `${lineHeight}px`,
            overflow: 'hidden',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

/**
 * React 컴포넌트로 텍스트를 렌더링하는 함수
 */
export function renderUniformText(
  text: string,
  fontSize: number = 20,
  lineHeight: number = 20,
  maxCharsPerLine: number = 30
): React.ReactNode {
  const lines = wrapText(text, maxCharsPerLine);

  return (
    <>
      {lines.map((line, index) => (
        <div
          key={index}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            height: `${lineHeight}px`,
            overflow: 'hidden',
          }}
        >
          {line}
        </div>
      ))}
    </>
  );
}

