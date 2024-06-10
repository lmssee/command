import { DataType, ParamDataType } from "./types";

const info = "请使用键盘选择，请使用 Enter 键选择您的选择",
  resultText = "您的选择为",
  showPreview = false,
  privateValue = false,
  preview = "当前选择为 ";
const data: DataType = {
  drawData: [],
  info,
  select: 0,
  showPreview,
  resultText,
  preview,
  private: privateValue,
  data: [],
  assign(params: ParamDataType) {
    Object.keys(params).forEach((currentKey: any) => {
      if ((this as any)[currentKey] != undefined) (this as any)[currentKey] = (params as any)[currentKey];
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
  }
};

export default data;
