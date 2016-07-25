---
layout: post
---

IE8에서 input에 value가 있는데 focus될 때 value를 없애는 경우 cursor가 안보이는 버그가 있다.

이 때 value를 없앤 후 input에 select() method를 한번 콜해주면 cursor가 다시 보인다.

<pre><code class="prettyprint">&lt;!DOCTYPE html&gt;
&lt;html lang="ko"&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"&gt;
  &lt;title&gt;IE8에서 input에 value가 있는데 focus될 때 value를 없애는 경우 cursor가 안보이는 버그?&lt;/title&gt;
  &lt;script&gt;
  window.onload = function () {
    document.getElementById('t').onfocus = function () {
      this.value = "";
      this.select();
    };
    document.getElementById('t').onblur = function () {
      this.value = "val";
    };
  };
  &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;a href="#"&gt;link1&lt;/a&gt;
  &lt;input type="text" id="t" value="val"&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

IE8이 있으면 아래 페이지에서 테스트 해보자.

 * select() 적용 전: http://jsfiddle.net/mctenshi/Yd9A5/
 * select() 적용: http://jsfiddle.net/mctenshi/zYXR8/
