import commandData from "src/commandData";
import { ParamDataType } from "./types";
import origin_question from "./originQuestion";

export default function question(params: ParamDataType, simpleResult: boolean = false): Promise<string> {
  return new Promise((resolve: any, reject: any) => {
    commandData.on(
      Symbol('question'),
      () => origin_question(params, simpleResult)
        .then((result) =>
          resolve((commandData.remove(), result)))
        .catch(() =>
          reject((commandData.remove(), Array.isArray(params) && [] || "")))
    );
  });
};