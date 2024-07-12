import { initializeFile } from 'a-node-tools';
import { ArgsType, BindParamsType, StateType } from './types';
import { auxiliaryData, createAuxiliaryData } from './auxiliaryData';
import bindInstruction from './bindInstructions';
import executeParsing from './executeParsing';
import { organizeHelpInformation } from './organizeHelpInformation';
import showVersion from './showVersion';

/**  Analyzing user input parameters
 *   **_will only start working after calling `run`, and all `bind` must be completed before `run`_**
 *  - `commandName argName`
 *  - `commandName argName   value`
 *  - `commandName argName    optionName`
 *  - `commandName argName    optionName  value`
 * Example：
 *    If your command name is `gig` , You added parameters：
 *    _When you have multiple configuration items, you can use an array to group the configuration items that comply with the rules_
 *  - Simplified example
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args('ixxx);
 *        command.bind("init <-i> (Initialize configuration file)").run();
 *      ```
 * - Simple configuration example
 *
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args('ixxx);
 *        command.bind({
 *                      name: "init",
 *                      abbr: "-i",
 *                      info: "Initialize configuration file",
 *                     }).run();
 *      ```
 *  - Example of carrying sub item configuration
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "Initialize configuration file",
 *              options: [
 *                      "ts <-t> (Initialize a `ts` configuration file)",
 *                      "js <-j> (Initialize a `js` configuration file)",
 *                      "json <-o> (Initialize a `json` configuration file)",
 *                       ]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 *  - Example of carrying detailed configuration of sub items
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "Initialize configuration file",
 *              options: [{
 *                          name:"ts",
 *                          abbr: "-t",
 *                          info: "Initialize a `ts` configuration file"
 *                        },{
 *                          name:"js",
 *                          abbr: "-j",
 *                          info: "Initialize a `js` configuration file"
 *
 *                        },{
 *                          name:"json",
 *                          abbr: "-o",
 *                          info: "Initialize a `json` configuration file"
 *                        }]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 *
 *  解析用户的输入参数
 *  可接受用用操作
 *  - `commandName argName`
 *  - `commandName argName value`
 *  - `commandName argName optionName`
 *  - `commandName argName optionName value`
 *    **_调用 `run` 后才会开始工作，并且，请在执行 `run` 之前完成所有操作的绑定_**
 * 示例：
 *    倘若你的执行前缀为 `gig` , 可用：
 *    _当你有多个配置项时，可把符合规则的配置项放入数组_
 *    **使用字符串参数时，注意 `<>` 和 `()` 均为英文符号**
 *  - 最简单的例子
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command.bind("init <-i> (初始化一个配置文件)").run();
 *      ```
 * - 不带子项的配置
 *
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command.bind({
 *                      name: "init",
 *                      abbr: "-i",
 *                      info: "初始化一个配置文件",
 *                     }).run();
 *      ```
 *  - 带子项配置（子项纯文本的）
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "初始化一个配置文件",
 *              options: [
 *                      "ts <-t> (初始化一个 `ts` 后缀配置文件)",
 *                      "js <-j> (初始化一个 `js` 后缀配置文件)",
 *                      "json <-o> (初始化一个 `json` 后缀配置文件)",
 *                       ]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 *  - 全配置的
 *      ```js
 *        import { Args }  from "ismi-command";
 *        const  command : Args =  new Args();
 *        command
 *            .bind({
 *              name: "init",
 *              abbr: "-i",
 *              info: "初始化一个配置文件",
 *              options: [{
 *                          name:"ts",
 *                          abbr: "-t",
 *                          info: "初始化一个 `ts` 后缀配置文件"
 *                        },{
 *                          name:"js",
 *                          abbr: "-j",
 *                          info: "初始化一个 `js` 后缀配置文件"
 *
 *                        },{
 *                          name:"json",
 *                          abbr: "-o",
 *                          info: "初始化一个 `json` 后缀配置文件"
 *                        }]
 *             });
 *        command.run(); // Users can use `gig init -o`
 *      ```
 *
 */
