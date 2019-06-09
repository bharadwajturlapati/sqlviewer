var statement = "insert into tablename(col1, col2) values ('va1', 'val2', null, {'name':'1', 'val':'2'}, null, '1')";


var testcase = function () {
  var splitVals = statement.split('values');
  if(splitVals.length !=2){
    console.error("you are crazy");
    return;
  }

  var sqlSplitter = santizeArray(splitVals);
  var insertInto = sqlSplitter[0];
  processInsertInto(insertInto);
  var values = sqlSplitter[1];
};

var santizeArray = function(unSanitizedArray){
  var sanityArray = [];
  for(var i=0; i<unSanitizedArray.length; i++){
    var untrimmed = unSanitizedArray[i];
    sanityArray.push(untrimmed.trim());
  }
  return sanityArray;
};

var processInsertInto = function(input){
  if(!input){
    return "";
  }

  var indexOfinsertInto = input.indexOf("(");
  var tableName = input.substr(0, indexOfinsertInto);
  var colValues = input.substr(indexOfinsertInto);
  console.log(tableName);
  console.log(colValues);
};


testcase();
