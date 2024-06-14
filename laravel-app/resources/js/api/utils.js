import axios from 'axios';

async function call(endpoint, method, data) {
    try {
        const response = await axios({
            method: method,
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            withCredentials: true,
            data: data,
        });

        if (response.status !== 200) {
            throw new Error('There was an error contacting the app.');
        }

        return response;
    
    } catch (error) {
        throw new Error('There was an error contacting the app.');
    }
}

export default call;