class RoadmapApp {
    constructor() {
        this.currentRoadmapId = null;
        this.progress = {};
        this.init();
        this.initTheme();

    }
    initTheme() {
        // Initialize theme based on localStorage or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            document.documentElement.classList.toggle('theme-dark', savedTheme === 'dark');
        } else {
            document.documentElement.classList.toggle('theme-dark', prefersDark);
        }

        // Set up theme toggle event listener
        const themeCheckbox = document.querySelector('.theme-switch__checkbox');
        if (themeCheckbox) {
            themeCheckbox.checked = document.documentElement.classList.contains('theme-dark');
            themeCheckbox.addEventListener('change', (e) => {
                document.documentElement.classList.toggle('theme-dark', e.target.checked);
                localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
                this.updateThemeColors();
            });
        }
    }

    updateThemeColors() {
        const isDark = document.documentElement.classList.contains('theme-dark');
        
        document.documentElement.style.setProperty('--background-color', isDark ? '#1a1a1a' : '#f9fafb');
        document.documentElement.style.setProperty('--text-primary', isDark ? '#ffffff' : '#111827');
        document.documentElement.style.setProperty('--text-secondary', isDark ? '#9ca3af' : '#4b5563');
        document.documentElement.style.setProperty('--border-color', isDark ? '#374151' : '#e5e7eb');
    }

    init() {
        this.renderRoadmaps();
        this.setupEventListeners();
        this.setupBackButton();
    }

    setupBackButton() {
        const backButton = document.createElement('button');
        backButton.textContent = '← Back to Roadmaps';
        backButton.className = 'back-button';
        backButton.onclick = () => {
            document.getElementById('roadmaps-view').classList.remove('hidden');
            document.getElementById('roadmap-detail').classList.add('hidden');
        };
        document.getElementById('roadmap-detail').insertBefore(
            backButton,
            document.getElementById('roadmap-detail').firstChild
        );
    }

    setupEventListeners() {
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.filterRoadmaps(e.target.value);
        });

        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('roadmap-progress-')) {
                this.progress = JSON.parse(e.newValue || '{}');
                this.updateProgress();
                this.updateCheckboxes();
            }
        });
    }

    filterRoadmaps(query) {
        const filteredRoadmaps = roadmapsData.filter(roadmap => 
            roadmap.title.toLowerCase().includes(query.toLowerCase()) ||
            roadmap.description.toLowerCase().includes(query.toLowerCase()) ||
            roadmap.topics.some(topic => topic.toLowerCase().includes(query.toLowerCase()))
        );
        this.renderRoadmaps(filteredRoadmaps);
    }

    renderRoadmaps(roadmaps = roadmapsData) {
        const container = document.getElementById('roadmaps-grid');
        container.innerHTML = '';

        roadmaps.forEach(roadmap => {
            const card = this.createRoadmapCard(roadmap);
            container.appendChild(card);
        });
    }

    createRoadmapCard(roadmap) {
        const card = document.createElement('div');
        card.className = 'roadmap-card';
        card.innerHTML = `
            <div class="icon-container" style="background-color: ${roadmap.color}; color: white;">
                ${roadmap.icon}
            </div>
            <h3>${roadmap.title}</h3>
            <p>${roadmap.description}</p>
            <div class="topics-container">
                ${roadmap.topics.map(topic => `
                    <span class="topic-tag">${topic}</span>
                `).join('')}
            </div>
        `;

        card.addEventListener('click', () => this.showRoadmapDetail(roadmap.id));
        return card;
    }

    showRoadmapDetail(id) {
        this.currentRoadmapId = id;
        const roadmap = getRoadmapData(id);
        if (!roadmap) return;

        const savedProgress = localStorage.getItem(`roadmap-progress-${id}`);
        this.progress = savedProgress ? JSON.parse(savedProgress) : {};

        document.getElementById('roadmaps-view').classList.add('hidden');
        document.getElementById('roadmap-detail').classList.remove('hidden');

        document.getElementById('roadmap-title').textContent = roadmap.title;
        document.getElementById('roadmap-description').textContent = roadmap.description;

        this.renderSections(roadmap.sections);
        
        this.updateProgress();
    }

    renderSections(sections) {
        const container = document.getElementById('sections-container');
        container.innerHTML = '';

        sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            sectionElement.innerHTML = `
                <div class="section-header">
                    ${section.title}
                    <span class="arrow">▼</span>
                </div>
                <div class="section-content">
                    ${section.items.map(item => this.createItemHTML(section.title, item)).join('')}
                </div>
            `;

            sectionElement.querySelector('.section-header').addEventListener('click', () => {
                const content = sectionElement.querySelector('.section-content');
                content.classList.toggle('active');
                const arrow = sectionElement.querySelector('.arrow');
                arrow.style.transform = content.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            });

            container.appendChild(sectionElement);
        });

        this.setupItemHandlers();
    }

    createItemHTML(sectionTitle, item) {
        const isCompleted = this.progress[`${sectionTitle}-${item}`];
        return `
            <div class="item ${isCompleted ? 'completed' : ''}" data-item-id="${sectionTitle}-${item}">
                <div class="item-left">
                    <div class="checkbox ${isCompleted ? 'checked' : ''}" 
                         data-section="${sectionTitle}" 
                         data-item="${item}">
                    </div>
                    <span>${item}</span>
                </div>
                <button class="learn-button" 
                        onclick="window.open('https://www.google.com/search?q=learn ${encodeURIComponent(item)}', '_blank')">
                    Learn
                </button>
            </div>
        `;
    }

    setupItemHandlers() {
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                const item = e.target.dataset.item;
                this.toggleProgress(section, item);
                e.stopPropagation(); // Prevent event bubbling
            });
        });
    }

    toggleProgress(section, item) {
        const key = `${section}-${item}`;
        this.progress[key] = !this.progress[key];
        
        const itemElement = document.querySelector(`[data-item-id="${key}"]`);
        if (itemElement) {
            itemElement.classList.toggle('completed');
            itemElement.querySelector('.checkbox').classList.toggle('checked');
        }

        this.updateProgress();
        
        localStorage.setItem(`roadmap-progress-${this.currentRoadmapId}`, JSON.stringify(this.progress));
    }

    updateProgress() {
        const roadmap = getRoadmapData(this.currentRoadmapId);
        if (!roadmap) return;

        let totalItems = 0;
        let completedItems = 0;

        roadmap.sections.forEach(section => {
            section.items.forEach(item => {
                totalItems++;
                if (this.progress[`${section.title}-${item}`]) {
                    completedItems++;
                }
            });
        });

        // Calculate and update progress percentage
        const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
        const roundedPercentage = Math.round(progressPercentage);

        // Update UI elements
        const percentageElement = document.getElementById('progress-percentage');
        const progressFillElement = document.getElementById('progress-fill');

        if (percentageElement && progressFillElement) {
            percentageElement.textContent = `${roundedPercentage}%`;
            progressFillElement.style.width = `${progressPercentage}%`;
        }
    }

    updateCheckboxes() {
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            const section = checkbox.dataset.section;
            const item = checkbox.dataset.item;
            const key = `${section}-${item}`;
            const isCompleted = this.progress[key];
            
            checkbox.classList.toggle('checked', isCompleted);
            const itemElement = checkbox.closest('.item');
            if (itemElement) {
                itemElement.classList.toggle('completed', isCompleted);
            }
        });
    }
    
    }

   

document.addEventListener('DOMContentLoaded', () => {
    new RoadmapApp();
});