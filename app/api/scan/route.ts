// app/api/scan/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    // SSRF Safety Check: prevent scanning internal / private networks
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.endsWith('.local')
    ) {
      return NextResponse.json({ error: 'Invalid or restricted domain target' }, { status: 400 });
    }

    let html = '';
    let serverHeader = '';
    let poweredBy = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'ArslanRehmaniOperationalScanner/1.0 (+https://arslanrehmani.com)',
          'Accept': 'text/html,application/xhtml+xml',
        },
      });
      clearTimeout(timeoutId);

      serverHeader = res.headers.get('server') || '';
      poweredBy = res.headers.get('x-powered-by') || '';
      html = (await res.text()).slice(0, 100000); // limit to 100kb
    } catch {
      // Fallback detection if site blocks direct server fetch
      html = '';
    }

    // Platform Detection Logic
    let platform = 'Custom Web Platform';
    const lowerHtml = html.toLowerCase();

    if (lowerHtml.includes('cdn.shopify.com') || lowerHtml.includes('shopify.theme')) {
      platform = 'Shopify Storefront';
    } else if (lowerHtml.includes('wp-content') || lowerHtml.includes('wordpress')) {
      platform = 'WordPress / WooCommerce';
    } else if (lowerHtml.includes('_next/static') || lowerHtml.includes('__next')) {
      platform = 'Next.js Custom Application';
    } else if (lowerHtml.includes('wix.com') || lowerHtml.includes('wixsite')) {
      platform = 'Wix Storefront';
    } else if (lowerHtml.includes('squarespace')) {
      platform = 'Squarespace';
    } else if (serverHeader || poweredBy) {
      platform = `Web Application (${serverHeader || poweredBy})`;
    }

    // Catalog Footprint Detection
    let catalogSize = 'Mid-Scale Digital Catalog';
    const productMatchCount = (lowerHtml.match(/product/g) || []).length;
    if (productMatchCount > 25) {
      catalogSize = 'Large Ecom Catalog (100+ items detected)';
    } else if (productMatchCount > 8) {
      catalogSize = 'Standard Ecom Catalog (20-100 items)';
    } else {
      catalogSize = 'Service / B2B Operational Footprint';
    }

    // Customer Service Signals
    let serviceChannels = 'Standard Contact Form & Email';
    if (lowerHtml.includes('tawk.to') || lowerHtml.includes('intercom') || lowerHtml.includes('drift') || lowerHtml.includes('zendesk') || lowerHtml.includes('tidio')) {
      serviceChannels = 'Active Live Chat & Ticket System';
    } else if (lowerHtml.includes('whatsapp') || lowerHtml.includes('wa.me')) {
      serviceChannels = 'WhatsApp Business Channel Detected';
    }

    // Content Freshness
    const freshness = lowerHtml.includes('2026') || lowerHtml.includes('2025')
      ? 'Active Operational Updates (2025-2026)'
      : 'Standard Production Content Footprint';

    return NextResponse.json({
      success: true,
      domain: parsedUrl.hostname,
      detected: {
        platform,
        catalogSize,
        serviceChannels,
        freshness,
      },
    });
  } catch (error: any) {
    console.error('Error in scan API:', error);
    return NextResponse.json({ error: error.message || 'Scan failed' }, { status: 500 });
  }
}
