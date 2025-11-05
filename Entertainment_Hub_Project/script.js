// ============================================
// DATA SECTION
// ============================================
const movies = [
    { title: 'RRR', genre: 'action', rating: 8.9, description: 'Epic action drama set in pre-independence India featuring two legendary revolutionaries' },
    { title: 'Dangal', genre: 'drama', rating: 8.4, description: 'Inspiring story of a wrestler and his daughters breaking stereotypes' },
    { title: '3 Idiots', genre: 'comedy', rating: 8.4, description: 'Comedy-drama about engineering students questioning the education system' },
    { title: 'Baahubali 2', genre: 'action', rating: 8.2, description: 'Epic conclusion to the Baahubali saga with stunning visuals' },
    { title: 'Taare Zameen Par', genre: 'drama', rating: 8.3, description: 'Heartwarming tale of a dyslexic child finding his path' },
    { title: 'Andhadhun', genre: 'thriller', rating: 8.2, description: 'Blind pianist caught in mysterious events and twisted plots' },
    { title: 'PK', genre: 'comedy', rating: 8.1, description: 'Alien questions religious beliefs humorously and thought-provokingly' },
    { title: 'Zindagi Na Milegi Dobara', genre: 'drama', rating: 8.2, description: 'Three friends on a life-changing road trip through Spain' },
    { title: 'Drishyam', genre: 'thriller', rating: 8.2, description: 'Family man protects his family from crime investigation' },
    { title: 'Bajrangi Bhaijaan', genre: 'drama', rating: 8.1, description: 'Man helps lost girl reunite with her family across borders' }
];

const series = [
    { title: 'Sacred Games', genre: 'thriller', rating: 8.7, description: 'Crime thriller series diving deep into Mumbai underworld' },
    { title: 'Mirzapur', genre: 'action', rating: 8.5, description: 'Crime and power struggles in the heartland of India' },
    { title: 'The Family Man', genre: 'action', rating: 8.8, description: 'Intelligence officer balancing work and family life' },
    { title: 'Delhi Crime', genre: 'drama', rating: 8.5, description: 'Based on the 2012 Delhi case investigation' },
    { title: 'Panchayat', genre: 'comedy', rating: 8.9, description: 'Engineer becomes village secretary in rural India' },
    { title: 'Kota Factory', genre: 'drama', rating: 8.9, description: 'Life of IIT aspirants in coaching hub of India' },
    { title: 'Asur', genre: 'thriller', rating: 8.4, description: 'Forensic expert and CBI officer hunt a brutal serial killer' },
    { title: 'Made in Heaven', genre: 'drama', rating: 8.3, description: 'Wedding planners navigate through modern Indian society' },
    { title: 'Breathe', genre: 'thriller', rating: 8.3, description: 'Desperate measures taken by a father to save his son' },
    { title: 'Special Ops', genre: 'action', rating: 8.6, description: 'RAW agent hunts mastermind behind terror attacks' }
];

const platformInfo = {
    'Netflix': {
        description: 'Netflix offers unlimited streaming of movies, TV series, and documentaries with original content across multiple genres.',
        subscribers: '230M+ worldwide',
        bestFor: 'Original series and movies'
    },
    'Prime Video': {
        description: 'Amazon Prime Video features exclusive originals, movies, and series included with Prime membership plus rental options.',
        subscribers: '200M+ worldwide',
        bestFor: 'Amazon Originals and Bollywood content'
    },
    'Disney+': {
        description: 'Disney+ brings Marvel, Star Wars, Pixar, National Geographic and classic Disney content to your screen.',
        subscribers: '150M+ worldwide',
        bestFor: 'Family entertainment and Marvel content'
    },
    'HBO Max': {
        description: 'HBO Max delivers premium content including HBO originals, Warner Bros. movies, blockbusters and exclusive series.',
        subscribers: '95M+ worldwide',
        bestFor: 'Premium quality series and movies'
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
let currentMovieFilter = 'all';
let currentSeriesFilter = 'all';
let isSearchActive = false;

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    renderMovies();
    renderSeries();
    animateCounters();
    setupEventListeners();
    setupFilterButtons();
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================
function setupEventListeners() {
    // Form submission
    const form = document.getElementById('surveyForm');
    if (form) {
        form.addEventListener('submit', submitSurvey);
    }

    // Scroll event for back to top button
    window.addEventListener('scroll', handleScroll);

    // Click outside modal to close
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const type = this.getAttribute('data-type');
            
            // Remove active class from siblings
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter content
            filterContent(filter, type);
        });
    });
}

