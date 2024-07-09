import test from 'node:test';
import question from 'src/question/question';
import selection from 'src/selection/selection';

test.skip('test selection simple param', async () => {
  await selection(['123', '156']);
});
////  测
test.skip('test selection object params', async () => {
  await selection({
    data: [1, 2, 3, 4, 56, 7, 8, 9, 10],
  });
});

/**
 *  测试  question 、selection
 *
 */

test.skip('question selection', () => {
  question(['123', '456']);
  selection(['789', '963']);
});

export default () => 1;
