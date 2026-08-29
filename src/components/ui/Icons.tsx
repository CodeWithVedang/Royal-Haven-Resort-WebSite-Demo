import type { AmenityKey } from "@/data/rooms";
import { cn } from "@/lib/utils";

type IconProps = { className?: string; strokeWidth?: number; label?: string };

/** `label` turns a decorative glyph into an announced one (menu legends, status). */
function a11y(label?: string) {
  return label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": "true" } as const);
}

function Svg({
  children,
  className,
  strokeWidth = 1.25,
  label,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y(label)}
      className={cn("h-5 w-5 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

/* ------------------------------- Amenities -------------------------------- */

const Wifi = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 8.5a15 15 0 0 1 19 0M5.5 12a10.5 10.5 0 0 1 13 0M8.5 15.5a6 6 0 0 1 7 0" />
    <circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
);

const Ac = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="8" rx="1.5" />
    <path d="M5.5 9h13M6 16c0 1.6 1 2.2 1 3.5M12 16c0 1.6 1 2.2 1 3.5M18 16c0 1.6-1 2.2-1 3.5" />
  </Svg>
);

const Minibar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 2.5h3v3.2l1.6 2.4v12.4H6.4V8.1L8 5.7Z" />
    <path d="M6.4 12.5h6.2" />
    <path d="M15.5 9.5h4l-.7 4.2a1.4 1.4 0 0 1-1.4 1.2h.2a1.4 1.4 0 0 1-1.4-1.2Z" />
    <path d="M17.5 15v6.5M15.8 21.5h3.4" />
  </Svg>
);

const Tv = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4.5" width="19" height="12.5" rx="1" />
    <path d="M9 21h6M12 17v4" />
  </Svg>
);

const Toiletries = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 10h5v11.5h-5zM5.5 10V7.8A1.8 1.8 0 0 1 7.3 6h.4A1.8 1.8 0 0 1 9.5 7.8V10" />
    <path d="M6.5 6V3.5h1.5V6" />
    <path d="M14.5 21.5V12a3 3 0 0 1 3-3h.5a3 3 0 0 1 3 3v9.5Z" />
    <path d="M17.5 9V5.5M15.8 5.5h3.4" />
  </Svg>
);

const Tea = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 9.5h13v5a5.5 5.5 0 0 1-5.5 5.5H9A5.5 5.5 0 0 1 3.5 14.5Z" />
    <path d="M16.5 11h1.8a2.2 2.2 0 0 1 0 4.4h-1.8" />
    <path d="M8 6.5c0-1 1-1.4 1-2.5M12 6.5c0-1 1-1.4 1-2.5" />
  </Svg>
);

const RoomService = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 18.5h19" />
    <path d="M4 18.5a8 8 0 0 1 16 0" />
    <path d="M12 10.5V8.6" />
    <circle cx="12" cy="7" r="1.4" />
  </Svg>
);

const Safe = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="1" />
    <circle cx="10" cy="12" r="3.2" />
    <path d="M10 8.8v6.4M6.8 12h6.4M17.5 9.5v5" />
  </Svg>
);

const HairDryer = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 8.5a4.5 4.5 0 0 1 4.5-4.5h6.5a4.5 4.5 0 0 1 0 9H8a4.5 4.5 0 0 1-4.5-4.5Z" />
    <path d="M9.5 13v4.5a3 3 0 0 0 3 3h.5" />
    <path d="M17 8.5h4" />
  </Svg>
);

const Bathrobe = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 2.5 9.2 5 12 7.5 14.8 5Z" />
    <path d="M9.2 5 5 7.5v13.5h14V7.5L14.8 5" />
    <path d="M12 7.5v13.5M5 12h3M16 12h3" />
  </Svg>
);

export const AmenityIcons: Record<AmenityKey, (props: IconProps) => React.ReactElement> = {
  wifi: Wifi,
  ac: Ac,
  minibar: Minibar,
  tv: Tv,
  toiletries: Toiletries,
  tea: Tea,
  roomService: RoomService,
  safe: Safe,
  hairDryer: HairDryer,
  bathrobe: Bathrobe,
};

