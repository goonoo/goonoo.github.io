---
layout: post
title: ubuntu 12.04 Problem with MergeList 오류 해결
---

(SOLVED) E:Encountered a section with no Package: header, E:Problem with MergeList

ubuntu 12.04에서 아래와 같은 오류가 나서

    $ sudo apt-get check
    Reading package lists... Error!
    E: Encountered a section with no Package: header
    E: Problem with MergeList /var/lib/apt/lists/archive.ubuntu.com_ubuntu_dists_hardy-updates_multiverse_binary-i386_Packages
    E: The package lists or status file could not be parsed or opened.
    $ 

다음과 같이 해결

    $ sudo rm /var/lib/apt/lists/* -vf
    $ sudo apt-get update
