({
	handleClick : function(component, event, helper) {
		var username = component.find("v.inputUserName");
        var password = component.find("v.inputPassword");
       	console.log(component.find("v.inputUserName") + ' ' +password);
        if(username === "admin@gmail.com" && password === "123") {
            component.set("v.userName",username);
            component.set("v.password",password);
        }
	}
})