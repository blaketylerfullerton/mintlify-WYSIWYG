import { Folder, FileText, ChevronDown, ChevronRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "../components/ui/sidebar";
import { useState, useMemo } from "react";
import { getAllFolders, getFilesByFolder } from "../lib/initialFileContents";
import { VersionSwitcher } from "./version-switcher";
interface AppSidebarProps {
  currentFile?: string;
  onFileSelect?: (fileName: string) => void;
}

export function AppSidebar({ currentFile, onFileSelect }: AppSidebarProps) {
  // Generate file tree from the configurations
  const fileTree = useMemo(() => {
    const folders = getAllFolders();
    return folders.map((folder) => ({
      folder,
      files: getFilesByFolder(folder).map((config) => ({
        name: config.path.split("/").pop() || "",
        title: config.title,
      })),
    }));
  }, []);

  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
    () => {
      // Initialize all folders as open by default
      const initialState: { [key: string]: boolean } = {};
      fileTree.forEach((group) => {
        initialState[group.folder] = true;
      });
      return initialState;
    }
  );

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  const handleFileClick = (fileName: string) => {
    onFileSelect?.(fileName);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <VersionSwitcher
          names={["OpenAI", "Claude", "Gemini"]}
          defaultName={"OpenAI"}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {fileTree.map((group) => {
                const isOpen = openFolders[group.folder];
                return (
                  <div key={group.folder}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => toggleFolder(group.folder)}
                      >
                        {isOpen ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                        <Folder size={16} />
                        <span className="ml-1">{group.folder}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {isOpen && (
                      <div className="ml-6">
                        {group.files.map((file) => (
                          <SidebarMenuItem key={file.name}>
                            <SidebarMenuButton
                              onClick={() => handleFileClick(file.name)}
                              className={`cursor-pointer ${
                                currentFile === file.name
                                  ? "bg-accent text-accent-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground"
                              }`}
                            >
                              <FileText size={16} />
                              <div className="ml-1 flex flex-col items-start">
                                <span className="text-sm">{file.name}</span>
                              </div>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
