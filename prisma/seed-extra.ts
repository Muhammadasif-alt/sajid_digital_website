import { db } from '../src/lib/db';

const WA = '0300-7033832';
const img = (id: number) => `https://picsum.photos/seed/sajid${id}/800/450`;

async function main() {
  console.log('Seeding announcements, courses, services...');

  await db.announcement.deleteMany();
  await db.course.deleteMany();
  await db.service.deleteMany();

  // Announcements
  const announcements = [
    {
      title: 'Punjab Police Constable Jobs 2026', organization: 'Punjab Police', sector: 'Government',
      location: 'Lahore, Punjab', description: 'Punjab Police invites applications for 1200+ Constable posts across Punjab.',
      details: 'Minimum qualification: Matric\nAge: 18-25 years\nHeight: 5ft 7in (male)\nPhysical & written test required\nApply before the last date through official portal',
      officialLink: 'https://www.punjabpolice.gov.pk', featuredImage: img(11), whatsapp: WA, lastDate: new Date('2026-07-31'),
      status: 'published', isFeatured: true,
    },
    {
      title: 'NADRA Data Entry Operator Jobs', organization: 'NADRA', sector: 'Semi-Government',
      location: 'Islamabad', description: 'NADRA is hiring Data Entry Operators on contract basis in multiple cities.',
      details: 'Qualification: Intermediate / Bachelor\nTyping speed 30 wpm\nComputer literate\nContract: 2 years (extendable)',
      officialLink: 'https://www.nadra.gov.pk', featuredImage: img(12), whatsapp: WA, lastDate: new Date('2026-07-20'),
      status: 'published', isFeatured: false,
    },
    {
      title: 'Private Bank Cash Officer Openings', organization: 'Meezan Bank', sector: 'Private',
      location: 'Karachi, Sindh', description: 'Leading private bank seeks Cash Officers for branches across Sindh.',
      details: 'Qualification: Bachelor / Master\nFresh graduates welcome\nBanking knowledge preferred\nAttractive salary + benefits',
      officialLink: '', featuredImage: img(13), whatsapp: WA, lastDate: new Date('2026-08-10'),
      status: 'published', isFeatured: false,
    },
  ];
  for (const a of announcements) {
    await db.announcement.create({ data: { ...a, slug: a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } });
  }

  // Courses
  const courses = [
    {
      title: 'Complete Web Development Bootcamp', category: 'Web Development',
      description: 'Become a full-stack developer — HTML, CSS, JavaScript, React, Node.js and databases.',
      details: 'HTML5 & CSS3 fundamentals\nJavaScript & ES6+\nReact.js & Next.js\nNode.js & Express\nMySQL & MongoDB\nDeploy real projects',
      price: 25000, discountPrice: 15000, duration: '4 Months', level: 'Beginner',
      featuredImage: img(21), whatsapp: WA, status: 'published', isFeatured: true,
    },
    {
      title: 'Graphic Designing Masterclass', category: 'Graphic Designing',
      description: 'Learn Adobe Photoshop, Illustrator and design stunning logos, posters and branding.',
      details: 'Adobe Photoshop\nAdobe Illustrator\nLogo & brand design\nSocial media creatives\nPortfolio building',
      price: 18000, discountPrice: 12000, duration: '3 Months', level: 'Beginner',
      featuredImage: img(22), whatsapp: WA, status: 'published', isFeatured: true,
    },
    {
      title: 'Professional Video Editing', category: 'Video Editing',
      description: 'Master Premiere Pro & After Effects for YouTube, reels and commercial editing.',
      details: 'Adobe Premiere Pro\nAfter Effects basics\nColor grading\nMotion graphics\nReels & shorts editing',
      price: 20000, discountPrice: null, duration: '2.5 Months', level: 'Intermediate',
      featuredImage: img(23), whatsapp: WA, status: 'published', isFeatured: false,
    },
    {
      title: 'SEO & Digital Marketing', category: 'SEO',
      description: 'Rank websites on Google and run profitable digital marketing campaigns.',
      details: 'On-page & off-page SEO\nKeyword research\nGoogle Analytics\nMeta & Google Ads\nContent strategy',
      price: 16000, discountPrice: 10000, duration: '2 Months', level: 'Beginner',
      featuredImage: img(24), whatsapp: WA, status: 'published', isFeatured: false,
    },
  ];
  for (const c of courses) {
    await db.course.create({ data: { ...c, slug: c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } });
  }

  // Services
  const services = [
    {
      title: 'Free IT Training for Disabled Persons', description: 'Free skill-development courses for persons with disabilities under our MOU.',
      details: 'Free seat in any IT course\nLaptop support (limited)\nFlexible online classes\nJob placement assistance',
      eligibility: 'Disabled persons', icon: 'Accessibility', featuredImage: img(31), whatsapp: WA, isFree: true,
      status: 'published', isFeatured: true,
    },
    {
      title: 'Free Website for Govt Departments', description: 'Free basic website development for government offices and employees.',
      details: 'Basic informational website\nFree domain guidance\n1 year support\nMOU-based collaboration',
      eligibility: 'Govt employees', icon: 'Globe', featuredImage: img(32), whatsapp: WA, isFree: true,
      status: 'published', isFeatured: false,
    },
    {
      title: 'Free Career Counseling', description: 'Free one-on-one career counseling and CV building sessions.',
      details: 'CV / resume building\nInterview preparation\nCareer guidance\nFreelancing setup help',
      eligibility: 'Disabled persons & Govt employees', icon: 'HeartHandshake', featuredImage: img(33), whatsapp: WA, isFree: true,
      status: 'published', isFeatured: false,
    },
  ];
  for (const s of services) {
    await db.service.create({ data: { ...s, slug: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } });
  }

  console.log('Done:');
  console.log('- Announcements:', await db.announcement.count());
  console.log('- Courses:', await db.course.count());
  console.log('- Services:', await db.service.count());
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
