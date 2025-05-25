'use strict';

const { Contract } = require('fabric-contract-api');

class HelloContract extends Contract {

    async put(ctx, objType, key, value) {
        const createcompositeKey = this._createCompositeKey(ctx, objType, key);
        await ctx.stub.putState(createcompositeKey, Buffer.from(value));
    }

    async get(ctx, key) {
        const value = await ctx.stub.getState(key);

        if(value && value.length > 0) {
            console.log('get', key, value.toString());
            return value.toString();
        } else  {
            throw new Error(`Key ${key} does not exist`);
        }
    }

    async delete(ctx, key) {
        const value = await ctx.stub.getState(key);
        if(!value || value.length === 0) {
            throw new Error(`Key ${key} does not exist`);
        } else {
            await ctx.stub.deleteState(key);
        }
    }

    _createCompositeKey(ctx, objType, key) {
        if(!key || key === '') {
            throw new Error('Key is required');
        }
        if(objType === '') {
            return key;
        }
    }

}

module.exports = HelloContract; 