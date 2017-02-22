import { data as cAdata } from './companyAttributes';
import { data as pAdata } from './peopleAttributes';
import { data as pEdata } from './peopleEvents';
export const predicateDatas = [
  {
    tabType: 'people',
    tabName: '用户',
    isShow: true,

    labels: [
      {
        optionsType: 'attributes', // 可选
        optionsName: '属性',
        options: pAdata,
      },
      {
        optionsType: 'events',
        optionsName: '事件',
        options: pEdata,
      },
    ]
  },
  {
    tabType: 'company',
    tabName: '公司',
    isShow: true,
    labels:[
      {
        optionsType: 'attributes',
        optionsName: '属性',
        options: cAdata,
      },
    ],
  },
  {
    tabType: 'message',
    tabName: '消息',
    isShow: true,

    labels: [
      {
        optionsType: 'attributes',
        optionsName: '属性',
        // options: cAdata,
      },
    ]
  }
];

console.log('predicateDatas');
console.log(predicateDatas);
