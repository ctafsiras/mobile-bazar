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
    <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone: ${data.phone_name}</h5>
                    <h6 class="card-text">Brand: ${data.brand}</h6>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" type="submit">Button</button>
                </div>
    `;
    cardGroup.appendChild(div);

}
function getMobiles(data) {
    console.log(data);
    if(data.status){
        for (const mobile of data.data) {
            console.log(mobile);
            displayMobiles(mobile);
        }
    }
    else{
        document.getElementById('not-found').style.display='block';
    }

}
function buttonClick() {
    const searchText = getText('input-field')
    console.log(searchText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`).then(res => res.json()).then(data => getMobiles(data));
    
}