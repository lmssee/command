
import { initializeFile } from "is-node-tools"
import { BindParamsType, StateType } from "./types";
import auxiliaryData, { MyArg } from "./auxiliaryData";
import bindInstruction from "./bindInstructions";
import executeParsing from "./executeParsing";
import { organizeHelpInformation } from "./organizeHelpInformation";
import showVersion from "./showVersion";

// 初始化文件路径
[auxiliaryData.__filename,] = initializeFile();

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
 *        import { Args }  from "is-tl";
 *        const  command : Args =  new Args();
 *        command.bind("init <-i> (Initialize configuration file)").run();
 *      ``` 
 * - Simple configuration example 
 *      
 *      ```js 
 *        import { Args }  from "is-tl";
 *        const  command : Args =  new Args();
 *        command.bind({
 *                      name: "init",
 *                      abbr: "-i",
 *                      info: "Initialize configuration file",
 *                     }).run();
 *      ``` 
 *  - Example of carrying sub item configuration
 *      ```js 
 *        import { Args }  from "is-tl";
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
 *        import { Args }  from "is-tl";
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
 *        import { Args }  from "is-tl";
 *        const  command : Args =  new Args();
 *        command.bind("init <-i> (初始化一个配置文件)").run();
 *      ``` 
 * - 不带子项的配置 
 *      
 *      ```js 
 *        import { Args }  from "is-tl";
 *        const  command : Args =  new Args();
 *        command.bind({
 *                      name: "init",
 *                      abbr: "-i",
 *                      info: "初始化一个配置文件",
 *                     }).run();
 *      ``` 
 *  - 带子项配置（子项纯文本的）
 *      ```js 
 *        import { Args }  from "is-tl";
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
 *        import { Args }  from "is-tl";
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
  /**  
 * The initialization parameter is used to specify whether to overwrite when there are duplicate instructions
 *   
 *  and is not overwritten by default
 * 
 *  初始化的参数用于指定是否在有重复的指令时是否覆盖，默认不覆盖
 */
  constructor(name: string = "") {
    auxiliaryData.name = name || process.argv.slice(1, 2)[0].replace(/.*\/.*?$/, "$1");
  };

  /** 
   * 
   * 命令名称
    */
  get name(): string {
    return auxiliaryData.name;
  };

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

  get state(): StateType { return auxiliaryData.state }

  /**  over 
   * 
   *  是否已结束 
   * 
   *  调用会返回一个布尔值 ，布尔值上有一个属性 `end` 可以直接终止当前进程
    */
  get isEnd() {
    const _this = this;
    class My extends Boolean {
      constructor() {
        super(auxiliaryData.state.code == 4)
      }

      get end() {
        if (this.valueOf()) _this.end;
        return true;
      }
    }

    return new My();
  }

  /** 
   *  直接结束当前进程  
   */
  get end() {
    process.exit()
    return true
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
  bind(data: BindParamsType): any {
    bindInstruction(data);
    return this;
  }

  /**  Perform  analyzing  users  
   * 
   *  开始执行回调
  */
  run() {
    executeParsing();
    return this;
  }


  /** 
   * 
   * 获取有序的参数
   * 
    */
  get getArgs() {
    const a: MyArg = new MyArg();
    if (auxiliaryData.args)
      auxiliaryData.args.forEach((currentE: any) => a.push(currentE));
    return a;
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
    if (typeof optionName == 'string' && auxiliaryData.originalBind[optionName]) {
      if (typeof subOptionName == 'string' && auxiliaryData.originalBind[optionName].options && auxiliaryData.originalBind[optionName].options[subOptionName]) {
        auxiliaryData.helpInfo = [optionName, subOptionName];
      } else {
        auxiliaryData.helpInfo = optionName;
      }
    } else {
      auxiliaryData.helpInfo = "help";
    }
    organizeHelpInformation();
  }


  /**
   * 主动展示版本信息
   *  
   *
   * @memberof Args
   */
  version() {
    showVersion();
  }

}



export default Args;