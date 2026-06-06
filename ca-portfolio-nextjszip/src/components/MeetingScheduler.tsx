"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CALENDLY_URL = "https://calendly.com/caruchita2002/30min";

export default function MeetingScheduler({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const old = document.querySelector('script[src*="calendly"]');
    if (old) old.remove();
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      const s = document.querySelector('script[src*="calendly"]');
      if (s) s.remove();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            className="sched-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Flex-centered wrapper — centering is handled by CSS flex, not transform */}
          <div className="calendly-dialog-wrapper">
            <motion.div
              className="calendly-dialog"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
            >
              {/* Header */}
              <div className="calendly-dialog-header">
                <div className="calendly-dialog-header-left">
                  <span className="calendly-dialog-icon">📅</span>
                  <div>
                    <div className="calendly-dialog-title">
                      Book a Free 30-min Call
                    </div>
                    <div className="calendly-dialog-sub">
                      Pick a slot · Powered by Calendly · Confirmation sent to
                      your email
                    </div>
                  </div>
                </div>
                <button className="calendly-dialog-close" onClick={onClose}>
                  ✕
                </button>
              </div>

              {/* Full-height Calendly widget */}
              <div className="calendly-dialog-body">
                <div
                  className="calendly-inline-widget"
                  data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=d4a03a`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
