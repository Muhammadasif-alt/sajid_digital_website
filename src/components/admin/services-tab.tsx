"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { BannerUpload } from "./banner-upload";

interface Row {
  id: string;
  title: string;
  slug: string;
  description: string;
  details: string | null;
  eligibility: string;
  icon: string | null;
  featuredImage: string | null;
  whatsapp: string | null;
  isFree: boolean;
  status: string;
  isFeatured: boolean;
  sortOrder: number;
}

const EMPTY = {
  title: "", description: "", details: "", eligibility: "",
  icon: "", featuredImage: "", whatsapp: "0300-7033832", isFree: true, status: "published", isFeatured: false, sortOrder: 0,
};

export function ServicesTab() {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services?limit=100");
      const data = await res.json();
      setItems(data.services || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    setError("");
    if (!form.title || !form.description) { setError("Title and description are required."); return; }
    if (!form.featuredImage) { setError("Banner image is required for every service."); return; }
    setSaving(true);
    try {
      const res = editing
        ? await fetch(`/api/services/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
        : await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.error || "Failed to save"); return; }
      setDialogOpen(false); setEditing(null); setForm({ ...EMPTY }); fetchItems();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const togglePublish = async (r: Row) => {
    const status = r.status === "published" ? "draft" : "published";
    await fetch(`/api/services/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchItems();
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({
      title: r.title, description: r.description, details: r.details ?? "", eligibility: r.eligibility,
      icon: r.icon ?? "", featuredImage: r.featuredImage ?? "", whatsapp: r.whatsapp ?? "0300-7033832",
      isFree: r.isFree, status: r.status, isFeatured: r.isFeatured, sortOrder: r.sortOrder ?? 0,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Services ({items.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm({ ...EMPTY }); setError(""); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Service</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Create"} Service</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Banner Image * <span className="text-xs text-muted-foreground font-normal">— recommended size: 1200 × 630 px</span></Label>
                <p className="text-xs text-muted-foreground mt-0.5">JPG / PNG / WEBP · max 5 MB</p>
              </div>
              <BannerUpload value={form.featuredImage} onChange={(url) => setForm({ ...form, featuredImage: url })} hint="1200 × 630 px · JPG, PNG, WEBP · max 5 MB" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2"><Label>Service Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Free Web Development Training" /></div>
                <div className="space-y-2"><Label>Eligibility</Label><Input value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} placeholder="e.g. Students, Graduates, Job Seekers & Career Aspirants" /></div>
                <div className="space-y-2"><Label>Icon (Lucide name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. GraduationCap / HeartHandshake / Briefcase" /></div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Short Description * <span className="text-xs text-muted-foreground font-normal">(1-2 lines — shown on the card)</span></Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="e.g. Get personalized career guidance to choose the right education, skills, and career path with confidence." />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Full Details <span className="text-xs text-muted-foreground font-normal">(what&apos;s included — one point per line)</span></Label>
                  <Textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={7} placeholder={"Personalized one-on-one career counseling\nEducation and career pathway guidance\nGuidance for choosing the right degree and field\nSkills and career development planning\nJob and employment pathway guidance"} />
                </div>
                <div className="space-y-2"><Label>WhatsApp (Apply)</Label><Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="0300-7033832" /></div>
                <div className="space-y-2"><Label>Display Order <span className="text-xs text-muted-foreground font-normal">(1 = first, 2 = second… 0 = end)</span></Label><Input type="number" min={0} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} placeholder="0" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 sm:col-span-2 rounded-xl border border-border/60 bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-semibold">Free Service</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {form.isFree ? "ON — free service (آپ یہ مفت دے رہے ہیں)" : "OFF — paid service (clients ko pay karna hoga)"}
                      </p>
                    </div>
                    <Switch checked={form.isFree} onCheckedChange={(c) => setForm({ ...form, isFree: c })} />
                  </div>
                  <div className="flex items-center justify-between border-t border-border/40 pt-3">
                    <div>
                      <Label className="font-semibold">Featured <span className="text-xs font-normal text-muted-foreground">(only important services)</span></Label>
                      <p className="text-xs text-muted-foreground mt-0.5">Featured services appear highlighted on the website</p>
                    </div>
                    <Switch checked={form.isFeatured} onCheckedChange={(c) => setForm({ ...form, isFeatured: c })} />
                  </div>
                </div>
              </div>

              {/* Poster reference */}
              <div className="rounded-xl border border-gold/25 bg-gold/5 p-4 text-sm">
                <p className="font-semibold text-gold mb-2">بر صرف یہ رکھیں — Poster Content</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Poster mein sirf yeh likho:<br />
                  <strong>SERVICE NAME</strong> (e.g. CAREER COUNSELING)<br />
                  Guidance • Planning • Growth<br />
                  Sajad Digital Services<br />
                  0315-7033832 | 0300-7033832
                </p>
              </div>
              {error && <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>}
              <Button onClick={handleSave} disabled={saving} className="w-full bg-navy dark:bg-gold dark:text-navy-dark text-white">{saving ? "Saving..." : editing ? "Update" : "Create"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50 border-b border-border/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Order</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Eligibility</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan={5} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : items.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted font-semibold text-xs">{r.sortOrder ?? 0}</span></td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{r.description}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className="text-[10px]">{r.eligibility}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status === "published" ? "default" : "secondary"} className="text-[10px]">{r.status}</Badge>
                    {r.isFree && <Badge className="ml-1 text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Free</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => togglePublish(r)} title={r.status === "published" ? "Unpublish" : "Publish"}>{r.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}</Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(r)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(r.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && items.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No services yet. Click &quot;New Service&quot; to add one.</div>}
      </div>
    </div>
  );
}