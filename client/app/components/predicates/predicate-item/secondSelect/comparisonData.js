export default {
  str: [
    { name: '等于', value: 'eq' },
    { name: '不等于', value: 'ne' },
    { name: '开始于', value: 'starts_with' },
    { name: '结束于', value: 'ends_with' },
    { name: '包含', value: 'contains' },
    { name: '不包含', value: 'not_contains' },
    { name: '任何值', value: 'know' },
    { name: '未知', value: 'unknow' },
  ],
  int: [
    { name: '大于', value: 'gt' },
    { name: '小于', value: 'lt' },
    { name: '等于', value: 'eq' },
    { name: '不等于', value: 'ne' },
  ],
  datetime: [
    { name: '等于第', value: 'relative-eq' },
    { name: '晚于第', value: 'relative-gt' },
    { name: '早于第', value: 'relative-lt' },
    { name: '是', value: 'absolute-eq' },
    { name: '晚于', value: 'absolute-gt' },
    { name: '早于', value: 'absolute-lt' },
    { name: '任意', value: 'know' },
    { name: '未知', value: 'unknow' },
  ],
  tag: [
    { name: '等于', value: 'eq' },
    { name: '不等于', value: 'ne' },
  ],
  segment: [
    { name: '等于', value: 'eq' },
    { name: '不等于', value: 'ne' },
  ],
  event: {
    labels: [
      {
        optionsType: 'event',
        optionsName: '出现次数',
        options: [
          { value_type: 'event', name: '出现次数大于', value: 'gt' },
          // { value_type: 'event', name: '出现次数小于', value: 'lt' },
          { value_type: 'event', name: '出现次数等于', value: 'eq' },
          { value_type: 'event', name: '从未出现过', value: 'unknow' },
          // { value_type: 'event', name: '出现过', value: 'know' },
        ],
      },
      {
        optionsType: 'event_first_date',
        optionsName: '最早出现时间',
        options: [
          { value_type: 'event_first_date', name: '第一次出现早于第', value: 'lt' },
          { value_type: 'event_first_date', name: '第一次出现晚于第', value: 'gt' },
          { value_type: 'event_first_date', name: '第一次出现等于第', value: 'relative-eq' },
          { value_type: 'event_first_date', name: '第一次出现于', value: 'absolute-eq' },
          { value_type: 'event_first_date', name: '第一次出现早于', value: 'absolute-lt' },
          { value_type: 'event_first_date', name: '第一次出现晚于', value: 'absolute-gt' },
        ],
      },
      {
        optionsType: 'event_last_date',
        optionsName: '最晚出现时间',
        options: [
          { value_type: 'event_last_date', name: '最后一次出现早于第', value: 'lt' },
          { value_type: 'event_last_date', name: '最后一次出现晚于第', value: 'gt' },
          { value_type: 'event_last_date', name: '最后一次出现等于第', value: 'relative-eq' },
          { value_type: 'event_last_date', name: '最后一次出现于', value: 'absolute-eq' },
          { value_type: 'event_last_date', name: '最后一次出现早于', value: 'absolute-lt' },
          { value_type: 'event_last_date', name: '最后一次出现晚于', value: 'absolute-gt' },
        ],
      },
    ],
  },
};
