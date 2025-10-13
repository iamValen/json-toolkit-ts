import * as fs from 'fs';

async function modifyJson() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    let json = await res.json();

    json = json.map(user => {
        // rename key
        user.url = user.website;
        delete user.website;

        // delete one key
        delete user.company.bs;
        delete user.address.geo;

        // emails to @ualg.pt
        user.email = user.email.replace(/@[\w.-]+/, '@ualg.pt');

        return user;
    });

    fs.writeFileSync('users.json', JSON.stringify(json));
    console.log(json);
}

async function renameKey(json: any[], oldKey: string, newKey: string) {
    json.forEach(item => {
        if (item[oldKey]) {
            item[newKey] = item[oldKey];
            delete item[oldKey];
        }
    });
}

async function fetch(url: string) {
    const res = await fetch(url);
    return await res.json();
}


modifyJson();
