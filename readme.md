# Flowery 소개

## 꽃은 시들어도 Flowery는 영원히

`Flowery`는 꽃을 선물할 때 꽃과 함께 카드에 마음을 담아 상대방에게 전하는 서비스입니다.

다중 객체 인식을 통한 꽃다발 속 꽃들을 인식하여 



## 0️⃣ 목표

------

⭐ 꽃으로 마음을 주고 받는 문화 정착 시키기

⭐ 서비스를 **실현**시켜 실제 꽃가게에서 고객에게 서비스 제공하기





프로젝트 기간

4.10(월) ~ 5.19(금) (6주)



프로젝트 인원

BE

- 고영일
- 하상재

AI

- 정인모

FE

- 최창근
- 이승민
- 배우찬







## 🛠️ 사용된 도구

- React 18.2.0

- recoil 4.2.0

- typescript 4.9.5

- npm 8.19.3

- node 18.13.0

- vs code 1.77.3

- tailwindcss 3.3.2

  

- Spring Boot 2.7.11

- Intellij Ultimate

- JDK 11

  

- GitLab

- Jira

- Jenkins

- MariaDB

- Redis



## 🖥️ 사용된 기술

**[ BACK END ]**

- **Spring Boot** : Run WIth Me Project의 전반적인 Rest Controller 구현.

- **Spring Security** : WebSecurityConfigurerAdapter를 상속받아 Filter를 적용, 사용자 권한에 맞는 기능을 수행하도록 구현.

- **JWT** : JSON Web Token을 활용하여 회원 인증 및 안정성있는 정보 교환을 할 수 있도록 활용.

- JPA (Hibernate)

  : ORM인 Hibernate를 활용하여 객체 중심의 개발을 할 수 있도록 하였고, SQL을 직접 작성하지 않고 Entity 필드가 되는 객체를 통해 DB를 동작시켜 유지보수에 용이하게 활용.

  - 동일한 쿼리에 대한 캐시 기능을 사용하기 때문에 높은 효율성 기대

- SSL 프로토콜

  : SSL을 적용하여 전송되는 패킷값을 암호화하여 외부의 공격자로부터 데이터를 보안하기 위해 사용.

  - **Let’s Encrypt** 무료 인증서를 발급받아 웹서버에 SSL 인증서를 적용.

- **Maria DB** : RDBMS로 구매자, 판매자, 꽃과 카드 등 필요한 데이터를 저장.

- Redis

  : 비관계형 데이터베이스로 'Key-Value' 구조 데이터 관리 시스템이며, 데이터를 메모리에 저장하여 빠른 처리속도가 필요한 기능에 적용.

  - 전화번호 인증을 위한 초단기간 저장을 위해 사용.

  - 만료일을 저장하면 만료 시 자동으로 데이터가 사라지는 특성을 활용하여 로그아웃된 토큰을 저장하여 블랙리스트로 활용.

- AWS

  - EC2 서비스를 이용하여 Ubuntu 서버를 구축 (호스팅).
  - S3 서비스를 이용하여 사진 및 영상을 저장하기 위해 사용.

- **Nginx** : 웹 서버를 구축

  - 
