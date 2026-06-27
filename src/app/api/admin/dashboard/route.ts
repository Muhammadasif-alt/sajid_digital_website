import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [
      totalJobs,
      publishedJobs,
      totalBlogs,
      publishedBlogs,
      totalApplications,
      totalMessages,
      unreadMessages,
      totalTestimonials,
      totalNewsletter,
      recentJobs,
      recentBlogs,
      recentMessages,
    ] = await Promise.all([
      db.job.count(),
      db.job.count({ where: { status: 'published' } }),
      db.blog.count(),
      db.blog.count({ where: { status: 'published' } }),
      db.application.count(),
      db.message.count(),
      db.message.count({ where: { isRead: false } }),
      db.testimonial.count(),
      db.newsletter.count(),
      db.job.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { category: true } }),
      db.blog.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { category: true } }),
      db.message.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
    ]);

    return NextResponse.json({
      stats: {
        totalJobs,
        publishedJobs,
        draftJobs: totalJobs - publishedJobs,
        totalBlogs,
        publishedBlogs,
        totalApplications,
        totalMessages,
        unreadMessages,
        totalTestimonials,
        totalNewsletter,
      },
      recentJobs,
      recentBlogs,
      recentMessages,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}