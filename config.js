
module.exports = {
  "port": 8081,
  "staticFilesDirectory": "htdocs",
  "pathlist": [
    "pjssamples"
  ],
  "initialModules": {
    "/hello": "pjssamples/hello",
    "/hello2": "pjssamples/hello2",
    "/connect4": "pjssamples/connect4",
    "/upload": "pjssamples/upload",
	"/exchange": "pjssamples/upload"
  },
  "dbDriver": "IBMi",
  "timeout": 3600,
  "connectorURL": "http://power8:8231",
  "connectorCredentials": "/plsdemo/pjsdemo/credentials"
}