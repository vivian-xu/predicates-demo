class BaseSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    // 选择的 tabType
    this.selectedTabType = '';
    // 选择的 labelType
    this.selectedLabelType = '';

  }
  $onInit() {
    this.showTag = true;
    this.showSegement = true;
    // console.info('BaseSelect Controller');
    // console.log(this.baseDatas);
    if (this.baseSelected) {
      this.initSelected();
    } else {
      this.setSelected();
    }
    this.watchDatas();
    // console.log('第一个 完');
  }

  initSelected() {
    // console.info(this.baseSelected);

    // if (this.baseSelected) {
    const { tabType, labelType, data } = this.baseSelected;
    this.selectedTabType = tabType;
    this.selectedLabelType = labelType;
      // this.selected = data;
    // } else {
    //   if (this.baseDatas) {
    //     this.baseSelected = {
    //       tabType: this.baseDatas[0].tabType,
    //       labelType: this.baseDatas[0].labels[0].optionsType,
    //       data: this.baseDatas[0].labels[0].options[0]
    //     };
    //   }
    // }
  }

  setSelected() {
    if (this.baseDatas) {
      this.baseSelected = {
        tabType: this.baseDatas[0].tabType,
        labelType: this.baseDatas[0].labels[0].optionsType,
        data: this.baseDatas[0].labels[0].options[0]
      };
    }
  }

  watchDatas() {
    this.$scope.$watch('baseSelectCtrl.baseSelected', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }
      // console.log(newValue, oldValue);
      this.baseSelected = {
        tabType: this.selectedTabType,
        labelType: this.selectedLabelType,
        data: newValue,
      };
    });
  }


  onhandleClick(tabType, labelType) {
    debugger;
    console.log('tabType, labelType');
    this.selectedTabType = tabType;
    this.selectedLabelType = labelType;
    // console.log(this.selectedTabType);
    // console.log(this.selectedLabelType);
    this.baseSelected = {
      ...this.baseSelected,
      tabType,
      labelType,
    };
  }
}

export default BaseSelectController;
