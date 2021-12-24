reqRedirectUrl = 'http://localhost:3020d'
textUrl = 'http://localhost:3020, http://localhost:3050'

var re = new RegExp(reqRedirectUrl, 'g');


// /${reqRedirectUrl}.*/
if (!textUrl.match(re)) {
  console.log("true")
}
