function sendQuery() {
    var dns_base_url = browser.storage.local.get("dns_url") || "https://cloudflare-dns.com/dns-query";
    console.log("using DNS server ", dns_base_url);
    var dns_query_url = dns_base_url + `?name=${document.getElementById("dns-query").text}&type=${document.getElementById("dns-query-type").text}`;
    
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

document.addEventListener('DOMContentLoaded', function () {
  var clickyButton = document.querySelector('#send-query');
  clickyButton.addEventListener('click', sendQuery);
});
