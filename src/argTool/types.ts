/** Command line option parameter
 *
 *
 * 命令行选项参数
 *
 * ```ts
 *  {
 *    name?: string ;
 *    info?: string ;
 *    abbr?: string ;
 *    hide?: boolean;
 *  }
 * ```
 *
 * 参数类型为用户输入，不强制用户输入包含所有的参数\
 * 这一点与下面的  `BindParamsType` 及  `BindParamsOptionsType` 不同
 *
 */

export type SubOptionsType = {
  /** Command line option parameter name，suggest within 15 English characters
   *
   * 命令行选项参数名称，建议在 15 个英文字符内
   */
  name: string;
  /**  Function Description
   *
   * 功能描述
   */
  info: string;
  /** abbreviation .The name limit is already 15, is this limit of 10 okay ?
   *
   * 缩写，名字都限制 15 了，这个限制 10 没问题吧
   */
  abbr?: string;
  /**  Is it displayed in the help
   *
   * 是否展示在帮助中
   */
  hide?: boolean;
};

/**
 *
 * 参数类型
 */
export type ParamType = {
  /** Command line option name
   *
   * 命令行选项名称
   */
  name: string;
  /**  Function Description
   *
   * 功能描述
   */
  info: string;
  /**  options
   *
   *  选项
   */
  options?: BindParamsOptionsType;
  /** abbreviation
   *
   * 缩写
   */
  abbr?: string;
  /**  Is it displayed in the help
   *
   * 是否展示在帮助中
   */
  hide?: boolean;
};

/** 原始绑定的类型声明
 * ```ts
 *  type  SubOptionsType = {
 *        name: string;
 *        abbr: string;
 *        info: string;
 *        hide: boolean;
 *   }
 *
 * ```
 */
export type ArgOriginBind = {
  [key: string]: {
    name: string;
    info: string;
    abbr: string;
    options: { [key: string]: SubOptionsType };
  };
};
/** Description of Binding Command Line Parameter Types
 *
 * 绑定命令行参数类型说明
 */
export type BindParamsType =
  | string
  | {
      [key in string]?: BindParamsOptionsType;
    }
  | (string | ParamType)[]
  | ParamType;

/** 绑定的子项类型声明  */
export type BindParamsOptionsType =
  | string
  | SubOptionsType
  | (string | SubOptionsType)[];

/** stateType
 *
 * 当前的状态
 */
export type StateType = {
  code: 1 | 2 | 3 | 4;
  text: 'start' | 'bind over' | 'run over' | 'over';
  overCode?: 'version' | 'help';
};

/**
 * 当前的  arg \
 * 处理后的原始参数的值
 */
export type ArgsItem = {
  name: string;
  value: string[];
  options: { name: string; value: string[] }[];
};

/** $map 的类型声明
 *
 * Record<string, boolean | unknown>
 *
 * */
export type ArgsMapType = {
  [key: string]: ArgsMapItemType;
};

/** $map 值的子项  */
export type ArgsMapItemType = {
  [key: string]: (string | boolean | number)[];
  value: (string | number | boolean)[];
};

/** 导出数组对象的类型  */
export type ArgsArrMapType = ArgsMapType[];

/** 导出 arg 返回的 args 的类型
 *
 * 是一个继承于 {@link Array} 的对象，有属性
 *
 * - $map      返回的是对象模式，用于配置文件比较好
 * - $arrMap   以 $map 对象作为元素的数组, 适合有顺序的参数调用用
 * - $only     仅包含头部的字符串数组
 * - $original 原始的参数
 * - $isVoid   是否为空
 *
 */
export interface ArgsType extends Array<ArgsItem> {
  /** 返回 map 模式的数据，用来做配置文件比较爽
   *
   * ```ts
   *   type $map = {} | {
   *     name: {
   *         [key: string]: string[] | [];
   *         value: string[] | [];
   *     };
   * }
   * ````
   */
  $map: ArgsMapType;
  /**
   *
   * ```ts
   * type $arrMap = ({} | {
   *    name: {
   *       [key: string]: string[] | [];
   *    };
   *  })[]
   * ```
   *
   */
  $arrMap: ArgsArrMapType;
  /** 仅有头部的字符串数组
   *
   */
  $only: string[];
  /** 原始参数 */
  $original: string[];
  /** 是否为空 */
  $isVoid: boolean;
}

/** 子项的类型 */
export type ManageDataTypeItem = {
  name: string;
  value: (string | boolean)[] | [];
};

/** 子项列的类型 */
export type ManageDataTypeObject = {
  name: string;
  value: (string | boolean)[] | [];
  options: ManageDataTypeItem[] | [];
};

/** 解析用户参数数据 */
export type ManageDataType = {
  result: ManageDataTypeObject[];
  name: string;
  object: ManageDataTypeObject;
  item: ManageDataTypeItem;
  /** 重置父项 */
  resetObject: (name: string) => void;
  /** 重置子项 */
  resetItem: (name: string) => void;
};
