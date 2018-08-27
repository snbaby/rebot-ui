const dateFormat = (dateObj, dateType) => {
  // 年月日yyyy-mm-dd
  const dateType1 = 'yyyy-MM-dd';
  // 年月日时分秒yyyy-mm-dd-hh-mm-ss
  const dateType2 = 'yyyy-MM-dd hh:mm:ss';
  // 时分秒hh-mm-ss
  const dateType3 = 'hh:mm:ss';

  let dateTime = '';
  const date = new Date(dateObj);
  const year = date.getFullYear().toString();
  const month = date.getMonth() + 1;
  const day = date.getDate().toString();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  if (dateType === dateType1) {
    // 年月日yyyy-mm-dd
    dateTime = `${year}-${month}-${day}`;
  } else if (dateType === dateType2) {
    // 年月日时分秒yyyy-mm-dd-hh-mm-ss
    dateTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  } else if (dateType === dateType3) {
    // 时分秒hh-mm-ss
    dateTime = `${hour}:${minutes}:${seconds}`;
  }
  return dateTime;
};
export default { dateFormat };
