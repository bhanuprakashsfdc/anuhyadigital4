const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const blogPosts = [
  // Posts 1-10
  { id: 1, slug: 'salesforce-apex-best-practices', category: 'Salesforce', title: 'Salesforce Apex Best Practices', color1: '#0070D2', color2: '#00A1E0' },
  { id: 2, slug: 'salesforce-lightning-web-components-guide', category: 'Salesforce', title: 'Lightning Web Components', color1: '#0070D2', color2: '#1B96FF' },
  { id: 3, slug: 'salesforce-soql-optimization-tips', category: 'Salesforce', title: 'SOQL Optimization Tips', color1: '#0070D2', color2: '#0488D4' },
  { id: 4, slug: 'salesforce-rest-api-integration-guide', category: 'Salesforce', title: 'Salesforce REST API', color1: '#0070D2', color2: '#0570AB' },
  { id: 5, slug: 'react-19-new-features-developers', category: 'Web Development', title: 'React 19 New Features', color1: '#61DAFB', color2: '#282C34' },
  { id: 6, slug: 'react-typescript-best-practices', category: 'Web Development', title: 'React + TypeScript', color1: '#3178C6', color2: '#61DAFB' },
  { id: 7, slug: 'css-container-queries-responsive-design', category: 'Web Development', title: 'CSS Container Queries', color1: '#264DE4', color2: '#2965F1' },
  { id: 8, slug: 'javascript-es2026-features-explained', category: 'Web Development', title: 'JavaScript ES2026', color1: '#F7DF1E', color2: '#323330' },
  { id: 9, slug: 'ai-powered-web-design-tools-techniques', category: 'AI Design', title: 'AI Web Design Tools', color1: '#A855F7', color2: '#7C3AED' },
  { id: 10, slug: 'generative-ai-ui-design-prompt-to-production', category: 'AI Design', title: 'Generative AI UI Design', color1: '#A855F7', color2: '#EC4899' },
  // Posts 11-20
  { id: 11, slug: 'salesforce-data-cloud-unifying-customer-data', category: 'Salesforce', title: 'Salesforce Data Cloud', color1: '#0070D2', color2: '#00A1E0' },
  { id: 12, slug: 'salesforce-flow-automation-no-code-mastery', category: 'Salesforce', title: 'Salesforce Flow Automation', color1: '#0070D2', color2: '#1B96FF' },
  { id: 13, slug: 'nextjs-15-app-router-production-applications', category: 'Web Development', title: 'Next.js 15 App Router', color1: '#000000', color2: '#434343' },
  { id: 14, slug: 'tailwind-css-v4-advanced-utility-patterns', category: 'Web Development', title: 'Tailwind CSS v4', color1: '#06B6D4', color2: '#0891B2' },
  { id: 15, slug: 'nodejs-microservices-architecture-guide', category: 'Web Development', title: 'Node.js Microservices', color1: '#339933', color2: '#43853D' },
  { id: 16, slug: 'graphql-vs-rest-api-strategy-2026', category: 'Web Development', title: 'GraphQL vs REST', color1: '#E535AB', color2: '#282C34' },
  { id: 17, slug: 'ai-driven-responsive-design-adaptive-layouts', category: 'AI Design', title: 'AI Responsive Design', color1: '#A855F7', color2: '#6366F1' },
  { id: 18, slug: 'web-design-trends-2026-ai-generated-layouts', category: 'AI Design', title: 'Web Design Trends 2026', color1: '#EC4899', color2: '#F59E0B' },
  { id: 19, slug: 'webassembly-production-high-performance-apps', category: 'Advanced Coding', title: 'WebAssembly Production', color1: '#654FF0', color2: '#04124B' },
  { id: 20, slug: 'advanced-typescript-patterns-generics-mapped-types', category: 'Advanced Coding', title: 'Advanced TypeScript', color1: '#3178C6', color2: '#235A97' },
  // Posts 21-30
  { id: 21, slug: 'building-ai-chatbots-for-websites', category: 'AI Design', title: 'AI Chatbots for Websites', color1: '#10B981', color2: '#059669' },
  { id: 22, slug: 'machine-learning-frontend-development', category: 'AI Design', title: 'ML in Frontend Dev', color1: '#F59E0B', color2: '#D97706' },
  { id: 23, slug: 'css-scroll-driven-animations', category: 'Advanced Coding', title: 'CSS Scroll Animations', color1: '#E44D26', color2: '#F16529' },
  { id: 24, slug: 'progressive-web-apps-2026', category: 'Web Development', title: 'Progressive Web Apps', color1: '#5A0FC8', color2: '#3B0764' },
  { id: 25, slug: 'web-performance-optimization-core-web-vitals', category: 'Web Development', title: 'Web Performance', color1: '#34D399', color2: '#059669' },
  { id: 26, slug: 'salesforce-experience-cloud-portals', category: 'Salesforce', title: 'Experience Cloud', color1: '#0070D2', color2: '#0488D4' },
  { id: 27, slug: 'api-first-design-scalable-backends', category: 'Advanced Coding', title: 'API-First Design', color1: '#06B6D4', color2: '#0891B2' },
  { id: 28, slug: 'react-server-components-fullstack', category: 'Web Development', title: 'React Server Components', color1: '#61DAFB', color2: '#282C34' },
  { id: 29, slug: 'ai-code-generation-copilot', category: 'AI Design', title: 'AI Code Generation', color1: '#8B5CF6', color2: '#6D28D9' },
  { id: 30, slug: 'wcag-2-2-accessibility-web-development', category: 'Advanced Coding', title: 'WCAG 2.2 Accessibility', color1: '#10B981', color2: '#047857' },
];

