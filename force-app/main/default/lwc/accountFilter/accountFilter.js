import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import getAccounts from '@salesforce/apex/AccountDataController.getAccounts';

export default class AccountFilter extends LightningElement {
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD })
    wiredPicklistValues({ error, data }) {
        // reset values to handle eg data provisioned then error provisioned
        this.picklistValues = undefined;
        if (data) {
            this.picklistValues = data;
        } else if (error) {
            console.log(error);
        }
    }  
}