// import datas from './data';
// import { predicateDatas } from '../../mock/index';

// mock 数据
import { data as cAdata } from '../../mock/companyAttributes';
import { data as pAdata } from '../../mock/peopleAttributes';
import { data as pEdata } from '../../mock/peopleEvents';
import { data as mAdata } from '../../mock/messageAttributes';
import { data as tags } from '../../mock/tags';
import { data as segments } from '../../mock/segments';

// 翻译

import translateData from './translate';
//
// 参数
// this.predicateConfig = {
//   people: ['attribute', 'tag', 'segment', 'messgae'],
//   company: ['attribute', 'tag', 'segment'],
//   message: ['attribute'],
// }
// showAll
class PredicatesController {
  constructor() {
    'ngInject';
    // this.predicateDatas = predicateDatas;
    // predicate-item selected 存放的 list
    this.predicates = [{}];
    this.setPredicateConfig(false);

    this.translateData = translateData;

    // baseSelect 的 data
    this.baseDatas = [];

    // lastSelect 的 data
    this.lastDatas = {};
  }

  $onInit() {
    this.test = 'teststes';

    // 传入设置 参数设置
    // 传入 showAll = true 直接设置全部显示
    // 传入 config 部分显示
    if (this.showAll || this.defaultPredicates) {
      this.setPredicateConfig(true);
    } else {
      if (this.config) {
        this.formatConfig(this.config);
      }
    }

  // getData 方法集合
    this.getDataFunctions = {
      people: {
        attribute: this.getPeopleAttributes,
        event: this.getpeopleEvents,
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
    };

    this.setBaseDatas();

    if (this.defaultPredicates) {
      const len = this.defaultPredicates.length;
      // this.predicates.length = this.defaultPredicates.length;
      // this.predicates.fill({});
      for (let i = 0; i < len; i++) {
        this.predicates[i] = {};
      }
      console.log(this.predicates);
    }
  }

  addItem() {
    console.log('add ITEM');
    this.predicates.push({});
    // console.log(this.predicates);
  }

  decreaseItem(idx) {
    console.log('decrease ITEM');
    if (this.predicates.length < 2) {
      return;
    }
    this.predicates = [
      ...this.predicates.slice(0,idx),
      ...this.predicates.slice(idx+1),
    ];
  }

  // 父组件传进来的 config 的 format
  formatConfig(orignalConfig) {
    // console.group('formatConfig');
    // console.log('predicateConfig');
    // console.log(this.predicateConfig);
    // console.log('orignalConfig');
    // console.log(orignalConfig);

    Object.keys(orignalConfig).map((tab) => {
      this.predicateConfig[tab].isShow = true;
      const tempOption = {};
      // tempTab.isShow = true;
      orignalConfig[tab].forEach((option) => {
        tempOption[option] = true;
        // this.predicateConfig[tab].config[] = true;
      });

      this.predicateConfig[tab].config = {
        ...this.predicateConfig[tab].config,
        ...tempOption,
      };
      // console.log(`${tab} Done!`);
    });

    // console.log('predicateConfig');
    // console.log(this.predicateConfig);

    // console.groupEnd();
  }

  // 快速设置 predicate Config, 全显示 或者 全不显示
  setPredicateConfig(state) {
    this.predicateConfig = {
      people: {
        isShow: state,
        config: {
          attribute: state,
          tag: state,
          segment: state,
          event: state,
        },
      },
      company: {
        isShow: state,
        config: {
          attribute: state,
          tag: state,
          segment: state,
        },
      },
      message: {
        isShow: state,
        config: {
          attribute: state,
        },
      },
    };
  }

  // 需要先设置 predicateConfig 才能请求数据
  //  请求对应的 attributes, events, tags, segments,
  //  其中 attributes, events 传给 baseSelect
  //  tags, segment 传给 lastSelect
  setBaseDatas() {
    // console.group('setBaseDatas');

    // console.log(this.predicateConfig);

    // 构建 传给 3 个 select 的数据
    // tab 选择,暂时有 people, company, message
    Object.keys(this.predicateConfig).forEach((tab) => {
      // console.info(`tab: ${tab}`);

      if (!this.predicateConfig[tab].isShow || !this.predicateConfig[tab].config) {
        return;
      }

      const { config } = this.predicateConfig[tab];

      // 放入 baseDatas 的本 tab 的数据
      let tempTabData = this.createTabData(tab);

      // labels 中, 暂有 atrribute, event, (tag, segment)
      // tab.config 为 null / undefined 时候 会报错
      for (let label in config) {
        // console.log(`label: ${label}`);
        if (!config.hasOwnProperty(label) || !config[label]) {
          continue;
        }

      // labels 中的数据

        // 直接放入 attribute 中, 请求的数据在 lastSelect 的数据中
        if (label === 'tag' || label === 'segment') {
          // 请求数据

          // console.warn(label);
          this.lastDatas = {
            ...this.lastDatas,
            [label]: this.getDataFunctions[tab][label](),
          };
          // console.log(this.lastDatas);

          if (config.attribute) {
            continue;
          }


          if (!config.attribute &&
            !tempTabData.labels.some((item) => item.optionsType === 'attribute')) {
            // console.log('新建！！！');
            tempTabData.labels.push(this.createLabelData('attribute'));
          }
          const idx = tempTabData.labels.findIndex((item) => item.optionsType === 'attribute');
          if (idx + 1) {
            // console.warn(`idx: ${idx}`);
            tempTabData.labels[idx].options.push(this.createOptionData(label));
          }

          continue;
        }

        const tempLab = this.createLabelData(label);

        if (config[label]) {
          tempLab.options = this.getDataFunctions[tab][label]();
        }

        if (label === 'attribute') {
          // console.group('label === attribute');
          // console.log(tempLab);

          if (config.tag) {
            tempLab.options.push(this.createOptionData('tag'));
          }
          if (config.segment) {
            tempLab.options.push(this.createOptionData('segment'));
          }
          // console.log('tempLab');
          // console.log(tempLab);
          // console.groupEnd('label === attribute');
        }

        tempTabData.labels.push(tempLab);

        // console.log(tempTabData);
      }

      this.baseDatas.push(tempTabData);
      // console.log('tempTabData');
      // console.log(tempTabData);
      // console.log(this.baseDatas);
    });

    // console.groupEnd();
  }

  // 创建 baseDatas 中的一个 Tab 的 数据 结构
  createTabData(tabType) {
    // console.log(`tabType: ${tabType}`);
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
      name: this.translateData[name] || name,
      in_list: true,
    };
  }

// 获取数据 Service
// 获取 people 相关数据
  getPeopleAttributes() {
    return pAdata;
  }

  getpeopleEvents() {
    return pEdata;
  }

  getPeopleSegments() {
    return segments;
  }
  getPeopleTags() {
    return tags;
  }

// 获取 company 相关数据
  getCompanyAttributes() {
    return cAdata;
  }

  getCompanySegments() {
    return segments;
  }
  // 暂时 与 people 是同一个数据
  getCompanyTags() {
    return tags;
  }
// 获取 message 相关数据
  getMessageAttributes() {
    return mAdata;
  }
};

export default PredicatesController;
