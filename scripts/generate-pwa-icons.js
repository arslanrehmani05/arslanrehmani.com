const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mainSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));

const outputDir = path.join(__dirname, '../public/icons');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../app');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating all site favicons and PWA icons from public/favicon.svg...');

  // 1. Root public/favicon.png (32x32)
  await sharp(mainSvgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // 2. Root public/icon.png (32x32)
  await sharp(mainSvgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'icon.png'));

  // 3. App app/icon.png (32x32)
  await sharp(mainSvgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(appDir, 'icon.png'));

  // 4. Root public/apple-touch-icon.png (180x180)
  await sharp(mainSvgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // 5. Root public/apple-icon.png (180x180)
  await sharp(mainSvgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-icon.png'));

  // 6. App app/apple-icon.png (180x180)
  await sharp(mainSvgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, 'apple-icon.png'));

  // 7. PWA icon-192.png
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192.png'));

  // 8. PWA icon-512.png
  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512.png'));

  // 9. PWA icon-maskable-192.png
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-192.png'));

  // 10. PWA icon-maskable-512.png
  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512.png'));

  // 11. Studio PWA icons (fallback until future studio custom icon step)
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'studio-192.png'));

  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'studio-512.png'));

  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'studio-maskable-192.png'));

  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'studio-maskable-512.png'));

  console.log('All favicons, Apple touch icons, and PWA icons updated successfully!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
