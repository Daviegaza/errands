import { BadgeCheck, Heart, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Runner } from "../../types";
import { formatKES } from "../../services/mockApi";
import { useAppStore } from "../../store/appStore";
import { Avatar, Badge, Button, Card, IconButton, Progress } from "../ui";

export function RunnerCard({ runner, recommended = false, onAccept, compact = false }: { runner: Runner; recommended?: boolean; onAccept?: () => void; compact?: boolean }) {
  const navigate = useNavigate();
  const { savedRunnerIds, toggleSavedRunner, addToast } = useAppStore();
  const saved = savedRunnerIds.includes(runner.id);
  return <Card className={`runner-card ${recommended ? "runner-recommended" : ""} ${compact ? "runner-compact" : ""}`} interactive>
    {recommended && <div className="recommend-ribbon">Best match</div>}
    <div className="runner-card-head"><Avatar initials={runner.initials} color={runner.color} size={compact ? "md" : "lg"} online /><div className="runner-name"><h3>{runner.name} {runner.verified && <BadgeCheck size={17} fill="#16C784" />}</h3><p><Star size={14} fill="currentColor" /> {runner.rating} · {runner.completed} errands</p></div><IconButton label={saved ? "Remove saved runner" : "Save runner"} onClick={() => { toggleSavedRunner(runner.id); addToast(saved ? "Removed from saved runners." : "Runner saved."); }}><Heart size={18} fill={saved ? "currentColor" : "none"} /></IconButton></div>
    {!compact && <><div className="runner-meta"><span><small>Arrival</small><b>{runner.eta}</b></span><span><small>Distance</small><b>{runner.distance}</b></span><span><small>Offer</small><b>{formatKES(runner.offer)}</b></span></div><p className="runner-message">“{runner.message}”</p><div className="reliability"><ShieldCheck size={16} /><Progress value={runner.reliability} label="Reliable completion" /></div></>}
    {compact && <div className="runner-compact-meta"><Badge tone="green">{runner.eta} away</Badge><strong>{formatKES(runner.offer)}</strong></div>}
    <div className="runner-actions"><Button variant="ghost" size="sm" onClick={() => navigate(`/runners/${runner.id}`)}>View profile</Button>{!compact && <Button variant="secondary" size="sm" icon={<MessageCircle size={16} />} onClick={() => navigate(`/messages/${runner.id}`)}>Message</Button>}<Button size="sm" onClick={onAccept || (() => navigate(`/runners/${runner.id}`))}>{onAccept ? "Accept offer" : "Choose"}</Button></div>
  </Card>;
}
