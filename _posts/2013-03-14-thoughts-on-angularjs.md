---
layout: post
title: AngularJS에 대한 생각
---

![Logo for AngularJS](http://angularjs.org/img/AngularJS-large.png)

많은 장점들과 한가지 단점이 있다고 생각한다.

단점부터 이야기하자면... 느릴 수 밖에 없는 구조. 초기화 시점에 DOM Element에 선언된 `ng-*` attribute들을 전수조사 할 수 밖에 없는 구조이기 때문에. 하지만 이는 대부분 레거시 IE에서 이슈일테고 Modern Browser나 앞으로 나올 브라우저를 봤을 때 희망적.

이제 장점.

**이벤트 핸들러 찾기가 쉽다.** 남이 짠 덩치 큰 자바스크립트 어플리케이션에서 이벤트 핸들러 찾기는 그리 쉬운 일이 아니다. 자바스크립트 코드를 주욱 읽으면서 찾거나 크롬 디버거를 켜놓고 찾을 이벤트 핸들러의 시뮬레이션을 수행하며 찾아야 한다. AngularJS에서는 그저 HTML 코드에서 해당 태그와 해당 콘트롤에 붙은 `ng-controller`와 `ng-click` 같은 attribute가 가리키는 함수를 찾으면 된다.

**JS에서 DOM 핸들링을 분리할 수 있다.** JS와 DOM 핸들링 코드가 섞여있으면 JS 로직이 DOM 트리의 구조에 의존적이어진다. HTML 코드를 고치려면 JS 로직도 살펴가며 고쳐야 한다는 말이다. AngularJS는 DOM 핸들링 코드를 HTML에게 위임하여 이런 불편함을 해소한다.

**HTML, CSS 지식이 부족한 JS 개발자의 활용 범위가 늘어난다.** JS에서 DOM 핸들링이 분리되면서 HTML, CSS 지식이 부족한 JS 개발자도 걱정없이 프로젝트에 투입할 수 있다. (반대의 경우는 잘 모르겠다.;;)
