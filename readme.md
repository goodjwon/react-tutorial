# 리액트 튜토리얼 설정

이 **React Tutorial** 리포지토리는 리액트를 처음부터 차근차근 배울 수 있도록 설계되었습니다. 기초부터 고급 주제까지 실습 예제와 연습을 통해 학습할 수 있습니다.

## 폴더 구조 개요

```bash
REACT-TUTORIAL/					 # 리액트 튜토리얼 루트 폴더
│
├── 0.tutorial_star/             # 리액트 기초 튜토리얼
├── 1.tutorial_star_use_effect/  # useEffect 훅에 대한 튜토리얼
├── 2.tutorial_star_use_ref/     # useRef 훅에 대한 튜토리얼
├── ex-ui-1/                     # 토이 프로젝트 및 실습을 위한 UI 예제
├── react-default-template/      # 새로운 리액트 프로젝트를 위한 템플릿
│   ├── template/                # 템플릿 내부 public 및 src 폴더
│   └── package.json             # 리액트 템플릿의 기본 package.json 파일
│
├── cleanup.js                   # 프로젝트 생성 후 불필요한 파일을 삭제하는 스크립트
├── quiz.js                      # 리액트 관련 퀴즈 파일
├── .gitignore                   # Git에 포함하지 않을 파일들을 정의한 gitignore 파일
└── HTML 파일들                   # 실습 및 UI 예제들
```

### 튜토리얼 및 내용

- **0.tutorial_star/**: 리액트 기초 튜토리얼로, 프로젝트 설정 및 첫 번째 컴포넌트 생성을 다룹니다.
  
- **1.tutorial_star_use_effect/**: `useEffect` 훅을 통해 리액트 컴포넌트의 생명주기를 관리하는 방법을 배웁니다.

- **2.tutorial_star_use_ref/**: `useRef` 훅을 사용하여 DOM 엘리먼트를 직접 조작하는 방법을 배우고, 렌더링 간 값을 유지하는 방법을 다룹니다.

### 토이 프로젝트

**ex-ui-1/** 폴더 안에는 여러 개의 토이 프로젝트가 포함되어 있습니다. 이 프로젝트들은 리액트 개념을 실제로 적용하는 데 도움을 주는 실습 자료입니다.

### 기본 템플릿 사용법

**react-default-template/** 폴더에는 새로운 리액트 프로젝트를 빠르게 시작할 수 있는 템플릿이 포함되어 있습니다. 이 템플릿을 사용하여 프로젝트를 생성하려면 아래 명령어를 사용하세요.

#### 프로젝트 생성 명령어:

```bash
npx create-react-app [프로젝트명] --template file:./react-default-template
```

이 명령어는 해당 템플릿을 사용하여 새로운 리액트 프로젝트를 생성합니다. ex-ui-1 폴더와 같은 구조로 생성합니다.
> 여기서는 **ex-ui-1 기준** 으로 설명 합니다.

#### 프로젝트 생성 후 작업:

1. **의존성 설치**  
   프로젝트 디렉토리로 이동한 후, 필요한 의존성을 설치합니다:

   ```bash
   cd ex-ui-1
   npm install
   ```

2. **앱 실행**  
   설치가 완료되면 개발 서버를 실행하여 프로젝트를 시작합니다:

   ```bash
   npm start
   ```

### 퀴즈

각 주요 섹션이 끝난 후, **quiz.js** 파일을 이용하여 배운 내용을 퀴즈로 확인할 수 있습니다. 이를 통해 학습 내용을 더욱 공고히 할 수 있습니다.

### 파일 정리 스크립트

새로운 리액트 프로젝트를 생성한 후 불필요한 파일들을 정리하려면, **cleanup.js** 스크립트를 사용하세요:

```bash
node cleanup.js
```

이 스크립트는 특정 파일들을 자동으로 삭제하여 프로젝트를 정리합니다.

---

## 튜토리얼 목차

1. [**리액트 소개**](#리액트-소개)
2. [**JSX 이해하기**](#jsx-이해하기)
3. [**컴포넌트**](#컴포넌트)
4. [**상태 관리와 생명주기**](#상태-관리와-생명주기)
5. [**이벤트 처리**](#이벤트-처리)
6. [**조건부 렌더링**](#조건부-렌더링)
7. [**리스트와 키**](#리스트와-키)
8. [**폼 다루기**](#폼-다루기)
9. [**상태 끌어올리기**](#상태-끌어올리기)
10. [**컴포지션과 상속**](#컴포지션과-상속)
11. [**리액트 훅(Hooks)**](#리액트-훅-hooks)
12. [**컨텍스트 API**](#컨텍스트-api)
13. [**React Router**](#react-router)
14. [**성능 최적화**](#성능-최적화)
15. [**실전 프로젝트**](#실전-프로젝트)
16. [**추가 학습**](#추가-학습)

---

## 추가 참고 사항

- **공식 리액트 문서 활용하기**  
  학습 과정 동안 [리액트 공식 문서](https://ko.reactjs.org/)를 참고하여 최신 정보와 모범 사례를 확인하세요.
  
- **타입스크립트 학습 고려하기**  
  리액트에 익숙해진 후 타입스크립트를 배워 더 안전하고 유지보수 가능한 코드를 작성하는 것을 추천합니다.

---

리액트 학습 여정을 즐기세요! 질문이 있다면 커뮤니티에 문의하거나, 리포지토리에 기여해 주세요.