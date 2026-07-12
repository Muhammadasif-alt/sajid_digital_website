"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";

export function BannerUpload({
  value,
  onChange,
  label = "Banner Image",
  required = false,
  hint = "shown on the website card & detail page",
  square = false,
  sizeNote,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  hint?: string;
  /** Preview the image as a 1:1 crop — matches how square photos render on the site. */
  square?: boolean;
  sizeNote?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const box = square ? "w-40 h-40" : "w-full h-40";

  const handleUpload = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && "*"}{" "}
        <span className="text-xs text-muted-foreground font-normal">({hint})</span>
      </Label>
      {value ? (
        <div className={`relative rounded-xl overflow-hidden border border-border/50 ${square ? "w-40" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Banner preview" className={`${box} object-cover`} />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-lg p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className={`${box} flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-gold/50 hover:bg-muted/30 transition-colors`}>
          {uploading ? (
            <Loader2 className="h-6 w-6 text-gold animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-7 w-7 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload</span>
              <span className="text-[10px] text-muted-foreground mt-1 text-center px-2">
                {sizeNote || "JPG, PNG, WEBP · max 5 MB"}
              </span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
            }}
          />
        </label>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
