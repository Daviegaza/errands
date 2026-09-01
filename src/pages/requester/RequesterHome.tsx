import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  HeartHandshake,
  MapPin,
  MessageCircle,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Button, IconButton } from "../../components/ui";
import { categories, runners } from "../../data/mockData";
import { formatKES } from "../../services/mockApi";
import { useAppStore } from "../../store/appStore";

const suggestions = ["Pick up a package", "Do my weekly shop", "Collect a prescription"];

const categoryNotes = [
  "The weekly list, handled",
  "From there to your door",
  "A quick stop, without the trip",
  "Signed, sealed and delivered",
  "Careful collection when it matters",
  "Fresh clothes, no detour",
  "An extra pair of hands",
  "Tell us what you have in mind",
];

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: .55, delay, ease: [0.2, 0.8, 0.2, 1] as const } }),
};

export function RequesterHome() {
  const navigate = useNavigate();
  const { addToast, updateDraft } = useAppStore();
  const [task, setTask] = useState("");

  const startErrand = (event?: FormEvent) => {
    event?.preventDefault();
    if (task.trim()) updateDraft({ task: task.trim() });
    navigate("/post");
  };

  const useSuggestion = (suggestion: string) => {
    setTask(suggestion);
    updateDraft({ task: suggestion });
  };

  const repeatErrand = () => {
    addToast("Your hardware store errand is ready to review.");
    navigate("/post");
  };

  return (
    <div className="home-page human-home">
      <header className="human-topbar">
        <button className="human-location" type="button" onClick={() => addToast("You’re in Kilimani, Nairobi", "info")}>
          <span><MapPin size={16} /></span>
          <p><small>Right now</small><b>Kilimani, Nairobi</b></p>
          <ChevronRight size={15} />
        </button>
        <div className="human-account-actions">
          <IconButton label="Notifications" onClick={() => navigate("/notifications")}><Bell size={19} /></IconButton>
          <button className="human-avatar-button" type="button" aria-label="Open profile" onClick={() => navigate("/profile")}><Avatar initials="AN" color="#526558" /></button>
        </div>
      </header>

      <main>
        <section className="human-hero">
          <motion.div className="human-hero-copy" initial="hidden" animate="show">
            <motion.div className="neighbour-signal" variants={reveal} custom={0}>
              <span className="signal-dot" /> 17 trusted runners nearby
            </motion.div>
            <motion.h1 variants={reveal} custom={.06}>Your day has<br /><em>enough on it.</em></motion.h1>
            <motion.p className="human-hero-lede" variants={reveal} custom={.12}>Tell us what needs doing. A trusted person nearby can pick it up, drop it off, or sort it out—while you get on with your day.</motion.p>

            <motion.form className="human-task-composer" onSubmit={startErrand} variants={reveal} custom={.18}>
              <Search size={21} />
              <input value={task} onChange={(event) => setTask(event.target.value)} placeholder="What can we take off your plate?" aria-label="Describe your errand" />
              <button type="submit" aria-label="Start your errand"><ArrowRight size={21} /></button>
            </motion.form>

            <motion.div className="human-suggestions" variants={reveal} custom={.22}>
              <span>Popular:</span>
              {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => useSuggestion(suggestion)}>{suggestion}</button>)}
            </motion.div>

            <motion.div className="human-assurance" variants={reveal} custom={.28}>
              <span><ShieldCheck size={17} /> Vetted runners</span>
              <span><MessageCircle size={17} /> Stay in touch</span>
              <span><HeartHandshake size={17} /> You choose who helps</span>
            </motion.div>
          </motion.div>

          <motion.button className="live-errand-story" type="button" onClick={() => navigate("/tracking/errand-1")} initial={{ opacity: 0, scale: .96, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .7, delay: .12, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="story-card-head">
              <div><span className="eyebrow">Happening now</span><h2>Your charger is on its way</h2></div>
              <Badge tone="green" dot>9 min</Badge>
            </div>
            <div className="story-map" aria-hidden="true">
              <i className="story-road road-one" /><i className="story-road road-two" /><i className="story-road road-three" />
              <span className="story-start"><Check size={14} /></span>
              <span className="story-route" />
              <motion.span className="story-runner" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}><Avatar initials="BK" size="sm" color={runners[0].color} online /></motion.span>
              <span className="story-home"><MapPin size={16} /></span>
              <span className="runner-note"><b>Brian</b> is heading your way</span>
            </div>
            <div className="story-route-copy">
              <span><small>Picked up</small><b>Sarit Centre</b></span>
              <i />
              <span><small>Coming to</small><b>Yaya Centre</b></span>
            </div>
            <div className="story-person">
              <Avatar initials="BK" color={runners[0].color} online />
              <span><b>Brian Kamau</b><small><Star size={12} fill="currentColor" /> 4.96 · 328 errands</small></span>
              <strong>{formatKES(750)}</strong>
              <ChevronRight size={18} />
            </div>
          </motion.button>
        </section>

        <motion.section className="home-repeat-strip" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .34 }}>
          <div className="repeat-icon"><RefreshCcw size={19} /></div>
          <p><small>Made life easier last time?</small><b>Repeat your hardware store run</b></p>
          <span>KES 580 · about 40 min</span>
          <Button variant="secondary" size="sm" onClick={repeatErrand}>Do it again <ArrowRight size={15} /></Button>
        </motion.section>

        <section className="human-section category-section-new">
          <div className="human-section-head">
            <div><span className="eyebrow">A little help goes a long way</span><h2>One less thing to think about.</h2></div>
            <button type="button" onClick={() => navigate("/post")}>See every option <ArrowRight size={15} /></button>
          </div>
          <div className="human-category-grid">
            {categories.map((category, index) => (
              <motion.button type="button" key={category.name} onClick={() => navigate("/post", { state: { category: category.name } })} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: Math.min(index * .045, .25) }} whileHover={{ y: -6 }} whileTap={{ scale: .98 }}>
                <span style={{ background: category.color }}><category.icon size={22} /></span>
                <div><b>{category.name}</b><small>{categoryNotes[index]}</small></div>
                <ArrowRight size={17} />
              </motion.button>
            ))}
          </div>
        </section>

        <section className="human-section neighbour-section">
          <div className="human-section-head">
            <div><span className="eyebrow">People nearby, not faceless profiles</span><h2>Meet a few of your neighbours.</h2></div>
            <button type="button" onClick={() => navigate("/saved-runners")}>See all nearby <ArrowRight size={15} /></button>
          </div>
          <div className="neighbour-grid">
            {runners.slice(0, 3).map((runner, index) => (
              <motion.article key={runner.id} className="neighbour-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: index * .08 }}>
                <div className="neighbour-card-top"><Avatar initials={runner.initials} size="lg" color={runner.color} online /><span><b>{runner.name}</b><small><Star size={12} fill="currentColor" /> {runner.rating} · {runner.completed} errands</small></span><Badge tone="green">{runner.eta} away</Badge></div>
                <blockquote>“{runner.message}”</blockquote>
                <div className="neighbour-card-bottom"><span>{runner.specialties.slice(0, 2).join(" · ")}</span><button type="button" onClick={() => navigate(`/runners/${runner.id}`)}>Say hello <ArrowRight size={14} /></button></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="home-closing">
          <div><Sparkles size={24} /><span><small>Tuma makes room for your actual life.</small><h2>What would you rather be doing?</h2></span></div>
          <Button size="lg" onClick={() => navigate("/post")}>Post an errand <ArrowRight size={18} /></Button>
          <p><Clock3 size={16} /> Most errands receive their first offer in under 3 minutes.</p>
        </section>
      </main>
    </div>
  );
}
