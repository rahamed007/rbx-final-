import { cn } from "@/lib/utils";

/**
 * The RBX emblem as inline SVG. Zero network requests, instant paint, and
 * scales perfectly — used in the header/footer so navigation never depends on
 * a large image file loading.
 */
export default function RbxMark({
  className,
  glow = true,
  title = "RBX",
}: {
  className?: string;
  glow?: boolean;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={cn("h-9 w-9", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rbxSteel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="45%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
        <linearGradient id="rbxRed" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="55%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* angular stadium-rail frame */}
      <path
        d="M32 3 57 17v30L32 61 7 47V17Z"
        fill="#0a0a0c"
        stroke="url(#rbxSteel)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M32 9 51 20v24L32 55 13 44V20Z" fill="none" stroke="#27272a" strokeWidth="1.2" />

      {/* crimson X */}
      <g stroke="url(#rbxRed)" strokeWidth="6" strokeLinecap="round">
        <line x1="21" y1="21" x2="43" y2="43" />
        <line x1="43" y1="21" x2="21" y2="43" />
      </g>
      <g stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55">
        <line x1="22.5" y1="22.5" x2="41.5" y2="41.5" />
        <line x1="41.5" y1="22.5" x2="22.5" y2="41.5" />
      </g>

      {/* center core */}
      <circle cx="32" cy="32" r="3.6" fill="#0a0a0c" stroke="url(#rbxSteel)" strokeWidth="1.4" />

      {glow && <circle cx="32" cy="32" r="3" fill="#ef4444" opacity="0.85" />}
    </svg>
  );
}
