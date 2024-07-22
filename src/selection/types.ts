/** 参数数据对象型类型  */
export type SelectionParamDataMapType = {
  /** Selected data to be rendered
   *
   * 要渲染的选择的数据数据
   **/
  data: (string | number)[];
  /** Questioning information
   *
   * 提问信息
   */
  info?: string | number;
  /** Is the answer preview displayed
   *
   * 是否展示选择预览
   */
  showPreview?: boolean;
  /** Answer preview
   *
   * 选择预览
   */
  preview?: string | number;
  /** Result display text （default to `info`）
   *
   *  结果展示文本（缺省则以 `info`  为准）
   */
  resultText?: string | number;
  /** Privacy mode, user answers will overwrite the previous question line
   *
   * 私密模式
   */
  private?: boolean;
};

/** *Parameter data type*
 *
 * *参数数据类型*
 **/
export type SelectionParamDataType =
  | (string | number)[]
  | SelectionParamDataMapType;
