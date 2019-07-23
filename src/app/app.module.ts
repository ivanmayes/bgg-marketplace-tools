import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { NgForageModule, Driver } from 'ngforage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ScrapeModalPage } from './pages/scrape-modal/scrape-modal.page';
import { ScrapeModalPageModule } from './pages/scrape-modal/scrape-modal.module';
import { ImportPricesPage } from './pages/import-prices/import-prices.page';
import { ImportPricesPageModule } from './pages/import-prices/import-prices.module';

@NgModule({
	declarations: [AppComponent],
	entryComponents: [ScrapeModalPage, ImportPricesPage],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		CoreModule,
		SharedModule,
		// Optional in Angular 6 and up
		NgForageModule.forRoot(),
		ScrapeModalPageModule,
		ImportPricesPageModule
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
