import { KeyboardEvent, ReactNode } from 'react';

type IconProps = {
  label: string;
  icon: ReactNode;
  onActivate: () => void;
  ariaLabel: string;
};

export default function DesktopIcon({ label, icon, onActivate, ariaLabel }: IconProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onActivate();
    }
  }

  return (
    <button
      type="button"
      className="icon-button group flex flex-col items-center gap-2 rounded-3xl px-1 py-2 text-center text-[11px] text-[#6b4a63] transition hover:text-[#8d6b84] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c9b8ff]"
      onDoubleClick={onActivate}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
    >
      <div className="flex h-16 w-16 overflow-hidden rounded-[22px] border border-white/90 bg-white/45 shadow-sm transition-transform duration-150 group-hover:scale-105">
        {icon}
      </div>
      <span className="select-none leading-tight font-bold text-black font-mono">{label}</span>
    </button>
  );
}
