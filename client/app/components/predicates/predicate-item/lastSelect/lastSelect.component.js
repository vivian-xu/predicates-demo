import template from './lastSelect.html';
import LastSelectController from './lastSelect.controller';
// import './predicate-item.scss';

const lastSelectComponent = {
  bindings: {
    lastDatas: '<',
    baseDatas: '<',
    lastSelected: '=?',
  },
  template,
  controller: LastSelectController,
  controllerAs: 'lastSelectCtrl',
};

export default lastSelectComponent;