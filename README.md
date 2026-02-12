
# 5조 우유: 💊영구(영양제 구독)

<br>

<img width="950" height="530" alt="global" src="https://github.com/user-attachments/assets/a1650c9e-f46e-4908-8c29-48b2a821d1b0" />

<br>
<br>

## 🚀 프로젝트 개요  
**영구**(영양제 구독)는 사용자의 컨디션 상태를 기준으로 건강식품을 추천하고 구성해 정기적으로 제공하는 맞춤형 구독 서비스다.

기존 건강식품 구독 서비스는 성분이나 연령대 기준으로 추천해, 개인의 실제 컨디션 변화를 반영하지 못한다. 
이 서비스는 **사용자의 현재 컨디션 설문과 기록을 바탕**으로 필요한 영양소와 건강식품을 **AI**가 추천해준다. 
매달 고정된 제품이 아닌 상태에 따라 구성되는 유연한 구독을 제공한다. 
단순히 제품을 파는 것이 아니라, 사용자가 자신의 컨디션을 이해하고 관리하도록 돕는 서비스다.  

<br>
<br>

## 🕖기간
2025.1.14 ~ 2025.2.13

<br>
<br>

## 🧑‍💻 팀원 역할 및소개
| <img width="220" src="https://github.com/user-attachments/assets/ef18f0f1-0bc2-4db2-8932-3932634f161d" /> | <img width="220" src="https://github.com/user-attachments/assets/bd5a64c8-9b6b-4ec3-8d66-b75771b4ca9e" /> | <img width="220" src="https://github.com/user-attachments/assets/00b76f24-1a47-4181-ab5a-787b30fb4d53" /> | <img width="220"  src="https://github.com/user-attachments/assets/c271bd28-98a7-4b69-9405-c3bc7eb29a8b" /> |
|:--:|:--:|:--:|:--:|
| **이유진** | **백승준** | **김은재** | **장수정** |
| 조장 (PM) | PL | 서기 | 발표 |
| 결제/구독 및 마이페이지 | 공통·메인 및 로그인/회원가입 | 설문·AI 추천 결과 | 상품 목록·상세 |





<br>
<br>

