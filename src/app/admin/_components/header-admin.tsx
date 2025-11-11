"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function AdminHeader(/* { user }: AdminHeaderProps */) {
  return (
    <header className="bg-background shadow-sm border-b border-neutral-900 fixed top-0 left-0 right-0 z-30 md:left-64">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div>
          <h3 className="font-medium text-gray-50 lg:flex hidden">LOGO</h3>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-50" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
