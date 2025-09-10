// Velox Suite - Notifications Management

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.init();
    }
    
    init() {
        this.loadNotifications();
        this.bindEvents();
        this.startPeriodicUpdates();
    }
    
    bindEvents() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');
        const userBtn = document.getElementById('userBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        // Notification dropdown
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown('notificationDropdown');
                this.closeDropdown('userDropdown');
            });
        }
        
        // User dropdown
        if (userBtn) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleDropdown('userDropdown');
                this.closeDropdown('notificationDropdown');
            });
        }
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Mark all as read
        const markAllReadBtn = document.querySelector('.mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => {
                this.markAllAsRead();
            });
        }
        
        // Escape key to close dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }
    
    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const parent = dropdown.closest('.dropdown');
            parent.classList.toggle('open');
        }
    }
    
    closeDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            const parent = dropdown.closest('.dropdown');
            parent.classList.remove('open');
        }
    }
    
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
    
    loadNotifications() {
        // In a real app, this would fetch from an API
        this.notifications = this.generateSampleNotifications();
        this.updateNotificationDisplay();
    }
    
    generateSampleNotifications() {
        return [
            {
                id: '1',
                title: 'New Message',
                message: 'You have received a new message from Alice Johnson about the website project.',
                time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
                read: false,
                type: 'message',
                avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                id: '2',
                title: 'Task Completed',
                message: 'Bob Smith has completed the "API Integration" task.',
                time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
                read: false,
                type: 'task',
                avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                id: '3',
                title: 'Project Update',
                message: 'The "Mobile App Development" project has been updated with new requirements.',
                time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                read: false,
                type: 'project',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                id: '4',
                title: 'File Uploaded',
                message: 'Carol Davis uploaded a new file: "Design_Mockups_v2.fig"',
                time: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
                read: true,
                type: 'file',
                avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                id: '5',
                title: 'Team Meeting',
                message: 'Reminder: Weekly team meeting starts in 15 minutes.',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                read: true,
                type: 'meeting',
                avatar: null
            },
            {
                id: '6',
                title: 'System Update',
                message: 'System maintenance completed successfully. All services are now online.',
                time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
                read: true,
                type: 'system',
                avatar: null
            },
            {
                id: '7',
                title: 'New Comment',
                message: 'David Wilson commented on your post: "Great work on the dashboard design!"',
                time: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                read: true,
                type: 'comment',
                avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                id: '8',
                title: 'Deadline Reminder',
                message: 'The "Website Redesign" project is due in 2 days.',
                time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                read: true,
                type: 'reminder',
                avatar: null
            }
        ];
    }
    
    updateNotificationDisplay() {
        this.updateNotificationCount();
        this.renderNotificationList();
    }
    
    updateNotificationCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
        
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }
    
    renderNotificationList() {
        const notificationList = document.getElementById('notificationList');
        if (!notificationList) return;
        
        const html = this.notifications.map(notification => {
            const timeAgo = utils.formatRelativeTime(notification.time);
            const avatarHtml = notification.avatar 
                ? `<img src="${notification.avatar}" alt="Avatar" class="notification-avatar">`
                : `<div class="notification-icon"><i class="fas fa-${this.getNotificationIcon(notification.type)}"></i></div>`;
            
            return `
                <div class="notification-item ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
                    ${avatarHtml}
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                        <div class="notification-time">${timeAgo}</div>
                    </div>
                    ${!notification.read ? '<div class="unread-indicator"></div>' : ''}
                </div>
            `;
        }).join('');
        
        notificationList.innerHTML = html;
        
        // Add click handlers for individual notifications
        const notificationItems = notificationList.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                this.markAsRead(id);
                this.handleNotificationClick(id);
            });
        });
    }
    
    getNotificationIcon(type) {
        const icons = {
            message: 'envelope',
            task: 'check-circle',
            project: 'folder',
            file: 'file',
            meeting: 'calendar',
            system: 'cog',
            comment: 'comment',
            reminder: 'bell'
        };
        return icons[type] || 'bell';
    }
    
    addNotification(notification) {
        const newNotification = {
            id: utils.generateId(),
            time: new Date(),
            read: false,
            ...notification
        };
        
        this.notifications.unshift(newNotification);
        this.updateNotificationDisplay();
        
        // Show toast notification
        utils.toast.info(newNotification.title);
        
        // Emit notification event
        window.eventBus.emit('notificationReceived', newNotification);
    }
    
    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.updateNotificationDisplay();
            
            // In a real app, this would sync with the server
            this.syncReadStatus(id);
        }
    }
    
    markAllAsRead() {
        this.notifications.forEach(notification => {
            notification.read = true;
        });
        this.updateNotificationDisplay();
        
        // In a real app, this would sync with the server
        this.syncAllReadStatus();
        
        utils.toast.success('All notifications marked as read');
    }
    
    handleNotificationClick(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;
        
        // Handle different notification types
        switch (notification.type) {
            case 'message':
                window.navigation.navigateTo('messages');
                break;
            case 'task':
                window.navigation.navigateTo('tasks');
                break;
            case 'project':
                window.navigation.navigateTo('projects');
                break;
            case 'file':
                window.navigation.navigateTo('files');
                break;
            case 'meeting':
                window.navigation.navigateTo('calendar');
                break;
            default:
                // Stay on current page
                break;
        }
        
        this.closeAllDropdowns();
    }
    
    syncReadStatus(id) {
        // In a real app, this would make an API call
        console.log(`Marking notification ${id} as read on server`);
    }
    
    syncAllReadStatus() {
        // In a real app, this would make an API call
        console.log('Marking all notifications as read on server');
    }
    
    startPeriodicUpdates() {
        // Check for new notifications every 30 seconds
        setInterval(() => {
            this.checkForNewNotifications();
        }, 30000);
    }
    
    checkForNewNotifications() {
        // In a real app, this would fetch from an API
        // For demo purposes, occasionally add a random notification
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            this.simulateNewNotification();
        }
    }
    
    simulateNewNotification() {
        const sampleNotifications = [
            {
                title: 'New Task Assignment',
                message: 'You have been assigned a new task: "Update user documentation"',
                type: 'task',
                avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                title: 'File Shared',
                message: 'A new file has been shared with you: "Q4_Report.xlsx"',
                type: 'file',
                avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
            },
            {
                title: 'Meeting Scheduled',
                message: 'A new meeting has been scheduled for tomorrow at 2:00 PM',
                type: 'meeting',
                avatar: null
            }
        ];
        
        const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
        this.addNotification(randomNotification);
    }
    
    // Public API methods
    getUnreadCount() {
        return this.unreadCount;
    }
    
    getAllNotifications() {
        return this.notifications;
    }
    
    getUnreadNotifications() {
        return this.notifications.filter(n => !n.read);
    }
    
    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.updateNotificationDisplay();
    }
    
    clearAllNotifications() {
        this.notifications = [];
        this.updateNotificationDisplay();
        utils.toast.success('All notifications cleared');
    }
}

// Initialize notification manager
window.notificationManager = new NotificationManager();