import moment from '../../../../../../node_modules/.2.17.1@moment/moment';

class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;

  }

  $onInit() {
    if (this.baseDatas && this.baseDatas.data && this.secondDatas ) {
      this.isShow = this.checkIsShow();
      if (this.isShow && this.lastSelected) {
        this.setType();
        // this.setModel();
        this.initSelected();
      }

      this.startItemWatch();
    } else {
      this.type = 'str';
      this.lastSelectedDatetime = null;
      this.isShow = true;
      this.isDisabled = true;
      this.setSelected();
    }
    // this.initSelected();
    this.setModel();
    this.watchDatas();
    // console.info('最后一个 init 完');
  }

  initSelected() {
    // if (!this.lastSelected) {
      // console.log(`lastSelected:`);
      // console.log(this.lastSelected);
      // this.type = this.baseDatas.data.value_type;
      // if (this.type === 'datetime' && this.secondDatas &&
      if (this.type === 'datetime' &&
       (this.secondDatas.indexOf('relative') === -1)) {
        this.lastSelectedDatetime = moment(this.lastSelected).format('YYYY-MM-DD');
      }

      if (this.type === 'event' && this.lastSelected) {
        this.lastSelected = angular.copy(this.lastSelected) - 0;
      }
  }

  setSelected() {
    // this.type = this.baseDatas.data.value_type;
    if (this.type === 'tag') {
      this.lastSelected = this.lastDatas.tag[0].tag_name;
    } else if (this.type === 'segment') {
      this.lastSelected = this.lastDatas.segment[0].segment_uuid;
    } else if (this.model === 'datetime') {
    // } else if (this.type === 'datetime' && this.secondDatas && (this.secondDatas.indexOf('relative') === -1)) {
      this.lastSelectedDatetime = moment().format('YYYY-MM-DD');
      // console.log(this.lastSelectedDatetime);
    } else {
      this.lastSelected = null;
    }
  }

  checkNum(num) {
    // console.log(`num: ${num}`);
    // console.log(num);
    // console.log(typeof num === 'number');
    return (typeof num !== 'number') || num < 0;
  }

  watchDatas() {
    // this.$scope.$watch('lastSelectCtrl.baseDatas', (newValue, oldValue) => {
    //   this.isShow = this.checkIsShow();
    //   if (newValue === oldValue) {
    //     return;
    //   }
    //   // if (!newValue) {
    //   //   this.type = '';
    //   // }
    //   console.log(newValue);
    //   if (newValue) {
    //     // this.type = newValue.value_type;
    //     this.setType();
    //   }

    //   // this.initSelected();
    //   this.setModel();
    //   this.setSelected();
    //   // console.log(`MODEL: ${this.model}`);

    //   // console.log(this.type);
    // });

    // this.$scope.$watch('lastSelectCtrl.secondDatas', (newValue, oldValue) => {
    //   if (newValue === oldValue) {
    //     return;
    //   }

    //   this.isShow = this.checkIsShow();
    //   this.isDisabled = this.checkIsDisable();
    //   // this.initSelected();
    //   this.setModel();
    //   this.setSelected();
    //   // console.log(`MODEL: ${this.model}`);

    //   // console.log(this.secondDatas);
    // });
    
    this.$scope.$watch('lastSelectCtrl.refresh', (newValue, oldValue) => {
      console.log(`refresh: ${newValue}`);
      if (newValue) {
        console.log(newValue);
        console.log(this.baseDatas);
        this.initIsEvent(this.baseDatas.data);

        this.setShowDatas(this.baseDatas.data);

        this.setSelected();        
      }
    })

    this.$scope.$watch('lastSelectCtrl.lastSelectedDatetime', (newValue, oldValue) => {
      if (this.type === 'datetime' && newValue !== oldValue) {
        // console.info('Change date!!');
        // console.log(newValue);
        const tempDate = moment(newValue);
        this.lastSelected = {
          day: tempDate.date(),
          month: tempDate.month() + 1,
          year: tempDate.year(),
        };
        // console.log(this.lastSelected);
        // this.lastSelected = this.formatDateTime(newValue);
      }
    });
  }

  checkIsShow() {
    // console.log('second Value');
    // console.log(this.secondDatas);
    // if (!this.secondDatas && !this.baseDatas.data) {
    if (!this.secondDatas) {
      return true;
    }
    if (this.secondDatas === 'know' || this.secondDatas === 'unknow' || !this.secondDatas) {
      return false;
    }

    if (this.secondDatas.value === 'unknow') {
      return false;
    }

    // console.log('cccccheck it show');
    // console.log(this.baseDatas.data);

    if (this.baseDatas.data.value_type === 'boolean') {
      return false;
    }
    return true;
  }

  checkIsDisable() {
    // console.log('second Value');
    // console.log(this.secondDatas);
    if (!this.secondDatas || this.isEmpty(this.secondDatas)) {
      return true;
    }
    return false;
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  }

  /*
    选择框类型
    datetime,
    int,
    tag,
    segment,
    other
  */

  formatDateTime(date) {
    let newdate = moment({
      year: date.year(),
      month: date.month(),
      day:date.date(),
    });
    // console.log(newdate);
  }


  setType() {
    if (this.baseDatas.data.event_name) {
      if (this.secondDatas.value && this.secondDatas.value.indexOf('absolute') !== -1) {
        this.type = 'datetime';
      } else {
        this.type = 'event';
      }
      // console.log('event');
      // console.log('this.baseDatas.data.value');

    } else {
      this.type = this.baseDatas.data.value_type;
      // console.log(this.baseDatas.data.value_type);
    }
    // console.log(`type: ${this.type}`);
  }


  setModel() {
    switch(this.type) {
      case 'tag':
      case 'segment':
      case 'datetime':
        this.model = this.type;
        break;
      case 'int':
        this.model = (this.baseDatas.tabType === 'leads') ? 'count' : 'int';
        this.times = (this.baseDatas.tabType === 'leads');
        break;
      case 'event': 
        this.model = 'count';
        if (this.secondDatas.value && this.secondDatas.value.indexOf('relative')) {
          this.times = false;
        }
        this.times = true;
        break;
      default:
        this.model = 'other';
    }
  }
}

export default LastSelectController;
