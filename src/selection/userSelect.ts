import { Color, cursorShow, readInput, t } from "is-node-tools";
import draw from "./draw";
import selectionData from "./selectionData";
/**
 *
 * 用户选择
 */

export default async function () {
  const { resultText, info, data } = selectionData,
    len = data.length;
  await readInput((keyValue: string | undefined, key: any) => {
    const { select } = selectionData;
    switch (key.name) {
      case "return":
        cursorShow();
        process.stdout.write(`${t}1A${t}J`);
        !selectionData.private &&
          process.stdout.write(
            `👌 ${resultText || info}: ${Color.random(data[select])}\n`
          );
        return true;
      case "up":
        selectionData.select = select == 0 ? len - 1 : select - 1;
        draw(keyValue);
        break;
      case "down":
        selectionData.select = select == len - 1 ? 0 : select + 1;
        draw(keyValue);
        break;
      default:
        draw(keyValue);
        break;
    }
    return false;
  });
}
