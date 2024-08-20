'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid, Divider } from "@mui/material";
import Head from "next/head";
import NavigationAppBar from "./component/NavigationAppBar/page";
import Image from 'next/image';

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
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
        <title>Flashcard Generator</title>
        <meta name="description" content="Flashcard Generator" />
      </Head>
      <NavigationAppBar></NavigationAppBar>
      <Box
        sx={{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2" fontFamily='cursive' sx={{mt:10, mb:10,}}>Welcome to Flashcard Generator</Typography>
        <Typography variant="h5" fontFamily='cursive'>
          {' '}
          The easiest way to make flashcards from your text</Typography>
          <Typography variant="h5" fontFamily='cursive'>Generate any flashcards as you go on any topic of your choosing</Typography>
          <Box sx ={{display: "flex", justifyContent: 'center', my:'30px'}}>
            <Image src="/flash-cards.png" alt="flashcard" width={400} height={400} objectPosition="absolute"/>
          </Box>
      </Box>
      <Divider></Divider>
      <Box
        sx={{ mt:10, mb:25, textAlign: 'center' }}>
        <Typography fontFamily='cursive' variant="h3" sx={{ mb: 10}}>Features</Typography>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid item xs={12} sm={12} md={4}>
            <Typography fontFamily='cursive' variant="h6" sx={{ my: 4}}>
              Easy Text Input
            </Typography>
            <Typography fontFamily='cursive'>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier. Simply input your topic and let the magic happen.
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ml:4}} />
          <Grid item xs={12} sm={12} md={4}>
            <Typography fontFamily='cursive' variant="h6" sx={{ my: 4}}>
              Smart Flashcards
            </Typography>
            <Typography fontFamily='cursive'>
              {' '}
              Our AI intelligently breaks down your text into flashcards. State of the art technology with a simple interface with the goal of making learning efficient.
              Easy to customize and all about you.
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" sx={{ mt: 20 }}>Learn More</Button>
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
              <Button href="/sign-up"  disabled={isSignedIn} variant="contained" color="primary" sx={{ mt: 2 }} gutterbottom>{isSignedIn ? `Current Plan` : "Choose Basic"}</Button>
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
          <Typography>All Icons and Logos are attribute to FlatIcon at <a href="https://www.flaticon.com/free-icons/flashcard" title="flashcard icons">Flashcard icons created by manshagraphics - Flaticon</a></Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}