var contextMenuItem = {
  "id":"run",
  "title":"Run",
  "contexts":["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if(clickData.menuItemId == "run" && clickData.selectionText){
    console.log("Text Selected\n"+clickData.selectionText);
  }
})
