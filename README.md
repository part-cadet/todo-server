# TODO List Web Application

In order to use swagger-jsdoc:
1.  setup swagger-jsdoc globally:   `npm install --save swagger-jsdoc`
2.  add comments to the APIs in router.js
3.  run the following command to get the json file, parsing the commnets:
    `swagger-jsdoc -d lib/api/swaggerDef.js lib/router/router.js -o
 lib/public/swagger.json`