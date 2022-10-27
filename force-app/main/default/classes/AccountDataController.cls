public with sharing class AccountDataController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Owner.Name, Number_of_Employees__c, Budget__c, Type FROM Account WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true scope='global')
    public static Account[] searchAccounts(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAccountList();
        }
        // Prepare query paramters
        searchTerm = '%' + searchTerm + '%';
        // Execute search query
        return [
            SELECT Id, Name, Owner.Name, Number_of_Employees__c, Budget__c, Type FROM Account
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
