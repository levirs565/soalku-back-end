const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/soalku");

var soalScheme = new mongoose.Schema({
  _id: Number,
  soal: String,
  pilihan: Array,
  jawaban: Number
}, {
    collection: "soal"
  }
)

var Soal = mongoose.model('Soal', soalScheme);

function getSoal(id) {
  return Soal.findById(id)
}
exports.getSoal = getSoal