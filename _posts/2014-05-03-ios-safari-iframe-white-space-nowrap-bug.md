---
layout: post
title: iOS의 Safari에 iframe이 쓰였을 때 white-space nowrap CSS 코드가 쓰인 경우 frame의 크기가 제대로 표시되지 않는 버그가 있다.
---

다음 예제를 보자.

http://fiddle.jshell.net/mctenshi/775N5/6/show/

예제는 width 100%짜리 iframe이 하나 들어간 HTML 페이지이다.

parent.html - http://jsfiddle.net/mctenshi/775N5/6/

    <iframe width="100%" height="50" src="http://fiddle.jshell.net/mctenshi/g9G5F/show/" frameborder="0" style="border:solid 1px red"></iframe>

iframe에 쓰인 페이지는 말줄임을 위해 일반적으로 쓰이는 CSS 코드가 들어간 단순한 페이지이다.

iframe.html - http://jsfiddle.net/mctenshi/g9G5F/2/

    <style type="text/css">
    #test {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    </style><div id="test"><a href="http://recopick.com">RecoPick 추천</a>을 사용해 보세요! 사이트에 스크립트 한 줄만 삽입하시면, 매출과 트래픽의 증가를 경험하실 수 있습니다. 스크립트 한 줄만 삽입하세요. 나머지는 모두 RecoPick이 합니다.</div>

예제 페이지를 열어보면 다음과 같은 결과 화면을 볼 수 있다.

![](https://31.media.tumblr.com/8559854b6508bee11c158e1f11116b9e/tumblr_inline_n1w7f2oXsg1qg3tzb.png)

(말줄임이 잘 적용되었다.)

그런데 같은 페이지를 iPhone에서 보면

![](https://31.media.tumblr.com/3977ed8fa95365278cf34fe03a532227/tumblr_inline_n1w7pgQcfW1qg3tzb.png)

(프레임이 화면 오른쪽으로 삐져나갔다.)

말줄임이 적용되지 않을만큼 텍스트가 짧을 때는 iframe이 제대로 너비를 갖는다.

![](https://31.media.tumblr.com/f4374571a06603401cc07dcf88700198/tumblr_inline_n1w7uw6eBE1qg3tzb.png)

일단 말줄임을 포기하고 `white-space: nowrap`을 제거하는 방법을 선택했다. 젠장.

----

손혁수님께서 [facebook CSS Lounge](https://www.facebook.com/groups/CSSLounge/) 그룹을 통해 알려주신 해결책
------------------------------------------------------------------------------------
[그룹에 올린 동일한 증상의 질문](https://www.facebook.com/groups/CSSLounge/permalink/654329461288660/)에 김태곤님이 해결책을 답변해주셨다. :D

방법은 `text-overflow: ellipsis` 속성을 사용할 요소의 `position`을 `fixed` 혹은 `absolute`로 만드는 것.

예제: http://fiddle.jshell.net/923B6/29/show/
