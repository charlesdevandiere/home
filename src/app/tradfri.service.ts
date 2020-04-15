import { Injectable } from '@angular/core';
import { Accessory, discoverGateway, TradfriClient } from 'node-tradfri-client';
import { delay } from './delay';

@Injectable({
  providedIn: 'root'
})
export class TradfriService {
  private client: TradfriClient;

  public async init(): Promise<void> {
    const gateway = await discoverGateway();
    this.client = new TradfriClient(gateway.name);
  }

  public async authenticate(token: string): Promise<{ identity: string, psk: string }> {
    if (!this.client) {
      return Promise.reject(new Error('Tradfri client not initialized.'));
    }

    return await this.client.authenticate(token);
  }

  public async connect(identity: string, psk: string): Promise<void> {
    if (!this.client) {
      return Promise.reject(new Error('Tradfri client not initialized.'));
    }

    await this.client.connect(identity, psk);
  }

  public async findDevices(): Promise<Accessory[]> {
    if (!this.client) {
      return Promise.reject(new Error('Tradfri client not initialized.'));
    }

    this.client.observeDevices();
    await delay(1000);
    const devices: Accessory[] = [];
    for (const deviceId in this.client.devices) {
      if (this.client.devices.hasOwnProperty(deviceId)) {
        devices.push(this.client.devices[deviceId]);
      }
    }

    return devices;
  }
}
