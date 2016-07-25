---
layout: post
title: socket.io 앞에 nginx를 세워 서비스를 하는데 IE10에서 액세스 오류가 나온다면?
---

nginx에 [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 헤더가 설정되어 있지 않는 것이 문제다.

socket.io는 기본적으로 wide opened CORS header를 제공하지만 (source: [Configuring Socket.IO](https://github.com/LearnBoost/Socket.IO/wiki/Configuring-Socket.IO) nginx를 proxy로 쓰면 nginx가 header를 무시해버리므로 nginx 설정에 관련 설정을 추가해야 한다.

참고: [Wide-open CORS config for nginx](https://gist.github.com/michiel/1064640)

웃긴건 IE10 이외의 브라우저들에서는 CORS header 없이 잘 된다는거...;;
