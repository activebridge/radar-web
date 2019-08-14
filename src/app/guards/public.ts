import { Injectable } from '@angular/core';

import { BaseGuard } from './base';

@Injectable()

export class PublicGuard extends BaseGuard {

  canActivate() {
    if (this.tokenAuthService.userSignedIn() && this.localStorageService.currentUser) {
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
