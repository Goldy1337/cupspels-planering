import React from "react";
import CupCreator from "./components/CupCreation/CupCreator";
import ArenaContext from "./contexts/ArenaContextProvider"
import FieldContext from "./contexts/FieldContextProvider"
import TeamContext from './contexts/TeamContextProvider'

export default function App() {
  return (
    <div className="App">
      <TeamContext>
        <ArenaContext>
          <FieldContext>
            <CupCreator />
          </FieldContext>
        </ArenaContext>
      </TeamContext>
    </div>
  );
}
