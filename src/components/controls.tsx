import { useRef } from "react";

interface controlProps {
    generate: Function;
    handleSleepChange: any;
}

const defaultSleep = 250;

function Controls(props: controlProps) {

    const test = useRef(100);

    const sleepMS = {
        current: defaultSleep
    }

    let lock = true;

    const handleOnSleepChange = (event: any) => {
        sleepMS.current = event.target.value;
    }

    const handleGenerate = () => {
        if (!lock) return;
        lock = false;
        lock = props.generate(sleepMS);
    }

    return <>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <button onClick={handleGenerate} style={{ marginTop: '1em' }}>Generate</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', }}>
                <label>Speed: </label>
                <input id='sleepMS' type='range' defaultValue={defaultSleep} min='25' max='500' onChange={handleOnSleepChange} ></input>
            </div>
        </div>
    </>
}

export default Controls;