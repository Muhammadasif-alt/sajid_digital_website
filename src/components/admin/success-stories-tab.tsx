"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { BannerUpload } from "./banner-upload";

interface Row {
  id: string;
  title: string;
  description: string;
  image: string | null;
  status: string;
  sortOrder: number;
}

const EMPTY = { title: "", description: "", image: "", status: "published", sortOrder: 0 };

export function SuccessStoriesTab() {
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
      const res = await fetch("/api/success-stories?limit=200");
      const data = await res.json();
      setItems(data.stories || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    setError("");
    if (!form.title || !form.description) { setError("Title and description are required."); return; }
    setSaving(true);
    try {
      // Editing an untouched image sends the proxy URL back; the API guard keeps
      // the stored image. A fresh data URI (new upload) is saved as-is.
      const payload = {
        title: form.title,
        description: form.description,
        image: form.image || null,
        status: form.status,
        sortOrder: Number(form.sortOrder) || 0,
      };
      const res = editing
        ? await fetch(`/api/success-stories/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/success-stories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.error || "Failed to save"); return; }
      setDialogOpen(false); setEditing(null); setForm({ ...EMPTY }); fetchItems();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this success story?")) return;
    await fetch(`/api/success-stories/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const togglePublish = async (r: Row) => {
    const status = r.status === "published" ? "draft" : "published";
    await fetch(`/api/success-stories/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchItems();
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({ title: r.title, description: r.description, image: r.image ?? "", status: r.status, sortOrder: r.sortOrder ?? 0 });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Success Stories ({items.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm({ ...EMPTY }); setError(""); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Story</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Success Story</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <BannerUpload
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
                label="Image"
                hint="optional — a photo for the story"
              />
              <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Ali got selected in Rescue 1122" /></div>
              <div className="space-y-2"><Label>Description *</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} placeholder="Tell the story — how SDS helped, what the result was." /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Display Order <span className="text-xs text-muted-foreground font-normal">(1 = top, leave 0 to add at the end)</span></Label><Input type="number" min={0} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) || 0 })} placeholder="0" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent>
                  </Select>
                </div>
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
              <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Image</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Story</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 3 }).map((_, i) => <tr key={i}><td colSpan={5} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : items.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3"><span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted font-semibold text-xs">{r.sortOrder ?? 0}</span></td>
                  <td className="px-4 py-3">
                    {r.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image} alt={r.title} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{r.description}</div>
                  </td>
                  <td className="px-4 py-3"><Badge variant={r.status === "published" ? "default" : "secondary"} className="text-[10px]">{r.status}</Badge></td>
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
        {!loading && items.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No success stories yet. Click &quot;New Story&quot; to add one.</div>}
      </div>
    </div>
  );
}
