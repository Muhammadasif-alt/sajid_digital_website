import { db } from '../src/lib/db';

const WA = '0315-7033832';

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const jobs = [
  {
    title: 'Primary School Teacher (Educators)',
    department: 'Government', location: 'Faisalabad, Punjab', city: 'Faisalabad',
    employmentType: 'Full-time', workMode: 'On-site', experience: 'Entry-level', education: "Bachelor's",
    whatsapp: WA, featuredImage: '/Images/scholarship.png', isFeatured: true, deadline: new Date('2026-08-05'),
    description: 'School Education Department is hiring Primary School Teachers (Educators) on merit basis across Punjab.',
    responsibilities: 'Teach primary level students\nPrepare lesson plans\nMaintain student attendance & progress\nParticipate in school activities',
    requirements: 'Age limit: 20 to 35 years\nBachelor degree + B.Ed / ADE preferred\nDomicile of relevant district\nPassion for teaching\nGood communication skills',
    benefits: 'Government pay scale (BPS-9/14)\nSummer & winter vacations\nPension & medical\nJob security',
  },
  {
    title: 'Social Media Manager',
    department: 'Private', location: 'Islamabad', city: 'Islamabad',
    employmentType: 'Full-time', workMode: 'Hybrid', experience: 'Mid-level', education: "Bachelor's",
    whatsapp: WA, featuredImage: '/Images/social-media.png', isFeatured: false, deadline: new Date('2026-07-20'),
    description: 'A growing digital agency needs a creative Social Media Manager to run Facebook, Instagram & TikTok campaigns.',
    responsibilities: 'Plan & schedule social media content\nRun paid ad campaigns\nEngage with audience & reply to messages\nReport monthly growth & insights',
    requirements: 'Age limit: 21 to 33 years\nBachelor degree (Marketing/Media)\n1-2 years social media experience\nCanva / basic design skills\nKnowledge of Meta Ads Manager',
    benefits: 'Market competitive salary\nHybrid / flexible work\nPerformance bonuses\nLearning & growth',
  },
  {
    title: 'Accounts Officer',
    department: 'Private', location: 'Lahore, Punjab', city: 'Lahore',
    employmentType: 'Full-time', workMode: 'On-site', experience: 'Mid-level', education: "Bachelor's",
    whatsapp: WA, featuredImage: '/Images/document.png', isFeatured: false, deadline: new Date('2026-07-28'),
    description: 'Manufacturing company requires an Accounts Officer to manage daily bookkeeping, invoices and ledgers.',
    responsibilities: 'Maintain accounts & ledgers\nPrepare invoices and vouchers\nHandle bank reconciliation\nAssist in monthly financial reports',
    requirements: 'Age limit: 22 to 35 years\nB.Com / BBA / M.Com\n1-3 years accounting experience\nMS Excel & QuickBooks knowledge\nAttention to detail',
    benefits: 'Competitive salary\nEOBI & medical\nAnnual bonus\nProfessional environment',
  },
  {
    title: 'Overseas Job — Security Guard (Dubai)',
    department: 'Overseas', location: 'Dubai, UAE', city: 'Dubai',
    employmentType: 'Full-time', workMode: 'On-site', experience: 'Entry-level', education: 'Matric',
    whatsapp: WA, featuredImage: '/Images/overseas.png', isFeatured: true, deadline: new Date('2026-08-10'),
    description: 'Overseas employment opportunity in Dubai for Security Guards. Free visa & accommodation provided by company.',
    responsibilities: 'Guard assigned premises\nMonitor CCTV and entries\nMaintain duty logs\nFollow company safety protocols',
    requirements: 'Age limit: 21 to 40 years\nMinimum Matric\nHeight 5\'7" or above\nMedically fit\nValid passport required',
    benefits: 'Free visa & ticket\nFree accommodation + food\nTax-free salary (AED)\n2-year contract',
  },
  {
    title: 'Graphic Designer',
    department: 'Private', location: 'Remote (Pakistan)', city: 'Remote',
    employmentType: 'Contract', workMode: 'Remote', experience: 'Mid-level', education: 'Intermediate',
    whatsapp: WA, featuredImage: '/Images/digital-branding.png', isFeatured: false, deadline: new Date('2026-07-22'),
    description: 'Remote Graphic Designer needed for social media posts, banners and brand logos for multiple clients.',
    responsibilities: 'Design posts, banners & logos\nFollow brand guidelines\nDeliver work on deadlines\nRevise designs on feedback',
    requirements: 'Age limit: 19 to 35 years\nStrong Photoshop / Illustrator / Canva skills\nGood portfolio required\nReliable internet\nCreative mindset',
    benefits: 'Work from home\nPer-project payments\nFlexible hours\nLong-term collaboration',
  },
];

async function main() {
  console.log('Seeding 5 more demo jobs...');
  for (const j of jobs) {
    const base = slugify(j.title);
    const existing = await db.job.findUnique({ where: { slug: base } });
    if (existing) { console.log('  = exists, skip:', j.title); continue; }
    await db.job.create({ data: { ...j, slug: base, currency: 'PKR', status: 'published' } });
    console.log('  +', j.title);
  }
  console.log('Total published jobs:', await db.job.count({ where: { status: 'published' } }));
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());