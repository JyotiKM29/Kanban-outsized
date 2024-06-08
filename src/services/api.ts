
import axios from 'axios';
import { IssueItem } from '../types';

const fetchData = async (): Promise<IssueItem[]> => {
    const urls = [
        '/hiring/issues-0.json',
        '/hiring/issues-1.json',
        '/hiring/issues-2.json',
        '/hiring/issues-3.json'
    ];

    try {
        const responses = await Promise.all(urls.map(url => axios.get<IssueItem[]>(url)));
        const data = responses.flatMap(response => response.data);
        console.log('Fetched data successfully:', data); 
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

export default fetchData;
