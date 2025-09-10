// Velox Suite - Navigation Management

class NavigationManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = this.getStoredSidebarState();
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupSidebar();
        this.loadPage(this.currentPage);
    }
    
    getStoredSidebarState() {
        return localStorage.getItem('velox-sidebar-collapsed') === 'true';
    }
    
    setStoredSidebarState(collapsed) {
        localStorage.setItem('velox-sidebar-collapsed', collapsed);
    }
    
    bindEvents() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => this.toggleMobileSidebar());
        }
        
        // Menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) {
                    this.navigateTo(page);
                }
            });
        });
        
        // Close mobile sidebar when clicking outside
        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const mobileToggle = document.getElementById('mobileMenuToggle');
            
            if (window.innerWidth <= 1024 && 
                !sidebar.contains(e.target) && 
                !mobileToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                this.closeMobileSidebar();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                this.closeMobileSidebar();
            }
        });
    }
    
    setupSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (this.sidebarCollapsed && window.innerWidth > 1024) {
            sidebar.classList.add('collapsed');
        }
    }
    
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const isCollapsed = sidebar.classList.toggle('collapsed');
        
        this.sidebarCollapsed = isCollapsed;
        this.setStoredSidebarState(isCollapsed);
        
        // Emit sidebar toggle event
        window.eventBus.emit('sidebarToggled', isCollapsed);
    }
    
    toggleMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }
    
    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
    }
    
    navigateTo(page) {
        if (page === this.currentPage) return;
        
        // Update active menu item
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // Load new page
        this.loadPage(page);
        this.currentPage = page;
        
        // Close mobile sidebar after navigation
        if (window.innerWidth <= 1024) {
            this.closeMobileSidebar();
        }
        
        // Emit navigation event
        window.eventBus.emit('pageChanged', { from: this.currentPage, to: page });
    }
    
    async loadPage(page) {
        const pageContent = document.getElementById('pageContent');
        
        // Show loading state
        pageContent.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading ${page}...</p>
            </div>
        `;
        
        try {
            // Simulate loading delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Load page content
            const content = await this.getPageContent(page);
            
            // Animate page transition
            pageContent.style.opacity = '0';
            setTimeout(() => {
                pageContent.innerHTML = content;
                pageContent.style.opacity = '1';
                pageContent.classList.add('page-enter');
                
                // Initialize page-specific functionality
                this.initializePage(page);
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    pageContent.classList.remove('page-enter');
                }, 500);
            }, 150);
            
        } catch (error) {
            console.error('Error loading page:', error);
            pageContent.innerHTML = `
                <div class="error-container">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Error Loading Page</h2>
                    <p>Sorry, there was an error loading the ${page} page.</p>
                    <button class="btn btn-primary" onclick="window.navigation.loadPage('${page}')">
                        Try Again
                    </button>
                </div>
            `;
        }
    }
    
    async getPageContent(page) {
        // In a real application, this would fetch from server or load page modules
        // For this demo, we'll generate content dynamically
        
        switch (page) {
            case 'dashboard':
                return await this.getDashboardContent();
            case 'analytics':
                return await this.getAnalyticsContent();
            case 'projects':
                return await this.getProjectsContent();
            case 'team':
                return await this.getTeamContent();
            case 'calendar':
                return await this.getCalendarContent();
            case 'messages':
                return await this.getMessagesContent();
            case 'files':
                return await this.getFilesContent();
            case 'tasks':
                return await this.getTasksContent();
            case 'timetracker':
                return await this.getTimeTrackerContent();
            case 'reports':
                return await this.getReportsContent();
            case 'settings':
                return await this.getSettingsContent();
            default:
                return '<div class="error-container"><h2>Page Not Found</h2></div>';
        }
    }
    
    async getDashboardContent() {
        return `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, John! Here's what's happening with your business today.</p>
                </div>
                
                <div class="stats-grid stagger-animation">
                    <div class="stat-card">
                        <div class="stat-card::before"></div>
                        <div class="stat-header">
                            <div class="stat-icon primary">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                        <div class="stat-value" data-count-to="152840">0</div>
                        <div class="stat-label">Total Revenue</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+12.5% from last month</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-icon success">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                        <div class="stat-value" data-count-to="2847">0</div>
                        <div class="stat-label">Active Users</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+8.2% from last week</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-icon warning">
                                <i class="fas fa-shopping-cart"></i>
                            </div>
                        </div>
                        <div class="stat-value" data-count-to="1249">0</div>
                        <div class="stat-label">Orders</div>
                        <div class="stat-change negative">
                            <i class="fas fa-arrow-down"></i>
                            <span>-3.1% from yesterday</span>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-icon info">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                        <div class="stat-value" data-count-to="94">0</div>
                        <div class="stat-label">Conversion Rate</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            <span>+2.4% from last month</span>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-grid">
                    <div class="dashboard-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Revenue Analytics</h3>
                                <div class="dropdown">
                                    <button class="btn btn-ghost btn-sm">
                                        <i class="fas fa-ellipsis-v"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="chart-container">
                                    <canvas id="revenueChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Recent Activity</h3>
                                <a href="#" class="btn btn-ghost btn-sm">View All</a>
                            </div>
                            <div class="card-content">
                                <div class="activity-list" id="activityList">
                                    <!-- Activity items will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Active Projects</h3>
                                <a href="#" class="btn btn-ghost btn-sm">Manage</a>
                            </div>
                            <div class="card-content">
                                <div class="project-list" id="projectList">
                                    <!-- Project items will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dashboard-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Team Performance</h3>
                                <div class="dropdown">
                                    <button class="btn btn-ghost btn-sm">
                                        This Month <i class="fas fa-chevron-down"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="card-content">
                                <div class="team-stats" id="teamStats">
                                    <!-- Team stats will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    async getAnalyticsContent() {
        return `
            <div class="analytics-container">
                <div class="analytics-header">
                    <h1>Analytics Dashboard</h1>
                    <div class="analytics-controls">
                        <select class="form-select">
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                            <option>Last 6 months</option>
                            <option>Last year</option>
                        </select>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i>
                            Export Report
                        </button>
                    </div>
                </div>
                
                <div class="analytics-grid">
                    <div class="analytics-section full-width">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Traffic Sources</h3>
                            </div>
                            <div class="card-content">
                                <div class="chart-container">
                                    <canvas id="trafficChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analytics-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">User Engagement</h3>
                            </div>
                            <div class="card-content">
                                <div class="engagement-metrics" id="engagementMetrics">
                                    <!-- Engagement metrics will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="analytics-section">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Performance Indicators</h3>
                            </div>
                            <div class="card-content">
                                <div class="performance-indicators" id="performanceIndicators">
                                    <!-- Performance indicators will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Additional page content methods would continue here...
    // For brevity, I'll add placeholders for other pages
    
    async getProjectsContent() {
        return `<div class="projects-container"><h1>Projects Management</h1><p>Projects content coming soon...</p></div>`;
    }
    
    async getTeamContent() {
        return `<div class="team-container"><h1>Team Management</h1><p>Team content coming soon...</p></div>`;
    }
    
    async getCalendarContent() {
        return `<div class="calendar-container"><h1>Calendar</h1><p>Calendar content coming soon...</p></div>`;
    }
    
    async getMessagesContent() {
        return `<div class="messages-container"><h1>Messages</h1><p>Messages content coming soon...</p></div>`;
    }
    
    async getFilesContent() {
        return `<div class="files-container"><h1>File Manager</h1><p>File manager content coming soon...</p></div>`;
    }
    
    async getTasksContent() {
        return `<div class="tasks-container"><h1>Task Manager</h1><p>Task manager content coming soon...</p></div>`;
    }
    
    async getTimeTrackerContent() {
        return `<div class="timetracker-container"><h1>Time Tracker</h1><p>Time tracker content coming soon...</p></div>`;
    }
    
    async getReportsContent() {
        return `<div class="reports-container"><h1>Reports & Export</h1><p>Reports content coming soon...</p></div>`;
    }
    
    async getSettingsContent() {
        return `<div class="settings-container"><h1>Settings</h1><p>Settings content coming soon...</p></div>`;
    }
    
    initializePage(page) {
        // Initialize page-specific functionality
        switch (page) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'analytics':
                this.initializeAnalytics();
                break;
            // Add other page initialization as needed
        }
    }
    
    initializeDashboard() {
        // Animate counters
        const counters = document.querySelectorAll('[data-count-to]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.countTo);
            utils.animateValue(counter, 0, target, 2000);
        });
        
        // Load dashboard data
        this.loadDashboardData();
    }
    
    initializeAnalytics() {
        // Initialize analytics charts and data
        this.loadAnalyticsData();
    }
    
    async loadDashboardData() {
        // Simulate loading dashboard data
        // In a real app, this would fetch from an API
        
        // Load activity data
        const activityList = document.getElementById('activityList');
        if (activityList) {
            activityList.innerHTML = this.generateActivityItems();
        }
        
        // Load project data
        const projectList = document.getElementById('projectList');
        if (projectList) {
            projectList.innerHTML = this.generateProjectItems();
        }
        
        // Load team stats
        const teamStats = document.getElementById('teamStats');
        if (teamStats) {
            teamStats.innerHTML = this.generateTeamStats();
        }
    }
    
    generateActivityItems() {
        const activities = [
            { user: 'Alice Johnson', action: 'completed task', item: 'Website Redesign', time: '2 minutes ago', avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' },
            { user: 'Bob Smith', action: 'uploaded file', item: 'Project Brief.pdf', time: '15 minutes ago', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' },
            { user: 'Carol Davis', action: 'created project', item: 'Mobile App Development', time: '1 hour ago', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2' }
        ];
        
        return activities.map(activity => `
            <div class="activity-item">
                <img src="${activity.avatar}" alt="${activity.user}" class="avatar avatar-sm">
                <div class="activity-content">
                    <p><strong>${activity.user}</strong> ${activity.action} <em>${activity.item}</em></p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
    
    generateProjectItems() {
        const projects = [
            { name: 'Website Redesign', progress: 75, team: 4, status: 'On Track' },
            { name: 'Mobile App', progress: 45, team: 6, status: 'In Progress' },
            { name: 'API Integration', progress: 90, team: 3, status: 'Nearly Done' }
        ];
        
        return projects.map(project => `
            <div class="project-item">
                <div class="project-header">
                    <h4>${project.name}</h4>
                    <span class="badge badge-primary">${project.status}</span>
                </div>
                <div class="project-progress">
                    <div class="progress">
                        <div class="progress-bar" style="width: ${project.progress}%"></div>
                    </div>
                    <span class="progress-label">${project.progress}%</span>
                </div>
                <div class="project-team">
                    <i class="fas fa-users"></i>
                    <span>${project.team} team members</span>
                </div>
            </div>
        `).join('');
    }
    
    generateTeamStats() {
        return `
            <div class="team-stat">
                <div class="team-stat-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="team-stat-info">
                    <div class="team-stat-value">24</div>
                    <div class="team-stat-label">Tasks Completed</div>
                </div>
            </div>
            <div class="team-stat">
                <div class="team-stat-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="team-stat-info">
                    <div class="team-stat-value">187h</div>
                    <div class="team-stat-label">Hours Tracked</div>
                </div>
            </div>
            <div class="team-stat">
                <div class="team-stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="team-stat-info">
                    <div class="team-stat-value">98%</div>
                    <div class="team-stat-label">Quality Score</div>
                </div>
            </div>
        `;
    }
    
    async loadAnalyticsData() {
        // Load analytics-specific data
        // This would typically fetch from an API
    }
    
    getCurrentPage() {
        return this.currentPage;
    }
    
    isSidebarCollapsed() {
        return this.sidebarCollapsed;
    }
}

// Initialize navigation manager
window.navigation = new NavigationManager();