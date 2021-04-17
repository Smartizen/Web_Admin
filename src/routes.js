import Users from 'views/users';
import Devices from 'views/devices';
import DeviceType from 'views/deviceType';
import Dashboard from 'views/dashbroad';
import Functions from 'views/functions';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, component: Dashboard },
  { path: '/functions', exact: true, component: Functions },
  { path: '/users', exact: true, component: Users },
  { path: '/devices', exact: true, component: Devices },
  { path: '/device-type', exact: true, component: DeviceType },
];

export default routes;
