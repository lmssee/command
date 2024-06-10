import questionData from "./questionData";

/** Calculate the number of displacement characters 
 * 
 * 计算位移字符数
*/
export default function computeCodeCount() {
    // The map and filter of the array will traverse the array twice
    // 数组的 map 和  filter 会遍历两遍数组
    return questionData.userInput.reduce((currentValue: number, currentElement: string, currentIndex: number) => {
        // Calculate the number of columns occupied by a single character
        // 计算单字符占列数
        if (currentIndex >= questionData.indexOfCursor) currentValue += (currentElement as any).codePointAt(0) > 0x0ff ? 2 : 1;
        return currentValue;
    }, 0);
};