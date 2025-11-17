"""
OG 이미지 생성 스크립트
1200x630px 크기의 OG 이미지를 생성합니다.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# 이미지 크기 (OG 이미지 권장 크기)
WIDTH = 1200
HEIGHT = 630

# 색상 설정
BACKGROUND_COLOR = (0, 0, 0)  # 검은색 배경
TEXT_COLOR = (59, 130, 246)  # 파란색 텍스트 (blue-600)

def generate_og_image():
    """OG 이미지 생성"""
    # 이미지 생성
    img = Image.new('RGB', (WIDTH, HEIGHT), color=BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)
    
    # 텍스트 설정
    text = "PPOP_DEV"
    
    # 폰트 크기 설정 (이미지 크기에 맞게 조정)
    font_size = 120
    try:
        # 시스템 폰트 사용 (Windows)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            # macOS 폰트
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
        except:
            # 기본 폰트
            font = ImageFont.load_default()
            font_size = 80
    
    # 텍스트 크기 계산
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # 텍스트 위치 계산 (가운데 정렬)
    x = (WIDTH - text_width) / 2
    y = (HEIGHT - text_height) / 2
    
    # 텍스트 그리기
    draw.text((x, y), text, fill=TEXT_COLOR, font=font)
    
    return img

def save_og_image(img, output_path: str = None):
    """OG 이미지 저장"""
    if output_path is None:
        # frontend/public 폴더에 저장
        frontend_dir = Path(__file__).parent.parent.parent / "frontend" / "public"
        output_path = frontend_dir / "og-image.png"
    
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # PNG로 저장
    img.save(output_path, "PNG", optimize=True)
    print(f"OG 이미지가 생성되었습니다: {output_path}")
    print(f"크기: {WIDTH}x{HEIGHT}px")

if __name__ == "__main__":
    print("OG 이미지 생성 중...")
    img = generate_og_image()
    save_og_image(img)
    print("완료!")

