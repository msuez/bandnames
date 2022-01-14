import { useContext } from "react";

import { SocketContext } from "../contexts/SocketContext";

import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import { BandsChart } from "../components/BandsChart";

function HomePage() {

  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status: 
          {
            online ?
              <span className="text-success">Online</span>
            :
              <span className="text-danger">Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <div className="row">
        <div className="col-12">
          <BandsChart />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>

    </div>
  );
}

export default HomePage;
