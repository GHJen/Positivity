const body = document.getElementsByTagName('body')[0]
const allChildren = body.getElementsByTagName('*')
const n = allChildren.length
const allText = body.innerHTML
let test = {}

chrome.storage.sync.get(['subs'], async function(result) {
  test = await result.subs
})


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action==='store') {
    let message = JSON.parse(msg.subs)
    chrome.storage.sync.set({subs: message}, function() {
      console.log('set')
    });
    chrome.storage.sync.get(['subs'], async function(result) {
      test = await result.subs
      console.log('results', result.subs);
    });
  }
  if (msg.action==='go') {
      let subObj = test

      const RE = new RegExp(Object.keys(subObj).join("|"), "gi");

    for (let i=0; i<n; i++) {
      const child = allChildren[i]
      for (let j=0; j<child.childNodes.length; j++) {
        const node = child.childNodes[j]
        if (node && (node.nodeType===3 || node.nodeType===1)) {
          let text = node.nodeValue
          if (text) {
            const toReplace = text.replace(RE, function(matched) {
            return subObj[matched]
          });
          if (toReplace !== text) {
            child.replaceChild(document.createTextNode(toReplace), node)
          };
        }
        else {
          const text = node.innerHTML
          node.innerHTML= text.replace(RE, function(matched) {
            return subObj[matched]
          })
        }
        };
      };
    }
  }
});
