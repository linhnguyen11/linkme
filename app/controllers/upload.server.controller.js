config = require('../../config/config');
var uploader = require('blueimp-file-upload-expressjs')(config.options);

exports.getupload = function(req, res) {
    uploader.get(req, res, function(obj) {
        res.send(JSON.stringify(obj));
    });
};

exports.postupload = function(req, res) {
    uploader.post(req, res, function(obj) {
        res.send(JSON.stringify(obj));
    });
};

exports.delupload = function(req, res) {
    uploader.delete(req, res, function(obj) {
        res.send(JSON.stringify(obj));
    });
};
//var multer  = require('multer');
//var upload   = multer({ dest: './uploads/'});
//
//exports.uploadfile = function(req,res){
//    upload(req,res,function(err) {
//        if(err) {
//            res.json({message: "Upload failed"});
//        } else res.json({message: "Success"});
//        return false;
//    });
//};


//var cloudinary  = require('cloudinary'),
//    fs = require('fs');
//
//exports.uploadImage = function(req, res){
//    var imageStream = fs.createReadStream(req.files.image.path, { encoding: 'binary' })
//        ,cloudStream = cloudinary.uploader.upload_stream(function() { res.redirect('/'); });
//
//    imageStream.on('data', cloudStream.write).on('end', cloudStream.end);
//};
//exports.show = function(req,res){
//    res.render('pages/upload');
//};


    //= function(req, res, next) {
    //    if(req.files.file) {
    //        cloudinary.uploader.upload(req.files.file.path, function(result) {
    //            if (result.url) {
    //                req.imageLink = result.url;
    //                next();
    //            } else {
    //                res.json(error);
    //            }
    //        });
    //    } else {
    //        next();
    //    }
    //};
