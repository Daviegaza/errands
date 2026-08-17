import { CalendarClock, CheckCircle2, PackageOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrandCard } from "../../components/cards/ErrandCard";
import { Button, EmptyState, PageHeader, Tabs } from "../../components/ui";
import { errands } from "../../data/mockData";
type JobTab="active"|"upcoming"|"completed";
export function RunnerJobsPage(){const [tab,setTab]=useState<JobTab>("active");const navigate=useNavigate();const jobs=errands.filter(e=>e.status===tab);const counts={active:0,upcoming:0,completed:0};errands.forEach(e=>{if(e.status==="active"||e.status==="upcoming"||e.status==="completed")counts[e.status]++});return <div className="standard-page"><PageHeader eyebrow="Stay on top of every hand-off" title="Your jobs"/><Tabs value={tab} onChange={setTab} options={[{value:"active",label:"Active",count:counts.active},{value:"upcoming",label:"Upcoming",count:counts.upcoming},{value:"completed",label:"Completed",count:counts.completed}]}/>{jobs.length?<div className="activity-grid">{jobs.map(e=><ErrandCard key={e.id} errand={e} runnerView/>)}</div>:<EmptyState icon={tab==="active"?<PackageOpen/>:tab==="upcoming"?<CalendarClock/>:<CheckCircle2/>} title={`No ${tab} jobs`} description="New accepted jobs will appear here with everything you need to complete them." action={<Button onClick={()=>navigate("/runner/nearby")}>Browse nearby errands</Button>}/>}</div>}
