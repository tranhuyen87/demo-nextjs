import { useEffect, useState } from 'react';  
import { fetchTags } from '@/ui/kurocoApi';  

const TagList = () => {  
    const [tags, setTags] = useState([]);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        const getData = async () => {  
            try {  
                const fetchedTags = await fetchTags();  
                setTags(fetchedTags);  
            } catch (error) {  
                setError('Failed to load tags');  
            }  
        };  

        getData();  
    }, []);  

    if (error) return <div>{error}</div>;  
    if (!tags.length) return <div>Loading...</div>;  

    return (  
        <ul>  
           {tags.map((tag) => (  
                <li key={tag.id}>{tag.text}</li>  
            ))}  
        </ul>  
    );  
};  

export default TagList;  