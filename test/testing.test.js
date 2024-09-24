import assert from 'node:assert/strict'
import { describe, it } from 'node:test';


describe('Test', () => {
    it('should pass without errors', async () => {
        assert.strictEqual(4 + 4, 8);
    });
})