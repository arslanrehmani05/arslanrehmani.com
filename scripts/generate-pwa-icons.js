const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mainSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));

const outputDir = path.join(__dirname, '../public/icons');
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating exact PWA icons directly from public/favicon.svg...');

  // 1. Exact 192x192 PNG from favicon.svg
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192.png'));

  // 2. Exact 512x512 PNG from favicon.svg
  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512.png'));

  // 3. Exact Maskable 192x192 PNG from favicon.svg
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-192.png'));

  // 4. Exact Maskable 512x512 PNG from favicon.svg
  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512.png'));

  // 5. Exact 180x180 Apple Touch Icon from favicon.svg
  await sharp(mainSvgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('Exact PWA icons generated from public/favicon.svg successfully!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
