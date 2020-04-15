import { discoverGateway, Light } from "node-tradfri-client";
import { TradfriClient, Accessory } from "node-tradfri-client";

function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function connect(): Promise<TradfriClient> {
	const gateway = await discoverGateway();
	const tradfri = new TradfriClient(gateway.name);
	// const { identity, psk } = await tradfri.authenticate('dfYSOrhQpnLIOSEz');
	// console.log({ identity, psk });
	await tradfri.connect('tradfri_1582987903724', 'Quj777Nmn9ar0Ivc');

	return tradfri;
}

async function findDevices(tradfri: TradfriClient): Promise<Accessory[]> {
	tradfri.observeDevices();
	await delay(1000);
  const devices: Accessory[] = [];
  for (const deviceId in tradfri.devices) {
    devices.push(tradfri.devices[deviceId]);
	}

  return devices;
}

async function main(): Promise<void> {
	const tradfri: TradfriClient = await connect();
  const devices: Accessory[] = await findDevices(tradfri);
  
  devices.forEach((device: Accessory) => {
    if (device.type === 2) {
      const light: Light = device.lightList[0];
      light['client'] = tradfri;
      light.toggle();
    }
  })
	
  await delay(1000);
	tradfri.destroy();
}

main().then(() => process.exit(0));
