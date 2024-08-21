import NavigationAppBar from "@/app/component/NavigationAppBar/page";
import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography, Container, Grid } from "@mui/material";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh", color: 'black', overflow: 'auto', }}>
            <NavigationAppBar></NavigationAppBar>
            <Box
                height={'70%'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Typography variant="h2" gutterbottom>Sign In</Typography>
                <SignIn />

            </Box>
            <Box sx={{ bgcolor: '#1b1b1b', py: 2, color: 'white', overflow: 'auto', mt:10 }}>
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}  >
                    <Grid item xs={12} sm={4}>
                        <Typography>Canada(English)</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>© 2024 FlashcardSaas</Typography>
                        <Typography>All Icons and Logos are attribute to FlatIcon at <a href="https://www.flaticon.com/free-icons/flashcard" title="flashcard icons">Flashcard icons created by manshagraphics - Flaticon</a></Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}