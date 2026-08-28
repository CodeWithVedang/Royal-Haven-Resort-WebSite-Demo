import { site } from "@/lib/site";

/**
 * The single integration point for mapping.
 *
 * With `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` set, this renders the Maps Embed API
 * iframe. Without it — the demo default — it draws the illustrated map below.
 * No placeholder keys, and nothing here pretends to be live.
 */
export function MapPanel({ className }: { className?: string }) {
  const key = site.integrations.googleMapsApiKey;
  const { lat, lng } = site.contact.coordinates;

  if (key) {
    return (
      <div className={className}>
        <iframe
          title={`Map showing ${site.brand.fullName}, Udaipur`}
          src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=13`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      </div>
    );
  }

  return <IllustratedMap className={className} />;
}

/** Hand-drawn Udaipur: the lakes, the ridge, the road in, and us. */
function IllustratedMap({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 600 420"
        role="img"
        aria-label="Illustrated map of Udaipur showing Royal Haven Resort west of Lake Pichola, with the City Palace, Fateh Sagar and Udaipur Airport"
        className="h-full w-full"
      >
        <rect width="600" height="420" fill="#ece3d5" />

        {/* Aravalli ridges */}
        <g fill="none" stroke="#d9ccb8" strokeWidth="1.25">
          <path d="M-10 96 L58 54 L104 82 L150 44 L214 88 L268 58 L318 92" />
          <path d="M-10 132 L44 104 L96 130 L148 96 L196 128 L252 100 L306 134 L352 108" />
          <path d="M420 44 L468 18 L516 48 L562 22 L610 52" />
        </g>

        {/* Lake Fateh Sagar */}
        <path
          d="M120 150 C168 128 214 140 226 176 C238 212 206 238 166 236 C122 234 96 208 100 182 C102 164 108 156 120 150 Z"
          fill="#dfe6e2"
          stroke="#c9d2cd"
        />
        {/* Lake Pichola */}
        <path
          d="M300 214 C356 196 424 214 444 258 C464 302 428 350 366 356 C302 362 262 330 258 292 C254 256 272 226 300 214 Z"
          fill="#dfe6e2"
          stroke="#c9d2cd"
        />
        <text x="152" y="196" className="map-label" fill="#7d8b84">
          Fateh Sagar
        </text>
        <text x="332" y="292" className="map-label" fill="#7d8b84">
          Lake Pichola
        </text>

        {/* Roads */}
        <g fill="none" stroke="#c8b795" strokeWidth="2.5" strokeLinecap="round">
          <path d="M96 300 C168 288 214 306 268 322 C330 340 402 336 470 306 C520 284 556 246 580 196" />
          <path d="M188 108 C196 168 176 236 150 300 C132 344 118 380 112 412" />
          <path d="M470 306 C500 336 528 366 548 396" strokeWidth="1.5" strokeDasharray="5 6" />
        </g>

        {/* City Palace + old city */}
        <g stroke="#b9a68a" fill="none">
          <rect x="352" y="238" width="46" height="30" fill="#e3d8c2" />
          <path d="M352 238 L375 224 L398 238" fill="#e3d8c2" />
          <path d="M363 268 L363 250 M387 268 L387 250" />
        </g>
        <text x="404" y="252" className="map-label" fill="#6b6154">
          City Palace
        </text>
        <text x="404" y="268" className="map-label-sm" fill="#a99a86">
          25 min
        </text>

        {/* Airport */}
        <g stroke="#b9a68a" fill="none" strokeWidth="1.5">
          <path d="M528 168 L556 158 M542 150 L542 176" />
          <circle cx="542" cy="163" r="15" strokeDasharray="3 5" />
        </g>
        <text x="500" y="200" className="map-label" fill="#6b6154">
          Udaipur Airport
        </text>
        <text x="500" y="216" className="map-label-sm" fill="#a99a86">
          35 min · 22 km
        </text>

        {/* The resort */}
        <g>
          <circle cx="176" cy="330" r="26" fill="none" stroke="#c3a366" strokeWidth="1" />
          <circle cx="176" cy="330" r="14" fill="none" stroke="#8a6b2f" strokeWidth="1" />
          <path
            d="M176 322 L182 328 L182 340 L170 340 L170 328 Z"
            fill="#8a6b2f"
            stroke="#8a6b2f"
          />
        </g>
        <text x="176" y="378" textAnchor="middle" className="map-label-brand" fill="#17150f">
          ROYAL HAVEN
        </text>
        <text x="176" y="394" textAnchor="middle" className="map-label-sm" fill="#6b6154">
          Rajmahal Road, off Lake Pichola
        </text>

        <style>{`
          .map-label { font-family: var(--font-jost), sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
          .map-label-sm { font-family: var(--font-jost), sans-serif; font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; }
          .map-label-brand { font-family: var(--font-cormorant), serif; font-size: 15px; letter-spacing: 0.24em; }
        `}</style>
      </svg>
    </div>
  );
}
