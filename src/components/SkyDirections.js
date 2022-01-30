function SkyDirections(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="172.178"
        height="172.178"
        version="1.1"
        viewBox="0 0 45.556 45.556"
      >
        <g
          fillOpacity="1"
          stroke="#000"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeWidth="0.5"
          transform="translate(-39.91 -20.771)"
        >
          <path
            onClick = {() => {props.handleClick("N")}}
            fill="#ccc"
            d="M62.688 21.021a22.528 22.528 0 00-15.92 6.608l9.268 9.268a9.413 9.413 0 016.652-2.76 9.413 9.413 0 016.652 2.76l9.268-9.268a22.528 22.528 0 00-15.92-6.608z"
          ></path>
          <path
            onClick = {() => {props.handleClick("S")}}
            fill="#ccc"
            d="M62.688 66.077a22.528 22.528 0 01-15.92-6.608l9.268-9.268a9.413 9.413 0 006.652 2.761 9.413 9.413 0 006.652-2.761l9.268 9.268a22.528 22.528 0 01-15.92 6.608z"
          ></path>
          <path
            onClick = {() => {props.handleClick("W")}}
            fill="#ccc"
            d="M85.216 43.55a22.528 22.528 0 00-6.608-15.92l-9.268 9.267a9.413 9.413 0 012.761 6.652 9.413 9.413 0 01-2.761 6.652l9.268 9.268a22.528 22.528 0 006.608-15.92z"
          ></path>
          <path
            onClick = {() => {props.handleClick("E")}}
            fill="#ccc"
            d="M40.16 43.55a22.528 22.528 0 006.608 15.92l9.268-9.269a9.413 9.413 0 01-2.76-6.652 9.413 9.413 0 012.76-6.652l-9.268-9.268a22.528 22.528 0 00-6.608 15.92z"
          ></path>
          <circle
            onClick = {() => {props.handleClick("Z")}}
            cx="62.688" cy="43.549" r="9.413" fill="#ff0"
          ></circle>
        </g>
      </svg>
    );
  }

  export default SkyDirections;