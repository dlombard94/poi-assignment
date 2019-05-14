'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Island API tests', function () {

    test('get islands', async function () {
        const response = await axios.get('http://dlombard:3000/api/islands');
        const islands = response.data;
        assert.equal(4, islands.length);

        assert.equal(islands[0].name, 'Lough a');
        assert.equal(islands[0].category, 'South');
        assert.equal(islands[0].area, 40000);
    });

    test('get one island', async function () {
        let response = await axios.get('http://dlombard:3000/api/islands');
        const islands = response.data;
        assert.equal(4, islands.length);

        const oneIslandUrl = 'http://dlombard:3000/api/islands/' + islands[0]._id;
        response = await axios.get(oneIslandUrl);
        const oneIsland = response.data;

        assert.equal(oneIsland.name, 'Lough a');
        assert.equal(oneIsland.category, 'South');
        assert.equal(oneIsland.area, 40000);
    });

    test('create an island', async function () {
        const islandsUrl = 'http://dlombard:3000/api/islands';
        const newIsland = {
            name: 'Test Island',
            area: 12,
            category: 'South',
            description: 'This is a test',
            // location: {
            //     longitude: 1,
            //     latitude: 2,
            // },
        };

        const response = await axios.post(islandsUrl, newIsland);
        const returnedIsland = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedIsland.name, 'Test Island');
        assert.equal(returnedIsland.area, 12);
        assert.equal(returnedIsland.category, 'South');
        assert.equal(returnedIsland.description, 'This is a test');
        // assert.equal(returnedIsland.location.longitude, 1);
        // assert.equal(returnedIsland.location.latitude, 2);

    });
});