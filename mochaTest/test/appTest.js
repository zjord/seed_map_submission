const assert = require('chai').assert;
const app = require('../app');
const creds = require('./client_secret.json');

//Results
colourValid1 = app.colourValid("red321");
colourValid2 = app.colourValid("lightgoldenredyellow");
colourValid3 = app.colourValid("yellow");
colourValid4 = app.colourValid("yellow236918736289328932718937216");

missingval1 = app.missingval(12.4345,12.3443,'sdfkklvds','14:32','red','01.15.2022' );
missingval2 = app.missingval(53.3243,'','sdfkklvds','','red','01.15.2022' );
missingval3 = app.missingval(49.34345,'','','14:32','red','' );
missingval4 = app.missingval('',12.3443,'','14:32','','' );
missingval5 = app.missingval('','','','','','' );

coordsValid1 = app.coordsValid(13.23435,15.65434);
coordsValid2 = app.coordsValid('a',15.65434);
coordsValid3 = app.coordsValid(13.23435,'sac');
coordsValid4 = app.coordsValid('a','b');
coordsValid5 = app.coordsValid('an13N', 'abcde' );

accessSpreadsheet1 = app.accessSpreadsheet(
    {
        col: 'red',
        lat: 12.4335,
        lon: 34.3454,
        time: '12:31',
        date: '15.01.2022',
        temp: 32,
        hum: 89,
        autoloc: 'Auto',
        imgurl: 'urlforthis'
    }, creds)
accessSpreadsheet2 = app.accessSpreadsheet(
    {
        col: 'red',
        lat: 12.4335,
        lon: 34.3454,
        time: '12:31',
        date: '15.01.2022',
        temp: 32,
        hum: 89,
        autoloc: 'Auto',
        imgurl: 'urlforthis'
    }, 'beepboopsalkdasklc_WHATareYouDoingHereMrHolloway_maslkasclkascsdfsd')


describe('App', function(){

    describe('colourValid', function(){
        it('colourValid should return false', function(){
            assert.equal(colourValid1, false);
        } );

        it('colourValid should return false', function(){
            assert.equal(colourValid2,false);
        });
        it('colourValid should return true', function(){
            assert.equal(colourValid3,true);
        });
        it('colourValid should return false', function(){
            assert.equal(colourValid4,false);
        });
    })

    describe('missingval', function(){
        it('missingval should return false', function(){
            assert.equal(missingval1, false);
        });

        it('missingval should return true', function(){
            assert.equal(missingval2,true);
        });
        it('missingval should return true', function(){
            assert.equal(missingval3,true);
        });
        it('missingval should return true', function(){
            assert.equal(missingval4,true);
        });
        it('missingval should return true', function(){
            assert.equal(missingval5,true);
        });

    })

    describe('coordsValid', function(){
        it('coordsValid should return true', function(){
            assert.equal(coordsValid1, true);
        });

        it('coordsValid should return false', function(){
            assert.equal(coordsValid2, false);
        });
        it('coordsValid should return false', function(){
            assert.equal(coordsValid3, false);
        });
        it('coordsValid should return false', function(){
            assert.equal(coordsValid4, false);
        });
        it('coordsValid should return false', function(){
            assert.equal(coordsValid5, false);
        });

    })

    describe('accessSpreadsheet', function(){
        it('accessSpreadsheet should return 1', async function(){
            const result = await (accessSpreadsheet1);
            assert.equal(result, 1);
        });
        it('accessSpreadsheet should return 0', async function(){
            const result = await (accessSpreadsheet2);
            assert.equal(result, 0);
        });


    })


})