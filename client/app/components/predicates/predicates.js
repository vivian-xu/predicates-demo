import angular from 'angular';
import predicatesComponent from './predicates.component';
import PredicateItemModule from './predicate-item/predicate-item';

const PredicatesModule = angular.module('predicates', [
    PredicateItemModule.name,
  ])
  .component('predicates', predicatesComponent);
export default PredicatesModule;
