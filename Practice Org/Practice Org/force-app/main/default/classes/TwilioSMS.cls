public class TwilioSMS {
    public static HTTPResponse sendSms(){
        System.debug('I am inside twilio');
        String phNumber = '+918107911700';      
        String accountSid = 'ACf76fb45dd861b1936451591ef729ec06';
        String token = '900d51f97de818d08916b58a5665e980'; 
        String CT_Twilio_Messaging_Service_SID = 'MGfea5ae849ca5ff825065949c057e6aab ';
        
        
		STRING CT_Twilio_Endpoint = 'https://api.twilio.com/2010-04-01/Accounts/' +'/Messages.json';
        String smsBody = 'Hey!';
        HttpRequest req = new HttpRequest();
        
        req.setEndpoint(CT_Twilio_Endpoint+accountSid+'/Messages.json');
        req.setMethod('POST'); 
        String VERSION  = '3.2.0';
        req.setHeader('X-Twilio-Client', 'salesforce-' + VERSION);
        req.setHeader('User-Agent', 'twilio-salesforce/' + VERSION);
        req.setHeader('Accept', 'application/json');
        req.setHeader('Accept-Charset', 'utf-8');
        req.setHeader('Authorization','Basic '+EncodingUtil.base64Encode(Blob.valueOf(accountSid+':' +token)));

        req.setBody('To='+EncodingUtil.urlEncode(phNumber,'UTF-8')+'&MessagingServiceSid='+CT_Twilio_Messaging_Service_SID+'&Body='+smsBody);
        
        Http http = new Http();
       
        return http.send(req);
    
}
}