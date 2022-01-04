import React, { useCallback, useRef, useState } from 'react';
import {
  Classes as Popover2Classes,
  Popover2,
  Popover2TargetProps,
} from '@blueprintjs/popover2';
import { IRef } from '@blueprintjs/core';

interface ReferencePopoverProps {
  content: JSX.Element;
  text: string;
}

const ReferencePopover = ({ content, text }: ReferencePopoverProps) => {
  const [isOpen, setOpen] = useState(false);
  const timeoutRef = useRef<number>();
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const setOpenWithDelay = useCallback(
    (value) => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setOpen(value);
      }, 128);
    },
    [setOpen],
  );
  const handleMouseLeave = useCallback(() => setOpenWithDelay(false), [setOpenWithDelay]);
  const handleMouseEnter = useCallback(() => setOpenWithDelay(true), [setOpenWithDelay]);

  const renderTarget = useCallback(
    ({ ref, isOpen }: Popover2TargetProps) => {
      return (
        <span
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ textDecoration: isOpen ? 'underline' : 'inherit' }}
        >
          <strong>{text}</strong>
        </span>
      );
    },
    [text, handleMouseLeave, handleMouseEnter],
  );

  const handlePopoverRef: IRef = useCallback(
    (node) => {
      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);
      }

      if (popoverRef.current) {
        popoverRef.current.removeEventListener('mouseenter', handleMouseEnter);
        popoverRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }

      popoverRef.current = node;
    },
    [handleMouseEnter, handleMouseLeave],
  );

  return (
    <Popover2
      popoverRef={handlePopoverRef}
      content={content}
      popoverClassName={Popover2Classes.POPOVER2_CONTENT_SIZING}
      renderTarget={renderTarget}
      isOpen={isOpen}
    />
  );
};

export default ReferencePopover;
