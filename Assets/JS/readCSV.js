function handleFiles(files)
{
  // Check for the various File API support.
  if (window.FileReader)
  {
    // FileReader are supported.
    getAsText(files[0]);
  }
  else
  {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead)
{
  var reader = new FileReader();
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
}

function loadHandler(event)
{
  var csv = event.target.result;
  processData(csv);
}

function processData(csv)
{
  var allTextLines = csv.split(/\r\n|\n/);
  var lines = [];
  while (allTextLines.length)
  {
    lines.push(allTextLines.shift().split(','));
  }
  console.log(lines);
  //drawOutput(lines);
  getTunes(lines);
}

function errorHandler(evt)
{
  if(evt.target.error.name == "NotReadableError")
  {
    alert("Cannot read file !");
  }
}

function drawOutput(lines)
{
  //Clear previous data
  document.getElementById("output").innerHTML = "";
  var table = document.createElement("table");
  for (var i = 0; i < lines.length; i++)
  {
    var row = table.insertRow(-1);
    for (var j = 0; j < lines[i].length; j++)
    {
      var firstNameCell = row.insertCell(-1);
      firstNameCell.appendChild(document.createTextNode(lines[i][j]));
    }
  }
  document.getElementById("output").appendChild(table);
}

function getTunes(lines)
{
  document.getElementById("output").innerHTML = "";
  var table = document.createElement("table");

  var cam = "03A";
  var bpmLow = Math.floor(101 - (101 * 0.04));
  var bpmHi = Math.ceil(101 + (101 * 0.04));

  for (var i = 0; i < lines.length; i++)
  {
    if(lines[i][0] == cam && lines[i][2] >= bpmLow && lines[i][2] <= bpmHi)
    {
      var row = table.insertRow(-1);
      for (var j = 0; j < lines[i].length; j++)
      {
          var firstNameCell = row.insertCell(-1);
          firstNameCell.appendChild(document.createTextNode(lines[i][j]));
      }
    }
  }
  document.getElementById("output").appendChild(table);
}
