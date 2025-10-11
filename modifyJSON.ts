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

modifyJson();
