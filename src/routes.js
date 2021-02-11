import Users from 'views/users';
import Devices from 'views/devices';
import DeviceType from 'views/deviceType';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true, component: Users },
  { path: '/devices', exact: true, component: Devices },
  { path: '/device-type', exact: true, component: DeviceType },
];

export default routes;
