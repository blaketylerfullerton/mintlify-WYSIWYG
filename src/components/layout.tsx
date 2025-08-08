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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Blakes Mintlify </h1>
            <img src="/favicon.ico" alt="Blakes Mintlify" className="w-6 h-6" />
            <a
              href="https://github.com/blaketylerfullerton/mintlify-WYSIWYG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/github.png" alt="Github" className="w-6 h-6" />
            </a>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