## 🛠️ 기술스택  
![다이어그램](https://cdn.discordapp.com/attachments/1402552622879215727/1441691012031451156/aa334db4024033fc.png?ex=6922b6e2&is=69216562&hm=95743d768c541f71b2100d3a7e26133ccce1b5206afaff30afa429aab90b3a4c&)


<br>
<br>

## 🤝 협업 방식  

<br>

### 📚작업 분배 방식
**기능 단위 분리 방식**
- 공통 컴포넌트
- 메인 페이지
- 로그인 페이지
- 회원가입 페이
- 설문조사 페이지
- AI 추천 결과 페이지
- 상품 리스트 페이지
- 상품 상세 페이지
- 결제/구독 페이지
- 마이페이지
기능 단위로 작업을 분리하여 개발

<hr>

**우선순위 기반 할당**
- 필수 기능(설문 결과 요약,구독 상태)
- 선택 기능(소셜 로그인)
  
<hr>

**모듈 단위 개발**
- 기능 단위를 웹 컴포넌트(Header, Nav 등)나 모듈로 나누어 개발함하여
변경·추가 시 충돌을 줄이고 유지보수성을 높였음

<br>
<br>

### 🗨️소통 및 이슈 관리 방법
**소통 방식**
- 메신저 기반 실시간 소통(디스코드)
- 오전9시,오후 5시 데일리 스크럼 진행

<hr>

**이슈 관리 방식**
- GitHub Issues 활용(기능 세분화 한 것들을 이슈로 등록 한 후 커밋 메세지 컨벤션 준수하여 등록)
- Git Branch 전략 적용(기능별 브랜치 생성)

<hr>

**PR기반 협업 프로세스 추가**
- PR을 통한 코드 검토 및 반영
- 기능 개발이 완료된 브랜치를 PR로 제출
- 코드 리뷰 후 메인 브랜치 병합

<hr>

**작업 현황 시각적 관리**
- Notion을 활용하여 실시간으로 작업 상태 관리
 
<br>
<br>

## ✨ 기능 소개 

### 🏠 메인 페이지

- 💊 서비스 소개

<table>
<tr>
<td>
<img width="1883" height="908" alt="스크린샷 2026-02-12 113958" src="https://github.com/user-attachments/assets/bdc1f0e6-99ce-46ea-abb4-db7b22adeacf" />



</td>
<td>
<img width="1898" height="909" alt="스크린샷 2026-02-12 114027" src="https://github.com/user-attachments/assets/2825514e-88dd-4d21-83c1-3bba94d1a25b" />



</td>
</tr>
</table>




<hr>

### 🔓로그인 페이지

- 💊로그인 기능
- 💊소셜 로그인
<table>
<tr>
<td>

<img width="1902" height="902" alt="스크린샷 2026-02-12 114111" src="https://github.com/user-attachments/assets/3d0276ae-d1c4-4e97-b1fb-7786a491a43e" />


</td>
<td>

<img width="1919" height="901" alt="스크린샷 2026-02-12 114119" src="https://github.com/user-attachments/assets/01ae66d4-0c8c-4d88-b976-200f7ed7bd92" />


</td>
</tr>
</table>



<hr>

### 🔐회원가입 페이지

- 💊회원가입 기능
- 💊봄인인증
<table>
<tr>
<td>

<img width="1896" height="911" alt="스크린샷 2026-02-12 114138" src="https://github.com/user-attachments/assets/1100beb3-20b7-45a3-b616-2286b51aaba4" />


</td>
<td>

<img width="1898" height="907" alt="스크린샷 2026-02-12 114243" src="https://github.com/user-attachments/assets/e271fa2c-3b77-4240-8ad2-439f3b74a6af" />


</td>
</tr>
</table>




<hr>

### 🔎설문 페이지

- 💊컨디션 관련 설문 입력
- 💊설문 제출
<table>
<tr>
<td>

<img width="1898" height="904" alt="스크린샷 2026-02-12 114505" src="https://github.com/user-attachments/assets/047d3b6c-367d-44ec-9742-aa88b8908501" />


</td>
<td>


<img width="1900" height="907" alt="스크린샷 2026-02-12 114547" src="https://github.com/user-attachments/assets/7151eba1-70ee-4617-b94f-030cfbb8b05c" />

</td>
</tr>
</table>




<hr>

###🤖AI추천 결과 페이지

- 💊설문 결과 요약
- 💊추천 영양제 목록
- 💊AI 채팅
<table>
<tr>
<td>

<img width="1899" height="903" alt="스크린샷 2026-02-12 114606" src="https://github.com/user-attachments/assets/7de4f323-a52e-4c54-872a-9a10b835bd80" />


</td>
<td>

<img width="1893" height="902" alt="스크린샷 2026-02-12 114629" src="https://github.com/user-attachments/assets/b5183653-1f94-4ad0-b018-edf6774937b3" />

</td>
</tr>
</table>



<hr>

### 🛍️상품 목록 페이지

- 💊상품 목록 조회
- 💊상품카드 -> 상페 페이지 이동
<table>
<tr>
<td>

<img width="1896" height="911" alt="스크린샷 2026-02-12 114652" src="https://github.com/user-attachments/assets/5b39e1a5-6c14-497f-a781-f6bd0f1f053d" />


</td>

<td>

<img width="1892" height="907" alt="스크린샷 2026-02-12 121826" src="https://github.com/user-attachments/assets/f0c87ffc-3f1d-4d1d-b6be-e75fe05d218a" />


</td>

</tr>
</table>




<hr>

### 📄상품 상세 페이지

- 💊상품 상세 정보 표시
<table>
<tr>
<td>
<img width="1896" height="911" alt="스크린샷 2026-02-12 114652" src="https://github.com/user-attachments/assets/da2c11d8-8625-49ae-ada2-870c4f1f7566" />



</td>
<td>
<img width="1898" height="910" alt="스크린샷 2026-02-12 114730" src="https://github.com/user-attachments/assets/c4434571-55cb-48c1-8428-afe612a81f3c" />


</td>
</tr>
</table>

<hr>

### 💳결제/구독 페이지

- 💊결제 정보 확인
- 💊구독 결제 처리

<table>
<tr>
<td>

<img width="1898" height="904" alt="스크린샷 2026-02-12 114807" src="https://github.com/user-attachments/assets/7c9ae6ae-f3bd-4c12-ab17-537f6a7a6669" />


</td>
<td>

<img width="1888" height="909" alt="스크린샷 2026-02-12 114836" src="https://github.com/user-attachments/assets/27a2ec20-98f7-4333-8502-6ae5e47ec2e9" />


</td>
</tr>
</table>

<hr>

### 🙋마이 페이지

- 💊사용자 정보
- 💊구독 상태
- 💊설문 정보

<table>
<tr>
<td>
<img width="1897" height="905" alt="스크린샷 2026-02-12 114857" src="https://github.com/user-attachments/assets/49697645-633e-4109-8488-3e8bcab79bf8" />


</td>
<td>

<img width="1898" height="909" alt="스크린샷 2026-02-12 114906" src="https://github.com/user-attachments/assets/605710a6-5b7d-482a-8801-f6853c38789d" />


</td>
</tr>
</table>

<br>
<br>


## 🔧 기술 구현 상세  


 **🪢시스템 흐름도**
 
 <img width="600" height="500" alt="image" src="https://github.com/user-attachments/assets/f8a30950-4116-47ce-b3ec-a7eeb0d57342" />


<br>
<br>

**🗂️폴더 구조**

 
📦 vanilla-07-promise              // 프로젝트 루트
│
├── 🗂️ .github                     // GitHub 워크플로우/Actions 등 자동화 설정
├── 🗂️ .vscode                     // VSCode 편집기 설정
│
├── 📁 api                         // 서버/DB 관련 유틸리티 및 테스트용 리소스
│   ├── 📁 bruno                   // Bruno API 테스트 파일
│   └── 📁 dbinit                  // DB 초기화 스크립트
│
├── 📁 dist                        // Vite 빌드 결과물(배포 파일)
├── 📁 node_modules                // npm 패키지들이 저장되는 폴더
│
├── 📁 public                      // 정적 리소스(빌드 없이 접근 가능)
│   ├── 📁 assets                  // 이미지, CSS, 컴포넌트 등 모든 정적 자원
│   │   ├── 🎨 components          // header, nav 등 공통 UI 컴포넌트 CSS
│   │   │   ├── header.css
│   │   │   └── nav.css
│   │   │
│   │   ├── 🎨 css                 // 전역 스타일 폴더
│   │   │   └── 🎨 base            // reset/variables/theme 등 기초 스타일 파일
│   │   │      ├── base.css
│   │   │      ├── global.css
│   │   │      ├── reset.css
│   │   │      ├── theme.css
│   │   │      └── variables.css
│   │   │
│   │   ├── 🖼️ images              // 모든 PNG/SVG 이미지 및 아이콘
│   │   │   ├── detail / login / mybox-icons / nav-icons ...
│   │   │   ├── trending-1.png ~ trending-10.png
│   │   │   └── 다양한 SVG, PNG 파일들
│   │   │
│   │   └── 🎨 common.css          // 공통 스타일
│   │
│   └── 🖼️ vite.svg                // Vite 기본 아이콘
│
├── 📁 src                         // 실제 애플리케이션 로직이 들어가는 핵심 폴더
│   ├── 📁 common                  // 공통 header/nav/토큰 관리/재사용 함수
│   │   ├── header.html
│   │   ├── header.ts
│   │   ├── like.ts
│   │   ├── nav.html
│   │   ├── nav.ts
│   │   ├── sub-section.ts
│   │   └── token.ts
│   │
│   ├── 📁 components              // 재사용 가능한 UI 컴포넌트
│   │   └── NoDataSearchPage.ts    // 검색에서 데이터 없을 때 보여줄 컴포넌트
│   │
│   ├── 📁 features                // 페이지(기능) 단위 모듈
│   │   ├── 📁 detail              // 상세보기 페이지
│   │   │   ├── detail.css
│   │   │   ├── detail.html
│   │   │   └── detail.ts
│   │   │
│   │   ├── 📁 home                // 홈 화면 기능
│   │   │   ├── home.html
│   │   │   ├── index.css
│   │   │   ├── index.ts
│   │   │   ├── top-author.css / top-author.html / top-author.ts
│   │   │   ├── trending-brunch.css / trending-brunch.html / trending-brunch.ts
│   │   │
│   │   ├── 📁 login               // 로그인 페이지
│   │   │   ├── login.css
│   │   │   ├── login.html
│   │   │   └── login.ts
│   │   │
│   │   ├── 📁 mybox               // 내보관함(My Box) 페이지
│   │   │   ├── mybox.css
│   │   │   ├── mybox.html
│   │   │   ├── mybox.ts
│   │   │   └── recent.ts
│   │   │
│   │   ├── 📁 mypage              // 마이페이지
│   │   │   ├── mypage.css
│   │   │   ├── mypage.html
│   │   │   └── mypage.ts
│   │   │
│   │   ├── 📁 search              // 검색 기능
│   │   │   ├── 📁 search-author   // 작가 검색
│   │   │   ├── 📁 search-nodata   // 검색 결과 없을 때
│   │   │   ├── 📁 search-result   // 검색 결과 페이지
│   │   │   ├── search.css
│   │   │   ├── search.html
│   │   │   └── search.ts
│   │   │
│   │   ├── 📁 signup              // 회원가입 페이지
│   │   │   ├── signup.css
│   │   │   ├── signup.html
│   │   │   └── signup.ts
│   │   │
│   │   ├── 📁 utils               // 공통 유틸리티 함수들
│   │   │   ├── pages              // 페이징 처리 관련
│   │   │   ├── auth.ts            // 인증 로직
│   │   │   ├── axios.ts           // axios 인스턴스 설정
│   │   │   ├── checklogin.ts      // 로그인 여부 확인
│   │   │   └── types.ts           // 공통 타입
│   │   │
│   │   ├── 📁 write               // 글쓰기 페이지
│   │   │   ├── write.css
│   │   │   ├── write.html
│   │   │   └── write.ts
│   │   │
│   │   └── 📁 writerhome          // 작가 홈(브런치 스타일)
│   │       ├── writerhome.css
│   │       ├── writerhome.html
│   │       └── writerhome.ts
│   │
│   ├── 📁 types                   // 전역 타입 정의
│   │   ├── mybox-type / mybox-type.ts
│   │   ├── search-author-type / search-author-type.ts
│   │   ├── search-result-type / search-result-type.ts
│   │   ├── writerhome-type / writerhome-type.ts
│   │   ├── apiClient.ts
│   │   ├── postApi.ts
│   │   └── upload.ts
│   │
│   ├── 💡 main.ts                 // 앱 진입 파일
│   ├── 💡 counter.ts              // 예제용 코드(템플릿)
│   ├── 🎨 style.css               // 전역 스타일
│   └── 🖼️ typescript.svg          // TS 로고 이미지
│
├── ⚙️ .gitignore                  // Git에 포함하지 않을 파일 목록
├── ⚙️ eslint.config.js            // ESLint 설정
├── 📄 index.html                  // 프로젝트 기본 HTML
├── 📦 package.json                // npm 패키지 설정 및 스크립트
├── 📦 package-lock.json           // 패키지 버전 고정 파일
├── ⚙️ prettier.config.js          // Prettier 코드 스타일 설정
├── 📄 [README.md](http://readme.md/)                   // 프로젝트 설명 문서
├── 📄 test.txt                    // 테스트 파일
├── ⚙️ tsconfig.json               // TypeScript 설정
└── ⚙️ vite.config.js              // Vite 번들 설정


## 🎬 기능 시연  
- 배포 링크: [영구](https://final-05-project.vercel.app/)

<br>
<br>

## 🛠 트러블 슈팅


| 이름👨‍👩‍👧‍👦 | 문제 상황 | 원인 추적 |해결 정리 |
|:--:|:--|:--|:--|
| **유진** |  | | |
| **승준** |  | | |
| **은재** |  |  | |
| **수정** |  | | |


<br>
<br>



## 💭 회고 및 느낀점

| 이름👨‍👩‍👧‍👦 | 아쉬운 점 | 성장 경험 |
|:--:|:--|:--|
| **유진** |  |  |
| **승준** | | |
| **은재** |  |  |
| **수정** |  |   |
