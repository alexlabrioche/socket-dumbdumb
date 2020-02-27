const uuid = require('uuid');

function getTime(date) {
  const hours = date.getHours();
  const mins = `0${date.getMinutes()}`.slice(-2);
  return `${hours}:${mins}`;
}

module.exports.createUser = ({ name = '' } = {}) => ({
  id: uuid(),
  name,
});

module.exports.createMessage = ({ message = '', sender = '' } = {}) => ({
  id: uuid(),
  time: getTime(new Date(Date.now())),
  message,
  sender,
});

module.exports.createChat = ({
  messages = [],
  name = 'Community',
  users = [],
} = {}) => ({
  id: uuid(),
  messages,
  name,
  users,
  typingUsers: [],
});
