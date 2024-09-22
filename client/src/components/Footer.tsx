import { Box, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2'

const Footer = () => {

    const footerStyle = { bottom: 0, bgcolor: 'text.secondary', padding: '20px', textAlign: 'center', fontWeight: '550', fontSize: '16px' }
    return (
        <Grid sx={footerStyle} width='100%'>
            <Stack>
                <Container >
                    Web Site designed by Burak
                </Container>
            </Stack>
        </Grid>
    )
}

export default Footer