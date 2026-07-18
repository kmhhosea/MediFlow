import { DashboardSidebar } from '@/components/shared/dashboard-sidebar';
import { Topbar } from '@/components/shared/topbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[240px_1fr] h-screen">
      <DashboardSidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
