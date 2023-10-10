import React, { useEffect, useRef } from 'react';
import * as R from 'remeda';
import { observer } from 'mobx-react-lite';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';

import { Separator } from 'shared/view/components/Separator';
import { PaginationItem, Status } from 'shared/view/components/PaginationItem';
import type { Question } from 'services/questions/mobx/model';

import 'swiper/scss';
import 'swiper/scss/free-mode';

import styles from './Pagination.module.scss';

type Props = {
  questions: Question[];
  currentIndex: number;
  onClick(num: number): void;
};

export const Pagination = observer(function Pagination({
  questions,
  currentIndex,
  onClick,
}: Props) {
  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    const swiper = sliderRef.current?.swiper;
    if (!swiper) {
      return;
    }
    swiper.slideTo(currentIndex);
  }, [currentIndex]);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        <Swiper
          ref={sliderRef}
          className={styles.slider}
          slidesPerView="auto"
          freeMode
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
          }}
          centerInsufficientSlides
          centeredSlidesBounds
          observer
          resizeObserver
          grabCursor
          modules={[FreeMode, Mousewheel]}
        >
          {questions.map(question => (
            <SwiperSlide className={styles.slide} key={question.localIndex}>
              <PaginationItem
                num={question.localIndex + 1}
                isSelected={currentIndex === question.localIndex}
                onClick={() => onClick(question.localIndex)}
                status={getPaginationItemStatus(question)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.separator}>
        <Separator />
      </div>
    </div>
  );

  function getPaginationItemStatus(question: Question): Status {
    if (R.isNumber(question.answeredIndex)) {
      return question.status;
    }
    return 'default';
  }
});
