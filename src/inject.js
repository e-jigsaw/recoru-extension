const sc = document.createElement('script')
sc.src = chrome.runtime.getURL("dist/index.js")
sc.type = 'module'
document.head.append(sc)
