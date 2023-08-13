import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu, Segment, Sidebar, Image } from "semantic-ui-react";

import Homepage from "./pages/homepage";
import Transaction from "./pages/transaction";

function App() {
  return (
    <Router>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <div style={{ padding: "30px 50px" }}>
            <Image
              src="https://pokeapi.co/static/pokeapi_256.3fa72200.png"
              alt="PokéAPI"
            />
          </div>
          <Menu.Item as={Link} to="/">
            Home
          </Menu.Item>
          <Menu.Item as={Link} to="/buy">
            Buy
          </Menu.Item>
          <Menu.Item as={Link} to="/sell">
            Sell
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher>
          <Segment basic>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/buy"
                element={<Transaction type="buy" key="buy" />}
              />
              <Route
                path="/sell"
                element={<Transaction type="sell" key="sell" />}
              />
            </Routes>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Router>
  );
}

export default App;
