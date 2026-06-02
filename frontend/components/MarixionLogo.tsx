export function MarixionLogo({ size = 32, text = true }: { size?: number; text?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="mx-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="mx-grad-light" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#mx-grad)" />
        <path
          d="M10 12h5l3 10 4-14h5l-8 20h-4l-5-16z"
          fill="white"
          fillRule="evenodd"
          opacity="0.9"
        />
        <circle cx="28" cy="13" r="2" fill="white" opacity="0.5" />
        <circle cx="31" cy="22" r="1.5" fill="white" opacity="0.3" />
        <circle cx="26" cy="28" r="1" fill="white" opacity="0.25" />
      </svg>
      {text && (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
            Marixion
          </span>
          <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
