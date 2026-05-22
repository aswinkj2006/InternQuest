// State Management
let trackedApps = [];
let jobListings = [];
let isSophomoreFilterActive = true;
let activeTab = 'discover';
let pendingAutoTrackJob = null;

// Sophomore/2nd-Year Specific Seed Database (Fallback when offline/throttled)
const fallbackJobs = [
  {
    "id": "3144766",
    "company_name": "IIT Guwahati",
    "title": "Internet Of Things (IoT)",
    "category": "Hardware",
    "locations": ["Guwahati"],
    "url": "https://internshala.com/internship/detail/internet-of-things-iot-internship-in-guwahati-at-iit-guwahati1778385672",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 10,000 - 15,000 /month",
    "duration": "6 Months",
    "skills": ["Python", "ARM Microcontroller", "Raspberry Pi", "Embedded Systems", "Arduino", "Circuit Design", "C Programming"]
  },
  {
    "id": "3156774",
    "company_name": "Codebuddy Private Limited",
    "title": "Python AI Developer",
    "category": "AI/ML/Data",
    "locations": ["Kolkata"],
    "url": "https://internshala.com/internship/detail/python-ai-internship-in-kolkata-at-codebuddy-private-limited1779434574",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 23,000 - 30,000 /month",
    "duration": "4 Months",
    "skills": ["Python", "Artificial intelligence", "APIs", "Generative AI", "Cursor (GenAI)"]
  },
  {
    "id": "3156740",
    "company_name": "KidloLand Games",
    "title": "Game Designer",
    "category": "Product",
    "locations": ["Mumbai"],
    "url": "https://internshala.com/internship/detail/game-designer-internship-in-mumbai-at-kidloland-kids-toddler-games-private-limited1779429788",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 8,000 - 10,000 /month",
    "duration": "3 Months",
    "skills": ["Creative Writing", "UI & UX Design", "Unity Engine", "Adobe Photoshop"]
  },
  {
    "id": "3156863",
    "company_name": "Maxgen Technologies",
    "title": "Python Development",
    "category": "AI/ML/Data",
    "locations": ["Ahmedabad"],
    "url": "https://internshala.com/internship/detail/python-development-internship-in-ahmedabad-at-maxgen-technologies-private-limited1779434932",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 5,000 - 12,000 /month",
    "duration": "3 Months",
    "skills": ["CSS", "Python", "Django", "Machine Learning", "REST API"]
  },
  {
    "id": "3156747",
    "company_name": "Codebuddy Private Limited",
    "title": "ReactJS Developer",
    "category": "Software",
    "locations": ["Kolkata"],
    "url": "https://internshala.com/internship/detail/reactjs-internship-in-kolkata-at-codebuddy-private-limited1779433452",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 23,000 - 30,000 /month",
    "duration": "4 Months",
    "skills": ["JavaScript", "React", "REST API", "Redux", "Generative AI Tools"]
  },
  {
    "id": "3156737",
    "company_name": "KidloLand Games",
    "title": "Unity Game Developer",
    "category": "Software",
    "locations": ["Work from home"],
    "url": "https://internshala.com/internship/detail/work-from-home-unity-game-developer-internship-at-kidloland-kids-toddler-games-private-limited1779429619",
    "degrees": ["Bachelor's"],
    "terms": ["Summer 2026"],
    "date_posted": 1779444163,
    "stipend": "₹ 8,000 /month",
    "duration": "4 Months",
    "skills": ["Unity Engine"]
  },
  {
    "id": "3109520",
    "company_name": "VIZON",
    "title": "Front End Development",
    "category": "Product",
    "locations": ["Work from home"],
    "url": "https://internshala.com/internship/detail/work-from-home-front-end-development-internship-at-vizon1775608135",
    "degrees": ["Bachelor's"],
    "terms": ["Summer 2026"],
    "date_posted": 1779444163,
    "stipend": "₹ 12,000 - 20,000 /month",
    "duration": "3 Months",
    "skills": ["HTML", "CSS", "JavaScript", "UI & UX Design", "React"]
  },
  {
    "id": "3109521",
    "company_name": "VIZON",
    "title": "Software Development",
    "category": "Software",
    "locations": ["Work from home"],
    "url": "https://internshala.com/internship/detail/work-from-home-software-development-internship-at-vizon1775608161",
    "degrees": ["Bachelor's"],
    "terms": ["Summer 2026"],
    "date_posted": 1779444163,
    "stipend": "₹ 11,000 - 17,000 /month",
    "duration": "3 Months",
    "skills": ["Java", "JavaScript", "Python", "C++ Programming"]
  },
  {
    "id": "3149552",
    "company_name": "NovaFocus Private Limited",
    "title": "Android App Development",
    "category": "Software",
    "locations": ["Bangalore"],
    "url": "https://internshala.com/internship/detail/android-app-development-internship-in-bangalore-at-novafocus-private-limited1778780359",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 20,000 - 22,000 /month",
    "duration": "6 Months",
    "skills": ["XML", "REST API", "Android", "Kotlin", "Firebase"]
  },
  {
    "id": "3156524",
    "company_name": "Pripton Innovations LLP",
    "title": "Full Stack Development",
    "category": "Software",
    "locations": ["Work from home"],
    "url": "https://internshala.com/internship/detail/work-from-home-full-stack-development-internship-at-pripton-innovations-llp1779442095",
    "degrees": ["Bachelor's"],
    "terms": ["Summer 2026"],
    "date_posted": 1779444163,
    "stipend": "₹ 5,000 - 12,000 /month",
    "duration": "6 Months",
    "skills": ["Python", "SQL", "Git", "Node.js", "React", "FastAPI"]
  },
  {
    "id": "3156853",
    "company_name": "Aarvy Technologies",
    "title": "Flutter Development",
    "category": "Software",
    "locations": ["Gurgaon"],
    "url": "https://internshala.com/internship/detail/flutter-development-internship-in-gurgaon-at-aarvy-technologies1779434692",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 4,000 - 6,000 /month",
    "duration": "6 Months",
    "skills": ["Flutter", "REST API", "Dart", "Firebase", "Android", "iOS"]
  },
  {
    "id": "3156412",
    "company_name": "AlterBasics Technologies",
    "title": "Software Development",
    "category": "Software",
    "locations": ["Pune"],
    "url": "https://internshala.com/internship/detail/software-development-internship-in-pune-at-alterbasics-technologies-private-limited1779433561",
    "degrees": ["Bachelor's"],
    "terms": ["Co-Op"],
    "date_posted": 1779444163,
    "stipend": "₹ 20,000 /month",
    "duration": "6 Months",
    "skills": ["Python", "Generative AI Development", "Generative AI Tools"]
  }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadTrackedApplications();
  setupEventListeners();
  fetchJobListings();
  updateStats();
});

