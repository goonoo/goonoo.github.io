---
layout: post
title: 가자! Bootstrap 3으로
---

이 글은 그저 [Bootstrap 3 RC1](http://getbootstrap.com/) 문서를 훑고 쓰는 것임을 우선 밝힌다.

Bootstrap 3이 Bootstrap 2와 다른 점은 뭐 일단 시각적으로 평면적인(Flat한) 디자인을 적용했다는 게 바로 보이는데 문서를 차분히 읽어보니 이건 그저 많은 것들 중 하나인 것 같다.

그 밖의 다른 점들 중 주목할만한 내용들을 좀 추려본다.

Mobile First (개선된 그리드 시스템)
--------------------------------------------

내 생각에 Bootstrap 3이 Bootstrap 2와 다른 점은 무엇보다도 [Mobile First 전략](http://getbootstrap.com/css/#overview-mobile) 이다. 이 전략은 그리드 시스템에서 모바일 환경을 신경쓴 모습에서 그 실체를 확인할 수 있는데 Bootstrap 2에는 그저 데스크탑 화면에서 보기좋게 그리드를 설정해놓으면 브라우저의 폭에 따라 그 그리드의 폭이 점점 줄어들다가 모바일 디바이스의 폭이 되면 그저 한줄로 나오는 정도였다면, Bootstrap 3에서는 그리드를 어느 정도의 폭부터 한줄로 나오게 할지 설정할 수도 있고 아예 모바일에서도 그리드를 유지하도록 만들 수도 있다.

Bye, IE7
-------------

Bootstrap 3은 jQuery 2.0처럼 아예 IE8까지 등지는 선택은 하지 않았지만 IE7와는 작별을 고했다. IE8은 디자인 관련 CSS3 속성들이 적용되지 않는 항목들이 문서마다 친절하게 설명하며 어디까지 지원이 가능한지 알기 쉽게 배려하고 있다.

우리나라에서도 IE7 점유율이 이제는 꽤나 줄어든 만큼 최종 사용자와의 접점에 직접 사용하는 경우가 아니라면 Bootstrap 3을 선택하지 못할 이유로는 보이지 않는다. (다들 어드민 툴 같은 곳에 쓰시잖아요? 그쵸? ㅋㅋ)

새로운 콤포넌트
----------------------

우선 [Panel](http://getbootstrap.com/components/#panels)이 있다. Bootstrap 2 좀 써본 사람으로서 "그래, 이거 꼭 필요했어" 라고 할만한 콤포넌트다. [{wrap}bootstrap](https://wrapbootstrap.com/) 같은 곳에서 만든 테마들을 보면 Panel 콤포넌트가 제공하는 디자인을 직접 만들어 제공하는 경우들이 상당히 많이 보인다. 정말 필요했다는 반증이 아닐까?

그리고 [List Group](http://getbootstrap.com/components/#list-group). 이건 뭐... 별 느낌은 없네.

EOF
------

[Recess](http://twitter.github.io/recess/)를 지원하는 것도 마음에 든다. 덕분에 OOCSS 전략의 확산이 가속화되지 않을까 싶다.

아참, 이제 RC1이니... 아직 프로젝트에 직접 가져다 쓰는건 이르지 싶다.
