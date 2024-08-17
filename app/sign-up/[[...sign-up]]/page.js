import { SignUp } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography, Container } from "@mui/material";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <Container maxWidth='sm'>
            <AppBar position="static" sx={{backgroundColor:'#3f51b5'}}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Flashcard Saas</Typography>
                    <Button color="inherit">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up">Sign Up</Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            >
                <Typography variant="h2" gutterbottom>Sign Up</Typography>
                <SignUp />
            </Box>
        </Container>
    )
}