class Args {
  // 为一只
  uniKey: symbol;
  /**
   * The initialization parameter is used to specify whether to overwrite when there are duplicate instructions
   *
   *  and is not overwritten by default
   *
   *  初始化的参数用于指定是否在有重复的指令时是否覆盖，默认不覆盖
   */
  constructor(name: string = '') {
    if (typeof name !== 'string') name = `${name}`;
    this.uniKey = Symbol(name);
    if (auxiliaryData[this.uniKey])
      throw new Error(
        `${name} 已经存在，请更换初始化命令名称，若仍想在原命令上操作，请抽离为单独的文件做数据共享`,
      );

    // 初始化数据
    auxiliaryData[this.uniKey] = createAuxiliaryData();
    // 初始化文件路径
    [auxiliaryData[this.uniKey].__filename] = initializeFile();
    auxiliaryData[this.uniKey].name =
      name ||
      (typeof process.argv[1] == 'string' &&
        process.argv.slice(1, 2)[0].replace(/.*\/.*?$/, '$1')) ||
      '';
    /** 禁止修改唯一值 */
    Object.defineProperty(this, 'uniKey', {
      value: this.uniKey,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }

  /**
   *
   * 命令名称
   */
  get name(): string {
    return auxiliaryData[this.uniKey].name;
  }

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
   *  - 4 `over` 执行完毕，不建议在此命令后进行任何操作
   *
   */

  get state(): StateType {
    return auxiliaryData[this.uniKey].state;
  }

  /**  over
   *
   *  是否已结束
   *
   *  调用会返回一个布尔值 ，布尔值上有一个属性 `end` 可以直接终止当前进程
   */
  get isEnd() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    class My extends Boolean {
      constructor() {
        super(auxiliaryData[_this.uniKey].state.code == 4);
      }
      /** 倘若 isEnd 返回的是 true ，证明用户使用 -v 、-h 。默认回去展示它们
       *
       * 此时若无其他操作，建议 end 一下 */
      get end() {
        if (this.valueOf()) _this.end;
        return true;
      }
    }

    return new My();
  }

  /**
   *  直接结束当前进程
   *
   *  这是一个属性
   */
  get end(): true {
    process.exit();
    return true;
  }

  /**  Binding options, descriptions, and abbreviation
   * 
   * ```ts
   * 
   *  type ParamType = {  
   *     name: string
   *     info: string
   *     options?: SubOptionsType | (SubOptionsType | string)[] | string 
   *     hide?: boolean
   *    }
   * 
   * type BindParamsType = string | (string | ParamType)[] |  ParamType | {
    [x: string]: string | SubOptionsType | (string | SubOptionsType)[] | undefined;
} ;
   * 
   * 
   * ```
   * 绑定选项、说明及缩写
   * 
   * @param data {@link BindParamsType}   Binding Command Line Parameter
   *      
   *        data {@link BindParamsType}  绑定命令行参数
   * 
   * 
   * 
   */
  bind(data: BindParamsType) {
    bindInstruction(data, auxiliaryData[this.uniKey]);
    return this;
  }

  /**  Perform  analyzing  users
   *
   *  开始执行回调
   */
  run() {
    executeParsing(auxiliaryData[this.uniKey]);
    return this;
  }

  /**
   *
   * 获取有序的参数
   *
   * 是一个继承于 {@link Array} 的对象，有属性
   *
   * - $map      返回的是对象模式，用于配置文件比较好
   * - $arrMap   以 $map 对象作为元素的数组, 适合有顺序的参数调用用
   * - $only     仅包含头部的字符串数组
   * - $original 原始的参数
   * - $isVoid   是否为空
   *
   */
  get args(): ArgsType {
    return auxiliaryData[this.uniKey].args;
  }
  /**
   *
   * 用户可主动调用该方法在用户参数没有包含 -h 的时候展示帮助文档
   *
   * @param {string} [optionName]  调用的一级展示
   * @param {string} [subOptionName] 调用的二级（一级的子项）
   * @memberof Args
   */
  help(optionName?: string, subOptionName?: string) {
    const _auxiliaryData = auxiliaryData[this.uniKey];
    if (
      typeof optionName == 'string' &&
      _auxiliaryData.originalBind[optionName]
    ) {
      if (
        typeof subOptionName == 'string' &&
        _auxiliaryData.originalBind[optionName].options &&
        _auxiliaryData.originalBind[optionName].options[subOptionName]
      )
        _auxiliaryData.helpInfo = [optionName, subOptionName];
      else _auxiliaryData.helpInfo = optionName;
    } else _auxiliaryData.helpInfo = 'help';
    organizeHelpInformation(auxiliaryData[this.uniKey]);
  }

  /**
   * 主动展示版本信息
   *
   *
   * @memberof Args
   */
  version() {
    showVersion(auxiliaryData[this.uniKey]);
  }
}

export default Args;
