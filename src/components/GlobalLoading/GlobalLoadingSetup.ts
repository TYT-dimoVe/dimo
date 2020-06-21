export default class LoadingHolder {
  static loading: any;

  static setLoading(loading: any) {
    this.loading = loading;
  }

  static getLoading() {
    return this.loading;
  }
}
