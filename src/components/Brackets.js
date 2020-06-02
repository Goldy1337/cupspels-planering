import React, { useState, cloneElement, useEffect } from "react";

const Team = (props) => {
  const [size, setSize] = useState({
    width: props.width,
    height: props.height,
    x: props.x,
    y: props.y,
    winner: props.winner,
    groupSize: props.groupSize || 2,
    matchInfo: props.matchInfo,
  });

  const updateSize = (updates) => {
    setSize({
      ...size,
      ...updates,
    });
  };

  const getTeamName = (matchInfo, i) => {
    console.log(matchInfo)
    if (
      matchInfo &&
      matchInfo.teams &&
      matchInfo.teams.length > i &&
      matchInfo.teams[i].name
    ) {
      return matchInfo.teams[i].name;
    } else {
      return "---";
    }
  };

  const getTeamScore = (matchInfo, i) => {
    if (
      matchInfo &&
      matchInfo.score &&
      matchInfo.score.length > i &&
      matchInfo.score[i] !== undefined
    ) {
      return matchInfo.score[i];
    } else {
      return "-";
    }
  };

  const createBrackets = () => {
    console.log(size.matchInfo);
    
    let items = [];
    for (let i = 0; i < size.groupSize; ++i) {
      items.push(
        <>
          <div
            style={{
              borderRadius:
                i === 0
                  ? `10px 0px 0px 0px`
                  : i === size.groupSize - 1
                  ? `0px 0px 0px 10px`
                  : "0px 0px 0px 0px",
              position: "absolute",
              width: size.width,
              height: size.height,
              top: size.y + i * size.height,
              left: size.x,
              backgroundColor: "#f8f8f8",
              transition: "all .2s ease-in-out",
              opacity: 0.78,
              textAlign: "center",
              "-moz-box-shadow": "inset 0 0 4px #000000",
              "-webkit-box-shadow": "inset 0 0 4px #000000",
              boxShadow: "inset 0 1px 4px 2b2b28  ",
              color: "2b2b28",
            }}
          >
            {getTeamName(size.matchInfo, i)}
          </div>
          <div
            style={{
              borderRadius:
                i === 0
                  ? `0px 10px 0px 0px`
                  : i === size.groupSize - 1
                  ? `0px 0px 10px 0px`
                  : "0px 0px 0px 0px",
              position: "absolute",
              width: 25,
              height: size.height,
              top: size.y + i * size.height,
              left: size.width + size.x,
              backgroundColor: size.winner === i ? "#8cba51" : "#dddddd",
              textAlign: "center",
              opacity: 1,
              "-moz-box-shadow": "inset 0 0 4px #000000",
              "-webkit-box-shadow": "inset 0 0 4px #000000",
              boxShadow: "inset 0 0 4px 2b2b28",
              color: "2b2b28",
            }}
          >
            {getTeamScore(size.matchInfo, i)}
          </div>
        </>
      );
    }

    return items;
  };

  useEffect(() => {
    createBrackets();
  });

  const ttt = (el, p) => {
    if (el) {
      return cloneElement(el, p);
    }
  };

  return (
    <div>
      {/* <div
        className="bb"
        style={{
          borderRadius: "15px 0px 0px 0px",
          position: "absolute",
          width: size.width,
          height: size.height,
          top: size.y,
          left: size.x,
          backgroundColor: "black",
          transition: "all .2s ease-in-out",
          opacity: 0.78,
          textAlign: "center",
        }}
      >
        <p style={{ color: "white" }}>Team 1</p>
      </div> */}

      {createBrackets()}

      {/* <div
        style={{
          borderRadius: "0px 25px 25px 0px",
          position: "absolute",
          width: 20,
          height: size.height,
          top: size.y,
          left: size.width + size.x,
          backgroundColor: size.winner ? "orange" : "gray",
          textAlign: "center",
          opacity: 0.8,
          "-moz-box-shadow": "inset 0 0 4px #000000",
          "-webkit-box-shadow": "inset 0 0 4px #000000",
          boxShadow: "inset 0 0 4px #000000",
        }}
      > */}
      {/* <p
          style={{
            color: "white",
          }}
        >
          0
        </p>
      </div> */}
      {props.parentX ? (
        <svg
          style={{ position: "absolute", zIndex: -123, top: 0 }}
          height="5000"
          width="5000"
        >
          <line
            style={{ position: "absolute", stroke: "1b1b2f", strokeWidth: 2 }}
            x1={size.x + size.width + 25}
            y1={size.y + (size.height * size.groupSize) / 2}
            x2={props.parentX}
            y2={props.parentY + (size.height * size.groupSize) / 2}
          />
          {/* <line x1="1" y1="22" x2="1" y2="1"></line>
        <line x1="1" y1="22" x2="1" y2="1"></line>
        <line x1="1" y1="22" x2="1" y2="1"></line> */}
        </svg>
      ) : (
        <div />
      )}
      {ttt(props.first, {
        parentX: size.x,
        parentY: size.y,
      })}
      {ttt(props.second, {
        parentX: size.x,
        parentY: size.y,
      })}
    </div>
  );
};

// class Cup {
//   constructor(teamList) {
//     this.teamList = teamList;
//   }

//   createBracket = () => {
//     return (
//       <>
//         <div
//           style={{
//             width: 60,
//             height: 20,
//             top: 0,
//             backgroundColor: "dimgray",
//           }}
//           ref={(el) => {
//             if (!el) return;
//             console.log(el.getBoundingClientRect());
//           }}
//         ></div>
//       </>
//     );
//   };

//   swap = (array, i, j) => {
//     [array[i], array[j]] = [array[j], array[i]];
//   };

//   shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       this.swap(array, i, j);
//     }
//   };

//   generateMatches = (array) => {
//     let result = [];
//     for (let i = 0; i < array.length; i += 2) {
//       if (i === array.length - 1) {
//         result.push([array[i], {}, { fält: "fältet" }]);
//         break;
//       }

//       if (array[i].klubb === array[i + 1].klubb) {
//         //TODO Create more sofisitcated tools for avoiding collisions.
//         this.swap(array, i, array.length - 1);
//       }

//       const teams = array.slice(i, i + 2);
//       //Add everything needed for a match
//       teams.push({ fält: "fält" });
//       result.push(teams);
//     }
//   };
// }

// class Team {
//   constructor(team, score) {
//     this.team = team;
//     this.score = score;
//   }

//   render = () => {

//   testLog = () => {
//     console.log(this.nameBoundires);
//   };
// }

// function useResize(myRef) {
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       console.log(myRef)
//       setWidth(myRef.current.offsetWidth);
//       setHeight(myRef.current.offsetHeight);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [myRef]);

//   return { width, height };
//   // const [size, setSize] = useState({
//   //   width: 0,
//   //   height: 0
//   // })

//   //   const updateSize = updates => {
//   //     setSize({
//   //       ...size,
//   //       ...updates,
//   //     });
//   //   };
// }

// export { Cup, Team };

export default Team;
