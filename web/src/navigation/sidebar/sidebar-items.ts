import {
  Activity,
  Ban,
  BellRing,
  Bot,
  Brain,
  Bug,
  ClipboardList,
  FolderOpen,
  FolderSync,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  Network,
  Plug,
  Radio,
  ScrollText,
  Settings2,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Wrench,
} from "lucide-react";

export type NavBadge = "new" | "soon";

export interface NavSubItem {
  id: string;
  title: string;
  url: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

interface NavItemBase {
  id: string;
  title: string;
  icon?: LucideIcon;
  badge?: NavBadge;
  disabled?: boolean;
  newTab?: boolean;
}

export interface NavMainLinkItem extends NavItemBase {
  url: string;
  subItems?: never;
}

export interface NavMainParentItem extends NavItemBase {
  subItems: NavSubItem[];
}

export type NavMainItem = NavMainLinkItem | NavMainParentItem;

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Features",
    items: [
      { id: "dashboard", title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { id: "chat", title: "Conversation", url: "/chat", icon: MessageSquare },
      { id: "tasks", title: "Task", url: "/function/tasks", icon: Target },
      { id: "findings", title: "Discover", url: "/function/findings", icon: Bug },
      { id: "gross-plan-b", title: "GROSS / PLAN B", url: "/function/gross-plan-b", icon: ClipboardList },
      { id: "traffic", title: "Traffic", url: "/function/traffic", icon: Activity },
      { id: "commands", title: "Tool execution", url: "/function/commands", icon: Terminal },
      { id: "llm-records", title: "LLM Record", url: "/function/llm-records", icon: Radio },
      { id: "assets", title: "Asset", url: "/function/assets", icon: Network },
      { id: "sync", title: "Asset Sync", url: "/function/sync", icon: FolderSync },
      { id: "workspace", title: "Workspace", url: "/function/workspace", icon: FolderOpen },
    ],
  },
  {
    id: 2,
    label: "System",
    items: [
      { id: "llm", title: "LLM", url: "/system/llm", icon: Brain },
      { id: "agents", title: "Agent", url: "/system/agents", icon: Bot },
      { id: "mcp", title: "MCP", url: "/system/mcp", icon: Plug },
      { id: "skills", title: "Skill", url: "/system/skills", icon: Sparkles },
      { id: "tools", title: "Tool", url: "/system/tools", icon: Wrench },
      { id: "notify", title: "Notification push", url: "/system/notify", icon: BellRing },
      { id: "intercept", title: "Intercept rule", url: "/system/intercept", icon: ShieldAlert },
      { id: "asset-intercept", title: "Asset Interception", url: "/system/intercept/assets", icon: Ban },
      { id: "approvals", title: "Approval Records", url: "/system/intercept/approvals", icon: ClipboardList },
      { id: "logs", title: "Logs", url: "/system/logs", icon: ScrollText },
      { id: "settings", title: "System settings", url: "/system/settings", icon: Settings2 },
    ],
  },
];
