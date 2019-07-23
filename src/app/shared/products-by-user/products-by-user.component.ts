import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Product, Linkeduser } from 'src/app/core/product.model';
import { AppService } from 'src/app/core/app.service';
import { map, filter } from 'rxjs/operators';
import { PricesService } from 'src/app/core/prices.service';

export interface UserProductsGroup {
  user: Linkeduser;
  products: Product[];
}

@Component({
  selector: 'app-products-by-user',
  templateUrl: './products-by-user.component.html',
  styleUrls: ['./products-by-user.component.scss'],
})
export class ProductsByUserComponent implements OnInit {

  public userProductGroups$: Observable<UserProductsGroup[]>;

  public itemRange = {
    lower: 1,
    upper: 10
  };
  public minimumItems = 1;
  public maximumItems = 10;

  constructor(
    private appService: AppService,
    private priceService: PricesService
  ) {

    // TODO: Combine Latest with prices and add prices into rows
    this.userProductGroups$ = combineLatest([
      this.appService.getProducts()
        .pipe(
          filter(products => products ? true : false)
        ),
        this.priceService.getPrices()
      ])
      .pipe(map(([products, prices]) => {
        const users: Linkeduser[] = [];
        const userProductsGroups: UserProductsGroup[] = [];

        // First, loop through products and attach them to users
        products.forEach(product => {

          // Add prices if they exist
          if (prices) {
            prices.forEach(price => {
              if (price.name === product.objectlink.name) {
                product.prices = price;
              }
            });
          }

          if (!users[product.linkeduser.username]) {
            users[product.linkeduser.username] = [];
          }
          users[product.linkeduser.username].push(product);
        });

        // Then, map users into a UserProductsGroup array
        Object.keys(users).forEach(k => {
          userProductsGroups.push({
            user: users[k][0].linkeduser,
            products: users[k]
          });

          // Set our max ranges
          if (users[k].length > this.maximumItems) {
            this.maximumItems = users[k].length;
            this.itemRange.upper = users[k].length;
          }

        });

        console.log('userProductsGroups', userProductsGroups);

        return userProductsGroups.sort((a, b) => {
          const nameA = a.products.length;
          const nameB = b.products.length;
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }

          return 0;
        });
      }));

  }

  ngOnInit() {}

  public setRange(ev) {
    this.itemRange = ev.detail.value;
  }

}
