import React from "react";

interface Props {
  value: string;
  onClick: () => void;
}

const Square: React.FC<Props> = (props) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

export default Square;
