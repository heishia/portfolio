"""
OG 이미지 생성 스크립트 (간단 버전)
SVG를 생성하고, 필요시 PNG로 변환할 수 있습니다.
"""
from pathlib import Path

def generate_og_image_svg():
    """OG 이미지 SVG 생성"""
    svg_content = '''<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  <text x="600" y="315" font-family="Arial, 'Malgun Gothic', sans-serif" font-size="120" font-weight="bold" fill="#3b82f6" text-anchor="middle" dominant-baseline="middle">PPOP_DEV</text>
</svg>'''
    return svg_content

def save_og_image(svg_content: str, output_path: str = None):
    """OG 이미지 저장"""
    if output_path is None:
        # frontend/public 폴더에 저장
        frontend_dir = Path(__file__).parent.parent.parent / "frontend" / "public"
        output_path = frontend_dir / "og-image.svg"
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # SVG로 저장
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    print(f"OG 이미지가 생성되었습니다: {output_path}")
    print(f"크기: 1200x630px")
    print("\n참고: SVG 파일입니다. PNG가 필요하면 브라우저에서 열어서 PNG로 저장하거나,")
    print("Pillow를 설치하여 PNG로 변환할 수 있습니다.")

if __name__ == "__main__":
    print("OG 이미지 생성 중...")
    svg_content = generate_og_image_svg()
    save_og_image(svg_content)
    print("완료!")

