import { motion } from "framer-motion";
import { Check, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { formatKES } from "../../services/mockApi";
import { useAppStore } from "../../store/appStore";
import { Button, Modal, Rating, Textarea, cn } from "../ui";

const tags = ["Fast", "Professional", "Friendly", "Great communication", "Careful handling"];

export function CompletionModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0); const [selected, setSelected] = useState<string[]>([]); const [submitted, setSubmitted] = useState(false);
  const { selectedRunner, addToast } = useAppStore();
  useEffect(() => { if (!open) { const reset = window.setTimeout(() => { setRating(0); setSelected([]); setSubmitted(false); }, 300); return () => window.clearTimeout(reset); } }, [open]);
  const submit = () => { if (!rating) { addToast("Choose a star rating first.", "warning"); return; } setSubmitted(true); addToast("Rating submitted. Thank you!"); };
  return <Modal open={open} onClose={onClose} title={submitted ? "Thank you" : "Errand completed"} footer={!submitted && <Button size="lg" className="w-full" onClick={submit}>Submit rating</Button>}>
    {submitted ? <div className="success-state"><motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 250 }}><Check size={34} /></motion.div><PartyPopper size={22} /><h3>That’s all sorted.</h3><p>Your feedback helps keep Tuma trusted for everyone.</p><Button variant="secondary" onClick={onClose}>Back to activity</Button></div> : <div className="rating-flow"><div className="completion-summary"><span>Runner</span><b>{selectedRunner?.name || "Brian Kamau"}</b><span>Agreed price</span><b>{formatKES(selectedRunner?.offer || 750)}</b></div><div className="experience"><h3>How was your experience?</h3><p>Your rating stays private until both sides have reviewed.</p><Rating value={rating} onChange={setRating} size={31} /></div><div className="rating-tags">{tags.map((tag) => <button key={tag} className={cn(selected.includes(tag) && "selected")} onClick={() => setSelected(selected.includes(tag) ? selected.filter((item) => item !== tag) : [...selected, tag])}>{tag}</button>)}</div><Textarea label="Add a note (optional)" placeholder="What stood out about this errand?" rows={3} /></div>}
  </Modal>;
}
