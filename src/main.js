function loadQuery() {
    var dns_base_url = "https://cloudflare-dns.com/dns-query";
    
    dns_base_url = browser.storage.local.get("dns_url").then(
        // https://stackoverflow.com/questions/29516390/how-can-i-access-the-value-of-a-promise
        function (result) {
            console.log("result is:", result);
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
        'Content-Type': 'application/dns-json'
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
                .includes("application/dns-json")) {
                  console.log("response: ", response.json());
                  return response.json();
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
