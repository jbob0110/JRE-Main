var jiraKey;
var project;
var jiraInstance;
var url;
var description;
// asyncRequestCount keeps track of when the sub-tasks and labels are being sent.
var asyncRequestCount = 0;
/**This if checks the users browser and grabs their browser information based on this.*/
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
  url = tabs[0].url;
  getURLs(url);
});
chrome.storage.sync.get(['SDarray'], function (result) {
  var x = document.getElementById("SDs");
  var option;
  for (var i = 0; i< result.SDarray.length; i++){
    option = document.createElement("option");
    var split = result.SDarray[i].split("<spa");
    split = split[0].split(" :");
    option.text = split[0];
    option.value = split[1];
    x.add(option);
  }
});
chrome.storage.sync.get(['TAarray'], function(result) {
  var x = document.getElementById("TAs");
  var option, split;
  for(var i = 0; i< result.TAarray.length; i++){
    option = document.createElement("option");
    split = result.TAarray[i].split("<spa");
    split = split[0].split(" :");
    option.text = split[0];
    option.value = split[1];
    x.add(option);
  }
});
chrome.storage.sync.get(['SEarray'], function(result) {
  var x = document.getElementById("SEs");
  var option, split;
  for(var i = 0; i< result.SEarray.length; i++){
    option = document.createElement("option");
    split = result.SEarray[i].split("<spa");
    split = split[0].split(" :");
    option.text = split[0];
    option.value = split[1];
    x.add(option);
    }
});

