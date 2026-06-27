import { db } from '../src/lib/db';

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const AUTHOR = 'Sajad Digital Services';

const blogs = [
  {
    title: 'How to Write a Professional CV That Gets You Noticed',
    featuredImage: '/Images/cv-writing.png',
    tags: 'CV, Resume, Career Tips',
    excerpt: 'A strong CV is your first impression. Learn the simple steps to build an ATS-friendly resume that actually gets shortlisted.',
    content:
`Your CV is the very first thing an employer sees — and most recruiters spend less than 10 seconds on it. That is why a clean, professional CV can make the difference between getting an interview call or being ignored.

1. Keep It Simple & Clean
Use a clear font, proper headings and enough white space. Avoid heavy colours and fancy graphics that confuse Applicant Tracking Systems (ATS).

2. Start with a Strong Summary
Write 2-3 lines at the top describing who you are and what value you bring. This is your elevator pitch.

3. Focus on Achievements, Not Just Duties
Instead of "responsible for sales", write "increased monthly sales by 30%". Numbers grab attention.

4. Tailor It for Every Job
Match the keywords from the job ad. A tailored CV always beats a generic one.

Need help? Sajad Digital Services offers professional, ATS-friendly CV writing with unlimited revisions. Contact us on WhatsApp to get started.`,
  },
  {
    title: 'Top 5 Government Jobs to Apply for in Pakistan (2026)',
    featuredImage: '/Images/govt-private-jobs.png',
    tags: 'Government Jobs, Pakistan, 2026',
    excerpt: 'Government jobs offer security, pension and respect. Here are 5 popular government job categories you should keep an eye on this year.',
    content:
`Government jobs remain one of the most desired career paths in Pakistan because of job security, pension and other benefits. Here are 5 categories worth applying for in 2026:

1. Educators & Teaching Staff
The School Education Department regularly announces teaching posts (PST, EST, SST) across Punjab and other provinces.

2. Clerical & Administrative (BPS 11-16)
Junior Clerks, Assistants and Data Entry Operators are always in demand in various departments.

3. Police & Law Enforcement
Constable, ASI and other posts are announced through Public Service Commissions.

4. Health Department
Nurses, Dispensers and Medical Technicians have frequent openings.

5. NADRA, WAPDA & Other Authorities
Semi-government organisations offer competitive packages.

Tip: Always apply before the last date and keep your documents ready. Sajad Digital Services can handle your online applications accurately and on time.`,
  },
  {
    title: 'A Complete Guide to Studying Abroad from Pakistan',
    featuredImage: '/Images/overseas.png',
    tags: 'Overseas, Study Abroad, Scholarships',
    excerpt: 'Dreaming of studying abroad? This step-by-step guide covers country selection, documents, scholarships and visa basics.',
    content:
`Studying abroad opens doors to world-class education and global opportunities. But the process can feel confusing. Here is a simple roadmap:

Step 1: Choose the Right Country & Program
Popular destinations for Pakistani students include the UK, Australia, Canada, Turkey and China. Pick based on your budget and field.

Step 2: Prepare Your Documents
You will usually need academic transcripts, passport, IELTS/English proficiency, statement of purpose and reference letters.

Step 3: Apply for Scholarships
Many universities and governments offer fully-funded scholarships. Apply early and to multiple options.

Step 4: Student Visa
Once you receive an admission/offer letter, apply for the student visa with proof of funds.

Honest guidance matters. Sajad Digital Services provides reliable overseas education counseling and document support — no false promises.`,
  },
  {
    title: 'How to Start Freelancing in Pakistan with Zero Experience',
    featuredImage: '/Images/freelancing.png',
    tags: 'Freelancing, Skills, Online Income',
    excerpt: 'Want to earn online? Freelancing is one of the best ways to build an income from home. Here is how beginners can start.',
    content:
`Freelancing has changed the lives of thousands of young Pakistanis. The best part — you can start from home with just a laptop and internet. Here is how:

1. Pick One Skill
Choose a single in-demand skill: graphic design, content writing, web development, video editing or digital marketing. Focus beats spreading thin.

2. Learn from Free & Paid Resources
YouTube, Coursera and local courses can teach you the basics in a few weeks.

3. Build a Small Portfolio
Do 2-3 sample projects to show your work — even unpaid practice counts.

4. Create Profiles on Freelance Platforms
Sign up on Fiverr, Upwork or local platforms and write a clear, honest profile.

5. Stay Consistent
Your first order may take time. Keep improving and delivering quality.

Sajad Digital Services offers freelancing guidance to help you start the right way. Reach out on WhatsApp.`,
  },
];

async function main() {
  console.log('Seeding demo blogs...');
  for (const b of blogs) {
    const base = slugify(b.title);
    const existing = await db.blog.findUnique({ where: { slug: base } });
    if (existing) { console.log('  = exists, skip:', b.title); continue; }
    await db.blog.create({
      data: { ...b, slug: base, author: AUTHOR, status: 'published' },
    });
    console.log('  +', b.title);
  }
  console.log('Total published blogs:', await db.blog.count({ where: { status: 'published' } }));
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());