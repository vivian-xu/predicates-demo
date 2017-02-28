class PredicateItemController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    // 子组件传来的 predicates 结果
    this.predicateSelected = {};
    // 输出
    // this.predicateRst = {
    //   type: '',
    //   value_type: '',
    //   attribute: '',
    //   value: '',
    //   comparison: '',
    // };
    // this.lastSelectDatas = {}; // 传给 lastSelect 的数据
    console.log(this.predicateRst);
  }

  $onInit() {
    this.all = false;
    //  border radius 样式
    this.predicateRst = {
      ...this.predicateRst,
      type: '',
      value_type: '',
      attribute: '',
      value: '',
      comparison: '',
    };
    // console.log('PredicateItem Controller');
    // console.log(this.predicateSelected);
    this.watchDatas();
  }

  watchDatas() {
    this.$scope.$watch('predicateItemCtrl.predicateSelected.secondSelected', (newValue, oldValue) => {
      this.all = this.checkAll();
      if (this.all) {
        this.setDatas();
        this.getPredicate();
      }
    });

    this.$scope.$watch('predicateItemCtrl.predicateSelected.lastSelected', (newValue, oldValue) => {
      console.log(newValue, oldValue);
      this.all = this.checkAll();
      if (this.all) {
        this.setDatas();
        this.getPredicate();
      }
    });
  }

  getPredicate() {
    console.info('get Predicate!!');
  }

  checkAll() {
    const { baseSelected, secondSelected, lastSelected } = this.predicateSelected;
    if (!baseSelected || !secondSelected) {
      return false;
    }

    // if (secondSelected !== 'know' || secondSelected !== 'unknow')  {
    //   console.error(`secondSelected: ${secondSelected}`);
    //   return false;
    // }
    if (!lastSelected && (secondSelected !== 'know' || secondSelected !== 'unknow')) {
      // console.error(`secondSelected: ${secondSelected}`);
      // console.error(`lastSelect: ${lastSelected}`);
      return false;
    }
    return true;
    // this.predicateSelected
  }

  setDatas() {
    console.log('set Datas!!');
    console.log(this.predicateRst);
    let tempData = {
      type: '',
      value_type: '',
      attribute: '',
      value: '',
      comparison: '',
    };
    const { baseSelected: { data, labelType, tabType }, secondSelected, lastSelected } = this.predicateSelected;

    if (data.value_type === 'tag' || data.value_type === 'segment') {
      tempData = {
        ...tempData,
        type: `${tabType}_${data.value_type}`,
        value_type: data.value_type,
        attribute: data.value_type,
        comparison: secondSelected,
        // value: data.value_type === 'tag' ? lastSelected.tag_name : lastSelected.segment_uuid,
        value: lastSelected,
      };

    } else {
      tempData = {
        ...tempData,
        type: `${tabType}_attribute`,
        value_type: data.value_type,
        attribute: data.name,
        comparison: secondSelected,
        value: lastSelected,
      };
    }

    // tempData
    if (labelType === 'event' ) {
      tempData = {
        ...tempData,
        type: `${tabType}_${secondSelected.value_type}`,
        value_type: secondSelected.value_type,
        attribute: data.event_name,
        comparison: secondSelected.value,
        value: lastSelected,
      };
    }
    console.log('get TempData!!');
    this.predicateRst = {
      ...this.predicateRst,
      ...tempData,
    };
    console.log(this.predicateRst);
  }
}

export default PredicateItemController;
