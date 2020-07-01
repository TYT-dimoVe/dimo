import _ from 'lodash';

export class Header {
  data;

  constructor(key = {}) {
    this.data = {
      appVersion: '1.0',
      ..._.pickBy(key, _.identity),
    };
  }

  getSnapshot() {
    return this.data;
  }

  setHeader(key) {
    this.data = {...this.data, ..._.pickBy(key, _.identity)};
  }
}
