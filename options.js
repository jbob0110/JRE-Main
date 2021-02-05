var solutionDesigners = [];
var testAnalysts = [];
var softwareEngineers = [];
var isFirefox = typeof InstallTrigger !== 'undefined';
window.onload = () => {
  chrome.storage.sync.get(['SDarray'], function (result) {
    if (result.SDarray === undefined) {
      chrome.storage.sync.set({ SDarray: solutionDesigners }, function () { console.log("Initial solution designers array save!"); });
    }
  });
  chrome.storage.sync.get(['TAarray'], function (result) {
    if (result.TAarray === undefined) {
      chrome.storage.sync.set({ TAarray: testAnalysts }, function () { console.log("Initial test analyst array save!"); });
    }
  });
  chrome.storage.sync.get(['SEarray'], function (result) {
    if (result.SEarray === undefined) {
      chrome.storage.sync.set({ SEarray: softwareEngineers }, function () { console.log("Initial software engineer array save!"); });
    }
  });
  addSDs();
  addTAs();
  addSEs();
  document.getElementById('addSD').onclick = () => {
    var name = document.getElementById("SDname").value;
    var id = document.getElementById("SDid").value;
    chrome.storage.sync.get(['SDarray'], function (result) {
      for (var i = 0; i < result.SDarray.length; i++) {
        holder = result.SDarray[i].split(" :");
        solutionDesigners[holder[0]] = true;
      }
      if (solutionDesigners[name] != undefined) {
        alert("Person is already on the list.");
        document.getElementById('SDname').value = '';
        document.getElementById('SDid').value = '';
      } else {
        solutionDesigners[name] = true;
        addNames('SDname', 'SDid', 'SDlist', document.getElementById('SDname').value + " :" + document.getElementById('SDid').value, solutionDesigners, deleteSD);
      }
    });
  }
  document.getElementById('addTA').onclick = () => {
    var name = document.getElementById("TAname").value;
    chrome.storage.sync.get(['TAarray'], function (result) {
      for (var i = 0; i < result.TAarray.length; i++) {
        holder = result.TAarray[i].split(" :");
        testAnalysts[holder[0]] = true;
      }
      if (testAnalysts[name] != undefined) {
        alert("Name already on the list.");
        document.getElementById('TAname').value = '';
        document.getElementById('TAid').value = '';
      } else {
        testAnalysts[name] = true;
        addNames('TAname', 'TAid', 'TAlist', document.getElementById('TAname').value + " :" + document.getElementById('TAid').value, testAnalysts, deleteTA);
      }
    });
  }
  document.getElementById('addSE').onclick = () => {
    var name = document.getElementById("SEname").value;
    chrome.storage.sync.get(['SEarray'], function (result) {
      for (var i = 0; i < result.SEarray.length; i++) {
        holder = result.SEarray[i].split(" :");
        softwareEngineers[holder[0]] = true;
      }
      if (softwareEngineers[name] != undefined) {
        alert("Name already on the list.");
        document.getElementById('SEname').value = '';
        document.getElementById('SEid').value = '';
      } else {
        softwareEngineers[name] = true;
        addNames('SEname', 'SEid', 'SElist', document.getElementById('SEname').value + " :" + document.getElementById('SEid').value, softwareEngineers, deleteSE);
      }
    });
  }
}
function save_options() {
  if (isFirefox) {
    browser.storage.sync.set({
      SDarray: solutionDesigners,
      TAarray: testAnalysts,
      SEarray: softwareEngineers
    }, function () {
      console.log("Settings Saved")
    });
  } else {
    chrome.storage.sync.set({
      SDarray: solutionDesigners,
      TAarray: testAnalysts,
      SEarray: softwareEngineers
    }, function () {
      console.log("Settings Saved");
    });
  }
}
function deleteSD(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < solutionDesigners.length; i++) {
    if (!isFirefox) {
      if (solutionDesigners[i] === e.path[1].innerHTML) {
        var holder = solutionDesigners[i].split(" :");
        solutionDesigners[holder[0]] = undefined;
        solutionDesigners.splice(i, 1);
        break;
      }
    } else {
      if (solutionDesigners[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = solutionDesigners[i].split(" :");
        solutionDesigners[holder[0]] = undefined;
        solutionDesigners.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function deleteTA(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < testAnalysts.length; i++) {
    if (!isFirefox) {
      if (testAnalysts[i] === e.path[1].innerHTML) {
        var holder = testAnalysts[i].split(" :");
        testAnalysts[holder[0]] = undefined;
        testAnalysts.splice(i, 1);
        break;
      }
    } else {
      if (testAnalysts[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = testAnalysts[i].split(" :");
        testAnalysts[holder[0]] = undefined;
        testAnalysts.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function deleteSE(e) {
  var closebtns = document.getElementsByClassName("close");
  for (i = 0; i < softwareEngineers.length; i++) {
    if (!isFirefox) {
      if (softwareEngineers[i] === e.path[1].innerHTML) {
        var holder = softwareEngineers[i].split(" :");
        softwareEngineers[holder[0]] = undefined;
        softwareEngineers.splice(i, 1);
        break;
      }
    } else {
      if (softwareEngineers[i] === e.originalTarget.parentElement.innerHTML) {
        var holder = softwareEngineers[i].split(" :");
        softwareEngineers[holder[0]] = undefined;
        softwareEngineers.splice(i, 1);
        break;
      }
    }
  }
  if (!isFirefox) {
    e.path[1].style.display = "none";
  } else {
    e.originalTarget.parentElement.style.display = "none";
  }
  save_options();
}
function addSDs() {
  chrome.storage.sync.get(['SDarray'], function (result) {
    for (var i = 0; i < result.SDarray.length; i++) {
      result.SDarray[i] = result.SDarray[i].split("<sp")[0];
      addNames('SDname', 'SDid', 'SDlist', result.SDarray[i], solutionDesigners, deleteSD);
    }
  });
}
function addTAs() {
  chrome.storage.sync.get(['TAarray'], function (result) {
    for (var i = 0; i < result.TAarray.length; i++) {
      result.TAarray[i] = result.TAarray[i].split("<sp")[0];
      addNames('TAname', 'TAid', 'TAlist', result.TAarray[i], testAnalysts, deleteTA);
    }
  });
}
function addSEs() {
  chrome.storage.sync.get(['SEarray'], function (result) {
    for (var i = 0; i < result.SEarray.length; i++) {
      result.SEarray[i] = result.SEarray[i].split("<sp")[0];
      addNames('SEname', 'SEid', 'SElist', result.SEarray[i], softwareEngineers, deleteSE);
    }
  });
}
function addNames(name, id, pointer, text, array, deleter) {
  var list = document.getElementById(pointer);
  var entry = document.createElement('li');
  entry.appendChild(document.createTextNode(text));
  var spanDelete = document.createElement("span");
  spanDelete.setAttribute("class", 'close');
  spanDelete.innerHTML = "&times;";
  list.appendChild(entry);
  entry.appendChild(spanDelete);
  array.push(entry.innerHTML);
  document.getElementById(name).value = '';
  document.getElementById(id).value = '';
  spanDelete.onclick = deleter;
  save_options();
}

