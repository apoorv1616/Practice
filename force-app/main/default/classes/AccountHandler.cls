public virtual class AccountHandler { //test
    public static void insertAccount(List<Account> newList, Map<Id,Account> oldMap) {
        Set<String> countrySet = new Set<String>{'US','USA','United States'};
        Set<String> stateSet = new Set<String>{'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME'
                ,'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT'
                ,'VT','VA','WA','WV','WI','WY'};
        
        for(Account acc : newList) {
        	if((countrySet.contains(acc.BillingCountry) || acc.BillingCountry == Null) 
               && stateSet.contains(acc.BillingState) 
               && (countrySet.contains(acc.ShippingCountry) || acc.ShippingCountry == Null) 
               && stateSet.contains(acc.ShippingState)) {
                   
               }
            else {
                acc.addError('Error : Either Country or State name is not valid.');
            }
            if(acc.Type == 'Customer - Channel' || acc.Type == 'Customer - Direct') {
                if(oldMap != NULL) {
                    if(acc.Name != oldMap.get(acc.Id).Name) {
                        acc.addError('Error : Cannot change Account Name');
                    }
                }
            }
        }
        
        
    }
}
