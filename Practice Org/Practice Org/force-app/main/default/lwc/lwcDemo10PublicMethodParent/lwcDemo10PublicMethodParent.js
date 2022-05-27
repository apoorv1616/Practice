import { LightningElement ,track} from 'lwc';

export default class LwcDemo10PublicMethodParent extends LightningElement {
    @track value = 'red';

    options = [
                { label: 'Red', value : 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Yellow', value: 'yellow' },
                { label: 'White', value: 'white' },
                { label: 'Black', value: 'black' }
    ];

    handleChange(event) {
        this.value = event.target.value;
        console.log("this.value "+this.value);
        
        var childCmp = this.template.querySelector('c-lwc-demo10-public-method-child');
        console.log("inside"); 
        childCmp.selectCheckbox(this.value);
    }
}