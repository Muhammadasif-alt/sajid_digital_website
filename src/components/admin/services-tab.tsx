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
}

const ELIGIBILITY = ["Disabled persons", "Govt employees", "Disabled persons & Govt employees", "Everyone", "Students"];

const EMPTY = {
  title: "", description: "", details: "", eligibility: "Disabled persons & Govt employees",
  icon: "", featuredImage: "", whatsapp: "0300-7033832", isFree: true, status: "draft", isFeatured: false,
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
      isFree: r.isFree, status: r.status, isFeatured: r.isFeatured,
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
              <BannerUpload value={form.featuredImage} onChange={(url) => setForm({ ...form, featuredImage: url })} hint="optional service image" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2"><Label>Service Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Free Web Development Training" /></div>
                <div className="space-y-2"><Label>Eligibility</Label>
                  <Select value={form.eligibility} onValueChange={(v) => setForm({ ...form, eligibility: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{ELIGIBILITY.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Icon (Lucide name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. HeartHandshake" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Short Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="One-line summary" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Full Details</Label><Textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} rows={4} placeholder="What's included, how to avail, MOU info (one point per line)" /></div>
                <div className="space-y-2"><Label>WhatsApp (apply)</Label><Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="0300-7033832" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-center gap-2 pt-6"><Switch checked={form.isFree} onCheckedChange={(c) => setForm({ ...form, isFree: c })} /><Label>Free Service</Label></div>
                <div className="space-y-2 flex items-center gap-2"><Switch checked={form.isFeatured} onCheckedChange={(c) => setForm({ ...form, isFeatured: c })} /><Label>Featured</Label></div>
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
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Service</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Eligibility</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : items.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
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