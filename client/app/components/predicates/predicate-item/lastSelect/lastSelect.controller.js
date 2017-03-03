import moment from '../../../../../../node_modules/.2.17.1@moment/moment';

class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;

  }

  $onInit() {

    if (this.baseDatas && this.secondDatas ) {
      this.isShow = this.checkIsShow();
      if (this.isShow && this.lastSelected) {
        this.setType();
        // this.setModel();
        this.initSelected();
      }

      this.startItemWatch();
    } else {
      this.type = 'str';
      this.lastSelectedDatetime = '';
      this.isShow = true;
      this.isDisabled = true;
      this.setSelected();
    }
    // this.initSelected();
    this.setModel();
    this.watchDatas();
    console.info('最后一个 init 完');
  }

  initSelected() {
    // if (!this.lastSelected) {
      // console.log(`lastSelected: ${this.lastSelected}`);
      // this.type = this.baseDatas.value_type;
      if (this.type === 'datetime' && this.secondDatas &&
       (this.secondDatas.indexOf('relative') === -1)) {
        this.lastSelectedDatetime = moment(this.lastSelected).format('YYYY-MM-DD');
        // console.warn(this.lastSelectedDatetime);
      }
  }

  setSelected() {
    // this.type = this.baseDatas.value_type;
    if (this.type === 'tag') {
      this.lastSelected = this.lastDatas.tag[0].tag_name;
    } else if (this.type === 'segment') {
      this.lastSelected = this.lastDatas.segment[0].segment_uuid;
    } else if (this.model === 'datetime') {
    // } else if (this.type === 'datetime' && this.secondDatas && (this.secondDatas.indexOf('relative') === -1)) {
      this.lastSelectedDatetime = moment().format('YYYY-MM-DD');
      console.log(this.lastSelectedDatetime);
    } else {
      this.lastSelected = '';
    }
  }

  watchDatas() {
    this.$scope.$watch('lastSelectCtrl.baseDatas', (newValue, oldValue) => {
      this.isShow = this.checkIsShow();
      if (newValue === oldValue) {
        return;
      }
      // if (!newValue) {
      //   this.type = '';
      // }
      // console.log(newValue);
      if (newValue) {
        // this.type = newValue.value_type;
        this.setType();
      }

      // this.initSelected();
      this.setModel();
      this.setSelected();
      console.log(`MODEL: ${this.model}`);

      // console.log(this.type);
    });

    this.$scope.$watch('lastSelectCtrl.secondDatas', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      this.isShow = this.checkIsShow();
      this.isDisabled = this.checkIsDisable();
      // this.initSelected();
      this.setModel();
      this.setSelected();
      console.log(`MODEL: ${this.model}`);

      // console.log(this.secondDatas);
    });

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
    // if (!this.secondDatas && !this.baseDatas) {
    if (!this.secondDatas) {
      return true;
    }
    if (this.secondDatas === 'know' || this.secondDatas === 'unknow' || !this.secondDatas) {
      return false;
    }

    if (this.secondDatas.value === 'unknow') {
      return false;
    }

    console.log('cccccheck it show');
    console.log(this.baseDatas);

    if (this.baseDatas.value_type === 'boolean') {
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

  setType() {
    if (!this.baseDatas || !(this.baseDatas.value_type || this.baseDatas.event_name)) {
      return;
    }
    if (this.baseDatas.event_name) {
      this.type = 'event';
      // this.type = 'str';
    } else {
      this.type = this.baseDatas.value_type;
    }
  }

  /*
    选择框类型
    datetime,
    relative,
    tag,
    segment,
    other
  */
  setModel() {
    console.log(`type: ${this.type}`);
    console.log('secondDatas!!!');
    console.log(this.secondDatas);
    if (this.type === 'tag' || this.type === 'segment') {
      this.model = this.type;
      return;
    }
    if (this.type === 'datetime') {
      if (this.secondDatas.indexOf('relative') === -1) {
        this.model = 'datetime';
        return;
      } else {
        this.model = 'relative';
        return;
      }
    }

    if (this.type === 'event') {
      this.model = 'other';

      if (this.secondDatas.value) {

        if (this.secondDatas.value_type === 'event') {
          this.model = 'other';
        } else {
          if (this.secondDatas.value.indexOf('absolute') !== -1) {
            this.model = 'datetime';
          } else {
            this.model = 'relative';
          }
        }
      }

      return;
    }

    this.model = 'other';

  }


  formatDateTime(date) {
    let newdate = moment({
      year: date.year(),
      month: date.month(),
      day:date.date(),
    });
    // console.log(newdate);
  }

}

export default LastSelectController;
