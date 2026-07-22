const fs = require('fs');

function addBannerToPage(filePath, pageName, defaultTitle, defaultSubtitle, defaultImg) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('getBannerByPagePublic')) {
    content = content.replace(/(import .*?\n)/, `$1import { getBannerByPagePublic } from "@/services/banner.service";\n`);
  }

  // Find the component declaration
  const funcRegex = /export default (?:async )?function \w+\(.*?\)\s*\{/;
  const match = content.match(funcRegex);
  
  if (match) {
    const funcStart = match[0];
    
    // Check if banner is already fetched
    if (!content.includes('let banner = null;')) {
      content = content.replace(funcStart, `${funcStart}\n  let banner = null;\n  try {\n    const res = await getBannerByPagePublic("${pageName}");\n    if (res?.success) banner = res.data;\n  } catch (e) {}\n`);
    }

    // Now replace the PageBanner usage
    // We assume PageBanner is used in the file
    if (content.includes('<PageBanner')) {
       const pbRegex = /<PageBanner[\s\S]*?\/>/;
       const newPB = `<PageBanner
        title={banner?.title || "${defaultTitle}"}
        subtitle={banner?.eyebrowText || "${defaultSubtitle}"}
        bgImage={banner?.backgroundImage || "${defaultImg}"}
        altText={banner?.title || "${defaultTitle}"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>`;
       
       content = content.replace(pbRegex, newPB);
       
       // Handle BlogHero if it's blog
       if (filePath.includes('blog')) {
         const bhRegex = /<BlogHero[\s\S]*?\/>/;
         if (content.match(bhRegex)) {
            content = content.replace(bhRegex, newPB);
         }
       }
    } else if (filePath.includes('blog') && content.includes('<BlogHero')) {
       // if PageBanner wasn't imported
       if (!content.includes('PageBanner')) {
          content = content.replace(/(import .*?\n)/, `$1import { PageBanner } from "@/components/ui/PageBanner";\n`);
       }
       const bhRegex = /<BlogHero[\s\S]*?\/>/;
       const newPB = `<PageBanner
        title={banner?.title || "${defaultTitle}"}
        subtitle={banner?.eyebrowText || "${defaultSubtitle}"}
        bgImage={banner?.backgroundImage || "${defaultImg}"}
        altText={banner?.title || "${defaultTitle}"}
      >
        {banner?.description && (
          <p className="text-white/80 text-[14px] md:text-[15px] leading-relaxed max-w-2xl mt-4">
            {banner.description}
          </p>
        )}
      </PageBanner>`;
       content = content.replace(bhRegex, newPB);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

addBannerToPage('src/app/blog/page.tsx', 'blog', 'News & Blog', 'Insights', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070');
addBannerToPage('src/app/contact/page.tsx', 'contact', 'Contact Us', 'Get in Touch', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070');
addBannerToPage('src/app/inquiry/page.tsx', 'inquiry', 'Property Inquiry', 'Consultation', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075');
addBannerToPage('src/app/legal/privacy-policy/page.tsx', 'privacy-policy', 'Privacy Policy', 'Legal', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070');
addBannerToPage('src/app/legal/terms-conditions/page.tsx', 'terms-conditions', 'Terms & Conditions', 'Legal', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070');
