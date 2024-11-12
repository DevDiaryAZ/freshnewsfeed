import React, { FC } from 'react';
import { categoryNames } from '../../utils';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { NavLink, Link, useLocation } from 'react-router-dom';

interface Props {
  className: string;
  placement: 'header' | 'footer';
}

export const Navigation: FC<Props> = ({ className = '', placement = 'header' }) => {
  const location = useLocation();
  return (
    <nav className={`grid navigation navigation--${placement} ${className}`}>
      <Link to={'/'} className="navigation__logo">
        <img className="navigation__logo-image" src={logo} alt="Логотип" />
      </Link>
      <ul className="navigation__list">
        {['index', 'fashion', 'technologies', 'sport', 'politics'].map((item) => {
          return (
            <li className="navigation__item" key={item}>
              <NavLink
                to={`/${item}`}
                className={({ isActive }) =>
                  'navigation__link' +
                  (isActive || (location.pathname === '/' && item === 'index') ? ' navigation__link--active' : '')
                }
              >
                {categoryNames[item]}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
