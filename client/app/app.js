import 'bootstrap-css-only';
import 'normalize.css';
import moment from '../../node_modules/.2.17.1@moment/moment';
console.log(moment);
import '../../node_modules/dao-style/dao-color.scss';

import angular from 'angular';
import daoStyle from 'dao-style';
import datePicker from "../../node_modules/.1.0.5@angular-datepicker/index.js";
import  "../../node_modules/.1.0.5@angular-datepicker/dist/index.min.css";
// import * as datePicker from 'angular-datepicker';
import appComponent from './app.component';
import CommonModule from './common/common';
import ComponentsModule from './components/components';

// console.log(datePicker);

angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    daoStyle,
    datePicker,
  ])
  .component('app', appComponent);
