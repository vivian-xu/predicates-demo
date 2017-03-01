import template from './predicates.html';
import controller from './predicates.controller';
import './predicates.scss';

const predicatesComponent = {
  bindings: {
    config: '<',
    showAll: '<?',
    defaultPredicates: '<?',
  },
  template,
  controller,
  controllerAs: 'predicatesCtrl',
};

export default predicatesComponent;
