import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonRadio, IonRadioGroup  } from '@ionic/angular/standalone';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonRadio, IonRadioGroup  ]
})
export class ItemListPage implements OnInit {
  items: Array<string> = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.items = this.dataService.getItems();
  }

}
