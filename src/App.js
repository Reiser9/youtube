import React from 'react';
import api from './api.js';

import './App.css';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import SearchItem from './SearchItem/SearchItem.jsx';

const App = () => {
    const [searchRes, setSearchRes] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [enterSearch, setEnterSearch] = React.useState('');
    const [progress, setProgress] = React.useState(false);

    const searchFunc = async (attr) => {
        setProgress(true);
        await api.get('search', {
            params: {
                q: attr
            }
        }).then((res) => {
            setProgress(false);
            setSearchRes(res);
        });
    }

    const paggination = async (pageToken) => {
        setProgress(true);
        await api.get('search', {
            params: {
                q: enterSearch,
                pageToken

            }
        }).then(res => {
            setProgress(false);
            setSearchRes(res);
        }).error(err => {
            console.log(err);
        });
    }

    const goSearch = () => {
        searchFunc(search);
        setEnterSearch(search);
        setSearch('');
    }

    return(
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: '2rem 0'}}>
            <Typography component="h1" variant="h3" sx={{textAlign: 'center'}}>
                Главная страница YouTube
            </Typography>

            <TextField sx={{mt: 2, width: '100%', maxWidth: 500}} onChange={(e) => setSearch(e.target.value)} label="Введите запрос.." value={search}
            variant="outlined" disabled={progress} />

            <Button disabled={progress} variant="contained" onClick={goSearch} sx={{mt: 1, p: '.5rem 2rem'}}>
                Поиск
            </Button>

            <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3}}>
                {progress ? <CircularProgress />
                : searchRes
                ? <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography component="p" variant="h6">
                        Результат по запросу: "{enterSearch}"
                    </Typography>

                    <Typography sx={{mt: 1}} component="p" variant="h6">
                        Результатов поиска: {searchRes.data.pageInfo.totalResults}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
                        {searchRes.data.prevPageToken && <Button variant="contained" sx={{m: '0 .5rem'}}
                        onClick={() => paggination(searchRes.data.prevPageToken)}>
                            Предыдущая
                        </Button>}

                        {searchRes.data.nextPageToken && <Button variant="contained" sx={{m: '0 .5rem'}}
                        onClick={() => paggination(searchRes.data.nextPageToken)}>
                            Следующая
                        </Button>}
                    </Box>

                    <Box sx={{width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, mt: 3}}>
                        {searchRes.data.items.map((e, id) => {
                            return <SearchItem key={id} data={e} next={searchRes.data.nextPageToken} prev={searchRes.data.prevPageToken} />
                        })}
                    </Box>
                </Box>
                : <Typography component="p" variant="h6">
                    Начните поиск
                </Typography>}
            </Box>
        </Box>
    );
}

export default App;
