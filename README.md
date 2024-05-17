# PJT-10 FINAL
django REST API와 Vue.js를 활용한 영화 추천 및 커뮤니티
- Notion 
[https://www.notion.so/a10dd029a0a344e287360d3ee020190a?pvs=4]
- git
[https://github.com/poow810/movie_project]
## SITE NAME
- 추후 추가

## 팀원
- 김진우
  - Front-End
  - IA 설계(05.16)
  - 웹페이지 레이아웃 설계

- 박하운
  - Back-End
  - ERD 모델링
  - 회원가입 기능 추가(05.16)
  - 로그인 기능 추가(05.16)

## 목표 설계
- API를 활용한 영화 추천 서비스
  - openweather, TMDB, Youtube API
- 익명 커뮤니티 서비스
- UX / UI 기반 설계
- HTML, CSS, JavaScript, django, Vue, Rest API, DataBase 를 활용한 서비스 설계
- 기능
  - 장르별 추천 (장르별 TOP유저)
  - 배우 순위 및 필모조회
  - 실시간 조회수 순위 조회
  - 회원가입, 탈퇴, 로그인, 로그아웃, 비밀번호 변경 등 Authenticaten 서비스 구현
  - 홈 페이지: 영화 리스트, 영화 상세페이지 구현
  - 회원 프로필: 선호 장르 선택, 남긴 리뷰, 팔로우 팔로워

## 설치
- python
```

```
- vue
```
npm create vue@latest
npm install
npm run dev
npm install axios
npm install vuex-plugin-persistedstate

npm install -S vue-carousel-3d
```

# 프로젝트
## 개요
## IA (Information Architecture)
![]
## ERD



## 날짜별 진행
### 240516
> 기획 및 컨셉 설계 <br>
> 페이지 구성 설계 <br>
> 목표 설정 <br>
- BE: 박하운
  - 로그인
  - 회원가입
  - 배포서버 구축
- FE : 김진우
  - 로그인
  - 회원가입
  - npm install axios
  - npm install vuex-plugin-persistedstate

### 240517
> ERD설계
> 뷰 / 컴포넌트 만들기 <br>
> nav: 커뮤니티 / 영화 / 유저 <br>
> compo: 게시글, 댓글 / 영화리스트 / 좋아요, 좋아요 한 영화 목록, 평점, 팔로우 <br>

- BE: 박하운
  - User model Custom
  - 프로필 조회 기능 구현
  - Community 모델 설계
  - Movie 모델 설계
  - Community CRUD 구현
  - 기본 base로 사용할 Movie data를 TMDB API 요청을 통해 추출
- FE: 김진우
  - youtube 미리보기 추가
  - HomeView 컴포넌트 추가 (홈, 커뮤니티, 로그인, 로그아웃)
  - 회원가입 커스텀 속성추가 (email, nickname)
  - 커뮤니티 글쓰기 기능 추가
  - 로그아웃 기능 추가
