---
layout: post
title: 제목 셀의 scope 속성이 영향을 미치는 범위를 시각화한 예제
---

`scope="row"`, `scope="rowgroup"`은 잘못 이해하기 쉽다. 다음 코드를 보자.

    <table><tbody><tr><th rowspan="2">제목1</th>
                <td>내용1-1</td>
            </tr><tr><td>내용1-2</td>
            </tr><tr><th rowspan="2">제목2</th>
                <td>내용2-1</td>
            </tr><tr><td>내용2-2</td>
            </tr></tbody></table>

[위의 코드가 렌더링 되면](http://codepen.io/mctenshi/pen/fleig)

여기서 "제목1"과 "제목2"같이 병합된 제목 셀에 `scope="rowgroup"`을 넣는 경우가 많은데 이는 잘못되었다.

[HTML 5 규격의 scope 속성 부분](http://www.w3.org/TR/2011/WD-html5-author-20110809/the-th-element.html#attr-th-scope)을 보면

 * `scope="row"`: the header cell applies to some of the subsequent cells in the same row(s).
 * `scope="col"`: the header cell applies to some of the subsequent cells in the same column(s).
 * `scope="rowgroup"`: the header cell applies to all the remaining cells in the row group.
 * `scope="colgroup"`: the header cell applies to all the remaining cells in the column group.

`row`, `col`의 경우 "row(s)", "column(s)"와 같이 복수임을 주목하자. `scope="row"`는 같은 열(들)에 포함된 셀들의 제목 셀로 적용된다고 한다.

`rowgroup`은 같은 열 그룹(row group)에 포함된 셀들의 제목 셀로 적용된다고 한다. 여기서 열 그룹이란 같은 `<thead>`, `</thead><tbody>`, `</tbody><tfoot>` 요소를 의미한다(Row groups correspond to tbody, thead, and tfoot elements.).

처음의 예제를 다시 보자. 제목 셀들에 `scope="rowgroup"`을 집어넣는 경우 어떤 내용 셀들에 영향을 미치게 될지 생각해보자. ... "내용1-1"도, "내용2-2"도 "제목1", "제목2"가 모두 영향을 미치게 될 것이다.

`scope="row"`를 집어넣으면 같은 열(들)에 제목 셀로 적용되니 병합된 2개의 열에 각각 원하는 모양으로 적용될것이다. </tfoot>
