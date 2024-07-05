import { Command, question, selection } from 'index';
import assert from 'node:assert';
import test from 'node:test';
import testQuestion from './testQuestion';
import testSelection from './testSelection';

// 测试 question 相关
testQuestion();
// 测试 selection 相关
testSelection();

/** 简单测试数据是否覆盖的问题 */
test.skip('test command data store', () => {
  const command_1 = new Command('test command 1').run();
  const command_2 = new Command('test command 2').run();
  console.log(command_1.name, command_2.name);
});

/**
 *
 *
 *  测试参数   i 123 ts 2365 js 6 545 221 i 45 ts 465 js 369
 */
test.skip('command args', () => {
  const command = new Command('test command');
  command.bind({
    'init <i> (初始化测试参数)': [
      'ts <-t>  (ts .....)',
      'js <-j>  (js .........)',
    ],
    'remove <r> (移除文件)': ['ignore <-i> (静默模式，不打印信息)', ''],
  });

  command.run().isEnd;
  console.log('====================================');
  console.log(command.args);
  console.log(command.args.$map);
  console.log(command.args.$arrMap.forEach(ele => console.log(ele)));
  console.log('====================================');
  /**
   * 当使用带 -h 或者  -v 的参数测试的时候内部解析会标记为已结束状态, 但是是否结束看具体需求
   *
   * isEnd 是一个扩展后的 Boolean  数据,上面携带 end 属性, 用于结束状态
   *
   *  即在 isEnd 值为 true 时, 访问 end 属性会结束当前程序
   *
   */
  assert.equal(command.isEnd, command.state.code == 4);

  console.log('no end');
});

/**
 *  测试  question 、selection
 *
 */

test.skip('question selection', () => {
  question(['123', '456']);
  selection(['789', '963']);
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
