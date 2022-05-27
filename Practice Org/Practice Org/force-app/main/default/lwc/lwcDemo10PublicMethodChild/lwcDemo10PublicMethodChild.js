import { LightningElement,track ,api} from 'lwc';

export default class LwcDemo10PublicMethodChild extends LightningElement {
    @track value = 'red';

    options = [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' }
        
    ];

    @api
    selectCheckbox(checkboxValue) {
        console.log(checkboxValue);
        var selectedCheckbox = this.options.find(checkbox => {
            return checkboxValue === checkbox.value;
        });

        if(selectedCheckbox) {
            this.value = selectedCheckbox.value;
        }
    }
}