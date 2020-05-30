let subs = {
  diet: 'body manipulation strategy',
  weight: 'valueless number',
  pound: 'brain cell',
  fitspo: 'unrealisticExpo',
  fitspiration: 'unrealisticExpectations',
  detox: 'extremely toxic',
  cleanse: 'body manipulation strategy',
  scale: 'rocking horse',
  skinny: 'subjective appearance moniker',
  fat: 'subjective appearance moniker',
  cellulite: 'energy store'
}

const form = document.getElementById('extraSwitch')
const igniteButton = document.getElementById('Positivify')
const ignite = document.getElementById('Positivify')

form.addEventListener('submit', function moreSwitch(evt) {
  evt.preventDefault()
  const remove = document.getElementById('remove')
  const replacement = document.getElementById('replacement')
  subs[remove.value] = replacement.value
  remove.value = ''
  replacement.value = ''
//   chrome.storage.sync.set({subs: subs}, function() {
//   console.log('Value is set to ' + subs);
// });
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
      subs: JSON.stringify(subs),
      action: 'store'
      });
    });

})

ignite.addEventListener("click", function() {
  // chrome.storage.sync.get(['subs'], function(result) {
  //   subs = result.subs
  //   console.log('Value currently is ' + result.subs);
  // });

  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
          subs: JSON.stringify(subs),
          action: 'go'
      });
  });
});
