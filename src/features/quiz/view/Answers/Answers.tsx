import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { Answer } from 'features/quiz/view/Answer/Answer';
import type * as M from 'services/questions/mobx/model';

import styles from './Answers.module.scss';

type Props = {
  answersKey: string | number;
  question: M.Question;
  disabled?: boolean;
  isAnswered?: boolean;
  onClick(answeredIndex: number): void;
};

export const Answers = observer(function Answers({
  question,
  disabled,
  isAnswered,
  answersKey,
  onClick,
}: Props) {
  const { answers, rightAnswer, image, video } = question.questionData;

  const isRightAnswer = checkRightAnswer();
  const isRenderVideo = isAnswered && isRightAnswer && video;

  const withMedia = image ?? video;

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isAnswered) {
      videoRef.current.play();
    }
  }, [videoRef, isAnswered]);

  return (
    <div className={cn(styles.root, { [styles.withMedia]: withMedia })}>
      {withMedia && (
        <div className={styles.media}>
          <div className={styles.mediaInner}>
            {image && !isRenderVideo && (
              <img
                className={styles.mediaSource}
                src={`/${image}`}
                alt="Media"
                draggable={false}
                loading="lazy"
              />
            )}
            {isRenderVideo && (
              <video
                ref={videoRef}
                className={styles.mediaSource}
                src={`/${video}`}
                controls={false}
                draggable={false}
                playsInline
                muted
                preload="auto"
                poster={`/${image}`}
                autoPlay
                loop
              />
            )}
          </div>
        </div>
      )}

      <ol className={styles.list}>
        {answers.map((answer, index) => (
          <li key={`answer_${answersKey}_${index}`} className={styles.item}>
            <Answer
              answer={answer}
              status={getAnswerStatus(index)}
              disabled={disabled}
              onClick={() => handleAnswerClick(index)}
            />
          </li>
        ))}
      </ol>
    </div>
  );

  function checkRightAnswer() {
    return rightAnswer - 1 === question.answeredIndex;
  }

  function getAnswerStatus(index: number): M.QuestionStatus {
    if (question.answeredIndex === index) {
      return isRightAnswer ? 'right' : 'wrong';
    }
    if (isAnswered && index === rightAnswer - 1) {
      return 'right';
    }
    return 'default';
  }

  function handleAnswerClick(answeredIndex: number) {
    onClick(answeredIndex);
  }
});
