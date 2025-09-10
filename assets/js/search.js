// Velox Suite - Search and Command Palette

class SearchManager {
    constructor() {
        this.searchData = [];
        this.commandPaletteOpen = false;
        this.selectedIndex = -1;
        this.init();
    }
    
    init() {
        this.loadSearchData();
        this.bindEvents();
    }
    
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const commandPalette = document.getElementById('commandPalette');
        const commandInput = document.getElementById('commandInput');
        
        // Header search
        if (searchInput) {
            searchInput.addEventListener('input', utils.debounce((e) => {
                this.handleSearch(e.target.value);
            }, 300));
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.executeSearch(e.target.value);
                }
            });
        }
        
        // Command palette
        if (commandInput) {
            commandInput.addEventListener('input', utils.debounce((e) => {
                this.handleCommandSearch(e.target.value);
            }, 200));
            
            commandInput.addEventListener('keydown', (e) => {
                this.handleCommandKeydown(e);
            });
        }
        
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleCommandPalette();
            }
            
            // Escape to close command palette
            if (e.key === 'Escape' && this.commandPaletteOpen) {
                this.closeCommandPalette();
            }
        });
        
        // Click outside to close command palette
        if (commandPalette) {
            commandPalette.addEventListener('click', (e) => {
                if (e.target === commandPalette) {
                    this.closeCommandPalette();
                }
            });
        }
    }
    
    loadSearchData() {
        // In a real app, this would be loaded from an API or built from the app's data
        this.searchData = [
            // Pages
            { type: 'page', title: 'Dashboard', description: 'Main dashboard overview', action: () => window.navigation.navigateTo('dashboard'), icon: 'fas fa-home' },
            { type: 'page', title: 'Analytics', description: 'View analytics and reports', action: () => window.navigation.navigateTo('analytics'), icon: 'fas fa-chart-line' },
            { type: 'page', title: 'Projects', description: 'Manage your projects', action: () => window.navigation.navigateTo('projects'), icon: 'fas fa-folder' },
            { type: 'page', title: 'Team', description: 'Team management and collaboration', action: () => window.navigation.navigateTo('team'), icon: 'fas fa-users' },
            { type: 'page', title: 'Calendar', description: 'Schedule and events', action: () => window.navigation.navigateTo('calendar'), icon: 'fas fa-calendar' },
            { type: 'page', title: 'Messages', description: 'Communication and chat', action: () => window.navigation.navigateTo('messages'), icon: 'fas fa-comments' },
            { type: 'page', title: 'File Manager', description: 'Manage files and documents', action: () => window.navigation.navigateTo('files'), icon: 'fas fa-file-alt' },
            { type: 'page', title: 'Task Manager', description: 'Track and manage tasks', action: () => window.navigation.navigateTo('tasks'), icon: 'fas fa-tasks' },
            { type: 'page', title: 'Time Tracker', description: 'Track time and productivity', action: () => window.navigation.navigateTo('timetracker'), icon: 'fas fa-clock' },
            { type: 'page', title: 'Reports', description: 'Generate and export reports', action: () => window.navigation.navigateTo('reports'), icon: 'fas fa-chart-bar' },
            { type: 'page', title: 'Settings', description: 'Application settings', action: () => window.navigation.navigateTo('settings'), icon: 'fas fa-cog' },
            
            // Commands
            { type: 'command', title: 'Toggle Dark Mode', description: 'Switch between light and dark themes', action: () => window.themeManager.toggleTheme(), icon: 'fas fa-moon' },
            { type: 'command', title: 'Toggle Sidebar', description: 'Collapse or expand sidebar', action: () => window.navigation.toggleSidebar(), icon: 'fas fa-bars' },
            { type: 'command', title: 'Mark All Notifications Read', description: 'Clear all unread notifications', action: () => window.notificationManager.markAllAsRead(), icon: 'fas fa-bell-slash' },
            { type: 'command', title: 'Export Data', description: 'Export application data', action: () => this.exportData(), icon: 'fas fa-download' },
            { type: 'command', title: 'Clear Cache', description: 'Clear application cache', action: () => this.clearCache(), icon: 'fas fa-trash' },
            
            // Quick actions
            { type: 'action', title: 'Create New Project', description: 'Start a new project', action: () => this.createNewProject(), icon: 'fas fa-plus' },
            { type: 'action', title: 'Add Team Member', description: 'Invite a new team member', action: () => this.addTeamMember(), icon: 'fas fa-user-plus' },
            { type: 'action', title: 'Schedule Meeting', description: 'Schedule a new meeting', action: () => this.scheduleMeeting(), icon: 'fas fa-calendar-plus' },
            { type: 'action', title: 'Upload File', description: 'Upload a new file', action: () => this.uploadFile(), icon: 'fas fa-upload' },
            { type: 'action', title: 'Create Task', description: 'Create a new task', action: () => this.createTask(), icon: 'fas fa-plus-circle' },
            
            // Help
            { type: 'help', title: 'Keyboard Shortcuts', description: 'View available keyboard shortcuts', action: () => this.showKeyboardShortcuts(), icon: 'fas fa-keyboard' },
            { type: 'help', title: 'Help & Support', description: 'Get help and support', action: () => this.showHelp(), icon: 'fas fa-question-circle' },
            { type: 'help', title: 'What\'s New', description: 'View latest updates and features', action: () => this.showWhatsNew(), icon: 'fas fa-star' }
        ];
    }
    
    handleSearch(query) {
        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }
        
        const results = this.search(query);
        this.displaySearchResults(results);
    }
    
    handleCommandSearch(query) {
        const results = this.search(query);
        this.displayCommandResults(results);
        this.selectedIndex = -1;
    }
    
    search(query) {
        if (!query.trim()) return [];
        
        const searchTerms = query.toLowerCase().split(' ');
        
        return this.searchData.filter(item => {
            const searchableText = `${item.title} ${item.description}`.toLowerCase();
            return searchTerms.every(term => searchableText.includes(term));
        }).slice(0, 10); // Limit to 10 results
    }
    
    displaySearchResults(results) {
        // This would typically show results in a dropdown under the search input
        console.log('Search results:', results);
    }
    
    displayCommandResults(results) {
        const commandResults = document.getElementById('commandResults');
        if (!commandResults) return;
        
        if (results.length === 0) {
            commandResults.innerHTML = `
                <div class="command-item">
                    <i class="fas fa-search"></i>
                    <span>No results found</span>
                </div>
            `;
            return;
        }
        
        const html = results.map((result, index) => `
            <div class="command-item ${index === this.selectedIndex ? 'selected' : ''}" data-index="${index}">
                <i class="${result.icon}"></i>
                <div class="command-item-content">
                    <div class="command-item-title">${this.highlightMatch(result.title, document.getElementById('commandInput').value)}</div>
                    <div class="command-item-description">${result.description}</div>
                </div>
                <div class="command-item-type">
                    <span class="badge badge-secondary">${result.type}</span>
                </div>
            </div>
        `).join('');
        
        commandResults.innerHTML = html;
        
        // Add click handlers
        const commandItems = commandResults.querySelectorAll('.command-item');
        commandItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.executeCommand(results[index]);
            });
            
            item.addEventListener('mouseenter', () => {
                this.selectedIndex = index;
                this.updateSelection();
            });
        });
    }
    
    highlightMatch(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    handleCommandKeydown(e) {
        const commandResults = document.getElementById('commandResults');
        if (!commandResults) return;
        
        const items = commandResults.querySelectorAll('.command-item');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.updateSelection();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0) {
                    const query = e.target.value;
                    const results = this.search(query);
                    if (results[this.selectedIndex]) {
                        this.executeCommand(results[this.selectedIndex]);
                    }
                }
                break;
                
            case 'Escape':
                this.closeCommandPalette();
                break;
        }
    }
    
    updateSelection() {
        const commandResults = document.getElementById('commandResults');
        if (!commandResults) return;
        
        const items = commandResults.querySelectorAll('.command-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        // Scroll selected item into view
        if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }
    
    executeSearch(query) {
        const results = this.search(query);
        if (results.length > 0) {
            this.executeCommand(results[0]);
        } else {
            utils.toast.info(`No results found for "${query}"`);
        }
    }
    
    executeCommand(command) {
        try {
            command.action();
            this.closeCommandPalette();
            
            // Track command usage for analytics
            this.trackCommandUsage(command);
        } catch (error) {
            console.error('Error executing command:', error);
            utils.toast.error('Error executing command');
        }
    }
    
    toggleCommandPalette() {
        if (this.commandPaletteOpen) {
            this.closeCommandPalette();
        } else {
            this.openCommandPalette();
        }
    }
    
    openCommandPalette() {
        const commandPalette = document.getElementById('commandPalette');
        const commandInput = document.getElementById('commandInput');
        
        if (commandPalette && commandInput) {
            commandPalette.classList.add('open');
            this.commandPaletteOpen = true;
            
            // Focus input and select all text
            setTimeout(() => {
                commandInput.focus();
                commandInput.select();
            }, 100);
            
            // Show initial results (all commands)
            this.displayCommandResults(this.searchData.slice(0, 10));
        }
    }
    
    closeCommandPalette() {
        const commandPalette = document.getElementById('commandPalette');
        const commandInput = document.getElementById('commandInput');
        
        if (commandPalette && commandInput) {
            commandPalette.classList.remove('open');
            this.commandPaletteOpen = false;
            commandInput.value = '';
            this.selectedIndex = -1;
        }
    }
    
    clearSearchResults() {
        // Clear any displayed search results
    }
    
    trackCommandUsage(command) {
        // In a real app, this would send analytics data
        console.log('Command used:', command.title);
    }
    
    // Command implementations
    exportData() {
        utils.toast.info('Exporting data...');
        // Implement data export
    }
    
    clearCache() {
        if (confirm('Are you sure you want to clear the cache? This will refresh the page.')) {
            localStorage.clear();
            sessionStorage.clear();
            location.reload();
        }
    }
    
    createNewProject() {
        utils.toast.info('Opening new project dialog...');
        // Implement project creation
    }
    
    addTeamMember() {
        utils.toast.info('Opening team member invitation...');
        // Implement team member addition
    }
    
    scheduleMeeting() {
        utils.toast.info('Opening meeting scheduler...');
        // Implement meeting scheduling
    }
    
    uploadFile() {
        utils.toast.info('Opening file upload dialog...');
        // Implement file upload
    }
    
    createTask() {
        utils.toast.info('Opening task creation form...');
        // Implement task creation
    }
    
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'Ctrl+K', description: 'Open command palette' },
            { key: 'Ctrl+/', description: 'Toggle sidebar' },
            { key: 'Ctrl+D', description: 'Toggle dark mode' },
            { key: 'Escape', description: 'Close dialogs' },
            { key: 'Ctrl+N', description: 'Create new item' },
            { key: 'Ctrl+S', description: 'Save' },
            { key: 'Ctrl+F', description: 'Search' }
        ];
        
        const shortcutsHtml = shortcuts.map(shortcut => `
            <div class="shortcut-item">
                <kbd>${shortcut.key}</kbd>
                <span>${shortcut.description}</span>
            </div>
        `).join('');
        
        // Show shortcuts in a modal or toast
        utils.toast.info('Keyboard shortcuts displayed in console');
        console.table(shortcuts);
    }
    
    showHelp() {
        utils.toast.info('Opening help documentation...');
        // Implement help display
    }
    
    showWhatsNew() {
        utils.toast.info('Showing latest updates...');
        // Implement what's new display
    }
    
    // Public API
    addSearchItem(item) {
        this.searchData.push(item);
    }
    
    removeSearchItem(title) {
        this.searchData = this.searchData.filter(item => item.title !== title);
    }
    
    getSearchData() {
        return this.searchData;
    }
}

// Initialize search manager
window.searchManager = new SearchManager();