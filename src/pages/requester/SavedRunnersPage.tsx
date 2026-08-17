import { Heart, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RunnerCard } from "../../components/cards/RunnerCard";
import { Button, EmptyState, PageHeader } from "../../components/ui";
import { runners } from "../../data/mockData";
import { useAppStore } from "../../store/appStore";

export function SavedRunnersPage(){const nav=useNavigate();const {savedRunnerIds}=useAppStore();const saved=runners.filter(r=>savedRunnerIds.includes(r.id));return <div className="standard-page"><PageHeader eyebrow="People you trust" title="Saved runners" action={<Button icon={<Plus size={17}/>} onClick={()=>nav("/post")}>New errand</Button>}/>{saved.length?<div className="saved-grid">{saved.map(runner=><RunnerCard key={runner.id} runner={runner} onAccept={()=>nav("/post")}/>)}</div>:<EmptyState icon={<Heart/>} title="No saved runners yet" description="Save people you trust to find and request them again quickly." action={<Button variant="secondary" icon={<Search size={17}/>} onClick={()=>nav("/")}>Explore runners</Button>}/>}</div>}
