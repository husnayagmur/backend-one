const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// GET: Tüm kişileri listele
router.get("/", async (req, res) => {
    const people = await Person.find();
    res.json(people);
});

// POST: Yeni kişi ekle
router.post("/add", async (req, res) => {

    try {
        console.log(req.body);

        const { first_name, last_name, age } = req.body;
        const person = new Person({ first_name, last_name, age });
        await person.save();
        res.json({ message: "Kişi eklendi", data: person });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

module.exports=router;