export default class GlobalModalSetup {
  static globalModalHolder: any;

  static setGlobalModalHolder(globalModalHolder: any) {
    this.globalModalHolder = globalModalHolder;
  }

  static getGlobalModalHolder() {
    return this.globalModalHolder;
  }
}
