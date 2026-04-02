import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://anuhyadigital.com';
const TODAY = new Date().toISOString().split('T')[0];

const cities = [
  "tirupati", "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad",
  "chennai", "kolkata", "pune", "jaipur", "lucknow", "kanpur", "nagpur",
  "indore", "thane", "bhopal", "visakhapatnam", "patna", "vadodara",
  "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut",
  "rajkot", "varanasi", "srinagar", "aurangabad", "amritsar", "ranchi",
  "coimbatore", "jabalpur", "gwalior", "vijayawada", "jodhpur", "madurai",
  "raipur", "kota", "guwahati", "chandigarh", "solapur", "bareilly",
  "mysuru", "gurgaon", "aligarh", "jalandhar", "tiruchirappalli",
  "bhubaneswar", "salem", "warangal", "jammu", "tirunelveli", "mangalore",
  "belgaum", "jamshedpur", "ujjain", "tiruppur", "kakinada", "kozhikode",
  "akola", "kurnool", "gandhinagar", "dehradun", "gaya", "bhavnagar",
  "jalgaon", "nizamabad", "bokaro", "cuttack", "shillong", "mandya",
  "dindigul", "nadiad", "bathinda", "ooty", "pathankot", "darbhanga"
];

const keywords = [
  "web-designing-company", "best-web-designing-company",
  "top-web-designing-companies", "affordable-web-designing-services",
  "professional-web-designing-company", "custom-web-designing-services",
  "web-designing-agency", "website-design-company", "web-design-firm",
  "web-development-company", "web-design-and-development",
  "responsive-web-design", "ecommerce-web-design", "small-business-web-design",
  "corporate-web-design", "creative-web-design", "web-design-experts",
  "web-design-solutions", "local-web-design-company", "web-design-services",
  "web-design-and-seo", "modern-web-design", "innovative-web-design",
  "custom-website-development", "web-design-for-startups",
  "wordpress-web-design", "magento-web-design", "shopify-web-design",
  "website-redesign-services", "web-design-and-branding",
  "web-design-for-ecommerce", "user-friendly-web-design",
  "mobile-friendly-web-design", "web-design-consultancy", "ux-ui-web-design",
  "web-design-packages", "web-design-tools", "web-design-software",
  "web-design-courses", "web-design-tips", "web-design-projects",
  "web-design-case-studies", "creative-web-design-ideas", "unique-web-design",
  "custom-web-solutions", "web-development-services", "web-design-process",
  "web-design-support", "web-design-maintenance", "web-design-optimization",
  "web-design-reviews", "web-design-agencies-near-me",
  "local-web-design-services", "web-design-and-development-companies",
  "affordable-web-design-companies", "top-rated-web-design-companies",
  "web-design-and-seo-companies", "custom-web-design-companies",
  "ecommerce-web-design-companies", "professional-web-design-companies",
  "web-design-firms-near-me", "best-web-design-firms",
  "web-design-studios", "web-design-agency-near-me",
  "best-web-design-agencies", "top-web-design-agencies",
  "website-designers", "best-website-designers",
  "professional-website-designers", "top-website-designers",
  "custom-website-design", "website-development", "expert-web-designers",
  "affordable-website-design-services", "best-custom-website-designers",
  "professional-website-development-services", "reliable-website-designers",
  "local-website-designers", "seo-friendly-website-design",
  "mobile-friendly-website-designers", "web-development-companies",
  "e-commerce-website-design", "web-hosting-services",
  "wordpress-website-designers", "static-website-design",
  "dynamic-website-design", "web-design-agencies", "seo-web-design",
  "innovative-web-designers", "creative-website-designers",
  "local-web-design-experts"
];

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSitemap() {
  const urls = [];

  // Main pages
  const mainPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/about-us.html', priority: '0.8', changefreq: 'monthly' },
    { loc: '/services.html', priority: '0.8', changefreq: 'monthly' },
    { loc: '/projects.html', priority: '0.8', changefreq: 'weekly' },
    { loc: '/blogs.html', priority: '0.8', changefreq: 'daily' },
    { loc: '/contact.html', priority: '0.7', changefreq: 'monthly' },
    { loc: '/team.html', priority: '0.6', changefreq: 'monthly' },
    { loc: '/privacy-policy.html', priority: '0.3', changefreq: 'yearly' },
    { loc: '/terms-conditions.html', priority: '0.3', changefreq: 'yearly' },
  ];

  for (const page of mainPages) {
    urls.push({
      loc: `${BASE_URL}${page.loc}`,
      lastmod: TODAY,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  }

  // SEO keyword + city pages
  for (const keyword of keywords) {
    for (const city of cities) {
      urls.push({
        loc: `${BASE_URL}/${keyword}-${city}.html`,
        lastmod: TODAY,
        changefreq: 'monthly',
        priority: '0.5',
      });
    }
  }

  // Salesforce consulting pages
  for (const city of cities) {
    urls.push({
      loc: `${BASE_URL}/salesforce-consulting-company-${city}.html`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.5',
    });
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const url of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${escapeXml(url.loc)}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return xml;
}

const sitemap = generateSitemap();
const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

const urlCount = (sitemap.match(/<url>/g) || []).length;
console.log(`Sitemap generated: ${outputPath}`);
console.log(`Total URLs: ${urlCount}`);
