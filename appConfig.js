
var developmentDatabase = {
    postgres: {
        host: 'ec2-52-18-116-67.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'dc36ku7u99meh5',
        user: 'yepwepkzzuvzrb',
        password: '33016760071c4f56084ea978788b264c380490745b6d577e463dbd044e72ed93'
    }
}

var connectionString = "postgres://yepwepkzzuvzrb:33016760071c4f56084ea978788b264c380490745b6d577e463dbd044e72ed93@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/dc36ku7u99meh5";

if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
        developmentDatabase = parseConnectionString(process.env.DATABASE_URL);
    } else {
        console.log("process.env.DATABASE_URL empty, connectionString variable used");
        developmentDatabase = parseConnectionString(connectionString);
    }
}else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
}

function parseConnectionString(connectionString) {
    if (connectionString) {
        var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
        var match = myRegexp.exec(connectionString);

        if (match.length == 6) {
            developmentDatabase.postgres.user = match[1];
            developmentDatabase.postgres.password = match[2];
            developmentDatabase.postgres.host = match[3];
            developmentDatabase.postgres.port = Number(match[4]);
            developmentDatabase.postgres.database = match[5];
            developmentDatabase.postgres.ssl = true;

            return developmentDatabase;
        }
    }

    console.log("connectionString parse edilemedi");
    return null;
}

module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
        postgres: developmentDatabase.postgres
    }
}