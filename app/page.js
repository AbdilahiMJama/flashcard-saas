'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid, Divider } from "@mui/material";
import Head from "next/head";
import NavigationAppBar from "./component/NavigationAppBar/page";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })
    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })
    if (error) {
      console.warn(error.message)
    }
  }


  return (
    <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh", color: 'black', overflow: 'auto',}}>
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Flashcard Saas" />
      </Head>
      <NavigationAppBar></NavigationAppBar>
      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" fontFamily='cursive' sx={{mt:10, mb:2,}}>Welcome to Flashcard Saas</Typography>
        <Typography variant="h5" fontFamily='cursive'>
          {' '}
          The easiest way to make flashcards from your text</Typography>
        <Button variant="contained" sx={{mt:40, mb:5}} color="primary">Get Started</Button>
      </Box>
      <Divider></Divider>
      <Box
        sx={{ mt: 6,mb:15, textAlign: 'center' }}>
        <Typography fontFamily='cursive' variant="h3" sx={{ mb: 10}}>Features</Typography>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography fontFamily='cursive' variant="h6" sx={{ my: 5}}>
              Easy Text Input
            </Typography>
            <Typography fontFamily='cursive'>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography fontFamily='cursive' variant="h6" sx={{ my: 5}}>
              Smart Flashcards
            </Typography>
            <Typography fontFamily='cursive'>
              {' '}
              Our AI intelligently breaks down your text into flashcards.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography fontFamily='cursive' variant="h6" sx={{ my: 5}}>
              Easy Text Input
            </Typography>
            <Typography fontFamily='cursive'>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider></Divider>
      <Box sx={{ mt:6,mb:20 , textAlign: 'center' }}>
        <Typography fontFamily='cursive' variant="h3" component="h2" sx={{ mb: 15}}>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{
              border: '1px solid #ccc',
              borderRadius: 2, p: 3
            }}>
              <Typography fontFamily='cursive' variant="h5" gutterbottom>Basic</Typography>
              <Typography fontFamily='cursive' variant="h6" gutterbottom>Free ($0 / month)</Typography>
              <Typography fontFamily='cursive'>
                {' '}
                Access to basic flashcard feature and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} gutterBottom>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{
              border: '1px solid #ccc',
              borderRadius: 2, p: 3
            }}>
              <Typography fontFamily='cursive' variant="h5" gutterbottom>Pro Subscription</Typography>
              <Typography fontFamily='cursive' variant="h6" gutterbottom>$10 / month</Typography>
              <Typography fontFamily='cursive'>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{bgcolor:'#1b1b1b',py:2, color:'white', overflow:'auto'}}>
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}  >
          <Grid item xs={12} sm={4}>
          <Typography>Canada(English)</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
          <Typography>© 2024 FlashcardSaas</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}