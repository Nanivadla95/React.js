# JSDoc Documentation Standards

## Overview

This document outlines the JSDoc documentation standards for this React.js project. All public APIs, components, hooks, and utility functions should include JSDoc comments following these guidelines.

## Table of Contents

1. [Basic JSDoc Syntax](#basic-jsdoc-syntax)
2. [React Component Documentation](#react-component-documentation)
3. [React Hook Documentation](#react-hook-documentation)
4. [Function Documentation](#function-documentation)
5. [Type Definitions](#type-definitions)
6. [Examples](#examples)
7. [Common Tags](#common-tags)
8. [Best Practices](#best-practices)

## Basic JSDoc Syntax

### Function Documentation Template

```javascript
/**
 * Brief description of the function
 * 
 * Longer description if needed. This can span multiple lines
 * and provide more context about the function's purpose.
 * 
 * @param {string} param1 - Description of the first parameter
 * @param {number} [param2=10] - Description of optional parameter with default
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether the feature is enabled
 * @param {string} options.mode - Operation mode
 * @returns {Promise<string>} Promise that resolves to a string result
 * @throws {Error} When invalid parameters are provided
 * @example
 * // Basic usage
 * const result = await myFunction('hello', 20, { enabled: true, mode: 'fast' });
 * console.log(result); // "processed: hello"
 * 
 * @example
 * // With minimal parameters
 * const result = await myFunction('world');
 * console.log(result); // "processed: world"
 * 
 * @since 1.0.0
 * @author John Doe
 */
function myFunction(param1, param2 = 10, options = {}) {
  // Implementation
}
```

## React Component Documentation

### Functional Component

```jsx
/**
 * A reusable button component with various styles and states
 * 
 * This component provides a consistent button interface across the application
 * with support for different variants, sizes, and states. It handles click
 * events and can be disabled when needed.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {'primary'|'secondary'|'danger'} [props.variant='primary'] - Button style variant
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Button size
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {Function} [props.onClick] - Click event handler
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Rendered button component
 * 
 * @example
 * // Primary button with click handler
 * <Button variant="primary" size="large" onClick={() => console.log('clicked')}>
 *   Click Me
 * </Button>
 * 
 * @example
 * // Disabled secondary button
 * <Button variant="secondary" disabled>
 *   Disabled Button
 * </Button>
 * 
 * @since 1.0.0
 */
function Button({ variant = 'primary', size = 'medium', disabled = false, onClick, children }) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Class Component

```jsx
/**
 * Modal dialog component with backdrop and close functionality
 * 
 * A flexible modal component that can display any content with optional
 * title and configurable size. Handles escape key and backdrop clicks
 * for closing.
 * 
 * @component
 * @extends React.Component
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {Function} props.onClose - Function called when modal should close
 * @param {string} [props.title] - Optional modal title
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Modal size
 * @param {React.ReactNode} props.children - Modal content
 * 
 * @example
 * // Basic modal usage
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   size="small"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 * 
 * @since 1.0.0
 */
class Modal extends React.Component {
  /**
   * @memberof Modal
   * @description Handle escape key press to close modal
   * @param {KeyboardEvent} event - Keyboard event
   */
  handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    // Implementation
  }
}
```

## React Hook Documentation

### Custom Hook

```javascript
/**
 * Custom hook for managing localStorage with React state synchronization
 * 
 * This hook provides a way to persist state in localStorage while keeping
 * it synchronized with React's state management. It automatically handles
 * serialization/deserialization and provides methods to update or remove
 * the stored value.
 * 
 * @hook
 * @param {string} key - The localStorage key to use
 * @param {*} [initialValue] - Default value if key doesn't exist in localStorage
 * @returns {Array} Array containing [value, setValue, removeValue]
 * @returns {*} returns.0 - Current stored value
 * @returns {Function} returns.1 - Function to update the stored value
 * @returns {Function} returns.2 - Function to remove the value from storage
 * 
 * @example
 * // Basic usage with object
 * function UserProfile() {
 *   const [user, setUser, removeUser] = useLocalStorage('user', {
 *     name: '',
 *     email: ''
 *   });
 * 
 *   const updateName = (name) => {
 *     setUser({ ...user, name });
 *   };
 * 
 *   return (
 *     <div>
 *       <input value={user.name} onChange={(e) => updateName(e.target.value)} />
 *       <button onClick={removeUser}>Clear User</button>
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Simple string value
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * @since 1.0.0
 * @throws {Error} When localStorage is not available
 */
function useLocalStorage(key, initialValue) {
  // Implementation
}
```

### useEffect Hook Documentation

```javascript
/**
 * Custom hook for making API requests with loading and error states
 * 
 * @hook
 * @param {string} url - API endpoint URL
 * @param {RequestInit} [options={}] - Fetch options
 * @returns {Object} API request state
 * @returns {*|null} returns.data - Response data or null
 * @returns {boolean} returns.loading - Loading state
 * @returns {Error|null} returns.error - Error object or null
 * @returns {Function} returns.refetch - Function to retry the request
 * 
 * @example
 * function UserList() {
 *   const { data: users, loading, error, refetch } = useApi('/api/users');
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 * 
 *   return (
 *     <div>
 *       <button onClick={refetch}>Refresh</button>
 *       <ul>
 *         {users?.map(user => <li key={user.id}>{user.name}</li>)}
 *       </ul>
 *     </div>
 *   );
 * }
 * 
 * @since 1.0.0
 */
function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch data from the API endpoint
   * @inner
   * @async
   * @function fetchData
   * @description Internal function to fetch data from the API
   */
  const fetchData = useCallback(async () => {
    // Implementation
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return state and refetch function
}
```

## Function Documentation

### Utility Functions

```javascript
/**
 * Formats a date object or string into a human-readable format
 * 
 * This utility function accepts various date inputs and formats them
 * according to the specified format type. It handles edge cases like
 * invalid dates and provides consistent formatting across the application.
 * 
 * @function
 * @param {Date|string|number} date - Date to format
 * @param {'short'|'long'|'iso'|'relative'} [format='short'] - Format type
 * @param {string} [locale='en-US'] - Locale for formatting
 * @returns {string} Formatted date string
 * @throws {TypeError} When date parameter is not a valid date
 * 
 * @example
 * // Different format types
 * const date = new Date('2023-12-25');
 * 
 * formatDate(date, 'short');    // "12/25/2023"
 * formatDate(date, 'long');     // "December 25, 2023"
 * formatDate(date, 'iso');      // "2023-12-25"
 * formatDate(date, 'relative'); // "in 5 days" or "5 days ago"
 * 
 * @example
 * // With custom locale
 * formatDate(date, 'long', 'fr-FR'); // "25 décembre 2023"
 * 
 * @example
 * // With string input
 * formatDate('2023-12-25', 'short'); // "12/25/2023"
 * 
 * @since 1.0.0
 * @author Jane Smith
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
 */
function formatDate(date, format = 'short', locale = 'en-US') {
  // Implementation
}
```

### Async Functions

```javascript
/**
 * Fetches user data from the API with error handling and retries
 * 
 * @async
 * @function
 * @param {string} userId - User ID to fetch
 * @param {Object} [options] - Request options
 * @param {number} [options.timeout=5000] - Request timeout in milliseconds
 * @param {number} [options.retries=3] - Number of retry attempts
 * @param {boolean} [options.includeProfile=false] - Whether to include profile data
 * @returns {Promise<Object>} Promise that resolves to user data
 * @returns {Promise<string>} returns.id - User ID
 * @returns {Promise<string>} returns.name - User name
 * @returns {Promise<string>} returns.email - User email
 * @returns {Promise<Object>} [returns.profile] - User profile (if requested)
 * 
 * @throws {NetworkError} When network request fails
 * @throws {ValidationError} When userId is invalid
 * @throws {NotFoundError} When user is not found
 * 
 * @example
 * // Basic usage
 * try {
 *   const user = await fetchUser('123');
 *   console.log(user.name);
 * } catch (error) {
 *   console.error('Failed to fetch user:', error.message);
 * }
 * 
 * @example
 * // With options
 * const user = await fetchUser('123', {
 *   timeout: 10000,
 *   retries: 5,
 *   includeProfile: true
 * });
 * 
 * @since 1.2.0
 */
async function fetchUser(userId, options = {}) {
  // Implementation
}
```

## Type Definitions

### Interface Documentation

```javascript
/**
 * User object interface
 * 
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} [avatar] - URL to user's avatar image
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Last update date
 * @property {UserRole} role - User's role in the system
 * @property {UserPreferences} preferences - User's preferences
 * 
 * @example
 * // Example user object
 * const user = {
 *   id: '123',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   avatar: 'https://example.com/avatar.jpg',
 *   createdAt: new Date('2023-01-01'),
 *   updatedAt: new Date('2023-12-01'),
 *   role: 'admin',
 *   preferences: { theme: 'dark', notifications: true }
 * };
 */

/**
 * User role enumeration
 * 
 * @typedef {'admin'|'moderator'|'user'|'guest'} UserRole
 */

/**
 * User preferences configuration
 * 
 * @typedef {Object} UserPreferences
 * @property {'light'|'dark'|'auto'} theme - UI theme preference
 * @property {boolean} notifications - Whether to show notifications
 * @property {string} language - Preferred language code
 * @property {Object} privacy - Privacy settings
 * @property {boolean} privacy.profileVisible - Whether profile is public
 * @property {boolean} privacy.emailVisible - Whether email is visible to others
 */
```

### Complex Type Definitions

```javascript
/**
 * API response wrapper
 * 
 * @template T
 * @typedef {Object} ApiResponse
 * @property {T} data - Response data
 * @property {string} message - Response message
 * @property {boolean} success - Whether the request was successful
 * @property {number} statusCode - HTTP status code
 * @property {Object} [meta] - Optional metadata
 * @property {number} meta.total - Total number of items
 * @property {number} meta.page - Current page number
 * @property {number} meta.limit - Items per page
 * 
 * @example
 * // API response for user list
 * const response: ApiResponse<User[]> = {
 *   data: [user1, user2, user3],
 *   message: 'Users fetched successfully',
 *   success: true,
 *   statusCode: 200,
 *   meta: {
 *     total: 100,
 *     page: 1,
 *     limit: 10
 *   }
 * };
 */
```

## Examples

### Complete Component with JSDoc

```jsx
/**
 * SearchableUserList - A component that displays a searchable list of users
 * 
 * This component combines search functionality with a user list display.
 * It supports real-time search, loading states, error handling, and
 * pagination. The search is debounced to avoid excessive API calls.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onUserSelect] - Callback when a user is selected
 * @param {boolean} [props.showAvatars=true] - Whether to show user avatars
 * @param {number} [props.pageSize=10] - Number of users per page
 * @param {string} [props.placeholder='Search users...'] - Search input placeholder
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * // Basic usage
 * function App() {
 *   const handleUserSelect = (user) => {
 *     console.log('Selected user:', user);
 *   };
 * 
 *   return (
 *     <SearchableUserList 
 *       onUserSelect={handleUserSelect}
 *       showAvatars={true}
 *       pageSize={20}
 *     />
 *   );
 * }
 * 
 * @since 1.0.0
 */
function SearchableUserList({ 
  onUserSelect, 
  showAvatars = true, 
  pageSize = 10,
  placeholder = 'Search users...'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  /**
   * Handle user selection
   * @memberof SearchableUserList
   * @param {User} user - Selected user object
   */
  const handleUserClick = useCallback((user) => {
    onUserSelect?.(user);
  }, [onUserSelect]);

  /**
   * Handle search input change with debouncing
   * @memberof SearchableUserList
   * @param {string} value - Search input value
   */
  const handleSearchChange = useMemo(
    () => debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1); // Reset to first page on new search
    }, 300),
    []
  );

  // Component implementation...
}
```

## Common Tags

### Essential Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@param` | Document function parameters | `@param {string} name - User name` |
| `@returns` | Document return value | `@returns {Promise<User>} User data` |
| `@throws` | Document thrown exceptions | `@throws {Error} When validation fails` |
| `@example` | Provide usage examples | `@example const result = fn('test');` |
| `@since` | Version when added | `@since 1.0.0` |
| `@deprecated` | Mark as deprecated | `@deprecated Use newFunction instead` |

### React-Specific Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@component` | Mark React component | `@component` |
| `@hook` | Mark React hook | `@hook` |
| `@memberof` | Associate with parent | `@memberof ComponentName` |
| `@inner` | Mark inner function | `@inner` |

### Type-Related Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@typedef` | Define custom type | `@typedef {Object} User` |
| `@template` | Generic type parameter | `@template T` |
| `@namespace` | Define namespace | `@namespace Utils` |
| `@enum` | Define enumeration | `@enum {string}` |

### Additional Tags

| Tag | Purpose | Example |
|-----|---------|---------|
| `@author` | Code author | `@author John Doe <john@example.com>` |
| `@see` | Reference links | `@see {@link https://example.com}` |
| `@todo` | Future improvements | `@todo Add validation` |
| `@version` | Current version | `@version 1.2.0` |
| `@readonly` | Read-only property | `@readonly` |
| `@static` | Static method | `@static` |

## Best Practices

### 1. Be Descriptive but Concise

```javascript
// ✅ Good
/**
 * Validates email address format using RFC 5322 standard
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */

// ❌ Bad
/**
 * Checks email
 * @param {string} email
 * @returns {boolean}
 */
```

### 2. Include Meaningful Examples

```javascript
// ✅ Good
/**
 * @example
 * // Validate user input
 * const isValid = validateEmail('user@example.com');
 * if (!isValid) {
 *   showError('Please enter a valid email address');
 * }
 */

// ❌ Bad
/**
 * @example
 * validateEmail('test@test.com');
 */
```

### 3. Document Edge Cases and Error Conditions

```javascript
/**
 * Calculates age from birth date
 * @param {Date|string} birthDate - Birth date
 * @returns {number} Age in years
 * @throws {TypeError} When birthDate is not a valid date
 * @throws {RangeError} When birthDate is in the future
 * 
 * @example
 * // Normal usage
 * const age = calculateAge('1990-01-01'); // 33
 * 
 * @example
 * // Handling errors
 * try {
 *   const age = calculateAge('invalid-date');
 * } catch (error) {
 *   console.error('Invalid birth date:', error.message);
 * }
 */
```

### 4. Use TypeScript-Style Type Annotations

```javascript
/**
 * User service configuration
 * @typedef {Object} UserServiceConfig
 * @property {string} baseUrl - API base URL
 * @property {number} [timeout=5000] - Request timeout in ms
 * @property {Object} headers - Default headers
 * @property {string} headers.Authorization - Auth header
 * @property {string} headers['Content-Type'] - Content type header
 */
```

### 5. Document React Component Props Thoroughly

```jsx
/**
 * @param {Object} props
 * @param {User[]} props.users - Array of user objects to display
 * @param {Function} props.onUserSelect - Called when user clicks on a user
 * @param {(user: User) => void} props.onUserSelect
 * @param {boolean} [props.loading=false] - Show loading spinner
 * @param {string} [props.emptyMessage='No users found'] - Message when no users
 * @param {React.CSSProperties} [props.style] - Custom styles
 * @param {string} [props.className] - Additional CSS classes
 */
```

### 6. Keep Documentation Updated

```javascript
/**
 * @deprecated Since version 2.0.0. Use newApiFunction() instead.
 * @see {@link newApiFunction}
 */
function oldApiFunction() {
  // Implementation
}

/**
 * @since 2.0.0
 * @replaces oldApiFunction
 */
function newApiFunction() {
  // New implementation
}
```

---

## Documentation Generation

To generate HTML documentation from JSDoc comments:

```bash
# Install JSDoc globally
npm install -g jsdoc

# Generate documentation
jsdoc src/**/*.js src/**/*.jsx -d docs/

# With custom configuration
jsdoc -c jsdoc.config.json
```

### JSDoc Configuration Example

```json
{
  "source": {
    "include": ["./src/"],
    "includePattern": "\\.(js|jsx)$",
    "exclude": ["node_modules/", "dist/"]
  },
  "opts": {
    "destination": "./docs/",
    "recurse": true
  },
  "plugins": ["plugins/markdown"],
  "templates": {
    "cleverLinks": false,
    "monospaceLinks": false
  }
}
```

---

*This document should be referenced when writing inline code documentation. Keep it updated as the project evolves.*