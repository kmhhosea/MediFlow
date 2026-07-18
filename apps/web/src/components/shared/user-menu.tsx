'use client';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/ui/avatar';
import { useSession, signOut } from '@/lib/auth-client';

export function UserMenu() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger><Avatar /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{session?.user.name}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
