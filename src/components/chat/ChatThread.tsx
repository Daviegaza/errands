import { AnimatePresence, motion } from "framer-motion";
import { Image, MapPin, Mic, Navigation, Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/appStore";
import { IconButton } from "../ui";

export function ChatThread({ recipientName = "Brian" }: { recipientName?: string }) {
  const { messages, addMessage, addToast } = useAppStore();
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);
  const send = () => {
    if (!text.trim()) return;
    const sent = text.trim();
    addMessage({ id: String(Date.now()), sender: "me", text: sent, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
    setText(""); addToast("Message sent."); setTyping(true);
    window.setTimeout(() => { setTyping(false); addMessage({ id: String(Date.now() + 1), sender: "runner", text: sent.toLowerCase().includes("where") ? "I’m on Ring Road, about 7 minutes away." : "Got it — I’ll keep you updated.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }); }, 1600);
  };
  const sendSpecial = (type: "image" | "location" | "voice") => {
    const copy = type === "image" ? "Photo attached" : type === "location" ? "Shared live location" : "Voice note · 0:08";
    addMessage({ id: String(Date.now()), sender: "me", text: copy, time: "Now", type }); addToast(`${copy}.`);
  };
  return <div className="chat-thread">
    <div className="messages-scroll">
      <div className="chat-date">Today</div>
      <AnimatePresence initial={false}>{messages.map((message) => message.sender === "system" ? <motion.div key={message.id} className="system-event" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{message.text}<small>{message.time}</small></motion.div> : <motion.div key={message.id} className={`message-row ${message.sender === "me" ? "message-me" : "message-them"}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><div className={`message-bubble bubble-${message.type || "text"}`}>{message.type === "location" && <div className="location-preview"><Navigation size={20} /><span>Live location</span></div>}{message.type === "voice" && <div className="voice-wave"><span/><span/><span/><span/><span/><span/><span/></div>}{message.type === "image" && <div className="image-preview"><Image size={28} /></div>}<p>{message.text}</p><small>{message.time}{message.sender === "me" && " · Read"}</small></div></motion.div>)}</AnimatePresence>
      {typing && <motion.div className="typing-bubble" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}><span/><span/><span/></motion.div>}
      <div ref={endRef} />
    </div>
    <div className="chat-composer"><div className="composer-tools"><IconButton label="Add image" onClick={() => sendSpecial("image")}><Image size={19} /></IconButton><IconButton label="Share location" onClick={() => sendSpecial("location")}><MapPin size={19} /></IconButton></div><div className="composer-input"><input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={`Message ${recipientName}…`} aria-label="Message" /><Smile size={19} /></div>{text ? <IconButton label="Send message" className="send-button" onClick={send}><Send size={18} /></IconButton> : <IconButton label="Record voice note" className="send-button" onClick={() => sendSpecial("voice")}><Mic size={19} /></IconButton>}</div>
  </div>;
}
