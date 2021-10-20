export const getRandomId = () => {
  return Math.floor(Math.random() * 10000000000);
}
export const getRandomUuid = () => {
  let idString = ''
  const abc = 'abcdefghijklmnopqrstuvwxyz';

  for(let i = 0; i < 16; i++){
    const randNum = Math.floor(Math.random() * 10000000);
    const randAlphabetNum = Math.floor(Math.random() * abc.length);
    const randNumNine = Math.floor(Math.random() * 10);
    if(i % 4 === 0 && i !== 0) {idString += '-'};
    if(randNum % 2 === 0){
      idString += abc[randAlphabetNum]

    }else {
      idString += randNumNine
    }
  }
  return idString;
}
