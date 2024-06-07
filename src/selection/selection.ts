import commandData from "src/commandData";
import { ParamDataType } from "./types";
import origin_selection from "./originSelection";

export default function selection(data: ParamDataType, resultType?: "number" | "string"): Promise<string> {
  return new Promise((resolve: any, reject: any) => {
    commandData.on(
      Symbol('selection'),
      () => origin_selection(data, resultType)
        .then((result) => resolve((commandData.remove(), result)))
        .catch(() => reject((commandData.remove(), resultType == 'string' && "" || -1))));
  });
};;