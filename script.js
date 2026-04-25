const STORAGE_KEY = 'aidbridge_requests';
const PREDICTHQ_API_KEY = '7b9T8mLinZVLHscwJhrllX41IVHNiBmXTCV-7KER';
const PREDICTHQ_API_URL = 'https://api.predicthq.com/v1/events/';
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const OKSURF_API_URL = 'https://ok.surf/api/v1';

function getMockNewsData() {
    const categories = {
        all: [
            { title: 'International Relief Efforts Ramp Up After Major Earthquake', source: 'Reuters', link: '#', og: 'https://images.unsplash.com/photo-1469571486292-0fa58cada5ae?w=400' },
            { title: 'Climate Change Leads to Increased Flooding Worldwide', source: 'BBC News', link: '#', og: 'https://images.unsplash.com/photo-1543328226-4428b777a2f8?w=400' },
            { title: 'New Technology Helps Predict Natural Disasters Earlier', source: 'CNN', link: '#', og: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
            { title: 'Volunteers Unite for Hurricane Relief Operations', source: 'AP News', link: '#', og: 'https://images.unsplash.com/photo-1592232688729-9352b1f1aa58?w=400' },
            { title: 'WHO Declares Health Emergency in Flood-Affected Regions', source: 'Al Jazeera', link: '#', og: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400' },
            { title: 'Emergency Shelters Reach Capacity in Multiple Countries', source: 'Reuters', link: '#', og: 'https://images.unsplash.com/photo-1488521787991-ed7bba9647b3?w=400' },
            { title: 'AI-Powered Early Warning Systems Show Promise', source: 'TechCrunch', link: '#', og: 'https://images.unsplash.com/photo-1485827404703-89b89fcc4b3e?w=400' },
            { title: 'Community Resilience Key to Disaster Recovery', source: 'The Guardian', link: '#', og: 'https://images.unsplash.com/photo-1523995462484-3d1a05b9d028?w=400' }
        ],
        World: [
            { title: 'Global Aid Organizations Coordinate Relief Efforts', source: 'Reuters', link: '#', og: 'https://images.unsplash.com/photo-1469571486292-0fa58cada5ae?w=400' },
            { title: 'International Community Pledges Disaster Relief Funding', source: 'BBC News', link: '#', og: 'https://images.unsplash.com/photo-1523995462484-3d1a05b9d028?w=400' },
            { title: 'Cross-Border Relief Operations Expand', source: 'AP News', link: '#', og: 'https://images.unsplash.com/photo-1450101494163-cbeefc16abb2?w=400' }
        ],
        Business: [
            { title: 'Insurance Companies Brace for Record Disaster Claims', source: 'WSJ', link: '#', og: 'https://images.unsplash.com/photo-1450101494163-cbeefc16abb2?w=400' },
            { title: 'Relief Supply Chain Adapts to Climate Challenges', source: 'Bloomberg', link: '#', og: 'https://images.unsplash.com/photo-1473448912268-142e5b5e68b2?w=400' },
            { title: 'Tech Companies Donate to Disaster Relief', source: 'CNBC', link: '#', og: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' }
        ],
        Technology: [
            { title: 'New Drone Technology Speeds Up Relief Delivery', source: 'TechCrunch', link: '#', og: 'https://images.unsplash.com/photo-1485827404703-89b89fcc4b3e?w=400' },
            { title: 'AI Models Improve Disaster Prediction Accuracy', source: 'Wired', link: '#', og: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400' },
            { title: 'Satellite Imagery Helps Map Flood Zones', source: 'The Verge', link: '#', og: 'https://images.unsplash.com/photo-1446776653962-b4f8fef57d3b?w=400' }
        ],
        Sports: [
            { title: 'Athletes Raise Funds for Disaster Relief', source: 'ESPN', link: '#', og: 'https://images.unsplash.com/photo-1461896836938-7b8d8ab5d2ad?w=400' },
            { title: 'Charity Match Raises Money for Affected Communities', source: 'Sports Illustrated', link: '#', og: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400' }
        ],
        Science: [
            { title: 'Research Shows Climate Link to Extreme Weather', source: 'Nature', link: '#', og: 'https://images.unsplash.com/photo-1507413915161-4618be362fc4?w=400' },
            { title: 'New Study on Earthquake Early Warnings', source: 'Science Daily', link: '#', og: 'https://images.unsplash.com/photo-1450101494163-cbeefc16abb2?w=400' }
        ],
        Health: [
            { title: 'Health Officials Warn of Disease Spread After Floods', source: 'WHO', link: '#', og: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400' },
            { title: 'Mental Health Resources Critical for Disaster Survivors', source: 'CNN Health', link: '#', og: 'https://images.unsplash.com/photo-1559757148-5c350d0bb8ba?w=400' }
        ]
    };
    return categories[category] || categories.all;
}

let requests = [];
let currentFilter = 'all';
let isAnimating = false;
let disasterData = [];
let chatHistory = [];
let newsData = [];

async function fetchDisasterData() {
    return getMockDisasterData();
}

function getMockDisasterData() {
    return [
        {
            id: 'mock1',
            title: 'Typhoon Morakot Recovery',
            category: 'severe_weather',
            location: ['Philippines', 'Luzon'],
            start: '2026-04-20',
            severity_score: 9
        },
        {
            id: 'mock2', 
            title: 'California Wildfire Season',
            category: 'wildfire',
            location: ['United States', 'California'],
            start: '2026-05-01',
            severity_score: 8
        },
        {
            id: 'mock3',
            title: 'Monsoon Floods Mumbai',
            category: 'flood',
            location: ['India', 'Mumbai'],
            start: '2026-06-15',
            severity_score: 7
        },
        {
            id: 'mock4',
            title: 'Earthquake Aftershocks',
            category: 'earthquake',
            location: ['Turkey', 'Istanbul'],
            start: '2026-04-01',
            severity_score: 8
        },
        {
            id: 'mock5',
            title: 'Heat Wave Europe',
            category: 'extreme_temperature',
            location: ['Spain', 'Madrid'],
            start: '2026-07-01',
            severity_score: 9
        },
        {
            id: 'mock6',
            title: 'Dengue Outbreak',
            category: 'disease_outbreak',
            location: ['Brazil', 'Sao Paulo'],
            start: '2026-05-10',
            severity_score: 6
        },
        {
            id: 'mock7',
            title: 'Texas Floods',
            category: 'flood',
            location: ['United States', 'Texas'],
            start: '2026-06-01',
            severity_score: 7
        },
        {
            id: 'mock8',
            title: 'Ontario Blizzard',
            category: 'severe_weather',
            location: ['Canada', 'Ontario'],
            start: '2026-12-15',
            severity_score: 8
        },
        {
            id: 'mock9',
            title: 'Sydney Bushfires',
            category: 'wildfire',
            location: ['Australia', 'New South Wales'],
            start: '2026-11-01',
            severity_score: 9
        },
        {
            id: 'mock10',
            title: 'Japan Tsunami Warning',
            category: 'earthquake',
            location: ['Japan', 'Tokyo'],
            start: '2026-04-25',
            severity_score: 10
        },
        {
            id: 'mock11',
            title: 'Florida Hurricane',
            category: 'severe_weather',
            location: ['United States', 'Florida'],
            start: '2026-08-15',
            severity_score: 10
        },
        {
            id: 'mock12',
            title: 'UK Floods',
            category: 'flood',
            location: ['United Kingdom', 'England'],
            start: '2026-10-10',
            severity_score: 6
        },
        {
            id: 'mock13',
            title: 'Bangkok Floods',
            category: 'flood',
            location: ['Thailand', 'Bangkok'],
            start: '2026-10-01',
            severity_score: 7
        },
        {
            id: 'mock14',
            title: 'Chile Earthquake',
            category: 'earthquake',
            location: ['Chile', 'Santiago'],
            start: '2026-03-15',
            severity_score: 9
        },
        {
            id: 'mock15',
            title: 'Indonesia Wildfire',
            category: 'wildfire',
            location: ['Indonesia', 'Kalimantan'],
            start: '2026-08-01',
            severity_score: 8
        },
        {
            id: 'mock16',
            title: 'Russia Heatwave',
            category: 'extreme_temperature',
            location: ['Russia', 'Moscow'],
            start: '2026-07-10',
            severity_score: 7
        },
        {
            id: 'mock17',
            title: 'Italy Floods',
            category: 'flood',
            location: ['Italy', 'Venice'],
            start: '2026-11-20',
            severity_score: 8
        },
        {
            id: 'mock18',
            title: 'Mexico Earthquake',
            category: 'earthquake',
            location: ['Mexico', 'Mexico City'],
            start: '2026-06-01',
            severity_score: 8
        },
        {
            id: 'mock19',
            title: 'South Africa Drought',
            category: 'extreme_temperature',
            location: ['South Africa', 'Cape Town'],
            start: '2026-01-15',
            severity_score: 7
        },
        {
            id: 'mock20',
            title: 'Greece Wildfire',
            category: 'wildfire',
            location: ['Greece', 'Athens'],
            start: '2026-07-25',
            severity_score: 9
        },
        {
            id: 'mock21',
            title: 'Nepal Floods',
            category: 'flood',
            location: ['Nepal', 'Kathmandu'],
            start: '2026-07-01',
            severity_score: 8
        },
        {
            id: 'mock22',
            title: 'Vietnam Typhoon',
            category: 'severe_weather',
            location: ['Vietnam', 'Hanoi'],
            start: '2026-09-10',
            severity_score: 9
        },
        {
            id: 'mock23',
            title: 'Poland Floods',
            category: 'flood',
            location: ['Poland', 'Warsaw'],
            start: '2026-10-05',
            severity_score: 7
        },
        {
            id: 'mock24',
            title: 'Egypt Heat Wave',
            category: 'extreme_temperature',
            location: ['Egypt', 'Cairo'],
            start: '2026-06-20',
            severity_score: 8
        },
        {
            id: 'mock25',
            title: 'New Zealand Earthquake',
            category: 'earthquake',
            location: ['New Zealand', 'Wellington'],
            start: '2026-05-10',
            severity_score: 8
        },
        {
            id: 'mock26',
            title: 'Argentina Floods',
            category: 'flood',
            location: ['Argentina', 'Buenos Aires'],
            start: '2026-03-01',
            severity_score: 7
        },
        {
            id: 'mock27',
            title: 'Myanmar Cyclone',
            category: 'severe_weather',
            location: ['Myanmar', 'Yangon'],
            start: '2026-05-20',
            severity_score: 9
        },
        {
            id: 'mock28',
            title: 'Kenya Drought',
            category: 'extreme_temperature',
            location: ['Kenya', 'Nairobi'],
            start: '2026-02-10',
            severity_score: 8
        },
        {
            id: 'mock29',
            title: 'Peru Landslide',
            category: 'flood',
            location: ['Peru', 'Lima'],
            start: '2026-03-25',
            severity_score: 7
        },
        {
            id: 'mock30',
            title: 'Germany Floods',
            category: 'flood',
            location: ['Germany', 'Berlin'],
            start: '2026-12-01',
            severity_score: 7
        }
    ];
}

function searchDisasters(query) {
    query = query.toLowerCase().trim();
    
    if (!query) {
        renderDisasters(disasterData);
        return;
    }
    
    const filtered = disasterData.filter(disaster => {
        const title = disaster.title?.toLowerCase() || '';
        const category = disaster.category?.toLowerCase() || '';
        const location = disaster.location?.join(' ').toLowerCase() || '';
        
        return title.includes(query) || category.includes(query) || location.includes(query);
    });
    
    renderDisasters(filtered);
}

async function refreshDisasters() {
    const grid = document.getElementById('disasters-grid');
    grid.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading disaster data...</p>
        </div>
    `;
    
    const data = await fetchDisasterData();
    disasterData = data;
    renderDisasters(data);
}

function renderDisasters(disasters) {
    const grid = document.getElementById('disasters-grid');
    
    if (!disasters || disasters.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h3>No Active Disasters</h3>
                <p>No disaster data available at the moment</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = disasters.slice(0, 20).map((disaster, index) => {
        const categoryIcons = {
            severe_weather: '⚡',
            extreme_temperature: '🌡️',
            wildfire: '🔥',
            disease_outbreak: '🦠',
            flood: '🌊',
            earthquake: '🌍'
        };
        
        const severity = disaster.severity_score || disaster.rank || 5;
        const severityClass = severity >= 8 ? 'high' : severity >= 5 ? 'medium' : 'low';
        const icon = categoryIcons[disaster.category] || '⚠️';
        
        const location = disaster.location?.join(', ') || 
                      disaster.place_hierarchies?.[0]?.country || 
                      disaster.country || 'Unknown location';
        
        return `
            <div class="disaster-card" style="animation-delay: ${index * 0.08}s">
                <div class="disaster-header">
                    <span class="disaster-icon">${icon}</span>
                    <span class="disaster-severity ${severityClass}">${severityClass.toUpperCase()}</span>
                </div>
                <h3 class="disaster-title">${escapeHtml(disaster.title)}</h3>
                <p class="disaster-location">${escapeHtml(location)}</p>
                <div class="disaster-badges">
                    <span class="disaster-badge category">${(disaster.category || 'disaster').replace(/_/g, ' ')}</span>
                    <span class="disaster-badge date">${formatDate(disaster.start)}</span>
                </div>
            </div>
        `;
    }).join('');
}

function formatDate(dateString) {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

async function fetchNews(category = 'all') {
    currentNewsCategory = category;
    const grid = document.getElementById('news-grid');
    
    document.querySelectorAll('.news-cat-btn').forEach(btn => btn.classList.remove('active'));
    const buttons = document.querySelectorAll('.news-cat-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase() === category.toLowerCase() || (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    
    grid.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading news...</p>
        </div>
    `;
    
    try {
        let articles = getMockNewsData(category);
        
        setTimeout(() => {
            newsData = articles;
            renderNews(articles);
        }, 500);
    } catch (error) {
        console.error('News fetch error:', error);
        grid.innerHTML = `
            <div class="empty-state">
                <h3>Unable to load news</h3>
                <p>Please try again later</p>
            </div>
        `;
    }
}

function refreshNews() {
    fetchNews(currentNewsCategory);
}

function renderNews(articles) {
    const grid = document.getElementById('news-grid');
    
    if (!articles || articles.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No News Available</h3>
                <p>Check back later for updates</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = articles.slice(0, 20).map((article, index) => `
        <div class="news-card" style="animation-delay: ${index * 0.06}s">
            ${article.og ? `<div class="news-image" style="background-image: url('${escapeHtml(article.og)}')"></div>` : ''}
            <div class="news-content">
                <div class="news-source">
                    ${article.source_icon ? `<img src="${article.source_icon}" alt="">` : ''}
                    <span>${escapeHtml(article.source || 'Unknown')}</span>
                </div>
                <h3 class="news-title">${escapeHtml(article.title)}</h3>
                <a href="${article.link}" target="_blank" class="news-link">Read More →</a>
            </div>
        </div>
    `).join('');
}

async function getOkSurfSections() {
    try {
        const response = await fetch(`${OKSURF_API_URL}/news-section-names`, {
            headers: { 'Accept': 'application/json' }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching sections:', error);
        return [];
    }
}

function init() {
    loadRequests();
    createBackgroundEffects();
    createParticles();
    setupEventListeners();
    initAnimations();
    displayUserInfo();
    
    const loginType = localStorage.getItem('loginType');
    
    setTimeout(() => {
        if (loginType === 'real') {
            window.showPanel('dashboard');
        } else {
            window.showPanel('help');
        }
    }, 100);
}

function loadRequests() {
    const stored = localStorage.getItem(STORAGE_KEY);
    requests = stored ? JSON.parse(stored) : [];
    
    if (requests.length === 0) {
        requests = generateDemoRequests();
        saveRequests();
    }
}

function generateDemoRequests() {
    return [
        {
            id: 'REQ001',
            name: 'Rajesh Kumar',
            location: 'Near Central School, Block A',
            helpType: 'Food',
            urgency: 'high',
            status: 'pending',
            timestamp: Date.now()
        },
        {
            id: 'REQ002',
            name: 'Anonymous',
            location: 'Sector 12, near hospital',
            helpType: 'Medical',
            urgency: 'high',
            status: 'pending',
            timestamp: Date.now() - 60000
        },
        {
            id: 'REQ003',
            name: 'Priya Sharma',
            location: 'MG Road colony',
            helpType: 'Shelter',
            urgency: 'medium',
            status: 'accepted',
            timestamp: Date.now() - 120000
        },
        {
            id: 'REQ004',
            name: 'Amit Patel',
            location: 'Old City Area',
            helpType: 'Rescue',
            urgency: 'high',
            status: 'pending',
            timestamp: Date.now() - 180000
        },
        {
            id: 'REQ005',
            name: 'Anonymous',
            location: 'Railway Station',
            helpType: 'Food',
            urgency: 'low',
            status: 'completed',
            timestamp: Date.now() - 300000
        },
        {
            id: 'REQ006',
            name: 'Sneha Reddy',
            location: 'Downtown Mall',
            helpType: 'Medical',
            urgency: 'medium',
            status: 'accepted',
            timestamp: Date.now() - 240000
        },
        {
            id: 'REQ007',
            name: 'Vikram Singh',
            location: 'Lake View Apartments',
            helpType: 'Shelter',
            urgency: 'medium',
            status: 'pending',
            timestamp: Date.now() - 90000
        }
    ];
}

function saveRequests() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
}

function generateId() {
    const num = (requests.length + 1).toString().padStart(3, '0');
    return `REQ${num}`;
}

function createBackgroundEffects() {
    const bgContainer = document.querySelector('.background-effects');
    if (!bgContainer) return;
    
    const orbs = ['orb-1', 'orb-2', 'orb-3', 'orb-4'];
    
    orbs.forEach((className, index) => {
        const div = document.createElement('div');
        div.className = `orb ${className}`;
        div.style.animationDelay = `${index * -5}s`;
        bgContainer.appendChild(div);
    });
}

function createParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${15 + Math.random() * 20}s`;
        particle.style.animationDelay = `${Math.random() * -20}s`;
        particle.style.width = `${2 + Math.random() * 4}px`;
        particle.style.height = particle.style.width;
        
        if (Math.random() > 0.5) {
            particle.style.background = 'var(--secondary)';
        }
        
        container.appendChild(particle);
    }
}

function setupEventListeners() {
    const form = document.getElementById('help-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideConfirmation();
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    if (isAnimating) return;
    
    const location = document.getElementById('location').value.trim();
    const helpType = document.getElementById('helpType').value;
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const isAnonymous = document.getElementById('anonymous').checked;
    const urgency = document.querySelector('input[name="urgency"]:checked').value;

    let valid = true;

    if (!location) {
        document.getElementById('location').classList.add('error');
        document.getElementById('location-error').classList.add('show');
        valid = false;
    } else {
        document.getElementById('location').classList.remove('error');
        document.getElementById('location-error').classList.remove('show');
    }

    if (!helpType) {
        document.getElementById('helpType').classList.add('error');
        document.getElementById('helpType-error').classList.add('show');
        valid = false;
    } else {
        document.getElementById('helpType').classList.remove('error');
        document.getElementById('helpType-error').classList.remove('show');
    }

    if (!valid) {
        shakeForm();
        return;
    }

    addRequest(name, isAnonymous, location, helpType, urgency, description);
}

function shakeForm() {
    const card = document.querySelector('.glass-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'formShake 0.6s ease';
}

function addRequest(name, isAnonymous, location, helpType, urgency, description) {
    isAnimating = true;
    
    const request = {
        id: generateId(),
        name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
        location: location,
        helpType: helpType,
        urgency: urgency,
        description: description,
        status: 'pending',
        timestamp: Date.now()
    };

    requests.unshift(request);
    saveRequests();

    animateSubmission();
    
    setTimeout(() => {
        document.getElementById('help-form').reset();
        document.getElementById('anonymous').checked = false;
        
        document.querySelectorAll('.urgency-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('.urgency-option.medium').classList.add('selected');
        document.getElementById('urgencyMedium').checked = true;
        
        showConfirmation();
        
        setTimeout(() => {
            hideConfirmation();
            isAnimating = false;
        }, 5000);
    }, 700);
}

function animateSubmission() {
    const card = document.querySelector('.glass-card');
    card.style.transition = 'all 0.3s ease';
    card.style.transform = 'scale(0.98)';
    card.style.opacity = '0.6';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        
        setTimeout(() => {
            card.style.transition = '';
            card.style.transform = '';
            card.style.opacity = '';
        }, 500);
    }, 150);
}

function showPanel(panel) {
    if (isAnimating) return;
    
    const loginType = localStorage.getItem('loginType');
    
    if (panel === 'dashboard' && loginType === 'anonymous') {
        alert('Please login as volunteer to access the dashboard');
        return;
    }
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const panels = document.querySelectorAll('.panel');
    panels.forEach((p, i) => {
        p.classList.remove('active');
    });
    
    if (panel === 'help') {
        document.getElementById('help-panel').classList.add('active');
        document.getElementById('nav-help').classList.add('active');
    } else if (panel === 'news') {
        document.getElementById('news-panel').classList.add('active');
        document.getElementById('nav-news').classList.add('active');
        if (newsData.length === 0) {
            fetchNews('all');
        }
    } else if (panel === 'disasters') {
        document.getElementById('disasters-panel').classList.add('active');
        document.getElementById('nav-disasters').classList.add('active');
        if (disasterData.length === 0) {
            refreshDisasters();
        }
    } else {
        document.getElementById('dashboard-panel').classList.add('active');
        document.getElementById('nav-dashboard').classList.add('active');
        setTimeout(async () => {
            await renderDashboard();
        }, 150);
    }
}

function renderDashboard() {
    const grid = document.getElementById('cards-grid');
    const pendingCount = document.getElementById('pending-count');
    const acceptedCount = document.getElementById('accepted-count');
    const completedCount = document.getElementById('completed-count');

    let filteredRequests = [...requests];
    
    if (currentFilter !== 'all') {
        filteredRequests = filteredRequests.filter(r => r.status === currentFilter);
    }

    const sortedRequests = filteredRequests.sort((a, b) => {
        const urgencyOrder = { high: 0, medium: 1, low: 2 };
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    });

    const pending = requests.filter(r => r.status === 'pending').length;
    const accepted = requests.filter(r => r.status === 'accepted').length;
    const completed = requests.filter(r => r.status === 'completed').length;

    animateValue(pendingCount, pending);
    animateValue(acceptedCount, accepted);
    animateValue(completedCount, completed, true);

    renderFilterTabs();

    if (sortedRequests.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <h3>No Active Requests</h3>
                <p>All requests have been addressed</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = sortedRequests.map((req, index) => `
        <div class="request-card urgency-${req.urgency}" 
             style="animation-delay: ${index * 0.08}s" 
             data-id="${req.id}">
            <div class="card-header">
                <span class="card-name">${escapeHtml(req.name)}</span>
                <span class="card-status ${req.status}">${req.status}</span>
            </div>
            <div class="card-location">${escapeHtml(req.location)}</div>
            ${req.description ? `<div class="card-description">${escapeHtml(req.description)}</div>` : ''}
            <div class="card-badges">
                <span class="card-badge type">${req.helpType}</span>
                <span class="card-badge urgency ${req.urgency}">${req.urgency}</span>
            </div>
            <div class="card-actions">
                ${req.status === 'pending' ? `
                    <button class="card-btn accept" onclick="updateStatus('${req.id}', 'accepted')">Accept</button>
                ` : ''}
                ${req.status === 'accepted' ? `
                    <button class="card-btn complete" onclick="updateStatus('${req.id}', 'completed')">Mark Done</button>
                ` : ''}
            </div>
        </div>
    `).join('');

    addCardInteractions();
}

function addCardInteractions() {
    document.querySelectorAll('.request-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}

function animateValue(element, value) {
    const current = parseInt(element.textContent) || 0;
    const diff = value - current;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const display = Math.round(current + diff * eased);
        element.textContent = `${display} ${element.id.replace('-count', '')}`;
        
        if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
}

function renderFilterTabs() {
    const container = document.getElementById('filter-tabs');
    const filters = [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'accepted', label: 'Active' },
        { value: 'completed', label: 'Done' }
    ];

    container.innerHTML = filters.map(f => `
        <button class="filter-tab ${currentFilter === f.value ? 'active' : ''}" 
                onclick="setFilter('${f.value}')">
            ${f.label}
        </button>
    `).join('');
}

function setFilter(filter) {
    currentFilter = filter;
    renderDashboard();
}

function updateStatus(id, newStatus) {
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        card.style.transform = 'scale(0.9) rotateX(10deg)';
        card.style.opacity = '0';
    }
    
    setTimeout(() => {
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index].status = newStatus;
            saveRequests();
            renderDashboard();
        }
    }, 350);
}

function showConfirmation() {
    const confirm = document.getElementById('confirmation');
    confirm.classList.add('show');
}

function hideConfirmation() {
    const confirm = document.getElementById('confirmation');
    confirm.classList.remove('show');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function initAnimations() {
    setTimeout(() => {
        document.querySelectorAll('.nav-btn').forEach((btn, i) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(30px)';
            btn.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            btn.style.transitionDelay = `${i * 0.12}s`;
            
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, 100);
        });
    }, 800);
}

function getLocation() {
    const btn = document.getElementById('geoBtn');
    const input = document.getElementById('location');
    
    if (!navigator.geolocation) {
        showLocationError('Geolocation not supported');
        return;
    }
    
    btn.classList.add('fetching');
    btn.querySelector('span').textContent = 'Getting...';
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                const address = await reverseGeocode(latitude, longitude);
                input.value = address;
                btn.classList.remove('fetching');
                btn.querySelector('span').textContent = 'Got Location!';
                btn.style.borderColor = 'var(--primary)';
                
                setTimeout(() => {
                    btn.querySelector('span').textContent = 'Get Location';
                }, 2000);
            } catch (error) {
                input.value = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                btn.classList.remove('fetching');
                btn.querySelector('span').textContent = 'Coordinates';
            }
        },
        (error) => {
            let message = 'Location denied';
            if (error.code === error.POSITION_UNAVAILABLE) {
                message = 'Location unavailable';
            } else if (error.code === error.TIMEOUT) {
                message = 'Location timeout';
            }
            showLocationError(message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`
        );
        const data = await response.json();
        
        if (data.display_name) {
            const parts = data.display_name.split(', ');
            if (parts.length >= 3) {
                return `${parts[0]}, ${parts[1]}`;
            }
            return parts.slice(0, 3).join(', ');
        }
    } catch (e) {
        console.log('Reverse geocode failed:', e);
    }
    throw new Error('No address found');
}

function showLocationError(message) {
    const btn = document.getElementById('geoBtn');
    btn.classList.remove('fetching');
    btn.classList.add('error');
    btn.querySelector('span').textContent = message;
    
    setTimeout(() => {
        btn.classList.remove('error');
        btn.querySelector('span').textContent = 'Get Location';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }
    
    init();
});

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginType');
    localStorage.removeItem('isAnonymous');
    window.location.href = 'login.html';
}

function toggleChat() {
    const widget = document.getElementById('chatWidget');
    const body = widget.querySelector('.chat-body');
    const icon = widget.querySelector('.chat-toggle-icon');
    body.classList.toggle('open');
    icon.classList.toggle('rotated');
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
    showTypingIndicator();
    
    try {
        const response = await getGroqResponse(message);
        removeTypingIndicator();
        addChatMessage(response, 'bot');
    } catch (error) {
        removeTypingIndicator();
        addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    div.innerHTML = `<p>${escapeHtml(text)}</p>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-message bot typing';
    div.id = 'typingIndicator';
    div.innerHTML = '<p>Thinking...</p>';
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

async function getGroqResponse(userMessage) {
    const systemPrompt = `You are an AI Disaster Assistant for AidBridge - a disaster relief coordination platform. You help users with:
- Information about current disasters worldwide
- Safety tips during emergencies (earthquakes, floods, wildfires, hurricanes, etc.)
- How to prepare for disasters
- General questions about relief efforts and resources
- Emergency contact information

Keep responses concise and helpful. If asked about specific current disasters, provide general guidance based on disaster types.`;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...chatHistory.slice(-5),
        { role: 'user', content: userMessage }
    ];
    
    chatHistory.push({ role: 'user', content: userMessage });
    
    try {
        const response = await fetch(GROQ_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('GROQ API error:', errorText);
            return getFallbackResponse(userMessage);
        }
        
        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content || getFallbackResponse(userMessage);
        chatHistory.push({ role: 'assistant', content: assistantMessage });
        return assistantMessage;
    } catch (error) {
        console.error('Error calling GROQ API:', error);
        return getFallbackResponse(userMessage);
    }
}

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('flood') || lowerMessage.includes('flooding')) {
        return "For flood safety: Move to higher ground immediately. Don't walk or drive through flood water. If trapped in a building, go to the roof. Listen to emergency broadcasts and follow evacuation orders.";
    }
    if (lowerMessage.includes('earthquake') || lowerMessage.includes('quake')) {
        return "During an earthquake: DROP, COVER, and HOLD ON. Stay away from windows and heavy objects. After shaking stops, check for injuries and gas leaks. Be prepared for aftershocks.";
    }
    if (lowerMessage.includes('fire') || lowerMessage.includes('wildfire')) {
        return "During wildfires: Evuate immediately if ordered. Close all windows and doors. Turn off air conditioning. Have emergency supplies ready. Follow local news for updates.";
    }
    if (lowerMessage.includes('hurricane') || lowerMessage.includes('typhoon') || lowerMessage.includes('cyclone')) {
        return "For hurricanes: Board up windows. Bring outdoor furniture inside. Fill gas tanks. Have emergency supplies for 3+ days. Evacuate if ordered by authorities.";
    }
    if (lowerMessage.includes('prepare') || lowerMessage.includes('emergency kit') || lowerMessage.includes('supply')) {
        return "Emergency kit essentials: Water (1 gallon per person per day), non-perishable food, flashlight, batteries, first aid kit, important documents, cash, phone charger, medications.";
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('request')) {
        return "To request help: Click 'Request Help' in the navigation. Fill in your location and the type of assistance needed. Our volunteers will respond as quickly as possible.";
    }
    if (lowerMessage.includes('volunteer') || lowerMessage.includes('donate')) {
        return "To volunteer: Login as 'Volunteer' using admin/admin credentials. You can help coordinate relief efforts and respond to help requests in your area.";
    }
    
    return "I'm here to help with disaster-related questions. Ask me about safety tips, how to prepare for emergencies, or request assistance. You can also check the 'Disasters' tab for current disaster information.";
}

function toggleAnonymous() {
    const checkbox = document.getElementById('anonymous');
    const nameInput = document.getElementById('name');
    checkbox.checked = !checkbox.checked;
    if (checkbox.checked) {
        nameInput.value = '';
        nameInput.placeholder = 'Anonymous';
    } else {
        nameInput.placeholder = 'Enter your name';
    }
}

function selectUrgency(level) {
    document.querySelectorAll('.urgency-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`.urgency-option.${level}`).classList.add('selected');
    document.querySelector(`input[name="urgency"][value="${level}"]`).checked = true;
}

window.showPanel = showPanel;
window.handleLogout = handleLogout;
window.toggleChat = toggleChat;
window.getLocation = getLocation;
window.selectUrgency = selectUrgency;
window.toggleAnonymous = toggleAnonymous;
window.searchDisasters = searchDisasters;
window.refreshDisasters = refreshDisasters;
window.handleChatKeyPress = handleChatKeyPress;
window.sendChatMessage = sendChatMessage;

console.log('All export functions assigned');

function displayUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userPhoto = localStorage.getItem('userPhoto');
    const loginType = localStorage.getItem('loginType');
    const emailElement = document.getElementById('userEmail');
    const volunteerBtn = document.getElementById('nav-dashboard');
    const helpBtn = document.getElementById('nav-help');
    const disastersBtn = document.getElementById('nav-disasters');
    const newsBtn = document.getElementById('nav-news');
    
    if (emailElement) {
        if (userName && loginType === 'real') {
            emailElement.innerHTML = userPhoto 
                ? `<img src="${userPhoto}" class="user-photo" alt="${userName}"> <span>${userName}</span>`
                : `<span>${userName}</span>`;
        } else if (loginType === 'anonymous') {
            emailElement.textContent = 'Guest User';
        } else {
            emailElement.textContent = userEmail || 'Volunteer';
        }
    }
    
    if (loginType === 'real') {
        if (volunteerBtn) volunteerBtn.style.display = 'flex';
        if (disastersBtn) disastersBtn.style.display = 'flex';
        if (newsBtn) newsBtn.style.display = 'flex';
        if (helpBtn) helpBtn.style.display = 'none';
    } else if (loginType === 'anonymous') {
        if (helpBtn) helpBtn.style.display = 'flex';
        if (volunteerBtn) volunteerBtn.style.display = 'none';
        if (disastersBtn) disastersBtn.style.display = 'none';
        if (newsBtn) newsBtn.style.display = 'none';
    }
}