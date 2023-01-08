import axios from 'axios';

export default async function nftsowned() {
    const options = {
      method: 'GET',
      url: 'https://api.nftport.xyz/v0/accounts/0xf5663d0eee3620c4a88e28e392aac72d077a8c4d',
      params: {chain: 'ethereum', page_size: '50', include: 'metadata'},
      headers: {
        accept: 'application/json',
        Authorization: '5ffe8177-30d4-4e9f-8594-f497de7a3119'
      }
    };
    
    return axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
}
