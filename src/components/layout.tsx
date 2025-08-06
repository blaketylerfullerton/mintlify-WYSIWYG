import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
  currentFile?: string;
  onFileSelect?: (fileName: string) => void;
}

export default function Layout({
  children,
  currentFile,
  onFileSelect,
}: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar currentFile={currentFile} onFileSelect={onFileSelect} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
