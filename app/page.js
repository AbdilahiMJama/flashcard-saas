'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import Head from "next/head";
import NavigationAppBar from "./component/NavigationAppBar/page";

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers:{
        origin:'http://localhost:3000',
      },
    })
    const checkoutSessionJson = await checkoutSession.json();
    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }
    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
    })
    if(error) {
      console.warn(error.message)
    }
  }


  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Flashcard Saas" />
      </Head>
      <NavigationAppBar></NavigationAppBar>
      <Box
      sx = {{
        textAlign: 'center',
        my: 4
      }}>
        <Typography variant="h2" gutterbottom>Welcome to Flashcard Saas</Typography>
        <Typography variant="h5" gutterbottom>
          {' '}
          The easiest way to make flashcards from your text</Typography>
          <Button variant="contained" color="primary">Get Started</Button>
      </Box>
      <Box
      sx={{my: 6}}>
        <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
        <Grid container spacing={2} sx={{display:'flex',justifyContent:'center', alignItems:'center'}}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Text Input
            </Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards
              has never been easier.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Smart Flashcards
            </Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into flashcards.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
        <Typography variant="h4" component="h2" gutterbottom>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{border: '1px solid #ccc', 
             borderRadius: 2, p: 3}}>
            <Typography variant="h5" gutterbottom>Basic</Typography>
            <Typography variant="h6" gutterbottom>$5 / month</Typography>
            <Typography>
              {' '}
              Access to basic flashcard feature and limited storage.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} gutterBottom>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={{border: '1px solid #ccc', 
             borderRadius: 2, p: 3}}>
            <Typography variant="h5" gutterbottom>Pro Subscription</Typography>
            <Typography variant="h6" gutterbottom>$10 / month</Typography>
            <Typography>
              {' '}
              Unlimited flashcards and storage, with priority support.
            </Typography>
            <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}