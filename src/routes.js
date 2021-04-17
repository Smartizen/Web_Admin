import Users from 'views/users';
import Devices from 'views/devices';
import DeviceType from 'views/deviceType';
import Dashboard from 'views/dashbroad';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, component: Dashboard },
  { path: '/users', exact: true, component: Users },
  { path: '/devices', exact: true, component: Devices },
  { path: '/device-type', exact: true, component: DeviceType },
];

export default routes;
