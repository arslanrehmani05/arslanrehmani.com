import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateRoi } from './roi';

test('calculates savings for a typical mid-size case', () => {
  const result = calculateRoi({ teamMembers: 3, hoursPerWeek: 10, costBracket: '60_80k' });
  assert.equal(result.hourlyRate, 33.65);
  assert.equal(result.currentAnnualCost, 52500);
  assert.equal(result.automatedAnnualCost, 10275);
  assert.equal(result.annualSavings, 42225);
  assert.equal(result.paybackPeriodMonths, 4.3);
});

test('returns zero savings and zero payback when automation would cost more than doing nothing', () => {
  const result = calculateRoi({ teamMembers: 1, hoursPerWeek: 1, costBracket: 'under_40k' });
  assert.equal(result.annualSavings, 0);
  assert.equal(result.paybackPeriodMonths, 0);
});

test('throws RangeError on teamMembers < 1', () => {
  assert.throws(() => calculateRoi({ teamMembers: 0, hoursPerWeek: 5, costBracket: '40_60k' }), RangeError);
});

test('throws RangeError on negative hoursPerWeek', () => {
  assert.throws(() => calculateRoi({ teamMembers: 2, hoursPerWeek: -1, costBracket: '40_60k' }), RangeError);
});

test('throws RangeError on unknown costBracket', () => {
  // @ts-expect-error - intentionally invalid for the test
  assert.throws(() => calculateRoi({ teamMembers: 2, hoursPerWeek: 5, costBracket: 'bogus' }), RangeError);
});
