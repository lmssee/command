import { cursorHide, t } from "ismi-node-tools";
import draw from "./draw";
import selectionData from "./selectionData";
import { ParamDataType } from "./types";
import userSelect from "./userSelect";
const { stdout } = process;

/** unexpected exit
 *
 * 意外退出回调函数
 */
const unexpectedExit = () =>
  stdout.write(`${t}J${t}?25h ❌ ${selectionData.info}\n\n`);

export default async function (
  data: ParamDataType,
  resultType: "number" | "string" = "string"
) {
  selectionData.reset();
  (Array.isArray(data) && (selectionData.data = [...data])) || selectionData.assign(data);
  // const len = selectionData.data.length; // Get the number of options  // 获取选项长

  process.on("exit", unexpectedExit), cursorHide(), draw();
  // 等待用户选择
  await userSelect();
  // 移除监听
  process.removeListener("exit", unexpectedExit);
  const resultString = selectionData.data[selectionData.select], resultNumber = selectionData.select;
  // 重置数据
  selectionData.reset();
  // 返回结果
  return resultType == "string"
    ? resultString
    : resultNumber;
}
