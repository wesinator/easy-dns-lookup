function loadQuery() {
    var dns_base_url = "https://cloudflare-dns.com/dns-query";
    
    dns_base_url = browser.storage.local.get("dns_url").then(
        // https://stackoverflow.com/questions/29516390/how-can-i-access-the-value-of-a-promise
        function (result) {
            dns_base_url = result.dns_url || dns_base_url;
            sendQuery(dns_base_url);
        }).catch(function (error) {
            sendQuery(dns_base_url);
        });

function sendQuery(dns_server)
{
    console.log("using DNS server ", dns_base_url);

    var dns_query_url = dns_base_url + `?name=${document.getElementById("dns-query").value}&type=${document.getElementById("dns-query-type").value}`;

    fetch(dns_query_url, {
      headers: {
        'Accept': 'application/dns-json'
      }
    }).then((response) => {
            // Check if the response is ok
            if (!response.ok) {
              errMsg = `Error: ${response.status} - ${response.statusText}`;
              console.log(errMsg);
              return 1;
            }
            // Check if the response is in JSON format
            if (response.headers.get("Content-Type")
                .includes("json")) {
                  response.json().then(
                      function processResponse(result) {
                          console.log(result);
                          var resultStr = "";
                          if (result.Answer) {
                              for (var answer of result.Answer) {
                                  resultStr = resultStr + `${answer.name.toString()}, ${answer.data.toString()}\n`;
                              }
                          }
                          
                          document.getElementById("result").innerText = resultStr;
                          //chrome.browserAction.openPopup()
                          return result;
                      }).catch(function (error) {
                          console.log("error processing result:", error);
                          return 1
                      })
                  //console.log("response: ", responseData);      
            } else {
                throw new Error("Unexpected Content-Type");
            }
        })
        /*
        .then((data) => {
          // process json here
        })*/
        .catch((error) => {
           console.log(`Error with fetch(): ${error.message}`)
        });
    }    
}

document.addEventListener('DOMContentLoaded', function () {
  var clickyButton = document.querySelector('#send-query');
  clickyButton.addEventListener('click', loadQuery);
});
