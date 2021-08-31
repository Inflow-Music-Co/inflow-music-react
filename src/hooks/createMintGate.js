import {useEffect} from 'react';

const CreateMintGate = (url, title, token_address, balance, jwt) => {
    useEffect(() => {
        const linkOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                "url": url,
                "title": title,
                "tokens": [
                  {
                    "token": token_address,
                    "ttype": "20",
                    "balance": balance,
                    "network": 1,
                    "subid": "",
                  }
                ],
                "jwt": jwt
            })
            };
            fetch('https://mgate.io/api/v2/links/create', linkOptions)
            .then(response => response.json())
            .then((data) => {
                if (data && (data.status === 'fail')) {
                  let msg = data;
                  alert("Form Error: " + msg);
                  console.error(msg);
                  return;
                }
                return data.url;
              })
              .catch((e) => {
                alert("Oh no! We have an error: " + e.toString());
                console.error(e);
              });
    }, [])
}

export {CreateMintGate}