const expect = require('expect');

const {isRealString} = require('./validation');

describe( 'isRealString', function(){
    it('should reject non string values', function(){
        var res =isRealString(98);
        expect(res).toBe(false);
});
    it('should reject  a string with only spaces', function(){
        var res = isRealString('  ');
        expect(res).toBe(false);
    });
    
    it('should allow a string with non-space characters',()=>{
        var res = isRealString('mani');
        expect(res).toBe(true);
    });
    
       });
