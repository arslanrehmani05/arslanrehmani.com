import { test } from 'node:test';
import assert from 'node:assert/strict';
import { INDUSTRY_CONTEXTS, IndustryType } from './industry-context';

const EXPECTED_KEYS: IndustryType[] = ['ecommerce', 'manufacturing', 'services', 'logistics', 'retail', 'other'];

test('has exactly expected industry keys', () => {
  assert.deepEqual(Object.keys(INDUSTRY_CONTEXTS).sort(), EXPECTED_KEYS.sort());
});

test('every entry has non-empty label, typicalDrag, and commentary', () => {
  for (const key of EXPECTED_KEYS) {
    const entry = INDUSTRY_CONTEXTS[key];
    assert.ok(entry.label.length > 0, `${key} missing label`);
    assert.ok(entry.typicalDrag.length > 10, `${key} typicalDrag too short`);
    assert.ok(entry.commentary.length > 10, `${key} commentary too short`);
  }
});
