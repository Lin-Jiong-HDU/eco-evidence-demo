import Topbar from "@/components/layout/topbar";
import Sidebar from "@/components/layout/sidebar";
import StepIndicator from "@/components/layout/step-indicator";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-warm-white">
          <div className="max-w-6xl mx-auto py-8 px-6">
            {children}
          </div>
        </main>
      </div>
      <StepIndicator />
    </div>
  );
}
