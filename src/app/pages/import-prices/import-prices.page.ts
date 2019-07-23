import { Component, OnInit } from '@angular/core';
import * as csvtojson from 'csvtojson';
import { PricesService } from 'src/app/core/prices.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-import-prices',
  templateUrl: './import-prices.page.html',
  styleUrls: ['./import-prices.page.scss'],
})
export class ImportPricesPage implements OnInit {

  constructor(
    private pricesService: PricesService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public addFile(files: FileList) {
    console.log(files.item(0));

    const reader = new FileReader();
    reader.readAsText(files.item(0));
    reader.onload = (async event => {
        const csvData = event.target['result'];
        const arr = await csvtojson().fromString(csvData);
        this.pricesService.setPrices(arr);
        this.modalController.dismiss();
    });

		return false;
	}

}
