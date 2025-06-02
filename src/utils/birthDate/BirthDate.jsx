const BirthDate = (time) => {
  const date = new Date(time);
  const offsetDate = new Date(date.getTime() + ( 60 * 1000)); // +9시간(KST 보정)
  const yyyy = offsetDate.getFullYear();
  const mm = String(offsetDate.getMonth() + 1).padStart(2, '0');
  const dd = String(offsetDate.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
};

export default BirthDate;