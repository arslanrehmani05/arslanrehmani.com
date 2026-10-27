const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateAllIcons() {
  const masterSvgPath = path.resolve('public/favicon.svg');
  const svgBuffer = fs.readFileSync(masterSvgPath);

  console.log('Generating PNG favicons & app icons from:', masterSvgPath);

  // 1. Standard PNG favicons & app icons
  const iconTargets = [
    { file: 'public/favicon.png', size: 32 },
    { file: 'public/icon.png', size: 32 },
    { file: 'app/icon.png', size: 32 },
    { file: 'public/apple-icon.png', size: 180 },
    { file: 'public/apple-touch-icon.png', size: 180 },
    { file: 'app/apple-icon.png', size: 180 },
    { file: 'public/icons/icon-192.png', size: 192 },
    { file: 'public/icons/icon-512.png', size: 512 },
    { file: 'public/icons/studio-192.png', size: 192 },
    { file: 'public/icons/studio-512.png', size: 512 },
  ];

  for (const target of iconTargets) {
    const dir = path.dirname(target.file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png({ compressionLevel: 9 })
      .toFile(target.file);
    console.log(`✓ Generated ${target.file} (${target.size}x${target.size})`);
  }

  // 2. PWA Maskable icons (with 12% padding on #111113 background for safe-zone)
  const maskableTargets = [
    { file: 'public/icons/icon-maskable-192.png', size: 192 },
    { file: 'public/icons/icon-maskable-512.png', size: 512 },
    { file: 'public/icons/studio-maskable-192.png', size: 192 },
    { file: 'public/icons/studio-maskable-512.png', size: 512 },
  ];

  for (const target of maskableTargets) {
    const innerSize = Math.round(target.size * 0.78);
    const padding = Math.round((target.size - innerSize) / 2);

    const innerBuffer = await sharp(svgBuffer)
      .resize(innerSize, innerSize)
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: target.size,
        height: target.size,
        channels: 4,
        background: { r: 17, g: 17, b: 19, alpha: 1 }, // #111113
      },
    })
      .composite([{ input: innerBuffer, top: padding, left: padding }])
      .png({ compressionLevel: 9 })
      .toFile(target.file);

    console.log(`✓ Generated maskable ${target.file} (${target.size}x${target.size})`);
  }

  // 3. Multi-resolution ICO for public/favicon.ico and app/favicon.ico
  // Contains 16, 32, 48 (Google standard), 64, 128, 256
  const icoSizes = [16, 32, 48, 64, 128, 256];
  const pngBuffers = await Promise.all(
    icoSizes.map((s) => sharp(svgBuffer).resize(s, s).png().toBuffer())
  );

  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * icoSizes.length;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(icoSizes.length, 4); // number of images

  const entries = [];
  for (let i = 0; i < icoSizes.length; i++) {
    const s = icoSizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(s === 256 ? 0 : s, 0); // width (0 = 256)
    entry.writeUInt8(s === 256 ? 0 : s, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size in bytes
    entry.writeUInt32LE(offset, 12); // image offset in file
    entries.push(entry);
    offset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers]);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  fs.writeFileSync('app/favicon.ico', icoBuffer);
  console.log(`✓ Generated public/favicon.ico & app/favicon.ico with sizes [${icoSizes.join(', ')}]`);

  // 4. Also sync app/icon.svg and public/studio-icon.svg
  fs.copyFileSync('public/favicon.svg', 'app/icon.svg');
  fs.copyFileSync('public/favicon.svg', 'public/studio-icon.svg');
  console.log('✓ Synced app/icon.svg and public/studio-icon.svg with master A logo');
}

generateAllIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
