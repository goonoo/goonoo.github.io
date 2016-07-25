---
layout: post
---

express.js에서 UTF-8, EUC-KR HTML 파일을 같이 제공하려 할 때 EUC-KR HTML 파일에 `<meta charset="euc-kr">` 등으로 캐릭터셋을 명시했음에도 불구하고 한글이 깨져보이는 경우가 있다.

문제는 express.js가 HTML 파일의 HTTP response의 `Content-Type` 헤더 기본값을 `text/html; charset=UTF-8`로 제공하기 때문이다. 이 헤더는 HTML 파일의 캐릭터셋 설정에 우선하여 제공되므로 브라우저가 무조건 UTF-8로 HTML 파일을 렌더링하게 된다.

해결을 위해 캐릭터셋 선언을 HTML 파일로 위임하기 위해 다음과 같은 미들웨어를 추가해주자.

    app.use(function (req, res, next) {
      if (req.url && req.url.indexOf('.html') > -1) {
        res.header('Content-Type', 'text/html');
      }
      next();
    });

if문은 HTML 파일에만 `Content-Type` 헤더를 넣기 위한 거고, `Content-Type`값을 `text/html; charset=UTF-8`에서 `text/html`로 바꿈으로서 기본 `charset`값을 제거.
