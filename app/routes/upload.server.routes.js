var upload = require('../../app/controllers/upload.server.controller');
module.exports = function(app){
    //app.route('/api/photo').post(upload.uploadImage);
    //app.route('/api/upload').get(upload.show);
    app.route('/upload')
        .get(upload.getupload)
        .post(upload.postupload);
    app.route('/uploaded/files/:name').delete(upload.delupload);
}