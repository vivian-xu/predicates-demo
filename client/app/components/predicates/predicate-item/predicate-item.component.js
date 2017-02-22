import template from './predicate-item.html';
import PredicateItemController from './predicate-item.controller.js';
import './predicate-item.scss';

const predicateItemComponent = {
  bindings: {
    predicateDatas: '<',
    // selected: '=?',
  },
  template,
  controller: PredicateItemController,
  controllerAs: 'predicateItemCtrl',
};

export default predicateItemComponent;
