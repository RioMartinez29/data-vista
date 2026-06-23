// ===== GLOBAL VARIABLES =====
let rawData = [];
let cleanedData = [];
let columnTypes = {};
let analysisResults = {};
let charts = {};
let demoCharts = {};
let selectedFile = null;
let selectedFileSize = null;
let showLanding = true;
let showAnalysis = false;

// ===== SPLASH SCREEN ANIMATION =====
window.addEventListener('load', () => {
    // Start typing animation for subtitle
    const subtitle = document.querySelector('.splash-subtitle');
    const text = 'Ubah data jadi lebih mudah dipahami';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 2000);
    
    // Hide splash screen after 6 seconds
    setTimeout(() => {
        document.getElementById('splash-screen').classList.add('hidden');
        document.getElementById('main-content').classList.add('visible');
        
        // Show footer
        setTimeout(() => {
            document.getElementById('footer').classList.add('visible');
        }, 300);
        
        // Make features section visible immediately
        document.querySelector('.features-section').classList.add('visible');
        
        // Initialize scroll animations
        initScrollAnimations();
        
        // Initialize demo charts
        initDemoCharts();
        
        // Generate particles
        generateParticles();
    }, 6000);
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        // Skip features section from scroll observer since it should always be visible
        if (!section.classList.contains('features-section')) {
            section.classList.add('fade-in-section');
            observer.observe(section);
        }
    });
}

// ===== SCROLL FUNCTIONS =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToUpload() {
    document.getElementById('upload-section').scrollIntoView({ behavior: 'smooth' });
}

function scrollToDemo() {
    document.getElementById('demo-dashboard').scrollIntoView({ behavior: 'smooth' });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== PARTICLE GENERATION =====
function generateParticles() {
    const particleBackground = document.getElementById('particle-background');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particleBackground.appendChild(particle);
    }
}

// ===== DEMO CHARTS INITIALIZATION =====
function initDemoCharts() {
    // Demo Bar Chart
    const demoBarCtx = document.getElementById('demo-bar-chart').getContext('2d');
    demoCharts.bar = new Chart(demoBarCtx, {
        type: 'bar',
        data: {
            labels: ['Elektronik', 'Fashion', 'Makanan', 'Otomotif', 'Kesehatan'],
            datasets: [{
                label: 'Penjualan',
                data: [450, 320, 280, 190, 150],
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: '#00D4FF',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#151932',
                    titleColor: '#00D4FF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#00D4FF',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    ticks: { color: '#B8B8D1', font: { family: 'Poppins' } },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: '#B8B8D1', font: { family: 'Poppins' } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });

    // Demo Pie Chart
    const demoPieCtx = document.getElementById('demo-pie-chart').getContext('2d');
    demoCharts.pie = new Chart(demoPieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Elektronik', 'Fashion', 'Makanan', 'Otomotif', 'Kesehatan'],
            datasets: [{
                data: [35, 25, 20, 12, 8],
                backgroundColor: [
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(251, 191, 36, 0.8)'
                ],
                borderColor: '#151932',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: true,
                duration: 2000
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#B8B8D1', font: { family: 'Poppins' }, padding: 20 }
                }
            }
        }
    });

    // Demo Line Chart
    const demoLineCtx = document.getElementById('demo-line-chart').getContext('2d');
    demoCharts.line = new Chart(demoLineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Penjualan',
                data: [30, 45, 35, 50, 40, 60],
                borderColor: '#00D4FF',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00D4FF',
                pointBorderColor: '#151932',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#151932',
                    titleColor: '#00D4FF',
                    bodyColor: '#FFFFFF',
                    borderColor: '#00D4FF',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    ticks: { color: '#B8B8D1', font: { family: 'Poppins' } },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: '#B8B8D1', font: { family: 'Poppins' } },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            }
        }
    });
}

