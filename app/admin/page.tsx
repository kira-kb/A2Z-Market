import AdminSidebar from "@/components/adminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function AdminPage() {
  return (
    <SidebarProvider>
      <div className="">
        <AdminSidebar className="z-0 my-16" />

        <SidebarTrigger className="fixed left-0 top-0 mt-16" />
      </div>
      <div className="p-0 flex-1 m-0 text-left">admin page</div>
    </SidebarProvider>
  );
}

export default AdminPage;
