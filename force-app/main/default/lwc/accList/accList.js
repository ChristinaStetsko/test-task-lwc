import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import ACC_LIST_UPDATE_MESSAGE from '@salesforce/messageChannel/Accounts__c';
import searchAccounts from '@salesforce/apex/AccountDataController.searchAccounts'
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class AccList extends LightningElement {
    searchTerm = '';
    selectedAccountId = '';
    accounts;
    error;

    value = '';

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA',
        fieldApiName: TYPE_FIELD
    })
    picklistValues;

    handleChange(event) {
        this.value = event.detail.value;
    }

    @wire(MessageContext) messageContext;

    @wire(searchAccounts, { searchTerm: '$searchTerm' })
    wiredAccounts(result) {
        this.accounts = result;
        if (result.error) {
            this.error = result.error;
            this.accounts = undefined;
        }
    }

    updateSelectedTile(event) {
        this.selectedAccountId = event.detail.accountId;
        this.sendMessageService(this.selectedAccountId);
    }

    sendMessageService(accountId) {
        // explicitly pass accountId to the parameter recordId
        publish(this.messageContext, ACC_LIST_UPDATE_MESSAGE, {
            recordId: accountId
        });
    }

    handleSearchTermChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm;
        }, 300);
    }
    get hasResults() {
        return (this.accounts.data.length > 0);
    }
}