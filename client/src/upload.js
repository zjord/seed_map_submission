// const imgurApi = axios.create({
//     headers: {
//         'Authorization': 'Client-ID xxx'
//     }
// })
//
// async function postImgurImage(base64: string, username: string, desc: string) {
//     try {
//         const data = {
//             "image": base64,
//             "title": username,
//             "description": desc
//         }
//         const res = await imgurApi.post('https://api.imgur.com/3/image', data)
//         if (res.status === 200) {
//             console.log(res.data);
//             return res.data
//         } else {
//             return `Error: ${res.statusText}`
//         }
//     } catch (err) {
//         console.log(err);
//         return err
//     }
// }

// $.ajax({
//     url: 'https://api.imgur.com/3/image',
//     headers: {
//         'Authorization': 'Client-ID b42ca0577349213'
//     },
//     type: 'POST',
//     data: {
//         'image': 'no.jpg'
//     },
//     success: function() { console.log('cool'); }
// });

// // const imgur = require('imgur');
//
var fs = require('fs');
const {ImgurClient} = require('imgur');
const express = require('express');
const client = new ImgurClient({
    username: process.env.Seedmapping,
    password: process.env.ZJORD321,
    clientId: process.env.b42ca0577349213,
    clientSecret: process.env.a59341ace5545722e48b5fe0bc929a33b246bf7f
});
// const client = new imgur({ clientId: env.b42ca0577349213 });

// async function uploadimage(){
//     console.log('Uploading file to Imgur..');
//     const response = await client.upload([
//         {
//             image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fknowyourmeme.com%2Fmemes%2Funo-reverse-card&psig=AOvVaw2V9cvXjro5jFAsI_afQ3I5&ust=1641846604567000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCKDkqq7BpfUCFQAAAAAdAAAAABAN',
//             title: 'Meme',
//             type: 'image',
//             description: 'this worked!'
//             // image: fs.createReadStream('/no.jpg'),
//             // type: 'stream',
//         },
//     ]);
//     console.log(response.data);
//     console.log('After function');
// }
//
// uploadimage();

const imgur = require('imgur-file-upload');
imgur.setClientId('b42ca0577349213');
var meme = require('./no.jpg');
imgur.uploadImgur(meme).then((result) => {
    console.log(result);
});
