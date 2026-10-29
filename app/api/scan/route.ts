import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    const cleanUrl = (url || '').trim().toLowerCase();

    // Simulated technology detection based on URL heuristics
    let platform = 'Custom Web Architecture';
    let catalogSize = 'Mid-Scale Commercial Footprint';
    let serviceChannels = 'Email & Standard Contact Form';
    let freshness = 'Active Production Web Signals';

    if (cleanUrl.includes('shop') || cleanUrl.includes('store') || cleanUrl.includes('wear') || cleanUrl.includes('apparel')) {
      platform = 'Shopify Plus / Commerce Layer';
      catalogSize = '500+ SKU Catalog & Variants';
      serviceChannels = 'Multi-Channel Online Storefront';
      freshness = 'Daily Real-Time Inventory Updates';
    } else if (cleanUrl.includes('logistics') || cleanUrl.includes('freight') || cleanUrl.includes('cargo') || cleanUrl.includes('3pl')) {
      platform = 'Custom Transport & EDI Dispatch Stack';
      catalogSize = 'High-Volume Bill-of-Lading Fleet';
      serviceChannels = 'Carrier EDI, Email & WhatsApp Coordination';
      freshness = 'Continuous Shipment Tracking Updates';
    } else if (cleanUrl.includes('tex') || cleanUrl.includes('mill') || cleanUrl.includes('manu') || cleanUrl.includes('ind')) {
      platform = 'Industrial Plant Stack + Disconnected Excel Spreadsheets';
      catalogSize = 'Multi-Bay Machine Floor & Lot Batches';
      serviceChannels = 'Floor Clipboards, Paper Tickets & Internal Email';
      freshness = 'Batch End-of-Day Shift Summaries';
    }

    return NextResponse.json({
      detected: {
        platform,
        catalogSize,
        serviceChannels,
        freshness,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        detected: {
          platform: 'Standard Business Web Infrastructure',
          catalogSize: 'Core Commercial Footprint',
          serviceChannels: 'Email & Contact Inbound',
          freshness: 'Active Production Signals',
        },
      },
      { status: 200 }
    );
  }
}
