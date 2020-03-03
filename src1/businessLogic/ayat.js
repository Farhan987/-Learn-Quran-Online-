class Ayat {
  constructor(ayats) {
    this.surah = ayats.surah;
    this._id = ayats._id;
    this.number = ayats.number;
    this.text = ayats.text;
    this.numberInSurah = ayats.numberInSurah;
    this.juz = ayats.juz;
    this.manzil = ayats.manzil;
    this.page = ayats.page;
    this.ruku = ayats.ruku;
    this.hizbQuarter = ayats.hizbQuarter;
    this.sajda = ayats.sajda;
    this.isLastRukuhAyat = ayats.isLastRukuhAyat
      ? ayats.isLastRukuhAyat
      : false;
    this.isSurahStart = ayats.isSurahStart;
    this.isSurahStart = ayats.isSurahStart;
    this.marked = false;
    this.isJuzStart = ayats.isJuzStart ? ayats.isJuzStart : false;
    // this.isJuzStart = ayats.isJuzStart;
  }
}
export default Ayat;

// this.number = number;
// this.verse = name;
// this.englishName = englishName;
// this.englishNameTranslation = englishNameTranslation;
// this.revelationType = revelationType;
// this.numberOfAyahs = numberOfAyahs;
