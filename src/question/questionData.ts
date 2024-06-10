import { DataType, ParamDataType } from "./types";
import computeCodeCount from "./computeCodeCount";
import changeCurrentIssue from "./changeCurrentIssue";
import { cursorHide, cursorShow } from "ismi-node-tools";

export const originalData: { data: ParamDataType, type: (0 | 1), progressCount: number, indexOfCursor: number } = {
    data: "",
    type: 0,
    progressCount: 0,
    indexOfCursor: 0
};


/** data  */
let data: DataType = {
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
    // type: 0,
    get type() {
        return originalData.type || 0;
    },
    set type(newValue: (0 | 1)) {
        originalData.type = newValue;
        /** 当前类型的改变，触发是否隐藏光标  */
        newValue == 1 ? cursorHide() : cursorShow();
    },


    /** Multiple question mode
     *
     * 多问模式
      */
    multi: false,
    /** User input
     *
     * 用户输入
     */
    userInput: [],
    /** The progress of the multi question mode will trigger changes to the current issue
     *
     * 多问模式的进度，改变会触发当前问题的变更
     */
    get progressCount() {
        return originalData.progressCount || 0;
    },
    set progressCount(newValue: number) {
        originalData.progressCount = newValue;
        Reflect.apply(changeCurrentIssue, this, [])
    },
    /**  Buoy movement
     *
     * 浮标移动
     */
    cursorTranslate: 0,
    /** When changing, a new count of this.cursorTranslate value will be triggered
     *
     * 当前的浮标位置，当改变时会触发 this.cursorTranslate 的自更新
    */
    get indexOfCursor() {
        return originalData.indexOfCursor || 0;
    },

    set indexOfCursor(newValue: number) {
        originalData.indexOfCursor = newValue, this.cursorTranslate = Reflect.apply(computeCodeCount, this, []);
    },

    /**  current issue
    *
    * 当前问题
    */
    currentIssue: {
        /**    question text
        *
         * 当前问题展示
         **/
        text: "Please change to your own question",
        /** User prompt: When it is pure text, display as text prompt; When it is an array, it defaults to selective questioning
        *
        *  用户提示：当为纯文本时，展示为文本提示；当为数组时，默认为选择式提问
        * */
        tip: "",
        /** Type, only supports text and password，default  is text
         *
         * 类型，仅支持文本（text）和密码（password），缺省为文本
        **/
        type: "text",
        /** Privacy mode, user answers will overwrite the previous question line
         *
         *
         * 隐私模式
          */
        private: false,
        /** Result display
         *
         * 结果展示
          */
        resultText: "",
    },
    /** The returned result set
     *
     * 结果集，用于多询问模式
     */
    results: [],

    assign(_data: any): void {
        Object.keys(_data).forEach((currentKey: any) => {
            if ((this as any)[currentKey] != undefined) (this as any)[currentKey] = _data[currentKey];
        })
    },
};

export default data;