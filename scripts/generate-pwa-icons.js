const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mainSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
const studioSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/studio-icon.svg'));

const outputDir = path.join(__dirname, '../public/icons');
const publicDir = path.join(__dirname, '../public');
const appDir = path.join(__dirname, '../app');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating Main Site icons (from favicon.svg) and Studio PWA icons (from studio-icon.svg)...');

  // --- 1. Main Site Icons ---
  await sharp(mainSvgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(mainSvgBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'icon.png'));
  await sharp(mainSvgBuffer).resize(32, 32).png().toFile(path.join(appDir, 'icon.png'));

  await sharp(mainSvgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(mainSvgBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-icon.png'));
  await sharp(mainSvgBuffer).resize(180, 180).png().toFile(path.join(appDir, 'apple-icon.png'));

  await sharp(mainSvgBuffer).resize(192, 192).png().toFile(path.join(outputDir, 'icon-192.png'));
  await sharp(mainSvgBuffer).resize(512, 512).png().toFile(path.join(outputDir, 'icon-512.png'));
  await sharp(mainSvgBuffer).resize(192, 192).png().toFile(path.join(outputDir, 'icon-maskable-192.png'));
  await sharp(mainSvgBuffer).resize(512, 512).png().toFile(path.join(outputDir, 'icon-maskable-512.png'));

  // --- 2. Studio App Icons ---
  await sharp(studioSvgBuffer).resize(192, 192).png().toFile(path.join(outputDir, 'studio-192.png'));
  await sharp(studioSvgBuffer).resize(512, 512).png().toFile(path.join(outputDir, 'studio-512.png'));
  await sharp(studioSvgBuffer).resize(192, 192).png().toFile(path.join(outputDir, 'studio-maskable-192.png'));
  await sharp(studioSvgBuffer).resize(512, 512).png().toFile(path.join(outputDir, 'studio-maskable-512.png'));

  console.log('Main Site and Studio PWA icons generated successfully!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
