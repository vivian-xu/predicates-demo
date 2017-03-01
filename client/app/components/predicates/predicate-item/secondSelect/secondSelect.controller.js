import comparison from './comparisonData';

class SecondSelectController {
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;
    this.comparison = comparison;
    // this.isEvent = false;
    this.optionDatas = [];
  }

  $onInit() {
    // console.group('SecondSelect onInit');
    // console.log(this.baseDatas);
    this.initIsEvent(this.baseDatas.data);
    this.setShowDatas(this.baseDatas.data);
    this.initSelected();
    this.watchDatas();
    // console.groupEnd();
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

      this.setShowDatas(newValue.data);
    });

    this.$scope.$watch('secondSelectCtrl.eventSelected', (newValue, oldValue) => {
      if (newValue === oldValue || !this.baseDatas.data.data.event_name) {
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
      if (newValue === oldValue || this.baseDatas.data.event_name) {
        return;
      }
      // console.log('change Normal!');
      // console.log(newValue);
      this.secondSelected = newValue;
    });
  }

  // 选择 应该显示什么数据
  setShowDatas(object = {}) {
    // console.warn('setShowDatas');
    // console.log(object);
    // if (object.event_name) {
    if (this.isEvent) {
      this.optionDatas = this.comparison.event;
      // this.isEvent = true;
      // if (this.optionDatas) {
      //   console.log(this.optionDatas);
      //   // this.secondSelected =
      //   // if (this.secondSelected) {
      //
      //   // } else {
      //     this.eventSelected = this.optionDatas.labels[0].options[0];
      //   // }
      // }
      // console.log('eventSelected');
      // console.log(this.eventSelected);
    } else {
      this.optionDatas = !object ? [] : this.comparison[object.value_type];
      // this.isEvent = false;
      // if (this.optionDatas) {
      //   console.log('normalSelected');
      //   console.log(this.normalSelected);
      //   this.normalSelected = this.optionDatas[0].value;
      //   console.log(this.normalSelected);
      // }
    }
  }

  initIsEvent(object = {}) {
    this.isEvent = object.event_name ? true : false;
  }

  initSelected() {

    // console.log(`this.secondSelected: ${this.secondSelected}`);
    // console.log(`normalSelected: ${this.normalSelected}`);
    // console.log(`eventSelected:`);
    // console.dir(this.eventSelected);
    if (!this.optionDatas) {
      return;
    }

    if (this.isEvent) {
      let option;
      if (this.baseDatas) {
        const label = this.comparison.event.labels.find(({optionsType}) => optionsType === this.baseDatas.labelType);
        // console.log('label');
        // console.dir(label);
        option = label.options.find(({value}) => value === this.secondSelected);
        // console.log(option);
        // this.eventSelected = this.optionDatas.event.labels
      }
      this.eventSelected = option ? option : this.optionDatas.labels[0].options[0]
      // this.eventSelected = this.secondSelected ? this.secondSelected : this.optionDatas.labels[0].options[0];
    } else {
      this.normalSelected = this.secondSelected ? this.secondSelected : this.optionDatas[0].value;
      // if (this.optionDatas) {
      //   console.log('normalSelected');
      //   console.log(this.normalSelected);
      //   this.normalSelected = this.optionDatas[0].value;
      //   console.log(this.normalSelected);
      // }
    }
  }

}

export default SecondSelectController;