// ============================================
// RENDER FUNCTIONS
// ============================================
function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const filtered = currentMovieFilter === 'all' 
        ? movies 
        : movies.filter(m => m.genre === currentMovieFilter);
    
    filtered.forEach((movie, index) => {
        const card = createMovieCard(movie, index);
        grid.appendChild(card);
    });
}

function renderSeries() {
    const grid = document.getElementById('seriesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const filtered = currentSeriesFilter === 'all' 
        ? series 
        : series.filter(s => s.genre === currentSeriesFilter);
    
    filtered.forEach((show, index) => {
        const card = createMovieCard(show, index);
        grid.appendChild(card);
    });
}

function createMovieCard(content, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    ];
    
    const randomGradient = gradients[index % gradients.length];
    const stars = getStarRating(content.rating);
    
    card.innerHTML = `
        <div class="movie-poster" style="background: ${randomGradient}">
            ${content.title}
            <div class="play-icon">▶</div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${content.title}</h3>
            <p class="movie-genre">${content.genre}</p>
            <div class="rating">
                <span class="stars">${stars}</span>
                <span class="rating-number">${content.rating}/10</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => showModal(content));
    return card;
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================
function filterContent(genre, type) {
    if (type === 'movies') {
        currentMovieFilter = genre;
        renderMovies();
    } else if (type === 'series') {
        currentSeriesFilter = genre;
        renderSeries();
    }
    
    isSearchActive = false;
    document.getElementById('searchInput').value = '';
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function handleSearch(event) {
    if (event.key === 'Enter') {
        searchContent();
    }
}

function searchContent() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const moviesGrid = document.getElementById('moviesGrid');
    const seriesGrid = document.getElementById('seriesGrid');
    
    if (!query) {
        isSearchActive = false;
        renderMovies();
        renderSeries();
        return;
    }
    
    isSearchActive = true;
    
    // Search in movies
    const movieResults = movies.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    
    // Search in series
    const seriesResults = series.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
    
    // Render results
    moviesGrid.innerHTML = '';
    seriesGrid.innerHTML = '';
    
    // No results found
    if (movieResults.length === 0 && seriesResults.length === 0) {
        const noResultMsg = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-color);">
                <h3 style="font-size: 2rem; margin-bottom: 1rem;">😕 No Results Found</h3>
                <p style="font-size: 1.2rem; color: #999;">No results found for "<strong>${query}</strong>"</p>
                <p style="margin-top: 1rem; color: #999;">Try searching with different keywords</p>
            </div>
        `;
        moviesGrid.innerHTML = noResultMsg;
        
        // Show notification
        showNotification(`No results found for "${query}"`, 'error');
        
        // Scroll to movies section
        document.getElementById('movies').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        return;
    }
    
    // Render movie results
    if (movieResults.length > 0) {
        movieResults.forEach((item, index) => {
            const card = createMovieCard(item, index);
            moviesGrid.appendChild(card);
        });
        
        // Scroll to movies section if results found
        setTimeout(() => {
            document.getElementById('movies').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    } else {
        moviesGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">
                No movies found for "${query}"
            </p>
        `;
    }
    
    // Render series results
    if (seriesResults.length > 0) {
        seriesResults.forEach((item, index) => {
            const card = createMovieCard(item, index);
            seriesGrid.appendChild(card);
        });
        
        // If no movie results but series results exist, scroll to series
        if (movieResults.length === 0) {
            setTimeout(() => {
                document.getElementById('series').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    } else {
        seriesGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">
                No series found for "${query}"
            </p>
        `;
    }
    
    // Show success notification
    const totalResults = movieResults.length + seriesResults.length;
    showNotification(`Found ${totalResults} result${totalResults > 1 ? 's' : ''} for "${query}"`, 'success');
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function showModal(content) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalRating = document.getElementById('modalRating');
    
    const stars = getStarRating(content.rating);
    
    modalTitle.textContent = content.title;
    modalDescription.textContent = content.description;
    modalRating.innerHTML = `
        <span class="stars">${stars}</span>
        <span class="rating-number">${content.rating}/10</span>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function showPlatformInfo(platform) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalRating = document.getElementById('modalRating');
    
    const info = platformInfo[platform];
    
    modalTitle.textContent = platform;
    modalDescription.textContent = info.description;
    modalRating.innerHTML = `
        <p style="margin-top: 1rem; color: var(--text-color);">
            <strong>Subscribers:</strong> ${info.subscribers}<br>
            <strong>Best For:</strong> ${info.bestFor}
        </p>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// ============================================
// FORM SUBMISSION
// ============================================
function submitSurvey(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const genre = document.getElementById('favoriteGenre').value;
    const show = document.getElementById('favoriteShow').value.trim();
    const feedback = document.getElementById('feedback').value.trim();
    
    // Validation
    if (!name || !email || !genre) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Success
    showNotification(`Thank you, ${name}! Your survey has been submitted successfully! 🎉`, 'success');
    
    // Reset form
    document.getElementById('surveyForm').reset();
    
    // Log submission (in real app, this would be sent to server)
    console.log('Survey Submitted:', { name, email, genre, show, feedback });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.background = type === 'success' ? '#28a745' : '#dc3545';
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    
    // Save preference to localStorage
    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    
    showNotification(`Switched to ${isLightMode ? 'Light' : 'Dark'} mode!`, 'success');
}

// Load saved theme on page load
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================
function smoothScroll(event, targetId) {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// SCROLL HANDLING
// ============================================
function handleScroll() {
    const backToTop = document.getElementById('backToTop');
    
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = [
        { id: 'moviesCount', target: movies.length },
        { id: 'seriesCount', target: series.length },
        { id: 'platformsCount', target: 4 }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        let current = 0;
        const increment = Math.ceil(counter.target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                element.textContent = counter.target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 30);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Convert rating (out of 10) to star display
function getStarRating(rating) {
    // Convert rating from /10 to /5 scale
    const scaledRating = rating / 2;
    
    // Round to nearest 0.5
    const roundedRating = Math.round(scaledRating * 2) / 2;
    
    const fullStar = '⭐';
    const halfStar = '✨';
    const emptyStar = '☆';
    
    let stars = '';
    let remaining = roundedRating;
    
    // Add full stars
    for (let i = 0; i < Math.floor(remaining); i++) {
        stars += fullStar;
    }
    
    // Add half star if needed
    if (remaining % 1 !== 0) {
        stars += halfStar;
        remaining -= 0.5;
    }
    
    // Add empty stars to make total of 5
    const emptyCount = 5 - Math.ceil(roundedRating);
    for (let i = 0; i < emptyCount; i++) {
        stars += emptyStar;
    }
    
    return stars;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search for better performance
const debouncedSearch = debounce(searchContent, 300);

// ============================================
// ADDITIONAL FEATURES
// ============================================

// Add hover effect sound (optional - commented out)
// function playHoverSound() {
//     const audio = new Audio('hover-sound.mp3');
//     audio.volume = 0.2;
//     audio.play();
// }

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Focus search with '/' key
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Prevent form resubmission on refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Loading animation (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console easter egg
console.log('%c🎬 Welcome to Entertainment Hub! 🎬', 'font-size: 20px; color: #e50914; font-weight: bold;');
console.log('%cEnjoy exploring movies and series!', 'font-size: 14px; color: #999;');

// Export functions for external use (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        movies,
        series,
        renderMovies,
        renderSeries,
        searchContent,
        toggleTheme
    };
}