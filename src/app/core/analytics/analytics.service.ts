import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

declare var ga: Function;

@Injectable()
export class AnalyticsService {
	private trackingId: string;
	private userId: string;

	private sessionId: string;
	private deviceType: string;
	private kioskId: string;

	// dimension1: Device Type
	// dimension2: Kiosk Id

	constructor() {
		this.trackingId = environment.googleAnalyticsId;
	}

	public setSessionVars(userId, deviceType, kioskId) {
		this.userId = userId;
		this.deviceType = deviceType;
		this.kioskId = kioskId;
	}

	public startSession(forceNewSession?: boolean): void {
		if (!environment.analytics) {
			return;
		}
		if (!this.sessionId) {
			if (this.userId) {
				this.sessionId = this.userId;
			} else {
				this.sessionId = 'anonymous-user-' + Date.now().toString();
			}

			// ga('set', {
			//     'dimension1': this.deviceType,
			//     'dimension2': this.kioskId
			// });

			ga('set', 'userId', this.sessionId);
			ga('send', 'pageview', { sessionControl: 'start' });
		} else if (forceNewSession) {
			this.stopSession();
			this.startSession();
		}
	}

	public stopSession(): void {
		if (!environment.analytics) {
			return;
		}
		if (this.sessionId) {
			ga('send', 'pageview', { sessionControl: 'end' });
			ga('set', 'userId', '');
			// ga('set', {
			//     'dimension1': null,
			//     'dimension2': null,
			// });
			this.sessionId = undefined;
		}
	}

	public sendEvent(
		category: string,
		action: string,
		label?: string,
		val?: number,
		extra?: any
	): void {
		if (!environment.analytics) {
			return;
		}
		this.startSession();
		const obj: any = {
			eventCategory: category,
			eventAction: action,
			user: this.sessionId
		};

		if (label) {
			obj.eventLabel = label;
		}

		if (val) {
			obj.eventValue = val;
		}

		if (extra) {
			obj.extra = extra;
		}

		if (environment.analytics) {
			ga('send', 'event', obj);
		}
	}

	public setPage(page): void {
		if (environment.analytics) {
			ga('set', 'page', page);
		}
	}

	public sendPageView(page): void {
		this.startSession();

		if (environment.analytics) {
			ga('set', 'page', page);
			ga('send', {
				hitType: 'pageView',
				user: this.sessionId
			});
		}
	}
}
