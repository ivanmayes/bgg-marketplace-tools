import { Component, OnInit } from '@angular/core';
import { AppService } from '../../core/app.service';
import { tap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scrape-modal',
  templateUrl: './scrape-modal.page.html',
  styleUrls: ['./scrape-modal.page.scss'],
})
export class ScrapeModalPage {

  	public inputForm = this.fb.group({
		userId: ['', Validators.required]
	});

	constructor(
		private appService: AppService,
		private fb: FormBuilder,
	) {}

	get userId() {
		return this.inputForm.get('userId');
	}

	public submit() {
		this.appService.scrapeProducts(this.inputForm.value.userId);
	}

}
