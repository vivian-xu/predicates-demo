import 'bootstrap-css-only';
import 'normalize.css';
import '../../node_modules/dao-style/dao-color.scss';

import angular from 'angular';
import daoStyle from 'dao-style';
import appComponent from './app.component';
import CommonModule from './common/common';
import ComponentsModule from './components/components';


angular.module('app', [
    CommonModule.name,
    ComponentsModule.name,
    daoStyle,
  ])
  .component('app', appComponent);
