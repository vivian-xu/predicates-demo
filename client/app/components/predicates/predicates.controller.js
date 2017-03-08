// import datas from './data';
// import { predicateDatas } from '../../mock/index';

// mock 数据
import { data as cAdata } from '../../mock/companyAttributes';
import { data as pAdata } from '../../mock/peopleAttributes';
import { data as pEdata } from '../../mock/peopleEvents';
import { data as mAdata } from '../../mock/messageAttributes';
import { data as tags } from '../../mock/tags';
import { data as segments } from '../../mock/segments';
import { data as lAdata } from '../../mock/leadsAttribute';

// 翻译
import translateData from './translate';
//
// 参数
// this.predicateOption = {
//   user: ['attribute', 'tag', 'segment', 'messgae'],
//   company: ['attribute', 'tag', 'segment'],
//   message: ['attribute'],
// }
// showAll
class PredicatesController {
  constructor($q) {
    'ngInject';

    this.$q = $q;

    // this.predicateDatas = predicateDatas;
    // predicate-item selected 存放的 list
  
    this.predicatesSelect = [{}];
    this.setPredicateOption(false);

    this.translateData = translateData;

    // baseSelect 的 data
    this.baseDatas = [];

    // lastSelect 的 data
    this.lastDatas = {};

    this.getPeopleAttributes = this.getPeopleAttributes.bind(this);
    this.getPeopleEvents = this.getPeopleEvents.bind(this);
    this.getPeopleSegments = this.getPeopleSegments.bind(this);
    // this.getPeopleSegments = this.getPeopleSegments.bind(this);
    this.getPeopleTags = this.getPeopleTags.bind(this);
    this.getCompanyAttributes = this.getCompanyAttributes.bind(this);
    this.getCompanySegments = this.getCompanySegments.bind(this);
    this.getCompanyTags = this.getCompanyTags.bind(this);
    this.getMessageAttributes = this.getMessageAttributes.bind(this);
    this.getLeadsAttributes = this.getLeadsAttributes.bind(this);
  }

  $onInit() {
    // 传入设置 参数设置
    // 传入 showAll = true 直接设置全部显示
    // 传入 option 部分显示
    // if (this.showAll || this.defaultPredicates) {
    if (this.showAll) {
      this.setPredicateOption(true);
    } else {
      if (this.option) {
        this.formatOption(this.option);
      }
    }
    // 取数据
    this.getDatasDone = false;
    this.getDatasList = {
      user: {},
      company: {},
      message: {},
      leads: {},
    };
  // getData 方法集合
    this.getDataFunctions = {
      user: {
        attribute: this.getPeopleAttributes,
        event: this.getPeopleEvents,
        tag: this.getPeopleTags,
        segment: this.getPeopleSegments,
      },
      company: {
        attribute: this.getCompanyAttributes,
        tag: this.getCompanyTags,
        segment: this.getCompanySegments,
      },
      message: {
        attribute: this.getMessageAttributes,
      },
      leads: {
        attribute: this.getLeadsAttributes,
      },
    };

    if (this.option) {
      this.formatOption(this.option);
    } else if (this.showAll) {
      this.setPredicateOption(true);
    }

    this.getDatas()
      .then(res => {
        this.getDatasDone = true;
        console.log('promise all 的 结果');


        // if (this.option) {
        //   this.formatOption(this.option);
        // } else if (this.showAll) {
        //   this.setPredicateOption(true);
        // }

        this.setBaseDatas();
      });


    if (this.defaultPredicates) {
      this.defaultPredicatesFilter = this.filterDefaultPredicates(this.defaultPredicates);

      console.info('defaultPredicatesFilter');
      console.log(this.defaultPredicatesFilter);
      const len = this.defaultPredicatesFilter.length;
      for (let i = 0; i < len; i++) {
        this.predicatesSelect[i] = {};
      }
      console.log(this.predicatesSelect);
    }

    // this.
  }

  getDatas() {
    console.log('取数据!!!!');
    let promiseList = [];

    Object.keys(this.option).forEach((tab) => {
      console.log(this.option);
      console.log(tab);
      this.option[tab].forEach(label => {
        console.log(label);
        console.log(this.getDataFunctions[tab][label]);
        const tempPromise = this.getDataFunctions[tab][label]();
        promiseList.push(tempPromise);
      });
    });
    console.log(promiseList);

    return this.$q.all(promiseList);
  }


