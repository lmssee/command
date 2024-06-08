import { AuxiliaryData } from "./auxiliaryData";
import showVersion from "./showVersion";
import { ManageDataType } from "./types";

/** Parsing user parameters
 *
 *
 * 解析用户参数 
 * 
 * 
 * 将用的输入参数解析为一个数组，数组包含匹配（可能有重复的）的每一项
 * 
 * 
 * ```ts
 *   result :  {
 *        name:string, 
 *        value?: boolean|string[] ,
 *        options?: {
 *            name: string,
 *            value: boolean|string[]
 *        }[]  
 *     } []
 * 
 * ```
 */
export default function paringUserArgs(auxiliaryData: AuxiliaryData): any {
  // 用户没有传参数
  if (process.argv.length == 2) return;
  /** Get user input parameters
   *
   * 获取用户输入参数
   */
  const _args = auxiliaryData.originalArg,
    _argString = `^${_args.join("^")}^`;
  /**  Check if there is a requirement help document included
   *
   * 检测是否含有需求帮助文档
   */
  const _temporaryHelpIndex = _args.findIndex((currentArg: string) =>
    /^-{1,2}h(elp)?$/.test(currentArg)
  );
  /**
   *
   *  命令中含有 -v 展示当前版本
   */
  if (/\^-{1,2}v(ersion)?\^/i.test(_argString)) return showVersion(auxiliaryData);
  if (_temporaryHelpIndex == 0) return (auxiliaryData.helpInfo = "help");
  let result: {
    name: string;
    value?: string[];
    options?: { name: string; value?: string[] }[];
  }[] = [];
  // 命令含有  -h
  if (_temporaryHelpIndex > 0) {
    result = manageResult(_args.slice(0, _temporaryHelpIndex + 1), auxiliaryData);
    auxiliaryData.args = result as any;
    return (auxiliaryData.helpInfo =
      result.length == 0
        ? "help"
        : result[0].options == undefined || result[0].options?.length == 0
          ? result[0].name
          : [result[0].name, result[0].options[0].name]);
  }
  // 正常的解析
  result = manageResult(_args, auxiliaryData);
  auxiliaryData.args = result as any;
}

/** 整理数据用到的数据 */
const manageData: ManageDataType = {
  result: [],
  name: "",
  object: { name: "", value: [], options: [] },
  item: { name: "", value: [] },
  resetObject(name) {
    this.name = name;
    this.object = { name, value: [], options: [] };
  },
  resetItem(name: string) {
    this.item = { name, value: [] };
  },
};

/** 参数整理函数 */
function manageResult(data: string[], auxiliaryData: AuxiliaryData): any {
  // 解析每一个参数
  data.forEach((currentArg: string) => {
    const { name } = manageData;
    currentArg = currentArg.trim();

    if (!currentArg) return;
    // 当前为值
    if (!Boolean(/^([a-z]|[A-Z]|-|$|_)/.test(currentArg)))
      return dataIsValue(currentArg);
    // 参看该值是否能匹配上一级
    let temp1;
    /** 查看是否为全拼 */
    if (auxiliaryData.originalBind[currentArg]) {
      temp1 = currentArg;
      /** 参看是否为缩写 */
    } else if (auxiliaryData.abbr[currentArg]) {
      temp1 = auxiliaryData.abbr[currentArg];
    }
    /** 当尚未有匹配项时，检测是否有  */
    if (name !== "" && auxiliaryData.originalBind[name].options) {
      let temp2;
      /** 查看是否为 options 全拼  */
      if (auxiliaryData.originalBind[name].options[currentArg]) {
        temp2 = currentArg;
        /** 参看是否为 options 的缩写 */
      } else if (auxiliaryData.abbr[`${name}^${currentArg}`]) {
        temp2 = auxiliaryData.abbr[`${name}^${currentArg}`];
      }
      // 当有已匹配，先以检测子项为准
      if (Boolean(temp2)) {
        return dataIsOption(temp2);
      }
    }
    // 子项未匹配，再次检测是否为匹配项
    if (Boolean(temp1)) return dataIsCode(temp1);
    // 当未匹配，则认定为有效值
    return dataIsValue(currentArg);
  });

  /**  作为值处理数据 */
  addResultItem();
  return manageData.result;
}

// 当值为选择选项
function dataIsCode(name: string) {
  // 倘若上一个项存在
  if (manageData.name !== "") {
    addResultItem();
    manageData.resetItem("");
  }
  // 设置新的项值
  manageData.resetObject(name);
}

// 当前值为子项
function dataIsOption(name: string) {
  const { item, object } = manageData;
  // 上一个子项值存在
  if (item.name) {
    if (item.value?.length == 0) delete item.value;
    (object.options as any).push(item);
  }
  manageData.resetItem(name);
}

// 当值被认定为参数的值
function dataIsValue(value: string | boolean | number) {
  value = value == "true" ? true : value == "false" ? false : value == Number(value) ? Number(value) : value;
  if (manageData.name === "") return;
  if (manageData.item.name) {
    // @ts-ignore  当下一定有值，判断当下是否有子项
    manageData.item.value.push(value);
  } else {
    // @ts-ignore 当下一定有值，添加到项
    manageData.object.value?.push(value);
  }
}

// 将匹配追加到数据
function addResultItem() {
  /** 拿到数据 */
  const { name, object, item, result } = manageData;
  /** 数据为空 */
  if (name === "") return;
  // 没有 value 值
  if (object.value?.length == 0) delete object.value;
  // @ts-expect-error  若有子项将子项推进父项
  item.name && object.options?.push(item);
  // // 整理子项列
  // if (object.options?.length == 0) {
  //   delete object.options;
  // } else if (item.value?.length == 0) {
  //   // 整理当前子项
  //   delete item.value;
  // }
  // 将数据推进结果
  result.push(JSON.parse(JSON.stringify(object)));
}
