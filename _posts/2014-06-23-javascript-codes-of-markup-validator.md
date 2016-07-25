---
layout: post
title: 마크업 유효성 검사 도구(Markup Validator)의 자바스크립트 코드
---

HTML에서는...
------------------------

HTML 5 DTD를 사용한다면 아무런 문제가 없다!

HTML 4 DTD를 사용한다면 자바스크립트 내의 닫는 태그 ``를 `` 을 넣어도 마찬가지이다.

닫는 태그를 escape하지 않은 예제: http://goo.gl/2JZJyu

닫는 태그를 escape한 예제: http://goo.gl/lasQMv

XHTML에서는...
------------------------

자바스크립트 코드를 CDATA Section 처리 하지 않으면 Validator가 자바스크립트 코드를 HTML 코드로 인식하여 해석한다. 이 때 자바스크립트 코드에 의해 실제 존재하지 않는 유효성 검사 오류가 발생할 수 있다.

XHTML 문서의 자바스크립트 코드에 의한 유효성 검사 오류 예제: http://goo.gl/FGWXD5

자바스크립트 코드를 CDATA Section 처리 하면 이 문제를 간단히 피할 수 있다.

XHTML 문서의 자바스크립트 코드를 CDATA Section 처리한 예제: http://goo.gl/7yB7SL
