//This is where test specs for jest will go.

const addTwo = (numOne, numTwo) => {
    return numOne + numTwo;
};

describe('Capstone Tests', () => {
    describe('Random Test', () => {
        it('Adds Two Numbers', () => {
            expect(addTwo(1, 2)).toBe(3);
        });
    });
});
