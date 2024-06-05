import Args from "./argTool/args";
import question from "./question/question";
import selection from "./selection/selection";

/** 
 * This is a collection that inherits {@link Args} and integrates {@link question} and {@link selection}
 * 
 * The initialization parameter is used to specify whether to overwrite when there are duplicate instructions
 *  
 *
 *  这是一个集合体，继承于 {@link Args}，又集成了 {@link question} 与 {@link selection}
 * 
  */
class Command extends Args {
    constructor(name: string = "") {
        super(name);

        Object.defineProperties(this, {
            selection: {
                value: selection,
                writable: false,
                enumerable: false,
                configurable: false
            },
            question: {
                value: question,
                writable: false,
                enumerable: false,
                configurable: false
            }
        })
    }

    /**  This method is detached from  `selection` and can directly `import {selection} form "ismi-command";`
     * 
     *  For detailed usage, please refer to : {@link selection}
     * 
     * ```ts
     * type DataType = {
     *   data: any[], //  Selected data to be rendered
     *   resultText:string,  //  Result display
     *   info?: string,  //  Questioning information
     *   showPreview?: boolean,  //  Is the answer preview displayed
     *   preview?: string //  Preview on selection
     *   };
     * 
     *  type ParamType = (string | DataType)[] 
     *
     * ```
     * 
     * 
     * 该应用抽离于 `selection` , 可直接 `import  { selection } form  "ismi-command";`
     * 
     * 
     *  详细用法参见 ： {@link selection}
     * */
    selection = selection;

    /**  This method is detached from  `question` and can directly `import { question } form "ismi-command";`
     * 
     *  For detailed usage, please refer to : {@link question}
     * 
     * ```ts
     * ParamDataType = {
     *       text: string,
     *      // User prompt: When it is pure text, display as text prompt; When it is an array, it defaults to selective questioning
     *     tip?: string | number | never | Boolean | null | undefined | any[],
     *     // Type, only supports text and password，default  is text
     *     type?: "text" | "password"
     *               // Privacy mode, user answers will overwrite the previous question line
     *     private: false,
     *     // Result display
     *      resultText: "",
     * }
     * 
     * type ParamType = (ParamDataType | string)[] | ParamDataType | string
     * 
     * ```
     * 
     * 
     * 该应用抽离于 `question` , 可直接 `import  { question } form  "ismi-command";`
     * 
     * 
     *  详细用法参见 ： {@link question}
     * */

    question = question;
}

const a = new Command();

export default Command;