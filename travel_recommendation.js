async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

function search() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    if (!query) {
        alert('Please enter a valid search query.');
        return;
    }

    fetchRecommendations().then(data => {
        if (!data) return;

        let results = [];
        if (query.includes('beach')) {
            results = data.beaches;
        } else if (query.includes('temple')) {
            results = data.temples;
        } else {
            results = data.countries.flatMap(country => country.cities);
        }

        displayResults(results);
    });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(item => {
        const recommendationDiv = document.createElement('div');
        recommendationDiv.className = 'recommendation';

        const image = document.createElement('img');
        image.src = item.imageUrl;
        image.style.width = '400px';
        recommendationDiv.appendChild(image);

        const title = document.createElement('h2');
        title.textContent = item.name;
        recommendationDiv.appendChild(title);

        const description = document.createElement('p');
        description.textContent = item.description;
        recommendationDiv.appendChild(description);

        resultsContainer.appendChild(recommendationDiv);
    });
}

function clearResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('results').innerHTML = '';
}