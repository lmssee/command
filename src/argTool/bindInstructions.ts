import { typeOf } from "ismi-js-tools";
import { BindParamsType, ParamType, SubOptionsType } from "./types";
import { auxiliaryData as auData, AuxiliaryData } from "./auxiliaryData";

/**  Binding options, descriptions, and abbreviation
   * 
   * 绑定选项、说明及缩写
   * 
   * @param data {@link BindParamsType}   Binding Command Line Parameter
   *      
   *        data {@link BindParamsType}  绑定命令行参数
   */

export default function bindInstruction(data: BindParamsType, auxiliaryData: AuxiliaryData): any {
    switch (auxiliaryData.state.code) {
        case 3: console.log('已经执行过 `run`'); return;
        case 4: console.log('已完成全部'); return;
        default:
            auxiliaryData.state = { code: 2, text: 'bind over' };
    }
    let _d: ParamType = {
        name: "",
        info: "",
        abbr: "",
        options: []
    }
    /**  If a string is used to specify
     * 
     * 倘若使用字符串指定  */
    if (typeof data == 'string') {
        const [name, abbr, info] = parsingDataOfString(data);
        return bindInstruction({ name, abbr, info }, auxiliaryData);
    } else if (Array.isArray(data)) {
        /** If the input parameter is an array
         *
         *   倘若为传入参数为数组
        */
        return data.forEach((currentEle: BindParamsType) => bindInstruction(currentEle, auxiliaryData));
    } else if (!data.name && !data.info) {
        /** 
         * 传入被认定为怪异模式
          */
        const keys = Object.keys(data), _d_keys = Object.keys(_d);
        return keys.forEach((currentEle: string) => {
            if (!_d_keys.includes(currentEle)) {
                let name, info, abbr;
                [name, abbr, info] = parsingDataOfString(currentEle);
                return bindInstruction({
                    name, info, abbr,
                    options: (data as { [key in string]?: any })[currentEle]
                }, auxiliaryData);
            }
        });
    }
    _d = data as ParamType;
    /** Configure abbreviations for easy retrieval
     * 
     * 配置缩写，方便检索
    */
    Boolean(_d.abbr) && (auxiliaryData.abbr[_d.abbr as string] = _d.name);

    if (_d.options && typeOf(_d.options) !== 'array') _d.options = [_d.options] as any;
    /** If there are sub items
     * 
     *  倘若有子项
    */
    if (Array.isArray(_d.options)) {
        _d.options = parsingSubOption(_d.options, _d.name, auxiliaryData) as any
    }
    auxiliaryData.originalBind[_d.name] = { ..._d };
}


/** Parse sub items
 * 
 * 解析子项
  */
function parsingSubOption(data: any[], name: string, auxiliaryData: AuxiliaryData): any {
    const temporaryObject: any = {};
    data.forEach((currentEle: SubOptionsType) => {
        let _d = {
            name: "",
            abbr: "",
            info: ""
        }
        if (typeof currentEle == 'string')
            [_d.name, _d.abbr, _d.info] = parsingDataOfString(currentEle);
        else _d = Object.assign(_d, currentEle);
        _d.abbr && (auxiliaryData.abbr[`${name}^${_d.abbr}`] = _d.name);
        temporaryObject[_d.name] = _d;
    });
    return temporaryObject;
}

/** Parse when binding data to string type
 * 
 * 解析当绑定数据为字符串类型
  */
function parsingDataOfString(data: string) {
    const name = data.replace(/^(.*?)\s.*/mg, "$1");
    const abbr = /\<.+\>/.test(data) && data.replace(/.*\<(.+)\>.*/, "$1") || "";
    const description = data.replace(/.*?\((.*)\).*?/, "$1") || "";
    return [name, abbr, description];
}