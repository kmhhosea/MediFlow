import { SearchTrigger } from './search-trigger';
import { NotificationBell } from './notification-bell';
import { UserMenu } from './user-menu';

export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <SearchTrigger />
      <div className="flex items-center gap-3">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
