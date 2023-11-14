import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useFeature } from 'features/featureProvider';
import { useService } from 'services/servicesProvider';
import { useRedirect } from 'shared/view/hooks/useRedirect';
import { Quiz } from 'features/quiz/view/Quiz/Quiz';
import { useURLParams } from 'pages/shared/hooks/useURLParams';

type Props = {
  playMarquee?: boolean;
  redirectTo?: string;
};

export const QuizPage = observer(function QuizPage({ playMarquee, redirectTo }: Props) {
  const { ticketID, category } = useURLParams();

  const { redirect } = useRedirect(redirectTo);
  const { getQuestions } = useService('questions');
  const { questions, startQuiz } = useFeature('quiz');

  useEffect(() => {
    const startQuestions = getQuestions({ ticketID: Number(ticketID), category });

    if (startQuestions) {
      if (!questions.length) {
        startQuiz(startQuestions);
      }
    } else {
      redirect();
    }
  }, [ticketID, category]); // eslint-disable-line react-hooks/exhaustive-deps

  return questions.length ? <Quiz playMarquee={playMarquee} redirectTo={redirectTo} /> : <></>;
});
