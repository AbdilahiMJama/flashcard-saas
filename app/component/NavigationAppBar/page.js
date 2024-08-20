import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";


export default function NavigationAppBar() {
  return (
    <AppBar sx={{ position: "inherit", bgcolor: '#1b1b1b', pl: 4 }}>
      <Toolbar>
        <Typography variant="h4" md={"h2"} style={{flexGrow: 1 }}>
          <Button
            href="/"
            disableRipple
            sx={{
              ml: 2,
              transform: 'scale(1.6)',
              color: 'inherit',
              '&:hover': {
                bgcolor: 'initial',
                transform: 'scale(1.7)', // Scale up the button
              },
            }}
          >
            Flashcard Generator
          </Button>
        </Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">
            {''}
            Login
          </Button>
          <Button color="inherit" href="/sign-up">
            Sign Up
          </Button>
        </SignedOut>
        <SignedIn>
          <Button href="/generate"
            disableRipple
            sx={{
              color: "white",
              '&:hover': {
                bgcolor: 'initial',
                transform: 'scale(1.2)', // Scale up the button
              }

            }}
          >Create</Button>
          <div>|</div>
          <Button href="/flashcards" disableRipple
            sx={{
              color: "white",
              '&:hover': {
                bgcolor: 'initial',
                transform: 'scale(1.2)', // Scale up the button
              }

            }}
          >View</Button>
          <div>|</div>
          <Box sx={{ pl: 2, pr: 2 }}>
            <UserButton />
          </Box>

        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}