import React from 'react';

/**
 * Converts markdown-style text to React elements
 * - Headings (###, ##, #) -> Bold text without the markdown
 * - Bold (**text**) -> <strong>text</strong>
 * - Preserves newlines
 */
export function parseMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];

  // Debug: Log first 200 chars to see what we're parsing (only for first call)
  if (text.length > 0 && (text.includes('###') || text.includes('##') || text.includes('**'))) {
    console.log('parseMarkdown input sample:', text.substring(0, 200));
    console.log('Has ###:', text.includes('###'));
    console.log('Has ##:', text.includes('##'));
    console.log('Has **:', text.includes('**'));
    console.log('Lines count:', text.split('\n').length);
  }

  // Split by newlines first to preserve line breaks
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    // Trim the line first to remove any leading/trailing whitespace
    const trimmedLine = line.trim();
    
    // Process heading markers (###, ##, #) - must be at the start of line
    const headingMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      // It's a heading - remove the # and make the text bold
      const headingLevel = headingMatch[1].length; // Number of # characters
      const headingText = headingMatch[2].trim();
      
      // Different styles for different heading levels
      let headingClass = 'font-bold block mb-2';
      if (headingLevel === 1) {
        headingClass += ' text-2xl mt-4';
      } else if (headingLevel === 2) {
        headingClass += ' text-xl mt-3';
      } else if (headingLevel >= 3) {
        headingClass += ' text-lg mt-2';
      }
      
      result.push(
        <strong key={`heading-${lineIndex}`} className={headingClass}>
          {parseInlineMarkdown(headingText)}
        </strong>
      );
      return;
    }

    if (line.trim() === '') {
      // Empty line - add a break for spacing
      result.push(<br key={`br-${lineIndex}`} />);
      return;
    }

    // Process regular line with bold text (**text**)
    result.push(
      <React.Fragment key={`line-${lineIndex}`}>
        {parseInlineMarkdown(line)}
      </React.Fragment>
    );

    // Add line break if not the last line
    if (lineIndex < lines.length - 1) {
      result.push(<br key={`line-br-${lineIndex}`} />);
    }
  });

  return result;
}

/**
 * Parses inline markdown like **bold** and converts to React elements
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  if (!text) return [];
  
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  let keyIndex = 0;

  // Reset regex lastIndex
  boldRegex.lastIndex = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) {
        parts.push(beforeText);
      }
    }

    // Add bold text
    parts.push(
      <strong key={`bold-${keyIndex++}`} className="font-bold">
        {match[1]}
      </strong>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      parts.push(remainingText);
    }
  }

  // If no bold text was found, return the original text
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}
