// Add these at the beginning of your script
const toggleButton = document.getElementById('toggle-search');
let isUserSearch = true;

toggleButton.addEventListener('click', () => {
    isUserSearch = !isUserSearch;
    searchInput.placeholder = isUserSearch ? "Enter a username" : "Enter a repository name";
    toggleButton.textContent = `Search for ${isUserSearch ? 'Repos' : 'Users'}`;
});

// Modify the form submit event listener
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        if (isUserSearch) {
            searchUsers(searchTerm);
        } else {
            searchRepos(searchTerm);
        }
    }
});

// Add this new function to search for repositories
async function searchRepos(repoName) {
    try {
        const response = await fetch(`https://api.github.com/search/repositories?q=${repoName}`, { headers });
        const data = await response.json();
        displayRepos(data.items);
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p>An error occurred while searching for repositories.</p>';
    }
}

// Modify the displayRepos function to work with both user repos and search results
function displayRepos(repos) {
    resultsDiv.innerHTML = '<h2>Repositories:</h2>';
    repos.forEach(repo => {
        const repoItem = document.createElement('div');
        repoItem.className = 'repo-item';
        repoItem.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description available.'}</p>
            <p>Owner: ${repo.owner.login}</p>
            <a href="${repo.html_url}" target="_blank">View Repository</a>
        `;
        resultsDiv.appendChild(repoItem);
    });
}