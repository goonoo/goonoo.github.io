---
layout: post
title: AlphaSSL Wildcard 인증서를 AWS에 적용
---

데이블 API 서버에 SSL 인증서를 적용하기 위해 가장 싼 해외 SSL 인증서 판매 업체 ssl2buy에서 가장 싼 Wildcard 인증서인 AlphaSSL Wildcard Certificate(2년에 $78)를 구매하여 설치했다. 우리나라에서 가장 싼 Wildcard 인증서는 1년에 18만원 정도인 것과 비교하면 미친듯이 싸다.

구입한 인증서를 API 서버를 운영중인 AWS의 Elastic Beanstalk에 적용하는 과정에서 약간의 삽질이 있었어서 기록으로 남긴다.

구입은 https://www.ssl2buy.com/alphassl-wildcard.php 에서 하면 되고.

SSL 인증서의 AWS 등록을 위해서는 [AWS Command Line Interface](https://aws.amazon.com/cli/)를 이용하였는데 대략 다음과 같은 명령으로 등록을 해야한다.

    aws iam upload-server-certificate --server-certificate-name [이름] --certificate-body [파일경로] --private-key [파일경로] --certificate-chain [파일경로]
    
`--certificate-body`는 인증 업체(AlphaSSL)로부터 받은 인증서 본문을 포함한 파일이다. 대략 아래와 같이 생겼다.

    -----BEGIN CERTIFICATE-----
    MIIEyDCCA7CgAwIB.... (중략)
    -----END CERTIFICATE-----
    
`--private-key`는 서버용 비밀 키이다. 구입을 하고 나면 판매 업체로부터 https://www.configuressl.com/?pin=37...(중략) 같은 링크가 날아오는데 여기 접속해서 직접 생성한 비밀 키(RSA키)와 인증요청서(CSR)를 등록해주면 된다.

RSA, CSR 생성은 검색해보면 많이 나오니 대충 정리하면,

    $ openssl genrsa -out private.key 2048
    $ openssl req -new -sha256 -key private.key -out public.csr
    
2048 비트 암호화 RSA키 생성, 생성한 RSA키를 통한 인증요청서(CSR) 생성 순이다.
CSR 파일 생성 시 국가코드, 지역, 회사명 등은 적당히...

`--certificate-chain`은 인증서 체인 정보인데, 이게 누락되면 경험 상 안드로이드 일부 버전의 웹킷 계열 브라우저에서 인증서가 제대로 인증되지 않은 것으로 표시되곤 한다. 여기서 조금 삽질을 했는데 인증서 체인 정보를 만드는 방법에 대해 검색해보면 인증서 본문 + Intermediate Certificate + Root CA Certificate 이렇게 3개를 이어 붙여서 파일을 만들면 된다는 내용들이 있는데, `aws iam`에서는 Intermediate Certificate + Root CA Certificate 이렇게 2개를 이어 붙인 파일만 등록이 가능하다. AlphaSSL의 Intermediate Certificate, Root CA Certificate은 [인증서 구매 업체의 페이지](https://www.ssl2buy.com/wiki/alphassl-intermediate-root-ca-certificates/)에 친절히 나와있다. 우리가 할 일은 이 둘을 이어 붙여서 파일로 만드는 일.

    cat intermediate.pem rootca.pem > chain.pem
    
생성된 `chain.pem`은 아래처럼 생겼다.

    -----BEGIN CERTIFICATE-----
    MIIETTCCAzWgAwIBAgILBAAAAAABRE7wNjEwDQYJKoZIhvcNA... (중략)
    -----END CERTIFICATE-----
    -----BEGIN CERTIFICATE-----
    MIIDdTCCAl2gAwIBAgILBAAAAAABFUtaw5QwDQYJKoZIhvcNA... (중략)
    -----END CERTIFICATE-----

이제 private.key, public.csr, chain.pem 파일을 이용하여 `aws iam` 커맨드를 실행하여 등록해주면 끝.

    aws iam upload-server-certificate --server-certificate-name star.domain.com --certificate-body file:///path/to/public.csr --private-key file:///path/to/private.key --certificate-chain file:///path/to/chain.pem

(파일 경로는 `file:///`으로 시작해야 하는 것을 기억할 것)
