'use client'

import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { collection, getDoc, getDocs, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSearchParams } from "next/navigation";
import { Box, Container, Typography, Button, Grid, CardActionArea, Card, CardContent, Paper, Modal, Fade, TextField } from "@mui/material";
import NavigationAppBar from "../component/NavigationAppBar/page";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    async function getFlashcard() {
        if (!search || !user) return
        const docRef = collection(doc(collection(db, 'users'), user.id), search);
        const docs = await getDocs(docRef);
        const flashcards = [];

        docs.forEach((doc) => {
            flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
    }
    useEffect(() => {
        getFlashcard();
    }, [user, search,])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    const addFlahscard = async (frontData, backData) => {
        const myCollection = collection(doc(collection(db, 'users'), user.id), search);
        const newFlashcard = {
            front: frontData,
            back: backData,
        };

        // Add the document to the collection
        await addDoc(myCollection, newFlashcard);
    }

    const deleteFlashcard = async (id) =>{
        // console.log('Deleting document at path:', `users/${user.id}/${search}/${id}`);
        await deleteDoc(doc(db,'users', user.id,search,id));
    }

    return (
        <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh", overflow: 'auto' }}>
            <NavigationAppBar></NavigationAppBar>
            <Box p={2} borderBottom={"2px solid black"}>
                <Typography variant="h2" color={"black"}>Flashcards</Typography>
            </Box>
            <Grid container width={'100%'} padding={2} sx={{ boxShadow: 4, borderRadius: 4, mb: 2, mt: 1 }}>
                <Box
                    sx={{
                        p: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        borderBottom: '1px solid #ebebeb'
                    }}
                >

                    <Paper><Button onClick={handleOpen}>+</Button></Paper>

                </Box>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ p: 2 }}>
                        <Card>
                            <Button fullWidth size="small" onClick={()=>{console.log(flashcard.id);deleteFlashcard(flashcard.id);getFlashcard()}} sx={{color:'red'}}>-</Button>
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent>
                                    <Paper sx={{
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
                                    </Paper>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Typography variant="h6" component="h2" color={"black"}>
                            Create a Flashcard
                        </Typography>
                        <Box >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="front"
                                label="Front of Flashcard"
                                name="front"
                                multiline
                                rows={4}
                                value={front}
                                onChange={(e) => setFront(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="back"
                                label="Back of Flashcard"
                                id="back"
                                multiline
                                rows={4}
                                value={back}
                                onChange={(e) => setBack(e.target.value)}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => { addFlahscard(front, back); setBack(""); setFront(""); getFlashcard();handleClose() }}
                            >
                                Create Flashcard
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Container>
    )
}
