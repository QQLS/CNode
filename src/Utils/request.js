export default request = {
  get: (url, params) => {
    if (params) {
      let paramsArr = [];
      Object.keys(params).forEach(key => {
        paramsArr.push(key + '=' + params[key]);
      });
      url += ((url.search(/\?/) === -1) ? '?' : '&') + paramsArr.join('&');
    }
    
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(response => resolve(response))
        .catch((error) => reject(error));
    })
  },

  post: (url, params) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch((error) => reject(error));
    })
  }
}