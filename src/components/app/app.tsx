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
import { RootState, AppDispatch } from '../../store';
import { fetchOffersAction, checkAuthAction } from '../../store/api-actions';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const isOffersLoadError = useSelector((state: RootState) => state.isOffersLoadError);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

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
