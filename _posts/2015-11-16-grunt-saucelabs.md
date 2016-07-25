---
layout: post
title: grunt saucelabs 적용 후
---

서비스 운영 중 번번히 IE7이나 8에서만 오류가 나는 경우가 있었는데, 며칠전에 연거푸 문제가 터져 고객 신뢰성에 문제가 될
것 같아 [`grunt-saucelabs`](https://github.com/axemclion/grunt-saucelabs) 라이브러리를 이용해 IE7/8 테스트 자동화를 했다.

내가 적용한 테스트 코드들은 qunit 기반 테스트였는데 수월하게 적용이 되었다. 간단히 정리해보면...

 1. [saucelabs](https://saucelabs.com/) 가입. ID랑 App key를 챙긴다. [14일 후부터 돈 낼 마음의
    준비](https://saucelabs.com/pricing)를 한다.
 2. 기존 qunit 기반 테스트에다가 전체 결과를 `window.global_test_results` 변수에 할당해주는 로직을 추가해야 한다.
    추가할 로직은 [`grunt-saucelabs`의 qunit
    예제](https://github.com/axemclion/grunt-saucelabs/blob/master/examples/qunit/index.html) 코드를 참고
 3. Gruntfile에 task를 만든다. [`grunt-saucelabs`의 qunit 예제 중
    Gruntfile](https://github.com/axemclion/grunt-saucelabs/blob/master/examples/qunit/Gruntfile.js) 참고

느낀점?

 * 테스트할 URL을 일일히 적어줘야 하는 건 좀 불편했음. (asterisk 따위가 없는게)
 * URL을 일일히 적어주다가 HTML 파일이 아닌걸 적었더니 엉뚱한 에러 메시지를 뱉음. 전반적으로 디버깅이 좀 피곤한듯.
 * 발생한 에러는 saucelabs의 대시보드에서 볼 수 있는데 여기서 보여주는 값은 `window.global_test_results` 기반인 듯 함.
   근데 Expected, Result, Source는 위 2번 로직을 그대로 넣었다면 제대로 안나옴.
   뭐 크게 불편함은 없어서 그냥 무시했지만...
 * IE7/IE8은 느려서 타이밍 이슈 때문에 테스트 깨질 수 있으니 주의. (이건 로컬에 IE7/IE8 디버깅 환경을 갖추어놓지 않으면
   스트레스일 수 있음)

아래는 소스 코드 샘플(saucelabs.js는 위 2번에 있는 코드 따다가 파일로 만들어놓은 것)

    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <link rel="stylesheet" href="resources/qunit.css">
      <title>qunit: simple test</title>
    </head>
    <body>
      <div id="qunit"></div>
      <div style="position:absolute;top:-9999px"></div>

      <script src="resources/jquery.min.js"></script>
      <script src="resources/underscore-min.js"></script>
      <script src="resources/qunit.js"></script>
      <script src="resources/saucelabs.js"></script>
      <script>
      (function () {
        module('simple.test');

        asyncTest("test", function () {
          expect(1);

          var check = function () {
            ok(true, 'log API called');
            start();
          };

          setTimeout(check, 200);
        });
      }());
      </script>
    </body>
    </html>
