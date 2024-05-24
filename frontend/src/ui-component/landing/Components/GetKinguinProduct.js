import axios from 'axios';
export const GetKinguinProduct = async (productId) => {
    try {
        const response = await axios.get(`/api/v2/products/${productId}`, {
            headers: {
                'X-Api-Key': `${process.env.REACT_APP_KINGUIN_API_KEY}`
            }
        });
        // Check if the response status is 200
        if (response.status === 200) {
            return response.data; // Return the data
        } else {
            console.error('Unexpected response status:', response.status);
            return null; // or handle the error accordingly
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // or handle the error accordingly
    }
};
