'use client'
import { useUser } from "@clerk/nextjs";
import { use, useEffect, useState } from "react";

import { db } from '@/firebase';
import { collection, getDoc, setDoc, doc, deleteField, writeBatch, getDocs, deleteDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";

import { Container, CardActionArea, Card, CardContent, Typography, Box, Grid, Button } from "@mui/material";
import NavigationAppBar from "../component/NavigationAppBar/page";

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser();
    const router = useRouter();
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        async function getFlashcards() {
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                console.log(collections);
                setFlashcards(collections);
            } else {
                await setDoc(docRef, { flashcards: [] });
            }

        }
        getFlashcards();
    }, [user])


    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`);
    }

    async function deleteCollection(id) {
        const firestoreInstance = getFirestore();
        const collectionPath = `users/${user.id}/${id}`
        // collection(doc(collection(db, 'users'), user.id), id);
        const collectionRef = firestoreInstance.collection(collectionPath);
        const snapshot = await collectionRef.get();

        if (!snapshot.empty) {
            const batch = firestoreInstance.batch();

            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('All documents deleted from the collection.');
        } else {
            console.log('The collection is already empty.');
        }
    }

    // Example usage
    // deleteAllDocuments('your-collection-name')
    //     .then(() => {
    //         console.log('Operation completed successfully!');
    //     })
    //     .catch((error) => {
    //         console.error('Error deleting documents:', error);
    //     });

    return (
        <Container maxWidth="100vw" sx={{ bgcolor: "white", height: "100vh" }}>
            <NavigationAppBar></NavigationAppBar>
            <Grid container spacing={3} sx={{ mt: 4 }} >
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Button onClick={() => { console.log(flashcard.name); deleteCollection(flashcard.name) }}> X</Button>
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