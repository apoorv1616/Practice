import { LightningElement ,track} from 'lwc';

export default class LwcDemo9SlotDemoParent extends LightningElement {
    contactInfoList = [
        {id: "11", name: "apoorv1" , email: "a1@a1.com"},
        {id: "12", name: "apoorv2" , email: "a2@mtxb2b.com"},
        {id: "13", name: "apoorv3" , email: "a3@mtxb2b.com"},
        {id: "14", name: "apoorv4" , email: "a4@mtxb2b.com"},
        {id: "15", name: "apoorv5" , email: "a5@mtxb2b.com"},
        {id: "16", name: "apoorv6" , email: "a6@mtxb2b.com"}
    ];

    @track selectedContactInfo;

    onTileSelectHandler(event) {
        var contactInfo = event.detail;
        this.selectedContactInfo = contactInfo.name;
    }

    constructor() {
        super();
        this.template.addEventListener('tileclick',this.onTileSelectHandler.bind(this));
        //onTileSelectHandler(this);
    }
}