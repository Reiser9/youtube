import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

const SearchItem = ({data}) => {
	return(
		<Box sx={{p: 1.5, border: '1px solid #2ebaee', display: 'flex',
		flexDirection: 'column', alignItems: 'center'}}>
			{data.id.videoId
			? <Box sx={{width: '100%', overflow: 'hidden', position: 'relative', pt: '56.25%'}}>
				<iframe style={{position: 'absolute', top: 0, left: 0}} width="100%" height="100%" title={data.id.videoId}
				src={`https://youtube.com/embed/${data.id.videoId}`} frameBorder="0" allowFullScreen></iframe>
			</Box>
			: <Link underline="none" target="_Blanc" href={`https://youtube.com/channel/${data.snippet.channelId}`}
				sx={{width: '120px', height: '120px'}}>
				<Avatar src={data.snippet.thumbnails.default.url} alt={data.snippet.channelTitle} sx={{width: '100%', height: '100%'}} />
			</Link>}

			<Typography sx={{mt: 2, width: '100%'}} component="p" variant="h5">
				{data.snippet.title}
			</Typography>

			<Typography sx={{mt: 1, width: '100%', wordBreak: 'break-all'}} component="p" variant="body1">
				{data.snippet.description}
			</Typography>
		</Box>
	)
}

export default SearchItem;