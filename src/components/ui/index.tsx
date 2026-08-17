import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, Search, Star, X } from "lucide-react";
import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import { useAppStore } from "../../store/appStore";

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  loading?: boolean;
}

export function Button({ className, variant = "primary", size = "md", icon, loading, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn("btn", `btn-${variant}`, `btn-${size}`, className)}
      type={props.type || "button"}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : icon}
      {children}
    </button>
  );
}

export function IconButton({ label, className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type={props.type || "button"} className={cn("icon-button", className)} aria-label={label} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className, interactive = false, onClick }: { children: ReactNode; className?: string; interactive?: boolean; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={interactive ? { y: -2 } : undefined}
      whileTap={interactive ? { scale: 0.992 } : undefined}
      className={cn("card", interactive && "card-interactive", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, tone = "neutral", dot }: { children: ReactNode; tone?: "neutral" | "green" | "amber" | "red" | "blue" | "dark"; dot?: boolean }) {
  return <span className={cn("badge", `badge-${tone}`)}>{dot && <span className="badge-dot" />}{children}</span>;
}

export function Avatar({ initials, size = "md", color = "#315b4b", online = false }: { initials: string; size?: "sm" | "md" | "lg" | "xl"; color?: string; online?: boolean }) {
  return (
    <span className={cn("avatar", `avatar-${size}`)} style={{ background: `linear-gradient(145deg, ${color}, #101214)` }} aria-label={`Avatar ${initials}`}>
      {initials}
      {online && <span className="online-dot" />}
    </span>
  );
}

export function Input({ label, hint, error, icon, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string; icon?: ReactNode }) {
  return (
    <label className={cn("field", className)}>
      {label && <span className="field-label">{label}</span>}
      <span className="input-wrap">{icon}<input className={cn("input", Boolean(icon) && "input-with-icon", Boolean(error) && "input-error")} {...props} /></span>
      {(hint || error) && <span className={cn("field-hint", error && "text-error")}>{error || hint}</span>}
    </label>
  );
}

export function Textarea({ label, hint, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; hint?: string }) {
  return (
    <label className={cn("field", className)}>
      {label && <span className="field-label">{label}</span>}
      <textarea className="textarea" {...props} />
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <Input icon={<Search size={18} />} aria-label="Search" {...props} />;
}

export function SegmentedControl<T extends string>({ options, value, onChange, compact = false }: { options: { value: T; label: string }[]; value: T; onChange: (value: T) => void; compact?: boolean }) {
  return (
    <div className={cn("segmented", compact && "segmented-compact")} role="tablist">
      {options.map((option) => (
        <button type="button" key={option.value} className={cn("segment", value === option.value && "segment-active")} onClick={() => onChange(option.value)} role="tab" aria-selected={value === option.value}>
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Tabs<T extends string>({ options, value, onChange }: { options: { value: T; label: string; count?: number }[]; value: T; onChange: (value: T) => void }) {
  return (
    <div className="tabs" role="tablist">
      {options.map((option) => (
        <button type="button" key={option.value} onClick={() => onChange(option.value)} className={cn("tab", value === option.value && "tab-active")} role="tab" aria-selected={value === option.value}>
          {option.label}{option.count !== undefined && <span>{option.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" className={cn("switch", checked && "switch-on")} onClick={onChange} role="switch" aria-checked={checked} aria-label={label}><motion.span layout /></button>;
}

export function Progress({ value, label }: { value: number; label?: string }) {
  return <div className="progress-wrap">{label && <div className="progress-label"><span>{label}</span><b>{value}%</b></div>}<div className="progress"><motion.span initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.7 }} /></div></div>;
}

export function Rating({ value, onChange, size = 18 }: { value: number; onChange?: (value: number) => void; size?: number }) {
  return <div className="rating" aria-label={`${value} out of 5 stars`}>{[1,2,3,4,5].map((star) => <button key={star} type="button" disabled={!onChange} aria-label={`${star} stars`} onClick={() => onChange?.(star)}><Star size={size} fill={star <= value ? "currentColor" : "none"} /></button>)}</div>;
}

export function StatCard({ label, value, detail, icon }: { label: string; value: string; detail?: string; icon?: ReactNode }) {
  return <Card className="stat-card"><div className="stat-top"><span>{label}</span>{icon}</div><strong>{value}</strong>{detail && <small>{detail}</small>}</Card>;
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function Skeleton({ className, style }: { className?: string; style?: CSSProperties }) { return <div className={cn("skeleton", className)} style={style} />; }

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  const modalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => modalRef.current?.querySelector<HTMLElement>("button, input, textarea, select, [tabindex]:not([tabindex='-1'])")?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => { window.removeEventListener("keydown", handleKey); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
        <motion.section ref={modalRef} role="dialog" aria-modal="true" aria-label={title} className="modal" initial={{ opacity: 0, y: 28, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 28, scale: .98 }} transition={{ type: "spring", damping: 28, stiffness: 340 }} onMouseDown={(event) => event.stopPropagation()}>
          <div className="sheet-handle" />
          <header className="modal-head"><h2>{title}</h2><IconButton label="Close" onClick={onClose}><X size={20} /></IconButton></header>
          <div className="modal-body">{children}</div>
          {footer && <footer className="modal-footer">{footer}</footer>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  );
}

export function ListRow({ icon, title, detail, onClick, trailing }: { icon?: ReactNode; title: string; detail?: string; onClick?: () => void; trailing?: ReactNode }) {
  return <div className="list-row" onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onClick(); } } : undefined}><span className="list-icon">{icon}</span><span><b>{title}</b>{detail && <small>{detail}</small>}</span>{trailing || <ChevronRight size={18} />}</div>;
}

export function ToastViewport() {
  const { toasts, removeToast } = useAppStore();
  return <div className="toast-viewport" role="status" aria-live="polite"><AnimatePresence>{toasts.map((toast) => <motion.button type="button" key={toast.id} className={cn("toast", `toast-${toast.tone}`)} initial={{ opacity: 0, y: -18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: .96 }} onClick={() => removeToast(toast.id)}><span><Check size={16} /></span>{toast.message}<X size={15} /></motion.button>)}</AnimatePresence></div>;
}

export function PageHeader({ title, eyebrow, action, back }: { title: string; eyebrow?: string; action?: ReactNode; back?: ReactNode }) {
  return <div className="page-header"><div>{back}{eyebrow && <p>{eyebrow}</p>}<h1>{title}</h1></div>{action}</div>;
}
