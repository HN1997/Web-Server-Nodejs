const users = [];

const addUser = ({ id, namen room}) => {
  name = name.trim().toLowerCase(); //removes the leading and trailing white space and line terminator characters
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name == name );

  if(existingUser)
  {
    return {error: 'Username is taken'};
  }

  const user = {id, name, room};

  user.push(users);

  return {user}
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id ===id);

  if(index !== -1)
  {
    return users.splice(index,1)[0];
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => user.filtrer((user) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
