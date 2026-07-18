"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Star,
  FolderOpen,
  Settings,
  X,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Send,
  TrendingUp,
  Users,
  Mail,
  Newspaper,
  ChevronLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  LogOut,
  Home,
  ImagePlus,
  Loader2,
  MessageCircle,
  Megaphone,
  GraduationCap,
  HeartHandshake,
  ExternalLink,
  Handshake,
  Link2,
  Check,
  Images,
  Trophy,
} from "lucide-react";
import { AnnouncementsTab } from "./announcements-tab";
import { CoursesTab } from "./courses-tab";
import { ServicesTab } from "./services-tab";
import { PartnersTab } from "./partners-tab";
import { TeamTab } from "./team-tab";
import { GalleryTab } from "./gallery-tab";
import { SuccessStoriesTab } from "./success-stories-tab";
import { BannerUpload } from "./banner-upload";

/* ============================================================
   TYPES
   ============================================================ */
interface JobRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  employmentType: string;
  workMode: string;
  experience: string;
  education: string;
  department: string;
  status: string;
  isFeatured: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  responsibilities: string;
  requirements: string;
  benefits: string | null;
  featuredImage: string | null;
  whatsapp: string | null;
  createdAt: string;
  category: { id: string; name: string } | null;
  _count?: { applications: number };
}

interface BlogRow {
  id: string;
  title: string;
  status: string;
  author: string;
  createdAt: string;
  content?: string;
  excerpt?: string | null;
  tags?: string | null;
  featuredImage?: string | null;
  category: { id: string; name: string } | null;
}

interface TestimonialRow {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  isFeatured: boolean;
  avatar: string | null;
  video: string | null;
}

interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface CategoryRow {
  id: string;
  name: string;
  icon: string | null;
  jobCount?: number;
  _count?: { jobs: number; blogs?: number };
}

