// import { state } from './script.js'

window.addEventListener('keydown', e=> {
    if (e.key == 'q' && state == 1) {
        console.log(state)
        console.log(mpSdk)
    }
})

let mpSdk;
showcase.addEventListener('load', async function() {
    try {
        mpSdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
    }
    catch(e) {
        console.error(e);
        return;
    }

    onShowcaseConnect(mpSdk);
    console.log('Hello Bundle SDK', mpSdk);
});

async function onShowcaseConnect(mpSdk) {

    await mpSdk.App.state.waitUntil((appState) => appState.phase == 'appphase.playing');
    mpSdk.Room.data.subscribe({
    onAdded: async function(index, item, collection) {
        console.log (item.center);
        console.log(item.size)
        const source = await Promise.all([
        mpSdk.Sensor.createSource(mpSdk.Sensor.SourceType.SPHERE, {
            origin: { x: -9, y: 1, z: -1},
            radius: 2,
            userData: {
            id: 'Safety Equipment',
            },
        }),
        mpSdk.Sensor.createSource(mpSdk.Sensor.SourceType.BOX, {
            center: { x: -10, y: 1, z: -1},
            size: { x: 13, y: 5, z: 6 },
            userData: {
            id: 'Elevators Area',
            },
        })
        ]);
        const sensor = await mpSdk.Sensor.createSensor(mpSdk.Sensor.SensorType.CAMERA);
        sensor.addSource(...source);
        sensor.showDebug(true);
        }
    })

}
