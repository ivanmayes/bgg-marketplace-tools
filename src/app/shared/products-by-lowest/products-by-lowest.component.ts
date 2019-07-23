import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/core/app.service';
import { PricesService } from 'src/app/core/prices.service';
import { combineLatest, Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Linkeduser } from 'src/app/core/product.model';
import { UserProductsGroup } from '../products-by-user/products-by-user.component';

@Component({
  selector: 'app-products-by-lowest',
  templateUrl: './products-by-lowest.component.html',
  styleUrls: ['./products-by-lowest.component.scss'],
})
export class ProductsByLowestComponent implements OnInit {

  public lowestProducts$: Observable<UserProductsGroup[]>;
  public minimumAmount: BehaviorSubject<number> = new BehaviorSubject(5);

  constructor(
    private appService: AppService,
    private priceService: PricesService
  ) {

    // TODO: Combine Latest with prices and add prices into rows
    this.lowestProducts$ = combineLatest([
      this.appService.getProducts()
        .pipe(
          filter(products => products ? true : false)
        ),
        this.priceService.getPrices(),
        this.minimumAmount.asObservable()
      ])
      .pipe(map(([products, prices, minimumAmount]) => {
        const lowestProductsObj = {};

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

          // Check if this product is lower than the current lowest product
          // console.log(product.objectlink.id, lowestProductsObj[product.objectlink.id], parseInt(product.price,10))
          if (
            (
              !lowestProductsObj[product.objectlink.id] ||
              parseInt(product.price,10) < parseInt(lowestProductsObj[product.objectlink.id].price, 10)
            ) &&
            parseInt(product.price,10) > minimumAmount
          ) {
            lowestProductsObj[product.objectlink.id] = product;
          }

        });

        // Then, map users into a UserProductsGroup array
        const lowestProducts = [];
        Object.keys(lowestProductsObj).forEach(k => {
          lowestProducts.push(lowestProductsObj[k]);
        });

        console.log('lowestProducts', lowestProducts);

        return lowestProducts.sort((a, b) => {
          const nameA = a.objectlink.name.toUpperCase();
          const nameB = b.objectlink.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
      }));

  }

  ngOnInit() {}

  public setRange(ev) {
    this.minimumAmount.next(ev.detail.value);
  }

}
