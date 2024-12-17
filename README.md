small server to capture frame coming from a canvas

# Run server
node index.js


# Client Example

           var captureCanvas = document.getElementById("webGPUCanvas") as HTMLCanvasElement;

            if(captureCanvas == null){
                console.log("canvas not found");
                return;
            }
            // Convert the canvas to data
            var img_data = captureCanvas.toDataURL('image/png',1);
            console.log("sending on frame " + this.frameNr);
            fetch('http://localhost:8081/upload',
            { method: 'POST', headers: { "content-type": "application/json"},
            body: JSON.stringify({ file: img_data }) })
            .then(()=>{
                this.tick();
              }
            );
