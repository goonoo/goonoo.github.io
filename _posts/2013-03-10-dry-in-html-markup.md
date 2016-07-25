---
layout: post
title: DRY(Don't Repeat Yourself) in HTML Markup
---

HTML은 마크업 문서를 만든다. HTML의 `img`, `a`, `button`, `input` 등 각 태그는 문서의 각 요소에 의미를 부여한다. `img`는 이미지, `a`는 링크, `button`은 버튼을 의미한다.

사실 위의 내용은 HTML 문서를 만드는 사람이라면 "당연한 소리를 뭐하러 하는가?"랄 정도로 기본적으로 알고 있는 내용이다. 그런데 `img`는 이미 이미지라는 내용을 담고 있음에도 대체 텍스트(`alt`)에 "이미지"라는 텍스트를 더해주는 경우가 있다.

    <img alt="겨미겨미" src="https://67.media.tumblr.com/avatar_80bce1916e53_64.png"><img alt="겨미겨미 이미지" src="https://67.media.tumblr.com/avatar_80bce1916e53_64.png">

위와 아래 중 어떻게 대체 텍스트를 제공하는 것이 맞을까?

난 당연히 전자와 같이 제공해야 한다고 생각한다. 왜냐하면 후자는 중복이기 때문이다. `img` 태그가 이미 이미지라는 의미를 제공하는데 대체 텍스트에 "이미지"라는 텍스트를 넣는 것은 의미의 반복이다. 아래의 코드들은 위 코드의 후자의 경우와 마찬가지로 중복이다.

    <a href="http://miya.pe.kr">겨미겨미 링크</a>
    <button type="submit">확인 버튼</button>
    <label><input type="checkbox"> 1번 체크</label>
    <label>
        <select><option value="1">1번</option><option value="2">2번</option></select>
        정답 선택
    </label>

제작한 HTML 문서가 의미 구조를 잘 갖추었는가를 점검할 때에는 스크린리더로 문서를 읽어보며 문서의 내용이 올바르게 인식되는지 확인하면 좋다. 왜냐하면 스크린리더는 HTML 문서의 텍스트와 태그로 이루어진 의미를 더한 내용을 읽어주기 때문이다.

위의 코드를 HTML 문서로 만들어 스크린리더로 읽어보면 다음과 같다.

"겨미겨미 이미지 이미지", "겨미겨미 링크 링크", "확인 버튼 버튼", "1번 체크 체크상자", "정답 선택 선택상자"

중복을 피해 마크업하자!
