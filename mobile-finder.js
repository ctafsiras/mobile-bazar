function getText(id) {
    const searchField = document.getElementById(id);
    const searchText = searchField.value;
    searchField.value = '';
    return searchText;
}
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
function getMobiles(data) {
    console.log(data);
    document.getElementById('detail').innerHTML=``;
    document.getElementById('cards-group').innerHTML = '';
    document.getElementById('not-found').style.display = 'none';
    if (data.status) {
        for (const mobile of data.data) {
            console.log(mobile);
            displayMobiles(mobile);
        }
    }
    else {
        document.getElementById('not-found').style.display = 'block';
    }

}
function buttonClick() {
    const searchText = getText('input-field')
    console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`).then(res => res.json()).then(data => getMobiles(data));

}


const mobileDetails = data => {
    console.log('dddd',data);
    document.getElementById('detail').innerHTML=``;
    const detailDiv = document.getElementById('detail');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card mx-auto" style="width: 18rem;">
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Model: ${data.name}</h5>
      <h6 class="card-text">Brand: ${data.brand}</h6>
      <p class="card-text">Release Date: ${data.releaseDate}</p>
      
    </div>
  </div>
    `;
    detailDiv.appendChild(div);

}
function detailsClick(id) {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json()).then(data => mobileDetails(data.data));
}