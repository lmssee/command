import { t, Color, cursorMoveLeft } from 'ismi-node-tools';
import questionData from './questionData';

const { stdout } = process;

/** draw
 *
 *  绘制
 * */
export default () => {
  /** Terminal display column count
   *
   * 终端屏的显示列数
   */
  const screenWidth = stdout.columns;
  ///  向左移动的光标
  const transformLength = screenWidth ? `${t}${screenWidth}D` : `${t}123D`;
  const { type, currentIssue, userInput, cursorTranslate } = questionData;
  /** Display head
   *
   * 显示头
   */
  stdout.write(
    `${t}2K${transformLength}${Color.green('?')} ${currentIssue.text}: `,
  );
  // 打印选择模式
  if (type != 0) {
    stdout.write(
      (currentIssue.tip as string[])
        .map(i =>
          i == userInput[0]
            ? t.concat('25;1;4;5m').concat(Color.cyan(i))
            : Color.darkMagenta(i),
        )
        .join('  '),
    );
  } else if (userInput.length == 0 && currentIssue.tip) {
    const transformLength = (currentIssue.tip as string)
      .split('')
      .reduce(
        (currentLen, currentEle) =>
          currentLen + ((currentEle.codePointAt(0) as number) > 0xfff ? 2 : 1),
        0,
      );
    // 打印含提示且用户为输入时文本
    stdout.write(' '.concat(Color.darkGreen(currentIssue.tip as string)));
    cursorMoveLeft(transformLength);
  } else {
    if (currentIssue.type == 'text') {
      // 打印不还提示的普通文本
      stdout.write(` ${userInput.join('')}`);
    } else {
      // 打印密码模式
      stdout.write(` ${userInput.map(() => '*').join('')}`);
    }
    cursorTranslate !== 0 && cursorMoveLeft(cursorTranslate);
  }
};
