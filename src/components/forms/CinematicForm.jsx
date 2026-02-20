'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CinematicForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [ok, setOk] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setOk(true);
    setTimeout(() => setOk(false), 2500);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 12 }}>
      <motion.input whileFocus={{ scale: 1.01 }} required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      <motion.input whileFocus={{ scale: 1.01 }} type="email" required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      <motion.textarea whileFocus={{ scale: 1.01 }} required placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={inputStyle} />
      <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} data-cursor="pointer" style={btnStyle}>Send Message</motion.button>
      <AnimatePresence>
        {ok && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>✓ Message sent successfully.</motion.div>}
      </AnimatePresence>
    </form>
  );
}

const inputStyle = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,.2)',
  background: 'rgba(255,255,255,.08)',
  color: '#f5fbff',
  padding: '14px 16px'
};

const btnStyle = {
  border: 0,
  borderRadius: 999,
  padding: '14px 20px',
  fontWeight: 700,
  background: 'linear-gradient(135deg,#00a080,#0bc59f)',
  color: '#fff'
};