/* -------------------------------- Interface -------------------------------- */

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </Svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="16" rx="1" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const IconGuests = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.4" />
    <path d="M2.8 20.5c0-3.4 2.8-6.1 6.2-6.1s6.2 2.7 6.2 6.1" />
    <path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M17.6 14.9c2.1.7 3.6 2.6 3.6 5.6" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 12.5l5 5 10-11" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconMinus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7.5 3.5H5A1.6 1.6 0 0 0 3.4 5.2C3.4 13 11 20.6 18.8 20.6a1.6 1.6 0 0 0 1.7-1.6v-2.5l-4.2-1.7-2 2a14.4 14.4 0 0 1-5.1-5.1l2-2Z" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="1" />
    <path d="M2.5 7l9.5 6.5L21.5 7" />
  </Svg>
);

export const IconPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21.5s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
    <circle cx="12" cy="10.2" r="2.6" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 7.2V12l3.4 2.2" />
  </Svg>
);

export const IconWhatsApp = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn("h-5 w-5 shrink-0", className)}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.54 3.7-8.23 8.24-8.23a8.23 8.23 0 0 1 .01 16.46Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.21 7.44 7.44 0 0 1-1.36-1.7c-.14-.25-.02-.38.11-.5.11-.12.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.03-.43-.06-.13-.55-1.35-.76-1.84-.2-.48-.4-.42-.55-.42h-.47a.9.9 0 0 0-.66.31 2.78 2.78 0 0 0-.87 2.07c0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.14-1.19-.06-.1-.23-.17-.48-.29Z" />
  </svg>
);

export const IconSpinner = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={cn("h-5 w-5 shrink-0 animate-spin", className)}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.6" />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const IconStar = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn("h-4 w-4 shrink-0", className)}
  >
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.05-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95Z" />
  </svg>
);

export const IconGitHub = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={cn("h-5 w-5 shrink-0", className)}
  >
    <path d="M12 1.75a10.25 10.25 0 0 0-3.24 19.98c.51.1.7-.22.7-.49l-.01-1.72c-2.85.62-3.45-1.37-3.45-1.37-.47-1.19-1.14-1.5-1.14-1.5-.93-.64.07-.63.07-.63 1.03.07 1.57 1.06 1.57 1.06.92 1.57 2.4 1.12 2.99.86.09-.66.36-1.12.65-1.38-2.28-.26-4.670-1.14-4.67-5.07 0-1.12.4-2.03 1.06-2.75-.11-.26-.46-1.3.1-2.71 0 0 .86-.28 2.81 1.05a9.7 9.7 0 0 1 5.12 0c1.95-1.33 2.8-1.05 2.8-1.05.57 1.41.21 2.45.11 2.71.66.72 1.06 1.63 1.06 2.75 0 3.94-2.4 4.8-4.69 5.06.37.32.7.94.7 1.9l-.01 2.82c0 .27.18.6.71.49A10.25 10.25 0 0 0 12 1.75Z" />
  </svg>
);

export const IconChilli = ({ className, label }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...a11y(label)}
    className={cn("h-3.5 w-3.5 shrink-0", className)}
  >
    <path d="M14.6 3c.4 1.6-.2 2.7-1.3 3.4 2.4.9 4 3.3 4 6.1 0 4-3.1 8.5-7.6 8.5-3.2 0-5.7-2-5.7-4.6 0-.5.4-.8.9-.7 3.9.9 7.1-1.6 8-5.3.3-1.2.1-2.3-.5-3.2-.5-.8-.3-1.9.5-2.4.6-.4 1.4-.3 1.7.2Z" />
  </svg>
);

export const IconLeaf = ({ className, label }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...a11y(label)}
    className={cn("h-3.5 w-3.5 shrink-0", className)}
  >
    <path d="M20 3c-9 0-14 4.3-14 10.4 0 1.6.4 3 1.1 4.2L4 21l1.4 1.4 3.3-3.3c1.2.7 2.6 1.1 4.2 1.1C19 20.2 20 12 20 3Z" />
  </svg>
);
