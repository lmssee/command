/** Command line option parameter 
 * 
 * 
 * 命令行选项参数
  */

export interface SubOptionsType {
  /** Command line option parameter name，suggest within 15 English characters
   * 
   * 命令行选项参数名称，建议在 15 个英文字符内
   */
  name: string
  /**  Function Description
  * 
  * 功能描述
   */
  info: string
  /** abbreviation .The name limit is already 15, is this limit of 10 okay ? 
    * 
    * 缩写，名字都限制 15 了，这个限制 10 没问题吧
     */
  abbr?: string
  /**  Is it displayed in the help
   * 
   * 是否展示在帮助中
    */
  hide?: boolean
};

/** 
 * 
 * 参数类型
  */
export type ParamType = {
  /** Command line option name
  * 
  * 命令行选项名称
   */
  name: string
  /**  Function Description
   * 
   * 功能描述
    */
  info: string
  /**  options
   * 
   *  选项
    */
  options?: SubOptionsType | (SubOptionsType | string)[] | string
  /** abbreviation
   * 
   * 缩写
    */
  abbr?: string
  /**  Is it displayed in the help
   * 
   * 是否展示在帮助中
    */
  hide?: boolean
}

/** Description of Binding Command Line Parameter Types
 * 
 * 绑定命令行参数类型说明
  */
export type BindParamsType = string | { [key in string]?: string | SubOptionsType | (string | SubOptionsType)[] | undefined } | (string | ParamType)[] | ParamType;


/** current issue
 *  ```js
 *  {
 *    //  question text 
 *    // 当前问题展示
 *    text: string,
 *    // User prompt: When it is pure text, display as text prompt;    
 *    //  When it is an array, it defaults to selective questioning
 *    // 用户提示：当为纯文本时，展示为文本提示； 
 *    //  当为数组时，默认为选择式提问
 *     tip?: string | number | never | Boolean | null | undefined | any[],
 *     //  Type, only supports `text` and `password`，default  is `text`
 *     // 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
 *     type?: "text" | "password",
 *     //  Privacy mode, user answers will overwrite the previous question line
 *     //  私密模式
 *     private?: false | true,
 *     // Result display text
 *     //   结果展示文本
 *     resultText?: string
 * }
 * ```
 * */
type CurrentIssueType = {
  /**    question text 
  * 
  *   当前问题展示
  **/
  text: string,
  /** User prompt: When it is pure text, display as text prompt;   
   *  
   *  When it is an array, it defaults to selective questioning
  *
  *  用户提示：当为纯文本时，展示为文本提示；
  * 
  *  当为数组时，默认为选择式提问
  * */
  tip?: string | number | never | Boolean | null | undefined | any[],
  /** Type, only supports `text` and `password`，default  is `text`
   * 
   * 类型，仅支持文本（`text`）和密码（`password`），缺省为文本
  **/
  type?: "text" | "password",
  /** Privacy mode, user answers will overwrite the previous question line
   * 
   * 私密模式
    */
  private?: false | true,
  /** Result display text
   * 
   *  结果展示文本
    */
  resultText?: string
};


/** stateType 
 * 
 * 当前的状态
  */
export type StateType = { code: 1 | 2 | 3 | 4, text: 'start' | 'bind over' | 'run over' | 'over', overCode?: "version" | "help" };

/** args type  */
export type ArgsType = undefined | { name: string, value?: string[], options?: { name: string, value?: string[] }[] }[] | [];
