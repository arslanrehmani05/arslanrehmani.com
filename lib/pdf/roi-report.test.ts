import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoiReportPdf } from './roi-report';
import { calculateRoi } from '../calculators/roi';
import { INDUSTRY_CONTEXTS } from '../calculators/industry-context';

test('generates a valid, non-trivial PDF byte stream', async () => {
  const inputs = { teamMembers: 3, hoursPerWeek: 10, costBracket: '60_80k' as const };
  const results = calculateRoi(inputs);
  const bytes = await generateRoiReportPdf({ inputs, results, industry: INDUSTRY_CONTEXTS.ecommerce });

  assert.ok(bytes instanceof Uint8Array);
  assert.ok(bytes.length > 500, `expected a real PDF, got ${bytes.length} bytes`);
  const header = Buffer.from(bytes.slice(0, 5)).toString('utf-8');
  assert.equal(header, '%PDF-');
});
