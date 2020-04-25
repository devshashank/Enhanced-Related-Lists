# Enhanced-Related-Lists
It includes the functionality of Showcasing Related List to your record page with parent object fields of related object.
You can also show junction object Records with it like Showing All Related Cases as Connection with common Account at the Contact Record Page.<br/>
<b>Use Case :Its a Case and you want to show a related List of All Cases whose Account is the current Case's Account.<br/> 

Additional Functionalities: </b>
- If you have Linked your Contacts/Accounts/Leads to Social (Twitter,Youtube), you can see the images in the related list
- All the standard/custom objects whose tab Exists will get their icon displayed in related list(default is action:freeze_user)
- You can give Any External Image through URL to showcase as icon in Related List.
- you can show any list of record related/non related to the current record page and can give Own Title to the related list
- can Collapse/Expand the Section of Related List and can set the default behaviour while load.
- It has three default New/Delete/Edit Button with related records which could be extended further as per use.
- You can configure how many records you want to show initially to save up space.
- You can configure the display of icon with records(show it or not) and can replace it with any Image Outside SF.


You can deploy the package directly to your personal Dev org or Sandbox and for using it you need to Understand the Input Paramters
Identify the query to be run which will get you the desired records.<br/>
Example :--<br/>
<b>SELECT Id,CaseNumber FROM Case WHERE Accountid='&lt;&lt;AccountId>>' (It will get the Related Cases against Same Account)</b><br/>
or you can simply show the records of any custom related object using this below query<br/>
<b>SELECT Id,Name from Custom_Object__c WHERE Id='&lt;&lt;recordId>>' (it will get the related Object Records to Case)</b><br/>
Guidelines for Query : <br/>
- for filtering the records based on current page record Id only put "recordId" keyword in <<>>. otherwise filter won't work.<br/>
- you can show parent fields also in the query but the Api Name should be exact with namespace if any and Case sensitivity is handled already.<br/>
- In case you want to filter records by current object field then The values inside <<>> should be the exact api name of the field. like 
like for Case.Accountid  in filter put &lt;&lt;Accountid>>
- currently the Filter works for one recordId and one additional Object field Filter so <<>> can be used two times only with different fields including recordId.
- Atleast two fields should be mentioned in the query & The First field should be an ID type field and second could be associated Name type field so as it could redirect to record and it's name is visible to User. Any Record from query results with no value in first two field will not be shown in the UI.

You have to Use RelatedList component in the record Page(Using Lightning App Builder) where you can set the design attributes to achieve the required functionality if covered. It Includes: <br/>
 - <b>RelatedlistTitle:</b> The Title of Related List that You Want to show.EX. Connections.<br/>
 - <b>ObjectQuery:</b> you need to mention the query to fetch the records as per the guidelines given Above<br/>
 - <b>imageUrl:</b> you can specify any image URL to shocase in the icon place of the Object as well as Record list<br/>
 - <b>showList:</b>What do you want your default view of the List on Load (Expanded/Collapsed)<br/>
 - <b>showIcon:</b>If you want to Hide the icon/Image on the records List you can unmark it<br/>
 - <b>listOffset:</b>No of Records you want to show initially on Component load<br/>


