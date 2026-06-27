import { db } from '../src/lib/db';

const WA = '0315-7033832';

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const jobs = [
  {
    title: 'Government Junior Clerk (BPS-11)',
    department: 'Government',
    location: 'Lahore, Punjab',
    city: 'Lahore',
    employmentType: 'Full-time',
    workMode: 'On-site',
    experience: 'Entry-level',
    education: "Bachelor's",
    whatsapp: WA,
    featuredImage: '/Images/govt-private-jobs.png',
    isFeatured: true,
    deadline: new Date('2026-07-25'),
    description:
      'Government of Punjab invites applications for the post of Junior Clerk (BPS-11) in various departments. Apply before the last date.',
    responsibilities:
      'Maintain office records and files\nData entry and documentation\nAssist senior staff in daily office tasks\nHandle correspondence and filing',
    requirements:
      'Age limit: 18 to 28 years\nIntermediate / Bachelor degree from a recognized institution\nTyping speed 30 wpm (English)\nDomicile of Punjab required\nMS Office basic knowledge',
    benefits:
      'Permanent government job\nPension & medical facilities\nAnnual increments\nGazetted holidays',
  },
  {
    title: 'Customer Support Officer',
    department: 'Private',
    location: 'Karachi, Sindh',
    city: 'Karachi',
    employmentType: 'Full-time',
    workMode: 'On-site',
    experience: 'Mid-level',
    education: "Bachelor's",
    whatsapp: WA,
    featuredImage: '/Images/job-assistance.png',
    isFeatured: false,
    deadline: new Date('2026-07-15'),
    description:
      'A leading private company is hiring Customer Support Officers to handle client queries via phone, email and WhatsApp.',
    responsibilities:
      'Respond to customer queries professionally\nResolve complaints and follow up\nMaintain customer records in CRM\nAchieve monthly support targets',
    requirements:
      'Age limit: 20 to 32 years\nBachelor degree (any discipline)\nGood communication skills (Urdu & English)\n1 year experience preferred\nComfortable with computer & internet',
    benefits:
      'Competitive salary + incentives\nFriendly work environment\nCareer growth opportunities\nPaid leaves',
  },
  {
    title: 'Online Data Entry Operator (Work From Home)',
    department: 'Private',
    location: 'Remote (Pakistan)',
    city: 'Remote',
    employmentType: 'Part-time',
    workMode: 'Remote',
    experience: 'Entry-level',
    education: 'Intermediate',
    whatsapp: WA,
    featuredImage: '/Images/online-applications.png',
    isFeatured: true,
    deadline: new Date('2026-07-30'),
    description:
      'Work-from-home opportunity for Data Entry Operators. Flexible hours, ideal for students and freelancers.',
    responsibilities:
      'Enter data into online sheets accurately\nVerify and correct data\nMeet daily entry targets\nMaintain confidentiality',
    requirements:
      'Age limit: 18 to 35 years\nIntermediate or above\nLaptop/computer with internet\nBasic typing & MS Excel skills\nSelf-disciplined and reliable',
    benefits:
      'Work from home\nFlexible timing\nWeekly payments\nNo experience required (training provided)',
  },
];

async function main() {
  console.log('Seeding demo jobs...');
  for (const j of jobs) {
    const base = slugify(j.title);
    const existing = await db.job.findUnique({ where: { slug: base } });
    const slug = existing ? `${base}-${Math.random().toString(36).slice(2, 6)}` : base;
    await db.job.create({
      data: {
        ...j,
        slug,
        currency: 'PKR',
        status: 'published',
      },
    });
    console.log('  +', j.title);
  }
  console.log('Total published jobs:', await db.job.count({ where: { status: 'published' } }));
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());