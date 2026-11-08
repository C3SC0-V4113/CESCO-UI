'use client';

import { cn } from 'cn';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

export function CopyButton({
  value,
  label = 'Copy',
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [feedback, setFeedback] = useState<'Copied' | 'Copy failed' | null>(null);
  const [announcement, setAnnouncement] = useState('');
  const timer = useRef<number | null>(null);
  const announcementTimer = useRef<number | null>(null);

  async function copy() {
    if (timer.current !== null) window.clearTimeout(timer.current);
    if (announcementTimer.current !== null) window.clearTimeout(announcementTimer.current);
    setFeedback(null);
    setAnnouncement('');

    let message: 'Copied' | 'Copy failed';
    try {
      await navigator.clipboard.writeText(value);
      message = 'Copied';
    } catch {
      message = 'Copy failed';
    }
    setFeedback(message);
    announcementTimer.current = window.setTimeout(() => setAnnouncement(message), 0);
    timer.current = window.setTimeout(() => {
      setFeedback(null);
      setAnnouncement('');
    }, 1500);
  }

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        aria-label={label}
        className={cn('absolute right-3 z-10', className)}
        onClick={() => {
          void copy();
        }}
      >
        {feedback ?? label}
      </Button>
      <span aria-live="polite" className="sr-only" role="status">
        {announcement}
      </span>
    </>
  );
}
