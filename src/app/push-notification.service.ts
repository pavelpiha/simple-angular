// src/app/push-notification.service.ts
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  endpoint: string = 'http://localhost:3000';
  readonly VAPID_PUBLIC_KEY =
    'BEsdZ6O7IZqQW_xITUgxKi-5k8-tWUH78Z8OMJhML85mr2YMArbP02VZ0C-lUE9_iZ-vn7kpCiT1dc2Ph3-qknQ';

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToNotifications() {
    if (window.location.hostname !== 'localhost') {
      // For Android emulator
      this.endpoint = 'http://10.0.2.2:3000';
    }
    if (this.swPush.isEnabled) {
      Notification.requestPermission((permission) => {
        if (permission == 'granted') {
          this.swPush
            .requestSubscription({
              serverPublicKey: this.VAPID_PUBLIC_KEY,
            })
            .then((subscription) => {
              this.http
                .post(`${this.endpoint}/subscribe`, subscription)
                .subscribe(() => console.log('Subscription sent to server'));
            })
            .catch((err) =>
              console.error('Could not subscribe to notifications', err)
            );
        }
      });
    }
  }
}
