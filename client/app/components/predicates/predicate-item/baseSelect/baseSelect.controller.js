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
    this.watchDatas();
  }

  watchDatas() {
    this.$scope.$watch('baseSelectCtrl.selected', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      // console.log(newValue);
      this.baseSelected = {
        tabType: this.selectedTabType,
        labelType: this.selectedLabelType,
        data: newValue,
      };
    });
  }


  onhandleClick(tabType, labelType) {
    // console.log('tabType, labelType');
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

  createOptionTag() {
    // return
    const optionTag = {
      value_type: 'str',
      type: 'standard',
      name: 'tag',
      in_list: true,
    };

    return optionTag;
  }

  createOptionSegment() {
    const optionSegment = {
      value_type: 'str',
      type: 'standard',
      name: 'segment',
      in_list: true,
    };

    return optionSegment;
  }
}

export default BaseSelectController;
