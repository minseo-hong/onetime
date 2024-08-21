import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { Event } from '../types/event.type';
import { RecommendSchedule } from '../types/schedule.type';
import CircleArrowButton from './CircleArrowButton';
import Participants from './Participants';
import RecommendTime from './RecommendTime';

interface TopHeaderContentsListProps {
  eventCategory: Event['category'];
  participants: string[];
  recommendSchedules: RecommendSchedule[];
}

export default function TopHeaderContentsList({
  eventCategory,
  participants,
  recommendSchedules,
}: TopHeaderContentsListProps) {
  const [circleArrowButtonVisible, setCircleArrowButtonVisible] = useState({
    left: false,
    right: true,
  });

  const topDialogListRef = useRef<HTMLDivElement>(null);

  function handleScrollLeft() {
    topDialogListRef.current?.scrollBy({
      left: -topDialogListRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  function handleScrollRight() {
    topDialogListRef.current?.scrollBy({
      left: topDialogListRef.current.clientWidth,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    if (!topDialogListRef.current) return;

    function handleScroll() {
      if (!topDialogListRef.current) return;

      if (topDialogListRef.current.scrollLeft === 0) {
        setCircleArrowButtonVisible((prev) => ({
          ...prev,
          left: false,
        }));
      } else {
        setCircleArrowButtonVisible((prev) => ({
          ...prev,
          left: true,
        }));
      }

      if (
        topDialogListRef.current.scrollLeft ===
        topDialogListRef.current.scrollWidth -
          topDialogListRef.current.clientWidth
      ) {
        setCircleArrowButtonVisible((prev) => ({
          ...prev,
          right: false,
        }));
      } else {
        setCircleArrowButtonVisible((prev) => ({
          ...prev,
          right: true,
        }));
      }
    }

    topDialogListRef.current.addEventListener('scroll', handleScroll);

    return () => {
      topDialogListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const style = {
    circleArrowButton:
      'pointer-events-none absolute top-1/2 -translate-y-1/2 opacity-0 shadow-lg drop-shadow-[0_0_24px_rgba(0,0,0,0.25)] transition-opacity group-hover:pointer-events-auto',
  };

  return (
    <div className="group relative">
      <CircleArrowButton
        direction="left"
        className={clsx(style.circleArrowButton, 'left-10 sm:left-16', {
          'group-hover:opacity-0': !circleArrowButtonVisible.left,
          'group-hover:opacity-100': circleArrowButtonVisible.left,
        })}
        onClick={handleScrollLeft}
      />
      <div
        ref={topDialogListRef}
        className="scrollbar-hidden mt-4 flex w-full items-stretch gap-4 overflow-x-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <RecommendTime
          recommendSchedules={recommendSchedules}
          eventCategory={eventCategory}
        />
        <Participants participants={participants} />
      </div>
      <CircleArrowButton
        direction="right"
        className={clsx(style.circleArrowButton, 'right-10 sm:right-16', {
          'group-hover:opacity-0': !circleArrowButtonVisible.right,
          'group-hover:opacity-100': circleArrowButtonVisible.right,
        })}
        onClick={handleScrollRight}
      />
    </div>
  );
}
