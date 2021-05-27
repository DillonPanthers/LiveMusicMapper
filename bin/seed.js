const {
  db,
  Concert,
  Genre,
  User,
  Friendship,
  FriendRequest,
} = require('../server/db/index'); // import models from index so we have access to hooks and magic methods

const { users } = require('./data/users');

const init = async () => {
  try {
    await db.sync({ force: true });
    const [vikki, alejandra, inderprit, craig] = await Promise.all(
      users.map((user) =>
        User.create({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        })
      )
    );

    await vikki.addFriend([alejandra, inderprit]);
    const us = await User.findAll({
      include: 'friends',
    });

    await vikki.addInvitees(alejandra);
    console.log(
      await FriendRequest.findAll({
        where: { inviteeId: alejandra.id },
        include: { model: User, as: 'invitee' },
      })
    );
    console.log('connected');
    await db.close();
  } catch (error) {
    console.log(error);
  }
};

init();
