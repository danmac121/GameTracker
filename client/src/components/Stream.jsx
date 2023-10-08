import { useState } from "react";


function Stream() {
    const [stream, setStream] = useState('');
    const [toggle, setToggle] = useState(false)
    const divStyle = {
        height: '720px',
        width: '1280px',
        backgroundColor: 'lightblue', // You can add more styles as needed
      };

    //toggle stream on/off on button click
    const startStream = () => {
        console.log(toggle)
        setToggle(!toggle)
        setStream('')
    };

    return (
        <>
            {/* while toggle is false hide the player and show a placeholder div height/width are hardcoded but can be changed to variable size */}
            {toggle ?   <iframe src={`https://player.kick.com/${stream}`} height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="true"></iframe> : <div style={divStyle}></div>}
            <br />
            <input
                type="text"
                value={stream}
                placeholder="enter your favorite streamer"
                onChange={(e) => setStream(e.target.value)}
            />
            <button onClick={() => startStream()}>{toggle ? "Change Streamer" : "Start Stream"} </button>
        </>
    )

}


export default Stream