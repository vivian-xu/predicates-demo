import comparison from './comparisonData';

class SecondSelectController {
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;
    this.comparison = comparison;
    this.isEvent = false;
    this.optionDatas = [];
  }

  $onInit() {
    // console.log(this.baseDatas);
    // console.info('SecondSelect Controller');
    this.setShowDatas(this.baseDatas);
    this.watchDatas();
  }

  watchDatas() {

    // this.$scope.$watch('secondSelectCtrl.baseDatas', (newValue, oldValue) => {
    //   console.log(oldValue);
    //   console.log(newValue);
    // });

    this.$scope.$watch('secondSelectCtrl.baseDatas', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }
      console.log('%c CHANGE Base Select in second', 'font-size: 20px;');

      this.setShowDatas(newValue);
      // console.log(`newValue: `);
      // console.log(newValue);
      // console.log(`optionDatas: `);
      // console.log(this.optionDatas);
    });



    this.$scope.$watch('secondSelectCtrl.eventSelected', (newValue, oldValue) => {
      if (newValue === oldValue || !this.baseDatas.event_name) {
        return;
      }

      const temp = {
        value_type: newValue.value_type,
        value: newValue.value,
      };

      this.secondSelected = temp;

      // console.log('change Event!');
      // console.log(newValue);
    });

    this.$scope.$watch('secondSelectCtrl.normalSelected', (newValue, oldValue) => {
      if (newValue === oldValue || this.baseDatas.event_name) {
        return;
      }
      // console.log('change Normal!');
      // console.log(newValue);
      this.secondSelected = newValue;
    });
  }

  // 选择 应该显示什么数据
  setShowDatas(object = {}) {
    if (object.event_name) {
      this.optionDatas = this.comparison.event;
      this.isEvent = true;
    } else {
      this.optionDatas = !object ? [] : this.comparison[object.value_type];
      this.isEvent = false;
    }
  }

}

export default SecondSelectController;
