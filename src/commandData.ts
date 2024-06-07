/** 一个简单的管理数据中心 */
export default {
  callList: [],
  /** 注册事件 */
  on(uniKey: symbol, callFn: () => void) {
    const list: any = this.callList;
    list.length == 0 && Reflect.apply(callFn, undefined, []);
    list.push([uniKey, callFn]);
  },
  /** 移除上一个事件
   * 
   * 返回值仅代表当前是否结束
   */
  remove() {
    const list: any = this.callList;
    list.shift();
    return !(list[0] && (Reflect.apply(list[0][1], undefined, []), true) || false);
  }
}