import { Component } from '@angular/core';


import { HomePage } from '../home/home.component';

@Component({
  templateUrl: 'tabs.component.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = '';

  constructor() {

  }
}
