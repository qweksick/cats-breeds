function getRandomCatInfo() {
    const apiKey = 'live_BVjtqCbL6g5nR3rWLwrEJg0b3w1Z6OOyntkaWbkboTKU4F45iQiagcSl1Xa6ZFQe';
    const imageApiUrl = `https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`;
    const breedApiUrl = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;

    Promise.all([
        fetch(imageApiUrl).then(response => response.json()),
        fetch(breedApiUrl).then(response => response.json())
    ])
    .then(data => {
        const imageUrl = data[0][0].url;
        const breedInfo = data[1][Math.floor(Math.random() * data[1].length)];
        const breed = breedInfo.name;
        const description = breedInfo.description;
        displayCatInfo(imageUrl, breed, description);
    })
    .catch(error => console.error('Error fetching cat info:', error));
}

function displayCatInfo(imageUrl, breed, description) {
    const catImageElement = document.getElementById('catImage');
    const catBreedElement = document.getElementById('catBreed');
    const catDescriptionElement = document.getElementById('catDescription');

    catImageElement.src = imageUrl;
    catBreedElement.textContent = `Breed: ${breed}`;
    catDescriptionElement.textContent = `Description: ${description}`;
}

document.addEventListener('DOMContentLoaded', function() {
    const randomButton = document.getElementById('randomButton');
    randomButton.addEventListener('click', getRandomCatInfo);
});


function searchCatByBreed() {
    const apiKey = 'live_BVjtqCbL6g5nR3rWLwrEJg0b3w1Z6OOyntkaWbkboTKU4F45iQiagcSl1Xa6ZFQe';
    const breed = document.getElementById('searchInput').value.trim();

    if (breed === '') {
        alert('Please enter a breed to search.');
        return;
    }

    const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breed}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const breedInfo = data[0];
                const breedName = breedInfo.name;
                const description = breedInfo.description;
                const imageUrl = breedInfo.image?.url || 'https://via.placeholder.com/300';

                displayCatInfo(imageUrl, breedName, description);
            } else {
                alert('Breed not found.');
            }
        })
        .catch(error => console.error('Error fetching cat info:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCatByBreed);
});
