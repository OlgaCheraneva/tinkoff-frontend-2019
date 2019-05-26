'use strict';

const fs = require('fs');
const https = require('https');
const request = require('request');

createDirectory('./db');
createDirectory('./db/images');

function createDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

const getUser = (id) =>
    new Promise((resolve, reject) => {
        const url = `https://reqres.in/api/users/${id}`;
        request(url, (err, _res, body) => {
            err ? reject(err) : resolve(JSON.parse(body).data);
        });
    });

const getUsers = (count) => {
    const promiseArray = [];
    for (let id = 1; id <= count; id++) {
        promiseArray.push(getUser(id));
    }

    return promiseArray;
};

const usedIdArray = [];

Promise.all(getUsers(10))
    .then(processResult)
    .then(saveProcessedResult)
    .catch(console.error);

function processResult(users) {
    return users.map((user) => {
        const {first_name, last_name, avatar} = user;

        const id = generateId();
        const name = `${first_name} ${last_name}`;
        const path = `./db/images/${first_name}_${last_name}.jpg`;
        saveImageToDisk(avatar, path);

        return {id, name, avatar: path};
    });
}

function saveImageToDisk(url, localPath) {
    var file = fs.createWriteStream(localPath);
    https
        .get(url, (response) => {
            file.on(response.pipe(file), () => file.close());
        })
        .on('error', (err) => {
            fs.unlink(localPath);
            console.error(err);
        });
}

function saveProcessedResult(users) {
    fs.writeFileSync(`./db/data.json`, JSON.stringify(users));
}

function generateId() {
    while (true) {
        const id = Math.random()
            .toString(36)
            .split('.')
            .pop();
        if (!usedIdArray.includes(id)) {
            usedIdArray.push.id;

            return id;
        }
    }
}
