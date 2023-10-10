import React from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useScrollRestoration } from 'shared/view/hooks/useScrollRestoration';
import { ErrorBoundary } from 'pages/shared/ErrorBoundary/ErrorBoundary';
import { PageHeader } from 'pages/shared/PageHeader/PageHeader';
import { lazyfy } from 'shared/helpers/lazyfy';

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

  return (
    <div className={styles.root}>
      <PageHeader />
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
      <div className={styles.sphere} />
    </div>
  );
});
