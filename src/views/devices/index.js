import SmartizenDevices from './smartizen';
import WatsonDevices from './watson';

export default function Devices() {
  return (
    <div>
      <WatsonDevices />
      <SmartizenDevices />
    </div>
  );
}
