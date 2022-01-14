import axios from "axios";

export async function AddMarkers() {
    let markers = [];
    await axios.get('/seeds')
        .then((res) => {
            markers = res.data;
            // console.log(res);
        }).catch(err => console.log(err));
    return markers;
}
