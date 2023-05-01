import { state } from './script.js'
import { selectedFloor } from './script.js'

window.addEventListener('keydown', e=> {
    if (e.key == 'q' && state == 2) {
        
    }
})

function activate() {
    if(!connected) {
       window.setTimeout(activate, 100); /* this checks the flag every 100 milliseconds*/
    } else {
       createSources()
    }
}
activate()

export function navToFloor() {
    mpSdk.Floor.moveTo(selectedFloor-1)
}

function createSources() {
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