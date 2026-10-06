const fs = require('fs');
const path = require('path');

const dirs = [
  'offsite-project-dev',
  'hackathons',
  'freelance-work',
  'ideathons',
  'project-contests',
  'research'
];

dirs.forEach(dir => {
  const filePath = path.join(__dirname, 'src', 'app', dir, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add lenis.scrollTo(0, { immediate: true }); and manual restoration
    // We'll replace the existing window.scrollTo(0, 0); with a more robust version
    
    content = content.replace(/window\.scrollTo\(0, 0\);/g, `
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    `);

    // Inject lenis.scrollTo(0) right after lenis creation
    if (!content.includes('lenis.scrollTo(0, { immediate: true });')) {
      content = content.replace(/smoothWheel: true,\n\s*\}\);/, `smoothWheel: true,
    });
    lenis.scrollTo(0, { immediate: true });`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Force fixed scroll in ${dir}/page.tsx`);
  }
});
