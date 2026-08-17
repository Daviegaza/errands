import { motion } from "framer-motion";
import { ArrowRight, Bike, BellRing, CheckCircle2, ChevronRight, Clock3, LocateFixed, MapPin, Navigation, Plus, RefreshCcw, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { categories, errands, runners } from "../../data/mockData";
import { formatKES } from "../../services/mockApi";
import { useAppStore } from "../../store/appStore";
import { Avatar, Badge, Button, Card, IconButton } from "../../components/ui";
import { RunnerCard } from "../../components/cards/RunnerCard";

export function RequesterHome() {
  const navigate = useNavigate(); const { addToast } = useAppStore();
  return <div className="home-page">
    <section className="home-greeting"><div><p>Monday, 17 August</p><h1>Good morning, Amara.</h1><span><MapPin size={15} /> Kilimani, Nairobi <ChevronRight size={14} /></span></div><div className="home-profile"><IconButton label="Notifications" onClick={() => navigate("/notifications")}><BellRing size={19} /></IconButton><Avatar initials="AN" color="#4B5E52" /></div></section>

    <div className="home-command-grid">
      <section className="home-hero">
        <div className="hero-copy"><Badge tone="green" dot>26 runners nearby</Badge><h2>Get it done without going yourself.</h2><p>Tell us what needs moving, buying or collecting. Trusted help is minutes away.</p><button className="hero-search" onClick={() => navigate("/post")}><Search size={20} /><span>What do you need done?</span><i><ArrowRight size={18} /></i></button><div className="hero-actions"><Button size="lg" icon={<Plus size={19} />} onClick={() => navigate("/post")}>Post an errand</Button><button className="location-status"><span><LocateFixed size={17} /></span><b>Using current location</b><small>Kilimani</small></button></div></div>
        <div className="hero-visual" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><motion.div className="hero-pin pin-a" animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 2.8 }}><Bike size={20} /></motion.div><motion.div className="hero-pin pin-b" animate={{ y: [0,5,0] }} transition={{ repeat: Infinity, duration: 3.2 }}><Navigation size={18} /></motion.div><div className="hero-route"><span /><i /><span /></div><div className="availability-card"><div><span className="live-dot" />Available now</div><strong>~ 4 min</strong><small>Average response</small></div></div>
      </section>

      <Card className="active-home-card">
        <div className="section-title"><div><span>Active errand</span><h3>Charger delivery</h3></div><Badge tone="green">In progress</Badge></div>
        <div className="active-runner-row"><Avatar initials="BK" color={runners[0].color} online /><div><b>Brian is on the way</b><span><Clock3 size={14} /> 9 min away</span></div><strong>{formatKES(750)}</strong></div>
        <div className="home-route"><div><span className="route-origin"/><small>Pickup</small><b>Sarit Centre</b></div><i/><div><span className="route-dest"/><small>Drop-off</small><b>Yaya Centre</b></div></div>
        <div className="active-progress"><motion.span initial={{ width: "20%" }} animate={{ width: "66%" }} transition={{ duration: 1.2 }} /></div>
        <div className="active-card-actions"><Button variant="secondary" size="sm" onClick={() => navigate("/messages/brian-kamau")}>Message</Button><Button size="sm" onClick={() => navigate("/tracking/errand-1")}>Track errand</Button></div>
      </Card>
    </div>

    <section className="content-section categories-section"><div className="section-heading"><div><p>Made for everyday life</p><h2>Popular errands</h2></div><button onClick={() => navigate("/post")}>See all <ChevronRight size={16}/></button></div><div className="category-grid">{categories.map((category, index) => <motion.button key={category.name} className="category-tile" onClick={() => { navigate("/post", { state: { category: category.name } }); }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }} whileTap={{ scale: .97 }}><span style={{ background: category.color }}><category.icon size={22} /></span><b>{category.name}</b><ChevronRight size={15} /></motion.button>)}</div></section>

    <div className="home-lower-grid">
      <section className="content-section"><div className="section-heading"><div><p>Your circle</p><h2>Trusted runners</h2></div><button onClick={() => navigate("/saved-runners")}>View saved <ChevronRight size={16}/></button></div><div className="trusted-list">{runners.slice(0,3).map((runner, index) => <RunnerCard key={runner.id} runner={runner} compact recommended={index===0} onAccept={() => navigate(`/runners/${runner.id}`)} />)}</div></section>
      <section className="content-section"><div className="section-heading"><div><p>Quick actions</p><h2>Recently done</h2></div><button onClick={() => navigate("/activity")}>All activity <ChevronRight size={16}/></button></div><Card className="repeat-card"><div className="repeat-icon"><RefreshCcw size={20}/></div><div><Badge tone="neutral">Store Run</Badge><h3>Hardware store pickup</h3><p>Industrial Area <ArrowRight size={13}/> South B</p><span>Last done with Aisha · KES 580</span></div><Button size="sm" variant="secondary" onClick={() => { addToast("Previous details copied."); navigate("/post"); }}>Repeat</Button></Card><Card className="trust-card"><ShieldCheck size={24}/><div><h3>You’re covered on every errand.</h3><p>Verified runners, live activity, secure in-app messaging and 24/7 support.</p></div><IconButton label="Open safety center" onClick={() => addToast("Safety center opened.", "info")}><ChevronRight size={18}/></IconButton></Card>
      </section>
    </div>
  </div>;
}
