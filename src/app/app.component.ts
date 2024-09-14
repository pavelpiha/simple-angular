import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'coffeelog';

  constructor(
    private snackBar: MatSnackBar,
    private swUpdate: SwUpdate,
    private pushService: PushNotificationService
  ) {}

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      // false positives, careful
      (document.querySelector('body') as any).style = '';
    } else {
      // we are offline
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }

  registerForPush() {
    this.pushService.subscribeToNotifications();
  }

  ngOnInit() {
    // Checking SW-based updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      this.swUpdate.versionUpdates.subscribe((update) => {
        if (update.type == 'VERSION_READY') {
          const sb = this.snackBar.open(
            'There is an updated version available',
            'Install Now',
            { duration: 40000 }
          );
          sb.onAction().subscribe(() => {
            //TODO: Do checks before reloading
            location.reload();
          });
        }
      });
    }

    // Updating the UI on network changes
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);

    // Inviting the user for Installation
    if (window.matchMedia('(display-mode: browser').matches) {
      // We are in the browser
      if ('standalone' in navigator) {
        // This only available in Safari
        this.snackBar.open(
          'You can install this app, use Share > Add to Home Screen',
          '',
          { duration: 3000 }
        );
      } else {
        // not Safari browser
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          const sb = this.snackBar.open('You can install this app', 'Install', {
            duration: 5000,
          });
          sb.onAction().subscribe(() => {
            (event as any).prompt();
            (event as any).userChoice.then((result: any) => {
              if (result.outcome === 'dismissed') {
                //log when user dismisses
              }
            });
          });
        });
      }
    }
  }
}
