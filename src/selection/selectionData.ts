import { SelectionParamDataMapType, SelectionParamDataType } from './types';

/*** 默认语言  */
export const info = '请使用键盘选择，请使用 Enter 键选择您的选择',
  resultText = '您的选择为',
  showPreview = false,
  privateValue = false,
  preview = '当前选择为 ';
const data: DataType = {
  drawData: [],
  info,
  select: 0,
  showPreview,
  resultText,
  preview,
  private: privateValue,
  data: [],
  assign(params: SelectionParamDataType) {
    Object.keys(params).forEach(currentKey => {
      // @ts-expect-error 这里使用了 this ，但是又无法处理
      if (this[currentKey] != undefined) this[currentKey] = params[currentKey];
    });
  },
  reset() {
    this.drawData.length = this.data.length = 0;
    this.info = info;
    this.select = 0;
    this.showPreview = showPreview;
    this.resultText = resultText;
    this.preview = preview;
    this.private = privateValue;
  },
};

/**  data type
 *
 * 数据类型
 **/
type DataType = SelectionParamDataMapType & {
  /** Current selection
   *
   * 当前选择项
   */
  select: number;
  /**
   *
   * 最终绘制的数据
   */
  drawData: (string | undefined)[];
  /** 将给订参数放进这里 */
  assign: (_data: SelectionParamDataType) => void;
  reset: () => void;
};

export default data;
