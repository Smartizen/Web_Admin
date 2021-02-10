import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '@coreui/coreui/scss/coreui.scss';
import { authLogin } from 'store/actions';

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse'></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

export default function App() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      window.addEventListener('load', () => {
        dispatch(authLogin());
      });
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path='/login' name='Login Page' render={(props) => <Login {...props} />} />
          <Route path='/404' name='Page 404' render={(props) => <Page404 {...props} />} />
          <Route exact path='/500' name='Page 500' render={(props) => <Page500 {...props} />} />
          {!!user ? <Route exact path='/' name='Home' component={TheLayout} /> : <></>}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
