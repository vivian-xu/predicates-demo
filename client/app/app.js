import 'bootstrap-css-only';
import 'normalize.css';
import '../../node_modules/dao-style/dao-color.scss';

import angular from 'angular';
import daoStyle from 'dao-style';
import datePicker from "../../node_modules/.1.0.5@angular-datepicker/index.js";
// import * as datePicker from 'angular-datepicker';
import appComponent from './app.component';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

console.info('datePicker');
console.log(datePicker);

angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    daoStyle,
    datePicker,
  ])
  .component('app', appComponent);
