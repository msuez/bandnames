
const BandList = require("./band-list.model");

class Sockets {

    constructor( io ) {

        this.io = io;
        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            
            // Emit all current bands to the connected client.
            socket.emit('current-bands', this.bandList.getBands());

            // Vote a band
            socket.on('vote-band', (id) => {
                this.bandList.increaseVotes( id );
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Delete a band
            socket.on('delete-band', (id) => {
                this.bandList.removeBand( id );
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Update a band
            socket.on('update-band', ({ id, name}) => {
                this.bandList.updateBand(id, name);
                this.io.emit('current-bands', this.bandList.getBands());
            });

            // Add a band
            socket.on('add-band', ({ name }) => {
                this.bandList.addBand( name );
                this.io.emit('current-bands', this.bandList.getBands());
            });
        
        });
    }


}


module.exports = Sockets;