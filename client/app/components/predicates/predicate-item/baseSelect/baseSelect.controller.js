class BaseSelectController {
  constructor() {
  

  }

  $onInit() {
    this.showTag = true;
    this.showSegement = true;
    console.info('BaseSelect Controller');
    console.log(this.baseDatas);
  }

  createOptionTag() {
    // return
    const optionTag = {
      value_type: 'str',
      type: 'standard',
      name: 'tag',
      in_list: true,
    };

    return optionTag;
  }

  createOptionSegment() {
    const optionSegment = {
      value_type: 'str',
      type: 'standard',
      name: 'segment',
      in_list: true,
    };

    return optionSegment;
  }
}

export default BaseSelectController;
