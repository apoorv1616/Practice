global class SendEmailToContacts implements Database.Batchable<sobject> {
    
    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT Id,Name,Email FROM Contact WHERE Email != NULL]);
    }
    
    global void execute(Database.BatchableContext bc,List<Contact> scope){
        
        List<Messaging.SingleEmailMessage> allMails = new List<Messaging.SingleEmailMessage>();
        List<String> emailList = new List<String>{};
            
            for(Contact con : scope){
                emailList.add(con.Email);
            }
        
        for(String email : emailList){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(emailList);
            mail.setSubject('Test Subject');
            mail.setHtmlBody('Test Body,Hi');
            allMails.add(mail);
        }
            
        try{    
            Messaging.SendEmailResult[] results = Messaging.sendEmail(allMails);
            System.debug(results);
        }
        catch(Exception e){
            System.debug(e.getMessage());
        }
    }
    
    global void finish(Database.BatchableContext bc){
        
    }
}