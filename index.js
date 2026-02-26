const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Data Jadwal (bisa diganti database)
const jadwal = {
  Monday: [
    "07.30 bahasa bali",
    "08.50 IPAS"
    "09.30 bahasa indonesia"
  ],
  selasa: [
    "05.45 pjok",
    "09.30 DDA"
    "14.20 matematika
  ],
rabu: [
  "07.30 ppkn",
  "08.50 matematika"
  "10.40 seni budaya"
  " 12.00 sejarah"
  "13.40 BK"
 "14.20 bahasa indonesia"
],
  kamis: [
    "07.30 KKA"
    "08.50 DDA"
    "13.40 AGAMA"
],
  JUMAT: [
    "07.30 INFORMATIKA"
    "11.20 BAHASA INGGRIS"


app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  if (intent === "Tanya_Jadwal_Hari_Ini") {

    const date = req.body.queryResult.parameters.date;

    const hari = new Date(date).toLocaleDateString("en-US", {
      weekday: "long"
    });

    const dataHari = jadwal[hari];

    if (!dataHari) {
      return res.json({
        fulfillmentText: "Jadwal untuk hari ini belum tersedia."
      });
    }

    let responseText = `Jadwal hari ${hari}:\n`;

    dataHari.forEach(item => {
      responseText += `${item.jam} - ${item.mapel}\n`;
    });

    return res.json({
      fulfillmentText: responseText
    });
  }

  res.json({
    fulfillmentText: "Maaf, saya tidak mengerti."
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
