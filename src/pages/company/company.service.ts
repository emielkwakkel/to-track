import { Company } from './company.model';
import { UserService } from '../../user/user.service';
import * as firebase from 'firebase/app';

export class CompanyService {
    private _companies: Company[];
    private _user: firebase.User;
    private _database = firebase.database;

    constructor(public userService: UserService) {
        this._companies = [
            {
                name: 'Rabobank',
                locationEnabled: true,
                location: {
                    long: '',
                    lat: '',
                    radius: 100
                }
            },
            {
                name: 'Sogeti',
                locationEnabled: true,
                location: {
                    long: '',
                    lat: '',
                    radius: 100
                }
            }
        ]
;
        this._user = this.userService.user;
        console.log('user', this._user)
    }

    get companies(): Company[] {
        return this._companies;
    }

    writeCompany(company : Company) {
        console.log('add company', company);
        return this._database()
          .ref(`company${this._user.uid}/${company.name}`)
          .set(company);
    }
}
