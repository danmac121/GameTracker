import { useState } from "react";


function Stream() {
    const [stream, setStream] = useState('');
    const [toggle, setToggle] = useState(false)

    const startStream = () => {
        console.log(toggle)
        setToggle(!toggle)
    };

    return (
        <>
            <input
                type="text"
                value={stream}
                placeholder="enter your favorite streamer"
                onChange={(e) => setStream(e.target.value)}
            />
            {toggle ?   <iframe src={`https://player.kick.com/${stream}`} height="720" width="1280" frameborder="0" scrolling="no" allowfullscreen="true"></iframe> : <div className="bg-dark" height="720" width="1280"></div>}
            <button onClick={() => startStream()}>Start Stream</button>

           

            
        </>
    )

}


export default Stream