import moment from '../../../../../../node_modules/.2.17.1@moment/moment';

class LastSelectController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.type = 'str';
    this.isShow = this.checkIsShow();
  }

  $onInit() {
    // console.info('LastSelectController');
    // console.log(this.lastDatas);
    // this.type = this.baseDatas ? this.baseDatas.value_type : '';
    this.lastObjSelected = {};
    // this.lastSelected = (this.type === 'tag') ? this.lastDatas.tag[0].tag_name : '';
    // this.lastSelected = (this.type === 'tag' || this.type === 'segment') ? this.lastObjSelected : '';

    this.setType();
    this.initSelected();
    this.watchDatas();
  }

  initSelected() {
    if (this.type === 'tag') {
      this.lastSelected = this.lastDatas.tag[0].tag_name;
    } else if (this.type === 'segment') {
      this.lastSelected = this.lastDatas.segment[0].segment_uuid;
    } else if (this.type === 'datetime' && this.secondDatas && (this.secondDatas.indexOf('relative') === -1)) {
      this.lastSelected = moment().format('YYYY-MM-DD');
      console.log(this.lastSelected);
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

      if (!newValue) {
        this.type = '';
      }
      // console.log(newValue);
      this.type = newValue.value_type;

      this.initSelected();
      // console.log(this.type);
    });

    this.$scope.$watch('lastSelectCtrl.secondDatas', (newValue, oldValue) => {

      // console.log('%c change Second Datas', 'color: blue; font-size: 20px;');
      // console.log(`newValue: ${newValue}`);
      // console.log(`oldValue: ${oldValue}`);
      if (newValue === oldValue) {
        return;
      }

      this.isShow = this.checkIsShow();
      this.initSelected();

      console.log(`isShow: ${this.isShow}`);
      console.log(this.secondDatas);
    });

    this.$scope.$watch('lastSelectCtrl.lastObjSelected', (newValue, oldValue) => {
      console.log('%c, CHange lastObjSelected', 'font-size: 20px;');
      if (newValue === oldValue) {
        return;
      }

      this.lastSelected = this.lastObjSelected ;
      console.log('lastSelected');
      console.log(this.lastSelected);
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

}

export default LastSelectController;