// ===== UPLOAD FUNCTIONALITY =====
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const analyzeBtn = document.getElementById('analyze-btn');
const uploadSection = document.getElementById('upload-section');

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
        handleFile(file);
    } else {
        alert('Please upload a CSV file.');
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

function handleFile(file) {
    // Store file information
    selectedFile = file.name;
    selectedFileSize = formatFileSize(file.size);
    
    Papa.parse(file, {
        header: true,
        complete: (results) => {
            rawData = results.data.filter(row => Object.values(row).some(val => val !== ''));
            
            if (rawData.length === 0) {
                alert('File is empty or invalid.');
                return;
            }
            
            // Show selected file container
            const selectedFileContainer = document.getElementById('selected-file-container');
            selectedFileContainer.style.display = 'block';
            selectedFileContainer.style.animation = 'fadeInUp 0.5s ease-out';
            
            // Update file info
            document.getElementById('selected-file-name').textContent = file.name;
            document.getElementById('selected-file-size').textContent = formatFileSize(file.size);
            
            // Show upload button
            analyzeBtn.style.display = 'block';
            analyzeBtn.style.animation = 'fadeInUp 0.5s ease-out';
            
            // Add file loaded animation
            uploadArea.style.borderColor = '#22D3EE';
            uploadArea.querySelector('.upload-text').innerHTML = `✅ File loaded: <span class="highlight">${file.name}</span>`;
        },
        error: (error) => {
            alert('Error reading file: ' + error.message);
        }
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ===== SAMPLE DATA MODE =====
function loadSampleData() {
    // Generate sample data
    const sampleData = [];
    const categories = ['Elektronik', 'Fashion', 'Makanan', 'Otomotif', 'Kesehatan'];
    
    for (let i = 0; i < 50; i++) {
        sampleData.push({
            id: i + 1,
            kategori: categories[Math.floor(Math.random() * categories.length)],
            harga: Math.floor(Math.random() * 1000000) + 100000,
            stok: Math.floor(Math.random() * 100) + 10,
            penjualan: Math.floor(Math.random() * 50) + 5
        });
    }
    
    rawData = sampleData;
    
    // Directly analyze without showing upload
    analyzeDataDirect();
}

function analyzeDataDirect() {
    // Detect column types
    columnTypes = detectColumnTypes(rawData);
    
    // Clean data
    cleanedData = cleanData(rawData, columnTypes);
    
    // Analyze data
    analysisResults = analyzeDataEngine(cleanedData, columnTypes);
    
    // Display results
    displayResults();
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

// ===== DATA ANALYSIS =====
async function analyzeData() {
    // Validate that a file has been selected
    if (!selectedFile || rawData.length === 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.style.display = 'block';
        errorMessage.style.animation = 'fadeInUp 0.3s ease-out';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
        return;
    }
    
    const loadingContainer = document.getElementById('loading-container');
    const progressFill = document.getElementById('progress-fill');
    const loadingText = document.getElementById('loading-text');
    
    // Hide error message
    document.getElementById('error-message').style.display = 'none';
    
    // Hide upload button and show loading
    analyzeBtn.style.display = 'none';
    loadingContainer.classList.add('visible');
    
    // Step 1: Reading data
    loadingText.textContent = 'Membaca data...';
    progressFill.style.width = '20%';
    await sleep(600);
    
    // Step 2: Detect column types
    loadingText.textContent = 'Mendeteksi tipe data...';
    progressFill.style.width = '40%';
    columnTypes = detectColumnTypes(rawData);
    await sleep(600);
    
    // Step 3: Clean data
    loadingText.textContent = 'Membersihkan data...';
    progressFill.style.width = '60%';
    cleanedData = cleanData(rawData, columnTypes);
    await sleep(600);
    
    // Step 4: Analyze patterns
    loadingText.textContent = 'Menganalisis pola...';
    progressFill.style.width = '80%';
    analysisResults = analyzeDataEngine(cleanedData, columnTypes);
    await sleep(600);
    
    // Step 5: Complete
    loadingText.textContent = 'Selesai!';
    progressFill.style.width = '100%';
    await sleep(500);
    
    // Hide loading and show results
    loadingContainer.classList.remove('visible');
    displayResults();
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ===== COLUMN TYPE DETECTION =====
function detectColumnTypes(data) {
    const types = {};
    const headers = Object.keys(data[0]);
    
    headers.forEach(header => {
        const values = data.map(row => row[header]).filter(val => val !== '' && val !== null);
        
        // Check if numeric
        const numericCount = values.filter(val => !isNaN(parseFloat(val))).length;
        const numericRatio = numericCount / values.length;
        
        // Check if date
        const dateCount = values.filter(val => !isNaN(Date.parse(val))).length;
        const dateRatio = dateCount / values.length;
        
        if (numericRatio > 0.8) {
            types[header] = 'numeric';
        } else if (dateRatio > 0.8) {
            types[header] = 'date';
        } else {
            types[header] = 'category';
        }
    });
    
    return types;
}

// ===== DATA CLEANING =====
function cleanData(data, types) {
    const cleaned = [];
    const seen = new Set();
    
    data.forEach(row => {
        // Remove empty rows
        if (Object.values(row).every(val => val === '' || val === null)) {
            return;
        }
        
        // Remove duplicates (simple hash-based)
        const rowHash = JSON.stringify(row);
        if (seen.has(rowHash)) {
            return;
        }
        seen.add(rowHash);
        
        // Handle missing values
        const cleanedRow = {};
        Object.keys(row).forEach(key => {
            if (row[key] === '' || row[key] === null) {
                if (types[key] === 'numeric') {
                    cleanedRow[key] = 0;
                } else {
                    cleanedRow[key] = 'Unknown';
                }
            } else {
                cleanedRow[key] = row[key];
            }
        });
        
        cleaned.push(cleanedRow);
    });
    
    return cleaned;
}

// ===== ANALYSIS ENGINE =====
function analyzeDataEngine(data, types) {
    const results = {
        statistics: {},
        trends: {},
        outliers: {},
        categories: {}
    };
    
    const headers = Object.keys(data[0]);
    
    headers.forEach(header => {
        const values = data.map(row => row[header]);
        
        if (types[header] === 'numeric') {
            const numericValues = values.map(v => parseFloat(v)).filter(v => !isNaN(v));
            
            if (numericValues.length > 0) {
                results.statistics[header] = {
                    average: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
                    min: Math.min(...numericValues),
                    max: Math.max(...numericValues),
                    total: numericValues.reduce((a, b) => a + b, 0)
                };
                
                // Trend detection
                const firstHalf = numericValues.slice(0, Math.floor(numericValues.length / 2));
                const secondHalf = numericValues.slice(Math.floor(numericValues.length / 2));
                const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
                const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
                
                const diff = secondAvg - firstAvg;
                const threshold = firstAvg * 0.1;
                
                if (diff > threshold) {
                    results.trends[header] = 'naik';
                } else if (diff < -threshold) {
                    results.trends[header] = 'turun';
                } else {
                    results.trends[header] = 'stabil';
                }
                
                // Outlier detection using standard deviation
                const mean = results.statistics[header].average;
                const variance = numericValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / numericValues.length;
                const stdDev = Math.sqrt(variance);
                const outliers = numericValues.filter(val => Math.abs(val - mean) > 2 * stdDev);
                results.outliers[header] = outliers.length;
            }
        } else if (types[header] === 'category') {
            const frequency = {};
            values.forEach(val => {
                frequency[val] = (frequency[val] || 0) + 1;
            });
            
            const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
            results.categories[header] = {
                frequency: frequency,
                top: sorted.slice(0, 5),
                total: values.length
            };
        }
    });
    
    return results;
}

// ===== DISPLAY RESULTS =====
function displayResults() {
    // Update state
    showLanding = false;
    showAnalysis = true;
    
    // Update file info in results
    if (selectedFile) {
        document.getElementById('results-file-name').textContent = selectedFile;
        document.getElementById('results-file-size').textContent = selectedFileSize || '-';
    }
    
    // Update stats
    document.getElementById('stat-rows').textContent = cleanedData.length;
    document.getElementById('stat-cols').textContent = Object.keys(cleanedData[0]).length;
    document.getElementById('stat-clean').textContent = Math.round((cleanedData.length / rawData.length) * 100) + '%';
    
    const totalOutliers = Object.values(analysisResults.outliers).reduce((a, b) => a + b, 0);
    document.getElementById('stat-outliers').textContent = totalOutliers;
    
    // Hide landing sections
    uploadSection.style.display = 'none';
    document.getElementById('demo-dashboard').style.display = 'none';
    document.getElementById('how-it-works').style.display = 'none';
    
    // Keep features section visible
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
        featuresSection.style.display = 'block';
        featuresSection.style.opacity = '1';
        featuresSection.style.visibility = 'visible';
    }
    
    // Show results section with animation
    const resultsSection = document.getElementById('results-section');
    resultsSection.style.display = 'block';
    resultsSection.style.opacity = '1';
    resultsSection.style.visibility = 'visible';
    resultsSection.classList.add('visible');
    
    // Create charts
    createCharts();
    
    // Generate insights
    generateInsights();
    
    // Populate data table
    populateDataTable();
}

// ===== CREATE CHARTS =====
function createCharts() {
    // Destroy existing charts
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
    
    const headers = Object.keys(cleanedData[0]);
    const categoryHeader = headers.find(h => columnTypes[h] === 'category');
    const numericHeader = headers.find(h => columnTypes[h] === 'numeric');
    
    // Bar Chart - Category distribution
    if (categoryHeader && analysisResults.categories[categoryHeader]) {
        const categoryData = analysisResults.categories[categoryHeader];
        const labels = categoryData.top.map(item => item[0]);
        const data = categoryData.top.map(item => item[1]);
        
        const barCtx = document.getElementById('bar-chart').getContext('2d');
        charts.bar = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: categoryHeader,
                    data: data,
                    backgroundColor: 'rgba(0, 212, 255, 0.6)',
                    borderColor: '#00D4FF',
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#151932',
                        titleColor: '#00D4FF',
                        bodyColor: '#FFFFFF',
                        borderColor: '#00D4FF',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        ticks: { 
                            color: '#B8B8D1',
                            font: { family: 'Poppins' }
                        },
                        grid: { 
                            color: 'rgba(255, 255, 255, 0.1)',
                            display: false
                        }
                    },
                    y: {
                        ticks: { 
                            color: '#B8B8D1',
                            font: { family: 'Poppins' }
                        },
                        grid: { 
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
    
    // Pie Chart - Composition
    if (categoryHeader && analysisResults.categories[categoryHeader]) {
        const categoryData = analysisResults.categories[categoryHeader];
        const labels = categoryData.top.map(item => item[0]);
        const data = categoryData.top.map(item => item[1]);
        const colors = [
            'rgba(0, 212, 255, 0.8)',
            'rgba(124, 58, 237, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)'
        ];
        
        const pieCtx = document.getElementById('pie-chart').getContext('2d');
        charts.pie = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#FFFFFF',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    duration: 2000
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { 
                            color: '#475569',
                            font: { family: 'Poppins' },
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#0F172A',
                        bodyColor: '#475569',
                        borderColor: '#22D3EE',
                        borderWidth: 1,
                        padding: 12
                    }
                }
            }
        });
    }
    
    // Line Chart - Trend
    if (numericHeader && analysisResults.statistics[numericHeader]) {
        const labels = cleanedData.map((_, i) => i + 1);
        const data = cleanedData.map(row => parseFloat(row[numericHeader]) || 0);
        
        const lineCtx = document.getElementById('line-chart').getContext('2d');
        charts.line = new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: numericHeader,
                    data: data,
                    borderColor: '#22D3EE',
                    backgroundColor: 'rgba(34, 211, 238, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#22D3EE',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#151932',
                        titleColor: '#00D4FF',
                        bodyColor: '#FFFFFF',
                        borderColor: '#00D4FF',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false
                    }
                },
                scales: {
                    x: {
                        ticks: { 
                            color: '#B8B8D1',
                            font: { family: 'Poppins' }
                        },
                        grid: { 
                            color: 'rgba(255, 255, 255, 0.1)',
                            display: false
                        }
                    },
                    y: {
                        ticks: { 
                            color: '#B8B8D1',
                            font: { family: 'Poppins' }
                        },
                        grid: { 
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// ===== GENERATE INSIGHTS =====
function generateInsights() {
    // Populate insight cards
    const trendInsight = document.getElementById('trend-insight');
    const anomalyInsight = document.getElementById('anomaly-insight');
    const categoryInsight = document.getElementById('category-insight');
    const summaryInsight = document.getElementById('summary-insight');
    
    // Trend insight
    const trendEntries = Object.entries(analysisResults.trends);
    if (trendEntries.length > 0) {
        const [header, trend] = trendEntries[0];
        const trendText = {
            'naik': 'menunjukkan tren naik',
            'turun': 'menunjukkan tren turun',
            'stabil': 'menunjukkan tren stabil'
        };
        typeText(trendInsight, `Data <span class="highlight">${header}</span> ${trendText[trend]}`);
    }
    
    // Anomaly insight
    const totalOutliers = Object.values(analysisResults.outliers).reduce((a, b) => a + b, 0);
    if (totalOutliers > 0) {
        typeText(anomalyInsight, `Ditemukan <span class="highlight">${totalOutliers}</span> data tidak normal`);
    } else {
        typeText(anomalyInsight, 'Tidak ada anomali ditemukan');
    }

    // Category insight
    const categoryEntries = Object.entries(analysisResults.categories);
    if (categoryEntries.length > 0) {
        const [header, data] = categoryEntries[0];
        if (data.top.length > 0) {
            typeText(categoryInsight, `Kategori terbanyak: <span class="highlight">${data.top[0][0]}</span>`);
        }
    }

    // Summary insight
    const statEntries = Object.entries(analysisResults.statistics);
    if (statEntries.length > 0) {
        const [header, stats] = statEntries[0];
        typeText(summaryInsight, `Rata-rata <span class="highlight">${header}</span>: <span class="highlight">${stats.average.toFixed(2)}</span>`);
    }
}

// ===== DOWNLOAD PDF =====
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set white background for entire document
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F');
    
    let yPos = 20;
    
    // Header Section
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('DataVista Report', 20, yPos);
    yPos += 12;
    
    // Subtitle with date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`Generated on: ${currentDate}`, 20, yPos);
    yPos += 15;
    
    // Divider line
    doc.setDrawColor(0, 212, 255);
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 15;
    
    // File Information
    if (selectedFile) {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('File Information', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
        doc.text(`File Name: ${selectedFile}`, 20, yPos);
        yPos += 6;
        doc.text(`File Size: ${selectedFileSize || '-'}`, 20, yPos);
        yPos += 12;
    }
    
    // Data Summary Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Ringkasan Statistik', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Rows: ${cleanedData.length}`, 20, yPos);
    yPos += 6;
    doc.text(`Total Columns: ${Object.keys(cleanedData[0]).length}`, 20, yPos);
    yPos += 6;
    const dataValidPercent = Math.round((cleanedData.length / rawData.length) * 100);
    doc.text(`Data Valid: ${dataValidPercent}%`, 20, yPos);
    yPos += 6;
    
    const totalOutliers = Object.values(analysisResults.outliers).reduce((a, b) => a + b, 0);
    doc.text(`Outlier Count: ${totalOutliers}`, 20, yPos);
    yPos += 12;
    
    // Statistics Section
    if (Object.keys(analysisResults.statistics).length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'bold');
        doc.text('Statistik Detail', 20, yPos);
        yPos += 10;
        
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
        
        Object.entries(analysisResults.statistics).forEach(([header, stats]) => {
            if (yPos > 250) {
                doc.addPage();
                doc.setFillColor(255, 255, 255);
                doc.rect(0, 0, 210, 297, 'F');
                yPos = 20;
            }
            doc.text(`${header}:`, 20, yPos);
            yPos += 6;
            doc.text(`  Average: ${stats.average.toFixed(2)}`, 25, yPos);
            yPos += 6;
            doc.text(`  Min: ${stats.min.toFixed(2)}`, 25, yPos);
            yPos += 6;
            doc.text(`  Max: ${stats.max.toFixed(2)}`, 25, yPos);
            yPos += 6;
            doc.text(`  Total: ${stats.total.toFixed(2)}`, 25, yPos);
            yPos += 8;
        });
    }
    
    // Insights Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Insight & Analisis', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    
    const trendInsight = document.getElementById('trend-insight').innerText;
    const anomalyInsight = document.getElementById('anomaly-insight').innerText;
    const categoryInsight = document.getElementById('category-insight').innerText;
    const summaryInsight = document.getElementById('summary-insight').innerText;
    
    if (yPos > 230) {
        doc.addPage();
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F');
        yPos = 20;
    }
    
    // Trend Analysis
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Trend Analysis:', 20, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(trendInsight, 25, yPos);
    yPos += 10;
    
    // Category Analysis
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Kategori Dominan:', 20, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(categoryInsight, 25, yPos);
    yPos += 10;
    
    // Summary
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Summary Hasil:', 20, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(summaryInsight, 25, yPos);
    yPos += 15;
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text('Generated by DataVista', 20, 280);
    doc.text('Made by Rio Martinez', 20, 285);
    
    doc.save('datavista-report.pdf');
}

// ===== TYPING ANIMATION =====
function typeText(element, text, speed = 30) {
    element.innerHTML = '';
    let i = 0;
    const type = () => {
        if (i < text.length) {
            if (text[i] === '<') {
                const closeIndex = text.indexOf('>', i);
                element.innerHTML += text.substring(i, closeIndex + 1);
                i = closeIndex + 1;
            } else {
                element.innerHTML += text[i];
                i++;
            }
            setTimeout(type, speed);
        }
    };
    type();
}

// ===== POPULATE DATA TABLE =====
function populateDataTable() {
    const tableHead = document.getElementById('table-head');
    const tableBody = document.getElementById('table-body');
    
    if (cleanedData.length === 0) return;
    
    const headers = Object.keys(cleanedData[0]);
    const displayData = cleanedData.slice(0, 100); // Show first 100 rows
    
    // Create table header
    let headHTML = '<tr>';
    headers.forEach(header => {
        headHTML += `<th>${header}</th>`;
    });
    headHTML += '</tr>';
    tableHead.innerHTML = headHTML;
    
    // Create table body
    let bodyHTML = '';
    displayData.forEach(row => {
        bodyHTML += '<tr>';
        headers.forEach(header => {
            bodyHTML += `<td>${row[header] || '-'}</td>`;
        });
        bodyHTML += '</tr>';
    });
    tableBody.innerHTML = bodyHTML;
    
    // Add filter event listener
    document.getElementById('filter-select').addEventListener('change', filterDataTable);
}

// ===== FILTER DATA TABLE =====
function filterDataTable() {
    const filterValue = document.getElementById('filter-select').value;
    const tableBody = document.getElementById('table-body');
    
    if (filterValue === 'all') {
        populateDataTable();
        return;
    }
    
    const headers = Object.keys(cleanedData[0]);
    const filteredHeaders = headers.filter(h => columnTypes[h] === filterValue);
    
    if (filteredHeaders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="' + headers.length + '">No data found</td></tr>';
        return;
    }
    
    const displayData = cleanedData.slice(0, 100);
    
    let bodyHTML = '';
    displayData.forEach(row => {
        bodyHTML += '<tr>';
        filteredHeaders.forEach(header => {
            bodyHTML += `<td>${row[header] || '-'}</td>`;
        });
        bodyHTML += '</tr>';
    });
    
    // Update header
    const tableHead = document.getElementById('table-head');
    let headHTML = '<tr>';
    filteredHeaders.forEach(header => {
        headHTML += `<th>${header}</th>`;
    });
    headHTML += '</tr>';
    tableHead.innerHTML = headHTML;
    
    tableBody.innerHTML = bodyHTML;
}

// ===== DOWNLOAD REPORT =====
function downloadReport() {
    // Create report content
    let report = 'DataVista Analysis Report\n';
    report += '========================\n\n';
    report += `Total Rows: ${cleanedData.length}\n`;
    report += `Total Columns: ${Object.keys(cleanedData[0]).length}\n`;
    report += `Data Valid: ${Math.round((cleanedData.length / rawData.length) * 100)}%\n\n`;
    
    // Statistics
    report += 'Statistics:\n';
    Object.entries(analysisResults.statistics).forEach(([header, stats]) => {
        report += `\n${header}:\n`;
        report += `  Average: ${stats.average.toFixed(2)}\n`;
        report += `  Min: ${stats.min.toFixed(2)}\n`;
        report += `  Max: ${stats.max.toFixed(2)}\n`;
        report += `  Total: ${stats.total.toFixed(2)}\n`;
    });
    
    // Trends
    report += '\nTrends:\n';
    Object.entries(analysisResults.trends).forEach(([header, trend]) => {
        report += `${header}: ${trend}\n`;
    });
    
    // Outliers
    report += '\nOutliers:\n';
    Object.entries(analysisResults.outliers).forEach(([header, count]) => {
        report += `${header}: ${count}\n`;
    });
    
    // Download as text file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datavista-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== GO BACK FUNCTION =====
function goBack() {
    // Update state
    showLanding = true;
    showAnalysis = false;
    
    const resultsSection = document.getElementById('results-section');
    
    // Fade out results section
    resultsSection.style.animation = 'fadeOut 0.5s ease-out';
    
    setTimeout(() => {
        // Reset all data and UI
        resetDashboard();
        
        // Show landing sections with animation
        uploadSection.style.display = 'block';
        uploadSection.style.animation = 'fadeInUp 0.5s ease-out';
        
        document.getElementById('demo-dashboard').style.display = 'block';
        document.getElementById('demo-dashboard').style.animation = 'fadeInUp 0.5s ease-out';
        
        document.getElementById('how-it-works').style.display = 'block';
        document.getElementById('how-it-works').style.animation = 'fadeInUp 0.5s ease-out';
        
        // Ensure features section is visible
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection) {
            featuresSection.style.display = 'block';
            featuresSection.style.opacity = '1';
            featuresSection.style.visibility = 'visible';
        }
        
        // Scroll to upload section
        uploadSection.scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// ===== RESET DASHBOARD =====
function resetDashboard() {
    // Reset data
    rawData = [];
    cleanedData = [];
    columnTypes = {};
    analysisResults = {};
    selectedFile = null;
    selectedFileSize = null;
    
    // Destroy charts
    Object.values(charts).forEach(chart => chart.destroy());
    charts = {};
    
    // Reset UI
    document.getElementById('results-section').classList.remove('visible');
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('results-section').style.animation = '';
    document.getElementById('loading-container').classList.remove('visible');
    document.getElementById('analyze-btn').style.display = 'none';
    document.getElementById('file-input').value = '';
    
    // Hide selected file container
    document.getElementById('selected-file-container').style.display = 'none';
    
    // Reset insight cards
    document.getElementById('trend-insight').textContent = '-';
    document.getElementById('anomaly-insight').textContent = '-';
    document.getElementById('category-insight').textContent = '-';
    document.getElementById('summary-insight').textContent = '-';
    
    // Reset file info in results
    document.getElementById('results-file-name').textContent = '-';
    document.getElementById('results-file-size').textContent = '-';
    
    // Reset data table
    document.getElementById('table-head').innerHTML = '';
    document.getElementById('table-body').innerHTML = '';
    document.getElementById('filter-select').value = 'all';
    
    // Reset upload area
    uploadArea.style.borderColor = '';
    uploadArea.querySelector('.upload-text').innerHTML = 'Drop file CSV di sini';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
