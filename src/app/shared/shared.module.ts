import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ProductsByUserComponent } from './products-by-user/products-by-user.component';
import { ProductsByLowestComponent } from './products-by-lowest/products-by-lowest.component';

@NgModule({
	imports: [CommonModule, IonicModule, FormsModule, RouterModule],
	declarations: [
		ProductsByUserComponent,
		ProductsByLowestComponent
	],
	providers: [],
	entryComponents: [],
	exports: [
		CommonModule,
		ProductsByUserComponent,
		ProductsByLowestComponent
	]
})
export class SharedModule {}
