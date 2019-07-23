import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForage } from 'ngforage';
import { map } from 'rxjs/operators';
import { Product } from './product.model';


export interface State {
	products?: Product[];
	lastRefreshed: string;
	userId: string;
	filters: {
		currency?: string;
		condition?: string;
		shipLocation?: string;
		eventPickup?: string;
		city?: string;
		state?: string;
	}
}

@Injectable({
	providedIn: 'root'
})
export class AppService {
	private _state: BehaviorSubject<State>;
	private apiUrl = `http://localhost:8001`;

	constructor(
		private http: HttpClient,
		private readonly ngf: NgForage
	) {
		this.init();
	}

	public async init() {
		this._state = new BehaviorSubject({
			lastRefreshed: localStorage.getItem('lastRefreshed'),
			userId: localStorage.getItem('userId'),
			filters: {
				shipLocation: 'United States',
				// city: 'Dallas'
			}
		});

		const products = await this.ngf.getItem('products');
		this.updateState({
			products
		});
	}

	public getState(): Observable<State> {
		return this._state.asObservable();
	}

	public setState(state: State) {
		this._state.next(state);
	}

	public updateState(state: any) {
		this._state.next({
			...this._state.value,
			...state
		});
	}

	public getProducts() {
		const filters = this._state.value.filters;

		return this._state.asObservable()
			.pipe(
				map(state => {
					if (!state || !state.products) {
						return undefined;
					}

					return state.products.filter(p => {
						if (filters.condition && p.condition !== filters.condition) {
							return false;
						}

						if (filters.currency && p.currency !== filters.currency) {
							return false;
						}

						if (
							filters.shipLocation &&
							(
								!p.linkeduser ||
								p.linkeduser.country !== filters.shipLocation
							)
						) {
							return false;
						}

						if (
							filters.city &&
							(
								!p.linkeduser ||
								p.linkeduser.city !== filters.city
							)
						) {
							return false;
						}

						if (
							filters.state &&
							(
								!p.linkeduser ||
								p.linkeduser.state !== filters.state
							)
						) {
							return false;
						}

						if (
							filters.eventPickup &&
							(
								!p.event ||
								p.event.name !== filters.eventPickup
							)
						) {
							return false;
						}

						return true;
					});
				})
			)
	}

	public scrapeProducts(userId: string) {
		const url = `${this.apiUrl}/items?id=${userId}`;

		this.http.get(url)
			.subscribe((resp: any) => {
				if (resp.data) {
					this.updateState({
						products: resp.data
					});

					localStorage.setItem('userId', userId);
					localStorage.setItem('lastRefreshed', new Date().getTime().toString());
					this.ngf.setItem('products', resp.data);
				} else {
					console.error('Something is wrong!', resp);
				}
			}, (err) => console.error(err));
	}
}
