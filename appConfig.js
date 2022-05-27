
var developmentDatabase = {
    postgres: {
        host: 'ec2-54-170-90-26.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'd5vpqu2il2mgcc',
        user: 'aouwpqhunhlxbe',
        password: 'f6d2c4a2efc99b368348e5bbfb7467f16a63ba32b8b2ffd2acbeab92b85a8d90'
    }
}

var connectionString = "postgres://aouwpqhunhlxbe:f6d2c4a2efc99b368348e5bbfb7467f16a63ba32b8b2ffd2acbeab92b85a8d90@ec2-54-170-90-26.eu-west-1.compute.amazonaws.com:5432/d5vpqu2il2mgcc";

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
