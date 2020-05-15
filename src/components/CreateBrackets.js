import React from "react";
import Brackets from "./Brackets";

let teamList = [
  {
    name: "Team 1",
    klubb: "1",
  },
  {
    name: "Team 2",
    klubb: "1",
  },
  {
    name: "Team 3",
    klubb: "2",
  },
  {
    name: "Team 4",
    klubb: "3",
  },
  {
    name: "Team 5",
    klubb: "4",
  },
  {
    name: "Team 6",
    klubb: "5",
  },
  {
    name: "Team 7",
    klubb: "6",
  },
  {
    name: "Team 8",
    klubb: "6",
  },
  {
    name: "Team B",
    klubb: "6",
  },
  {
    name: "Team A",
    klubb: "6",
  },
  {
    name: "Team C",
    klubb: "6",
  },
];

export default function BracketCreator() {
  //#region Variables
  const groupSize = 2;

  const width = 65;
  const height = 26;

  const x = 20;
  const y = 20;
  const deltaY = 10;
  const deltaX = 100;
  //#endregion

  //#region BACKEND Functions
  const swap = (array, i, j) => {
    [array[i], array[j]] = [array[j], array[i]];
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      swap(array, i, j);
    }
    return array;
  };

  const createMatch = (matchList) => {
    let result = [];
    for (let i = 0; i < matchList.length; i += 2) {
      if (i >= matchList.length - 1) {
        result.push({
          teams: [matchList[i]],
          field: { fält: "fältet" },
        });
        break;
      }

      if (matchList[i].klubb === matchList[i + 1].klubb) {
        swap(matchList, i, matchList.length - 1);
      }

      const teams = matchList.slice(i, i + 2);
      //Add everything needed for a match
      const field = { fält: "fält" };

      result.push({
        teams: teams,
        field: field,
        score: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
      });
    }
    console.log(result);
    return result;
  };
  //#endregion

  //#region Helper Functions
  const getWinner = (item) => {
    if (item.teams.length === 1) return { name: item.teams[0].name };

    if (item.score[0] < item.score[1]) {
      return { name: item.teams[1].name };
    } else {
      return { name: item.teams[0].name };
    }
  };

  const getNewMatchup = (winners, i) => {
    if (i + 1 < winners.length) return [winners[i], winners[i + 1]];
    else return [winners[i]];
  };

  const getNewScores = (winners, i) => {
    if (i + 1 < winners.length)
      return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    else return ["-"];
  };
  //#endregion

  //#region BUILDERS
  const createBrackets = (items) => {
    const winners = [];
    const leftYs = [];
    const leftBrackets = items.map((item, i) => {
      const bracketY = y + (height * groupSize + deltaY) * i;
      leftYs.push(bracketY);

      winners.push(getWinner(item));

      return (
        <Brackets
          matchInfo={item}
          winner={getWinner(item).name === item.teams[0].name ? 0 : 1}
          x={x}
          y={bracketY}
          height={height}
          width={width}
        />
      );
    });

    return buildBracketTree(leftBrackets, leftYs, winners, x + width + deltaX);
  };

  const buildBracketTree = (m, y, winners, x) => {
    if (m.length <= 1) {
      return m;
    }

    const m1 = [];
    const y1 = [];
    const w1 = [];

    const h = height * groupSize;

    const getNextY = (m, y, i, h) => {
      if (i === m.length - 1) {
        return y[i];
      }

      const a = y[i] + h;
      const b = y[i + 1];

      return (a + b) / 2 - h / 2;
    };

    for (let i = 0; i < m.length; i += 2) {
      const nextMatchInfo = {
        teams: getNewMatchup(winners, i),
        score: getNewScores(winners, i),
      };

      const currentY = getNextY(m, y, i, h);

      w1.push(getWinner(nextMatchInfo));
      y1.push(currentY);
      m1.push(
        <Brackets
          matchInfo={nextMatchInfo}
          winner={nextMatchInfo.score[1] > nextMatchInfo.score[0] ? 1 : 0}
          x={x}
          y={currentY}
          height={height}
          width={width}
          first={m[i]}
          second={i + 1 < m.length ? m[i + 1] : m[i]}
          groupSize={groupSize}
        ></Brackets>
      );
    }
    return buildBracketTree(m1, y1, w1, x + width + deltaX);
  };
  //#endregion

  return <div>{createBrackets(createMatch(shuffleArray(teamList)))}</div>;
}
