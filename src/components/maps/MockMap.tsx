import { motion } from "framer-motion";
import { Bike, MapPin, Navigation2 } from "lucide-react";
import { cn } from "../ui";

export function MockMap({ variant = "tracking", className, showSearch = false }: { variant?: "tracking" | "nearby" | "matching"; className?: string; showSearch?: boolean }) {
  const isMatching = variant === "matching";
  return (
    <div className={cn("mock-map", `map-${variant}`, className)} aria-label="Illustrated map of central Nairobi route">
      <div className="map-grid" />
      <div className="map-park map-park-one">Uhuru Park</div>
      <div className="map-park map-park-two">City Park</div>
      <span className="road road-one" /><span className="road road-two" /><span className="road road-three" /><span className="road road-four" />
      <span className="street-label label-one">Waiyaki Way</span><span className="street-label label-two">Ring Road</span><span className="street-label label-three">Argwings Kodhek Rd</span>
      <svg className="route-line" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden="true"><path d="M86 90 C180 100 168 200 285 213 S410 118 520 260" /></svg>
      <MapPin className="pin pickup-pin" size={34} fill="currentColor" />
      <MapPin className="pin destination-pin" size={34} fill="currentColor" />
      <motion.div className="runner-pin runner-main" animate={isMatching ? { scale: [1, 1.14, 1] } : { x: [0, 6, 0], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}><Bike size={17} /></motion.div>
      {(variant === "nearby" || isMatching) && <><div className="runner-pin runner-two"><Navigation2 size={15} /></div><div className="runner-pin runner-three"><Bike size={15} /></div><div className="runner-pin runner-four"><Navigation2 size={15} /></div></>}
      {!isMatching && <div className="map-eta"><span>{variant === "nearby" ? "12 jobs nearby" : "Arriving in"}</span><b>{variant === "nearby" ? "within 5 km" : "9 min"}</b></div>}
      {showSearch && <div className="map-search-pill">Westlands · 5 km radius</div>}
    </div>
  );
}
