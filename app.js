class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity).fill(null);
    };


    hash(key) {

        let hashValue = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashValue = primeNumber * hashValue + key.charCodeAt(i);
        };

        return hashValue % this.capacity;

    };
    

    length() {

        let i = 0;

        for (const bucket of this.buckets) {
            if (bucket !== null) {
                i += bucket.length;
            }
        };

        return i;

    };

    set(key, value) {
        const index = this.hash(key);

        if (this.buckets[index] === null) {
            this.buckets[index] = [{ key, value }];
        } else {
            const existing = this.buckets[index].find(item => item.key === key);
            if (existing) {
                existing.value = value;
            } else {
                this.buckets[index].push({ key, value });
            };
        };

        // —————————————————————————

        if (this.length() / this.capacity > this.loadFactor) {

            const oldBuckets = this.buckets;

            this.capacity *= 2;

            this.buckets = new Array(this.capacity).fill(null);

            for (const bucket of oldBuckets) {
                if (bucket !== null) {
                    for (const item of bucket) {
                        this.set(item.key, item.value);
                    };
                };
            };
        };
    };

    get(key) {

        const index = this.hash(key);
        const existing = this.buckets[index].find(item => item.key === key);


        if (existing) {
            return existing.value;
        } else undefined;

        return;
    };

    has(key) {
        const index = this.hash(key);

        if (this.buckets[index] === null) {
            return false;
        } else {
            const existing = this.buckets[index].find(item => item.key === key);

            if (existing) {
                return true;
            } else return false;
        }
        
    };

    remove(key) {
        const index = this.hash(key);
        

        if (this.buckets[index] === null) return false;
        
        const existing = this.buckets[index].find(item => item.key === key);

            if(existing) {
                const findI = this.buckets[index].findIndex(item => item.key === key);
                const spliced = this.buckets[index].splice(findI, 1);
                if (this.buckets[index].length === 0) {this.buckets[index] = null; return true;};
            };

            return false;

    };

    keys() {
        let keys = [];

        for (const bucket of this.buckets) {
            if (bucket !== null) {
                for (const item of bucket) {
                    keys.push(item.key);
                };
            };  
        };
        return keys;
        
    };

    values() {
        let values = [];

        for (const bucket of this.buckets) {
            if (bucket !== null) {
                for (const item of bucket) {
                    values.push(item.value);
                };
            };  
        };
        return values;
        
    
    };

};


export {HashMap};