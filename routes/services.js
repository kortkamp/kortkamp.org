var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();


var mailer; // undefined
try{
    var mailInfo = require('../mail_info.json')
    if(mailInfo)
        mailer = require('../mailer');
}catch{
    console.log('No mailer credentials provided');
}







const familyMemberController = require('../database/controllers/FamilyMemberController');
const commentController = require('../database/controllers/CommentController');
const PostController = require('../database/controllers/PostController');

const {ContactController,ConfigController} = require('../database/controllers/BlogController');



async function updatePostCache(){

    siteConfig = await ConfigController.getFirstEntry();

    postsData = await PostController.listAllPosts();
        
    // build all page names replacing 
    postsData.forEach(element => {
        element.path = String(element.title).toLowerCase().replace(/ /g, '-');
    });
}




router.get('/getPositions', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    
    if(req.query)
        if(req.query.id)
        familyMemberController.getFamilyPosition(req.query.id).then(response => {
            //console.log(response)
            res.send(response)
        })

});





router.post('/postComment', function(req, res, next) {
    console.log(req.body)   
    if(req.body)
        commentController.postComment(Object.assign(req.body)).then(response => {
                        
            for(index in response){
                response[index].create_date = formatDateTime(response[index].create_date);
            }
            
            res.redirect('/' + req.body.parent_post)
        })
    else
        res.send('Erro ao postar o comentário') 
});



router.post('/make_contact', function(req,res,next){
    //return ContactController.store(req, res, next)
    
    if(req.body){
        if(req.body.name && req.body.email && req.body.message){
            // send mail to admin
            
            if(mailer && siteConfig.notify_contact){
                mailer.sendContactMail(req.body).then(response => {
    
                }).catch(error => {

                })
            }
            // Store contact on Database.
            // As our controller is an API controller, it handles the res.send() per se. 
            return ContactController.store(req, res, next)
        }
    }
    return res.status(400).send();
});


module.exports = router;