// Load applications from LocalStorage
function loadTrackedApplications() {
  const localData = localStorage.getItem('internquest_apps');
  if (localData) {
    try {
      trackedApps = JSON.parse(localData);
    } catch (e) {
      console.error("Error parsing local storage data", e);
      trackedApps = [];
    }
  } else {
    trackedApps = [];
  }
}

// Save applications to LocalStorage
function saveTrackedApplications() {
  localStorage.setItem('internquest_apps', JSON.stringify(trackedApps));
  updateStats();
  renderTrackerBoard();
}

// Fetch Listings from Local Scraped Database (listings.json)
async function fetchJobListings() {
  const gridContainer = document.getElementById('jobs-grid-container');
  try {
    const response = await fetch('./listings.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Sort postings by date (newest first)
    jobListings = data;
    console.log(`Fetched ${jobListings.length} jobs successfully from local listings.json!`);
  } catch (error) {
    console.warn("Failed to fetch live listings. Using sophomore seed fallback database.", error);
    jobListings = fallbackJobs;
  }
  
  renderDiscoverHub();
}

// Switch between Tabs
window.switchTab = function(tabName) {
  activeTab = tabName;
  
  // Update buttons
  document.getElementById('tab-discover').classList.toggle('active', tabName === 'discover');
  document.getElementById('tab-tracker').classList.toggle('active', tabName === 'tracker');
  
  // Update view visibility
  document.getElementById('view-discover').classList.toggle('active', tabName === 'discover');
  document.getElementById('view-tracker').classList.toggle('active', tabName === 'tracker');
  
  if (tabName === 'tracker') {
    renderTrackerBoard();
  } else {
    renderDiscoverHub();
  }
};

// Toggle Sophomore filter switch
window.toggleSophomoreFilter = function() {
  isSophomoreFilterActive = !isSophomoreFilterActive;
  const toggleBtn = document.getElementById('toggle-sophomore');
  toggleBtn.classList.toggle('active', isSophomoreFilterActive);
  renderDiscoverHub();
};

// Vetting if a job is suitable/optimized for a 2nd year student
function isJobSophomoreFriendly(job) {
  // 1. Degree Vetting: Must include Bachelor's if degrees are explicitly listed
  if (job.degrees && job.degrees.length > 0) {
    const hasBachelors = job.degrees.some(d => d.toLowerCase().includes("bachelor"));
    if (!hasBachelors) return false;
  }

  const title = job.title.toLowerCase();
  
  // 2. Anti-sophomore filters: Ignore PhD-only or Senior titles
  const negativeKeywords = ['phd', 'mba', 'senior', 'lead', 'staff', 'principal', 'graduate intern', 'manager', 'director'];
  if (negativeKeywords.some(word => title.includes(word))) {
    // If it mentions both sophomore and graduate we can be careful, but generally avoid
    if (!title.includes('sophomore') && !title.includes('undergrad')) {
      return false;
    }
  }

  // 3. Positive qualifiers: explicitly targets sophomore/undergrads, or general intern roles
  return true;
}

// Helper to determine if it is an official "Sophomore-specific" special program
function isSpecialSophomoreProgram(job) {
  const title = job.title.toLowerCase();
  const specialKeywords = ['sophomore', 'step', 'explore', 'star', 'undergraduate', '2nd year', 'co-op', 'futureforce', 'engage', 'path'];
  return specialKeywords.some(word => title.includes(word));
}

// Helper to extract duration in months for filtering
function getDurationInMonths(durationStr) {
  if (!durationStr) return 0;
  const match = durationStr.match(/(\d+)\s*month/i);
  if (match) {
    return parseInt(match[1]);
  }
  const weekMatch = durationStr.match(/(\d+)\s*week/i);
  if (weekMatch) {
    return parseInt(weekMatch[1]) / 4;
  }
  return 0;
}

// Render the discovery grid
function renderDiscoverHub() {
  const container = document.getElementById('jobs-grid-container');
  const searchVal = document.getElementById('search-keyword').value.toLowerCase().trim();
  const categoryVal = document.getElementById('filter-category').value;
  const locationVal = document.getElementById('filter-location').value;
  const durationVal = document.getElementById('filter-duration').value;
  
  container.innerHTML = '';
  
  // Filter listings
  const filteredListings = jobListings.filter(job => {
    // Keyword match (title or company)
    const matchesKeyword = !searchVal || 
                           job.company_name.toLowerCase().includes(searchVal) || 
                           job.title.toLowerCase().includes(searchVal);
    
    // Category match
    const matchesCategory = categoryVal === 'all' || job.category === categoryVal;
    
    // Location match
    let matchesLocation = true;
    if (locationVal !== 'all') {
      const isRemoteJob = job.locations && job.locations.some(loc => 
        loc.toLowerCase().includes("work from home") || loc.toLowerCase().includes("remote")
      );
      if (locationVal === 'remote') {
        matchesLocation = isRemoteJob;
      } else if (locationVal === 'office') {
        matchesLocation = !isRemoteJob;
      } else if (locationVal === 'delhi') {
        const ncrCities = ['delhi', 'noida', 'gurgaon', 'gurugram', 'ghaziabad', 'faridabad', 'sonipat'];
        matchesLocation = job.locations && job.locations.some(loc => 
          ncrCities.some(city => loc.toLowerCase().includes(city))
        );
      } else if (locationVal === 'mumbai') {
        const mmrCities = ['mumbai', 'thane', 'navi mumbai', 'mira bhayandar', 'navi-mumbai'];
        matchesLocation = job.locations && job.locations.some(loc => 
          mmrCities.some(city => loc.toLowerCase().includes(city))
        );
      } else {
        matchesLocation = job.locations && job.locations.some(loc => 
          loc.toLowerCase().includes(locationVal.toLowerCase())
        );
      }
    }
    
    // Duration match
    let matchesDuration = true;
    if (durationVal !== 'all') {
      const months = getDurationInMonths(job.duration);
      if (durationVal === '1-3') {
        matchesDuration = months >= 1 && months <= 3;
      } else if (durationVal === '4-6') {
        matchesDuration = months >= 4 && months <= 6;
      } else if (durationVal === '6+') {
        matchesDuration = months > 6;
      }
    }
    // Sophomore Check
    const matchesSophomore = !isSophomoreFilterActive || isJobSophomoreFriendly(job);
    
    // Hide tracked jobs
    const isTracked = trackedApps.some(app => 
      app.url === job.url || 
      (app.company.toLowerCase() === job.company_name.toLowerCase() && 
       app.role.toLowerCase() === job.title.toLowerCase())
    );
    if (isTracked) return false;
    
    return matchesKeyword && matchesCategory && matchesLocation && matchesDuration && matchesSophomore;
  });
  
  // Update Results Counter
  document.getElementById('results-count').textContent = filteredListings.length;
  
  if (filteredListings.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <h3>No Internships Found</h3>
        <p>Try clearing your search filters or turning off the "Sophomore Friendly" filter to expand the scope.</p>
      </div>
    `;
    return;
  }
  
  // Limit to first 120 elements to keep rendering lightning fast
  const displayedJobs = filteredListings.slice(0, 120);
  
  displayedJobs.forEach(job => {
    const isSpecial = isSpecialSophomoreProgram(job);
    const locationsString = job.locations ? job.locations.join(', ') : 'Location Info Unavailable';
    const isTracked = trackedApps.some(app => app.url === job.url || (app.company.toLowerCase() === job.company_name.toLowerCase() && app.role.toLowerCase() === job.title.toLowerCase()));
    
    const cardEl = document.createElement('div');
    cardEl.className = `card ${isSpecial ? 'special-glow' : ''}`;
    
    // Custom Badge
    let badgeHtml = '';
    if (isSpecial) {
      badgeHtml = `<span class="card-badge sophomore">Sophomore Pick ✨</span>`;
    } else if (job.degrees && job.degrees.includes("Bachelor's")) {
      badgeHtml = `<span class="card-badge">Undergrad 🎓</span>`;
    }
    
    // Skills Tags
    let skillsHtml = '';
    if (job.skills && job.skills.length > 0) {
      skillsHtml = `
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; margin-bottom: 16px;">
          ${job.skills.slice(0, 5).map(s => `<span class="skill-tag" style="background: #f1f5f9; border: 2px solid var(--color-border); font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 8px;">${escapeHtml(s)}</span>`).join('')}
          ${job.skills.length > 5 ? `<span style="font-size: 11px; font-weight: 700; color: var(--text-muted); align-self: center; margin-left: 2px;">+${job.skills.length - 5}</span>` : ''}
        </div>
      `;
    }
    
    cardEl.innerHTML = `
      ${badgeHtml}
      <div class="company-logo-text">${escapeHtml(job.company_name)}</div>
      <div class="job-title" title="${escapeHtml(job.title)}">${escapeHtml(job.title)}</div>
      
      <div class="job-meta-row">
        <div class="meta-pill">📍 ${escapeHtml(locationsString)}</div>
        ${job.stipend ? `<div class="meta-pill">💸 ${escapeHtml(job.stipend)}</div>` : ''}
        ${job.duration ? `<div class="meta-pill">⏱️ ${escapeHtml(job.duration)}</div>` : ''}
        <div class="meta-pill">🏷️ ${escapeHtml(job.category)}</div>
      </div>
      
      ${skillsHtml}
      
      <div class="card-footer">
        <button class="btn-3d apply" onclick="applyToJob('${escapeHtml(job.company_name)}', '${escapeHtml(job.title)}', '${escapeHtml(job.url)}', '${escapeHtml(locationsString)}', '${escapeHtml(job.terms ? job.terms[0] : 'Summer 2026')}')">
          Apply Now 🚀
        </button>
        <button class="btn-3d ${isTracked ? 'primary' : 'track'}" style="${isTracked ? 'background-color: var(--color-offer); color: white;' : ''}" onclick="toggleTrackJob('${escapeHtml(job.company_name)}', '${escapeHtml(job.title)}', '${escapeHtml(job.url)}', '${escapeHtml(locationsString)}', '${escapeHtml(job.terms ? job.terms[0] : 'Summer 2026')}')">
          ${isTracked ? 'Tracked ✓' : 'Track 📌'}
        </button>
      </div>
    `;
    container.appendChild(cardEl);
  });
  
  if (filteredListings.length > 120) {
    const moreEl = document.createElement('div');
    moreEl.className = 'empty-state';
    moreEl.style.gridColumn = '1 / -1';
    moreEl.innerHTML = `<p>Showing first 120 listings. Narrow down your keyword search to find specific roles!</p>`;
    container.appendChild(moreEl);
  }
}

// Redirect and prompt for auto-track
window.applyToJob = function(company, role, url, location, term) {
  // 1. Open official link
  window.open(url, '_blank');
  
  // 2. Open confirmation modal
  pendingAutoTrackJob = { company, role, url, location, term };
  document.getElementById('confirm-company').textContent = company;
  
  const modal = document.getElementById('confirm-track-modal');
  modal.classList.add('active');
  
  // Attach action button click listener
  const yesBtn = document.getElementById('confirm-track-yes-btn');
  yesBtn.onclick = function() {
    autoTrackPendingJob();
    closeModal('confirm-track-modal');
  };
};

function autoTrackPendingJob() {
  if (!pendingAutoTrackJob) return;
  
  const { company, role, url, location, term } = pendingAutoTrackJob;
  
  // Check if already tracked
  const alreadyTracked = trackedApps.some(app => app.url === url || (app.company.toLowerCase() === company.toLowerCase() && app.role.toLowerCase() === role.toLowerCase()));
  
  if (!alreadyTracked) {
    const newApp = {
      id: generateUUID(),
      company: company,
      role: role,
      status: 'applied',
      location: location,
      term: term,
      url: url,
      notes: 'Added automatically via InternQuest Apply redirect.',
      dateAdded: new Date().toLocaleDateString()
    };
    trackedApps.push(newApp);
    saveTrackedApplications();
    console.log("Automatically tracked application: ", newApp);
  }
  
  pendingAutoTrackJob = null;
  if (activeTab === 'discover') {
    renderDiscoverHub();
  }
}

// Add/Remove job tracker directly from Discovery Hub
window.toggleTrackJob = function(company, role, url, location, term) {
  const index = trackedApps.findIndex(app => app.url === url || (app.company.toLowerCase() === company.toLowerCase() && app.role.toLowerCase() === role.toLowerCase()));
  
  if (index > -1) {
    // Remove it
    trackedApps.splice(index, 1);
  } else {
    // Add it
    const newApp = {
      id: generateUUID(),
      company: company,
      role: role,
      status: 'applied',
      location: location,
      term: term,
      url: url,
      notes: 'Tracked from discovery board.',
      dateAdded: new Date().toLocaleDateString()
    };
    trackedApps.push(newApp);
  }
  
  saveTrackedApplications();
  renderDiscoverHub();
};

// Render Tracker Kanban Board
function renderTrackerBoard() {
  const columns = {
    applied: document.getElementById('col-applied'),
    interviewing: document.getElementById('col-interviewing'),
    offers: document.getElementById('col-offers'),
    rejected: document.getElementById('col-rejected')
  };
  
  // Reset all columns
  Object.keys(columns).forEach(key => {
    if (columns[key]) columns[key].innerHTML = '';
  });
  
  let colCounts = { applied: 0, interviewing: 0, offers: 0, rejected: 0 };
  
  // Render cards
  trackedApps.forEach(app => {
    const colId = app.status;
    const container = columns[colId];
    if (!container) return;
    
    colCounts[colId]++;
    
    const card = document.createElement('div');
    card.className = 'card tracked-card';
    card.id = `app-card-${app.id}`;
    card.draggable = true;
    card.ondragstart = (e) => dragStart(e, app.id);
    card.ondragend = (e) => dragEnd(e);
    card.onclick = () => openDetailsModal(app.id);
    
    card.innerHTML = `
      <div class="company-logo-text">${escapeHtml(app.company)}</div>
      <div class="job-title" style="font-size: 17px; margin-bottom: 8px;">${escapeHtml(app.role)}</div>
      <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px; font-weight: 600;">
        📅 ${escapeHtml(app.term || 'Summer 2026')} | 📍 ${escapeHtml(app.location || 'Remote')}
      </div>
      
      <div class="card-actions" onclick="event.stopPropagation();">
        <button class="btn-3d" onclick="deleteApplication('${app.id}')" style="background-color: var(--color-rejected-bg); border-color: var(--color-rejected); color: var(--color-rejected); padding: 4px 8px; border-radius: 8px; box-shadow: 0 2px 0 var(--color-rejected); font-size: 11px;">🗑️</button>
        <div style="display: flex; gap: 6px;">
          ${app.url ? `<a href="${escapeHtml(app.url)}" target="_blank" class="btn-3d" style="padding: 4px 8px; border-radius: 8px; box-shadow: 0 2px 0 var(--color-border); font-size: 11px;">🔗 Apply</a>` : ''}
          <button class="btn-3d primary" onclick="openEditModal('${app.id}')" style="padding: 4px 8px; border-radius: 8px; box-shadow: 0 2px 0 var(--color-border); font-size: 11px; background-color: var(--color-accent);">✏️ Edit</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Update Column counters
  document.getElementById('col-applied-count').textContent = colCounts.applied;
  document.getElementById('col-interview-count').textContent = colCounts.interviewing;
  document.getElementById('col-offer-count').textContent = colCounts.offers;
  document.getElementById('col-rejected-count').textContent = colCounts.rejected;
  
  // Render empty states
  Object.keys(columns).forEach(key => {
    if (colCounts[key] === 0) {
      columns[key].innerHTML = `
        <div class="empty-state" style="padding: 24px 12px; border: 2px dashed #cbd5e1; border-radius: 18px;">
          <p style="font-size: 13px;">No applications here.</p>
        </div>
      `;
    }
  });
}

// Drag & Drop Handlers
let draggedCardId = null;

function dragStart(event, id) {
  draggedCardId = id;
  event.dataTransfer.setData('text/plain', id);
  // Add dragging class after a microsecond delay
  setTimeout(() => {
    document.getElementById(`app-card-${id}`).classList.add('dragging');
  }, 0);
}

function dragEnd(event) {
  if (draggedCardId) {
    const el = document.getElementById(`app-card-${draggedCardId}`);
    if (el) el.classList.remove('dragging');
  }
  draggedCardId = null;
}

window.allowDrop = function(event) {
  event.preventDefault();
  const container = event.currentTarget;
  container.classList.add('drag-over');
};

window.dragLeave = function(event) {
  const container = event.currentTarget;
  container.classList.remove('drag-over');
};

window.drop = function(event, targetStatus) {
  event.preventDefault();
  const container = event.currentTarget;
  container.classList.remove('drag-over');
  
  const id = event.dataTransfer.getData('text/plain');
  const app = trackedApps.find(a => a.id === id);
  
  if (app && app.status !== targetStatus) {
    const oldStatus = app.status;
    app.status = targetStatus;
    
    // Play celebration if changed to offer!
    if (targetStatus === 'offers') {
      triggerOfferCelebration();
    }
    
    saveTrackedApplications();
  }
};

// Stats calculations
function updateStats() {
  let counts = { applied: 0, interviewing: 0, offers: 0, rejected: 0 };
  trackedApps.forEach(app => {
    if (counts.hasOwnProperty(app.status)) {
      counts[app.status]++;
    }
  });
  
  document.getElementById('stat-applied-count').textContent = counts.applied;
  document.getElementById('stat-interview-count').textContent = counts.interviewing;
  document.getElementById('stat-offer-count').textContent = counts.offers;
  document.getElementById('stat-rejected-count').textContent = counts.rejected;
}

// Modals Setup
window.openAddModal = function() {
  document.getElementById('app-form').reset();
  document.getElementById('form-app-id').value = '';
  document.getElementById('modal-title').textContent = 'Track New Application';
  document.getElementById('add-modal').classList.add('active');
};

window.openEditModal = function(id) {
  const app = trackedApps.find(a => a.id === id);
  if (!app) return;
  
  document.getElementById('form-app-id').value = app.id;
  document.getElementById('form-company').value = app.company;
  document.getElementById('form-role').value = app.role;
  document.getElementById('form-status').value = app.status;
  document.getElementById('form-location').value = app.location || '';
  document.getElementById('form-term').value = app.term || '';
  document.getElementById('form-url').value = app.url || '';
  document.getElementById('form-notes').value = app.notes || '';
  
  document.getElementById('modal-title').textContent = 'Edit Tracked Internship';
  document.getElementById('add-modal').classList.add('active');
};

window.closeModal = function(modalId) {
  document.getElementById(modalId).classList.remove('active');
};

// Save Application form logic
window.saveApplication = function(event) {
  event.preventDefault();
  
  const id = document.getElementById('form-app-id').value;
  const company = document.getElementById('form-company').value.trim();
  const role = document.getElementById('form-role').value.trim();
  const status = document.getElementById('form-status').value;
  const location = document.getElementById('form-location').value.trim();
  const term = document.getElementById('form-term').value.trim();
  const url = document.getElementById('form-url').value.trim();
  const notes = document.getElementById('form-notes').value.trim();
  
  if (id) {
    // Edit Mode
    const app = trackedApps.find(a => a.id === id);
    if (app) {
      const oldStatus = app.status;
      app.company = company;
      app.role = role;
      app.status = status;
      app.location = location;
      app.term = term;
      app.url = url;
      app.notes = notes;
      
      if (status === 'offers' && oldStatus !== 'offers') {
        triggerOfferCelebration();
      }
    }
  } else {
    // Add Mode
    const newApp = {
      id: generateUUID(),
      company,
      role,
      status,
      location,
      term,
      url,
      notes,
      dateAdded: new Date().toLocaleDateString()
    };
    trackedApps.push(newApp);
    
    if (status === 'offers') {
      triggerOfferCelebration();
    }
  }
  
  saveTrackedApplications();
  closeModal('add-modal');
  
  if (activeTab === 'discover') {
    renderDiscoverHub();
  }
};

window.deleteApplication = function(id) {
  if (confirm("Are you sure you want to delete this tracked application?")) {
    trackedApps = trackedApps.filter(a => a.id !== id);
    saveTrackedApplications();
    closeModal('details-modal');
    if (activeTab === 'discover') renderDiscoverHub();
  }
};

// Detail View Modal logic
let detailsActiveAppId = null;

window.openDetailsModal = function(id) {
  const app = trackedApps.find(a => a.id === id);
  if (!app) return;
  
  detailsActiveAppId = id;
  
  document.getElementById('details-company').textContent = app.company;
  document.getElementById('details-role').textContent = app.role;
  document.getElementById('details-notes').value = app.notes || '';
  
  // Render Meta Row
  const metaContainer = document.getElementById('details-meta');
  metaContainer.innerHTML = `
    <div class="meta-pill">📍 ${escapeHtml(app.location || 'Remote')}</div>
    <div class="meta-pill">📅 ${escapeHtml(app.term || 'Summer 2026')}</div>
    <div class="meta-pill">📅 Added: ${app.dateAdded}</div>
  `;
  
  // Update link button
  const linkBtn = document.getElementById('details-link-btn');
  if (app.url) {
    linkBtn.href = app.url;
    linkBtn.style.display = 'inline-flex';
  } else {
    linkBtn.style.display = 'none';
  }
  
  // Update Delete button action
  document.getElementById('details-delete-btn').onclick = () => deleteApplication(app.id);
  
  // Update status select classes
  updateDetailsModalStatusClasses(app.status);
  
  // Save button action
  document.getElementById('details-save-btn').onclick = () => {
    app.notes = document.getElementById('details-notes').value;
    saveTrackedApplications();
    closeModal('details-modal');
  };
  
  document.getElementById('details-modal').classList.add('active');
};

function updateDetailsModalStatusClasses(activeStatus) {
  const statuses = ['applied', 'interviewing', 'offers', 'rejected'];
  statuses.forEach(s => {
    const btn = document.getElementById(`status-btn-${s}`);
    if (s === activeStatus) {
      btn.style.backgroundColor = 'var(--color-accent)';
      btn.style.color = 'white';
      btn.style.transform = 'translateY(2px)';
      btn.style.boxShadow = '0 0px 0 var(--color-border)';
    } else {
      btn.style.backgroundColor = 'var(--bg-panel)';
      btn.style.color = 'var(--text-main)';
      btn.style.transform = 'translateY(-2px)';
      btn.style.boxShadow = '0 4px 0 var(--color-border)';
    }
  });
}

window.updateDetailsStatus = function(newStatus) {
  if (!detailsActiveAppId) return;
  const app = trackedApps.find(a => a.id === detailsActiveAppId);
  if (app) {
    const oldStatus = app.status;
    app.status = newStatus;
    updateDetailsModalStatusClasses(newStatus);
    
    if (newStatus === 'offers' && oldStatus !== 'offers') {
      triggerOfferCelebration();
    }
    
    saveTrackedApplications();
  }
};

// Event Listeners setup
function setupEventListeners() {
  // Search input change events
  const searchInput = document.getElementById('search-keyword');
  searchInput.addEventListener('input', debounce(() => {
    renderDiscoverHub();
  }, 300));
  
  const filterCat = document.getElementById('filter-category');
  filterCat.addEventListener('change', () => renderDiscoverHub());
  
  const filterLoc = document.getElementById('filter-location');
  if (filterLoc) filterLoc.addEventListener('change', () => renderDiscoverHub());
  
  const filterDur = document.getElementById('filter-duration');
  if (filterDur) filterDur.addEventListener('change', () => renderDiscoverHub());
}

// Canvas Confetti Celebration Logic
function triggerOfferCelebration() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7', '#ff7a00'];
  const particles = [];
  
  // Create particles
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height + 20,
      radius: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: Math.random() * 20 - 10,
      vy: -(Math.random() * 15 + 15),
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      opacity: 1
    });
  }
  
  let animationFrameId;
  const startTime = Date.now();
  
  function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let active = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.rotationSpeed;
      
      // Fade out particles near their death
      if (p.vy > 0) {
        p.opacity -= 0.015;
      }
      
      if (p.opacity > 0 && p.y < canvas.height + 20 && p.x > -20 && p.x < canvas.width + 20) {
        active = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        
        // Draw squares / rectangles
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 1.5);
        ctx.restore();
      }
    });
    
    // Continue loop for 4 seconds maximum
    if (active && Date.now() - startTime < 4000) {
      animationFrameId = requestAnimationFrame(updateConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }
  
  updateConfetti();
  
  // Listen for resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, { once: true });
}

// Utilities
function generateUUID() {
  return 'app-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now().toString(36);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
