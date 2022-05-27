import { LightningElement,track } from 'lwc';
import getAllRecords from '@salesforce/apex/filterRecordClass.getAllRecords'

export default class LwcProductFilter extends LightningElement {
    @track value = '';
    @track displayData = False;
    @track AllRecords = [];

    get options() {
        return [
            { label: 'RainbowBots', value: 'RainbowBots' },
            { label: 'CloudyBots', value: 'CloudyBots' },
            {label: 'Assembly Systems', value: 'Assembly Systems'}
        ];
    }

    showRecords() {
        this.displayData = true;
        getAllRecords({name : this.value}).then(response=>{
            this.AllRecords = response;
        })
    }
}