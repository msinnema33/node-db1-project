const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*').from("accounts")
   .then(rows => {
       res.status(200).json({ data: rows });
   })
   .catch(err => {
       res.status(500).json({ message: 'dB error '});
   })
 });

 router.get('/:id', (req, res) => {
     db("accounts")
     .where({ id: req.params.id })
     .then(rows => {
         res.status(200).json({ data: rows });
     })
     .catch(err => {
         res.status(500).json({ message: 'dB error' });
     })
 });

 router.post('/', (req, res) => {
     db("accounts").insert(req.body, "id")
     .then(ids => {
         res.status(201).json({ results: ids });
     })
 })

 router.put('/:id', (req, res) => {
   const changes = req.body;

   db("accounts")
   .where({ id: req.params.id })
   .update(changes)
   .then(count => {
       if(count > 0) {
           res.status(200).json({ message: "Account updated successfully" });
       } else {
           res.status(404).json({ message: "Account not found" });
       }
   })
   .catch(err => {
       res.status(500).json({ message: 'Sorry, dB error' });
   });
 });

 router.delete('/:id', (req, res) => {
     db("accounts")
     .where({ id: req.params.id })
     .then(count => {
         if(count > 0) {
             res.status(200).json({ message: 'Record deleted successfully' });
         } else {
             res.status(404).json({ message: 'Sorry, account not found' });
         }
     })
     .catch(err => {
         res.status(500).json({ message: 'Sorry, we ran into a dB error' });
     });
 });

 module.exports = router;