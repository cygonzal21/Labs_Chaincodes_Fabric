'use strict';

const { Contract } = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');

class HelloContract extends Contract {
    async InitLedger(ctx) {
        const assets = [
           {
                ID: '000',
                Make: 'Toyota',
                Model: 'Corolla',
                Color: 'white',
                Year: 2018,
                Owner: 'Alice',
                Price: 18000,
            },
            {
                ID: '001',
                Make: 'Honda',
                Model: 'Civic',
                Color: 'blue',
                Year: 2019,
                Owner: 'Bob',
                Price: 20000,
            },
            {
                ID: '002',
                Make: 'Ford',
                Model: 'Focus',
                Color: 'black',
                Year: 2020,
                Owner: 'Charlie',
                Price: 22000,
            },
            {
                ID: '003',
                Make: 'Chevrolet',
                Model: 'Malibu',
                Color: 'silver',
                Year: 2018,
                Owner: 'Diana',
                Price: 19500,
            },
            {
                ID: '004',
                Make: 'Hyundai',
                Model: 'Elantra',
                Color: 'gray',
                Year: 2021,
                Owner: 'Ethan',
                Price: 21000,
            },
            {
                ID: '005',
                Make: 'Volkswagen',
                Model: 'Jetta',
                Color: 'red',
                Year: 2017,
                Owner: 'Fiona',
                Price: 17000,
            },
            {
                ID: '006',
                Make: 'Nissan',
                Model: 'Altima',
                Color: 'blue',
                Year: 2019,
                Owner: 'George',
                Price: 19000,
            },
            {
                ID: '007',
                Make: 'Kia',
                Model: 'Optima',
                Color: 'white',
                Year: 2020,
                Owner: 'Hannah',
                Price: 20500,
            },
            {
                ID: '008',
                Make: 'Subaru',
                Model: 'Impreza',
                Color: 'green',
                Year: 2021,
                Owner: 'Ian',
                Price: 23000,
            },
            {
                ID: '009',
                Make: 'Tesla',
                Model: 'Model 3',
                Color: 'black',
                Year: 2022,
                Owner: 'Julia',
                Price: 42000,
            },
            {
                ID: '010',
                Make: 'BMW',
                Model: 'X1',
                Color: 'white',
                Year: 2021,
                Owner: 'Kevin',
                Price: 38000,
            },
            {
                ID: '011',
                Make: 'Audi',
                Model: 'Q3',
                Color: 'gray',
                Year: 2022,
                Owner: 'Laura',
                Price: 39000,
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
            {
                ID: '013',
                Make: 'Mazda',
                Model: 'Mazda3',
                Color: 'red',
                Year: 2021,
                Owner: 'Alice',
                Price: 22000,
            },
            {
                ID: '014',
                Make: 'Mazda',
                Model: 'MX-5 Miata',
                Color: 'red',
                Year: 2023,
                Owner: 'Bob',
                Price: 28000,
            },
            {
                ID: '015',
                Make: 'Mazda',
                Model: 'CX-30',
                Color: 'blue',
                Year: 2022,
                Owner: 'Liam',
                Price: 27000,
            },
            {
                ID: '016',
                Make: 'Mazda',
                Model: 'CX-9',
                Color: 'red',
                Year: 2021,
                Owner: 'George',
                Price: 38000,
            },
            {
                ID: '017',
                Make: 'Toyota',
                Model: 'Corolla',
                Color: 'red',
                Year: 2020,
                Owner: 'Carol',
                Price: 19000,
            },
            {
                ID: '018',
                Make: 'Toyota',
                Model: 'Camry',
                Color: 'white',
                Year: 2021,
                Owner: 'Anna',
                Price: 25000,
            },
            {
                ID: '019',
                Make: 'Toyota',
                Model: 'RAV4',
                Color: 'red',
                Year: 2022,
                Owner: 'Dan',
                Price: 32000,
            },
            {
                ID: '020',
                Make: 'Toyota',
                Model: 'Yaris',
                Color: 'black',
                Year: 2020,
                Owner: 'Tom',
                Price: 17000,
            },
            {
                ID: '021',
                Make: 'Ford',
                Model: 'Focus',
                Color: 'blue',
                Year: 2021,
                Owner: 'Nina',
                Price: 21000,
            },
            {
                ID: '022',
                Make: 'Ford',
                Model: 'Escape',
                Color: 'red',
                Year: 2023,
                Owner: 'Alex',
                Price: 33000,
            },
            {
                ID: '023',
                Make: 'Ford',
                Model: 'F-150',
                Color: 'black',
                Year: 2020,
                Owner: 'Jake',
                Price: 40000,
            },
            {
                ID: '024',
                Make: 'Ford',
                Model: 'Mustang',
                Color: 'red',
                Year: 2022,
                Owner: 'Sophia',
                Price: 45000,
            },
            {
                ID: '025',
                Make: 'Ford',
                Model: 'Explorer',
                Color: 'white',
                Year: 2021,
                Owner: 'Henry',
                Price: 39000,
            },
            {
                ID: '026',
                Make: 'Honda',
                Model: 'Civic',
                Color: 'red',
                Year: 2020,
                Owner: 'Leo',
                Price: 21000,
            },
            {
                ID: '027',
                Make: 'Honda',
                Model: 'Accord',
                Color: 'silver',
                Year: 2022,
                Owner: 'Maya',
                Price: 27000,
            },
            {
                ID: '028',
                Make: 'Honda',
                Model: 'CR-V',
                Color: 'red',
                Year: 2021,
                Owner: 'Isaac',
                Price: 31000,
            },
            {
                ID: '029',
                Make: 'Honda',
                Model: 'Fit',
                Color: 'blue',
                Year: 2020,
                Owner: 'Olivia',
                Price: 16000,
            },
            {
                ID: '030',
                Make: 'Nissan',
                Model: 'Altima',
                Color: 'red',
                Year: 2023,
                Owner: 'Zara',
                Price: 29000,
            },
            {
                ID: '031',
                Make: 'Nissan',
                Model: 'Rogue',
                Color: 'white',
                Year: 2022,
                Owner: 'Victor',
                Price: 31000,
            },
            {
                ID: '032',
                Make: 'Nissan',
                Model: 'Sentra',
                Color: 'red',
                Year: 2020,
                Owner: 'Eva',
                Price: 20000,
            },
            {
                ID: '033',
                Make: 'Nissan',
                Model: 'Murano',
                Color: 'black',
                Year: 2021,
                Owner: 'Ben',
                Price: 33000,
            },
            {
                ID: '034',
                Make: 'Chevrolet',
                Model: 'Malibu',
                Color: 'red',
                Year: 2022,
                Owner: 'Rachel',
                Price: 26000,
            },
            {
                ID: '035',
                Make: 'Chevrolet',
                Model: 'Equinox',
                Color: 'blue',
                Year: 2020,
                Owner: 'Sam',
                Price: 29000,
            },
            {
                ID: '036',
                Make: 'Chevrolet',
                Model: 'Tahoe',
                Color: 'black',
                Year: 2021,
                Owner: 'Ella',
                Price: 50000,
            },
            {
                ID: '037',
                Make: 'Chevrolet',
                Model: 'Bolt',
                Color: 'red',
                Year: 2023,
                Owner: 'Noah',
                Price: 30000,
            },
            {
                ID: '038',
                Make: 'Hyundai',
                Model: 'Elantra',
                Color: 'white',
                Year: 2022,
                Owner: 'Tina',
                Price: 22000,
            },
            {
                ID: '039',
                Make: 'Hyundai',
                Model: 'Tucson',
                Color: 'red',
                Year: 2021,
                Owner: 'Chris',
                Price: 28000,
            },
            {
                ID: '040',
                Make: 'Hyundai',
                Model: 'Kona',
                Color: 'black',
                Year: 2020,
                Owner: 'Derek',
                Price: 24000,
            },
            {
                ID: '041',
                Make: 'Kia',
                Model: 'Soul',
                Color: 'red',
                Year: 2020,
                Owner: 'Molly',
                Price: 20000,
            },
            {
                ID: '042',
                Make: 'Kia',
                Model: 'Sportage',
                Color: 'blue',
                Year: 2021,
                Owner: 'Brian',
                Price: 26000,
            },
            {
                ID: '043',
                Make: 'Kia',
                Model: 'Sorento',
                Color: 'red',
                Year: 2023,
                Owner: 'Nora',
                Price: 33000,
            },
            {
                ID: '044',
                Make: 'Volkswagen',
                Model: 'Golf',
                Color: 'red',
                Year: 2021,
                Owner: 'Lara',
                Price: 24000,
            },
            {
                ID: '045',
                Make: 'Volkswagen',
                Model: 'Passat',
                Color: 'white',
                Year: 2022,
                Owner: 'Finn',
                Price: 27000,
            },
            {
                ID: '046',
                Make: 'Volkswagen',
                Model: 'Tiguan',
                Color: 'red',
                Year: 2023,
                Owner: 'Ivy',
                Price: 35000,
            },
            {
                ID: '047',
                Make: 'Mazda',
                Model: 'Mazda6',
                Color: 'red',
                Year: 2021,
                Owner: 'Alan',
                Price: 25000,
            },
            {
                ID: '048',
                Make: 'Mazda',
                Model: 'CX-50',
                Color: 'red',
                Year: 2023,
                Owner: 'Jill',
                Price: 36000,
            },
            {
                ID: '049',
                Make: 'Mazda',
                Model: 'CX-3',
                Color: 'gray',
                Year: 2020,
                Owner: 'Omar',
                Price: 23000,
            },
            {
                ID: '050',
                Make: 'Mazda',
                Model: 'MX-30',
                Color: 'white',
                Year: 2022,
                Owner: 'Diana',
                Price: 31000,
            },
            {
                ID: '051',
                Make: 'Mazda',
                Model: 'CX-90',
                Color: 'red',
                Year: 2023,
                Owner: 'Steve',
                Price: 42000,
            },
            {
                ID: '052',
                Make: 'Subaru',
                Model: 'Outback',
                Color: 'green',
                Year: 2021,
                Owner: 'Rita',
                Price: 31000,
            },
            {
                ID: '053',
                Make: 'Subaru',
                Model: 'Forester',
                Color: 'red',
                Year: 2022,
                Owner: 'Jorge',
                Price: 32000,
            },
            {
                ID: '054',
                Make: 'Subaru',
                Model: 'Impreza',
                Color: 'blue',
                Year: 2020,
                Owner: 'Carla',
                Price: 21000,
            },
            {
                ID: '055',
                Make: 'Tesla',
                Model: 'Model 3',
                Color: 'red',
                Year: 2023,
                Owner: 'Rob',
                Price: 48000,
            },
            {
                ID: '056',
                Make: 'Tesla',
                Model: 'Model Y',
                Color: 'white',
                Year: 2022,
                Owner: 'Megan',
                Price: 52000,
            },
            {
                ID: '057',
                Make: 'Tesla',
                Model: 'Model S',
                Color: 'black',
                Year: 2021,
                Owner: 'Gabe',
                Price: 75000,
            },
            {
                ID: '058',
                Make: 'Tesla',
                Model: 'Model X',
                Color: 'red',
                Year: 2023,
                Owner: 'Sophie',
                Price: 90000,
            },
            {
                ID: '059',
                Make: 'Jeep',
                Model: 'Cherokee',
                Color: 'red',
                Year: 2021,
                Owner: 'Peter',
                Price: 37000,
            },
            {
                ID: '060',
                Make: 'Jeep',
                Model: 'Compass',
                Color: 'gray',
                Year: 2022,
                Owner: 'Angela',
                Price: 33000,
            },
            {
                ID: '061',
                Make: 'Mazda',
                Model: 'CX-70',
                Color: 'red',
                Year: 2024,
                Owner: 'Luis',
                Price: 43000,
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

    async QueryAssets(ctx, queryString) {
        const queryResults = await ctx.stub.getQueryResult(queryString);
        const allResults = [];
        for await (const res of queryResults) {
            allResults.push({
                Key: res.key,
                Record: JSON.parse(res.value.toString('utf8')),
            });
        }
        return JSON.stringify(allResults, null, 2);
    }

    async GetAssetHistory(ctx, key) {
        const historyResults = [];
        const iterator = await ctx.stub.getHistoryForKey(key);
        for await (const res of iterator) {
            historyResults.push({
                key: res.key,
                TxId: res.txId,
                Timestamp: res.timestamp,
                IsDelete: res.isDelete,
                Record: JSON.parse(res.value.toString('utf8')),
            });
        }
        return JSON.stringify(historyResults, null, 2);
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