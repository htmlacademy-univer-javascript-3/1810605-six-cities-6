import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';
import { AppDispatch } from '../../store';
import { fetchOffersAction, checkAuthAction, fetchFavoritesAction } from '../../store/api-actions';
import { selectAuthorizationStatus, selectIsOffersLoadError, selectIsOffersLoading } from '../../store/selectors';
import { AuthorizationStatus } from '../../types';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isOffersLoading = useSelector(selectIsOffersLoading);
  const isOffersLoadError = useSelector(selectIsOffersLoadError);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }
  if (isOffersLoadError) {
    return <ErrorMessage onRetry={() => dispatch(fetchOffersAction())} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
