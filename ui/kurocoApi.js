import { KurocoApi } from '@kuroco/sdk';  

const api = new KurocoApi({  
    apiKey: process.env.KUROCO_API_KEY, // Lưu ý biến môi trường  
    baseUrl: 'https://huyen.g.kuroco-front.app/', // URL của Kuroco  
});  

export const fetchTags = async () => {  
    try {  
        const response = await api.get('/tag-endpoint'); // Endpoint để lấy tags  
        return response.data;  
    } catch (error) {  
        console.error('Error fetching tags:', error);  
        throw error;  
    }  
};  