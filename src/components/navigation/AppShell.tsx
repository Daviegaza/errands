import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleDollarSign,
  Compass,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Radio,
  ShieldCheck,
  UserRound,
  WalletCards,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import type { Mode } from "../../types";
import { Avatar, cn, IconButton, SegmentedControl } from "../ui";

type NavItem = { label: string; to: string; icon: LucideIcon; featured?: boolean };

const requesterDesktop: NavItem[] = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "Post an Errand", to: "/post", icon: Plus },
  { label: "Activity", to: "/activity", icon: Activity },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "Saved Runners", to: "/saved-runners", icon: Heart },
  { label: "Notifications", to: "/notifications", icon: Bell },
  { label: "Profile", to: "/profile", icon: UserRound },
];

const runnerDesktop: NavItem[] = [
  { label: "Dashboard", to: "/runner", icon: LayoutDashboard },
  { label: "Nearby Errands", to: "/runner/nearby", icon: Compass },
  { label: "Active Jobs", to: "/runner/jobs", icon: BriefcaseBusiness },
  { label: "Messages", to: "/runner/messages", icon: MessageCircle },
  { label: "Earnings", to: "/runner/earnings", icon: WalletCards },
  { label: "Performance", to: "/runner/performance", icon: ChartNoAxesCombined },
  { label: "Profile", to: "/runner/profile", icon: UserRound },
];

const requesterMobile: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Activity", to: "/activity", icon: Activity },
  { label: "Post", to: "/post", icon: Plus, featured: true },
  { label: "Messages", to: "/messages", icon: MessageCircle },
  { label: "Profile", to: "/profile", icon: UserRound },
];

const runnerMobile: NavItem[] = [
  { label: "Home", to: "/runner", icon: Home },
  { label: "Nearby", to: "/runner/nearby", icon: Compass },
  { label: "Jobs", to: "/runner/jobs", icon: BriefcaseBusiness },
  { label: "Messages", to: "/runner/messages", icon: MessageCircle },
  { label: "Earnings", to: "/runner/earnings", icon: CircleDollarSign },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className={cn("brand", compact && "brand-compact")}><span className="brand-mark"><Zap size={19} fill="currentColor" /></span>{!compact && <span>Tuma<small>move life forward</small></span>}</div>;
}

function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const { mode, setMode } = useAppStore();
  const navigate = useNavigate();
  const setRole = (next: Mode) => {
    setMode(next);
    navigate(next === "runner" ? "/runner" : "/");
  };
  if (compact) {
    return <button className="compact-role" onClick={() => setRole(mode === "requester" ? "runner" : "requester")}><Zap size={15} />{mode === "requester" ? "Earn" : "Get help"}</button>;
  }
  return <SegmentedControl value={mode} onChange={setRole} options={[{ value: "requester", label: "Need Help" }, { value: "runner", label: "Earn Money" }]} compact />;
}

export function AppShell({ children }: { children: ReactNode }) {
  const { mode, unreadNotifications } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const desktopItems = mode === "requester" ? requesterDesktop : runnerDesktop;
  const mobileItems = mode === "requester" ? requesterMobile : runnerMobile;
  return (
    <div className={cn("app-shell", (location.pathname === "/" || location.pathname === "/runner") && "app-shell-home")}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar">
        <div className="sidebar-top"><Brand /><RoleSwitcher /></div>
        <nav className="sidebar-nav" aria-label={`${mode} navigation`}>
          <span className="nav-caption">{mode === "requester" ? "Personal" : "Runner workspace"}</span>
          {desktopItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/" || item.to === "/runner"} className={({ isActive }) => cn("nav-item", isActive && "nav-item-active")}><item.icon size={19} /><span>{item.label}</span>{item.label === "Notifications" && unreadNotifications > 0 && <b>{unreadNotifications}</b>}</NavLink>)}
        </nav>
        <button className="sidebar-trust" onClick={() => navigate(mode === "runner" ? "/runner/jobs" : "/activity")}><ShieldCheck size={18} /><div><b>Tuma protection</b><small>Every errand is monitored</small></div><Radio size={14} /></button>
        <div className="sidebar-user"><Avatar initials="AN" size="sm" color="#4B5E52" online /><div><b>Amara N.</b><small>Verified account</small></div><IconButton label="Notifications" onClick={() => navigate("/notifications")}><Bell size={18} /></IconButton></div>
      </aside>

      <header className="mobile-header"><Brand /><div><RoleSwitcher compact /><NavLink to="/notifications" className="mobile-bell" aria-label="Notifications"><Bell size={20} />{unreadNotifications > 0 && <span>{unreadNotifications}</span>}</NavLink></div></header>

      <main className="app-main" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} className="page-stage" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .22, ease: "easeOut" }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="bottom-nav" aria-label={`${mode} mobile navigation`}>
        {mobileItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === "/" || item.to === "/runner"} className={({ isActive }) => cn("bottom-item", isActive && "bottom-item-active", item.featured && "bottom-item-featured")}><span><item.icon size={item.featured ? 23 : 20} /></span><small>{item.label}</small></NavLink>)}
      </nav>
    </div>
  );
}
