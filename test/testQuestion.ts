import { question } from "index";
import { test } from "node:test";

///  测试 question 
test.skip('test question data store', async (t) => {
    // 测试字符串
    await t.test('test string param  question', async (t) => {
        await question("123");
    });

    await t.test('test array params question', async (t) => {
        question(['1', '2', '3']);
    });
});

test.skip('test question tip', async (t) => {
    await question({
        text: "你好",
        tip: "好的",
        private: true
    });
})


export default () => 1;