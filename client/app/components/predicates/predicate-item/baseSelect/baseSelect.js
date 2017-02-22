import angular from 'angular';
import baseSelectComponent from './baseSelect.component';

const BaseSelectModule = angular.module('baseSelect', [])
  .component('baseSelect', baseSelectComponent);

export default BaseSelectModule;
