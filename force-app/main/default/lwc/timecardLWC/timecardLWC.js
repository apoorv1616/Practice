import { LightningElement,track } from 'lwc';

export default class TimecardLWC extends LightningElement {
    columns = [{label :'Project/Assignment',name:'Assignment'},
                    {label:'Mon',name:'Mon'},
                    {label:'Tue',name:'Tue'},
                    {label:'Wed',name:'Wed'},
                    {label:'Thu',name:'Thu'},
                    {label:'Fri',name:'Fri'},
                    {label:'Sat',name:'Sat'},
                    {label:'Sun',name:'Sun'},
                    {label:'Total',name:'Total'},
                    {label:'Notes',name:'Notes'},
                    {label:'Status',name:'Status'}];

    @track data = ['abcd'];

    connectedCallback(){
        
    }

}