import { Component, OnInit } from '@angular/core';
import { State, AppService } from '../../core/app.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { ScrapeModalPage } from '../scrape-modal/scrape-modal.page';
import { ImportPricesPage } from '../import-prices/import-prices.page';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
	public state$: Observable<State>;
	public scrapeModal: HTMLIonModalElement;
	public isScrapeModalOpen = false;
	public segmentState = 'user';

	constructor(
		private appService: AppService,
		private modalController: ModalController
	) {}

	ngOnInit() {
		this.state$ = this.appService.getState()
			.pipe(
				tap(state => {
					console.log('state', state);
					if (!state.lastRefreshed && !this.isScrapeModalOpen) {
						this.openScrapeModal();
					} else if (this.scrapeModal) {
						this.isScrapeModalOpen = false;
						this.scrapeModal.dismiss();
					}
				})
			);
	}

	public async openScrapeModal() {
		this.isScrapeModalOpen = true;
		this.scrapeModal = await this.modalController.create({
			component: ScrapeModalPage
		});
		return await this.scrapeModal.present();
	}

	public async openImportPricesModal() {
		const modal = await this.modalController.create({
			component: ImportPricesPage
		});
		return await modal.present();
	}

	public segmentChanged(ev) {
		this.segmentState = ev.detail.value;
	}

}
