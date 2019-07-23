import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForage } from 'ngforage';


export interface ProductPrice {
	name: string;
	msrp: number;
	lowestPrice: number;
	lowestPriceCompany: string;
}

export interface PriceNotifierRow {

}

@Injectable({
	providedIn: 'root'
})
export class PricesService {
	private _prices: BehaviorSubject<ProductPrice[]>;

	constructor(
		private http: HttpClient,
		private readonly ngf: NgForage
	) {
		this.init();
	}

	public async init() {
		this._prices = new BehaviorSubject(undefined);
		const prices = await this.ngf.getItem('prices') as ProductPrice[];
		this._prices.next(prices);
	}

	public getPrices(): Observable<ProductPrice[]> {
		return this._prices.asObservable();
	}

	public setPrices(prices: PriceNotifierRow[]) {
		if (!prices) {
			return false;
		}

		// Process Prices
		 const productPrices = prices.map(p => {

			// Get the lowest price
			let lowestPrice = this.moneyStringToInt(p['MSRP']);
			let lowestPriceCompany = 'MSRP';
			Object.keys(p).forEach(k => {
				const v = p[k];
				console.log(k, v);
				if (typeof v !== 'object' && v.indexOf('$') > -1) {
					if (this.moneyStringToInt(v) < lowestPrice || lowestPrice === 0) {
						lowestPrice = this.moneyStringToInt(v);
						lowestPriceCompany = k;
					}
				}
			});

			return {
				name: p['Game'],
				msrp: this.moneyStringToInt(p['MSRP']),
				lowestPrice,
				lowestPriceCompany
			}
		})

		console.log('Product Prices', productPrices);

		// Cache and store in subject
		this.ngf.setItem('prices', productPrices);
		this._prices.next(productPrices);
	}

	private moneyStringToInt(moneyString: string) {
		if (!moneyString) {
			return 0;
		}

		const int = parseInt(moneyString.replace('CAD $', '').replace('$', ''), 10);
		if (isNaN(int)) {
			return 0;
		} else {
			return int;
		}
	}

}
