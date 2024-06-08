/**
 * Display current version
 *
 * 展示当前版本
 */

import {
  Color,
  fileExist,
  getCallerFilename,
  path,
  readFileToJsonSync,
} from "ismi-node-tools";
import { arch, hostname } from "node:os";
import { AuxiliaryData } from "./auxiliaryData";


export default function showVersion(auxiliaryData: AuxiliaryData): any {
  auxiliaryData.state = { code: 4, text: "over", overCode: "version" };
  // 目标文件位置
  let targetFilename = path.join(
    getCallerFilename(auxiliaryData.__filename),
    ".."
  );

  /** 查找到对应的 package.json 文件 */
  while (fileExist(targetFilename)) {
    // console.log(fileExist(targetFilename));

    if (fileExist(path.join(targetFilename, "package.json"))) {
      targetFilename = path.join(targetFilename, "package.json");
      break;
    }
    const nestFilename = path.join(targetFilename, "..");
    // console.log(nestFilename);
    // 未找到
    if (targetFilename == nestFilename) break;
    targetFilename = nestFilename;
  }
  const json = readFileToJsonSync(targetFilename);
  if (!json.name && !json.version)
    return console.log("抱歉，未找到版本定义说明");
  const { platform } = process;
  console.log(
    `您好，${Color.random(hostname())}：应用 (${Color.darkYellow(
      json.name
    )}) 的当前版本为 ${Color.red(json.version)} for ${platform == 'win32' ? 'Windows' : platform == 'darwin' ? 'mac' : platform} ${Color.darkMagenta(arch())}`
  );
}
