// State management
let currentUser = null;
let currentStep = 1;
const totalSteps = 3;

// DOM Elements
const pages = {
    login: document.getElementById('loginPage'),
    dashboard: document.getElementById('dashboardPage'),
    form: document.getElementById('formPage'),
    results: document.getElementById('resultsPage')
};

// Navigation Functions
function showPage(pageId) {
    Object.values(pages).forEach(page => page.classList.add('hidden'));
    pages[pageId].classList.remove('hidden');
}

// Login Handling
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    if (!email.endsWith('@cet.ac.in')) {
        document.getElementById('loginError').textContent = 'Please use your CET email address';
        return;
    }

    currentUser = { email };
    document.getElementById('userEmail').textContent = email;
    showPage('dashboard');
});

// Logout Handling
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    showPage('login');
});

// Dashboard Navigation
document.getElementById('startAssessment').addEventListener('click', () => {
    showPage('form');
});

document.getElementById('viewResults').addEventListener('click', () => {
    showPage('results');
});

// Form Navigation
const formSteps = ['step1', 'step2', 'step3'];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

function updateFormButtons() {
    prevBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.toggle('hidden', currentStep === totalSteps);
    submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
}

function showFormStep(step) {
    formSteps.forEach((stepId, index) => {
        document.getElementById(stepId).classList.toggle('hidden', index + 1 !== step);
    });
    currentStep = step;
    updateFormButtons();
}

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        showFormStep(currentStep - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
        showFormStep(currentStep + 1);
    }
});

// Form Submission
document.getElementById('povertyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Calculate poverty score (simplified version)
    const score = calculatePovertyScore(data);
    updateResults(score);
    showPage('results');
});

function calculatePovertyScore(data) {
    let score = 0;
    
    // Simple scoring logic (this would be more complex in production)
    const annualIncomePerCapita = data.annualIncome / data.familySize;
    if (annualIncomePerCapita < 27000) score += 30;
    else if (annualIncomePerCapita < 54000) score += 20;
    else if (annualIncomePerCapita < 108000) score += 10;

    if (data.drinkingWater === 'Poor') score += 20;
    if (data.debtAmount > data.annualIncome * 0.5) score += 20;

    return Math.min(score, 100);
}

// Results Page
const scholarships = {
    critical: [
        {
            name: "e-Grantz",
            description: "Government scholarship for SC/ST/OEC students",
            eligibility: "Family income below ₹2.5L/year",
            link: "https://egrantz.kerala.gov.in"
        },
        {
            name: "Reliance Foundation Scholarship",
            description: "Merit-cum-means scholarship for engineering students",
            eligibility: "Family income below ₹2.5L/year",
            link: "https://reliancefoundation.org/scholarships"
        }
       
    ]
};

function updateResults(score) {
    document.querySelector('.score-value').textContent = `${score}/100`;
    document.querySelector('.score-progress').style.width = `${score}%`;
    
    const scholarshipList = document.getElementById('scholarshipList');
    scholarshipList.innerHTML = scholarships.critical.map(scholarship => `
        <div class="scholarship-card">
            <h4>${scholarship.name}</h4>
            <p>${scholarship.description}</p>
            <p>Eligibility: ${scholarship.eligibility}</p>
            <a href="${scholarship.link}" target="_blank" rel="noopener noreferrer">Apply Now →</a>
        </div>
    `).join('');
}

// Back to Dashboard
document.getElementById('backToDashboard').addEventListener('click', () => {
    showPage('dashboard');
});

// Initialize
showPage('login');