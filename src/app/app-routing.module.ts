import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: './pages/home/home.module#HomePageModule' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'scrape-modal', loadChildren: './pages/scrape-modal/scrape-modal.module#ScrapeModalPageModule' },
  { path: 'import-prices', loadChildren: './pages/import-prices/import-prices.module#ImportPricesPageModule' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
