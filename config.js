

var path = require('path'),
    config;

config = {
    // ### Production

    production:    {
        url: '',
        mail: {
			config: {
				host: "smtp.126.com",
				//secureConnection: true,
				// use SSL
				port: 25,

				auth: {
					user: 'idoadmin@126.com',
					pass: 'sqm10141010122'
				}
			},
			fromAddress:'idoadmin@126.com'
        },
		database: {
			url:'mongodb://localhost:27017/yoogoer',
			options:{
				db: { native_parser: true },
				server: { poolSize: 5 },
				replset: { rs_name: '' },
				user: '',
				pass: ''
			}
		},

        server: {
            host: '',
            port: '2368'
        },
		redis:{

			host:'127.0.0.1',
			port:'6379',
			db:'',
			pass:'',
			ttl:''
		}
    },


    development: {

        url: 'http://localhost:8080',

		mail: {
			config: {
				host: "smtp.126.com",
				//secureConnection: true,
				// use SSL
				port: 25,

				auth: {
					user: 'idoadmin@126.com',
					pass: 'sqm10141010122'
				}
			},
			fromAddress:'idoadmin@126.com'
		},

        // #### Database
        // App supports mongoDB
		database: {
			url:'mongodb://localhost/yoogoer',
			options:{
				db: { native_parser: true },
				server: { poolSize: 5 },
				replset: { rs_name: '' },
				user: '',
				pass: ''
			}
		},
		redis:{
			host:'127.0.0.1',
			port:'6379',
			db:'',
			pass:'',
			ttl:''
		},


        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',

            port: '8080'
        },
        // #### Paths
        // Specify where your content directory lives
        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }

};

module.exports = config;
