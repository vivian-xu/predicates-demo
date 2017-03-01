import moment from '../../../../../../node_modules/.2.17.1@moment/moment';

class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.type = 'str';
    this.isShow = this.checkIsShow();
  }

  $onInit() {
    // console.group('Last selected group!');

    this.lastSelectedDatetime = '';
    this.setType();
    // console.log('in Last Selected');
    // console.log('before');
    // console.log(this.lastSelected);
    // if (!this.lastSelected) {
    this.initSelected();
    // }
    // console.log('after');
    // console.log(this.lastSelected);
    this.watchDatas();
    // console.groupEnd();
  }

  initSelected() {
    if (!this.lastSelected) {
      console.log(`lastSelected: ${this.lastSelected}`);

      if (this.type === 'tag') {
        this.lastSelected = this.lastDatas.tag[0].tag_name;
      } else if (this.type === 'segment') {
        this.lastSelected = this.lastDatas.segment[0].segment_uuid;
      } else if (this.type === 'datetime' && this.secondDatas && (this.secondDatas.indexOf('relative') === -1)) {
        this.lastSelectedDatetime = moment().format('YYYY-MM-DD');
        console.log(this.lastSelectedDatetime);
      } else {
        this.lastSelected = '';
      }
    } else {
      if (this.type === 'datetime' && this.secondDatas && (this.secondDatas.indexOf('relative') === -1)) {
        this.lastSelectedDatetime = moment(this.lastSelected).format('YYYY-MM-DD');
        console.warn(this.lastSelectedDatetime);
      }
    }
  }

  watchDatas() {
    this.$scope.$watch('lastSelectCtrl.baseDatas', (newValue, oldValue) => {
      this.isShow = this.checkIsShow();
      if (newValue === oldValue) {
        return;
      }

      if (!newValue) {
        this.type = '';
      }
      // console.log(newValue);
      this.type = newValue.value_type;

      this.initSelected();
      // console.log(this.type);
    });

    this.$scope.$watch('lastSelectCtrl.secondDatas', (newValue, oldValue) => {
      if (newValue === oldValue) {
        return;
      }

      this.isShow = this.checkIsShow();
      this.initSelected();

      // console.log(`isShow: ${this.isShow}`);
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
    if (!this.secondDatas && !this.baseDatas) {
      return true;
    }
    if (this.secondDatas === 'know' || this.secondDatas === 'unknow' || !this.secondDatas) {
      return false;
    }

    if (this.secondDatas.value === 'unknow') {
      return false;
    }

    if (this.baseDatas.value_type === 'boolean') {
      return false;
    }
    return true;
  }

  setType() {
    if (!this.baseDatas || !this.baseDatas.value_type) {
      return;
    }

    this.type = this.baseDatas.value_type;
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
