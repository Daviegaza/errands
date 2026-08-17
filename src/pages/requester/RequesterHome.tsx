import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Edit3,
  MapPin,
  MoreHorizontal,
  RefreshCcw,
  Search,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, Card, IconButton } from "../../components/ui";
import { categories, runners } from "../../data/mockData";
import { formatKES } from "../../services/mockApi";
import { useAppStore } from "../../store/appStore";

export function RequesterHome() {
  const navigate = useNavigate();
  const { addToast } = useAppStore();

  const repeatErrand = () => {
    addToast("Previous errand details copied.");
    navigate("/post");
  };

  return (
    <div className="home-page requester-dashboard">
      <header className="requester-topbar">
        <button className="requester-location" type="button" onClick={() => addToast("Current location: Kilimani, Nairobi", "info")}>
          <MapPin size={15} />
          <span><small>Your location</small><b>Kilimani, Nairobi</b></span>
          <ChevronRight size={15} />
        </button>
        <div className="requester-account-actions">
          <IconButton label="Notifications" onClick={() => navigate("/notifications")}><Bell size={19} /></IconButton>
          <button className="requester-avatar-button" type="button" aria-label="Open profile" onClick={() => navigate("/profile")}><Avatar initials="AN" color="#38584b" /></button>
        </div>
      </header>

      <div className="requester-layout">
        <main className="requester-primary">
          <section className="requester-intro">
            <p>Hello, Amara <span aria-hidden="true">👋</span></p>
            <h1>Get it done<br /><span>without going yourself.</span></h1>
          </section>

          <button className="requester-search" type="button" onClick={() => navigate("/post")}>
            <Search size={19} />
            <span>What do you need done today?</span>
            <i><ArrowRight size={17} /></i>
          </button>

          <div className="requester-quick-actions" aria-label="Quick actions">
            <button type="button" onClick={() => navigate("/post")}><span><Edit3 size={17} /></span><div><b>Post an errand</b><small>Start a new request</small></div><ChevronRight size={16} /></button>
            <button type="button" onClick={repeatErrand}><span><RefreshCcw size={17} /></span><div><b>Quick repeat</b><small>Hardware store run</small></div><ChevronRight size={16} /></button>
          </div>

          <section className="home-block category-block">
            <div className="compact-heading"><h2>Popular errands</h2><button type="button" onClick={() => navigate("/post")}>View all</button></div>
            <div className="reference-category-grid">
              {categories.map((category, index) => (
                <motion.button
                  type="button"
                  key={category.name}
                  onClick={() => navigate("/post", { state: { category: category.name } })}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span style={{ background: category.color }}><category.icon size={19} /></span>
                  <b>{category.name}</b>
                </motion.button>
              ))}
            </div>
          </section>

          <section className="home-block nearby-strip">
            <div className="compact-heading"><h2>Nearby runners</h2><button type="button" onClick={() => navigate("/saved-runners")}>12 available now</button></div>
            <div className="runner-face-row">
              <div className="runner-faces">{runners.map((runner) => <button type="button" key={runner.id} aria-label={`View ${runner.name}`} onClick={() => navigate(`/runners/${runner.id}`)}><Avatar initials={runner.initials} size="sm" color={runner.color} online /></button>)}</div>
              <div><UsersRound size={16} /><span><b>4.9 average rating</b><small>Most reply in under 3 minutes</small></span></div>
              <IconButton label="More nearby runners" onClick={() => navigate("/saved-runners")}><MoreHorizontal size={18} /></IconButton>
            </div>
          </section>

          <section className="home-block recent-home-block">
            <div className="compact-heading"><h2>Recent activity</h2><button type="button" onClick={() => navigate("/activity")}>View all</button></div>
            <Card className="reference-activity-card" interactive onClick={() => navigate("/tracking/errand-1")}>
              <Avatar initials="BK" color={runners[0].color} online />
              <div><small>In progress</small><h3>Laptop charger pickup</h3><p>Brian K. · 9 min away</p></div>
              <strong>{formatKES(750)}</strong>
              <ChevronRight size={17} />
            </Card>
          </section>
        </main>

        <aside className="requester-side">
          <Card className="reference-active-card">
            <div className="reference-active-head"><div><Badge tone="green" dot>Runner on the way</Badge><h2>Charger delivery</h2><p>Live tracking is active</p></div><span><Clock3 size={16} /> 9 min</span></div>
            <div className="reference-map-preview" aria-hidden="true"><span className="map-street street-one" /><span className="map-street street-two" /><span className="map-street street-three" /><div className="reference-map-ring"><MapPin size={17} /></div><div className="runner-map-dot"><Avatar initials="BK" size="sm" color={runners[0].color} /></div></div>
            <div className="reference-route-row"><span><i className="route-origin" /><small>Pickup</small><b>Sarit Centre</b></span><em /><span><i className="route-dest" /><small>Drop-off</small><b>Yaya Centre</b></span></div>
            <div className="reference-runner-row"><Avatar initials="BK" color={runners[0].color} online /><div><b>Brian Kamau</b><span><Star size={13} fill="currentColor" /> 4.96 · 328 errands</span></div><strong>{formatKES(750)}</strong></div>
            <div className="reference-card-actions"><Button variant="secondary" onClick={() => navigate("/messages/brian-kamau")}>Message</Button><Button onClick={() => navigate("/tracking/errand-1")}>Track errand</Button></div>
            <div className="reference-protection"><ShieldCheck size={16} /><span><b>Protected by Tuma</b><small>Live monitoring and secure chat</small></span><CheckCircle2 size={16} /></div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
