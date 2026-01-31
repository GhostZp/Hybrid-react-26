// example unit test with vitest

import {add} from '../utils/example.ts';

test('add function should correctly add two numbers', () => {
    expect(add(2, 3)).toBe(5);
});
