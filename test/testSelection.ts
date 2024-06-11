import test from "node:test";
import selection from "src/selection/selection";

test.skip('test selection simple param', async (t) => {
    await selection(['123', '156']);
});
////
test('test selection object params', async (t) => {

    await selection({
        data: [1, 2, 3, 4, 56, 7, 8, 9, 10]
    })
})

export default () => 1;