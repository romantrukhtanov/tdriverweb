import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { useLangTitle } from 'core/useLangTitle';
import { useFontFaceObserver } from 'core/useFontFaceObserver';
import { ErrorBoundary } from 'pages/shared/ErrorBoundary/ErrorBoundary';
import { lazyfy } from 'shared/helpers/lazyfy';

import { useHitGoal } from './useHitGoal';
import { Layout } from './Layout/Layout';
import { routes } from '../routes';

const { QuizPageLazy } = lazyfy(
  () => import(/* webpackChunkName: "QuizPage" */ '../Quiz/QuizPage'),
  'QuizPage',
  { preload: true },
);

const { ResultsLazy } = lazyfy(
  () => import(/* webpackChunkName: "ResultsPage" */ '../Results/Results'),
  'Results',
  { preload: true },
);

export function Router() {
  useFontFaceObserver();
  useLangTitle();
  useHitGoal();

  return (
    <>
      <Routes>
        <Route
          path="/tickets/:ticketID"
          element={
            <ErrorBoundary key="tickets/quiz">
              <QuizPageLazy redirectTo={routes.tickets.getRedirectPath()} />
            </ErrorBoundary>
          }
        />
        <Route
          path="/tickets/:ticketID/results"
          element={
            <ErrorBoundary key="tickets-quiz-results">
              <ResultsLazy
                redirectToQuiz={(ticket: string) =>
                  routes.tickets.ticket.getRedirectPath({ ticket })
                }
                redirectToPage={routes.tickets.getRedirectPath()}
              />
            </ErrorBoundary>
          }
        />

        <Route
          path="/categories/:category"
          element={
            <ErrorBoundary key="categories-quiz">
              <QuizPageLazy redirectTo={routes.categories.getRedirectPath()} playMarquee />
            </ErrorBoundary>
          }
        />
        <Route
          path="/categories/:category/results"
          element={
            <ErrorBoundary key="categories-quiz-results">
              <ResultsLazy
                redirectToQuiz={(category: string) =>
                  routes.categories.category.getRedirectPath({ category })
                }
                redirectToPage={routes.categories.getRedirectPath()}
              />
            </ErrorBoundary>
          }
        />

        <Route
          path="/quiz"
          element={
            <ErrorBoundary key="quiz">
              <QuizPageLazy redirectTo="/" />
            </ErrorBoundary>
          }
        />
        <Route
          path="/quiz/results"
          element={
            <ErrorBoundary key="quiz-results">
              <ResultsLazy
                redirectToQuiz={() => routes.quiz.getRedirectPath()}
                redirectToPage="/"
              />
            </ErrorBoundary>
          }
        />

        <Route
          path="*"
          element={
            <ErrorBoundary key="root">
              <Layout />
            </ErrorBoundary>
          }
        />
      </Routes>
    </>
  );
}
