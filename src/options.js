function saveOptions(e) {
  e.preventDefault();
  
  var dns_query_url = "https://cloudflare-dns.com/dns-query";
  
  // table mapping dns server options to server URLs
  switch(document.querySelector("#dns-server-select").value) {
    case "cloudflare-default":
      break;
    case "cleanbrowsing-adult":
      dns_query_url = "https://doh.cleanbrowsing.org/doh/adult-filter/";
      break;
    case "google":
      // special case with Google: API endpoint, not RFC8484 endpoint
      dns_query_url = "https://dns.google/resolve";
      break;
    case "quad9":
      dns_query_url = "https://dns.quad9.net/dns-query";
      break;
    default:
      break;
  }
  
  browser.storage.local.set({
    dns_url: document.querySelector("#dns-server-custom").value || dns_query_url
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#dns-server-custom").value = result.dns_url;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("dns_url");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
