import { DataType, ParamDataType } from "./types";

const data: DataType = {
  drawData: [],
  info: "请使用键盘选择，请使用 Enter 键选择您的选择",
  select: 0,
  showPreview: false,
  resultText: "您的选择为",
  preview: "当前选择为 ",
  private: false,
  data: [],
  assign(_data: ParamDataType) {
    Object.keys(_data).forEach((currentKey: string) => {
      // @ts-ignore
      if (this[currentKey] != undefined) this[currentKey] = arg[currentKey];
    });
  },
};

export default data;
