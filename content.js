const body = document.getElementsByTagName('body')[0]
const allChildren = body.getElementsByTagName('*')
// const tester = document.getElementsByTagName('h1').item(1)
const n = allChildren.length
const allText = body.innerHTML

// window.addEventListener('load', function(){console.log(body.getElementsByTagName('*')[0])})

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.subs) {
      const subObj = JSON.parse(msg.subs)
      const RE = new RegExp(Object.keys(subObj).join("|"), "gi");
      // body.innerHTML = allText.replace(RE, function(matched) {
      //   return subObj[matched]
      // });


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
    //   allChildren[i].innerHTML = childText.replace(RE, function(matched) {
    //     return subObj[matched]
      // });
  }
});
