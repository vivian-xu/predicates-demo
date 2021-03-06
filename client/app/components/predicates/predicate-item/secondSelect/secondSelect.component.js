import template from './secondSelect.html';
import SecondSelectController from './secondSelect.controller';
// import './predicate-item.scss';

const secondSelectComponent = {
  bindings: {
    baseDatas: '<',
    // secondDatas: '<',
    secondSelected: '=?',
  },
  template,
  controller: SecondSelectController,
  controllerAs: 'secondSelectCtrl',
};

export default secondSelectComponent;
