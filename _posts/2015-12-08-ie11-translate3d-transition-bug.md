---
layout: post
title: Windows 8 + IE11에서 translate3D + transition 조합으로 슬라이드 기능을 구현했을 때 슬라이드 중 움찔/꿈틀 거리는 버그
---

다음 codepen 링크를 Windows 8의 IE11에서 열고, left/right 버튼을 번갈아 눌러가며 슬라이드 되는 콘텐츠를 관찰해보자.
(참고로, Windows 7의 IE11이나 Windows 8의 IE10에서는 문제가 없다.)

 1. http://codepen.io/mctenshi/pen/zrxEdX
 2. http://codepen.io/mctenshi/pen/obgGQx
 3. http://codepen.io/mctenshi/pen/PZwJxJ

Windows 8의 IE11에서 관찰해보면 1은 별 이상이 없는데, 2나 3은 콘텐츠가 움찔되는 것을 볼 수 있다.

1과 2, 3의 차이를 비교해보면 흥미롭게도 `translate3D`, `transition`이 적용된 요소의 HTML, CSS는 완전히 동일하고, 그
상단에 있는 요소(`.title`)에 선언된 `font-size`만 다른 것을 볼 수 있다. 직접 슬라이드 되는 콘텐츠도 아닌 곳에 선언된 `font-size`에 따라 슬라이드 되는 콘텐츠가 움찔거릴 수도 있는 게 버그이다. 아무래도 특정 CSS에 의해 GPU 가속이 적용되는 동안 `line-height`의 계산이 미묘하게(소숫점 픽셀 단위로) 다르게 판정이 나는 것이 아닌가 싶다.
 
해결방법은 상단에 있는 요소의 높이를 `font-size`에 의해 dynamic하게 계산하지 말고, 직접 `height` 속성을 부여하여
고정시키는 것이 깔끔하고, 그게 아니면 `font-size`를 조절하는 방법 등이 있겠다. (참고로 `padding`, `margin` 등을 조절하는 것은
먹히지 않는다.)
