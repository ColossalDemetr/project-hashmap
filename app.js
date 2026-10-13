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

};