  filterDefaultPredicates(orignalPreds) {

    return orignalPreds.filter((item, idx) => {

      const { attribute, type, value_type } = item;
      let tabType, labelType;

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

      if (value_type.indexOf('event') !== -1 ) {
        labelType = value_type;
      } else if (attribute === 'tag' || attribute === 'segment') {
        labelType = 'attribute';
      } else {
        labelType = 'attribute';
      }

      let flag = false;


      console.log(this.predicateOption);


      if (this.predicateOption[tabType].isShow) {
        if (value_type.indexOf('event') !== -1 && this.predicateOption[tabType].option['event']) {
          console.log('isEvent!!');
          flag = true;
        } else if (attribute === 'segment' || attribute === 'tag') {
          if (!this.predicateOption[tabType].option[attribute]) {
            flag = false;
          } else {
            flag = true;
          }
        } else {
          if (!this.predicateOption[tabType][labelType]) { 
            flag = false;
          } else {
            flag = true;
          }
        }

      } else {
        flag = false;
      }
      

      // if (this.predicateOption[item.tabType].isShow) {
      //   if (item.labelType.indexOf('event') !== -1 && this.predicateOption[item.tabType].option['event']) {
      //     console.log('isEvent!!');
      //     flag = true;
      //   } else if (item.data.value_type === 'segment' || item.data.value_type === 'tag') {
      //     if (!this.predicateOption[item.tabType].option[item.data.value_type]) {
      //       flag = false;
      //     } else {
      //       flag = true;
      //     }
      //   } else {
      //     if (!this.predicateOption[item.tabType][item.labelType]) { 
      //       flag = false;
      //     } else {
      //       flag = true;
      //     }
      //   }

      // } else {
      //   flag = false;
      // }

      console.warn(flag);
      return flag;
    });
  }

  addItem() {
    console.log('add ITEM');
    this.clearDefaultPredicates();
    this.predicatesSelect.push({});
  }

  clearDefaultPredicates() {
    this.defaultPredicates = [];
  }

  decreaseItem(idx) {
    this.clearDefaultPredicates();
    console.log('decrease ITEM');
    if (this.predicatesSelect.length < 2) {
      return;
    }
    this.predicatesSelect = [
      ...this.predicatesSelect.slice(0,idx),
      ...this.predicatesSelect.slice(idx+1),
    ];
  }

  // 父组件传进来的 option 的 format
  formatOption(orignalOption) {
    Object.keys(orignalOption).map((tab) => {
      this.predicateOption[tab].isShow = true;
      const tempOption = {};
      orignalOption[tab].forEach((option) => {
        tempOption[option] = true;
      });
      this.predicateOption[tab].option = {
        ...this.predicateOption[tab].option,
        ...tempOption,
      };
    });
  }

  // 快速设置 predicate option, 全显示 或者 全不显示
  setPredicateOption(state) {
    this.predicateOption = {
      user: {
        isShow: state,
        option: {
          attribute: state,
          tag: state,
          segment: state,
          event: state,
        },
      },
      company: {
        isShow: state,
        option: {
          attribute: state,
          tag: state,
          segment: state,
        },
      },
      message: {
        isShow: state,
        option: {
          attribute: state,
        },
      },
      leads: {
        isShow: state,
        option: {
          attribute: state,
        },
      },

    };
  }
/*
 * 需要先设置 predicateOption 才能请求数据
 * 请求对应的 attributes, events, tags, segments,
 * 其中 attributes, events 传给 baseSelect
 * tags, segment 传给 lastSelect
 */
  
  setBaseDatas() {
    // 构建 传给 4 个 select 的数据
    // tab 选择,暂时有 people, company, message, leads
    Object.keys(this.predicateOption).forEach((tab) => {

      if (!this.predicateOption[tab].isShow) {
      // if (!this.predicateOption[tab].isShow || !this.predicateOption[tab].option) {
        return;
      }

      const { option } = this.predicateOption[tab];

      // 放入 baseDatas 的本 tab 的数据
      let tempTabData = this.createTabData(tab);

      // labels 中, 暂有 atrribute, event, (tag, segment)
      // tab.option 为 null / undefined 时候 会报错
      // for (let label in option) {
      for (let label of Object.keys(option)) {
        if (!option[label]) {
          continue;
        } else if (label === 'tag' || label === 'segment') {
    // 请求数据
          console.log('%c tag || segment', 'font-size: 18px;');
          this.lastDatas[tab] = {
            ...this.lastDatas[tab],
            [label]: this.getDatasList[tab][label],
          };
          // console.log(this.las)

          const idx = tempTabData.labels.findIndex((item) => item.optionsType === 'attribute');
          console.log(`idx: ${idx}`);
          if (idx === -1) {
            console.log('新建 attribute');
            const tempLabel = this.createLabelData('attribute');
            tempLabel.options.push(this.createOptionData(label));
            tempTabData.labels.push(this.createLabelData('attribute'));
            console.log(tempLabel);
            console.log(tempTabData);
          } else {
            tempTabData.labels[idx].options.push(this.createOptionData(label));
          }
        } else {
          console.log('else');
          console.log(`label: ${label}!!!`);

          const idx = tempTabData.labels.findIndex((item) => item.optionsType === label);
          if (idx !== -1) {
            console.log('label 有');
            console.log(tempTabData.labels[idx]);
          } else {
            const tempLabel = this.createLabelData(label);
            console.log('tempLabel');
            console.log(tempLabel);
            console.log(tab, label);
            console.log(this.getDatasList[tab][label]);

            tempLabel.options = [
              ...tempLabel.options,
              ...this.getDatasList[tab][label],
            ];
            console.log(tempLabel);

            tempTabData.labels.push(tempLabel);

            console.log('push base 的数据');
            console.log(tempTabData);
          }
        }
        console.log(tempTabData);
        this.baseDatas.push(tempTabData);
        console.groupEnd();
      }
    });
  }
      // labels 中的数据

