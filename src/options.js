var dns_query_url = "https://cloudflare-dns.com/dns-query";

function clearCustomURL() {
    document.querySelector("#dns-server-custom").value = "";
}

function saveOptions(e) {
  e.preventDefault();

  dns_query_url = document.querySelector("#dns-server-select").value;
  if (dns_query_url)
    clearCustomURL()

  //console.log("DNS query url selected:", dns_query_url);
  browser.storage.local.set({
    dns_url: document.querySelector("#dns-server-custom").value || dns_query_url
  });
  
  // set url field to current url after storing the change in local storage
  document.querySelector("#dns-server-custom").value = dns_query_url;
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#dns-server-custom").value = (result.dns_url || dns_query_url);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("dns_url");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
