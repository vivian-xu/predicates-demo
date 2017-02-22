
class PredicateItemController {
  constructor() {
    'ngInject';
    this.predicateSelected = {}; // predicates 结果
  }

  $onInit() {
    console.log('PredicateItem Controller');
    console.log(this.predicateSelected);
  }
}

export default PredicateItemController;
