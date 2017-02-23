import angular from 'angular';
import predicateItemComponent from './predicate-item.component';

import BaseSelectModule from './baseSelect/baseSelect';
import SecondSelectModule from './secondSelect/secondSelect';
import LastSelectModule from './lastSelect/lastSelect';

const PredicateItemModule = angular.module('predicateItem', [
    BaseSelectModule.name,
    SecondSelectModule.name,
    LastSelectModule.name,
  ])
  .component('predicateItem', predicateItemComponent);

export default PredicateItemModule;
