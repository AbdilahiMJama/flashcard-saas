import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";


export default function NavigationAppBar() {
  return (
    <AppBar sx={{ position: "inherit", bgcolor: '#1b1b1b' }}>
      <Toolbar>
        <Typography variant="h4" style={{flexGrow: 1 }}>
          <Button
            href="/"
            disableRipple
            sx={{
              ml:2,
              transform: 'scale(1.2)',
              color: 'inherit',
              '&:hover': {
                bgcolor: 'initial',
                transform: 'scale(1.6)', // Scale up the button
              },
            }}
          >
            Flashcard Saas
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
          <Button href="/generate" sx={{ color: "white" }}>Create</Button>
          <div>|</div>
          <Button href="/flashcards" sx={{ color: "white" }}>View</Button>
          <div>|</div>
          <Box sx={{ pl: 2, pr: 2 }}>
            <UserButton />
          </Box>

        </SignedIn>
      </Toolbar>
    </AppBar>
  )
}