interface DashboardData {
  stats: Record<string, number>;
  recentJobs: JobRow[];
  recentBlogs: BlogRow[];
  recentMessages: MessageRow[];
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string | number; color: string }) {
  return (
    <Card className="border-border/50">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================
   DASHBOARD TAB
   ============================================================ */
function DashboardTab({ onSwitch }: { onSwitch: (tab: string) => void }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      setData(json);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[1,2,3,4].map(i=><Skeleton key={i} className="h-28 rounded-xl" />)}</div>;

  const s = data?.stats || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Total Jobs" value={s.totalJobs || 0} color="bg-navy/10 text-navy dark:bg-gold/10 dark:text-gold" />
        <StatCard icon={FileText} label="Published Blogs" value={s.publishedBlogs || 0} color="bg-emerald-500/10 text-emerald-600" />
        <StatCard icon={Mail} label="Messages" value={s.unreadMessages || 0} color="bg-amber-500/10 text-amber-600" />
        <StatCard icon={Newspaper} label="Subscribers" value={s.totalNewsletter || 0} color="bg-purple-500/10 text-purple-600" />
        <StatCard icon={TrendingUp} label="Applications" value={s.totalApplications || 0} color="bg-blue-500/10 text-blue-600" />
        <StatCard icon={Star} label="Testimonials" value={s.totalTestimonials || 0} color="bg-gold/10 text-gold-dark" />
        <StatCard icon={Send} label="Published Jobs" value={s.publishedJobs || 0} color="bg-teal-500/10 text-teal-600" />
        <StatCard icon={Users} label="Total Blogs" value={s.totalBlogs || 0} color="bg-rose-500/10 text-rose-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent Jobs</h3>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => onSwitch("jobs")}>View All</Button>
            </div>
            <div className="space-y-3">
              {data?.recentJobs.map((j) => (
                <div key={j.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{j.title}</p>
                    <p className="text-xs text-muted-foreground">{j.location} &middot; {j.employmentType}</p>
                  </div>
                  <Badge variant={j.status === "published" ? "default" : "secondary"} className="text-[10px] ml-2">
                    {j.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent Messages</h3>
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => onSwitch("messages")}>View All</Button>
            </div>
            <div className="space-y-3">
              {data?.recentMessages.map((m) => (
                <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.subject}</p>
                  </div>
                  {!m.isRead && <div className="w-2 h-2 rounded-full bg-gold ml-2 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   JOBS TAB
   ============================================================ */
const DEFAULT_WHATSAPP = "0300-7033832";
const EMPTY_JOB_FORM = {
  title: "", description: "", location: "", employmentType: "Full-time",
  workMode: "On-site", experience: "Mid-level", education: "Bachelor's",
  department: "General", status: "draft" as string, isFeatured: false,
  salaryMin: "", salaryMax: "", responsibilities: "", requirements: "",
  benefits: "", featuredImage: "", whatsapp: DEFAULT_WHATSAPP,
};

function JobsTab() {
  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<JobRow | null>(null);
  const [form, setForm] = useState({ ...EMPTY_JOB_FORM });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy the public shareable link of a job (to post in WhatsApp groups, etc.).
  const copyJobLink = async (job: JobRow) => {
    const url = `${window.location.origin}/jobs/${job.slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers that block the async clipboard API.
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(job.id);
    setTimeout(() => setCopiedId((c) => (c === job.id ? null : c)), 1800);
  };

  const handleBannerUpload = async (file: File) => {
    setFormError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Upload failed");
        return;
      }
      setForm((f) => ({ ...f, featuredImage: data.url }));
    } catch {
      setFormError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      params.set("limit", "200");
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch { /* */ } finally { setLoading(false); }
  }, [search, statusFilter]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSave = async () => {
    setFormError("");
    if (!form.title || !form.description || !form.location) {
      setFormError("Title, description and location are required.");
      return;
    }
    if (!form.featuredImage) {
      setFormError("Banner image is required for every job post.");
      return;
    }
    if (!form.whatsapp || form.whatsapp.trim().length < 5) {
      setFormError("WhatsApp number is required so candidates can apply.");
      return;
    }
    setSaving(true);
    try {
      // Convert salary strings to numbers (or drop them) so they pass API validation.
      const { salaryMin, salaryMax, ...rest } = form;
      const payload: Record<string, unknown> = { ...rest };
      if (salaryMin !== "" && !Number.isNaN(Number(salaryMin))) payload.salaryMin = Number(salaryMin);
      if (salaryMax !== "" && !Number.isNaN(Number(salaryMax))) payload.salaryMax = Number(salaryMax);

      const res = editing
        ? await fetch(`/api/jobs/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setFormError(err.error || "Failed to save job");
        return;
      }
      setDialogOpen(false);
      setEditing(null);
      setForm({ ...EMPTY_JOB_FORM });
      fetchJobs();
    } catch {
      setFormError("Something went wrong. Try again.");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job?")) return;
    await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  const togglePublish = async (job: JobRow) => {
    const newStatus = job.status === "published" ? "draft" : "published";
    await fetch(`/api/jobs/${job.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
    fetchJobs();
  };

  const openEdit = (job: JobRow) => {
    setEditing(job);
    setForm({
      title: job.title,
      description: job.description,
      location: job.location,
      employmentType: job.employmentType,
      workMode: job.workMode,
      experience: job.experience,
      education: job.education,
      department: job.department,
      status: job.status,
      isFeatured: job.isFeatured,
      salaryMin: job.salaryMin != null ? String(job.salaryMin) : "",
      salaryMax: job.salaryMax != null ? String(job.salaryMax) : "",
      responsibilities: job.responsibilities ?? "",
      requirements: job.requirements ?? "",
      benefits: job.benefits ?? "",
      featuredImage: job.featuredImage ?? "",
      whatsapp: job.whatsapp ?? DEFAULT_WHATSAPP,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-1 w-full sm:w-auto">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Job</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit Job" : "Create Job"}</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              {/* Banner image (mandatory) */}
              <div className="space-y-2">
                <Label>Banner Image * <span className="text-xs text-muted-foreground font-normal">(shown on the website card &amp; detail page)</span></Label>
                {form.featuredImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-border/50 group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.featuredImage} alt="Banner preview" className="w-full h-40 object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, featuredImage: "" })}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-gold/50 hover:bg-muted/30 transition-colors">
                    {uploading ? (
                      <Loader2 className="h-6 w-6 text-gold animate-spin" />
                    ) : (
                      <>
                        <ImagePlus className="h-7 w-7 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload banner</span>
                        <span className="text-[10px] text-muted-foreground mt-1">JPG, PNG, WEBP &middot; max 5 MB</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBannerUpload(f); }}
                    />
                  </label>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Job title" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Short Description * <span className="text-xs text-muted-foreground font-normal">(appears under the banner on the card)</span></Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short summary candidates see first" rows={3} /></div>

                {/* WhatsApp apply number (mandatory) */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Number * <span className="text-xs text-muted-foreground font-normal">(candidates apply here)</span></Label>
                  <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="0300-7033832" />
                </div>

                <div className="space-y-2"><Label>Location *</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" /></div>
                <div className="space-y-2"><Label>Department</Label><Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></div>
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={form.employmentType} onValueChange={(v) => setForm({ ...form, employmentType: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Full-time">Full-time</SelectItem><SelectItem value="Part-time">Part-time</SelectItem><SelectItem value="Contract">Contract</SelectItem><SelectItem value="Freelance">Freelance</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Work Mode</Label>
                  <Select value={form.workMode} onValueChange={(v) => setForm({ ...form, workMode: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="On-site">On-site</SelectItem><SelectItem value="Remote">Remote</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Experience</Label>
                  <Select value={form.experience} onValueChange={(v) => setForm({ ...form, experience: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Entry-level">Entry-level</SelectItem><SelectItem value="Mid-level">Mid-level</SelectItem><SelectItem value="Senior">Senior</SelectItem><SelectItem value="Executive">Executive</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Education</Label><Input value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} /></div>
                <div className="space-y-2"><Label>Salary Min (per year)</Label><Input type="number" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} placeholder="e.g. 50000" /></div>
                <div className="space-y-2"><Label>Salary Max (per year)</Label><Input type="number" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} placeholder="e.g. 80000" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-6"><Switch checked={form.isFeatured} onCheckedChange={(c) => setForm({ ...form, isFeatured: c })} /><Label>Featured</Label></div>
              </div>

              {/* Full job details (shown on the detail page) */}
              <div className="space-y-2"><Label>Responsibilities <span className="text-xs text-muted-foreground font-normal">(one per line)</span></Label><Textarea value={form.responsibilities} onChange={(e) => setForm({ ...form, responsibilities: e.target.value })} rows={4} placeholder={"Lead the frontend team\nReview pull requests\n..."} /></div>
              <div className="space-y-2"><Label>Requirements <span className="text-xs text-muted-foreground font-normal">(one per line)</span></Label><Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows={4} placeholder={"5+ years experience\nStrong React skills\n..."} /></div>
              <div className="space-y-2"><Label>Benefits <span className="text-xs text-muted-foreground font-normal">(optional, one per line)</span></Label><Textarea value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} rows={3} placeholder={"Health insurance\nRemote work\n..."} /></div>

              {formError && (
                <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{formError}</div>
              )}
              <Button onClick={handleSave} disabled={saving || uploading} className="w-full bg-navy dark:bg-gold dark:text-navy-dark text-white">{saving ? "Saving..." : editing ? "Update Job" : "Create Job"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50 border-b border-border/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Location</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan={5} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : jobs.map((j) => (
                <tr key={j.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{j.title}</div>
                    <div className="text-xs text-muted-foreground md:hidden">{j.location}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{j.location}</td>
                  <td className="px-4 py-3 hidden lg:table-cell"><Badge variant="outline" className="text-[10px]">{j.employmentType}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={j.status === "published" ? "default" : "secondary"} className="text-[10px]">{j.status}</Badge>
                    {j.isFeatured && <Badge className="ml-1 text-[10px] bg-gold/10 text-gold border-gold/20">Featured</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className={`h-8 w-8 ${copiedId === j.id ? "text-emerald-600" : ""}`} onClick={() => copyJobLink(j)} title="Copy shareable link">
                        {copiedId === j.id ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                      </Button>
                      <a href={`/jobs/${j.slug}`} target="_blank" rel="noopener noreferrer" title="View on site" className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><ExternalLink className="h-3.5 w-3.5" /></a>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(j)} title={j.status === "published" ? "Unpublish" : "Publish"}>
                        {j.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(j)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(j.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && jobs.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No jobs found</div>}
      </div>
    </div>
  );
}

/* ============================================================
   BLOGS TAB
   ============================================================ */
function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BlogRow | null>(null);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", author: "SAJAD Digital Services Team", status: "draft" as string, tags: "", featuredImage: "" });
  const [saving, setSaving] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?limit=200");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const handleSave = async () => {
    if (!form.title || !form.content) return;
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/blogs/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } else {
        await fetch("/api/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      }
      setDialogOpen(false);
      setEditing(null);
      setForm({ title: "", content: "", excerpt: "", author: "SAJAD Digital Services Team", status: "draft", tags: "", featuredImage: "" });
      fetchBlogs();
    } catch { /* */ } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  const togglePublish = async (blog: BlogRow) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    await fetch(`/api/blogs/${blog.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
    fetchBlogs();
  };

  const openEdit = (blog: BlogRow) => {
    setEditing(blog);
    setForm({ title: blog.title, content: blog.content ?? "", excerpt: blog.excerpt ?? "", author: blog.author, status: blog.status, tags: blog.tags ?? "", featuredImage: blog.featuredImage ?? "" });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Blog Posts ({blogs.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Blog</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit Blog" : "Create Blog"}</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <BannerUpload value={form.featuredImage} onChange={(url) => setForm({ ...form, featuredImage: url })} hint="blog cover image (optional)" />
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
              <div className="space-y-2"><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} placeholder="Write your blog content here..." /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Author</Label><Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : editing ? "Update Blog" : "Create Blog"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50 border-b border-border/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Author</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan={5} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : blogs.map((b) => (
                <tr key={b.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{b.title}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{b.author}</td>
                  <td className="px-4 py-3"><Badge variant={b.status === "published" ? "default" : "secondary"} className="text-[10px]">{b.status}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(b)}>{b.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(b)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(b.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && blogs.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No blogs found</div>}
      </div>
    </div>
  );
}

/* ============================================================
   TESTIMONIALS TAB
   ============================================================ */
function TestimonialsTab() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialRow | null>(null);
  const [form, setForm] = useState({ name: "", title: "", company: "", content: "", rating: 5, isFeatured: false, avatar: "", video: "" });
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setItems(data.testimonials || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    if (!form.name || !form.title || !form.company || !form.content) return;
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/testimonials/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } else {
        await fetch("/api/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      }
      setDialogOpen(false);
      setEditing(null);
      setForm({ name: "", title: "", company: "", content: "", rating: 5, isFeatured: false, avatar: "", video: "" });
      fetchItems();
    } catch { /* */ } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const openEdit = (t: TestimonialRow) => {
    setEditing(t);
    setForm({
      name: t.name, title: t.title, company: t.company, content: t.content,
      rating: t.rating, isFeatured: t.isFeatured, avatar: t.avatar ?? "", video: t.video ?? "",
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Testimonials ({items.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Success Story</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <BannerUpload
                label="Photo"
                hint="optional — the student's picture"
                value={form.avatar}
                onChange={(url) => setForm({ ...form, avatar: url })}
                square
                sizeNote="Recommended: 800 × 800 px (1:1 square)"
              />
              <div className="space-y-2">
                <Label>Video Review Link <span className="text-xs text-muted-foreground font-normal">(optional — YouTube / Facebook / TikTok link)</span></Label>
                <Input
                  value={form.video}
                  onChange={(e) => setForm({ ...form, video: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
                <p className="text-xs text-muted-foreground">
                  Video pehle YouTube ya Facebook par upload karein, phir uska link yahan paste karein.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div className="space-y-2"><Label>Company *</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
                <div className="space-y-2"><Label>Rating</Label>
                  <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: parseInt(v) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="5">5 Stars</SelectItem><SelectItem value="4">4 Stars</SelectItem><SelectItem value="3">3 Stars</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Content *</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} /></div>
              <div className="flex items-center gap-2"><Switch checked={form.isFeatured} onCheckedChange={(c) => setForm({ ...form, isFeatured: c })} /><Label>Featured</Label></div>
              <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3">
        {loading ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
          : items.map((t) => (
          <Card key={t.id} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                {t.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 aspect-square rounded-xl object-cover flex-shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.title}, {t.company}</span>
                    {t.isFeatured && <Badge className="text-[10px] bg-gold/10 text-gold border-gold/20">Featured</Badge>}
                    {t.video && <Badge variant="outline" className="text-[10px]">Video</Badge>}
                  </div>
                  <div className="flex gap-0.5 mb-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.content}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(t.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MESSAGES TAB
   ============================================================ */
function MessagesTab() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MessageRow | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    setSelected(null);
    fetchMessages();
  };

  const handleMarkRead = async (msg: MessageRow) => {
    await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: msg.id, isRead: !msg.isRead }) });
    fetchMessages();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Messages ({messages.length})</h3>
        <Button variant="outline" size="sm" onClick={fetchMessages}><RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh</Button>
      </div>

      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 border border-border/50 rounded-xl overflow-hidden max-h-[500px] overflow-y-auto">
          {loading ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16" />)
            : messages.map((m) => (
            <button key={m.id} onClick={() => { setSelected(m); if (!m.isRead) handleMarkRead(m); }} className={`w-full text-left px-4 py-3 border-b border-border/30 hover:bg-muted/50 transition-colors ${selected?.id === m.id ? "bg-muted/50" : ""}`}>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${!m.isRead ? "font-bold" : "font-medium"}`}>{m.name}</span>
                {!m.isRead && <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{m.subject}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(m.createdAt).toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          {selected ? (
            <Card className="border-border/50 h-full">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{selected.subject}</h4>
                    <p className="text-sm text-muted-foreground">{selected.name} &middot; {selected.email}</p>
                    <p className="text-xs text-muted-foreground">{new Date(selected.createdAt).toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(selected.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
                <Separator />
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="border border-border/50 rounded-xl h-full flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CATEGORIES TAB
   ============================================================ */
function CategoriesTab() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [industries, setIndustries] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [type, setType] = useState<"category" | "industry">("category");
  const [form, setForm] = useState({ name: "", icon: "", description: "" });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories((data.categories || []).map((c: CategoryRow & { jobCount: number }) => ({ ...c, _count: { jobs: c.jobCount || 0 } })));
      setIndustries((data.industries || []).map((c: CategoryRow & { jobCount: number }) => ({ ...c, _count: { jobs: c.jobCount || 0 } })));
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async () => {
    if (!form.name) return;
    setSaving(true);
    try {
      await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, type }) });
      setDialogOpen(false);
      setForm({ name: "", icon: "", description: "" });
      fetchData();
    } catch { /* */ } finally { setSaving(false); }
  };

  const handleDelete = async (id: string, t: string) => {
    if (!confirm(`Delete this ${t}?`)) return;
    await fetch(`/api/categories/${id}?type=${t}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      {/* Job Categories */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Job Categories ({categories.length})</h3>
          <Button size="sm" variant="outline" onClick={() => { setType("category"); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
            : categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/50 rounded-xl">
              <div>
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{c._count?.jobs || 0} jobs</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(c.id, "category")}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Industries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Industries ({industries.length})</h3>
          <Button size="sm" variant="outline" onClick={() => { setType("industry"); setDialogOpen(true); }}><Plus className="h-4 w-4 mr-1" /> Add</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)
            : industries.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-3 border border-border/50 rounded-xl">
              <div>
                <span className="text-sm font-medium">{c.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{c._count?.jobs || 0} jobs</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(c.id, "industry")}><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add {type === "industry" ? "Industry" : "Category"}</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            {type === "category" && <div className="space-y-2"><Label>Icon (Lucide name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Code2, Heart, etc." /></div>}
            <div className="space-y-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Create"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ============================================================
   MAIN ADMIN PANEL
   ============================================================ */
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "success-stories", label: "Success Stories", icon: Trophy },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "courses", label: "IT Courses", icon: GraduationCap },
  { id: "services", label: "Services", icon: HeartHandshake },
  { id: "partners", label: "Partners & MoUs", icon: Handshake },
  { id: "team", label: "Team", icon: Users },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "blogs", label: "Blogs", icon: FileText },
  { id: "testimonials", label: "Reviews", icon: Star },
  { id: "messages", label: "Messages", icon: MessageSquare },
];

export function AdminPanel({ open, onClose, onLogout }: { open: boolean; onClose: () => void; onLogout?: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const switchTab = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-background"
        >
          <div className="flex h-screen">
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0, width: collapsed ? 64 : 240 }}
              transition={{ duration: 0.3 }}
              className="bg-navy dark:bg-navy-dark text-white flex-shrink-0 flex flex-col relative overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                {!collapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold">
                    Admin Panel
                  </motion.span>
                )}
                <div className="flex items-center gap-1 ml-auto">
                  <button onClick={() => setCollapsed(!collapsed)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                    <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
                  </button>
                  <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <nav className="admin-scroll flex-1 min-h-0 overflow-y-auto py-3 px-2 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => switchTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gold/20 text-gold"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{tab.label}</span>}
                    </button>
                  );
                })}
              </nav>

              <div className="p-2 border-t border-white/10 space-y-1">
                <button
                  onClick={onClose}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Home className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>View Site</span>}
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300/70 hover:text-red-300 hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span>Logout</span>}
                  </button>
                )}
                {!collapsed && (
                  <div className="text-[10px] text-white/30 text-center pt-2">
                    SAJAD Digital Services Admin v1.0
                  </div>
                )}
              </div>
            </motion.aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <header className="h-14 border-b border-border/50 flex items-center justify-between px-6 flex-shrink-0">
                <h2 className="font-semibold text-lg capitalize">{activeTab.replace(/-/g, " ")}</h2>
                <Badge variant="outline" className="text-[10px]">Admin Mode</Badge>
              </header>

              {/* min-h-0 is what lets this shrink inside the flex column — without it
                  the panel grows to fit its content and the list can never scroll. */}
              <div className="admin-scroll flex-1 min-h-0 overflow-y-auto">
                <div className="p-6 max-w-7xl mx-auto">
                  {activeTab === "dashboard" && <DashboardTab onSwitch={switchTab} />}
                  {activeTab === "success-stories" && <SuccessStoriesTab />}
                  {activeTab === "jobs" && <JobsTab />}
                  {activeTab === "announcements" && <AnnouncementsTab />}
                  {activeTab === "courses" && <CoursesTab />}
                  {activeTab === "services" && <ServicesTab />}
                  {activeTab === "partners" && <PartnersTab />}
                  {activeTab === "team" && <TeamTab />}
                  {activeTab === "gallery" && <GalleryTab />}
                  {activeTab === "blogs" && <BlogsTab />}
                  {activeTab === "testimonials" && <TestimonialsTab />}
                  {activeTab === "messages" && <MessagesTab />}
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}