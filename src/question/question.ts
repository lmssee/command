import { ParamDataType } from "./types";
import questionData, { originalData } from "./questionData";
import draw from "./draw";
import userInput from "./userInput";
import { t } from "ismi-node-tools";


const { stdin, stdout } = process;
/** unexpected exit
 *
 * 意外退出回调函数 
  */
const unexpectedExit = () => stdout.write(`${t}${stdout.columns}D${t}J${t}?25h ❌ ${questionData.currentIssue.text} \n`);
/**  Use to ask users questions 
 *
 * ```js
        * 
 * ParamDataType = {
 *        text: string,
 *       // User prompt: When it is pure text, display as text prompt; When it is an array, it defaults to selective questioning
 *      tip?: string | number | never | Boolean | null | undefined | any[],
 *      // Type, only supports text and password，default  is text
 *      type?: "text" | "password"
            *      // Privacy mode, user answers will overwrite the previous question line
*       private: false,
*       // Result display
*        resultText: "",
*  }
* 
* ```
* 一个向提问的并收集用户答录
* ```js
        * 
* ParamDataType = {
*        text: string,
*        // 用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
*        tip?: string | number | never | Boolean | null | undefined | any[],
*        //  类型，仅支持文本（text）和密码（password），缺省为文本
*        type?: "text" | "password"
            *        //   隐私模式
*       private: false,
 *        //  结果展示
 *       resultText: "",
 *  }
 * 
 * ```
 *  @param data   Parameters can be stings, ParamDataType, or an array composed of them
 *  
 *                   参数，可以是 string、ParamDataType 或是他们组成的数组
 * 
 * @param [simpleResult=false]  Is it displayed as a simple mode return (default return is question and answer)
 * 
 *        [simpleResult=false]   是否显示为简单模式的返回（默认返回是答案与）    
 * 
 */
export default async function (data: ParamDataType, simpleResult = false) {
    // 保留原始问题
    originalData.data = data;

    process.on("exit", unexpectedExit);
    if (Array.isArray(data)) {
        questionData.multi = true;
        questionData.progressCount = -data.length;
    } else
        questionData.progressCount = 0;
    draw();
    /** 等待用户输入 */
    await userInput();
    /** Remove listening
     *  
     *  移除监听
      */
    process.removeListener('exit', unexpectedExit), stdout.write(`${t}2K`);
    if (questionData.multi) {
        if (simpleResult) {
            return questionData.results.map((currentValue: { r: string, q: string }) => currentValue.r);
        } else {
            return questionData.results;
        }
    } else {
        return questionData.userInput.join("")
    }
}