        // // 直接放入 attribute 中, 请求的数据在 lastSelect 的数据中
        // if (label === 'tag' || label === 'segment') {
        //   // 请求数据
        //   console.log('%c tag || segment', 'font-size: 18px;');
        //   // const temp = this.getDataFunctions[tab][label]();
        //   // this.lastDatas[tab][label] = temp;
        //   this.getDataFunctions[tab][label]()
        //   .then(res => {
        //     console.log('最后 data');
        //     console.log('get Tag / Segement');
        //     this.lastDatas = {
        //       ...this.lastDatas,
        //       [label]: res,
        //     };
        //   });


          // console.warn(label);

          // this.getDataFunctions[tab][label]()
          //   .then(res => {
          //     this.lastDatas = {
          //       ...this.lastDatas,
          //       [label]: res,
          //     };
          //   })

          // // this.lastDatas = {
          //   ...this.lastDatas,
          //   [label]: this.getDataFunctions[tab][label](),
          // };

      //     if (option.attribute) {
      //       continue;
      //     }

      //     // if (this.predicateDatas.some)


      //     if (!option.attribute &&
      //       !tempTabData.labels.some((item) => item.optionsType === 'attribute')) {
      //       // console.log('新建！！！');
      //       tempTabData.labels.push(this.createLabelData('attribute'));
      //     }
      //     const idx = tempTabData.labels.findIndex((item) => item.optionsType === 'attribute');
      //     if (idx + 1) {
      //       // console.warn(`idx: ${idx}`);
      //       tempTabData.labels[idx].options.push(this.createOptionData(label));
      //     }

      //     continue;
      //   }

      //   const tempLab = this.createLabelData(label);

      //   if (option[label]) {
      //     tempLab.options = this.getDataFunctions[tab][label]();
      //   }

      //   if (label === 'attribute') {

      //     if (option.tag) {
      //       tempLab.options.push(this.createOptionData('tag'));
      //     }
      //     if (option.segment) {
      //       tempLab.options.push(this.createOptionData('segment'));
      //     }
      //   }

      //   tempTabData.labels.push(tempLab);
      // }

      // this.baseDatas.push(tempTabData);
      // console.log('tempTabData');
      // console.log(tempTabData);
      // console.log(this.baseDatas);
    // });

    // console.groupEnd();
  // }


  setLastDatas() {

  }


  // 创建 baseDatas 中的一个 Tab 的 数据 结构
  createTabData(tabType) {
    console.log(`tabType: ${tabType}`);
    return {
      tabType,
      tabName: this.translateData[tabType] || tabType,
      labels: [],
    };
  }

  // 创建 baseDatas 中的一个 label 的 数据 结构
  createLabelData(optionsType) {
    // console.log(`optionsType: ${optionsType}`);
    return {
      optionsType,
      optionsName: this.translateData[optionsType] || optionsType,
      options: [],
    };
  }

  createOptionData(name) {
    // console.log(`option Name: ${name}`);
    return {
      value_type: name,
      type: 'standard',
      // name: this.translateData[name] || name,
      name: name,
      in_list: true,
    };
  }

  formatOutputPredicates() {
    this.query = this.predicatesSelect.fiter((item) => item.isAll);
  }

// 获取数据 Service
// 获取 people 相关数据
  getPeopleAttributes() {
    return this.$q.when(pAdata);
    // return pAdata;
  }

  getPeopleEvents() {
    return this.$q.when(pEdata);
    // return pEdata;
  }

  getPeopleSegments() {
    return this.$q.when(segments);
    // return segments;
  }
  getPeopleTags() {
    return this.$q.when(tags);
  }

// 获取 company 相关数据
  getCompanyAttributes() {
    return this.$q.when(cAdata);
    // return cAdata;
  }

  getCompanySegments() {
    return this.$q.when(segments);
    // return segments;
  }
  // 暂时 与 people 是同一个数据
  getCompanyTags() {
    return this.$q.when(tags);
    // return tags;
  }
// 获取 message 相关数据
  getMessageAttributes() {
    console.log('get Message');
    console.log(mAdata);
    return this.$q.when(mAdata);
    // return mAdata;
  }
  getLeadsAttributes() {
    return this.$q.when(lAdata);
    // return lAdata;
  }
};

export default PredicatesController;
