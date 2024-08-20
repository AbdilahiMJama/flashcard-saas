'use client'

import { Box, Container, Paper, TextField, Typography, Button, Grid, CardActionArea, Card, CardContent, DialogTitle, DialogContent, DialogActions, Dialog, DialogContentText } from "@mui/material";
import { doc, getDoc, setDoc, collection, writeBatch, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { db } from '@/firebase';
import NavigationAppBar from "../component/NavigationAppBar/page";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [dailyUse, setDailyUse] = useState(0);

    const handleSubmit = async () => {
        fetch('api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => setFlashcards(data))

    }
    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const saveFlashcards = async () => {

        if (!name) {
            alert('Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(userDocRef);


        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards;
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with the same name already exists');
                return;
            } else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((f) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, f);
        })
        await batch.commit();
        handleClose();
        router.push('/flashcards');

    }

    const increaseUsage = async () => {
        const userDocRef = doc(collection(db, 'users'), user.id)
        await updateDoc(userDocRef, { usage: dailyUse + 1 })
        getUsage()
    }

    async function getUsage() {

        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        setDailyUse(docSnap.data().usage  || dailyUse)
    }

    useEffect(() => {
        if (isLoaded) getUsage()
    }, [dailyUse, isLoaded, user])


    return (
        <Container maxWidth='100vw' sx={{ bgcolor: "white", height: "100vh", color: 'black', overflow: 'auto', }}>
            <NavigationAppBar></NavigationAppBar>
            <Paper elevation={5} sx={{ p: '20px' }}>
                <Box
                    sx={{
                        mt: 5,
                        mb: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Grid container spacing={4} sx={{ px: 5, display: 'flex', flexDirection: 'column', }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4"> Generate Flashcards</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 5, mt: 2 }}> Generated Today: {dailyUse}/10</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body"> Gather the material you want to convert into flashcards. This could be text from a textbook, lecture notes, or any other study material.</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body"> The AI will generate a set of flashcards based on your prompt. Upon generation, preview the flashcards.</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="body"> Save the flashcards as a collection using a name. You can view your generated flashcards in the view section for additional customization.</Typography>
                        </Grid>
                    </Grid>
                    <Paper
                        elevation={5}
                        sx={{ my: 5, p: 4, width: '95%' }}>
                        <TextField value={text}
                            onChange={(e) => setText(e.target.value)}
                            label="Enter text"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ mb: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={() => { increaseUsage(); handleSubmit() }} fullWidth>Submit</Button>
                    </Paper>
                </Box>
                {flashcards.length > 0 && (<Box
                    sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterbottom textAlign={"center"}>Flashcards Preview</Typography>

                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => handleCardClick(index)}>
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '300px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',

                                                },
                                                '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.back}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, justifyContent: "center", display: "flex" }}>
                        <Button variant="contained" color="secondary" onClick={handleOpen}>Save</Button>
                    </Box>
                </Box>
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for the flashcard collection
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Collection Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="outlined" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={saveFlashcards}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
            <Box sx={{ bgcolor: '#1b1b1b', py: 2, color: 'white', overflow: 'auto' }}>
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', }}  >
                    <Grid item xs={12} sm={4}>
                        <Typography>Canada(English)</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography>© 2024 FlashcardSaas</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Container >
    )
}