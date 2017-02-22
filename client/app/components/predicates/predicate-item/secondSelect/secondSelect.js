import angular from 'angular';
import secondSelectComponent from './secondSelect.component';

const SecondSelectModule = angular.module('secondSelect', [])
  .component('secondSelect', secondSelectComponent);

export default SecondSelectModule;
