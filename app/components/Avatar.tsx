type AvatarProps = {
  bg?: string;
  shirt?: string;
  className?: string;
};

/**
 * Placeholder illustration: a flat-style character portrait.
 * Swap for a real photo or custom illustration later.
 */
export default function Avatar({
  bg = "#FFC224",
  shirt = "#FF6B7A",
  className = "",
}: AvatarProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración de perfil"
    >
      <rect width="400" height="400" rx="24" fill={bg} />
      <circle cx="200" cy="330" r="140" fill={shirt} />
      <circle cx="200" cy="180" r="90" fill="#1a1a1a" />
      <circle cx="200" cy="195" r="72" fill="#ffe0c2" />
      <path
        d="M128 170c0-55 32-96 72-96s72 41 72 96c-18-10-36-30-40-46-14 18-70 30-104 46z"
        fill="#1a1a1a"
      />
      <circle cx="170" cy="200" r="6" fill="#1a1a1a" />
      <circle cx="232" cy="200" r="6" fill="#1a1a1a" />
      <path
        d="M176 230c8 10 40 10 48 0"
        stroke="#1a1a1a"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="200" cy="340" r="26" fill={bg} opacity="0.6" />
    </svg>
  );
}
