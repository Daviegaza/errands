import { Check, CircleCheck, MapPinCheck, Navigation, PackageCheck, Route, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../ui";

export const timelineStatuses = [
  { label: "Runner accepted", detail: "10:32 AM", icon: CircleCheck },
  { label: "Heading to pickup", detail: "10:34 AM", icon: Navigation },
  { label: "Arrived at pickup", detail: "10:43 AM", icon: MapPinCheck },
  { label: "Item collected", detail: "10:47 AM", icon: PackageCheck },
  { label: "Errand in progress", detail: "10:49 AM", icon: Route },
  { label: "Near destination", detail: "Estimated 11:06 AM", icon: Navigation },
  { label: "Completed", detail: "Pending", icon: Check },
  { label: "Awaiting your confirmation", detail: "Pending", icon: Sparkles },
];

export function Timeline({ activeStatus, compact = false }: { activeStatus: number; compact?: boolean }) {
  return <div className={cn("timeline", compact && "timeline-compact")}>{timelineStatuses.map((status, index) => {
    const complete = index < activeStatus;
    const active = index === activeStatus;
    const Icon = status.icon;
    return <div key={status.label} className={cn("timeline-item", complete && "timeline-complete", active && "timeline-active")}><div className="timeline-rail"><motion.span animate={active ? { boxShadow: ["0 0 0 0 rgba(22,199,132,.25)", "0 0 0 8px rgba(22,199,132,0)"] } : {}} transition={{ repeat: Infinity, duration: 1.8 }}><Icon size={15} /></motion.span>{index < timelineStatuses.length - 1 && <i />}</div><div><b>{status.label}</b><small>{complete || active ? status.detail : "Next"}</small></div></div>;
  })}</div>;
}
