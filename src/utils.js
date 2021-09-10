const url = [
  "http://127.0.0.1:8000",
  "http://192.168.43.1:8000",
  "http://192.168.43.240:8000",
]


export function ajaxState(link, cls, errorSafe = true, callback, url_n = 0) {
  var request = new XMLHttpRequest()
  request.open("GET", `${url[url_n]}${link}`, true)

  request.onload = () => {
    try {
      let callResult = callback(JSON.parse(request.responseText))
      cls.setState(() => callResult)
    } catch (error) {
      console.error(error)
    }
  }

  if (errorSafe) {
    request.onerror = () => {
      if (url.length > url_n) {
        ajaxState(link, cls, errorSafe, callback, url_n + 1)
      }
    }
  }

  request.send()
}


export function ajax(link, callback, url_n = 0) {
  var request = new XMLHttpRequest()
  request.open("GET", `${url[url_n]}${link}`, true)

  request.onload = () => {
    callback(JSON.parse(request.responseText))
  }

  request.onerror = () => {
    if (url.length > url_n) {
      ajax(link, callback, url_n + 1)
    }
  }

  request.send()
}


export function ajaxMethod(link, data, url_n = 0, method="POST") {
  var request = new XMLHttpRequest()

  request.open(method, `${url[url_n]}${link}`, true)
  request.setRequestHeader("Content-Type", "application/json");

  request.onerror = () => {
    if (url.length > url_n) {
      ajaxMethod(link, data, url_n + 1, method)
    }
  }

  request.send(JSON.stringify(data))
}
