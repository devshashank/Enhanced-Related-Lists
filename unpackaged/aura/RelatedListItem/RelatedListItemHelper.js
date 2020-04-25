({
    deleteRecord : function(component,event,helper) {
        var action = component.get("c.deleterecord");
        action.setParams({
            recordId: component.get("v.record.id"),
            objName : component.get("v.relatedObjName")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()=='success'){
                    var compEvent = component.getEvent("relatedListcmp");
                    compEvent.fire();
                    helper.showToast('Record Deleted SuccessFully','Success!','success');
                }else{
                    helper.showToast(response.getReturnValue(),'Error!','error');
                }
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                        helper.showToast(errors[0].message,'Error!','error');
                        
                    }
                } 
            }
            component.set("v.showDelModal",false);
            
        });
        $A.enqueueAction(action);
    },
    showToast : function(message,title,type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type":type,
            "mode": 'dismissible'
        });
        toastEvent.fire();
    }
})