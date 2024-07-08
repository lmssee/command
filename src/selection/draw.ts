import { t, Color, cursorMoveUp, _p } from 'ismi-node-tools';
import selectionData from './selectionData';
import setColumns from './setColumn';

/** draw
 *
 *  绘制  */
export default function () {
  const len = selectionData.data.length, // Get the number of options  // 获取选项长度
    { info, select, drawData, showPreview, preview } = selectionData;
  // 绘制数据截断
  setColumns();
  _p(
    `${t}1K${t}J${t}w${t}${(info as string).length + 6}D${Color.green('? ')}${info}\n\n`,
  );
  // 遍历需要绘制的每一行
  for (let i = 0; i < len; i++) {
    // 移动光标的位置到 8 位
    _p(`${t}7h`);
    if (i == select) {
      const color = ((i + 5) % 6) + 1;
      _p(
        `  ${t}6;5;3${color}m>${t}m   ${drawData[i]}${t}m     ${t}5;3${color}m<${t}m\n`,
      );
    } else {
      const color = ((i + 1) % 6) + 1;
      _p(`      ${t}3${color}m${drawData[i]}${t}m\n`);
    }
  }
  // 是否展示结果
  if (showPreview) {
    _p(`\n${preview} ${drawData[select]}`);
  }
  cursorMoveUp(len + 2 + Number(showPreview) * 2);
}
