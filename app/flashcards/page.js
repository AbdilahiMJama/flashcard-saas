'use client'
import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";
import { db } from '@/firebase';
import { collection, getDoc, setDoc, doc, updateDoc, writeBatch, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";

import { Container, CardActionArea, Card, CardContent, Typography, Box, Grid, Button } from "@mui/material";
import NavigationAppBar from "../component/NavigationAppBar/page";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [flashcards, setFlashcards] = useState([]);

    async function getFlashcards() {
        if (!user) return
        const docRef = doc(collection(db, 'users'), user.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            // console.log(collections);
            setFlashcards(collections);
        } else {
            await setDoc(docRef, { flashcards: [] });
        }
    }


    useEffect(() => {
        getFlashcards();
    }, [user])


    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    }

    const deleteFlashcard = async (name, id) => {
        // console.log('Deleting document at path:', `users/${user.id}/${search}/${id}`);
        await deleteDoc(doc(db, 'users', user.id, name, id));
    }

    async function deleteCollection(id) {
        const docRef = collection(doc(collection(db, 'users'), user.id), id);
        const docs = await getDocs(docRef);

        docs.forEach((doc) => {
            // const document = doc(db,'users', user.id,id,doc.id)
            deleteFlashcard(id, doc.id)

        });

        // remove map to collection
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)
        const collections = docSnap.data().flashcards || [];

        let newFlashcard = [];
        collections.forEach((set) => {
            if (set.name != id) {
                newFlashcard.push({ 'name': set.name })
            }

        })

        await updateDoc(userDocRef, { flashcards: newFlashcard })
        getFlashcards()
    }

    return (
        <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh" }}>
            <NavigationAppBar></NavigationAppBar>
            <Grid container spacing={3} sx={{ mt: 4 }} >
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Button onClick={() => {deleteCollection(flashcard.name) }}> X</Button>
                        <Card>
                            <CardActionArea
                                onClick={() => {
                                    handleCardClick(flashcard.name)
                                }
                                }>
                                <CardContent>
                                    <Typography variant="h5">{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}