import angular from 'angular';
import predicatesComponent from './predicates.component';
import PredicateItemModule from './predicate-item/predicate-item';

const PredicatesModule = angular.module('predicates', [
    PredicateItemModule.name,
  ])
  .component('predicates', predicatesComponent);

// const PREDICATES_MODULE = {
//   components: {
//     predicates: predicatesComponent,
//   },
//   directives: {
//     predicateItemModule,
//   },
// };

export default PredicatesModule;
// export default PREDICATES_MODULE;
