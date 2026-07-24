import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDUSTRY_CONTEXT } from './industry-context';

const EXPECTED_KEYS = ['ecommerce', 'manufacturing', 'professional_services', 'logistics', 'retail', 'other'];

test('has exactly the 6 expected industry keys', () => {
  assert.deepEqual(Object.keys(INDUSTRY_CONTEXT).sort(), EXPECTED_KEYS.sort());
});

test('every entry has a non-empty label, paragraph, and reduction range', () => {
  for (const key of EXPECTED_KEYS) {
    const entry = INDUSTRY_CONTEXT[key as keyof typeof INDUSTRY_CONTEXT];
    assert.ok(entry.label.length > 0, `${key} missing label`);
    assert.ok(entry.paragraph.length > 40, `${key} paragraph too short`);
    assert.match(entry.automationReductionRange, /^\d+-\d+%$/, `${key} range malformed`);
  }
});
