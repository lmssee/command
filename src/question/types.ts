
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

/**  data type
 *  
 *  数据类型
  */
type DataType = {
  assign(arg: any): void;
  /** Current type
     * 
     * -  0  ordinary  Q&A
     * -  1  select Q&A
     * 
     * 当前类型
     *  
     * - 0 普通问答 
     * - 1 选型问答 
      */
  type: 1 | 0,
  /** Multiple question mode
   * 
   * 多问模式
    */
  multi: boolean,
  /** User input
   * 
   * 用户输入
   */
  userInput: string[],
  /** The progress of the multi question mode will trigger changes to `the.currentIssue`
   * 
   * 多问模式的进度，改变会触发当前问题（`this.currentIssue`）的变更
   */
  progressCount: number,
  /**  Buoy movement 
   * 
   * 浮标移动
   */
  cursorTranslate: number,
  /** When changing, a new count of `this.cursorTranslate` value will be triggered 
   * 
   * 当前的浮标位置，当改变时会触发 `this.cursorTranslate` 的自更新
  */
  indexOfCursor: number,
  /**  current issue
  * 
  * 当前问题
  */
  currentIssue: CurrentIssueType,
  /** The returned result set
  * 
  * 结果集，用于多询问模式
  */
  results: any[]
}

/** Parameter `data` type
 * 
 * 参数类型
 */
type ParamDataType = string | string[] | CurrentIssueType | CurrentIssueType[] | (CurrentIssueType | string)[];

export type { ParamDataType, DataType, CurrentIssueType }