import template from './baseSelect.html';
import BaseSelectController from './baseSelect.controller';
// import './predicate-item.scss';

const baseSelectComponent = {
  bindings: {
    baseDatas: '<',
    baseSelected: '=?',
  },
  template,
  controller: BaseSelectController,
  controllerAs: 'baseSelectCtrl',
};

export default baseSelectComponent;
// {"in_list":false,"name":"标签","type":"standard","value_type":"tag"}
