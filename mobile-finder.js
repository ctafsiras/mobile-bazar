function getText(id) {
    const searchField = document.getElementById(id);
    const searchText = searchField.value;
    searchField.value = '';
    return searchText;
}
function buttonClick() {
    const searchText=getText('input-field')
    console.log(searchText);
}