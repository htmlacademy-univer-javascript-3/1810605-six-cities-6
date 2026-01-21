import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { AuthorizationStatus } from '../../types';
import { logoutAction } from '../../store/api-actions';
import { selectAuthorizationStatus, selectFavoriteOffers, selectUser } from '../../store/selectors';

interface HeaderProps {
  isLogoActive?: boolean;
}

const Header = memo(({ isLogoActive = false }: HeaderProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favoriteOffers = useSelector(selectFavoriteOffers);
  const favoriteCount = favoriteOffers.length;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isLogoActive ? 'header__logo-link--active' : ''}`} to="/">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth && (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">{user?.email ?? ''}</span>
                      <span className="header__favorite-count">{favoriteCount}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <button
                      className="header__nav-link"
                      type="button"
                      onClick={() => dispatch(logoutAction())}
                    >
                      <span className="header__signout">Sign out</span>
                    </button>
                  </li>
                </>
              )}
              {authorizationStatus === AuthorizationStatus.NoAuth && (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
});
Header.displayName = 'Header';

export default Header;
