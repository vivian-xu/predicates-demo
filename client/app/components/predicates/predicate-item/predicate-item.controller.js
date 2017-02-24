
class PredicateItemController {
  constructor() {
    'ngInject';
    this.predicateSelected = {}; // predicates 结果
    // this.lastSelectDatas = {}; // 传给 lastSelect 的数据
  }

  $onInit() {
    console.log('PredicateItem Controller');
    console.log(this.predicateSelected);
  }
}

export default PredicateItemController;
