class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.type = 'str';
  }

  $onInit() {
    console.info('LastSelectController');
    console.log(this.lastDatas);

    this.setType();
    this.watchDatas();
  }
  watchDatas() {
    this.$scope.$watch('lastSelectCtrl.baseDatas', (newValue, oldValue) => {
      console.info('CHange! baseDatas');
      if (newValue === oldValue) {
        return;
      }
      if (!newValue) {
        this.type = '';
      }
      console.log(newValue);
      this.type = newValue.value_type;
    });
  }

  setType() {
    if (!this.baseDatas || !this.baseDatas.value_type) {
      return;
    }

    this.type = this.baseDatas.value_type;
  }

}

export default LastSelectController;
