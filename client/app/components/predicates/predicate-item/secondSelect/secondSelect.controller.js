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
    console.log(this.secondDatas);
    console.info('SecondSelect Controller');
    this.setShowDatas(this.secondDatas);
    this.watchDatas();
  }

  watchDatas() {

    this.$scope.$watch('secondSelectCtrl.secondDatas', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      this.setShowDatas(newValue);
      console.log(`newValue: `);
      console.log(newValue);
      console.log(`optionDatas: `);
      console.log(this.optionDatas);
    });



    this.$scope.$watch('secondSelectCtrl.eventSelected', (newValue, oldValue) => {
      if (newValue === oldValue || !this.secondDatas.event_name) {
        return;
      }

      const temp = {
        value_type: newValue.value_type,
        value: newValue.value,
      };

      this.secondSelected = temp;

      console.log('change Event!');
      console.log(newValue);
    });

    this.$scope.$watch('secondSelectCtrl.normalSelected', (newValue, oldValue) => {
      if (newValue === oldValue || this.secondDatas.event_name) {
        return;
      }
      console.log('change Normal!');
      console.log(newValue);
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