const W = 1200;
const H = 630;
const LOGO_PATH = path.join(__dirname, 'src/assets/images/logo/adlogo.png');
const OUTPUT_DIR = path.join(__dirname, 'public/assets/images/blog');

async function generateImage(post) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, post.color1);
  grad.addColorStop(1, post.color2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Dark overlay for readability
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, 0, W, H);

  // Decorative circles
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(W * 0.8, H * 0.2, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W * 0.15, H * 0.8, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Category badge
  const catText = post.category.toUpperCase();
  ctx.font = 'bold 18px sans-serif';
  const catWidth = ctx.measureText(catText).width + 32;
  ctx.fillStyle = 'rgba(173,255,133,0.2)';
  roundRect(ctx, 60, 60, catWidth, 36, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(173,255,133,0.4)';
  ctx.lineWidth = 1;
  roundRect(ctx, 60, 60, catWidth, 36, 18);
  ctx.stroke();
  ctx.fillStyle = '#adff85';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(catText, 76, 84);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px sans-serif';
  wrapText(ctx, post.title, 60, 300, W - 120, 60);

  // Decorative line
  ctx.strokeStyle = '#adff85';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(60, 230);
  ctx.lineTo(200, 230);
  ctx.stroke();

  // Bottom tagline
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '20px sans-serif';
  ctx.fillText('anuhyadigital.com', 60, H - 40);

  // Logo in bottom-left corner
  try {
    const logo = await loadImage(LOGO_PATH);
    const logoH = 48;
    const logoW = (logo.width / logo.height) * logoH;
    ctx.globalAlpha = 0.9;
    ctx.drawImage(logo, 60, H - 110, logoW, logoH);
    ctx.globalAlpha = 1;
  } catch (e) {
    console.warn('Could not load logo:', e.message);
  }

  // Write file
  const outPath = path.join(OUTPUT_DIR, `${post.slug}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated: ${post.slug}.png (${(buffer.length / 1024).toFixed(0)}KB)`);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (const word of words) {
    const testLine = line + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line.trim(), x, currentY);
      line = word + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  console.log(`Generating ${blogPosts.length} blog images...\n`);
  for (const post of blogPosts) {
    await generateImage(post);
  }
  console.log('\nDone! All images saved to:', OUTPUT_DIR);
}

main().catch(console.error);
