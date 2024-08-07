import { _p } from 'a-node-tools';
import { question, selection } from 'index';
import { test } from 'node:test';

///  测试 question
test.skip('test question data store', async t => {
  // 测试字符串
  await t.test('test string param  question', async () => {
    const result1 = await question('123');
    _p('result');
    _p(result1);
  });

  await t.test('test array params question', async () => {
    const result2 = await question(['1', '2', '3']);
    _p('result 2');
    _p(result2);
  });

  await t.test('test array params question', async () => {
    const result3 = await question(['1', '2', '3']);
    _p('result 3');
    _p(result3);
  });
});

test.skip('test question tip', async () => {
  await question({
    text: '你好',
    tip: '好的',
    private: true,
  });
});

/**
 *  测试  question 、selection
 *
 */

test.skip('question selection', () => {
  question(['abc', 'def']);
  selection(['gil', 'lmn']);
  selection(['opq', 'rst']);
});

export default () => 1;
