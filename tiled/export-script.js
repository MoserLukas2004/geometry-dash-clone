function readMap(filename) {
    console.log("TODO: readMap");
}

function writeMap(map, filename) {
    const output = [];

    for (let layerIdx = 0; layerIdx < map.layerCount; layerIdx++) {
        let layer = map.layerAt(layerIdx);
        if (layer.isTileLayer) {
            for (let y = 0; y < layer.size.height; y++) {
                for (let x = 0; x < layer.size.width; x++) {
                    const tile = layer.tileAt(x, y);
                    if (tile && tile.type) {
                        output.push(tile.type);
                    } else {
                        output.push("-");
                    }
                }
                output.push("\n");
            }
        }
    }

    const file = new TextFile(filename, TextFile.WriteOnly);
    file.truncate();
    file.write(output.join(""));
    file.commit();
}

function outputFiles(_map, filename) {
    return [filename];
}

tiled.registerMapFormat("geometry-dash-clone-export", {
    name: "Geometry Dash Clone export script",
    extension: "txt",
    read: readMap,
    write: writeMap,
    outputFiles: outputFiles,
});
