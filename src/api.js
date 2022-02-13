import axios from 'axios';

const apiKey = 'AIzaSyCMMwDRT09EMeIFHDGIWacuykl9v3H2nuw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: apiKey
    }
});