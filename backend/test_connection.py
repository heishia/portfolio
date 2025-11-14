from core.database import test_connection

if __name__ == "__main__":
    if test_connection():
        print("데이터베이스 연결 성공!")
    else:
        print("데이터베이스 연결 실패. .env 파일을 확인하세요.")

