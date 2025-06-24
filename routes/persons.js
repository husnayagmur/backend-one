const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// 1) GET: Tüm kişileri listele
router.get("/", async (req, res) => {
    try {
        // Veritabanından tüm kişileri getir
        const people = await Person.find();
        // JSON formatında gönder
        res.json(people);
    } catch (error) {
        // Hata varsa 500 hatası ve mesaj gönder
        res.status(500).json({ error: error.message });
    }
});

// 2) POST: Yeni kişi ekle
router.post("/add", async (req, res) => {
    try {
        console.log(req.body); // İstek gövdesini konsola yazdır

        // İstek gövdesinden verileri al
        const { first_name, last_name, age } = req.body;

        // Yeni Person nesnesi oluştur
        const person = new Person({ first_name, last_name, age });

        // Veritabanına kaydet
        await person.save();

        // Başarılı cevap dön
        res.json({ message: "Kişi eklendi", data: person });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3) PUT: Var olan kişiyi güncelle
router.put("/update/:id", async (req, res) => {
    try {
        const personId = req.params.id; // URL'den güncellenecek kişinin ID'sini al
        const updates = req.body; // Güncelleme verilerini al

        // Veritabanında ilgili ID'ye sahip kişiyi bul ve güncelle
        const updatedPerson = await Person.findByIdAndUpdate(personId, updates, { new: true });

        if (!updatedPerson) {
            return res.status(404).json({ message: "Kişi bulunamadı" });
        }

        // Güncellenen kişiyi gönder
        res.json({ message: "Kişi güncellendi", data: updatedPerson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4) DELETE: Kişiyi sil
router.delete("/delete/:id", async (req, res) => {
    try {
        const personId = req.params.id; // Silinecek kişinin ID'si

        // Veritabanından sil
        const deletedPerson = await Person.findByIdAndDelete(personId);

        if (!deletedPerson) {
            return res.status(404).json({ message: "Kişi bulunamadı" });
        }

        // Başarılı cevap dön
        res.json({ message: "Kişi silindi", data: deletedPerson });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
