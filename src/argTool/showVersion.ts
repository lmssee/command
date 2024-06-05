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
import auxiliaryData from "./auxiliaryData";


export default function showVersion(): any {
  auxiliaryData.state = { code: 4, text: "over", overCode: "version" };
  // 目标文件位置
  let targetFilename = path.join(
    getCallerFilename(auxiliaryData.__filename),
    ".."
  );

  while (fileExist(targetFilename)) {
    // console.log(fileExist(targetFilename));

    if (fileExist(path.join(targetFilename, "package.json"))) {
      targetFilename = path.join(targetFilename, "package.json");
      break;
    }
    const nestFilename = path.join(targetFilename, "..");
    // console.log(nestFilename);
    if (targetFilename == nestFilename) break;
    targetFilename = nestFilename;
  }
  const json = readFileToJsonSync(targetFilename);
  if (!json.name && !json.version)
    return console.log("抱歉，未找到版本定义说明");
  console.log(
    `您好，${Color.random(hostname())}：当前应用 (${Color.darkYellow(
      json.name
    )}) 的版本为 ${Color.red(json.version)}`
  );
}
