({
    handleSelect : function(component, event, helper) {
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue == 'Edit'){            
            var editRecordEvent = $A.get("e.force:editRecord");
            editRecordEvent.setParams({
                "recordId": component.get("v.record.id")
            });
            editRecordEvent.fire();
        }else{
            component.set("v.showDelModal",true);
        }
    },
    closeModel : function(component, event, helper) {
        component.set("v.showDelModal",false);
    },
    onRecorddelete: function(component,event,helper){
        helper.deleteRecord(component,event,helper);
    }    
})