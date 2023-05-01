// import * as Cesium from 'cesium';
// import "cesium/Build/Cesium/Widgets/widgets.css";

// Your access token can be found at: https://ion.cesium.com/tokens.
// This is the default access token from your ion account

const reset = document.getElementsByClassName('reset')[0]

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3Y2M1NmIwYi1lZjcyLTQwMjAtODNmYS0wMDJkNmExMTM4ZDkiLCJpZCI6MTI5NTQyLCJpYXQiOjE2NzkzNDQ4ODV9.GGVY2EFdi_q-4JAWLhMhoWY_kx1r0oh0gmJ-ixzSsEg';

// Initialize the viewer with Cesium World Terrain.
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    animation: false,
    homeButton: false,
    navigationHelpButton: false,
    fullscreenButton: false,
    sceneModePicker: false,
    timeline: false,
});

viewer.scene.light = new Cesium.DirectionalLight({
    direction: viewer.scene.camera.directionWC,
  });
  viewer.scene.preRender.addEventListener(function (scene, time) {
    viewer.scene.light.direction = Cesium.Cartesian3.clone(
      viewer.scene.camera.directionWC,
      viewer.scene.light.direction
    );
  });

// Add Cesium OSM Buildings.
const buildingsTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());
   


// // STEP 3 CODE
// async function addBuildingGeoJSON() {
//     // Load the GeoJSON file from Cesium ion.
//     const geoJSONURL = await Cesium.IonResource.fromAssetId(1590509);
//     // Create the geometry from the GeoJSON, and clamp it to the ground.
//     const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
//     // Add it to the scene.
//     const dataSource = await viewer.dataSources.add(geoJSON);
//     // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
//     // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
//     for (const entity of dataSource.entities.values) {
//     entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
//     }
//     // Move the camera so that the polygon is in view.
//     // viewer.flyTo(dataSource);
// }
// addBuildingGeoJSON();

// // STEP 4 CODE
// // Hide individual buildings in this area using 3D Tiles Styling language.
// buildingsTileset.style = new Cesium.Cesium3DTileStyle({
//     // Create a style rule to control each building's "show" property.
//     show: {
//     conditions : [
//         // Any building that has this elementId will have `show = false`.
//         ['${elementId} === 13816475', false],
//         // If a building does not have one of these elementIds, set `show = true`.
//         [true, true]
//     ]
//     },
//     // Set the default color style for this particular 3D Tileset.
//     // For any building that has a `cesium#color` property, use that color, otherwise make it white.
//     color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
// });    


// STEP 6 CODE
// Add the 3D Tileset you created from your Cesium ion account.
const campusModel = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(1591936)
    })
);

viewer.flyTo(campusModel)


// // STEP 7 CODE
// // Toggle the tileset's show property when the button is clicked.
// document.querySelector('#toggle-building').onclick = function() {
//     newBuildingTileset.show = !newBuildingTileset.show;
//         // Move the camera to the new building.
// viewer.flyTo(newBuildingTileset);    
// };