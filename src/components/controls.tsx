import { useState } from "react";
import { clamp } from "./math-helpers";

interface controlProps {
    generate: Function;
    handleSleepChange: any;
}

const defaultSleep = 250;

// An object to control the parent WFC function
const controls = {
    delay: defaultSleep,
    lock: false,
    hide: 0
}

function Controls(props: controlProps) {
    const [delay, setDelay] = useState(defaultSleep);

    const handleOnSleepChange = (event: any) => {
        controls.delay = event.target.value;
        setDelay(event.target.value);
    }

    const handleHideChange = (event: any) => {
        controls.hide = clamp(0, 81, event.target.value);
    }

    const handleGenerate = () => {
        props.generate(controls); // return true when done
    }

    return <>
        <div style={{
            width: 'calc(100% - 2em)', maxWidth: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', backgroundColor: '#394d7d', position: 'relative', top: '2em', padding: '1em',
            borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0,0,0,0.25)'
        }}>

            <div style={{ height: '100%', marginLeft: '.75em' }}>
                <button onClick={handleGenerate} style={{}}>Generate</button>
            </div>


            <div style={{ height: '100%' }}>
                <label>Hidden squares: </label>
                <input type='number' min='0' max='81' defaultValue={0} style={{ alignSelf: 'center', fontSize: '1.2em' }} onChange={(handleHideChange)}></input>
            </div>


            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '100%', width: '40%' }}>
                <label>Delay: </label>
                <input id='sleepMS' type='range' defaultValue={defaultSleep} min='0' max='500' onChange={handleOnSleepChange} style={{ margin: '0', background: 'none' }}></input>
                <span style={{ alignSelf: 'end', textAlign: 'end' }}>{delay} ms</span>
            </div>

        </div>
    </>
}

export default Controls;