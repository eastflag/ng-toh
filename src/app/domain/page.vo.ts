/**
 * pageIndex: 현재 페이지 인덱스 1,2,3,,,
 * pageSize: 한 페이지에 보여지는 갯수
 * totalCount: 뉴스의 총갯수
 * pageSizeOptions: 한페이지에 보여지는 갯수를 조정하는 옵션
 */
export class PageVo {
  constructor(public pageIndex: number = 1,
              public pageSize: number = 10,
              public totalCount: number = 0) {
  }
}
