const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const mainSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
const studioSvgBuffer = fs.readFileSync(path.join(__dirname, '../public/studio-icon.svg'));

const outputDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  console.log('Generating PWA icons for both Website and Sanity Studio...');

  // --- 1. Main Website Icons ---
  // Standard 192x192
  await sharp(mainSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'icon-192.png'));

  // Standard 512x512
  await sharp(mainSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'icon-512.png'));

  // Maskable 192x192
  const innerMain192 = await sharp(mainSvgBuffer).resize(154, 154).toBuffer();
  await sharp({
    create: { width: 192, height: 192, channels: 4, background: { r: 8, g: 8, b: 8, alpha: 1 } },
  })
    .composite([{ input: innerMain192, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-192.png'));

  // Maskable 512x512
  const innerMain512 = await sharp(mainSvgBuffer).resize(410, 410).toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: { r: 8, g: 8, b: 8, alpha: 1 } },
  })
    .composite([{ input: innerMain512, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'icon-maskable-512.png'));


  // --- 2. Studio App Icons ---
  // Standard Studio 192x192
  await sharp(studioSvgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outputDir, 'studio-192.png'));

  // Standard Studio 512x512
  await sharp(studioSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outputDir, 'studio-512.png'));

  // Maskable Studio 192x192
  const innerStudio192 = await sharp(studioSvgBuffer).resize(154, 154).toBuffer();
  await sharp({
    create: { width: 192, height: 192, channels: 4, background: { r: 8, g: 8, b: 8, alpha: 1 } },
  })
    .composite([{ input: innerStudio192, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'studio-maskable-192.png'));

  // Maskable Studio 512x512
  const innerStudio512 = await sharp(studioSvgBuffer).resize(410, 410).toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: { r: 8, g: 8, b: 8, alpha: 1 } },
  })
    .composite([{ input: innerStudio512, gravity: 'center' }])
    .png()
    .toFile(path.join(outputDir, 'studio-maskable-512.png'));

  console.log('All icons (Website & Studio) generated successfully in public/icons!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
