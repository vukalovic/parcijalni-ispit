const container = document.getElementById("container");
const textInput = document.getElementById("textInput");
/*postavljam eventListenera na promjenu vrijednosti inputa*/
textInput.addEventListener('input', search);
/*funkcija koja se poziva nakon svake promjene vrijednosti imputa*/
function search(e) {
    e.preventDefault();
    const phrase = textInput.value;

    if (phrase.length == 0) {
        return;
    }

    container.innerHTML = '<p>Učitavam</p>';

    const url = `https://api.punkapi.com/v2/beers?beer_name=${phrase}`;
    /*api poziv*/
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            /*ako ima prezultata*/
            if (response.length > 0) {
                container.innerHTML = '';
                for (let i = 0; i < response.length; i++) {
                    const element = response[i];

                    container.innerHTML += `
                    <div class="card">
                        <div class="card-header">
                            <img src="${element.image_url}" alt="beer" />
                        </div>
                        <div class="card-body">
                            <h4 class="naziv">${element.name}</h4>
                            <p class="opis">
                                ${element.description}
                            </p>
                        </div>
                    </div>`
                }

            } else {
                /*ako nema rezultata*/
                container.innerHTML = "<h3>Nema rezultata</h3>"
            }
        });
}