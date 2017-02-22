import { data as cAdata } from './companyAttributes';
import { data as pAdata } from './peopleAttributes';
import { data as pEdata } from './peopleEvents';
import { data as mAdata } from './messageAttributes';
export const predicateDatas = [
  {
    tabType: 'people',
    tabName: '用户',
    isShow: true,

    labels: [
      {
        isShow: true,
        optionsType: 'attribute', // 可选
        optionsName: '属性',
        options: pAdata,
      },
      {
        isShow: true,
        optionsType: 'event',
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
        isShow: true,
        optionsType: 'attribute',
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
        isShow: true,
        optionsType: 'attribute',
        optionsName: '属性',
        options: mAdata,
      },
    ]
  },
];

console.log('predicateDatas');
console.log(predicateDatas);
