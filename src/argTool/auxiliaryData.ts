import { $arrMap, $map, ArgsType, StateType } from './types';

const originalArg: string[] = process.argv.slice(2);

/** 定义数据中心 */
export const auxiliaryData: { [key: symbol]: AuxiliaryData } = {};

/** 定义类 */
export class AuxiliaryData {
  originalArg = originalArg.slice();
  /** Command Name
   *
   * 命令名称
   */
  name: string = '';
  /** File name
   *
   * 文件目录
   */
  __filename: string = '';
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

  state: StateType = { code: 1, text: 'start' };

  /** Startup options (processed user input)
   *
   * 启动的选项（处理后的用户输入）
   */
  args: ArgsType = new TempArgs();
  /** abbreviate table
   *
   *  缩写表
   */
  abbr: any = {};
  /**  Help document
   *
   *  帮助文档
   */
  helpInfo: string | string[] = '';
  /**
   *
   * 原始参数
   */
  originalBind: any = {};
}

/** 仅作初始化用，其实这里直接返回不得了 */
class TempArgs extends Array {
  get $map(): $map {
    return {};
  }
  get $arrMap(): $arrMap {
    return [];
  }
  get $only(): string[] | [] {
    return [];
  }
  get $original(): string[] | [] {
    return [];
  }

  get $isVoid(): boolean {
    return false;
  }
}
/** 因为要保持数据的独立性，所以应当是一个函数 */
export const createAuxiliaryData = () =>
  new Proxy(new AuxiliaryData(), {
    get(target: any, p, receive) {
      if (p == 'args') {
        const args = JSON.parse(
          JSON.stringify(target[Symbol.for('_args')] || []),
        );
        return new Proxy(args, {
          get(_target, _p, _receiver) {
            if (_p == '$map') return get$map(args);
            if (_p == '$arrMap') return get$arrMap(args);
            if (_p == '$only')
              return args.map(
                (currentEle: { name: string }) => currentEle.name,
              );
            if (_p == '$original') return originalArg.slice();
            if (_p == '$isVoid') return originalArg.slice().length == 0;
            return 'hello world';
          },
          set(_target, _p, _newValue, _receive) {
            Reflect.set(_target, _p, _newValue, _receive);
            return true;
          },
        });
      }
      return Reflect.get(target, p, receive);
    },
    set(target: any, p, newValue, receiver) {
      if (p == 'args') {
        target[Symbol.for('_args')] = newValue;
      } else Reflect.set(target, p, newValue, receiver);
      return true;
    },
  });

/** $map 的类型声明
 *
 * Record<string, boolean | unknown>
 *
 * */
export type $MapType = {
  [key: string]: true | string | { [key: string]: true | string | string[] };
};

/** 返回 args 的 map 版本 */
function get$map(value: any[]): $MapType {
  if (value.length == 0) return {};
  // 结果对象
  const resultValue: $MapType = new Object() as any;
  value.forEach((currentElement: any) => {
    // 临时演员
    let _temp: any = resultValue[currentElement.name] || {};
    /** 判断是否已经存在同名属性 */
    let valueIsExist = Object.keys(_temp).length > 0;
    // 判断当前是否有 value 属性，并判断是否有同名属性，有则追加，没有则直接
    currentElement.value.length > 0 &&
      (_temp.value = valueIsExist
        ? _temp.value.concat(currentElement.value)
        : currentElement.value);
    // 当前元素有子项
    if (currentElement.options) {
      // 每一个子项再遍历（遍历需考虑旧数据问题，即已经存在同名属性 valueIsExist 为 true 情况）
      currentElement.options.forEach(
        (_currentEle: any) =>
          (_temp[_currentEle.name] =
            valueIsExist && _temp[_currentEle.name] !== undefined
              ? _temp[_currentEle.name].concat(_currentEle.value)
              : _currentEle.value),
      );
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
function get$arrMap(value: any[]): [] | {}[] {
  if (value.length == 0) return [];
  return value.map((currentElement: any) => {
    // 临时演员
    let resultValue: any = {};
    // 临时演员
    const _temp: any = (resultValue[currentElement.name] = {});
    // 判断当前是否有 value 属性
    currentElement.value &&
      currentElement.value.length > 0 &&
      (_temp.value = currentElement.value);
    // 当前元素有子项
    if (currentElement.options && currentElement.options.length > 0)
      currentElement.options.forEach(
        (_currentEle: any) => (_temp[_currentEle.name] = _currentEle.value),
      );
    return resultValue;
  });
}
