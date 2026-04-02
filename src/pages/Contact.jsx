import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, Share2, GitBranch, Bird, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) { setError('Please enter your name.'); return; }
    if (!validateEmail(formData.email)) { setError('Please enter a valid email address.'); return; }
    if (!formData.message.trim()) { setError('Please enter a message.'); return; }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', service: '', message: '' });
      }, 5000);
    }, 1500);
  };

  const handleCallback = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setPhoneSubmitted(true);
    setTimeout(() => {
      setPhoneSubmitted(false);
      setPhone('');
    }, 5000);
  };

  const contactChannels = [
    { icon: Mail, label: "Email Us", value: "hello@anuhya.digital", href: "mailto:hello@anuhya.digital" },
    { icon: Phone, label: "Call Directly", value: "+1 800-AN-DIGITAL", href: "tel:+18002634448" }
  ];

  const socials = [
    { icon: GitBranch, label: "GitHub" },
    { icon: Share2, label: "LinkedIn" },
    { icon: Bird, label: "Twitter" },
    { icon: Terminal, label: "Exchange" }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Let's Start a Conversation | Anuhya Digital</title>
        <meta name="description" content="Get in touch with Anuhya Digital for expert Salesforce consulting, technical audits, and custom cloud architecture." />
      </Helmet>

      <section className="px-8 py-24 md:py-40 max-w-screen-2xl mx-auto space-y-20">
        <header className="grid lg:grid-cols-2 gap-12 items-end">
          <div className="space-y-6">
            <span className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-4 block">Connectivity & Innovation</span>
            <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter leading-[0.85]">
              Let's Start a <br /> <span className="neon-gradient-text italic">Conversation</span>
            </h1>
          </div>
          <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-md pb-4">
            Whether you're looking to scale your Salesforce ecosystem or seeking expert architectural guidance, our team of precision-focused developers is ready to connect.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="surface-low p-10 md:p-16 rounded-2xl border border-outline-variant/10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700" aria-hidden="true" />
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full cyber-gradient flex items-center justify-center text-[#062100] shadow-[0_0_40px_rgba(173,255,133,0.3)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold font-headline">Message Sent!</h3>
                  <p className="text-on-surface-variant max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your inquiry and respond within 4 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-12" noValidate>
                  {error && (
                    <div role="alert" className="flex items-center gap-3 p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm font-body">
                      <AlertCircle size={18} className="shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="relative group">
                      <input 
                        id="contact-name"
                        type="text" 
                        required 
                        placeholder=" "
                        value={formData.name}
                        className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 px-0 focus:ring-0 focus:border-primary transition-all font-body text-on-surface"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <label htmlFor="contact-name" className="absolute left-0 top-4 text-on-surface-variant/60 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest font-mono text-[0.65rem] font-black">
                        Full Name
                      </label>
                    </div>
                    <div className="relative group">
                      <input 
                        id="contact-email"
                        type="email" 
                        required 
                        placeholder=" "
                        value={formData.email}
                        className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 px-0 focus:ring-0 focus:border-primary transition-all font-body text-on-surface"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <label htmlFor="contact-email" className="absolute left-0 top-4 text-on-surface-variant/60 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest font-mono text-[0.65rem] font-black">
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <select 
                      id="contact-service"
                      className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 px-0 focus:ring-0 focus:border-primary transition-all font-body text-on-surface appearance-none cursor-pointer"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="" className="bg-surface">Select Service</option>
                      <option value="implementation" className="bg-surface">Salesforce Implementation</option>
                      <option value="audit" className="bg-surface">Technical Audit</option>
                      <option value="custom" className="bg-surface">Custom Development</option>
                      <option value="strategy" className="bg-surface">Platform Strategy</option>
                    </select>
                    <label htmlFor="contact-service" className="absolute left-0 -top-4 text-primary uppercase tracking-widest font-mono text-[0.65rem] font-black">
                      Service Interest
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      id="contact-message"
                      required 
                      rows="4" 
                      placeholder=" "
                      value={formData.message}
                      className="peer w-full bg-transparent border-0 border-b border-outline-variant/50 py-4 px-0 focus:ring-0 focus:border-primary transition-all font-body text-on-surface resize-none"
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                    <label htmlFor="contact-message" className="absolute left-0 top-4 text-on-surface-variant/60 transition-all peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-top-4 uppercase tracking-widest font-mono text-[0.65rem] font-black">
                      Project Overview
                    </label>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                      <span className="font-mono text-[0.6rem] text-on-surface-variant uppercase tracking-widest font-black">
                        Avg Response: 4 Business Hours
                      </span>
                    </div>
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full md:w-auto cyber-gradient text-[#062100] px-12 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(173,255,133,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[44px]"
                    >
                      {submitting ? 'Sending...' : 'Send Inquiry'}
                      <Send size={16} aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Visual Map / Location */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative h-[450px] rounded-2xl overflow-hidden surface-high border border-outline-variant/10 group shadow-2xl"
              aria-label="Anuhya Digital office location"
            >
              <div 
                className="absolute inset-0 grayscale brightness-50 opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000 bg-cover bg-center"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1X40drqyr3wvVt2-jVVRUV2E__V2E5a6A6Q7-HpTYXA_fC1hIDQoOcsThDJZgbI5LBB_TUqDKBYDul-08s5Dco2FeZIhwXXO4lAYktizEou498OSx66acPSwPiyv81fj4K86B52n5DnkpWx8qcxIPbPSVCe12Xij_Tre-g0waPzPSnrIxFxmmuJ1ZDgg4VmVoOMS1yRC3kxBCXEXFdUc3N3rx0aeOC945R_C5r8TElGmvb1a1VVpecx0VDPME49kad9u3GP9xk9c')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-10 glass-panel rounded-xl border border-white/5 space-y-4">
                <h3 className="text-2xl font-bold font-headline text-primary">Global HQ</h3>
                <p className="text-on-surface-variant font-body leading-relaxed text-sm">
                  1200 Tech Plaza, Innovation District<br />
                  San Francisco, CA 94105
                </p>
                <a 
                  href="https://maps.google.com/?q=1200+Tech+Plaza+San+Francisco+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary font-mono text-[0.6rem] font-black uppercase tracking-widest pt-4 group/btn hover:underline"
                >
                  <MapPin size={14} className="group-hover/btn:scale-110 transition-transform" aria-hidden="true" />
                  View on Google Maps
                </a>
              </div>
              <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping opacity-20" aria-hidden="true" />
              <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_20px_#ADFF85]" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Quick Callback */}
            <div className="surface-high p-10 rounded-2xl border border-outline-variant/10 space-y-8 shadow-xl">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full cyber-gradient flex items-center justify-center text-[#062100]">
                  <Phone size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold font-headline">Quick Callback</h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                Short on time? Leave your number and our lead architect will call you back within 15 minutes.
              </p>
              {phoneSubmitted ? (
                <div role="status" aria-live="polite" className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-body">
                  <CheckCircle2 size={18} className="shrink-0" />
                  We'll call you shortly!
                </div>
              ) : (
                <form className="space-y-4 pt-4" onSubmit={handleCallback}>
                  <label htmlFor="callback-phone" className="sr-only">Phone number for callback</label>
                  <input 
                    id="callback-phone"
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface py-5 px-6 rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-0 text-sm font-mono tracking-widest placeholder-on-surface-variant/30 transition-all"
                  />
                  <button type="submit" className="w-full py-5 border border-primary text-primary rounded-lg font-mono text-[0.65rem] font-black uppercase tracking-[0.3em] hover:bg-primary/10 transition-all active:scale-95 min-h-[44px]">
                    Request Immediate Callback
                  </button>
                </form>
              )}
            </div>

            {/* Channels */}
            <div className="space-y-4">
              {contactChannels.map((channel, i) => (
                <a key={i} href={channel.href} className="surface-low p-8 rounded-xl border border-outline-variant/10 flex items-center gap-6 hover:surface-high transition-all group cursor-pointer block min-h-[44px]">
                  <div className="w-12 h-12 rounded-full surface-high flex items-center justify-center text-primary/50 group-hover:text-primary group-hover:scale-110 transition-all border border-outline-variant/20">
                    <channel.icon size={20} aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[0.6rem] font-mono font-black uppercase tracking-[0.3em] text-on-surface-variant/40">{channel.label}</span>
                    <span className="block font-headline text-lg group-hover:text-primary transition-colors">{channel.value}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Grid */}
            <div className="surface-low p-10 rounded-2xl border border-outline-variant/10 space-y-8">
              <h4 className="text-lg font-bold font-headline uppercase tracking-widest">Digital Ecosystem</h4>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-6 rounded-xl surface-high border border-outline-variant/20 hover:border-primary/40 hover:scale-[1.03] transition-all group cursor-default">
                    <social.icon size={24} className="text-on-surface-variant group-hover:text-primary mb-3 transition-colors" aria-hidden="true" />
                    <span className="font-mono text-[0.6rem] font-black uppercase tracking-[0.2em]">{social.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
};

export default Contact;
