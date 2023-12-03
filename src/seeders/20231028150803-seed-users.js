module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
      status: '',
      friendsIds: [1],
      createdAt: new Date(),
      updatedAt: new Date(),
    
    },
    {
      name: 'Bastian',
      email: 'bastiancardenash@uc.cl',
      password: '123456',
      status: '',
      friendsIds: [1],
      createdAt: new Date(),
      updatedAt: new Date(),
    
    },
  ]),

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),

};
