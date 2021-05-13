import SmartizenDeviceType from './smatizen';
import WatsonDeviceType from './watson';

export default function DeviceType() {
  return (
    <div>
      <WatsonDeviceType />
      <SmartizenDeviceType />
    </div>
  );
}
