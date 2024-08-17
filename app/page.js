import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Flashcard Saas" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}
          >Flashcard Saas</Typography>
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
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
      sx = {{
        textAlign: 'center',
        my: 4
      }}>
        <Typography variant="h2" gutterBottom>Welcome to Flashcard Saas</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          The easiest way to make flashcards from your text</Typography>
          <Button variant="contained" color="primary">Get Started</Button>
      </Box>
      <Box
      sx={{my: 6}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into flashcards.
            </Typography>
          </Grid>
          <Grid item xs={4} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
            <Box sx={{border: '1px solid #ccc', 
             borderRadius: 2, p: 3}}>
            <Typography variant="h5" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>$5 / month</Typography>
            <Typography>
              {' '}
              Access to basic flashcard feature and limited storage.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} gutterBottom>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={6} md={6}>
            <Box sx={{border: '1px solid #ccc', 
             borderRadius: 2, p: 3}}>
            <Typography variant="h5" gutterBottom>Pro</Typography>
            <Typography variant="h6" gutterBottom>$10 / month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage, with priority support.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}