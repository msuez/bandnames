const Band = require("./band.model");


class BandList {

    constructor() {

        this.bands = [
            new Band('Bon Jovi'),
            new Band('Metallica'),
        ];

    }

    addBand( name ) {
        const newBand = new Band(name);
        this.bands.push( newBand );
        return this.bands;
    }

    removeBand( id ) {
        this.bands = this.bands.filter( b => b.id !== id );
    }

    getBands() {
        return this.bands;
    }

    updateBand( id, name ) {
        this.bands = this.bands.map( band => {
            if(band.id === id) {
                band.name = name;
            }
            return band;
        })
    }

    increaseVotes( id ) {
        this.bands = this.bands.map( band => {
            if(band.id === id) {
                band.votes += 1;
            }
            return band;
        })
    }


}

module.exports = BandList;