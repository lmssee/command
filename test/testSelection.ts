import test from 'node:test';
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

export default () => 1;
