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
    // console.log(this.predicateRst);
  }

  $onInit() {
    this.all = false;

    if (!this.predicateRst) {
      this.predicateRst = {
        type: '',
        value_type: '',
        attribute: '',
        value: '',
        comparison: '',
      };
    }
    if (this.defaultPredicate) {
      // console.log(this.defaultPredicate);
      // console.log(this.predicateSelected);
      this.initSelected();
    } else {
      this.watchDatas();
    }
    console.log(this.predicateSelected);
    console.log('item init 完');
  }

  initSelected() {
    // const { comparison, value, ...other } = this.defaultPredicate;
    if (this.defaultPredicate) {
      const { comparison, value, labelType, tabType, data } = this.defaultPredicate;
      // console.info('defaultPredicate');
      // console.log(this.defaultPredicate);
      // this.predicateSelected = angular.copy(this.defaultPredicate);
      // console.log(value);
      const tempObject = {
        labelType,
        tabType,
        // name: data.name || data.event_name,
        data,
      };

      // console.log(tempObject);
      this.predicateSelected = {
        baseSelected: this.getBaseOption(tempObject),
        lastSelected: value,
        secondSelected: comparison,
      }
    }
  }

  getBaseOption(object) {
    console.log(object);
    // const baseOption;
    if (object.labelType.indexOf('event') === -1) {
      const { labelType, tabType, data: {name} } = object;

      const findTab = this.predicateDatas.find(tab => tabType === tabType);
      console.log(findTab);

      const findOption = findTab.labels.find(option => option.optionsType === labelType);

      console.log(findOption);

      const findItem = findOption.options.find(item => item.name === name);

      console.warn(findItem);
      return {
        tabType,
        labelType,
        data: findItem ? findItem : object.data,
      };
    } else {
      console.error(object);
      const { labelType, tabType, data: {event_name} } = object;

      const findTab = this.predicateDatas.find(tab => tabType === tabType);
      console.log(findTab);

      const findOption = findTab.labels.find(option => option.optionsType === 'event');

      console.log(findOption);
      const findItem = findOption.options.find(item => item.event_name === event_name);
      // this.predicateDatas
      // return object;
      console.warn(findItem);
      return {
        tabType,
        labelType,
        data: findItem ? findItem : object.data,
      };
    }

  }

  startWatch() {
    this.watchDatas();
    console.log('item 开始 watch');
  }

  watchDatas() {
    // this.$scope.$watch('predicateItemCtrl.baseSelected', (newValue, oldValue) => {
    //   console.log('base');
    //   // if (newValue )
    //   this.predicateSelected.baseSelected = angular.copy(newValue);
    //   console.log(newValue, oldValue);
    // });
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
    // console.info('get Predicate!!');
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
    // console.log('set Datas!!');
    // console.log(this.predicateRst);
    let tempData = {
      type: '',
      value_type: '',
      attribute: '',
      value: '',
      comparison: '',
    };
    const { baseSelected: { data, labelType, tabType }, secondSelected, lastSelected } = this.predicateSelected;

    if (data.value_type === 'tag' || data.value_type === 'segment') {
      // console.log(`data.value_type: ${data.value_type}`);
      // console.log(`tabType: ${tabType}`);
      // console.log(this.predicateSelected.baseSelected);
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
    // console.log('get TempData!!');
    this.predicateRst = {
      ...this.predicateRst,
      ...tempData,
    };
    // console.log(this.predicateRst);
  }
}

export default PredicateItemController;
