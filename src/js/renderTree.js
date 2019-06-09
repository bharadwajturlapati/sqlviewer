const renderTreeType = function (json_data) {

  updateTableName("desc-table", json_data["tableName"]);
  updateSugarBabies("sqlv-view", "give-me-some-sugar");


  var colNames = json_data["colNames"];
  var colValues = json_data["colValues"];
  var primaryKeys = ["element_id", "element_resource_id", "name"];

  updateTableKVPairs("sqlv-data-body", colNames, colValues, "true", primaryKeys);
};

const updateSugarBabies = function (elementId, cssStyle) {
  clearCssList(elementId);
  var root = document.getElementById(elementId);
  root.classList.add(cssStyle);
  return;
};


const updateTableName = function (rootid, tableName) {
  var root = document.getElementById(rootid);
  root.innerText = tableName;
  return;
};

const createElemTypeWithInnerText = function (innerText, elem) {
  if (!innerText) {
    innerText = "";
  }
  var elem = document.createElement(elem);
  elem.innerText = innerText;
  return elem;
};

const createPureElemType = function (elem) {
  var elem = document.createElement(elem);
  return elem;
};


const updateTableKVPairs = function (tableBodyId, arrForTd1, arrForTd2, reset, specialsForPrimaryKeys) {
  var root = document.getElementById(tableBodyId);
  if (reset == "true") {
    root.innerText = "";
  }
  for (var i = 0; i < arrForTd1.length; i++) {
    var keyName = arrForTd1[i];
    var keyValue = arrForTd2[i];

    keyName = sanitizeExpression(keyName);
    keyValue = sanitizeExpression(keyValue);

    var trRoot = createPureElemType("tr");

    //add the key object
    var objectName = createElemTypeWithInnerText(keyName, "td");
    if (specialsForPrimaryKeys.includes(keyName)) {
      var specialTag = createElemTypeWithInnerText("*", "span");
      specialTag.classList.add("text-red");
      objectName.appendChild(specialTag);
    }
    trRoot.appendChild(objectName);

    var objectValue = createElemTypeWithInnerText(keyValue, "td");
    trRoot.appendChild(objectValue);

    // add the additional formatters
    var additionalCell = createPureElemType("td");
    additionalCell.innerHTML = "<button type=\"button\" class=\"btn btn-outline-primary\" onclick=\"formatAdjCell(event)\">Format</button>";
    trRoot.appendChild(additionalCell);

    root.appendChild(trRoot);
  }
};

const formatAdjCell = function () {
  openFormatter();
  var targetCell = event.target;
  var formatterCell = document.getElementById("data-formatter");

  // looks to the parent which is tr then get the data cell which is td with index 2
  //Driven By DOM !
  var dataCell = targetCell.parentNode.parentNode.childNodes[1];
  var data = dataCell.textContent;
  if (data.startsWith("[") || data.startsWith("{")) {
    formatterCell.innerHTML = "<pre class='innerCode'>" + (syntaxHighlight(JSON.stringify(JSON.parse(data), undefined, 4))) + "</pre>";
  }
};

const openFormatter = function () {
  var formatterNode = document.getElementById("formatter");
  updateSugarBabies("formatter", "formatter-sugar");
};

const clearCssList = function (id) {
  var node = document.getElementById(id);
  node.classList = "";
  return;
};

const setDisplayNone = function (id) {
  updateSugarBabies(id, "display-none");
};

function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}
