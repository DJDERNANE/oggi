"use client"
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserAvatar } from "./UserAvatar"
import { ChevronDown, Bell } from 'lucide-react';
import { useEffect, useState } from "react"
import { PostRequest } from "@/utils/PostRequest"
import useLogout from "@/hooks/useLogout"
import { RemoveToken } from "@/utils/RemoveToken"
import { useRouter } from "next/navigation"
  
export function UserDropdownMenu() {
  interface userInfo {
    name: string
  }
  const [user, setUser] = useState<userInfo>();
  const router = useRouter();
  const logout = useLogout();

  useEffect(() => {
    const getUser = async () => {
      const response = await PostRequest('/me', true, {});
      console.log(response);
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
    
        <DropdownMenuItem onClick={logout}> {/* Use the returned function here */}
          <LogOut />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

  