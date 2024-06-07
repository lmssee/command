import auxiliaryData from "./auxiliaryData";
import { organizeHelpInformation } from "./organizeHelpInformation";
import paringUserArgs from "./paringUserArgs";

/**  Perform  analyzing  users
 *
 *  开始执行  run ，解析用户行为
 */
function executeParsing() {
  switch (auxiliaryData.state.code) {
    // case 1: console.log('尚未开始绑定'); break;
    case 3:
      console.log("已经执行过 `run`");
      return;
    case 4:
      console.log("已完成全部");
      return;
    default:
      auxiliaryData.state = { code: 3, text: "run over" };
  }
  paringUserArgs();
  beforeRun();
  /** Trigger User Help Document
   *
   * 触发帮助文档 */
  if (auxiliaryData.helpInfo != "") return organizeHelpInformation();
}

/** Execute frozen data
 *
 * 执行冷冻数据
 */
function beforeRun() {
  ["name", "originBind", "abbr"].forEach(
    (currentEle: string) =>
      (auxiliaryData as any)[currentEle] &&
      Object.freeze((auxiliaryData as any)[currentEle]) &&
      Object.defineProperty(auxiliaryData, currentEle, {
        value: (auxiliaryData as any)[currentEle],
        writable: false,
        enumerable: true,
        configurable: false,
      })
  );
}

export default executeParsing;
