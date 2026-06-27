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
import { Plus, Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";
import { BannerUpload } from "./banner-upload";

interface Row {
  id: string;
  title: string;
  slug: string;
  organization: string;
  sector: string;
  location: string;
  description: string;
  details: string;
  officialLink: string | null;
  featuredImage: string;
  whatsapp: string | null;
  lastDate: string | null;
  status: string;
  isFeatured: boolean;
}

const EMPTY = {
  title: "", organization: "", sector: "Government", location: "Pakistan",
  description: "", details: "", officialLink: "", featuredImage: "",
  whatsapp: "0300-7033832", lastDate: "", status: "draft", isFeatured: false,
};

export function AnnouncementsTab() {
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
      const res = await fetch("/api/announcements?limit=100");
      const data = await res.json();
      setItems(data.announcements || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    setError("");
    if (!form.title || !form.organization || !form.description || !form.details) {
      setError("Title, organization, description and details are required.");
      return;
    }
    if (!form.featuredImage) { setError("Banner image is required."); return; }
    setSaving(true);
    try {
      const payload = { ...form, lastDate: form.lastDate || undefined };
      const res = editing
        ? await fetch(`/api/announcements/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/announcements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.error || "Failed to save"); return; }
      setDialogOpen(false); setEditing(null); setForm({ ...EMPTY }); fetchItems();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const togglePublish = async (r: Row) => {
    const status = r.status === "published" ? "draft" : "published";
    await fetch(`/api/announcements/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchItems();
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({
      title: r.title, organization: r.organization, sector: r.sector, location: r.location,
      description: r.description, details: r.details, officialLink: r.officialLink ?? "",
      featuredImage: r.featuredImage, whatsapp: r.whatsapp ?? "0300-7033832",
      lastDate: r.lastDate ? r.lastDate.slice(0, 10) : "", status: r.status, isFeatured: r.isFeatured,
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Job Announcements ({items.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm({ ...EMPTY }); setError(""); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Announcement</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Create"} Announcement</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <BannerUpload value={form.featuredImage} onChange={(url) => setForm({ ...form, featuredImage: url })} required hint="govt/private job banner" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Punjab Police Jobs 2026" /></div>
                <div className="space-y-2"><Label>Organization *</Label><Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="e.g. Punjab Police" /></div>
                <div className="space-y-2"><Label>Sector</Label>
                  <Select value={form.sector} onValueChange={(v) => setForm({ ...form, sector: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Government">Government</SelectItem><SelectItem value="Private">Private</SelectItem><SelectItem value="Semi-Government">Semi-Government</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Lahore, Punjab" /></div>
                <div className="space-y-2"><Label>Last Date to Apply</Label><Input type="date" value={form.lastDate} onChange={(e) => setForm({ ...form, lastDate: e.target.value })} /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Short Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="One-line summary shown on the card" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Full Details *</Label><Textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={6} placeholder="Eligibility, posts, how to apply, etc. (one point per line)" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Official Announcement Link</Label><Input value={form.officialLink} onChange={(e) => setForm({ ...form, officialLink: e.target.value })} placeholder="https://... (govt source / ad image)" /></div>
                <div className="space-y-2"><Label>WhatsApp (for help)</Label><Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="0300-7033832" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-6"><Switch checked={form.isFeatured} onCheckedChange={(c) => setForm({ ...form, isFeatured: c })} /><Label>Featured</Label></div>
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
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Sector</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : items.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.organization} &middot; {r.location}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell"><Badge variant="outline" className="text-[10px]">{r.sector}</Badge></td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status === "published" ? "default" : "secondary"} className="text-[10px]">{r.status}</Badge>
                    {r.isFeatured && <Badge className="ml-1 text-[10px] bg-gold/10 text-gold border-gold/20">Featured</Badge>}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/announcements/${r.slug}`} target="_blank" rel="noopener noreferrer" title="View on site" className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-muted"><ExternalLink className="h-3.5 w-3.5" /></a>
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
        {!loading && items.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No announcements yet. Click &quot;New Announcement&quot; to add one.</div>}
      </div>
    </div>
  );
}