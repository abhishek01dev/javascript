const CACHE_DURATION = 3600000; // 1 Hour in milliseconds

const elements = {
    input: document.getElementById('usernameInput'),
    btn: document.getElementById('searchBtn'),
    container: document.getElementById('cardContainer'),
    loader: document.getElementById('loader'),
    error: document.getElementById('errorMessage')
};

elements.btn.addEventListener('click', () => {
    const user = elements.input.value.trim();
    if (user) initFetch(user);
});

async function initFetch(username) {
    toggleLoading(true);
    
    // 1. Check Cache first
    const cached = getCachedData(username);
    if (cached) {
        console.log("Loading from Cache...");
        renderUI(cached.profile, cached.repos);
        toggleLoading(false);
        return;
    }

    // 2. Fresh Fetch
    try {
        const [userRes, repoRes] = await Promise.all([
            fetch(`https://api.github.com/users/${username}`),
            fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
        ]);

        if (!userRes.ok) throw new Error("User not found on GitHub");

        const profileData = await userRes.json();
        const repoData = await repoRes.json();

        // Save to Cache
        saveToCache(username, profileData, repoData);
        
        renderUI(profileData, repoData);
    } catch (err) {
        showError(err.message);
    } finally {
        toggleLoading(false);
    }
}

function renderUI(profile, repos) {
    elements.error.classList.add('hidden');
    
    // Destructuring ES6
    const { name, avatar_url, bio, followers, public_repos, login } = profile;

    // Logic: Filter non-forks, Sort by stars, Take top 5
    const topRepos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

    // Logic: Calculate Top Language using .reduce()
    const langStats = repos.reduce((acc, repo) => {
        if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});

    const topLang = Object.keys(langStats).reduce((a, b) => langStats[a] > langStats[b] ? a : b, "N/A");

    elements.container.innerHTML = `
        <div class="dev-card">
            <div class="profile-header">
                <img src="${avatar_url}" class="avatar" alt="avatar">
                <div>
                    <h2>${name || login}</h2>
                    <p>${bio || "No bio available"}</p>
                    <span class="badge">Primary: ${topLang}</span>
                </div>
            </div>
            <hr style="border: 0.5px solid #30363d; margin: 20px 0;">
            <div style="display: flex; justify-content: space-around; font-size: 0.8rem;">
                <span><strong>${followers}</strong> Followers</span>
                <span><strong>${public_repos}</strong> Repos</span>
            </div>
            <h3>Top Projects</h3>
            <ul class="repo-list">
                ${topRepos.map(repo => `
                    <li class="repo-item">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        <span>⭐ ${repo.stargazers_count}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;
}

// Helper: Caching System
function saveToCache(user, profile, repos) {
    const entry = {
        timestamp: Date.now(),
        data: { profile, repos }
    };
    localStorage.setItem(`gh_cache_${user.toLowerCase()}`, JSON.stringify(entry));
}

function getCachedData(user) {
    const raw = localStorage.getItem(`gh_cache_${user.toLowerCase()}`);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const isExpired = (Date.now() - parsed.timestamp) > CACHE_DURATION;

    if (isExpired) {
        localStorage.removeItem(`gh_cache_${user.toLowerCase()}`);
        return null;
    }
    return parsed.data;
}

// UI Helpers
function toggleLoading(isLoading) {
    elements.loader.classList.toggle('hidden', !isLoading);
    if (isLoading) elements.container.innerHTML = '';
}

function showError(msg) {
    elements.error.innerText = msg;
    elements.error.classList.remove('hidden');
}