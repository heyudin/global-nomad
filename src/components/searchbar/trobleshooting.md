# Troble shooting

## TIL

### 26.04.06 (월)

1. 검색바에 검색 후 새로고침 또는 공유시 검색어 소실에 대한 문제발생
2. useSearchParams, useRouter, usePathName 훅과 urlSearchParams를 통해서 검색어를 쿼리스트링으로 관리 할 수 있게 구현함
3. 로직이 UI 컴포넌트 내에 혼재해 있는 문제 발생
4. 외부에서 value, setValue를 프롭스로 받아서 동작하게 해두어서 쿼리스트링과 상태의 공급원 불일치 문제 발생
5. onChange 이벤트로 발생한 불필요한 리렌더링 및 자원 낭비 (성능 문제)

1~4의 문제는 커스텀 훅 useQureyParams를 별도로 분리해서 생성
5번 문제는 debounce 또는 useRef..? 도입

#### useSearchParams와 URLSearchParams

- Next.js에서는 useSearchParams가 읽기 전용 훅이기 때문에 useSearchParams는 주소의 쿼리스트링을 읽어오는 역할만 한다.
- JS 내장 클래스인 URLSearchParams를 통해서 불러온 주소를 조작하고 useRouter의 replace 메서드를 통해 조작한 주소로 이동한다.
- https://nextjs-ko.org/docs/app/api-reference/functions/use-search-params

#### Next.js의 useSearchParams가 상태를 저장할 수 없는 읽기 전용 훅인 이유는?

- 중요 이유 **Next.js는 서버 중심의 아키텍쳐를 지향한다.**
- 리액트는 모든 주소 변경이 브라우저 안에서만 일어난다. 주소창은 클라이언트 저장소 중 하나
- Next.js는 주소가 바뀌는 순간 서버와 통신할 준비 -> 만약 훅이 직접 주소를 바꿔버리면(State 방식), Next.js의 엔진이 **"이게 단순한 글자 변경인지, 서버 데이터를 새로 가져와야 하는 페이지 이동인지"**를 통제하기 어려워진다.
- Next.js에서 직접 주소를 바꿔버리면 서버 컴포넌트가 바뀐 주소를 인지하지 못해 **데이터 불일치(Hydration Error 등)**가 발생할 수 있기 때문에 제한하는 것
