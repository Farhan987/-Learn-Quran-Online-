import AyatClass from './ayat';
class QuranPages {
  constructor() {
    this.pageNo = 0;
    this.singlePage = [];
  }
  setAyats = (pgNo, ayats) => {
    ayats.forEach(ayah => {
      this.pageNo = pgNo;
      this.singlePage.push(new AyatClass(ayah));
    });
    return this;
  };
  setPage = pageNo => {
    this.pageNo = pageNo;
    return this;
  };
}
export default QuranPages;
