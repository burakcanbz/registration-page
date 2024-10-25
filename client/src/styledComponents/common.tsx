import { styled } from '@mui/system';
// import { styled } from '@mui/material/styles';

import { Paper, Avatar, TextField } from '@mui/material'

interface MyPaperProps extends React.ComponentProps<typeof Paper> {  //This approach automatically includes all props from the Paper component, ensuring you don’t miss any props that are already defined in Paper.
    backgroundImage?: string;
}

const MyPaper = styled(({ backgroundImage, ...other }: MyPaperProps) => ( // other consist of elevation, onClick props etc.
    <Paper {...other} />
))(({ backgroundImage }) => ({
    padding: 30,
    minHeight: '55vh',
    width: 400,
    margin: '30px auto',
    color: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImage})`, // Use the passed prop
    overflow: 'auto'
}));


const MyAvatar = styled(Avatar)({
    width: 75, 
    height: 75, 
    bgcolor: 'rgb(220 220 220)'
});

export { MyPaper, MyAvatar };