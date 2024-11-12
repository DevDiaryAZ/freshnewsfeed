import React from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Articles } from '../Articles/Articles';
import { Article } from '../Article/Article';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

export const App = (): JSX.Element => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation placement="header" className="header__navigation" />
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/:categoryId" element={<Articles />}></Route>
          <Route path="/" element={<Articles />}></Route>
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation placement="footer" className="footer__navigation" />
          <div className="footer__bottom">
            <p className="footer__text">
            </p>
            <p className="footer__text footer__text--gray">© 2024</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
