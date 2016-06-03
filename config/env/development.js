module.exports = {
    db : 'mongodb://linhnguyen:123456@ds017852.mlab.com:17852/linkme',
    options: {
        tmpDir: __dirname + '/../../public/uploaded/tmp',
        uploadDir: __dirname + '/../../public/uploaded/files',
        uploadUrl: '/uploaded/files/',
        acceptFileTypes: /\.(gif|jpe?g|png)/i,
        imageTypes: /\.(gif|jpe?g|png)/i,
        copyImgAsThumb: true,
        imageVersions: {
            maxWidth: 280,
            maxHeight : 'auto',
            "small" : {
                width : 280,
                height : 'auto'
            }
        },
        storage : {
            type : 'aws',
            aws : {
                accessKeyId :  'AKIAJ3ROEFKC7Y3EACPA',
                secretAccessKey : '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',
                region : 'us-west-2',
                bucketName : 'artage1'
            }
        }
    },
    cloudinary: {
        cloud_name: 'jackfrost90dn',
        api_key: '477648724783955',
        api_secret: 'ntO_h9UqNVyf-RijmHbtY5XpFTE'
    },
    sessionSecret: 'developmentSessionSecret',
    facebook: {
        clientID: '1068695586474981',
        clientSecret: '01b419dcbee46d5130a3cc87d6e099c6',
        callbackURL: '/oauth/facebook/callback'
    }

};