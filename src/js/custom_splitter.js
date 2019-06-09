function splitMe(input, split) {
    var length = input.length;
    var output = [];
    var buffer = "";
    for(var i=0; i<length; i++){

        if(input[i] =="{" || input[i] == "["){
            var start = i;
            var end = checkforMetadata(input, i);
            buffer = input.substr(start, end);
            output.push(buffer.trim());
            i=end;
            buffer = "";
            continue;
        }

        if(input[i] != split){
            if(input[i] != "\"" && input[i] != "'"){
                buffer+= input[i];
            }
        } else{
            if(buffer != "") {
                output.push(buffer.trim());
            }
            buffer = "";
        }

        if(i == length-1){
            if(buffer !=  "") {
                output.push(buffer.trim());
            }
        }
    }
    return output;
}

function checkforMetadata(input, index) {
        var stack = new Stack();
        stack.push(input[index]);
        index++;
        while(stack.size() > 0){
            if(stack.size()>5000){
                break;
            }
            if(input[index] == "}" && stack.peek() == "{") {
                stack.pop();
            } else
            if(input[index] == "]" && stack.peek() == "["){
                stack.pop();
            } else if(input[index] == "{" || input[index] == "["){
                stack.push(input[index]);
            }
            index ++;
        }
        return index-1;
}

function driver(input){
    console.log(splitMe(input, ","));
}


var Stack = function() {
    this.count = 0;
    this.storage = {};
};

// Adds a value onto the end of the stack
Stack.prototype.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
};

// Removes and returns the value at the end of the stack
Stack.prototype.pop = function() {
    // Check to see if the stack is empty
    if (this.count === 0) {
        return undefined;
    }

    this.count--;
    var result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
};
// Returns the length of the stack
Stack.prototype.size = function() {
    return this.count;
};

Stack.prototype.peek  = function(){
    var count = this.count;
    return this.storage[count-1];
};


//driver("hellome");
//driver("a,b,c,{}");

driver("'{\"RecordRef\":{\"properties\":{\"externalId\":{\"type\":\"string\",\"x-nullable\":true,\"x-samplevalue\":\"36860\"},\"internalId\":{\"type\":\"string\",\"x-nullable\":true,\"x-samplevalue\":\"36860\"},\"name\":{\"type\":\"string\",\"x-nullable\":true,\"x-samplevalue\":\"ABCD\"},\"type\":{\"$ref\":\"#/definitions/RecordType\",\"x-nullable\":true}},\"x-has-customfields\":false,\"x-primary-key\":[\"internalId\"],\"x-vendor-objectname\":\"RecordRef\"},\"RecordRefList\":{\"items\":{\"$ref\":\"#/definitions/RecordRef\"},\"type\":\"array\"},\"RecordType\":{\"properties\":{\"value\":{\"enum\":[\"account\",\"accountingPeriod\",\"assemblyBuild\",\"assemblyUnbuild\",\"assemblyItem\",\"billingAccount\",\"billingSchedule\",\"bin\",\"binTransfer\",\"binWorksheet\",\"budget\",\"budgetCategory\",\"calendarEvent\",\"campaign\",\"campaignAudience\",\"campaignCategory\",\"campaignChannel\",\"campaignFamily\",\"campaignOffer\",\"campaignResponse\",\"campaignSearchEngine\",\"campaignSubscription\",\"campaignVertical\",\"cashRefund\",\"cashSale\",\"check\",\"charge\",\"classification\",\"contact\",\"contactCategory\",\"contactRole\",\"costCategory\",\"couponCode\",\"creditMemo\",\"crmCustomField\",\"currency\",\"currencyRate\",\"customList\",\"customRecord\",\"customRecordCustomField\",\"customRecordType\",\"customTransaction\",\"customTransactionType\",\"customer\",\"customerCategory\",\"customerDeposit\",\"customerMessage\",\"customerPayment\",\"customerRefund\",\"customerStatus\",\"deposit\",\"depositApplication\",\"department\",\"descriptionItem\",\"discountItem\",\"downloadItem\",\"employee\",\"entityCustomField\",\"entityGroup\",\"estimate\",\"expenseCategory\",\"expenseReport\",\"fairValuePrice\",\"file\",\"folder\",\"giftCertificate\",\"giftCertificateItem\",\"globalAccountMapping\",\"interCompanyJournalEntry\",\"interCompanyTransferOrder\",\"inventoryAdjustment\",\"inventoryCostRevaluation\",\"inventoryItem\",\"inventoryNumber\",\"inventoryTransfer\",\"invoice\",\"itemAccountMapping\",\"itemCustomField\",\"itemDemandPlan\",\"itemFulfillment\",\"itemGroup\",\"itemNumberCustomField\",\"itemOptionCustomField\",\"itemSupplyPlan\",\"itemRevision\",\"issue\",\"job\",\"jobStatus\",\"jobType\",\"itemReceipt\",\"journalEntry\",\"kitItem\",\"leadSource\",\"location\",\"lotNumberedInventoryItem\",\"lotNumberedAssemblyItem\",\"markupItem\",\"message\",\"manufacturingCostTemplate\",\"manufacturingOperationTask\",\"manufacturingRouting\",\"nexus\",\"nonInventoryPurchaseItem\",\"nonInventoryResaleItem\",\"nonInventorySaleItem\",\"note\",\"noteType\",\"opportunity\",\"otherChargePurchaseItem\",\"otherChargeResaleItem\",\"otherChargeSaleItem\",\"otherCustomField\",\"otherNameCategory\",\"partner\",\"partnerCategory\",\"paycheckJournal\",\"paymentItem\",\"paymentMethod\",\"payrollItem\",\"phoneCall\",\"priceLevel\",\"pricingGroup\",\"projectTask\",\"promotionCode\",\"purchaseOrder\",\"purchaseRequisition\",\"resourceAllocation\",\"returnAuthorization\",\"revRecSchedule\",\"revRecTemplate\",\"salesOrder\",\"salesRole\",\"salesTaxItem\",\"serializedInventoryItem\",\"serializedAssemblyItem\",\"servicePurchaseItem\",\"serviceResaleItem\",\"serviceSaleItem\",\"solution\",\"siteCategory\",\"state\",\"statisticalJournalEntry\",\"subsidiary\",\"subtotalItem\",\"supportCase\",\"supportCaseIssue\",\"supportCaseOrigin\",\"supportCasePriority\",\"supportCaseStatus\",\"supportCaseType\",\"task\",\"taxAcct\",\"taxGroup\",\"taxType\",\"term\",\"timeBill\",\"timeSheet\",\"topic\",\"transferOrder\",\"transactionColumnCustomField\",\"unitsType\",\"usage\",\"vendor\",\"vendorCategory\",\"vendorBill\",\"vendorCredit\",\"vendorPayment\",\"vendorReturnAuthorization\",\"winLossReason\",\"workOrder\",\"workOrderIssue\",\"workOrderCompletion\",\"workOrderClose\"],\"type\":\"string\",\"x-samplevalue\":\"account\",\"x-sub-format\":\"Enum\"}},\"x-has-customfields\":false,\"x-vendor-objectname\":\"RecordType\"}}', 'RecordRef', null, null, (select id from element_resource where path='/hubs/crm/saved-searches' and method='GET' and type='api' and  owner_account_id = (select account_id from ce_core_user where email_address = 'system') and element_id=(select element_id from element where element_key='netsuitecrmv2'  and deleted = false and element_owner_account_id = (select account_id from ce_core_user where email_address = 'system')))");

//console.log(checkforMetadata("{[]}", 0));