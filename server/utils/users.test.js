const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
    var users;
    
    beforeEach(()=>{
        users = new Users();
        users.users=[{

        id: '1',
        name: 'manis',
        room: 'node course'
        
        },{
            id: '2',
            name: 'sai',
            room: 'node course'
        },{
              id: '3',
            name: 'viswa',
            room: 'css course'
         }];   
    });
    
   it('should add new user', ()=>{
       var users = new Users();
       
       var user = {
          id: '123',
           name: 'mani',
           room:'node course'
       };
       
       var resUser = users.addUser(user.id, user.name, user.room);
       
       expect(users.users).toEqual([user]);
   }); 
     
     it('should remove a user',()=>{
         
         var userId = '1';
         var user = users.removeUser(userId);
         
         expect(user.id).toBe(userId);
         expect(users.users.length).toBe(2);
     });
    
      it('should not remove a user',()=>{
          var userId = '99';
         var user = users.removeUser(userId);
         
         expect(user).toNotExist();
         expect(users.users.length).toBe(3);
          
      });
     
      it('should find a user',()=>{
          var userId = '2';
          var user = users.getUser(userId);
          
          expect(user.id).toBe(userId);
      });
      
      it('should not find a user',()=>{
          var userId ='99';
          var user = users.getUser(userId);
          expect(user).toNotExist();
      });
    
    it('should return names for node course',()=>{

        var userList = users.getUserList('node course');
        expect(userList).toEqual(['manis','sai']);
     });

     it('should return names for css course', ()=>{
         
         var userList = users.getUserList('css course');
         expect(userList).toEqual(['viswa']);
     })
});



 