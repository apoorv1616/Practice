import {
    LightningElement,
    api,
    track
} from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';

export default class Paginator extends LightningElement {
    @api pageSize = 0;
    @api items = [];
    @track page = 0;
    @track totalPage = 0;
    @track data;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track totalRecountCount = 0;

    connectedCallback() {
        console.log(JSON.stringify(this.items));
        this.startingRecord = this.items.length > 0 ? 1 : 0;
        this.totalRecountCount = this.items.length;
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
        this.data = this.items.slice(0, this.pageSize);
        this.endingRecord = this.pageSize;
        this.page = 1;
        this.displayRecordPerPage(this.page);

    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1; //decrease page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandler() {
        if ((this.page < this.totalPage) && this.page !== this.totalPage) {
            this.page = this.page + 1; //increase page by 1
            this.displayRecordPerPage(this.page);
        }
    }

    displayRecordPerPage(page) {

        this.startingRecord = ((page - 1) * this.pageSize);
        this.endingRecord = (this.pageSize * page);

        this.endingRecord = (this.endingRecord > this.totalRecountCount) ?
            this.totalRecountCount : this.endingRecord;

        this.data = this.items.slice(this.startingRecord, this.endingRecord);

        this.startingRecord = this.startingRecord + 1;
        
        const selectedEvent = new CustomEvent('dataevent', { detail: this.data});

        console.log("event dispatched");
        this.dispatchEvent(selectedEvent);

    }


    showToastMessage(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}