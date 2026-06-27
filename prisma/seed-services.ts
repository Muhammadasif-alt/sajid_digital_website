import { db } from '../src/lib/db';

const WA = '0300-7033832';

const services = [
  {
    title: 'Career Counseling', icon: 'Compass', isFeatured: true,
    description: 'Personalised career guidance to help you choose the right path and reach your goals.',
    details: 'One-on-one career counseling session\nField & career path selection\nStrengths & skills assessment\nGoal setting & roadmap\nGuidance for students & professionals',
  },
  {
    title: 'CV / Resume Writing', icon: 'FileText', isFeatured: true,
    description: 'Professional, ATS-friendly CVs and resumes that get you noticed by employers.',
    details: 'Professional CV / resume writing\nATS-friendly formatting\nCover letter writing\nLinkedIn profile optimization\nUnlimited revisions until satisfied',
  },
  {
    title: 'Job Assistance', icon: 'Briefcase', isFeatured: true,
    description: 'End-to-end help in finding and securing the right job for you.',
    details: 'Job search according to your field\nShortlisting suitable vacancies\nApplication submission\nInterview preparation & tips\nFollow-up guidance',
  },
  {
    title: 'Online Applications', icon: 'Send', isFeatured: false,
    description: 'We handle your online job, government and form applications accurately and on time.',
    details: 'Government & private job applications\nOnline form filling\nDocument scanning & uploading\nFee / challan guidance\nSubmission before the deadline',
  },
  {
    title: 'Business Consultancy', icon: 'TrendingUp', isFeatured: false,
    description: 'Practical advice to start, grow and digitalise your business.',
    details: 'Business idea & planning\nOnline presence setup\nBranding guidance\nGrowth & marketing strategy\nSmall business support',
  },
  {
    title: 'Social Media Management', icon: 'Share2', isFeatured: true,
    description: 'We manage and grow your social media presence professionally.',
    details: 'Facebook, Instagram & TikTok management\nContent creation & posting\nPage growth & engagement\nGraphics & creatives\nMonthly packages available',
  },
  {
    title: 'Digital Marketing', icon: 'Megaphone', isFeatured: true,
    description: 'Reach more customers online with targeted digital marketing campaigns.',
    details: 'Facebook & Instagram ads\nGoogle & YouTube marketing\nLead generation\nSEO basics\nCampaign reporting',
  },
  {
    title: 'Overseas Guidance', icon: 'Plane', isFeatured: false,
    description: 'Reliable guidance for studying, working and settling abroad.',
    details: 'Study abroad guidance\nWork visa information\nDocument & application support\nCountry selection advice\nGenuine, honest counseling',
  },
];

async function main() {
  console.log('Seeding 8 core services...');
  await db.service.deleteMany();
  for (const s of services) {
    await db.service.create({
      data: {
        title: s.title,
        slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: s.description,
        details: s.details,
        eligibility: '',
        icon: s.icon,
        whatsapp: WA,
        isFree: false,
        isFeatured: s.isFeatured,
        status: 'published',
      },
    });
  }
  console.log('Services seeded:', await db.service.count());
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());