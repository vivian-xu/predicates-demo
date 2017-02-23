import angular from 'angular';
import lastSelectComponent from './lastSelect.component';

const LastSelectModule = angular.module('lastSelect', [])
  .component('lastSelect', lastSelectComponent);

export default LastSelectModule;
