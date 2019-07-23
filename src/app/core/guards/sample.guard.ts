import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';

@Injectable()
export class SampleGuard implements CanLoad {
	constructor(private router: Router) {}

	canLoad(route: Route): boolean {
		// Guard check here
		/*
            if() {
                return true;
            } else {
                this.router.navigate(['/somepath'], { skipLocationChange: true });
                return false;
            }
        */
		return true;
	}
}