window.onload = () => {
  document.getElementById('scYes').onclick = () => {
    var Sd = document.getElementById('SDs').value;
    var Ta = document.getElementById('TAs').value;
    var Se = document.getElementById('SEs').value;
    console.log("SD: "+Sd);
    console.log("TA: "+Ta);
    console.log("SE: "+Se);
    document.getElementById('loader').style.display = "block";
  /**The requirements XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Requirements","description":" ","assignee":{  "name": Sd},"issuetype":{  "name":"Sub-task"}} });
  console.log("Requirements Sent");
  /**The test case/scenario review XMLHttpRequest is opened and sent*/
  addSubTask({"fields":{  "project":{  "key": project},"parent":{  "key": jiraKey},"summary":"Test Case/Scenario Review","description":"*As a* Test Analyst\n*I want to* identify component tests that can be Automated AND create a scenario review for any new scenarios \n *So that* Engineers or TAs know what scenarios to automate \n*Ill known im done when* tests have been identified and scenario review (if necessary) is logged with a link provided in this subtask \nh4. Tasks for existing scripts before adding new scenarios\n||Task||Status||\n| Address if Scenarios to an existing script can be moved to an SBET | (x) |\n| Optimization (only after the first two have been completed) | (x) |\nDetailed Steps: \n 1. Meet with the Engineers and SDs to review the requirements \n 2. Separate out what requirements should go in the automated script or to an SBET. \n 3. Create the scenarios for the black box test and send them for review.\n 4. Document where the requirements will be tested. Black Box or SBET.\n","assignee":{  "name": Ta},"issuetype":{  "name":"Sub-task"}} });
  console.log("Test Case Sent");
  /**The automation XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Automation","description":" ","assignee":{  "name": Se},"issuetype":{  "name":"Sub-task"}} });
  console.log("Automation Sent");
  /**The Grey Box XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Grey Box","description":" ","assignee":{  "name": Se},"issuetype":{  "name":"Sub-task"}} });
  console.log("Grey Box Sent");
  /**The Tech Verify XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Tech Verify","description":" ","assignee":{  "name": Se}, "issuetype":{  "name":"Sub-task"}} });
  console.log("Tech Verify Sent");
  };
  
  document.getElementById('scYesContr').onclick = () => {
    var Sd = document.getElementById('SDs').value;
    var Ta = document.getElementById('TAs').value;
    var Se = document.getElementById('SEs').value;
    console.log("SD: "+Sd);
    console.log("TA: "+Ta);
    console.log("SE: "+Se);
    document.getElementById('loader').style.display = "block";
  /**The requirements XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Requirements","description":" ","assignee":{  "name": Sd},"issuetype":{  "name":"Sub-task"}} });
  console.log("Requirements Sent");
  /**The test case/scenario review XMLHttpRequest is opened and sent*/
  addSubTask({"fields":{  "project":{  "key": project},"parent":{  "key": jiraKey},"summary":"Test Case/Scenario Review","description":"*As a* Test Analyst\n*I want to* identify component tests that can be Automated AND create a scenario review for any new scenarios \n *So that* Engineers or TAs know what scenarios to automate \n*Ill known im done when* tests have been identified and scenario review (if necessary) is logged with a link provided in this subtask \nh4. Tasks for existing scripts before adding new scenarios\n||Task||Status||\n| Address if Scenarios to an existing script can be moved to an SBET | (x) |\n| Optimization (only after the first two have been completed) | (x) |\nDetailed Steps: \n 1. Meet with the Engineers and SDs to review the requirements \n 2. Separate out what requirements should go in the automated script or to an SBET. \n 3. Create the scenarios for the black box test and send them for review.\n 4. Document where the requirements will be tested. Black Box or SBET.\n","assignee":{  "name": Ta},"issuetype":{  "name":"Sub-task"}} });
  console.log("Test Case Sent");
  /**The automation XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Automation","description":" ","assignee":{  "name": Se},"issuetype":{  "name":"Sub-task"}} });
  console.log("Automation Sent");
  /**The Grey Box XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Grey Box","description":" ","assignee":{  "name": Se},"issuetype":{  "name":"Sub-task"}} });
  console.log("Grey Box Sent");
  /**The Tech Verify XMLHttpRequest is opened and sent*/        
  };

  document.getElementById('scYesSea').onclick = () => {
    var Sd = document.getElementById('SDs').value;
    var Ta = document.getElementById('TAs').value;
    console.log("SD: "+Sd);
    console.log("TA: "+Ta);
    document.getElementById('loader').style.display = "block";
  /**The requirements XMLHttpRequest is opened and sent*/        
  addSubTask({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Requirements","description":" ","assignee":{  "name": Sd},"issuetype":{  "name":"Sub-task"}} });
  console.log("Requirements Sent");
  /**The test case/scenario review XMLHttpRequest is opened and sent*/
  addSubTask({"fields":{  "project":{  "key": project},"parent":{  "key": jiraKey},"summary":"Test Case/Scenario Review","description":"*As a* Test Analyst\n*I want to* identify component tests that can be Automated AND create a scenario review for any new scenarios \n *So that* Engineers or TAs know what scenarios to automate \n*Ill known im done when* tests have been identified and scenario review (if necessary) is logged with a link provided in this subtask \nh4. Tasks for existing scripts before adding new scenarios\n||Task||Status||\n| Address if Scenarios to an existing script can be moved to an SBET | (x) |\n| Optimization (only after the first two have been completed) | (x) |\nDetailed Steps: \n 1. Meet with the Engineers and SDs to review the requirements \n 2. Separate out what requirements should go in the automated script or to an SBET. \n 3. Create the scenarios for the black box test and send them for review.\n 4. Document where the requirements will be tested. Black Box or SBET.\n","assignee":{  "name": Ta},"issuetype":{  "name":"Sub-task"}} });
  console.log("Test Case Sent");   
  };

  document.getElementById('releaseNote').onclick = () => {
    var Sd = document.getElementById('SDs').value;
    console.log("SD: "+Sd);
    document.getElementById('loader').style.display = "block";
  /**The Release Notes XMLHttpRequest is opened and sent*/        
  addReleaseNote({"fields":{  "project":{  "key": project },"parent":{ "key": jiraKey},"summary":"Release Notes","description":"{color:red}*Please update this JIRA description with the needed release note information*{color}\n*Description:* Include any applicable [release consideration | https://wiki.cerner.com/display/public/PMOConDoc/Wiki+Fundamentals+-+Release+Considerations+Work+Instructions]or other notes in this column below the description text\n*Reference Material:* Reference materials can be resources that were updated as part of the solution change, a workflow related to the solution change, or other supplemental information. Use bullets without a stem sentence if more than one reference material applies.\n*Validation Guidelines:* Enter workflow-based or testing option validation guidelines using the text below.\n* *Workflow-Based Validation:* As part of your testing for this release, verify that you can successfully complete the workflow(s) in the Reference Materials column.\n* *Testing Option Validation:* See the validation guidelines for this [solution change's release|https://wiki.cerner.com/display/IDD/Cerner+Instanote+%28iOS%29+2018_08_XX]. If testing options to validate this solution change or release are included below, link to this release page to ensure that clients can return to this page to see the validation guidelines after this release is included on the main solution page.\n\n*Implementation Impact:* _High/Medium/Low/None_ - Ensure that the description text and reference materials support the selected impact type. Include a description of the impact if you select a value other than None\n*Maintenance Impact:* _High/Medium/Low/None_ - Ensure that the description text and reference materials support the selected impact type. Include a description of the impact if you select a value other than None.\n*User Interface Impact:* _Workflow Impact (Automatic)/Workflow Impact (Implemented)/Visible Impact Only/None_ - Ensure that the description text and reference materials support the selected impact type. Include a description of the impact if you select a value other than Visible Impact Only or None.\n*Is this change a Release Highlight:* _Yes/No_","assignee":{  "name": Sd},"issuetype":{  "name":"Sub-task"}} });
  console.log("Release Note Sent");
  };

  document.getElementById("options").onclick = () =>{
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };
};

function addSubTask(subtask){
  var xhr = new XMLHttpRequest;
  xhr.open("POST", "https://"+jiraInstance+".cerner.com/rest/api/2/issue/");
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.setRequestHeader("User-Agent", "plugin agent");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
      asyncRequestCount--;
      checkAsynRequestCount();
    }
  };
  asyncRequestCount++;
  xhr.send(JSON.stringify(subtask));
};
  
/** This function opens and sends sub-task created in the releaseNotes function*/
function addReleaseNote(subtask){
  var xhr = new XMLHttpRequest;
  xhr.open("POST", "https://"+jiraInstance+".cerner.com/rest/api/2/issue/");
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.setRequestHeader("User-Agent", "plugin agent");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
      asyncRequestCount--;
      checkAsynRequestCount();
    }
  };
  asyncRequestCount++;
  xhr.send(JSON.stringify(subtask));
};

function getURLs(url){
  var re = /https\:\/\/(.+?)\..+\/((.+?)\-[^\?]+)/;
  var regexGroups = { jIns: 1, jKey: 2, pKey: 3 };
  var m = re.exec(url);
  jiraKey = m[regexGroups.jKey];
  project = m[regexGroups.pKey];
  jiraInstance = m[regexGroups.jIns];
};

/** This function checks if the asyncRequestCount is 0 then will reload the page, and hide the loading spinner*/
function checkAsynRequestCount(){
  if(asyncRequestCount === 0){
    chrome.tabs.reload();
    document.getElementById('loader').style.display = "none";
  }
}