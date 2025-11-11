"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  X,
  User,
  ChevronUp,
  ChevronDown,
  LibraryBig,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ButtonSignOut } from "./button-signout";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Projetos", href: "/admin/projects", icon: LibraryBig },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

import { Session } from "@/lib/auth";

interface AdminSidebarProps {
  user: Session["user"];
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-900">
          <h2 className="text-lg font-semibold text-gray-50">Admin Panel</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-50" />
          </Button>
        </div>
        <SidebarContent pathname={pathname} user={user} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col grow bg-background border-r border-neutral-900">
          <div className="flex items-center h-16 px-4 border-b border-neutral-900">
            <h2 className="text-lg font-semibold text-gray-50">Admin Painel</h2>
          </div>
          <SidebarContent pathname={pathname} user={user} />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-4 left-4 z-40"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-gray-50" />
        </Button>
      </div>
    </>
  );
}

function UserMenu({ user }: { user: { name: string; email: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-neutral-800">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-linear-to-br from-neutral-600 to-neutral-800 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-200 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-300 truncate">{user.email}</p>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-300" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-300" />
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className=" w-56 mb-2 ml-4"
          side="top"
          align="start"
        >
          <Link href="/admin/profile">
            <DropdownMenuItem>
              <div className="flex items-center w-full cursor-pointer py-2">
                <button className="flex cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Meu Perfil
                </button>
              </div>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive cursor-pointer" asChild>
            <div className="flex items-center">
              <ButtonSignOut variant="menu" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SidebarContent({
  pathname,
  user,
}: {
  pathname: string;
  user: { name: string; email: string };
}) {
  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-neutral-800 text-gray-50"
                  : "text-gray-400 hover:bg-neutral-600 hover:text-gray-50"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 shrink-0",
                  isActive
                    ? "text-gray-50"
                    : "text-gray-400 group-hover:text-gray-50"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User menu at bottom */}
      <UserMenu user={user} />
    </div>
  );
}
