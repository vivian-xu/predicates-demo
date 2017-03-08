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
    if (this.baseDatas && this.secondSelected) {
      // console.info(this.baseDatas);
      // debugger;
      // console.log(this.secondSelected);
      this.initIsEvent(this.baseDatas.data);
      this.setShowDatas(this.baseDatas.data);
      this.initSelected();
    }

    this.watchDatas();
    // console.log('init second 完');

  }


  watchDatas() {
    // console.log('watch');
    // console.log(this.baseDatas);
    // this.$scope.$watch('secondSelectCtrl.baseDatas', (newValue, oldValue) => {
    //   // console.log('%c CHANGE Base Select in second', 'font-size: 20px;');
    //   if (newValue === oldValue && this.optionDatas && this.optionDatas.length > 0) {
    //     return;
    //   }
    //   this.initIsEvent(newValue.data);

    //   // console.log(newValue, oldValue);
    //   this.setShowDatas(newValue.data);
    //   this.setSelected();
    // }, true);

    this.$scope.$watch('secondSelectCtrl.refresh', (newValue, oldValue) => {
      console.log(`refresh: ${newValue}`);
      if (newValue) {
        console.log(newValue);
        console.log(this.baseDatas);
        this.initIsEvent(this.baseDatas.data);

        this.setShowDatas(this.baseDatas.data);

        this.setSelected();        
      }
    });


    this.$scope.$watch('secondSelectCtrl.eventSelected', (newValue, oldValue) => {
      if (newValue === oldValue || !this.baseDatas.data.event_name) {
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
      // if (newValue === oldValue || this.baseDatas.data.event_name) {
      //   return;
      // }
      if (this.baseDatas.data.event_name) {
        return;
      }
      // console.log('change Normal!');
      // console.log(newValue);
      this.secondSelected = newValue;
    }, true);
  }

  // 选择 应该显示什么数据
  setShowDatas(object = {}) {
    // console.warn('setShowDatas');
    // console.log(object);
    // if (object.event_name) {
    if (this.isEvent) {
      // console.log('事件！！！！');
      this.optionDatas = this.comparison.event;
    } else {
      this.optionDatas = !object ? [] : this.comparison[object.value_type];
    }
  }

  initIsEvent(object = {}) {
    this.isEvent = object.event_name ? true : false;
  }

  initSelected() {
    if (!this.optionDatas || this.optionDatas.length < 1) {
      return;
    }

    if (this.isEvent) {
      // console.log('isEvent');
      let option;
      if (this.baseDatas) {
        const label = this.comparison.event.labels.find(({optionsType}) => optionsType === this.baseDatas.labelType);

        option = label.options.find(({value}) => value === this.secondSelected);
      }
      this.eventSelected = option ? option : this.optionDatas.labels[0].options[0];
      // console.log(this.eventSelected);

    } else {
      // console.log('不是 event');
      // console.log(this.optionDatas);
      // this.normalSelected = this.secondSelected ? this.secondSelected : this.optionDatas[0].value;
      this.normalSelected = this.secondSelected;
      // console.log(this.normalSelected);
    }
  }

  setSelected() {
    if (!this.optionDatas || this.optionDatas.length < 1) {
      return;
    }

    if (this.isEvent) {
      this.eventSelected = this.optionDatas.labels[0].options[0];

    } else {
      this.normalSelected = this.optionDatas[0].value;
    }
  }
}

export default SecondSelectController;
