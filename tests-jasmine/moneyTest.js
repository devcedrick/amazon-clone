import { formatCurrency } from "../js/utils/money.js";

describe('Test Suite: Format Currency', () => {
    it('Convert cents into dollars', () => {
        expect(formatCurrency(2025)).toEqual('20.25');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds to the nearest cents', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    })
});