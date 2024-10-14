import { styled } from '@mui/system';
// import { styled } from '@mui/material/styles';

import { Paper, Avatar } from '@mui/material'

interface MyPaperProps extends React.ComponentProps<typeof Paper> {  
    backgroundImage?: string;
}

const MyPaper = styled(({ backgroundImage, ...other }: MyPaperProps) => ( // other consist of elevation, onClick props etc.
    <Paper {...other} />
))(({ backgroundImage }) => ({
    padding: 30,
    height: '65vh',
    width: 400,
    margin: '50px auto',
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


// const MyTextField = styled(TextField)({
//     ...
// })

export { MyPaper, MyAvatar};