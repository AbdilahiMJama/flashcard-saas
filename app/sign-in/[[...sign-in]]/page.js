import NavigationAppBar from "@/app/component/NavigationAppBar/page";
import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Toolbar, Typography, Container } from "@mui/material";
import Link from "next/link";


export default function SignUpPage() {
    return (
        <Container maxWidth='sm'>
            <NavigationAppBar></NavigationAppBar>
            <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            >
                <Typography variant="h2" gutterbottom>Sign In</Typography>
                <SignIn />

            </Box>
        </Container>
    )
}