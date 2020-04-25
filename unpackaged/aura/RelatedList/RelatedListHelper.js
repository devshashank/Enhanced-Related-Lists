({
    fetchRelatedList : function(component,event,helper,showList) {
        var query = component.get("v.ObjectQuery");
        query = query.replace(/ {1,}/g, ' ');
        let geticon = (component.get("v.imageUrl") == '');
        var action = component.get("c.fetchRelatedList");
        action.setParams({
            objectQuery: query,
            getIcon : geticon,
            CurrentPageObject: component.get("v.sObjectName"),
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                if(result.serverStatus == 'success'){
                    let fullList = helper.dataprocessor(component,JSON.parse(JSON.stringify(response.getReturnValue())));
                    component.set("v.fullRelatedList",fullList);
                    var offset = component.get("v.listOffset");
                    var showList = offset
                    if(fullList!=undefined && fullList.length>0 ){
                        if(fullList.length<=offset)
                        { 
                            var cmpTarget = component.find('changeIt');
                            $A.util.addClass(cmpTarget, 'isDisabled');
                        }else{
                            fullList =fullList.slice(0,offset);
                        }
                    }
                    component.set("v.RelatedList",fullList);
                    component.set("v.HeaderIcon",response.getReturnValue().objectIcon)
                    component.set("v.isIcon",response.getReturnValue().iconExist);
                    component.set("v.relatedObjName",response.getReturnValue().sobjectName);
                    component.set("v.showList",showList);
                    
                }else{
                    helper.showToast(result.serverStatus,'Error!','error');
                    
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
            component.set("v.loaded",false);
            
        });
        $A.enqueueAction(action);
    },
    dataprocessor : function(component,resultWrapper){
        let rows = [];
        let fdata = resultWrapper.resultData;
        for(let index in fdata ){
            let fieldList = [];
            for(let field of resultWrapper.fStruct){
                let rowdata = JSON.parse(JSON.stringify(field));
                let fields = field.apiName.split('.');
                if (fields.length >= 1) {
                    switch (fields.length) {
                        case 1:
                            let firstlevel_0 = fdata[index][fields];
                            rowdata.value = firstlevel_0;
                            break;
                        case 2:
                            let firstlevel_1 = fdata[index][fields[0]];
                            firstlevel_1 = firstlevel_1 != undefined ? firstlevel_1[fields[1]] : '';
                            rowdata.value = firstlevel_1;
                            break;
                        case 3:
                            let secondlevel_2 = fdata[index][fields[0]];
                            secondlevel_2 = secondlevel_2 == undefined ? '' : secondlevel_2[fields[1]];
                            secondlevel_2 = secondlevel_2 == '' ? '' : secondlevel_2[fields[2]];
                            rowdata.value = secondlevel_2;
                            break;
                        case 4:
                            let thirdlevel_3 = fdata[index][fields[0]];
                            thirdlevel_3 = thirdlevel_3 == undefined ? '' :thirdlevel_3[fields[1]];
                            thirdlevel_3 = thirdlevel_3 == '' ? '' : thirdlevel_3[fields[2]];
                            thirdlevel_3 = thirdlevel_3 == '' ? '' :thirdlevel_3[fields[3]];
                            rowdata.value = thirdlevel_3;
                            break;
                    }
                    if(rowdata.value!='' && field.fieldType.includes('DATE')) 
                        rowdata.value = new Date(rowdata.value).toLocaleString();
                }
                fieldList.push(rowdata);
            }
            if(fieldList.length>=2 && fieldList[0].value!='' && fieldList[1].value!='' && fieldList[0].value!=component.get("v.recordId")){
                rows.push({id:fieldList[0].value,
                           name: fieldList[1].value,
                           rows: fieldList.slice(2,fieldList.length)
                          });  
            }
        }
        return rows;
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