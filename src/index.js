/* eslint react/jsx-key: off */
import * as React from 'react';
import { Admin, Resource } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import authProvider from './authProvider';
import comments from './views/comments';
import CustomRouteLayout from './customRouteLayout';
import CustomRouteNoLayout from './customRouteNoLayout';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import Layout from './Layout';
import posts from './views/posts';
import users from './views/users';
import tags from './views/tags';

render(
  <Provider store={store}>
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      title='Example Admin'
      layout={Layout}
      customRoutes={[
        <Route
          exact
          path='/custom'
          component={(props) => <CustomRouteNoLayout {...props} />}
          noLayout
        />,
        <Route exact path='/custom2' component={(props) => <CustomRouteLayout {...props} />} />,
      ]}
    >
      {(permissions) => [
        <Resource name='users' {...users} />,
        <Resource name='posts' {...posts} />,
        <Resource name='comments' {...comments} />,
        <Resource name='tags' {...tags} />,
      ]}
    </Admin>
  </Provider>,
  document.getElementById('root')
);
