"use client";

import { useRouter } from "next/navigation";
import { AdminPanel } from "./admin-panel";

export function AdminDashboard() {
  const router = useRouter();

  const goToSite = () => {
    router.push("/");
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return <AdminPanel open={true} onClose={goToSite} onLogout={handleLogout} />;
}
