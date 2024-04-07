async function getPhotographers() {
    try {
        const response = await fetch('./../../data/photographers.json');
        if(!response.ok){
            throw new Error('Network response was nott ok');
        }
        const data = await response.json();
        return { photographers: data['photographers'] } ;
    } catch (error) {
        console.error('Error fetching photographers data:', error);
        return { photographers: []};
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();