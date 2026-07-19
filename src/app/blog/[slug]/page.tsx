import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { imageUrl } from "@/lib/image-url";
import { pageMetadata, breadcrumbLd, ldJson, SITE_URL } from "@/lib/seo";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, User, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const WHATSAPP = "https://wa.me/923157033832";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await db.blog.findUnique({ where: { slug } });
  if (!blog) return { title: "Article Not Found" };
  const desc =
    blog.seoDescription ||
    blog.excerpt ||
    (blog.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 155);
  return pageMetadata({
    title: blog.seoTitle || blog.title,
    description: desc,
    path: `/blog/${blog.slug}`,
    keywords: [blog.title, ...(blog.tags ? blog.tags.split(",").map((t) => t.trim()).filter(Boolean) : [])],
    image: imageUrl("blog", blog.id, blog.featuredImage, blog.updatedAt, 1200) ?? "/logo.png",
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await db.blog.findUnique({ where: { slug }, include: { category: true } });
  if (!blog || blog.status !== "published") notFound();

  const heroImage = imageUrl("blog", blog.id, blog.featuredImage, blog.updatedAt, 1200) ?? undefined;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || undefined,
    image: heroImage ? [heroImage] : undefined,
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: { "@type": "Organization", name: blog.author || "Sajad Digital Services" },
    publisher: {
      "@type": "Organization",
      name: "Sajad Digital Services",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${blog.slug}`,
  };
  const crumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: blog.title, path: `/blog/${blog.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(articleLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(crumbs)} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative bg-navy-dark overflow-hidden pt-24">          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold mb-5 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to Blog
            </Link>
            {blog.tags && (
              <Badge variant="outline" className="mb-4 text-[10px] font-bold border-gold/40 text-gold uppercase tracking-wide">
                {blog.tags.split(",")[0].trim()}
              </Badge>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center gap-4 mt-5 text-sm text-white/60">
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-gold" /> {blog.author}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-gold" /> {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {blog.featuredImage && (
            <div className="rounded-2xl overflow-hidden border border-border shadow-lg mb-8 bg-navy-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage} alt={blog.title} className="w-full h-auto object-cover" />
            </div>
          )}
          {blog.excerpt && (
            <p className="text-lg text-foreground/80 font-medium leading-relaxed mb-6">{blog.excerpt}</p>
          )}
          <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">
            {blog.content}
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-navy text-white p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold">Need help with this?</h3>
            <p className="text-white/70 mt-2 max-w-md mx-auto text-sm">
              Sajad Digital Services is here to guide you. Message us on WhatsApp and we&apos;ll help you get started.
            </p>
            <Button asChild className="mt-5 bg-gold-gradient text-navy-dark rounded-xl font-bold h-12 px-7">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}