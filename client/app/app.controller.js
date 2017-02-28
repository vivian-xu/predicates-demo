class AppController {
  constructor() {
    'ngInject';
    this.predicateConfig = {
      // people: ['tag', 'segment'],
      people: ['attribute', 'tag', 'segment', 'event'],
      // company: ['tag'],
      company: ['attribute', 'tag', 'segment'],
      message: ['attribute'],
    }
  }

  $onInit() {
    console.log('App Controller');
    this.mockPredicates = [
      {
        value_type: "str",
        comparison: "contains",
        type: "people_attribute",
        value: "yeting",
        attribute: "name",
      },
      {
        "type": "people_attribute",
        "value_type": "datetime",
        "attribute": "last_contacted",
        "value": {
          "year": 2017,
          "month": 2,
          "day": 28
        },
        "comparison": "absolute-gt"
      },
      {
        "type": "people_tag",
        "value_type": "tag",
        "attribute": "tag",
        "value": "Favorite",
        "comparison": "eq"
      },
      {
        "type": "people_segment",
        "value_type": "segment",
        "attribute": "segment",
        "value": "636b32ce-1156-4c28-886d-7be6843f116b",
        "comparison": "eq"
      }
    ];
  }
}

export default AppController;
