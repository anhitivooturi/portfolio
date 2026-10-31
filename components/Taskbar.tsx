type OpenWindow = {
  id: string;
  title: string;
  minimized: boolean;
};

type TaskbarProps = {
  openWindows: OpenWindow[];
  activeWindowId: string | null;
  clockLabel: string;
  onActivateWindow: (id: string) => void;
};

export default function Taskbar({ openWindows, activeWindowId, clockLabel, onActivateWindow }: TaskbarProps) {
  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 z-50 flex items-center gap-3 border-t border-[#e3d4ff]/40 bg-white/90 px-3 py-2 text-[12px] text-[#6b4a63] backdrop-blur-sm">
      <button
        type="button"
        className="task-button inline-flex items-center gap-2 rounded-2xl border px-3 py-1 text-[11px] uppercase tracking-[0.24em]"
        aria-label="Start menu"
      >
        Start
      </button>
      <div className="flex flex-1 items-center gap-2 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            type="button"
            className={`task-button inline-flex min-w-[90px] items-center justify-center rounded-sm px-2 py-1 text-[11px] transition ${
              activeWindowId === window.id ? 'bg-white/20' : 'bg-white/10'
            }`}
            onClick={() => onActivateWindow(window.id)}
            aria-label={`Show ${window.title}`}
          >
            {window.title}
          </button>
        ))}
      </div>
      <div className="rounded-sm border border-white/15 bg-white/10 px-3 py-1 text-[11px]">{clockLabel}</div>
    </div>
  );
}
