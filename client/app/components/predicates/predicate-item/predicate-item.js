import angular from 'angular';
import predicateItemComponent from './predicate-item.component';

import BaseSelectModule from './baseSelect/baseSelect';
import SecondSelectModule from './secondSelect/secondSelect';

const PredicateItemModule = angular.module('predicateItem', [
    BaseSelectModule.name,
    SecondSelectModule.name,
  ])
  .component('predicateItem', predicateItemComponent);

export default PredicateItemModule;
