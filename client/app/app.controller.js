class AppController {
  constructor() {
    'ngInject';
    this.predicateConfig = {
      people: ['tag', 'segment'],
      // people: ['attribute', 'tag', 'segment', 'event'],
      company: ['tag'],
      // company: ['Îattribute', 'tag', 'segment'],
      message: ['attribute'],
    }
  }

  $onInit() {
    console.log('App Controller');
  }
}

export default AppController;
