"use client";

import {
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from "react";
import { PostRequest } from "@/utils/PostRequest";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../_context/auth-context"


// Navigation arrays
const topNav = [
  { id: 1, name: 'Accueil', link: '/dashboard', icon: '/home.svg' },
  { id: 2, name: 'Mes Visas', link: '/my-visas', icon: '/calendar.svg' },
  { id: 3, name: 'Documents', link: '/my-docs', icon: '/folder.svg' },
];

export function UserDropdownMenu() {
  interface userInfo {
    name: string;
  }
  const [user, setUser] = useState<userInfo>();
  const router = useRouter();
  const logout = useLogout();

  // bottomNav with logout bound inside
  const bottomNav = [
    { id: 5, name: 'Paramètres', link: '/settings', icon: '/settings.svg' },
    { id: 6, name: 'Déconnecter', action: logout, icon: '/Logout.svg' },
  ];

  useEffect(() => {
    const getUser = async () => {
      const response = await PostRequest('/me', true, {});
      setUser(response);
    };
    getUser();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center border-0 shadow-none">
          <UserAvatar /> {user?.name} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        
        {/* Top nav items */}
        {topNav.map((item) => (
          <DropdownMenuItem key={item.id} asChild>
            <Link href={item.link} className="flex items-center gap-2">
              <img src={item.icon} alt="" className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Bottom nav items */}
        {bottomNav.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={item.action ? item.action : undefined}
            asChild={!item.action}
          >
            {item.link ? (
              <Link href={item.link} className="flex items-center gap-2">
                <img src={item.icon} alt="" className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <img src={item.icon} alt="" className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
