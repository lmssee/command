import commandData from "src/commandData";
import { ParamDataType } from "./types";
import origin_selection from "./originSelection";

/** Export a displayed list selection
 *
 *  ```ts
 *  type ParamDataType = DataType | any[] | DataType;
 *
 *  type DataType = {
 *    data: any[], //  Selected data to be rendered
 *    resultText:string,  //  Result display
 *    info?: string,  //  Questioning information
 *    showPreview?: boolean,  //  Is the answer preview displayed
 *     preview?: string //  Preview on selection
 *     private?: false | true; // Privacy mode, user answers will overwrite the previous question line
 * };
 *
 *  ```
 * @param data any passes in the data that needs to be selected by the user, which can be an array or an object
 * When the data is an array composed of one-dimensional pure strings, the default configuration is used by default
 * Example:
 *  ```js
 *      [
 *         "Hamburg",
 *         "steak",
 *         "pizza",
 *      ]
 * ```
 *  When the data is in {@link Object} format, more information can be customized:
 * Example:
 *  ```ts
 * {
 *   info: "Please choose what to have for lunch",     //Custom prompt text information
 *   resultText?: "The result you have chosen is ",    //   Result display
 *   showPreview: true,        //Do you want to prompt for selected results
 *   preview: "Currently selected as"       // Preview on selection
 *   private: true, // not show result
 *   data: []             //An array composed of strings
 *  }
 *
 * ```
 *
 *  导出一个显示的列表选择.
 *  @param  data  any 传入需要供用户选择的数据，可以是数组或对象.
 * 当 data 为一维纯字符串组成的数组时，则默认使用默认的配置.
 *      例:
 *        ```ts
 *          [
 *                 "烧饼",
 *                 "板面",
 *                 "油泼面",
 *           ]
 *          ```
 *
 *  当 data 为 {@link Object} 格式时，可以自定义更多信息：
 *      例：
 *
 *  ```ts
 *     {
 *              info       : "请选择中午吃什么",   // 自定义提示文本信息
 *              resultText : "你想吃的是"         // 结果展示
 *              showPreview:true ,              //  是否提示已选结果
 *              preview    : "当前选择为",       //  选择时预览
 *              private    : true ,             // 不展示结果
 *              data       :[]                  //  字符串组成的数组
 *          }
 *
 *  ```
 */
export default function selection(data: ParamDataType, resultType?: "number" | "string"): Promise<string> {
  return new Promise((resolve: any, reject: any) => {
    commandData.on(
      Symbol('selection'),
      () => origin_selection(data, resultType)
        .then((result) => resolve((commandData.remove(), result)))
        .catch(() => reject((commandData.remove(), resultType == 'string' && "" || -1))));
  });
};;