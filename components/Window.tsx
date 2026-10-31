'use client';

import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type WindowProps = {
  id: string;
  title: string;
  icon: ReactNode;
  zIndex: number;
  position: { x: number; y: number };
  active: boolean;
  minimized: boolean;
  isMobile: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
};

export default function Window({
  id,
  title,
  icon,
  zIndex,
  position,
  active,
  minimized,
  isMobile,
  onClose,
  onMinimize,
  onFocus,
  children,
}: WindowProps) {
  return (
    <AnimatePresence>
      {!minimized ? (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.18 }}
          drag={!isMobile}
          dragMomentum={false}
          dragElastic={0.1}
          onPointerDown={onFocus}
          style={{
            zIndex,
            left: isMobile ? 0 : position.x,
            top: isMobile ? 0 : position.y,
          }}
          className={`window-chrome ${isMobile ? 'fixed inset-0 m-0 rounded-none' : 'absolute min-w-[320px] max-w-[420px] rounded-[20px]'} overflow-hidden`}
        >
          <div
            className={`window-titlebar flex items-center justify-between border-b border-[#e3d4ff] px-3 py-3 text-[12px] tracking-[0.05em] ${
              active ? 'window-titlebar' : 'window-titlebar inactive'
            }`}
            onPointerDown={onFocus}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sm shadow-sm">{icon}</span>
              <span className="font-semibold accent-font">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="window-button minimize"
                onClick={onMinimize}
                aria-label={`Minimize ${title}`}
              >
                –
              </button>
              <button
                type="button"
                className="window-button close"
                onClick={onClose}
                aria-label={`Close ${title}`}
              >
                ✕
              </button>
            </div>
          </div>
          <div className="window-content max-h-[calc(100vh-100px)] overflow-y-auto p-4 text-sm text-[#4b2b5e] md:text-base">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
