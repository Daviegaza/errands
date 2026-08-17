import { BriefcaseBusiness, CalendarClock, CheckCircle2, PackageOpen } from "lucide-react";
import { useState } from "react";
import { ErrandCard } from "../../components/cards/ErrandCard";
import { Button, EmptyState, PageHeader, Tabs } from "../../components/ui";
import { errands } from "../../data/mockData";
type JobTab="active"|"upcoming"|"completed";
export function RunnerJobsPage(){const [tab,setTab]=useState<JobTab>("active");const jobs=errands.filter(e=>e.status===tab);return <div className="standard-page"><PageHeader eyebrow="Stay on top of every hand-off" title="Your jobs"/><Tabs value={tab} onChange={setTab} options={[{value:"active",label:"Active",count:1},{value:"upcoming",label:"Upcoming",count:1},{value:"completed",label:"Completed",count:1}]}/>{jobs.length?<div className="activity-grid">{jobs.map(e=><ErrandCard key={e.id} errand={e} runnerView/>)}</div>:<EmptyState icon={tab==="active"?<PackageOpen/>:tab==="upcoming"?<CalendarClock/>:<CheckCircle2/>} title={`No ${tab} jobs`} description="New accepted jobs will appear here with everything you need to complete them." action={<Button>Browse nearby errands</Button>}/>}</div>}
