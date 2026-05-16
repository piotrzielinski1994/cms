'use client';

import { useState } from 'react';

const SeedButton = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const onSeed = async () => {
    setStatus('running');
    setMessage('');
    try {
      const res = await fetch('/next/seed', { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        const text = await res.text();
        setStatus('error');
        setMessage(text || `HTTP ${res.status}`);
        return;
      }
      setStatus('success');
      setMessage('Seed completed');
    } catch (e) {
      setStatus('error');
      setMessage(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: '4px',
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <strong>Seed:</strong>
      <button
        type="button"
        onClick={onSeed}
        disabled={status === 'running'}
        className="btn btn--style-primary btn--size-small"
      >
        {status === 'running' ? 'Seeding…' : 'Seed all (users + pages + layout + products)'}
      </button>
      {status === 'success' && <span style={{ color: 'green' }}>✓ {message}</span>}
      {status === 'error' && <span style={{ color: 'red' }}>✗ {message}</span>}
    </div>
  );
};

export { SeedButton };
