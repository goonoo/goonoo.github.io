---
layout: post
title: 팝업창 감시 자바스크립트 코드
---

팝업창을 감시하고 있다가 닫힐 때 어떤 동작을 수행해줄 수 있게 하는 코드이다.

    var win = window.open("popup.html", "thePopUp", "");
    var pollTimer = window.setInterval(function() {
        if (win.closed !== false) { // !== is required for compatibility with Opera
            window.clearInterval(pollTimer);
            someFunctionToCallWhenPopUpCloses();
        }
    }, 200);

`win.closed !== false`는 Opera 뿐 아니라(Opera야 이제 아웃 오브 안중) 안드로이드 기본 브라우저(4.x에서 확인)에서도 필요하다.

다른 브라우저들은 팝업이 생기면 `closed === false` 닫히면 `closed === true`지만 안드로이드 기본 브라우저는 팝업이 생기면 `closed === false` 닫히면 `closed === undefined`이다.
