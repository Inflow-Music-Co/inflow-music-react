async function CreateMintgateLink(url, linkTitle, tokenAddress, balance, jwt, mintgateLink) {
  const linkOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'},
      body: JSON.stringify({
          "url": url,
          "title": linkTitle,
          "tokens": [
            {
              "token": tokenAddress,
              "ttype": "20",
              "balance": balance,
              "network": 4,
              "subid": "",
            }
          ],
          "jwt": jwt
      })
      };
      /*console.log('linkOptions', linkOptions);*/
      fetch('https://mgate.io/api/v2/links/create', linkOptions)
      .then(response =>  response.json())
      .then((data) => {
          if (data && (data.status === 'fail')) {
            let msg = data;
            alert("Form Error: " + msg);
            console.error(msg);
            return;
          }
          console.log(data.url);
          const returnlink = localStorage.setItem('link', data.url);
          return returnlink;
        })
        .catch((e) => {
          alert("Oh no! We have an error: " + e.toString());
          console.error(e);
        });
}

export {CreateMintgateLink}