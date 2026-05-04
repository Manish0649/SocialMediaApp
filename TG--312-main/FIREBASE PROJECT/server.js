// import express from 'express';
// const app = express();
// const PORT = 8090;

// import {User , Posts , db} from './firebase.js';
// import { addDoc , getDocs , updateDoc , deleteDoc , query , doc , where} from 'firebase/firestore';

// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Welcom page');
// });

// app.post('/register' , async (req, res) => {
//     const { name , email , password } = req.body;
//     let q = query(User, where("email", "==", email));
//     let result = await getDocs(q);
//     if(result.size > 0){
//         return res.status(400).json({message : "User already exists" });
//     }
//     let user = await addDoc(User , {name , email , password});
//     return res.status(200).json({message : "User registered successfully" });
// })

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });