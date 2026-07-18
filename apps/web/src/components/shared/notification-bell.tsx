'use client';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function NotificationBell({ count = 0 }: { count?: number }) {
  return (
    <button className="relative">
      <Bell size={18} />
      {count > 0 && <Badge className="absolute -top-1 -right-1">{count}</Badge>}
    </button>
  );
}


