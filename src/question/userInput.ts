import { Color, cursorShow, readInput, t } from 'ismi-node-tools';
import draw from './draw';
import questionData from './questionData';

const { stdout } = process;

/** Waiting for user keyboard input and processing data
 *
 * 监听用户键盘输入并处理
 */
export default async function () {
  await readInput(
    (keyValue: string | undefined, key: any) => {
      const { type, currentIssue, userInput, results, multi } = questionData;
      let arr: any[] = [],
        len: number = 0,
        _index: number = 0;
      if (type != 0)
        // 选择模式
        (arr = currentIssue.tip as any[]),
          (len = arr.length - 1),
          (_index = arr.indexOf(userInput[0]));
      switch (key.name) {
        case 'return':
          /** The user did not input the enter key and clicked it directly
           *
           *  用户没有输入直接点击的回车键
           */
          if (userInput.length == 0) {
            stdout.write(
              ' '
                .repeat(2)
                .concat(Color.red(currentIssue.text))
                .concat(' '.repeat(3))
                .concat(`${t}5m👆${t}m${t}1A`),
            );
            break;
          }
          const q = currentIssue.text,
            r = userInput.join('');
          results.push({ q, r });
          /**
           *
           * 打印结果
           */
          stdout.write(`${t}1A${t}2K${t}J`);
          // 私密模式则不打印
          currentIssue.private
            ? ''
            : stdout.write(
                `👌 ${currentIssue.resultText || q}: ${Color.random(currentIssue.type == 'text' ? r : r.replace(/./gm, '*'))}\n`,
              );
          cursorShow();
          if (!multi || !++questionData.progressCount) return true;
          break;
        /**  Left keyboard button
         *
         *   键盘左键
         */
        case 'left':
          if (type == 0) {
            questionData.indexOfCursor =
              questionData.indexOfCursor == 0
                ? userInput.length
                : questionData.indexOfCursor - 1;
          } else {
            userInput[0] = arr[_index == 0 ? len : _index - 1];
          }
          break;
        /**  Right keyboard button
         *
         *  键盘右键
         */
        case 'right':
          if (type == 0) {
            questionData.indexOfCursor =
              questionData.indexOfCursor == questionData.userInput.length
                ? 0
                : questionData.indexOfCursor + 1;
          } else {
            userInput[0] = arr[_index == len ? 0 : _index + 1];
          }
          break;
        /**   Delete key or fallback key
         *
         *  删除键或回退键
         */
        case 'delete':
        case 'backspace':
          questionData.indexOfCursor != 0 &&
            (userInput.splice(questionData.indexOfCursor - 1, 1),
            questionData.indexOfCursor--);
        /**  Tab key
         *
         *  Tab 键
         */
        case 'tab':
          break;
        default:
          if (keyValue != undefined && type == 0) {
            questionData.indexOfCursor == userInput.length
              ? userInput.push(keyValue as never)
              : userInput.splice(
                  questionData.indexOfCursor,
                  0,
                  keyValue as never,
                );
            questionData.indexOfCursor += 1;
          }
          break;
      }
      /** Repaint
       *
       *  重绘
       */
      draw();
      return false;
    },
    { showCursor: true },
  );
}
