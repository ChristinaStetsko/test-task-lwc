import { LightningElement, api, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import {APPLICATION_SCOPE, MessageContext, subscribe} from 'lightning/messageService';
import ACCOUNTMC from '@salesforce/messageChannel/Accounts__c';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';

import ACCOUNT_ID_FIELD from '@salesforce/schema/Account.Id';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_OWNER_FIELD from '@salesforce/schema/Account.Owner.Name';
import ACCOUNT_BUDGET_FIELD from '@salesforce/schema/Account.Budget__c';
import ACCOUNT_EMPL_FIELD from '@salesforce/schema/Account.Number_of_Employees__c';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';

const ACCOUNTFIELDS = [ACCOUNT_ID_FIELD, 
                ACCOUNT_NAME_FIELD, 
                ACCOUNT_OWNER_FIELD, 
                ACCOUNT_BUDGET_FIELD, 
                ACCOUNT_EMPL_FIELD, 
                ACCOUNT_TYPE_FIELD];


export default class AccountCard extends NavigationMixin(LightningElement) {
    @api accountId;
    wiredRecord;
    
    @wire(getRecord, {recordId: '$accountId', fields: ACCOUNTFIELDS})
    wiredRecord;

    get accountName() {
        return getFieldValue(this.wiredRecord.data, ACCOUNT_NAME_FIELD);
    }
    
    subscription = null;
    @wire(MessageContext)
    messageContext;

    // Subscribe to the message channel
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        // local accountId must receive the recordId from the message
        this.subscription = subscribe(
            this.messageContext,
            ACCOUNTMC,
            (message) => {
                this.accountId = message.recordId;
            },
            {scope: APPLICATION_SCOPE}
        );
    }

    // Calls subscribeMC()
    connectedCallback() {
        this.subscribeMC();
    }


    navigateToRecord() {
        // Use the built-in 'Navigate' method
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '0015g0000105QN0AAM',
                //recordId: this.account.data.Id,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}