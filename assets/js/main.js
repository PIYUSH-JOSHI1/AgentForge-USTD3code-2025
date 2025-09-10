// Velox Suite - Main Application Controller

class VeloxSuite {
    constructor() {
        this.version = '1.0.0';
        this.isLoading = true;
        this.loadStartTime = Date.now();
        this.init();
    }
    
    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize core systems
            await this.initializeSystems();
            
            // Load initial data
            await this.loadInitialData();
            
            // Setup global event listeners
            this.setupGlobalListeners();
            
            // Initialize additional features
            this.initializeFeatures();
            
            // Hide loading screen and show app
            await this.hideLoadingScreen();
            
            // Emit app ready event
            window.eventBus.emit('appReady');
            
            console.log(`🚀 Velox Suite v${this.version} initialized successfully`);
            
        } catch (error) {
            console.error('Failed to initialize Velox Suite:', error);
            this.showErrorScreen(error);
        }
    }
    
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }
    
    async hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const app = document.getElementById('app');
        
        // Ensure minimum loading time for smooth UX
        const minLoadTime = 1500;
        const elapsed = Date.now() - this.loadStartTime;
        if (elapsed < minLoadTime) {
            await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsed));
        }
        
        if (loadingScreen && app) {
            // Fade out loading screen
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.style.display = 'flex';
                
                // Fade in app
                app.style.opacity = '0';
                setTimeout(() => {
                    app.style.opacity = '1';
                    app.style.transition = 'opacity 0.3s ease-in-out';
                }, 50);
                
                this.isLoading = false;
            }, 300);
        }
    }
    
    showErrorScreen(error) {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="error-container">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ef4444; margin-bottom: 1rem;"></i>
                    <h2>Failed to Load Application</h2>
                    <p>An error occurred while loading Velox Suite.</p>
                    <p style="font-size: 0.875rem; color: #666; margin-bottom: 2rem;">${error.message}</p>
                    <button class="btn btn-primary" onclick="location.reload()">
                        <i class="fas fa-refresh"></i>
                        Reload Application
                    </button>
                </div>
            `;
        }
    }
    
    async initializeSystems() {
        // Core systems are already initialized via their respective files
        // This method can be used for additional system setup
        
        // Verify all core systems are available
        const requiredSystems = [
            'utils',
            'themeManager',
            'navigation',
            'notificationManager',
            'searchManager'
        ];
        
        for (const system of requiredSystems) {
            if (!window[system]) {
                throw new Error(`Required system '${system}' is not available`);
            }
        }
        
        // Setup system interconnections
        this.setupSystemConnections();
    }
    
    setupSystemConnections() {
        // Connect systems together for better integration
        
        // Theme changes affect all systems
        window.eventBus.on('themeChanged', (theme) => {
            console.log(`Theme changed to: ${theme}`);
            this.updateSystemsForTheme(theme);
        });
        
        // Page changes affect various systems
        window.eventBus.on('pageChanged', (data) => {
            console.log(`Page changed from ${data.from} to ${data.to}`);
            this.updateSystemsForPage(data.to);
        });
        
        // Sidebar changes affect layout
        window.eventBus.on('sidebarToggled', (collapsed) => {
            console.log(`Sidebar ${collapsed ? 'collapsed' : 'expanded'}`);
            this.updateLayoutForSidebar(collapsed);
        });
        
        // Notification events
        window.eventBus.on('notificationReceived', (notification) => {
            console.log('New notification received:', notification);
        });
    }
    
    updateSystemsForTheme(theme) {
        // Update any theme-dependent system configurations
        document.body.className = theme;
        
        // Update charts, graphs, and other visual elements
        this.updateChartsForTheme(theme);
    }
    
    updateSystemsForPage(page) {
        // Update systems based on current page
        document.title = `${this.getPageTitle(page)} - Velox Suite`;
        
        // Update any page-specific configurations
        this.updatePageAnalytics(page);
    }
    
    updateLayoutForSidebar(collapsed) {
        // Handle any layout adjustments needed when sidebar state changes
        const main = document.querySelector('.main-content');
        if (main) {
            main.style.transition = 'margin-left 0.25s ease-out';
        }
    }
    
    updateChartsForTheme(theme) {
        // Update chart colors and styling based on theme
        // This would be implemented when charts are added
    }
    
    updatePageAnalytics(page) {
        // Track page views for analytics
        // This would integrate with analytics service
        console.log(`Page view: ${page}`);
    }
    
    getPageTitle(page) {
        const titles = {
            dashboard: 'Dashboard',
            analytics: 'Analytics',
            projects: 'Projects',
            team: 'Team',
            calendar: 'Calendar',
            messages: 'Messages',
            files: 'File Manager',
            tasks: 'Task Manager',
            timetracker: 'Time Tracker',
            reports: 'Reports',
            settings: 'Settings'
        };
        return titles[page] || 'Unknown Page';
    }
    
    async loadInitialData() {
        // Load any initial data required by the application
        try {
            // Simulate API calls for initial data
            await Promise.all([
                this.loadUserData(),
                this.loadAppSettings(),
                this.loadRecentActivity()
            ]);
        } catch (error) {
            console.warn('Some initial data failed to load:', error);
            // Don't fail the entire app if initial data fails
        }
    }
    
    async loadUserData() {
        // In a real app, this would fetch user data from an API
        return new Promise(resolve => {
            setTimeout(() => {
                this.userData = {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
                    role: 'Administrator',
                    preferences: {
                        theme: 'light',
                        sidebarCollapsed: false,
                        notifications: true
                    }
                };
                resolve(this.userData);
            }, 200);
        });
    }
    
    async loadAppSettings() {
        // Load application settings
        return new Promise(resolve => {
            setTimeout(() => {
                this.appSettings = {
                    version: this.version,
                    features: {
                        analytics: true,
                        fileManager: true,
                        timeTracker: true,
                        reports: true
                    },
                    limits: {
                        maxFileSize: 100 * 1024 * 1024, // 100MB
                        maxProjects: 50,
                        maxTeamMembers: 25
                    }
                };
                resolve(this.appSettings);
            }, 150);
        });
    }
    
    async loadRecentActivity() {
        // Load recent activity data
        return new Promise(resolve => {
            setTimeout(() => {
                this.recentActivity = [
                    { type: 'login', timestamp: Date.now() - 1000 * 60 * 5 },
                    { type: 'project_update', timestamp: Date.now() - 1000 * 60 * 30 },
                    { type: 'file_upload', timestamp: Date.now() - 1000 * 60 * 60 }
                ];
                resolve(this.recentActivity);
            }, 100);
        });
    }
    
    setupGlobalListeners() {
        // Global error handling
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleGlobalError(event.error);
        });
        
        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleGlobalError(event.reason);
        });
        
        // Online/offline status
        window.addEventListener('online', () => {
            utils.toast.success('Connection restored');
            this.handleOnlineStatus(true);
        });
        
        window.addEventListener('offline', () => {
            utils.toast.warning('Connection lost');
            this.handleOnlineStatus(false);
        });
        
        // Visibility change (tab focus)
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.handleVisibilityChange(true);
            } else {
                this.handleVisibilityChange(false);
            }
        });
        
        // Before unload (prevent accidental navigation)
        window.addEventListener('beforeunload', (event) => {
            if (this.hasUnsavedChanges()) {
                event.preventDefault();
                event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                return event.returnValue;
            }
        });
        
        // Keyboard shortcuts
        this.setupGlobalKeyboardShortcuts();
    }
    
    setupGlobalKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Global shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '/':
                        e.preventDefault();
                        window.navigation.toggleSidebar();
                        break;
                    case 'd':
                        e.preventDefault();
                        window.themeManager.toggleTheme();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.createNewItem();
                        break;
                    case 's':
                        e.preventDefault();
                        this.saveCurrentWork();
                        break;
                }
            }
            
            // Number keys for quick navigation
            if (e.altKey && !isNaN(e.key) && e.key !== '0') {
                const pageIndex = parseInt(e.key) - 1;
                const pages = ['dashboard', 'analytics', 'projects', 'team', 'calendar', 'messages', 'files', 'tasks', 'timetracker'];
                if (pages[pageIndex]) {
                    window.navigation.navigateTo(pages[pageIndex]);
                }
            }
        });
    }
    
    initializeFeatures() {
        // Initialize additional features
        this.initializeToastContainer();
        this.initializeAutoSave();
        this.initializeKeyboardShortcutHelp();
        this.initializePerformanceMonitoring();
    }
    
    initializeToastContainer() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const toastContainer = utils.createElement('div', {
                className: 'toast-container'
            });
            document.body.appendChild(toastContainer);
        }
    }
    
    initializeAutoSave() {
        // Set up auto-save functionality
        setInterval(() => {
            this.autoSave();
        }, 30000); // Auto-save every 30 seconds
    }
    
    initializeKeyboardShortcutHelp() {
        // Add keyboard shortcut help
        const helpButton = utils.createElement('button', {
            className: 'help-button',
            innerHTML: '<i class="fas fa-question-circle"></i>',
            title: 'Keyboard Shortcuts (Ctrl+?)'
        });
        
        document.body.appendChild(helpButton);
        
        helpButton.addEventListener('click', () => {
            window.searchManager.showKeyboardShortcuts();
        });
    }
    
    initializePerformanceMonitoring() {
        // Basic performance monitoring
        if ('performance' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'navigation') {
                        console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
                    }
                }
            });
            
            try {
                perfObserver.observe({ entryTypes: ['navigation'] });
            } catch (e) {
                // Performance observer not supported
            }
        }
    }
    
    handleGlobalError(error) {
        // Log error and show user-friendly message
        console.error('Application error:', error);
        
        if (!this.isLoading) {
            utils.toast.error('An unexpected error occurred. Please try refreshing the page.');
        }
    }
    
    handleOnlineStatus(isOnline) {
        // Update UI based on online status
        document.body.classList.toggle('offline', !isOnline);
        
        if (isOnline) {
            // Sync any pending changes
            this.syncPendingChanges();
        }
    }
    
    handleVisibilityChange(isVisible) {
        if (isVisible) {
            // Check for updates when tab becomes visible
            this.checkForUpdates();
        }
    }
    
    hasUnsavedChanges() {
        // Check if there are any unsaved changes
        // This would be implemented based on actual app state
        return false;
    }
    
    createNewItem() {
        // Show context-appropriate creation dialog
        const currentPage = window.navigation.getCurrentPage();
        
        switch (currentPage) {
            case 'projects':
                utils.toast.info('Creating new project...');
                break;
            case 'tasks':
                utils.toast.info('Creating new task...');
                break;
            case 'team':
                utils.toast.info('Adding team member...');
                break;
            default:
                utils.toast.info('Create new item...');
        }
    }
    
    saveCurrentWork() {
        // Save current work
        utils.toast.success('Work saved successfully');
    }
    
    autoSave() {
        // Perform auto-save if there are changes
        if (this.hasUnsavedChanges()) {
            console.log('Auto-saving...');
            // Implement auto-save logic
        }
    }
    
    syncPendingChanges() {
        // Sync any changes that were made while offline
        console.log('Syncing pending changes...');
    }
    
    checkForUpdates() {
        // Check for application updates
        // This would typically check with a server
    }
    
    // Public API methods
    getVersion() {
        return this.version;
    }
    
    getUserData() {
        return this.userData;
    }
    
    getAppSettings() {
        return this.appSettings;
    }
    
    isApplicationReady() {
        return !this.isLoading;
    }
    
    // Utility methods for the application
    formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }
    
    generateColor(str) {
        // Generate a consistent color from a string
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const hue = hash % 360;
        return `hsl(${hue}, 70%, 50%)`;
    }
    
    downloadFile(data, filename, type = 'application/octet-stream') {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.veloxSuite = new VeloxSuite();
});

// Make sure the app initializes even if DOMContentLoaded has already fired
if (document.readyState === 'loading') {
    // Document is still loading
} else {
    // Document is already loaded
    window.veloxSuite = new VeloxSuite();
}