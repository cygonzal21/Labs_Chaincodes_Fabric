'use strict';

const { Contract } = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');

class HelloContract extends Contract {
    async InitLedger(ctx) {
        const assets = [
            {
                ID: '001',
                Make: 'Toyota',
                Model: 'Corolla',
                Color: 'blue',
                Year: 2015,
                Owner: 'Tomoko',
                Price: 15000,
            },
            {
                ID: '002',
                Make: 'Honda',
                Model: 'Civic',
                Color: 'red',
                Year: 2018,
                Owner: 'Brad',
                Price: 18000,
            },
            {
                ID: '003',
                Make: 'Ford',
                Model: 'Focus',
                Color: 'green',
                Year: 2017,
                Owner: 'Jin Soo',
                Price: 17000,
            },
            {
                ID: '004',
                Make: 'Chevrolet',
                Model: 'Malibu',
                Color: 'yellow',
                Year: 2016,
                Owner: 'Max',
                Price: 16000,
            },
            {
                ID: '005',
                Make: 'BMW',
                Model: 'X5',
                Color: 'black',
                Year: 2020,
                Owner: 'Adriana',
                Price: 50000,
            },
            {
                ID: '006',
                Make: 'Tesla',
                Model: 'Model 3',
                Color: 'white',
                Year: 2021,
                Owner: 'Michel',
                Price: 60000,
            },
            {
                ID: '007',
                Make: 'Nissan',
                Model: 'Altima',
                Color: 'gray',
                Year: 2019,
                Owner: 'Alice',
                Price: 22000,
            },
            {
                ID: '008',
                Make: 'Hyundai',
                Model: 'Elantra',
                Color: 'silver',
                Year: 2018,
                Owner: 'Bob',
                Price: 18000,
            },
            {
                ID: '009',
                Make: 'Kia',
                Model: 'Sorento',
                Color: 'brown',
                Year: 2020,
                Owner: 'Charlie',
                Price: 25000,
            },
            {
                ID: '010',
                Make: 'Volkswagen',
                Model: 'Jetta',
                Color: 'blue',
                Year: 2017,
                Owner: 'Diana',
                Price: 17000,
            },
            {
                ID: '011',
                Make: 'Subaru',
                Model: 'Outback',
                Color: 'green',
                Year: 2021,
                Owner: 'Eve',
                Price: 32000,
            },
            {
                ID: '012',
                Make: 'Mazda',
                Model: 'CX-5',
                Color: 'red',
                Year: 2022,
                Owner: 'Frank',
                Price: 35000,
            },
        ];

        for (const asset of assets) {
            asset.ObType = 'car';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    async put(ctx, objType, key, value) {
        const createCompositeKey = this._createCompositeKey(ctx, objType, key);
        await ctx.stub.putState(createCompositeKey, Buffer.from(value));
    }

    async get(ctx, objType, key) {
        const compositeKey = this._createCompositeKey(ctx, objType, key);

        const value = await ctx.stub.getState(compositeKey);
        if (value && value.length > 0) {
            return value.toString();
        } else {
            throw new Error(`❌ Error: The asset '${key}' does not exist.`);
        }
    }

    async getAll(ctx) {
        const allResults = [];
        const iterator = ctx.stub.getStateByRange('', '');
        for await (const res of iterator) {
            allResults.push({
                Key: res.key,
                Record: JSON.parse(res.value.toString('utf8')),
            });
        }
        return JSON.stringify(allResults, null, 2);
    }
    

    async getByRange(ctx, startKey, endKey) {
        const allResults = [];
        const iterator = ctx.stub.getStateByRange(startKey, endKey);
        for await (const res of iterator) {
            allResults.push({
                Key: res.key,
                Record: JSON.parse(res.value.toString('utf8')),
            });
        }
        return JSON.stringify(allResults, null, 2);
    }

    async getByType(ctx, objType){
        const iterator = ctx.stub.getStateByPartialCompositeKey(objType, []);

        const allResults = [];

        for await (const res of iterator) {
            const splitKey = ctx.stub.splitCompositeKey(res.key);

            allResults.push({
                objType: splitKey.objectType,
                key: splitKey.attributes[0],
                Record: JSON.parse(res.value.toString('utf8')),
            })
        }

        return JSON.stringify(allResults, null, 2);
    }


    async delete(ctx, objType, key) {
        const compositeKey = this._createCompositeKey(ctx, objType, key);
        await ctx.stub.deleteState(compositeKey);
    } 

    _createCompositeKey(ctx, objType, key) {
        if(!key || key === '') {
            throw new Error('❌ Error: The key is empty.');
        }
        if(objType === ""){
            return key;
        }

        return ctx.stub.createCompositeKey(objType, [key]);
    }
}

module.exports = HelloContract;