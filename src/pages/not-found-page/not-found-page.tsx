function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <a href="/" style={{ color: '#4481c3', textDecoration: 'underline' }}>Go to main page</a>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
