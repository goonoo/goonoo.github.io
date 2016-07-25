---
layout: post
title: WAI-ARIA의 Authoring Practices 중 모달 다이얼로그 만들기 발번역
---

얼마전 정찬명님이 [레이어 열기/닫기 키보드 접근성](http://naradesign.net/wp/2013/04/24/1996/)이라는 글을 통해 자바스크립트로 제작된 레이어(다이얼로그)의 접근성에 대해 생각해보는 기회를 마련해주셨는데요. [WAI-ARIA](http://www.w3.org/WAI/intro/aria)에 모달 다이얼로그 제작 관련 키보드 이벤트 핸들링에 대한 상세한 설명을 제공하고 있어 시간이 난 김에 발번역 해보았습니다.

[WAI-ARIA라는 규격이 해결하고자 하는 문제 및 해결방법](http://www.w3.org/TR/wai-aria-primer/#problemstatement)을 보면 WAI-ARIA는 자바스크립트로 제작된 UI에 역할(role), 속성(property), 상태(state)를 부여하여 시각장애인 혹은 키보드 사용자가 Windows 등의 운영체제 내의 메뉴, 다이얼로그, 탭 등에 접근하여 이용하는 것과 동일하게 이용할 수 있게끔 하는 방법을 제시하고 있습니다.

[모달 다이얼로그 만들기](http://www.w3.org/TR/wai-aria-practices/#modal_dialog)도 운영체제의 모달 다이얼로그를 이용하는 것과 동일하게 구현하는 방법을 상세히 설명하고 있습니다. 센스리더 이용자들은 비록 WAI-ARIA의 장점을 충분히 얻기 어려우나 다이얼로그와 같은 자바스크립트 UI를 키보드 사용자가 원활하게 이용할 수 있게 되는 장점은 보장된다고 생각됩니다.

조금 딱딱한 내용이지만 다이얼로그 구현 시 키보드 이벤트를 어떻게 다루어야 하는지를 많은 참고가 되지 않을까 생각합니다. :D

추가: WAI-ARIA 규격에 따라 제작된 [jQuery UI Dialog의 모달 다이얼로그 예제](http://jqueryui.com/resources/demos/dialog/modal-confirmation.html)를 키보드나 스크린리더를 통해 테스트 해보세요!

----

[3.3 모달 다이얼로그 만들기](http://www.w3.org/TR/wai-aria-practices/#modal_dialog)
=======================

WAI-ARIA는 dialog, alertdialog 2개의 다이얼로그 역할(role)을 제공합니다. 저작자가 웹 페이지에 다이얼로그를 구현할 때 마우스의 인터렉션만을 고려하곤 합니다. 데스크탑컴퓨터의 GUI 다이얼로그와는 다르게, 키보드 사용자는 의도치 않게 다이얼로그 밖으로 이동해버릴 수 있고 혼란에 빠질 수 있습니다. 이는 사용자가 다이얼로그 내에서 탭 이동 시 발생할 수 있습니다. 모달 다이얼로그는 사용자가 다이얼로그를 닫기 전까지 초점을 다이얼로그에서 벗어나지 않도록 방지합니다. 다이얼로그 외부의 마우스 클릭은 반드시 무시되어야 하며 사용자는 다이얼로그 안팎으로 탭 이동할 수 없어야 합니다. WAI-ARIA로 구현된 다이얼로그는 모달 다이얼로그여야 합니다. 이 섹션에서 그 방법을 설명합니다.

다이얼로그 밖 영역의 마우스 클릭은 뷰포트의 크기에 해당하는 자식 요소를 body 요소에 추가하여 방지할 수 있습니다. 이 요소에 CSS의 z-index 속성을 설정하여 다이얼로그 요소를 제외한 모든 다른 요소들보다 위에 위치하게끔 합니다. 언더레이 요소의 tabindex를 "-1"로 주어 키보드 이벤트 혹은 마우스 클릭에 의해 초점이 이동되는 것을 방지합니다. 다이얼로그가 모달 다이얼로그이고 초점을 받고 있음을 강조하기 위해 언더레이 요소의 투명도를 낮출 수 있습니다.

다이얼로그가 수행할 작업에 따라 다이얼로그가 열리기 전에 초점이 있던 객체를 저장해야 합니다. 이것은 다이얼로그가 닫혔을 때 해당 요소로 초점을 복원할 수 있게 합니다. 다이얼로그가 열렸을 때 초점은 다이얼로그 내에 첫번째 초점을 받을 수 있는 요소로 이동해야 합니다. 다이얼로그 콘텐츠 내에 초점을 받을 수 있는 요소가 없는 경우에는 초점을 취소 혹은 닫기 버튼에 위치시킵니다. 다이얼로그에는 스크린리더로 하여금 다이얼로그가 열렸을 때 다이얼로그의 제목과 정보를 읽어줄 수 있게끔 초점을 받을 수 있는 요소가 반드시 있어야 합니다. 키보드 초점이 다이얼로그를 벗어나는 것을 방지하기 위해 다이얼로그의 첫번째와 마지막 초점을 받을 수 있는 요소를 결정하고 다이얼로그 내에 키보드 이벤트를 가둬야 합니다.

첫번째와 마지막 초점을 받을 수 있는 요소를 다이얼로그의 콘텐츠 내에서 찾습니다. 이것은 다이얼로그 내의 DOM 트리를 탐색하며 화면에 보이며 활성화된 앵커 요소, 폼 요소, 그리고 tabindex 속성의 값이 0 이상인 요소를 찾는 방법으로 구현할 수 있습니다. tabindex가 0을 초과하는 요소가 있는 경우 다른 초점을 받을 수 있는 요소보다 초점 도달 우선순위가 높아야 함을 기억합니다. 첫번째와 마지막 초점을 받을 수 있는 요소를 다이얼로그 코드에 변수로 선언합니다.

다이얼로그를 표시하기 전에 다이얼로그의 언더레이를 생성하고 표시합니다. onkeypress 이벤트 핸들러를 DOM의 document.documentElement에 연결합니다. 이것은 문서 내의 모든 키 입력을 캐치하여 키보드 초점을 다이얼로그 내에 가둘 수 있게 합니다. 다이얼로그를 언더레이 위에 크기와 위치를 적당히 위치시킨 후, 보이게 만들고 초점을 다이얼로그 내의 첫번째 초점을 받을 수 있는 요소로 이동시킵니다.

[3.3.1. 초점 가두기](http://www.w3.org/TR/wai-aria-practices/#trap_focus_div)
--------------------

onkeypress 핸들러는 문서 내의 모든 키 입력을 캐치할 것입니다. 이 keypress 이벤트 핸들러는 다이얼로그 코드 범위 내에 위치해야 하여 첫번째와 마지막 초점을 받을 수 있는 요소에 접근할 수 있어야 합니다. onkeypress 핸들러에서 keypress 이벤트의 대상을 결정합니다. 추가로, 다이얼로그에 초점을 받을 수 있는 요소가 하나밖에 없는지를 확인합니다. 이 경우 첫번째 초점을 받을 수 있는 요소는 마지막 초점을 받을 수 있는 요소와 동일합니다. 다이얼로그 내에서의 키 입력은 초점을 받을 수 있는 요소를 생성, 제거, 활성화, 비활성화 혹은 변경할 가능성이 있습니다. 그러면 첫번째와 마지막 초점을 받을 수 있는 요소를 다시 결정할 필요가 생깁니다. 이벤트 타겟에 기초하여 키 입력은 다음 작업들을 수행합니다:


 * keypress가 Shift+Tab이고 타겟이 첫번째 초점을 받을 수 있는 요소인 경우 초점을 마지막 초점을 받을 수 있는 요소로 이동하고 keypress 이벤트를 중지합니다. 만약 초점을 받을 수 있는 요소가 하나만 있는 경우에는 초점을 변경하지 말아야 하며 keypress 이벤트는 중지되어야 합니다.
 * keypress가 Tab키이고 타겟이 마지막 초점을 받을 수 있는 요소인 경우 초점을 첫번째 초점을 받을 수 있는 요소로 이동하고 keypress 이벤트를 중지합니다. 만약 초점을 받을 수 있는 요소가 하나만 있는 경우에는 초점을 변경하지 말아야 하며 keypress 이벤트는 중지되어야 합니다.
 * keypress가 Esc키이고 타겟 노드가 다이얼로그의 콘테이너 노드인 경우 다이얼로그를 닫고 언더레이를 숨기거나 제거합니다.

keypress의 타겟 노드가 다이얼로그의 콘테이너인지를 결정합니다. 이는 부모 노드를 탐색하는 과정을 반복하여 다이얼로그의 콘테이너 노드를 발견하는 동작으로 확인할 수 있습니다. 위에서 설명된 이외의 경우 모든 다이얼로그의 키 입력 이벤트는 사용자가 다이얼로그의 콘트롤들과 상호작용할 수 있도록 허용되어야 합니다.

타겟 노드가 다이얼로그 내에 없는 경우 documentElement의 keypress와 keypress 이벤트는 Tab키가 입력되지 전까지 중지되어야 합니다. 어떤 이유로 인해 다이얼로그의 초점이 유실된 경우에는 Tab키 입력은 다이얼로그 안으로 다시 탭 이동 될 수 있도록 허용되어야 합니다. 이는 다이얼로그가 처음 로드되었을 때 타이밍 문제로 초점이 다이얼로그의 첫번째 초점을 받을 수 있는 요소로 제대로 이동되지 않는 경우 일어날 수 있습니다.

다이얼로그는 버튼이나 그 밖에 다이얼로그를 취소하거나 다이얼로그의 기능을 실행하거나 혹은 다이얼로그를 닫는 메커니즘을 포함해야 합니다.

여기에 모달 다이얼로그를 위한 onkeypress 이벤트의 수도 코드가 있습니다. 수도 코드는 브라우저별 이벤트 처리의 차이를 해결하기 보다는 동작에 따른 초점 작업에 집중되어 있습니다. event, evt 및 헬퍼 object는 브라우저 간의 차이를 다루는 라이브러리를 사용했다고 가정하였으며, keys object는 키 정의 변수의 집합입니다. Dialog는 취소 기능을 가진 다이얼로그 object입니다.

    _onKey: function(/*정규화된 이벤트*/ evt){
      // 요약:
      // 접근성을 위한 키보드 이벤트 핸들링
      if(evt.charOrCode){
        var node = evt.target; // keypress 이벤트의 타겟 노드를 가져온다
        if (evt.charOrCode === keys.TAB){
          // 다이얼로그 콘테이너 노드에서 첫번째와 마지막 초점을 받을 수 있는 요소를 찾는다
          // 다이얼로그 내에서 어떤 요소가 추가되거나 삭제, 표시 여부나 상태가 변경된 경우를 대비하여 매번 실행한다
          var focusItemsArray = helper.getFocusItems(dialogContainerNode);
          dialog.firstFocusItem = focusItemsArray[0];
          dialog.lastFocusItem = focusItemsArray[focusItemsArray.length-1];
        }

        // firstFocusItem과 lastFocusItem으 dialog에 의해 유지된다고 가정한다
        var singleFocusItem = (dialog.firstFocusItem == dialog.lastFocusItem);

        // 첫번째 초점을 받을 수 있는 요소에서 Shift+Tab 했는지 확인한다
        if(node == dialog.firstFocusItem && evt.shiftKey && evt.charOrCode === keys.TAB){
          if(!singleFocusItem){
            dialog.lastFocusItem.focus(); // 초점을 다이얼로그 내의 마지막 초점을 받을 수 있는 요소로 보낸다
          }
          helper.stopEvent(evt); // keypress 이벤트를 멈춘다
        }
        // 마지막 초점을 받을 수 있는 요소에서 Tab 했는지 확인한다
        else if(node == dialog.lastFocusItem && evt.charOrCode === keys.TAB && !evt.shiftKey){
          if (!singleFocusItem){
            dialog.firstFocusItem).focus(); // 초점을 다이얼로그 내의 첫번째 초점을 받을 수 있는 요소로 보낸다
          }
          helper.stopEvent(evt); // keypress 이벤트를 멈춘다
        }
        else{
          // 다이얼로그 내에서의 키 입력인지 확인한다
          while(node){
            if(node == dialogContainerNode){ // 만약 다이얼로그의 컨테이너 노드이면
              if(evt.charOrCode == keys.ESCAPE){ // 그리고 Esc키가 눌렸다면
                dialog.cancel(); // 다이얼로그를 취소한다
              }else{
                return; // 키 이벤트를 진행시킨다
              }
            }
            node = node.parentNode;
          }
          // document window를 위한 키 입력인 경우
          if(evt.charOrCode !== keys.TAB){ // 다이얼로그로의 Tab을 허용한다
            helper.stopEvent(evt); // tab 키입력이 아닌 경우 이벤트를 멈춘다
          }
        } // end of if evt.charOrCode
      } // end of function
    }
