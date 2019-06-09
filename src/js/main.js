const insertRegex = new RegExp("insert into (.*) values (.*)");
const updateRegex = new RegExp("update(.*)set(.*)where(.*)");
const tableNameRegex = new RegExp("(.+)\\((.*)\\)");
var parantheSesRegex = new RegExp("\\((.*)\\)");


const viewMe = function () {
  var sqlStatement = document.getElementById("sqlv-text-area").value;
  sqlStatement = sanitizeExpression(sqlStatement);
  var sqlOp = findOperation(sqlStatement);
  modelMeNow(sqlOp, sqlStatement);
};

const sanitizeExpression = function (input) {
  if (!input) {
    return "";
  }
  return input.trim();
};


const modelMeNow = function (sqlOp, sqlStatement) {
  if (sqlOp == "insert") {
    callInsertModelViewer(sqlStatement);
    return;
  }
  if (sqlOp == "update") {
    callUpdateModelViewer(sqlStatement);
    return;
  }
  if (sqlOp == "create") {
    callCreateModelViewer(sqlStatement);
    return;
  }
  if (sqlOp == "delete") {
    callDeleteModelViewer(sqlStatement);
    return;
  }
};

const callInsertModelViewer = function (sqlStatement) {
  openMyView();
  var expressions = insertRegex.exec(sqlStatement);
  if (!expressions || expressions.length == 0) {
    console.error("what crazy shit is this ?");
    return;
  } else {
    try {
      var tableNameAndCols = expressions[1];
      var colsValues = expressions[2];

      var regexForTableNameArray = tableNameRegex.exec(tableNameAndCols);
      var tableName = regexForTableNameArray[1];
      var colNames = regexForTableNameArray[2];

      colsValues = parantheSesRegex.exec(colsValues)[1];

      var data = {
        "tableName": tableName,
        "colNames": splitMe(colNames, ","),
        "colValues": splitMe(colsValues, ","),
      };

      render(data, "tidyTree");
    } catch (e) {
      console.log("Time for some head cracking", e);
    }
  }
};

const callUpdateModelViewer = function (sqlStatement) {
  openMyView();
  var indexOfSet = sqlStatement.indexOf("set");
  var indexOfWhere = sqlStatement.indexOf("where");
  //adding 5 for where
  var fromsetToWhere = sqlStatement.substring(indexOfSet+3, indexOfWhere);
  var fromWhereTOEnd = sqlStatement.substring(indexOfWhere+5, sqlStatement.length);

  var expressions = updateRegex.exec(sqlStatement);
  if (!expressions || expressions.length == 0) {
    console.error("what crazy shit is this ?");
    return;
  } else {
    try {
      var tableName = expressions[1];
      var updateColsVals = fromsetToWhere;
      var whereClause = fromWhereTOEnd;

      var data = {
        "tableName": tableName,
        "colNames": splitMe(updateColsVals, ","),
        "colValues": splitMe(whereClause, "and"),
      };

      renderUpdate(data);
    } catch (e) {
      console.log("Time for some head cracking", e);
    }
  }
};

const callCreateModelViewer = function () {
  openMyView();
};

const callDeleteModelViewer = function () {
  openMyView();
};

const openMyView = function () {

};




const render = function (data, renderFunction) {
  if (renderFunction == "tidyTree") {
    renderTreeType(data);
  }
};



const renderUpdate = function (data) {
  updateTableName("desc-table", data["tableName"]);
  updateSugarBabies("sqlv-view", "give-me-some-sugar");

  var tableBody = document.getElementById("sqlv-data-body");

  var cols = data.colNames;
  var vals = data.colValues;

  var colRow = createPureElemType("tr");
  colRow.innerHTML = cols;
  tableBody.appendChild(colRow);


  var valRow = createPureElemType("tr");
  valRow.innerHTML = vals;
  tableBody.appendChild(valRow);


};


const findOperation = function (sqlStatement) {
  if (sqlStatement.startsWith("insert")) {
    return "insert";
  }
  if (sqlStatement.startsWith("update")) {
    return "update";
  }
  if (sqlStatement.startsWith("create")) {
    return "create";
  }
  if (sqlStatement.startsWith("delete")) {
    return "delete";
  }

  console.error("Guess you are crazy");
};
