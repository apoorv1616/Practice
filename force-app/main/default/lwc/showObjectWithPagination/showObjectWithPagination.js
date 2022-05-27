import { LightningElement,track } from 'lwc';

export default class ShowObjectWithPagination extends LightningElement {
    @track handleChangeObject = {};
    @track showRecords = 10;

    get options() {
        return [
            { label: 'Account', value: 'account' },
            { label: 'Contact', value: 'contact' },
            { label: 'Opportunity', value: 'opportunity' },
        ];
    }

    handleChange(event) {
        this.handleChangeObject[event.taget.name] = event.detail.value;
    }
}