user = '유저 아이디'
password = '비밀번호'
host = 'db host주소'
port = '포트 번호'
database = 'db 명'

SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
UPLOAD_FOLDER = 'tmp'