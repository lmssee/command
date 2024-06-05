import { ArgsType, StateType } from "./types";

const originalArg: string[] = process.argv.slice(2);

class AuxiliaryData {
  originalArg = originalArg.slice();
  /** Command Name
   *
   * 命令名称
   */
  name: string = "";
  /** File name
   *
   * 文件目录
   */
  __filename: string = "";
  /** current state
   *
   *   - 1 `start`  At the beginning, waiting for binding
   *   - 2 `bind over`  Execute binding, wait for execution
   *   - 3  `run over`  Parsing completed
   *   - 4 `over` Execution completed, it is not recommended to take any action after this command
   *
   *
   *  当前状态
   *  - 1 `start`  刚开始，等待绑定
   *  - 2 `bind over`  执行绑定，等待执行
   *  - 3  `run over`  解析完毕
   *   - 4 `over` 执行完毕，不建议在此命令后进行任何操作
   *
   */

  state: StateType = { code: 1, text: "start" };

  /** Startup options (processed user input)
   *
   * 启动的选项（处理后的用户输入）
   */
  args: ArgsType;
  /** abbreviate table
   *
   *  缩写表
   */
  abbr: any = {};
  /**  Help document
   *
   *  帮助文档
   */
  helpInfo: string | string[] = "";
  /**
   *
   * 原始参数
   */
  originalBind: any = {};
}

export default new AuxiliaryData();

/** $map 的类型声明
 *
 * Record<string, boolean | unknown>
 *
 * */
export type $MapType = {
  [key: string]: true | string | { [key: string]: true | string | string[] };
};

/** 导出定义的小对象 */
export class MyArg extends Array {
  /**
   * 返回的对象格式，这种方式的返回数据更适合拿来做配置文件
   */
  get $map(): $MapType {
    if (!this.valueOf()) return {};
    // 简单复制当前值
    const tempValue: any[] = JSON.parse(JSON.stringify(this.valueOf()));
    // 结果对象
    const resultValue: $MapType = new Object() as any;
    tempValue.forEach((currentElement: any) => {
      // 临时演员
      let _temp: any = resultValue[currentElement.name] || {};
      /** 判断是否已经存在同名属性 */
      let valueIsExist = Object.keys(_temp).length > 0;
      // 判断当前是否有 value 属性，并判断是否有同名属性，有则追加，没有则直接
      currentElement.value.length > 0 && (_temp.value = valueIsExist ? _temp.value.concat(currentElement.value) : currentElement.value);
      // 当前元素有子项
      if (currentElement.options) {
        // 每一个子项再遍历（遍历需考虑旧数据问题，即已经存在同名属性 valueIsExist 为 true 情况）
        currentElement.options.forEach((_currentEle: any) =>
          _temp[_currentEle.name] = (valueIsExist && _temp[_currentEle.name] !== undefined) ? _temp[_currentEle.name].concat(_currentEle.value) : _currentEle.value);
      }
      resultValue[currentElement.name] = _temp;
    });

    return resultValue;
  }

  /** 返回一个数组对象，有序的，与本体值类似，每一个元素都可以做会返回值。
   * 
   * 
   * 主要关注的是有序
   */
  get $arrMap(): [] | {}[] {
    if (!this.valueOf()) return [];
    // 简单复制当前值
    const tempValue: any[] = JSON.parse(JSON.stringify(this.valueOf()));

    return tempValue.map((currentElement: any) => {
      // 临时演员
      let resultValue: any = {};
      // 临时演员
      const _temp: any = resultValue[currentElement.name] = {};
      // 判断当前是否有 value 属性
      currentElement.value.length > 0 && (_temp.value = currentElement.value);
      // 当前元素有子项
      if (currentElement.options) currentElement.options.forEach((_currentEle: any) => _temp[_currentEle.name] = _currentEle.value);
      return resultValue;
    });
  }

  /** 仅上层命令导出 */
  get $only(): string[] {
    if (!this.valueOf()) return [];
    const value = (this.valueOf() as []).map(
      (currentEle: { name: string }) => currentEle.name
    );
    Object.defineProperty(this, "$only", {
      value: [...new Set(value)],
      writable: false,
      configurable: false,
    });

    return this.$only;
  }

  /** 用户输入元素参数（未处理参数） */
  get $original(): string[] {
    return originalArg.slice();
  }

  /** 是否命令参数是否为空 */
  get $isVoid(): boolean {
    return originalArg.length == 0;
  }
}

function getMapValue() {

}
