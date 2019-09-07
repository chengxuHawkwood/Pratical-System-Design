module.exports=(app)=>{
    
    describe('authRoute API', function () {
        const request = require('supertest')(app)
        describe('/auth/google', function(){
            it('redirect success', function(done){
                request.get('/auth/google')
                .send({ username: 'admin', password: 'admin' })
                .expect(302)
                .end((err, res) => {
                    if (err) console.log(err);
                    done();
                })
            })
        }),
        describe('/api/logout', function(){
            it('redirect success', function(done){
                request.get('/api/logout')
                .expect(302)
                .end((err, res) => {
                    if (err) console.log(err);
                    done();
                })
            })
        })
    })
    
}