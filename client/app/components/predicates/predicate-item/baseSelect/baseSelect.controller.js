class BaseSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    // 最新的选择的 tabType
    this.latestSelectedType = '';
  }

  $onInit() {
    this.showTag = true;
    this.showSegement = true;
    console.info('BaseSelect Controller');
    console.log(this.baseDatas);
    this.watchDatas();
  }

  watchDatas() {
    this.$scope.$watch('baseSelectCtrl.selected', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      console.log(newValue);
      this.baseSelected = {
        tabType: this.selectedTabType,
        labelType: this.sselectedLabelType,
        data: newValue,
      };
    });
  }


  onhandleClick(tabType, labelType) {
    console.log('tabType, labelType');
    this.selectedTabType = tabType;
    this.sselectedLabelType = labelType;
    console.log(this.selectedTabType);
    console.log(this.sselectedLabelType);
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
