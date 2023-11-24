import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useService } from 'services/servicesProvider';
import { useScrollRestoration } from 'shared/view/hooks/useScrollRestoration';
import { ErrorBoundary } from 'pages/shared/ErrorBoundary/ErrorBoundary';
import { PageHeader } from 'pages/shared/PageHeader/PageHeader';
import { MBottomNav } from 'pages/shared/MBottomNav/MBottomNav';
import { Sphere } from 'shared/view/components/Sphere';
import { lazyfy } from 'shared/helpers/lazyfy';

import { useHitGoal } from '../useHitGoal';
import styles from './Layout.module.scss';

const { MainLazy } = lazyfy(
  () => import(/* webpackChunkName: "MainPage" */ 'pages/Main/Main'),
  'Main',
  { preload: true },
);

const { CategoriesLazy } = lazyfy(
  () => import(/* webpackChunkName: "CategoriesPage" */ 'pages/Categories/Categories'),
  'Categories',
  { preload: true },
);

const { TicketsLazy } = lazyfy(
  () => import(/* webpackChunkName: "TicketsPage" */ 'pages/Tickets/Tickets'),
  'Tickets',
  { preload: true },
);

const { AboutLazy } = lazyfy(
  () => import(/* webpackChunkName: "AboutPage" */ 'pages/About/About'),
  'About',
  { preload: true },
);

export const Layout = observer(function Layout() {
  const elementRef = useScrollRestoration('layout');
  const { isMobile } = useService('settings');

  useHitGoal();

  const scrollToTop = useCallback(() => {
    elementRef?.current?.scroll({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  }, [elementRef]);

  return (
    <div className={styles.root}>
      <PageHeader onClick={scrollToTop} />
      <main className={styles.main} ref={elementRef}>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary key="main">
                <MainLazy />
              </ErrorBoundary>
            }
          />
          <Route
            path="categories"
            element={
              <ErrorBoundary key="categories">
                <CategoriesLazy />
              </ErrorBoundary>
            }
          />
          <Route
            path="tickets"
            element={
              <ErrorBoundary key="tickets">
                <TicketsLazy />
              </ErrorBoundary>
            }
          />
          <Route
            path="about"
            element={
              <ErrorBoundary key="about">
                <AboutLazy />
              </ErrorBoundary>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {isMobile && <MBottomNav onChange={scrollToTop} />}
      <Sphere />
    </div>
  );
});
