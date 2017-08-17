import { Company } from './company.model';

export class CompanyService {
    private _companies: Company[];
    constructor() {
        this._companies = [
            {
                name: 'Rabobank',
                location: {
                    long: '',
                    lat: '',
                    radius: 100
                }
            },
            {
                name: 'Sogeti',
                location: {
                    long: '',
                    lat: '',
                    radius: 100
                }
            }
        ]
    }

    get companies(): Company[] {
        return this._companies;
    }
}
