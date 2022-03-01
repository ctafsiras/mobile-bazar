// text from field funciton 
const getText = (id) => {
    const searchField = document.getElementById(id);
    const searchText = searchField.value;
    searchField.value = '';
    return searchText;
}
// mobile display on search function 
const displayMobiles = data => {
    const cardGroup = document.getElementById('cards-group');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="card">
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Phone: ${data.phone_name}</h5>
      <h6 class="card-text">Brand: ${data.brand}</h6>
    </div>
    <div class="card-footer">
      <button onclick="detailsClick('${data.slug}')" class="btn btn-primary" type="submit">Details</button>
  </div>
  </div>
    `;
    cardGroup.appendChild(div);

}
// getting mobile from array funciotn 
const getMobiles = (data) => {
    console.log(data);
    document.getElementById('detail').innerHTML = ``;
    document.getElementById('cards-group').innerHTML = '';
    document.getElementById('not-found').style.display = 'none';
    if (data.status) {
        let i = 0;
        for (const mobile of data.data) {

            if (i < 20) {
                displayMobiles(mobile);
            }

            console.log(mobile);
            i++;
        }

    }
    else {
        document.getElementById('not-found').style.display = 'block';
    }

}
// on search button click funtion 
const buttonClick = () => {
    const searchText = getText('input-field')
    console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`).then(res => res.json()).then(data => getMobiles(data));

}

// on click details button function 
const mobileDetails = data => {
    console.log('dddd', data);
    document.getElementById('detail').innerHTML = ``;
    const detailDiv = document.getElementById('detail');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row d-flex align-items-center mx-auto py-5">
    <img src="${data.image}" class="col-12 col-sm-6" alt="...">
    <div class="col-12 col-sm-6">
        <h5 class="card-title">Model: ${data.name}</h5>
        <h6 class="card-text">Brand: ${data.brand}</h6>
        <p class="card-text">Release Date: ${data.releaseDate ? data.releaseDate : 'Release Date Not Found'}</p>
        <h6 class="card-text">Main Features</h6>
        <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
        <p class="card-text">Display Size: ${data.mainFeatures.displaySize}</p>
        <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
        <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
        <p id="sensors" class="card-text">Sensors:</p>
        <h6 class="card-text">Others Features</h6>
        <p class="card-text">WLAN: ${data.others?.WLAN ? data.others.WLAN : 'Not Found'}</p>
        <p class="card-text">Bluetooth: ${data.others?.Bluetooth ? data.others.Bluetooth : 'Not Found'}</p>
        <p class="card-text">NFC: ${data.others?.NFC ? data.others.NFC : 'Not Found'}</p>
        <p class="card-text">USB: ${data?.others?.USB ? data.others.USB : 'Not Found'}</p>

    </div>
</div>
    `;
    detailDiv.appendChild(div);
    data.mainFeatures.sensors.forEach(element => {
        const sensorsId = document.getElementById('sensors');
        const sensor = document.createElement('li');
        sensor.innerText = element;
        sensorsId.appendChild(sensor);
    });

}
// detail button function 
const detailsClick = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json()).then(data => mobileDetails(data.data));
}