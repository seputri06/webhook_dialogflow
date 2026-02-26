const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Data Jadwal (bisa diganti database)
const jadwal = {
  Monday: [
    { jam: "07.00 - 08.30", mapel: "Matematika" },
    { jam: "08.30 - 10.00", mapel: "Bahasa Indonesia" }
  ],
  Tuesday: [
    { jam: "07.00 - 08.30", mapel: "IPA" },
    { jam: "08.30 - 10.00", mapel: "IPS" }
  ]
};

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
