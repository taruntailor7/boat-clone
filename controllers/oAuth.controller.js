import axios from 'axios';


async  function getAccessToken(code) {
    try {
        let clientId = 'd9d24948acb468e53d2a';
        let clientSecret = '49d6d35f27ccbfa74a10a18378ca09d712d922be';

        let url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;

        let response = await axios.post(url);

        const result = new URLSearchParams(response.data);
        

        if (result.get('error')) {
            throw new Error('Failed to get access token: ' + result.get('error_description'));
        }
        
        return result.get('access_token');

    } catch(err) {

        console.error(err)
        throw err;
    }
}

async function getUser(req,res) {
    const {code} =req.query;
    try {
        const token = await getAccessToken(code);
        console.log(token);
        
        let url = 'https://api.github.com/user';
    
        let response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response,"this is response")
        console.log(response.data,"this is response data")
        
        res.send({
            status:"Success",
           data: response.data
        })

    } catch(err) {

        console.error(err.message)
        throw err;
    }
}
export default getUser