import angular from 'angular';
// import CategoriesModule from './categories/categories';
// import BookmarksModule from './bookmarks/bookmarks';
import PredicatesModule from './predicates/predicates';

const ComponentsModule = angular.module('components', [
  // CategoriesModule.name,
  // BookmarksModule.name,
  PredicatesModule.name,
]);

export default ComponentsModule;
