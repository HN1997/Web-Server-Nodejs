//empty array of users
const users = [];

const addUser = ({id, name, room}) => {
    //remove white space between words and put it in lowercase
    //Jean Dujardin becomes jeandujardin
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check if a user with this name already exist in a room
    //this is forbidden
    const existingUser = users.find((user) => user.room === room && user.name ===name);

    if(existingUser){
        return {error: 'Username is taken'};
    }

    //else we put the new user in the array
    const user = {id, name, room};
    users.push(user);

    return {user};
};

const removeUser = (id) => {
    //check if there is a user with this id
    const index = users.findIndex((user) => user.id === id);

    //if it exists
    if(index !== -1 )
    {
        //we get in users the index, 1 field which returns
        //an array of length 1 so we get the first element 0
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

//filter returns the elements of an array that meet the condition
//in the callback function
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom};