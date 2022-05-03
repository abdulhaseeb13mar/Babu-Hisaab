import Navigator from './navigator';
import Snackbar from './snackbar';

const sortDuesWithTimeStamp = rawDues => {
  const dues = [...rawDues];
  dues.sort((a, b) => parseInt(b.date) - parseInt(a.date));
  return dues;
};

const makeUsersObject = (allUsers, callBack) => {
  let users = {};
  allUsers.forEach(user => (users[user.id] = user));
  callBack(users);
};

const addUserIdToEachDue = dues => {
  const allDues = [];
  let total = 0;
  Object.keys(dues).forEach(userId =>
    dues[userId].forEach(due => {
      total += parseInt(due.amount);
      allDues.push({...due, userId});
    }),
  );
  return {allDues, total};
};

export {
  Navigator,
  Snackbar,
  sortDuesWithTimeStamp,
  makeUsersObject,
  addUserIdToEachDue,
};
