interface controlProps {
    generate: Function;
    handleSleepChange: any;
}

const defaultSleep = 250;

function Controls(props: controlProps) {
    const controls = {
        delay: defaultSleep,
        lock: false
    }

    const handleOnSleepChange = (event: any) => {
        controls.delay = event.target.value;
    }


    const handleGenerate = () => {
        props.generate(controls); // return true when done
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