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
  name: string;
  type: string;
  logo: string;
  website: string | null;
  description: string | null;
  status: string;
  sortOrder: number;
}

const EMPTY = {
  name: "", type: "Partner", logo: "", website: "", description: "",
  status: "published", sortOrder: "0",
};

export function PartnersTab() {
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
      const res = await fetch("/api/partners?limit=200");
      const data = await res.json();
      setItems(data.partners || []);
    } catch { /* */ } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    setError("");
    if (!form.name) { setError("Name is required."); return; }
    if (!form.logo) { setError("Logo image is required."); return; }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: form.name, type: form.type, logo: form.logo,
        website: form.website || null, description: form.description || null,
        status: form.status, sortOrder: Number(form.sortOrder) || 0,
      };
      const res = editing
        ? await fetch(`/api/partners/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/partners", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); setError(e.error || "Failed to save"); return; }
      setDialogOpen(false); setEditing(null); setForm({ ...EMPTY }); fetchItems();
    } catch { setError("Something went wrong."); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this partner?")) return;
    await fetch(`/api/partners/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const togglePublish = async (r: Row) => {
    const status = r.status === "published" ? "draft" : "published";
    await fetch(`/api/partners/${r.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchItems();
  };

  const openEdit = (r: Row) => {
    setEditing(r);
    setForm({
      name: r.name, type: r.type, logo: r.logo, website: r.website ?? "",
      description: r.description ?? "", status: r.status, sortOrder: String(r.sortOrder),
    });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Partners &amp; MoUs ({items.length})</h3>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm({ ...EMPTY }); setError(""); } }}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy dark:bg-gold dark:text-navy-dark text-white"><Plus className="h-4 w-4 mr-1" /> New Partner</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Partner / MoU</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <BannerUpload value={form.logo} onChange={(url) => setForm({ ...form, logo: url })} required hint="partner logo (PNG, transparent looks best)" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2"><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. TEVTA" /></div>
                <div className="space-y-2"><Label>Type</Label>
                  <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Partner">Partner</SelectItem><SelectItem value="MoU">MoU</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} placeholder="0" /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Website (optional)</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." /></div>
                <div className="space-y-2 sm:col-span-2"><Label>Description (optional)</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} placeholder="Short note about this partnership / MoU" /></div>
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              {error && <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>}
              <Button onClick={handleSave} disabled={saving} className="w-full bg-navy dark:bg-gold dark:text-navy-dark text-white">{saving ? "Saving..." : editing ? "Update" : "Add"}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50 border-b border-border/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Partner</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {loading ? Array.from({ length: 4 }).map((_, i) => <tr key={i}><td colSpan={4} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td></tr>)
                : items.map((r) => (
                <tr key={r.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.logo} alt={r.name} className="h-9 w-9 object-contain rounded bg-white border border-border/50" />
                      <div className="font-medium">{r.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{r.type}</td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status === "published" ? "default" : "secondary"} className="text-[10px]">{r.status}</Badge>
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
        {!loading && items.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No partners yet. Click &quot;New Partner&quot; to add one.</div>}
      </div>
    </div>
  );
}