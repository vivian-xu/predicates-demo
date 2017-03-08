class PredicateItemController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    // 子组件传来的 predicates 结果
    this.predicateSelected = {};
    this.predicateRefresh = {
      base: false,
      second: false,
      last: false,
    };
  }

  $onInit() {
    this.all = false;

    if (!this.predicateRst) {
      this.resetRstDatas();
    }
    if (this.defaultPredicate) {
      // console.log(this.defaultPredicate);
      // console.log(this.predicateSelected);
      this.initSelected();
    } else {
      this.watchDatas();
    }
    // console.log(this.predicateSelected);
    // console.log('item init 完');
  }

  initSelected() {

  // {
  //   attribute: 'tag',
  //   comparison: 'eq',
  //   type: 'people_tag'
  //   value: 'Favorite',
  //   value_type: 'tag'
  // }

    const { comparison, value, attribute, type, value_type } = this.defaultPredicate;
    let baseSelected, secondSelected, lastSelected, tabType, labelType;

    if (type.indexOf('people') !== -1) {
      tabType = 'user';
    } else if (type.indexOf('company') !== -1) {
      tabType = 'company';
    } else if (type.indexOf('message') !== -1) {
      tabType = 'message';
    } else {
    // } else (type.indexOf('leads') !== -1) {
      tabType = 'leads';
    }

    let data = {};

    if (value_type.indexOf('event') !== -1 ) {
      // data.event_name = attribute;
      // labelType = value_type;
      // secondSelected = comparison;
      // lastSelected = value;
      // baseSelected = {
      //   tabType,
      //   labelType: value_type,
      //   data,
      // };

      data.event_name = attribute;
      // labelType = value_type;
      secondSelected = comparison;
      lastSelected = value;
      baseSelected = {
        tabType,
        // labelType: value_type,
        labelType: 'event',
        data,
      };
      console.log(baseSelected, secondSelected, lastSelected);
    } else if (attribute === 'tag' || attribute === 'segment') {
      data = {
        name: attribute,
        value_typeP: attribute,
      };
      secondSelected = comparison;
      lastSelected = value;
      baseSelected = {
        tabType,
        labelType: 'attribute',
        data,
      };
    } else {
      data = {
        name: attribute,
        value_type,
      };
      baseSelected = {
        tabType,
        labelType: 'attribute',
        data,
      };
      secondSelectCtrl = comparison;
      lastSelected = value;
    }

    this.predicateSelected = {
      baseSelected: this.getBaseOption(baseSelected),
      lastSelected,
      secondSelected,
    };

    console.log(this.predicateSelected);
  }

  getBaseOption(object) {
    console.warn('getBaseOption');
    // const baseOption;
    if (object.labelType.indexOf('event') === -1) {
      const { labelType, tabType, data: {name} } = object;

      const findTab = this.predicateDatas.find(tab => {
        console.log(tab);
        console.log(`tabType: ${tabType}`);
        return tab.tabType === tabType;
      });
      console.log('find Tab');
      console.log(findTab);

      const findOption = findTab.labels.find(option => option.optionsType === labelType);

      // console.log(findOption);

      const findItem = findOption.options.find(item => item.name === name);

      console.warn(findItem);
      console.log(object);
      return {
        tabType,
        labelType,
        data: findItem ? findItem : object.data,
      };
    } else {
      // console.error(object);
      const { labelType, tabType, data: {event_name} } = object;

      const findTab = this.predicateDatas.find(tab => tab.tabType === tabType);
      // console.log(findTab);

      const findOption = findTab.labels.find(option => option.optionsType === 'event');

      console.log(findOption);
      const findItem = findOption.options.find(item => item.event_name === event_name);
      // this.predicateDatas
      // return object;
      // console.warn(findItem);
      return {
        tabType,
        labelType,
        data: findItem ? findItem : object.data,
      };
    }

  }

  startWatch() {
    this.watchDatas();
    // console.log('item 开始 wa');
  }

  watchDatas() {
    this.$scope.$watch('predicateItemCtrl.predicateSelected', (newValue, oldValue) => {
      this.all = this.checkAll();
      this.predicateRst.isAll = this.all;
      console.log(newValue, oldValue);
      console.log(this.predicateSelected);

      // const temp = angular.copy(newValue);
      if (newValue.lastSelected !== oldValue.lastSelected) {
        console.log('last change');
      } else if (newValue.secondSelected !== oldValue.secondSelected) {
        console.log('second change');
      } else {
        console.log('base change');
      }


      if (this.all) {
        this.setDatas();
      } 
    }, true);
  }

  

  checkAll() {
    const { baseSelected, secondSelected, lastSelected } = this.predicateSelected;

    console.log('checkAll');
    console.log(this.predicateSelected);
    console.log(angular.copy(this.predicateSelected));

    if (!baseSelected || !secondSelected) {
      return false;
    }

    if (typeof lastSelected === 'number') {
      if (lastSelected > -1) {
        // console.warn( 'true');
        return true;
      } else {
        return false;
      }
    }

    if (!lastSelected && (secondSelected !== 'know' || secondSelected !== 'unknow')) {
      // console.error(`secondSelected: ${secondSelected}`);
      // console.error(`lastSelect: ${lastSelected}`);
      return false;
    }
    // console.warn( 'true');
    return true;
    // this.predicateSelected
  }

  resetRstDatas() {
    this.predicateRst = {
      data: {
        type: '',
        value_type: '',
        attribute: '',
        value: '',
        comparison: '',
      },
      isAll: false,
    };
  }

  setDatas() {
    // console.log('set Datas!!');
    // console.log(this.predicateRst);
    // let tempData = {
    //   type: '',
    //   value_type: '',
    //   attribute: '',
    //   value: '',
    //   comparison: '',
    // };
    let tempData = {};
    const { baseSelected: { data, labelType, tabType }, secondSelected, lastSelected } = this.predicateSelected;
    console.dir(angular.copy(this.predicateSelected));
    console.log(angular.copy(this.predicateSelected.lastSelected));

    if (data.value_type === 'tag' || data.value_type === 'segment') {
      // console.log(`data.value_type: ${data.value_type}`);
      // console.log(`tabType: ${tabType}`);
      // console.log(this.predicateSelected.baseSelected);
      tempData = {
        type: `${ tabType === 'user' ? 'people' : tabType }_${data.value_type}`,
        value_type: data.value_type,
        attribute: data.value_type,
        comparison: secondSelected,
        // value: data.value_type === 'tag' ? lastSelected.tag_name : lastSelected.segment_uuid,
        value: lastSelected,
      };
    } else {
      tempData = {
        type: `${ tabType === 'user' ? 'people' : tabType }_attribute`,
        value_type: data.value_type,
        attribute: data.name,
        comparison: secondSelected,
        value: lastSelected,
      };
    }

    console.log(this.predicateSelected.lastSelected);

    console.dir(this.predicateSelected.baseSelected);
    // tempData
    if (labelType.indexOf('event') !== -1) {
      console.log('event');
      console.dir(tempData);
      tempData = {
        type: `${ tabType === 'user' ? 'people' : tabType }_${labelType}`,
        // value_type: secondSelected.value_type,
        value_type: labelType,
        attribute: data.event_name,
        comparison: secondSelected,
        value: lastSelected,
      };
      console.dir(tempData);
    }
    console.log('get TempData!!');
    this.predicateRst.data = tempData;
    this.predicateRst.isAll = this.all;
    console.log(this.predicateRst);
  }
}

export default PredicateItemController;
