// import datas from './data';
import { predicateDatas } from '../../mock/index';


class PredicatesController {
  constructor() {
    'ngInject';
    this.predicateDatas = predicateDatas;
    this.selectedList = [];

  }

  $onInit() {
    console.log('this.predicates controller');
    console.log( predicateDatas );
    console.log(this.predicateDatas);
    this.test = 'teststes';
  }
}

export default PredicatesController;
