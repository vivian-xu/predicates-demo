class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.type = 'str';
    this.isShow = this.checkIsShow();
  }

  $onInit() {
    console.info('LastSelectController');
    console.log(this.lastDatas);

    this.setType();
    this.watchDatas();
  }
  watchDatas() {
    this.$scope.$watch('lastSelectCtrl.baseDatas', (newValue, oldValue) => {
      console.log('%c CHange! baseDatas', 'font-size: 20px; color: yellow; background-color: black;');
      if (newValue === oldValue) {
        return;
      }

      this.lastSelected = '';

      if (!newValue) {
        this.type = '';
      }
      console.log(newValue);
      this.type = newValue.value_type;
      console.log(this.type);
    });

    this.$scope.$watch('lastSelectCtrl.secondDatas', (newValue, oldValue) => {
      
      console.log('%c change Second Datas', 'color: blue; font-size: 20px;');
      console.log(`newValue: ${newValue}`);
      console.log(`oldValue: ${oldValue}`);
      if (newValue === oldValue) {
        return;
      }

      this.isShow = this.checkIsShow();
    })
  }

  checkIsShow() {
    return !(this.secondDatas === 'know' || this.secondDatas === 'unknow' || !this.secondDatas);
  }

  setType() {
    if (!this.baseDatas || !this.baseDatas.value_type) {
      return;
    }

    this.type = this.baseDatas.value_type;
  }

}

export default LastSelectController;
