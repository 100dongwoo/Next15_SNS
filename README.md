### default.tsx

- Parallel Routes가 필요없을때 (기본값으로 사용한다) (page.tsx도 가능은한데 안하는걸 추천)

### Parallel Routes

- layout.tsx에서 사용이 가능하다.
- 페이지를 두개 동시의 보여줄때 사용 (@modal과 같은 형식의 폴더 사용)

### Intercepting Routes

- (..i) 형식의 폴더 사용 (브라우저 주소 기준)
- 클라이언트에서 라우팅 할 때만 인터셉팅 라우팅 적용이됨, 새로고침시 적용이 안됨

#### 해당 부분들의 폴더는 브라우저 URL의 영향을 주지않음

- ()그룹, @folder, \_folder(private폴더)
