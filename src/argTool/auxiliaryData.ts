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
    const temporary: $MapType = new Object() as any;
    (this.valueOf() as []).forEach((currentElement: any) => {
      // 临时演员
      let _temp: any =
        currentElement.value == undefined
          ? {}
          : { value: currentElement.value };

      // 当前元素有子项
      if (currentElement.options) {
        // 每一个子项再遍历
        currentElement.options.forEach((_currentEle: any) => {
          _temp[_currentEle.name] = _currentEle.value
            ? _currentEle.value.length == 1
              ? _currentEle.value[0]
              : _currentEle.value
            : true;
        });
      }
      temporary[currentElement.name] =
        _temp ||
        (currentElement.value &&
          (currentElement.value.length == 1
            ? currentElement.value[0]
            : currentElement.value)) ||
        true;
    });
    Object.defineProperty(this, "$map", {
      value: temporary,
      writable: false,
      enumerable: true,
      configurable: false,
    });
    return temporary;
  }

  /** 仅上层命令导出 */
  get $only(): string[] {
    if (!this.valueOf()) return [];
    const value = (this.valueOf() as []).map(
      (currentEle: { name: string }) => currentEle.name
    );
    Object.defineProperty(this, "$only", {
      value,
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
