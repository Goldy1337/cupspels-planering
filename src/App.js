import React from "react";
import CupCreator from "./components/CupCreation/CupCreator";
import ArenaContext from "./contexts/ArenaContextProvider"
import FieldContext from "./contexts/FieldContextProvider"

export default function App() {
  return (
    <div className="App">
      <ArenaContext>
        <FieldContext>
                  <CupCreator />
        </FieldContext>
      </ArenaContext>
    </div>
  );
}
