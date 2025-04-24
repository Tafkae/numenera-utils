"use strict";

import * as util from "/utils";

const testObj = {
  id: 54321,
  name: "James Garfield",
  data: {
    descriptor: {
      name: "American",
    },
    type: {
      name: "President",
    },
    focus: {
      name: "Gets Killed By His Own Doctor",
    },
  },
  get summary() {
    return summary(this);
  },
};

const el = {
  name: document.getElementsByClassName("char-name"),
  summary: document.getElementsByClassName("char-summary"),
  btn: {
    saveLocal: document.getElementById("btn-save-local"),
    loadLocal: document.getElementById("btn-load-local"),
    parse: document.getElementById("btn-parse"),
    mh: {
      succ: document.getElementById("btn-mh-success"),
      fail: document.getElementById("btn-mh-failure"),
    },
  },
  msg: document.getElementsByClassName("message"),
};

const summary = function (charObj) {
  return (
    `a${["A", "E", "I", "O", "U"].includes(charObj.data.descriptor.name.charAt(0)) ? `n` : ""} ` +
    `${charObj.data.descriptor.name} ${charObj.data.type.name} who ${charObj.data.focus.name}`
  );
};

const displayTest = function (index, obj) {
  el.name[index].innerText = obj.name;
  el.summary[index].innerText = summary(obj);
};

const setSuccess = function (index, msgList = el.msg) {
  msgList[index].classList.remove("hidden");
  msgList[index].innerText = "Success!";
  msgList[index].classList.add("success");
};

const setFailure = function (index, msgList = el.msg) {
  msgList[index].classList.remove("hidden");
  msgList[index].innerText = "Failed...";
  msgList[index].classList.add("failure");
};

const fadeOut = function (index, msgList = el.msg) {
  setTimeout(() => {
    msgList[index].classList.add("hidden");
  }, 2500);
};

document.addEventListener("DOMContentLoaded", () => {
  displayTest(0, testObj);
  let msgHandlers = [];

  // reset message block after transition ends
  for (let message of Object.values(el.msg)) {
    msgHandlers.push(new util.MessageElementHandler(message));

    // if (message.parentElement !== document.getElementById("test-msgHandler")) {
    //   message.addEventListener("transitionend", () => {
    //     message.innerText = "";
    //     message.classList.remove("success", "failure");
    //   });
    console.log(
      `added handler to msg in ${message.parentElement.tagName}#${message.parentElement.id}`
    );
    //}
  }

  // TEST #0 - SAVELOCAL =======================================

  // save to LocalStorage and give feedback (success / failure)
  el.btn.saveLocal.addEventListener("click", () => {
    if (util.saveLocal(testObj.id, JSON.stringify(testObj))) {
      msgHandlers[0].triggerSuccess("Saved to local storage.")
    } else {
      msgHandlers[0].triggerFailure("Couldn't save...")
    }
  });

  // TEST #1 - LOADLOCAL =======================================

  // Load from LocalStorage and give feedback (success / failure)
  el.btn.loadLocal.addEventListener("click", () => {
    let testId = 54321;
    let loaded = util.loadLocal(testId);

    if (loaded) {
      el.summary[1].innerText = loaded;
      msgHandlers[1].triggerSuccess("Loaded from local storage.");
    } else {
      msgHandlers[1].triggerFailure("Couldn't load...")
    }
  });

  // TEST #2 - tryParseJsonObj
  el.btn.parse.addEventListener("click", () => {
    let loadedObj = util.tryParseJsonObj(util.loadLocal(54321));
    console.log(loadedObj);
    if (loadedObj && typeof loadedObj === "object") {
      el.name[2].innerText = loadedObj.name || "no name";
      el.summary[2].innerText = loadedObj.summary || "no summary";
      msgHandlers[2].triggerSuccess("Parsed!");
    } else {
      msgHandlers[2].triggerFailure("Couldn't parse...")
    }
  });

  // test #3 - MessageElementHandler
  //let msgHandler = new util.MessageElementHandler(document.querySelector("section#test-msgHandler .message"));
  el.btn.mh.succ.addEventListener("click", () => {
    msgHandlers[3].triggerSuccess();
  });
  el.btn.mh.fail.addEventListener("click", () => {
    msgHandlers[3].triggerFailure("task failed successfully");
  });
});
