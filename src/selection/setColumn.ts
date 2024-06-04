import selectionData from "./selectionData";

const { stdout } = process;

/** Option truncation 
    * 
    * 选项截断 
    * */
export default function setColumns() {
    const len = selectionData.data.length, { data, drawData } = selectionData;
    let screenLength = Math.floor(stdout.columns / 2) - 10;
    for (let i = 0; i < len; i++) {
        const element = data[i];
        let pushData;
        if (typeof element == 'string') {
            pushData = element.length > screenLength ? element.slice(0, screenLength) : data[i];
        } else if (typeof element == 'number') {
            pushData = element % 1000000000000000
        }
        drawData.push(pushData);
    }
}