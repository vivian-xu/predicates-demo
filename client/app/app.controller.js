const mockPredicates = [
  {
    attribute: 'company_name',
    comparison: 'contains',
    type: 'people_attribute',
    value: 'yeting',
    value_type: 'str',

    // tabType: 'user',
    // labelType: 'attribute',
    // data: {
    //   // in_list: false,
    //   name: 'company_name',
    //   // type: 'standard',
    //   value_type: 'str',
    // },
    // comparison: 'contains',
    // value: 'yeting',
  },
  // {
  //   tabType: 'user',
  //   labelType: 'attribute',
  //   data: {
  //     // in_list: false,
  //     name: 'company_name',
  //     type: 'standard',
  //     value_type: 'str',
  //   },
  //   comparison: 'contains',
  //   value: 'yeting',
  // },
  {

    attribute: 'company_name',
    comparison: 'absolute-gt',
    type: 'people_attribute',
    // value: 'yeting',
    value_type: 'datetime',
    value: {
      "year": 2017,
      "month": 2,
      "day": 28
    },



    // tabType: 'user',
    // labelType: 'attribute',
    // data: {
    //   // in_list: false,
    //   name: 'company_last_seen',
    //   // type: 'standard',
    //   value_type: 'datetime',
    // },
    // comparison: "absolute-gt",
    // // 暂时
    // value: {
    //   "year": 2017,
    //   "month": 2,
    //   "day": 28
    // },
  },
  {
    attribute: 'tag',
    comparison: 'eq',
    type: 'people_tag',
    value: 'Favorite',
    value_type: 'tag',
    // tabType: 'user',
    // labelType: 'attribute',

    // data: {
    //   in_list: false,
    //   name: 'tag',
    //   type: 'standard',
    //   value_type: 'tag',
    // },
    // comparison: 'eq',
    // "value": "Favorite",
  },
  {
    attribute: 'segment',
    comparison: 'eq',
    type: 'people_segment',
    value: '636b32ce-1156-4c28-886d-7be6843f116b',
    value_type: 'segment',

    // tabType: 'user',
    // labelType: 'attribute',
    // data: {
    //   in_list: false,
    //   name: 'segment',
    //   type: 'standard',
    //   value_type: 'segment',
    // },
    // comparison: 'eq',
    // value: "636b32ce-1156-4c28-886d-7be6843f116b",
  },
  {
    attribute: 'batch_delete_peoples',
    comparison: 'gt',
    type: 'people_event_first_date',
    value: '2',
    value_type: 'event_first_date',

    // tabType: 'user',
    // labelType: 'event_first_date',
    // data: {
    //   app_uuid: '0366f0c8',
    //   created_at: 1457890,
    //   event_name: 'batch_delete_peoples',
    //   is_archived: false,
    // },
    // comparison: 'gt',
    // value: 2,
  }
];

class AppController {
  constructor() {
    'ngInject';
  }

  $onInit() {
    console.log('App Controller');
    this.predicateOption = {
      user: ['tag', 'segment', 'event'],
      // people: ['attribute', 'tag', 'segment', 'event'],
      company: ['tag'],
      // company: ['attribute', 'tag', 'segment'],
      message: ['attribute'],
      leads: ['attribute'],
    };
    this.mockPredicates = mockPredicates;
    console.log(this.mockPredicates);
  }
}

export default AppController;
