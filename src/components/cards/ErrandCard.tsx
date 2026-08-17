import { ArrowUpRight, Clock3, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/mockData";
import { formatKES } from "../../services/mockApi";
import type { Errand } from "../../types";
import { Badge, Button, Card } from "../ui";

export function ErrandCard({ errand, runnerView = false, onRepeat }: { errand: Errand; runnerView?: boolean; onRepeat?: () => void }) {
  const navigate = useNavigate();
  const category = categories.find((item) => item.name === errand.category)!;
  const CategoryIcon = category.icon;
  const tone = errand.urgency === "URGENT" ? "red" : errand.urgency === "SCHEDULED" ? "blue" : "green";
  return <Card className="errand-card" interactive>
    <div className="errand-top"><div className="category-icon" style={{ background: category.color }}><CategoryIcon size={20} /></div><div><Badge tone={tone}>{errand.urgency}</Badge><h3>{errand.title}</h3></div><strong>{formatKES(errand.budget)}</strong></div>
    <div className="mini-route"><span className="route-dot pickup-dot" /><div><small>Pickup</small><p>{errand.pickup}</p></div><span className="route-line-mini" /><span className="route-dot drop-dot" /><div><small>Drop-off</small><p>{errand.destination}</p></div></div>
    <div className="errand-foot"><span><Clock3 size={15} /> {errand.posted}</span><span><MapPin size={15} /> {errand.distance}</span><span><Star size={15} fill="currentColor" /> {errand.requesterRating}</span></div>
    <div className="errand-actions">{onRepeat && <Button variant="ghost" size="sm" onClick={onRepeat}>Repeat errand</Button>}<Button variant={runnerView ? "primary" : "secondary"} size="sm" icon={<ArrowUpRight size={16} />} onClick={() => navigate(runnerView ? `/runner/jobs/${errand.id}` : `/activity/${errand.id}`)}>{runnerView ? "View errand" : "View details"}</Button></div>
  </Card>;
}
