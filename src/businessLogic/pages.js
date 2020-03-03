import AyatClass from "./ayat";
class QuranPages {
  constructor() {
    this.pageNo = 0;
    this.singlePage = [];
    this.loaded = false;
    this.height = 700;
  }
  setAyats = (pgNo, ayats) => {
    ayats.forEach(ayah => {
      this.pageNo = pgNo;
      this.singlePage.push(new AyatClass(ayah));
    });
    this.loaded = true;
    return this;
  };
  setLoaded = value => {
    this.loaded = value;
    return this;
  };
  setPage = pageNo => {
    this.pageNo = pageNo;
    return this;
  };
}
export default QuranPages;
