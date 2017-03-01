import template from './predicate-item.html';
import PredicateItemController from './predicate-item.controller.js';
import './predicate-item.scss';

const predicateItemComponent = {
  bindings: {
    predicateDatas: '<',
    config: '<',
    lastDatas: '<',
    addItem: '&',
    decreaseItem: '&',
    predicateRst: '=predicateSelect',
    defaultPredicate: '<',

    // selected: '=?',
  },
  template,
  controller: PredicateItemController,
  controllerAs: 'predicateItemCtrl',
  replace: true,
};

export default predicateItemComponent;
