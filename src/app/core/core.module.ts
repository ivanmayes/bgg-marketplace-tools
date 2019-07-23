import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AnalyticsService } from './analytics/analytics.service';
import { AppService } from './app.service';
import { PricesService } from './prices.service';

@NgModule({
	imports: [CommonModule, HttpClientModule],
	exports: [],
	declarations: [],
	providers: [AnalyticsService, AppService, PricesService]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				`Core Module has already been loaded. Import Core modules in the AppModule only.`
			);
		}
	}
}
