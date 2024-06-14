import { ParamDataType } from './types';
import questionData, { originalData } from './questionData';
import draw from './draw';
import userInput from './userInput';
import { t } from 'ismi-node-tools';

const { stdin, stdout } = process;
/** unexpected exit
 *
 * 意外退出回调函数
 */
const unexpectedExit = () =>
  stdout.write(
    `${t}${stdout.columns}D${t}J${t}?25h ❌ ${questionData.currentIssue.text} \n`,
  );

export default async function (data: ParamDataType, simpleResult = false) {
  // 保留原始问题 （初始化数据）
  originalData.data = data;
  // 退出的时候
  process.on('exit', unexpectedExit);

  if (Array.isArray(data)) {
    questionData.multi = true;
    questionData.progressCount = -data.length;
  } else questionData.progressCount = 0;
  draw();
  /** 等待用户输入 */
  await userInput();
  /** Remove listening
   *
   *  移除监听
   */
  process.removeListener('exit', unexpectedExit), stdout.write(`${t}2K`);
  if (questionData.multi) {
    if (simpleResult) {
      return questionData.results.map(
        (currentValue: { r: string; q: string }) => currentValue.r,
      );
    } else {
      return questionData.results;
    }
  } else {
    return questionData.userInput.join('');
  }
}
