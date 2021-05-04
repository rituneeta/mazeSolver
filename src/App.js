import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const [mLocation, setMLocation] = useState(null);
  const [pLocation, setPLocation] = useState(null);

  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  const moveUp = () => {
    if (pLocation.y > 0) {
      pLocation.y--;
      setPLocation({ ...pLocation });
      incrementCounter();
      checkMushroom(pLocation);
    }
  };

  const moveDown = () => {
    if (pLocation.y < height - 1) {
      pLocation.y++;
      setPLocation({ ...pLocation });
      incrementCounter();
      checkMushroom(pLocation);
    }
  };

  const moveLeft = () => {
    if (pLocation.x > 0) {
      pLocation.x--;
      setPLocation({ ...pLocation });
      incrementCounter();
      checkMushroom(pLocation);
    }
  };
  const moveRight = () => {
    if (pLocation.x < width - 1) {
      pLocation.x++;
      setPLocation({ ...pLocation });
      incrementCounter();
      checkMushroom(pLocation);
    }
  };

  const incrementCounter = () => {
    setCount((count) => count + 1);
  };

  const checkMushroom = (pLocation) => {
    setMLocation((old) => {
      let newML = old.filter(({ x, y }) => {
        return !(pLocation.x == x && pLocation.y == y);
      });
      if (newML.length != mLocation.length) {
        return newML;
      }
      return old;
    });
  };

  useEffect(() => {
    let width = parseInt(prompt("Enter the board width"));
    let height = parseInt(prompt("Enter the board height "));

    let pl = null,
      ml = null;
    if (width && height) {
      pl = {
        x: parseInt(width / 2),
        y: parseInt(height / 2),
      };
      let val = parseInt(Math.random() * height * width);
      ml = Array.from({ length: val }, () => {
        let x = null,
          y = null;
        do {
          x = parseInt(Math.random() * width);
          y = parseInt(Math.random() * height);
        } while ((x == pl.x && y == pl.y));

        return {
          x,y
        };
      });

      setWidth(width);
      setHeight(height);
      setMLocation(ml);
      setPLocation(pl);
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (active) {
      document.onkeydown = function (e) {
        switch (e.key) {
          case "ArrowLeft":
            moveLeft();

            break;

          case "ArrowUp":
            moveUp();
            break;

          case "ArrowRight":
            moveRight();
            break;

          case "ArrowDown":
            moveDown();
            break;

          default:
            return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
      };
    } else {
      document.onkeydown = false;
    }
  }, [active]);

  useEffect(() => {
    if (mLocation && mLocation.length == 0) {
      alert(`Game over : Total moves to save princess: ${count}`);
      setActive(false)
    }
  }, [mLocation]);
  return (
    <div className="container">
      {active &&
        [...Array(height)].map((val, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {[...Array(width)].map((val, colIdx) => {
                return (
                  <div
                    className={`
             ${
               mLocation.findIndex(({ x, y }) => {
                 return x == rowIdx && y == colIdx;
               }) >= 0 && "green"
             }
             ${pLocation.x == rowIdx && pLocation.y == colIdx && "red"}

                box`}
                    key={colIdx}
                  ></div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default App;
