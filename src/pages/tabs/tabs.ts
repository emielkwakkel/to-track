import { Component } from "@angular/core";
import { IonicPage } from "@ionic/angular";

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root: string = 'CompanyListPage';
    tab2Root: string = 'HourListPage';
    tab3Root: string = 'UserPage';

    constructor() { }

    ionViewCanEnter(): boolean {
        // can only enter if sucessfully logged in.
        return true
    }
}
