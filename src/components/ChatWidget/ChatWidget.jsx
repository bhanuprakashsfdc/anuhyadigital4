import React, { useState } from 'react';
import { WEBSITE_WHATSAPP, WEBSITE_PHONETag, WEBSITE_EMAILTag } from '../../constants/constants';

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WEBSITE_WHATSAPP}`, '_blank');
  };

  const makeCall = () => {
    window.location.href = WEBSITE_PHONETag;
  };

  const sendEmail = () => {
    window.location.href = WEBSITE_EMAILTag;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat popup */}
      {isChatOpen && (
        <div className="mb-4 w-72 glass-panel rounded-2xl border border-outline-variant/20 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          <div className="p-4 border-b border-outline-variant/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                AD
              </div>
              <div>
                <span className="text-sm font-semibold text-on-surface">Anuhya</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs text-on-surface-variant">Online</span>
                </div>
              </div>
            </div>
            <button onClick={toggleChat} className="text-on-surface-variant hover:text-on-surface transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="bg-surface-high/50 rounded-xl p-3 mb-4">
              <span className="text-xs text-on-surface-variant">15:22</span>
              <p className="text-sm text-on-surface mt-1">Hi there 👋</p>
              <p className="text-sm text-on-surface">How can I help you?</p>
            </div>
          </div>
          <div className="p-4 pt-0 flex gap-2">
            <button onClick={openWhatsApp} className="flex-1 py-2.5 rounded-lg bg-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/30 transition-colors">
              WhatsApp
            </button>
            <button onClick={makeCall} className="flex-1 py-2.5 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors">
              Call
            </button>
            <button onClick={sendEmail} className="flex-1 py-2.5 rounded-lg bg-surface-high text-on-surface-variant text-sm font-medium hover:bg-surface-highest transition-colors">
              Email
            </button>
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full cyber-gradient text-background shadow-[0_0_30px_rgba(173,255,133,0.3)] hover:shadow-[0_0_50px_rgba(173,255,133,0.4)] transition-all duration-300 flex items-center justify-center"
        aria-label="Contact Us"
      >
        {isChatOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
