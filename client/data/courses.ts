export interface CourseItem {
  id: string;
  title: string;
  completed: boolean;
  isActive?: boolean;
  content?: string;
  locked?: boolean; // New field to track if lesson is locked
}

export interface CourseSection {
  id: string;
  title: string;
  items: CourseItem[];
  isOpen: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor?: string;
  duration: string;
  level: string;
  image?: string;
  video?: string; // Single video for the entire course
  sections?: CourseSection[];
  finalExam?: {
    id: string;
    title: string;
    questions: ExamQuestion[];
    completed: boolean;
    locked: boolean;
    passingScore: number;
  };
}

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Helper functions for course management
export const addNewCourse = (course: Course) => {
  coursesData.push(course);
};

export const updateCourseProgress = (courseId: string, itemId: string, completed: boolean) => {
  const course = coursesData.find(c => c.id === courseId);
  if (course && course.sections) {
    course.sections.forEach(section => {
      const item = section.items.find(i => i.id === itemId);
      if (item) {
        item.completed = completed;
      }
    });
  }
};

export const setActiveLesson = (courseId: string, itemId: string) => {
  const course = coursesData.find(c => c.id === courseId);
  if (course && course.sections) {
    course.sections.forEach(section => {
      section.items.forEach(item => {
        item.isActive = item.id === itemId;
      });
    });
  }
};

export const getNextLesson = (courseId: string, currentItemId: string): CourseItem | null => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course || !course.sections) return null;

  const allItems = course.sections.flatMap(section => section.items);
  const currentIndex = allItems.findIndex(item => item.id === currentItemId);

  if (currentIndex >= 0 && currentIndex < allItems.length - 1) {
    return allItems[currentIndex + 1];
  }
  return null;
};

export const getPreviousLesson = (courseId: string, currentItemId: string): CourseItem | null => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course || !course.sections) return null;

  const allItems = course.sections.flatMap(section => section.items);
  const currentIndex = allItems.findIndex(item => item.id === currentItemId);

  if (currentIndex > 0) {
    return allItems[currentIndex - 1];
  }
  return null;
};

export const updateLessonLocks = (courseId: string) => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course || !course.sections) return;

  const allItems = course.sections.flatMap(section => section.items);

  // First lesson is always unlocked
  if (allItems.length > 0) {
    allItems[0].locked = false;
  }

  // Lock/unlock lessons based on completion
  for (let i = 1; i < allItems.length; i++) {
    const previousItem = allItems[i - 1];
    allItems[i].locked = !previousItem.completed;
  }

  // Update final exam lock status
  if (course.finalExam) {
    const allLessonsCompleted = allItems.every(item => item.completed);
    course.finalExam.locked = !allLessonsCompleted;
  }
};

export const canAccessLesson = (courseId: string, itemId: string): boolean => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course || !course.sections) return false;

  const allItems = course.sections.flatMap(section => section.items);
  const item = allItems.find(i => i.id === itemId);

  return item ? !item.locked : false;
};

export const isExamUnlocked = (courseId: string): boolean => {
  const course = coursesData.find(c => c.id === courseId);
  if (!course || !course.finalExam) return false;

  return !course.finalExam.locked;
};

// Generate dynamic learning objectives based on course content
export const generateLearningObjectives = (course: Course) => {
  const baseObjectives = [
    `Master ${course.title} fundamentals`,
    `Apply ${course.level.toLowerCase()} level concepts`,
    `Build practical skills in ${course.duration}`,
    `Complete hands-on projects and exercises`
  ]
  return baseObjectives
}

// Generate prerequisites based on course level and title
export const generatePrerequisites = (course: Course) => {
  const levelPrereqs = {
    'Beginner': [
      'Basic computer skills',
      'Text editor familiarity',
      'Willingness to learn',
      'Internet connection'
    ],
    'Intermediate': [
      'Programming fundamentals',
      'Development environment setup',
      'Version control basics',
      'Problem-solving skills'
    ],
    'Advanced': [
      'Solid programming foundation',
      'Industry experience preferred',
      'Complex problem-solving skills',
      'Advanced tooling knowledge'
    ]
  }
  return levelPrereqs[course.level as keyof typeof levelPrereqs] || levelPrereqs['Beginner']
}

export const coursesData: Course[] = [

  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    instructor: 'Jane Smith',
    duration: '4 weeks',
    level: 'Beginner',
    image: '/images/How-to-Learn-ReactJS-in-2021.png',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        isOpen: true,
        items: [
          { id: "react-intro", title: "Introduction to React", completed: true, isActive: true, locked: false, content: "Welcome to React - the most popular JavaScript library for building user interfaces! React was created by Facebook in 2013 and has revolutionized how we build web applications.\n\n🎯 What You'll Learn:\n• What React is and why it's so powerful\n• The Virtual DOM concept and its benefits\n• How React compares to other frameworks\n• Setting up your development environment\n\n💡 Key Concepts:\nReact uses a component-based architecture where you build encapsulated components that manage their own state. The Virtual DOM makes React fast by minimizing expensive DOM operations.\n\n🛠️ Getting Started:\n1. Install Node.js (version 14 or higher)\n2. Run: npx create-react-app my-app\n3. Navigate to your project: cd my-app\n4. Start development server: npm start\n\n🔥 Pro Tips:\n• Use React DevTools browser extension for debugging\n• Start with functional components and hooks\n• Keep components small and focused on a single responsibility\n• Use descriptive component names (PascalCase)\n\nReact's declarative nature makes your code more predictable and easier to debug. You describe what the UI should look like for any given state, and React handles the updates!" },
          { id: "react-components", title: "Components & Props", completed: true, locked: false, content: "Components are the heart of React! Think of them as custom HTML elements that you can reuse throughout your application. They're like JavaScript functions that return JSX (HTML-like syntax).\n\n🏗️ Types of Components:\n\n1. **Functional Components** (Recommended):\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n```\n\n2. **Class Components** (Legacy):\n```jsx\nclass Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}!</h1>;\n  }\n}\n```\n\n📦 Props (Properties):\nProps are how you pass data from parent to child components. They're read-only and help make components reusable.\n\n```jsx\n// Parent Component\nfunction App() {\n  return (\n    <div>\n      <Welcome name=\"Alice\" age={25} />\n      <Welcome name=\"Bob\" age={30} />\n    </div>\n  );\n}\n\n// Child Component\nfunction Welcome({ name, age }) {\n  return (\n    <div>\n      <h1>Hello, {name}!</h1>\n      <p>You are {age} years old.</p>\n    </div>\n  );\n}\n```\n\n🎯 Best Practices:\n• Use destructuring for cleaner prop access\n• Validate props with PropTypes or TypeScript\n• Keep components pure (same props = same output)\n• Use default props for optional values\n• Compose components instead of inheritance\n\n💡 Component Composition:\nInstead of complex inheritance hierarchies, React favors composition. Build complex UIs by combining simple components!\n\n🚀 Next Steps:\nOnce you master components and props, you'll be ready to add interactivity with state and event handling." },
          { id: "react-state", title: "State & Event Handling", completed: false, locked: false, content: "State is what makes React components interactive! While props are read-only data passed down from parents, state is internal data that components can change over time.\n\n🎯 useState Hook:\nThe useState hook lets you add state to functional components:\n\n```jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n```\n\n🔄 How State Works:\n1. **Initial State**: Set with useState(initialValue)\n2. **Reading State**: Use the state variable (count)\n3. **Updating State**: Use the setter function (setCount)\n4. **Re-rendering**: React re-renders when state changes\n\n⚡ Event Handling:\nReact uses SyntheticEvents - a cross-browser wrapper around native events:\n\n```jsx\nfunction Button() {\n  const handleClick = (event) => {\n    event.preventDefault();\n    console.log('Button clicked!');\n  };\n\n  const handleSubmit = (event) => {\n    event.preventDefault();\n    // Handle form submission\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <button onClick={handleClick}>Click me!</button>\n    </form>\n  );\n}\n```\n\n🎨 Common Patterns:\n\n**Form Handling:**\n```jsx\nfunction LoginForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  const handleSubmit = (e) => {\n    e.preventDefault();\n    console.log({ email, password });\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input \n        type=\"email\" \n        value={email}\n        onChange={(e) => setEmail(e.target.value)}\n      />\n      <input \n        type=\"password\" \n        value={password}\n        onChange={(e) => setPassword(e.target.value)}\n      />\n      <button type=\"submit\">Login</button>\n    </form>\n  );\n}\n```\n\n🚨 Important Rules:\n• Never mutate state directly - always use setter functions\n• State updates are asynchronous\n• Use functional updates for state based on previous state\n• Keep state minimal and derive values when possible\n\n💡 Pro Tips:\n• Use multiple useState calls for different pieces of state\n• Consider useReducer for complex state logic\n• Lift state up when multiple components need the same data\n• Use controlled components for form inputs" },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Concepts",
        isOpen: true,
        items: [
          { id: "react-hooks", title: "React Hooks Mastery", completed: false, locked: true, content: "Hooks are functions that let you 'hook into' React features from functional components. They're the modern way to write React and make your code more reusable and easier to test.\n\n🪝 Essential Hooks:\n\n**1. useEffect - Side Effects**\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    // Fetch user data when component mounts or userId changes\n    async function fetchUser() {\n      setLoading(true);\n      const response = await fetch(`/api/users/${userId}`);\n      const userData = await response.json();\n      setUser(userData);\n      setLoading(false);\n    }\n\n    fetchUser();\n\n    // Cleanup function (optional)\n    return () => {\n      // Cancel requests, clear timers, etc.\n    };\n  }, [userId]); // Dependency array\n\n  if (loading) return <div>Loading...</div>;\n  return <div>Hello, {user?.name}!</div>;\n}\n```\n\n**2. useContext - Global State**\n```jsx\nimport { createContext, useContext, useState } from 'react';\n\n// Create context\nconst ThemeContext = createContext();\n\n// Provider component\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('light');\n  \n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// Using context in components\nfunction Header() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  \n  return (\n    <header className={theme}>\n      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n        Toggle Theme\n      </button>\n    </header>\n  );\n}\n```\n\n**3. useReducer - Complex State Logic**\n```jsx\nimport { useReducer } from 'react';\n\nconst initialState = { count: 0 };\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return { count: state.count + 1 };\n    case 'decrement':\n      return { count: state.count - 1 };\n    case 'reset':\n      return initialState;\n    default:\n      throw new Error();\n  }\n}\n\nfunction Counter() {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  \n  return (\n    <div>\n      Count: {state.count}\n      <button onClick={() => dispatch({ type: 'increment' })}>+</button>\n      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>\n      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>\n    </div>\n  );\n}\n```\n\n🛠️ Custom Hooks:\nCreate your own hooks to share logic between components:\n\n```jsx\n// Custom hook for API calls\nfunction useApi(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    async function fetchData() {\n      try {\n        setLoading(true);\n        const response = await fetch(url);\n        const result = await response.json();\n        setData(result);\n      } catch (err) {\n        setError(err);\n      } finally {\n        setLoading(false);\n      }\n    }\n\n    fetchData();\n  }, [url]);\n\n  return { data, loading, error };\n}\n\n// Using the custom hook\nfunction PostList() {\n  const { data: posts, loading, error } = useApi('/api/posts');\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error.message}</div>;\n  \n  return (\n    <ul>\n      {posts.map(post => (\n        <li key={post.id}>{post.title}</li>\n      ))}\n    </ul>\n  );\n}\n```\n\n📋 Rules of Hooks:\n1. Only call hooks at the top level (not inside loops, conditions, or nested functions)\n2. Only call hooks from React functions (components or custom hooks)\n3. Custom hook names must start with 'use'\n\n💡 Advanced Patterns:\n• Use useCallback to memoize functions\n• Use useMemo to memoize expensive calculations\n• Use useRef for DOM access and mutable values\n• Combine multiple hooks for complex functionality\n\n🚀 Performance Tips:\n• Don't overuse useEffect - prefer derived state\n• Use dependency arrays correctly to avoid infinite loops\n• Consider useCallback and useMemo for optimization\n• Split complex state into multiple useState calls" },
          { id: "react-context", title: "Context API & Global State", completed: false, locked: true, content: "The Context API is React's built-in solution for sharing data across components without prop drilling. It's perfect for global state like user authentication, themes, and app settings.\n\n🌐 When to Use Context:\n• User authentication status\n• Theme/language preferences\n• Shopping cart contents\n• Global app settings\n• Data needed by many components\n\n⚠️ When NOT to Use Context:\n• Frequently changing data (causes re-renders)\n• Simple parent-child communication (use props)\n• Component-specific state\n\n🏗️ Setting Up Context:\n\n**Step 1: Create Context**\n```jsx\nimport { createContext, useContext, useReducer } from 'react';\n\n// Create context\nconst AppContext = createContext();\n\n// Create custom hook for easier usage\nexport const useAppContext = () => {\n  const context = useContext(AppContext);\n  if (!context) {\n    throw new Error('useAppContext must be used within AppProvider');\n  }\n  return context;\n};\n```\n\n**Step 2: Create Provider**\n```jsx\n// State management with useReducer\nconst initialState = {\n  user: null,\n  theme: 'light',\n  notifications: [],\n  isLoading: false\n};\n\nfunction appReducer(state, action) {\n  switch (action.type) {\n    case 'SET_USER':\n      return { ...state, user: action.payload };\n    case 'SET_THEME':\n      return { ...state, theme: action.payload };\n    case 'ADD_NOTIFICATION':\n      return { \n        ...state, \n        notifications: [...state.notifications, action.payload] \n      };\n    case 'SET_LOADING':\n      return { ...state, isLoading: action.payload };\n    default:\n      return state;\n  }\n}\n\nexport function AppProvider({ children }) {\n  const [state, dispatch] = useReducer(appReducer, initialState);\n\n  // Action creators\n  const actions = {\n    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),\n    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),\n    addNotification: (notification) => \n      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),\n    setLoading: (loading) => \n      dispatch({ type: 'SET_LOADING', payload: loading })\n  };\n\n  const value = {\n    ...state,\n    ...actions\n  };\n\n  return (\n    <AppContext.Provider value={value}>\n      {children}\n    </AppContext.Provider>\n  );\n}\n```\n\n**Step 3: Wrap Your App**\n```jsx\nimport { AppProvider } from './context/AppContext';\n\nfunction App() {\n  return (\n    <AppProvider>\n      <Header />\n      <Main />\n      <Footer />\n    </AppProvider>\n  );\n}\n```\n\n**Step 4: Use Context in Components**\n```jsx\nimport { useAppContext } from './context/AppContext';\n\nfunction Header() {\n  const { user, theme, setTheme } = useAppContext();\n\n  return (\n    <header className={`header ${theme}`}>\n      <h1>My App</h1>\n      {user ? (\n        <div>Welcome, {user.name}!</div>\n      ) : (\n        <button>Login</button>\n      )}\n      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>\n        Toggle Theme\n      </button>\n    </header>\n  );\n}\n\nfunction UserProfile() {\n  const { user, setUser } = useAppContext();\n\n  const handleLogout = () => {\n    setUser(null);\n    // Clear user data, redirect, etc.\n  };\n\n  return (\n    <div>\n      <h2>{user?.name}</h2>\n      <p>{user?.email}</p>\n      <button onClick={handleLogout}>Logout</button>\n    </div>\n  );\n}\n```\n\n🎯 Advanced Patterns:\n\n**Multiple Contexts:**\n```jsx\n// Separate contexts for different concerns\nconst AuthContext = createContext();\nconst ThemeContext = createContext();\nconst NotificationContext = createContext();\n\nfunction App() {\n  return (\n    <AuthProvider>\n      <ThemeProvider>\n        <NotificationProvider>\n          <AppContent />\n        </NotificationProvider>\n      </ThemeProvider>\n    </AuthProvider>\n  );\n}\n```\n\n**Context with Local Storage:**\n```jsx\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState(() => {\n    return localStorage.getItem('theme') || 'light';\n  });\n\n  useEffect(() => {\n    localStorage.setItem('theme', theme);\n  }, [theme]);\n\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n```\n\n⚡ Performance Optimization:\n• Split contexts by update frequency\n• Use useMemo for context values\n• Consider React.memo for components\n• Use multiple contexts instead of one large context\n\n🔄 Context vs Redux:\n• Context: Built-in, simpler, good for small-medium apps\n• Redux: More powerful, better DevTools, complex state logic\n• Consider Redux Toolkit for modern Redux development" },
        ],
      },
    ],
    finalExam: {
      id: 'react-final-exam',
      title: 'React Fundamentals Final Exam',
      completed: false,
      locked: true,
      passingScore: 80,
      questions: [
        {
          id: 'q1',
          question: 'What is the Virtual DOM in React?',
          options: [
            'A real DOM element',
            'A JavaScript representation of the real DOM',
            'A CSS framework',
            'A database'
          ],
          correctAnswer: 1,
          explanation: 'The Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates and improve performance.'
        },
        {
          id: 'q2',
          question: 'Which hook is used to manage state in functional components?',
          options: [
            'useEffect',
            'useState',
            'useContext',
            'useReducer'
          ],
          correctAnswer: 1,
          explanation: 'useState is the primary hook for managing local state in functional components.'
        },
        {
          id: 'q3',
          question: 'What are props in React?',
          options: [
            'Internal component state',
            'CSS properties',
            'Data passed from parent to child components',
            'Event handlers'
          ],
          correctAnswer: 2,
          explanation: 'Props are read-only data passed from parent components to child components.'
        },
        {
          id: 'q4',
          question: 'When should you use the useEffect hook?',
          options: [
            'To manage component state',
            'To handle side effects like API calls',
            'To create components',
            'To style components'
          ],
          correctAnswer: 1,
          explanation: 'useEffect is used for side effects like API calls, subscriptions, and DOM manipulation.'
        },
        {
          id: 'q5',
          question: 'What is the Context API used for?',
          options: [
            'Creating components',
            'Styling components',
            'Sharing data across components without prop drilling',
            'Handling events'
          ],
          correctAnswer: 2,
          explanation: 'The Context API allows you to share data across components without having to pass props down manually at every level.'
        }
      ]
    }
  },

  // Lesson 2: Advanced TypeScript
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    duration: '6 weeks',
    level: 'Advanced',
    image: '/images/learn_typescipt.jpeg',
    video: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,

        items: [
          { id: "advanced-types", title: "Advanced TypeScript Types", completed: false, locked: false, isActive: true, content: "Master TypeScript's powerful type system to build robust, scalable applications. Advanced types help catch errors at compile time and improve code maintainability.\n\n🎯 Union Types:\nCombine multiple types with the | operator:\n```typescript\ntype Status = 'loading' | 'success' | 'error';\ntype ID = string | number;\n\nfunction handleStatus(status: Status) {\n  switch (status) {\n    case 'loading':\n      return 'Please wait...';\n    case 'success':\n      return 'Operation completed!';\n    case 'error':\n      return 'Something went wrong!';\n  }\n}\n```\n\n🔗 Intersection Types:\nCombine multiple types with the & operator:\n```typescript\ntype User = {\n  id: number;\n  name: string;\n};\n\ntype Admin = {\n  permissions: string[];\n  role: 'admin';\n};\n\ntype AdminUser = User & Admin;\n\nconst admin: AdminUser = {\n  id: 1,\n  name: 'John',\n  permissions: ['read', 'write', 'delete'],\n  role: 'admin'\n};\n```\n\n🗺️ Mapped Types:\nTransform existing types:\n```typescript\ntype User = {\n  id: number;\n  name: string;\n  email: string;\n};\n\n// Make all properties optional\ntype PartialUser = Partial<User>;\n\n// Make all properties readonly\ntype ReadonlyUser = Readonly<User>;\n\n// Pick specific properties\ntype UserPreview = Pick<User, 'id' | 'name'>;\n\n// Omit specific properties\ntype CreateUser = Omit<User, 'id'>;\n\n// Custom mapped type\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ntype NullableUser = Nullable<User>;\n```\n\n❓ Conditional Types:\nTypes that depend on conditions:\n```typescript\ntype ApiResponse<T> = T extends string\n  ? { message: T }\n  : T extends number\n  ? { count: T }\n  : { data: T };\n\ntype StringResponse = ApiResponse<string>; // { message: string }\ntype NumberResponse = ApiResponse<number>; // { count: number }\ntype ObjectResponse = ApiResponse<User>; // { data: User }\n\n// Utility conditional type\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\ntype CleanString = NonNullable<string | null>; // string\n```\n\n🔧 Template Literal Types:\nCreate types from string templates:\n```typescript\ntype EventName = 'click' | 'focus' | 'blur';\ntype EventHandler = `on${Capitalize<EventName>}`;\n// Result: 'onClick' | 'onFocus' | 'onBlur'\n\ntype HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype Endpoint = `/api/${string}`;\ntype APICall = `${HTTPMethod} ${Endpoint}`;\n// Result: 'GET /api/users' | 'POST /api/users' | etc.\n```\n\n🔑 keyof and typeof:\nExtract keys and types:\n```typescript\nconst config = {\n  apiUrl: 'https://api.example.com',\n  timeout: 5000,\n  retries: 3\n} as const;\n\ntype Config = typeof config;\ntype ConfigKey = keyof Config; // 'apiUrl' | 'timeout' | 'retries'\n\nfunction getConfigValue<K extends ConfigKey>(key: K): Config[K] {\n  return config[key];\n}\n\nconst url = getConfigValue('apiUrl'); // string\nconst timeout = getConfigValue('timeout'); // number\n```\n\n🎨 Practical Examples:\n\n**Form Validation:**\n```typescript\ntype ValidationRule<T> = {\n  required?: boolean;\n  minLength?: T extends string ? number : never;\n  min?: T extends number ? number : never;\n  pattern?: T extends string ? RegExp : never;\n};\n\ntype FormField<T> = {\n  value: T;\n  error?: string;\n  rules?: ValidationRule<T>;\n};\n\ntype LoginForm = {\n  email: FormField<string>;\n  password: FormField<string>;\n  age: FormField<number>;\n};\n```\n\n**API Response Types:**\n```typescript\ntype APIResponse<T> = {\n  success: true;\n  data: T;\n} | {\n  success: false;\n  error: string;\n};\n\ntype User = { id: number; name: string; };\ntype UserResponse = APIResponse<User>;\n\nfunction handleUserResponse(response: UserResponse) {\n  if (response.success) {\n    console.log(response.data.name); // TypeScript knows this is safe\n  } else {\n    console.error(response.error);\n  }\n}\n```\n\n💡 Pro Tips:\n• Use utility types (Partial, Required, Pick, Omit) for common transformations\n• Combine conditional types with infer for advanced type extraction\n• Use template literal types for type-safe string manipulation\n• Leverage mapped types to reduce code duplication\n• Always prefer type-level solutions over runtime checks when possible" },
          { id: "type-guards", title: "Type Guards & Narrowing", completed: false, locked: true, content: "Type guards help TypeScript understand what type a value is at runtime, enabling safe access to type-specific properties and methods.\n\n🛡️ Built-in Type Guards:\n\n**typeof Guards:**\n```typescript\nfunction processValue(value: string | number) {\n  if (typeof value === 'string') {\n    // TypeScript knows value is string here\n    return value.toUpperCase();\n  } else {\n    // TypeScript knows value is number here\n    return value.toFixed(2);\n  }\n}\n```\n\n**instanceof Guards:**\n```typescript\nclass Dog {\n  bark() { return 'Woof!'; }\n}\n\nclass Cat {\n  meow() { return 'Meow!'; }\n}\n\nfunction makeSound(animal: Dog | Cat) {\n  if (animal instanceof Dog) {\n    return animal.bark(); // Safe to call bark()\n  } else {\n    return animal.meow(); // Safe to call meow()\n  }\n}\n```\n\n**in Operator:**\n```typescript\ntype Fish = { swim: () => void };\ntype Bird = { fly: () => void };\n\nfunction move(animal: Fish | Bird) {\n  if ('swim' in animal) {\n    animal.swim(); // TypeScript knows it's Fish\n  } else {\n    animal.fly(); // TypeScript knows it's Bird\n  }\n}\n```\n\n🎯 Custom Type Guards:\nCreate your own type checking functions:\n\n```typescript\n// Type predicate function\nfunction isString(value: unknown): value is string {\n  return typeof value === 'string';\n}\n\nfunction isNumber(value: unknown): value is number {\n  return typeof value === 'number' && !isNaN(value);\n}\n\nfunction processInput(input: unknown) {\n  if (isString(input)) {\n    return input.toLowerCase(); // Safe string methods\n  }\n  \n  if (isNumber(input)) {\n    return input * 2; // Safe number operations\n  }\n  \n  throw new Error('Invalid input type');\n}\n```\n\n🏗️ Advanced Type Guards:\n\n**Object Shape Guards:**\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction isUser(obj: any): obj is User {\n  return (\n    obj &&\n    typeof obj === 'object' &&\n    typeof obj.id === 'number' &&\n    typeof obj.name === 'string' &&\n    typeof obj.email === 'string'\n  );\n}\n\nfunction processUserData(data: unknown) {\n  if (isUser(data)) {\n    // TypeScript knows data is User\n    console.log(`Hello, ${data.name}!`);\n    return data.id;\n  }\n  throw new Error('Invalid user data');\n}\n```\n\n**Array Type Guards:**\n```typescript\nfunction isStringArray(arr: unknown[]): arr is string[] {\n  return arr.every(item => typeof item === 'string');\n}\n\nfunction isNumberArray(arr: unknown[]): arr is number[] {\n  return arr.every(item => typeof item === 'number');\n}\n\nfunction processArray(data: unknown[]) {\n  if (isStringArray(data)) {\n    return data.map(str => str.toUpperCase());\n  }\n  \n  if (isNumberArray(data)) {\n    return data.reduce((sum, num) => sum + num, 0);\n  }\n  \n  throw new Error('Unsupported array type');\n}\n```\n\n🔍 Discriminated Unions:\nUse literal types to create type-safe unions:\n\n```typescript\ntype LoadingState = {\n  status: 'loading';\n};\n\ntype SuccessState = {\n  status: 'success';\n  data: any;\n};\n\ntype ErrorState = {\n  status: 'error';\n  message: string;\n};\n\ntype AppState = LoadingState | SuccessState | ErrorState;\n\nfunction handleState(state: AppState) {\n  switch (state.status) {\n    case 'loading':\n      return 'Loading...';\n    case 'success':\n      return `Data: ${JSON.stringify(state.data)}`;\n    case 'error':\n      return `Error: ${state.message}`;\n    default:\n      // TypeScript ensures all cases are handled\n      const exhaustiveCheck: never = state;\n      throw new Error(`Unhandled state: ${exhaustiveCheck}`);\n  }\n}\n```\n\n⚡ Assertion Functions:\nFunctions that throw if type check fails:\n\n```typescript\nfunction assertIsNumber(value: unknown): asserts value is number {\n  if (typeof value !== 'number') {\n    throw new Error('Expected number');\n  }\n}\n\nfunction assertIsUser(obj: unknown): asserts obj is User {\n  if (!isUser(obj)) {\n    throw new Error('Expected User object');\n  }\n}\n\nfunction processData(input: unknown) {\n  assertIsNumber(input);\n  // TypeScript knows input is number after assertion\n  return input * 2;\n}\n```\n\n🎨 Real-World Example:\n```typescript\n// API response handling\ntype APISuccess<T> = {\n  success: true;\n  data: T;\n};\n\ntype APIError = {\n  success: false;\n  error: string;\n  code: number;\n};\n\ntype APIResponse<T> = APISuccess<T> | APIError;\n\nfunction isAPISuccess<T>(response: APIResponse<T>): response is APISuccess<T> {\n  return response.success === true;\n}\n\nfunction isAPIError<T>(response: APIResponse<T>): response is APIError {\n  return response.success === false;\n}\n\nasync function fetchUser(id: number): Promise<User> {\n  const response: APIResponse<User> = await fetch(`/api/users/${id}`).then(r => r.json());\n  \n  if (isAPISuccess(response)) {\n    return response.data; // TypeScript knows this is User\n  }\n  \n  if (isAPIError(response)) {\n    throw new Error(`API Error ${response.code}: ${response.error}`);\n  }\n  \n  throw new Error('Unknown response format');\n}\n```\n\n💡 Best Practices:\n• Use type guards to safely access properties on union types\n• Prefer discriminated unions over complex type guards\n• Create reusable type guard functions for common patterns\n• Use assertion functions when you're certain about types\n• Always handle the 'else' case in type guards\n• Use exhaustive checking with never type for completeness" }
        ],
      },
      {
        id: "types",
        title: "Type System",
        isOpen: true,

        items: [
          { id: "advanced-types", title: "Advanced TypeScript Types", completed: false, locked: false, isActive: true, content: "Master TypeScript's powerful type system to build robust, scalable applications. Advanced types help catch errors at compile time and improve code maintainability.\n\n🎯 Union Types:\nCombine multiple types with the | operator:\n```typescript\ntype Status = 'loading' | 'success' | 'error';\ntype ID = string | number;\n\nfunction handleStatus(status: Status) {\n  switch (status) {\n    case 'loading':\n      return 'Please wait...';\n    case 'success':\n      return 'Operation completed!';\n    case 'error':\n      return 'Something went wrong!';\n  }\n}\n```\n\n🔗 Intersection Types:\nCombine multiple types with the & operator:\n```typescript\ntype User = {\n  id: number;\n  name: string;\n};\n\ntype Admin = {\n  permissions: string[];\n  role: 'admin';\n};\n\ntype AdminUser = User & Admin;\n\nconst admin: AdminUser = {\n  id: 1,\n  name: 'John',\n  permissions: ['read', 'write', 'delete'],\n  role: 'admin'\n};\n```\n\n🗺️ Mapped Types:\nTransform existing types:\n```typescript\ntype User = {\n  id: number;\n  name: string;\n  email: string;\n};\n\n// Make all properties optional\ntype PartialUser = Partial<User>;\n\n// Make all properties readonly\ntype ReadonlyUser = Readonly<User>;\n\n// Pick specific properties\ntype UserPreview = Pick<User, 'id' | 'name'>;\n\n// Omit specific properties\ntype CreateUser = Omit<User, 'id'>;\n\n// Custom mapped type\ntype Nullable<T> = {\n  [K in keyof T]: T[K] | null;\n};\n\ntype NullableUser = Nullable<User>;\n```\n\n❓ Conditional Types:\nTypes that depend on conditions:\n```typescript\ntype ApiResponse<T> = T extends string\n  ? { message: T }\n  : T extends number\n  ? { count: T }\n  : { data: T };\n\ntype StringResponse = ApiResponse<string>; // { message: string }\ntype NumberResponse = ApiResponse<number>; // { count: number }\ntype ObjectResponse = ApiResponse<User>; // { data: User }\n\n// Utility conditional type\ntype NonNullable<T> = T extends null | undefined ? never : T;\n\ntype CleanString = NonNullable<string | null>; // string\n```\n\n🔧 Template Literal Types:\nCreate types from string templates:\n```typescript\ntype EventName = 'click' | 'focus' | 'blur';\ntype EventHandler = `on${Capitalize<EventName>}`;\n// Result: 'onClick' | 'onFocus' | 'onBlur'\n\ntype HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';\ntype Endpoint = `/api/${string}`;\ntype APICall = `${HTTPMethod} ${Endpoint}`;\n// Result: 'GET /api/users' | 'POST /api/users' | etc.\n```\n\n🔑 keyof and typeof:\nExtract keys and types:\n```typescript\nconst config = {\n  apiUrl: 'https://api.example.com',\n  timeout: 5000,\n  retries: 3\n} as const;\n\ntype Config = typeof config;\ntype ConfigKey = keyof Config; // 'apiUrl' | 'timeout' | 'retries'\n\nfunction getConfigValue<K extends ConfigKey>(key: K): Config[K] {\n  return config[key];\n}\n\nconst url = getConfigValue('apiUrl'); // string\nconst timeout = getConfigValue('timeout'); // number\n```\n\n🎨 Practical Examples:\n\n**Form Validation:**\n```typescript\ntype ValidationRule<T> = {\n  required?: boolean;\n  minLength?: T extends string ? number : never;\n  min?: T extends number ? number : never;\n  pattern?: T extends string ? RegExp : never;\n};\n\ntype FormField<T> = {\n  value: T;\n  error?: string;\n  rules?: ValidationRule<T>;\n};\n\ntype LoginForm = {\n  email: FormField<string>;\n  password: FormField<string>;\n  age: FormField<number>;\n};\n```\n\n**API Response Types:**\n```typescript\ntype APIResponse<T> = {\n  success: true;\n  data: T;\n} | {\n  success: false;\n  error: string;\n};\n\ntype User = { id: number; name: string; };\ntype UserResponse = APIResponse<User>;\n\nfunction handleUserResponse(response: UserResponse) {\n  if (response.success) {\n    console.log(response.data.name); // TypeScript knows this is safe\n  } else {\n    console.error(response.error);\n  }\n}\n```\n\n💡 Pro Tips:\n• Use utility types (Partial, Required, Pick, Omit) for common transformations\n• Combine conditional types with infer for advanced type extraction\n• Use template literal types for type-safe string manipulation\n• Leverage mapped types to reduce code duplication\n• Always prefer type-level solutions over runtime checks when possible" },
          { id: "type-guards", title: "Type Guards & Narrowing", completed: false, locked: true, content: "Type guards help TypeScript understand what type a value is at runtime, enabling safe access to type-specific properties and methods.\n\n🛡️ Built-in Type Guards:\n\n**typeof Guards:**\n```typescript\nfunction processValue(value: string | number) {\n  if (typeof value === 'string') {\n    // TypeScript knows value is string here\n    return value.toUpperCase();\n  } else {\n    // TypeScript knows value is number here\n    return value.toFixed(2);\n  }\n}\n```\n\n**instanceof Guards:**\n```typescript\nclass Dog {\n  bark() { return 'Woof!'; }\n}\n\nclass Cat {\n  meow() { return 'Meow!'; }\n}\n\nfunction makeSound(animal: Dog | Cat) {\n  if (animal instanceof Dog) {\n    return animal.bark(); // Safe to call bark()\n  } else {\n    return animal.meow(); // Safe to call meow()\n  }\n}\n```\n\n**in Operator:**\n```typescript\ntype Fish = { swim: () => void };\ntype Bird = { fly: () => void };\n\nfunction move(animal: Fish | Bird) {\n  if ('swim' in animal) {\n    animal.swim(); // TypeScript knows it's Fish\n  } else {\n    animal.fly(); // TypeScript knows it's Bird\n  }\n}\n```\n\n🎯 Custom Type Guards:\nCreate your own type checking functions:\n\n```typescript\n// Type predicate function\nfunction isString(value: unknown): value is string {\n  return typeof value === 'string';\n}\n\nfunction isNumber(value: unknown): value is number {\n  return typeof value === 'number' && !isNaN(value);\n}\n\nfunction processInput(input: unknown) {\n  if (isString(input)) {\n    return input.toLowerCase(); // Safe string methods\n  }\n  \n  if (isNumber(input)) {\n    return input * 2; // Safe number operations\n  }\n  \n  throw new Error('Invalid input type');\n}\n```\n\n🏗️ Advanced Type Guards:\n\n**Object Shape Guards:**\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction isUser(obj: any): obj is User {\n  return (\n    obj &&\n    typeof obj === 'object' &&\n    typeof obj.id === 'number' &&\n    typeof obj.name === 'string' &&\n    typeof obj.email === 'string'\n  );\n}\n\nfunction processUserData(data: unknown) {\n  if (isUser(data)) {\n    // TypeScript knows data is User\n    console.log(`Hello, ${data.name}!`);\n    return data.id;\n  }\n  throw new Error('Invalid user data');\n}\n```\n\n**Array Type Guards:**\n```typescript\nfunction isStringArray(arr: unknown[]): arr is string[] {\n  return arr.every(item => typeof item === 'string');\n}\n\nfunction isNumberArray(arr: unknown[]): arr is number[] {\n  return arr.every(item => typeof item === 'number');\n}\n\nfunction processArray(data: unknown[]) {\n  if (isStringArray(data)) {\n    return data.map(str => str.toUpperCase());\n  }\n  \n  if (isNumberArray(data)) {\n    return data.reduce((sum, num) => sum + num, 0);\n  }\n  \n  throw new Error('Unsupported array type');\n}\n```\n\n🔍 Discriminated Unions:\nUse literal types to create type-safe unions:\n\n```typescript\ntype LoadingState = {\n  status: 'loading';\n};\n\ntype SuccessState = {\n  status: 'success';\n  data: any;\n};\n\ntype ErrorState = {\n  status: 'error';\n  message: string;\n};\n\ntype AppState = LoadingState | SuccessState | ErrorState;\n\nfunction handleState(state: AppState) {\n  switch (state.status) {\n    case 'loading':\n      return 'Loading...';\n    case 'success':\n      return `Data: ${JSON.stringify(state.data)}`;\n    case 'error':\n      return `Error: ${state.message}`;\n    default:\n      // TypeScript ensures all cases are handled\n      const exhaustiveCheck: never = state;\n      throw new Error(`Unhandled state: ${exhaustiveCheck}`);\n  }\n}\n```\n\n⚡ Assertion Functions:\nFunctions that throw if type check fails:\n\n```typescript\nfunction assertIsNumber(value: unknown): asserts value is number {\n  if (typeof value !== 'number') {\n    throw new Error('Expected number');\n  }\n}\n\nfunction assertIsUser(obj: unknown): asserts obj is User {\n  if (!isUser(obj)) {\n    throw new Error('Expected User object');\n  }\n}\n\nfunction processData(input: unknown) {\n  assertIsNumber(input);\n  // TypeScript knows input is number after assertion\n  return input * 2;\n}\n```\n\n🎨 Real-World Example:\n```typescript\n// API response handling\ntype APISuccess<T> = {\n  success: true;\n  data: T;\n};\n\ntype APIError = {\n  success: false;\n  error: string;\n  code: number;\n};\n\ntype APIResponse<T> = APISuccess<T> | APIError;\n\nfunction isAPISuccess<T>(response: APIResponse<T>): response is APISuccess<T> {\n  return response.success === true;\n}\n\nfunction isAPIError<T>(response: APIResponse<T>): response is APIError {\n  return response.success === false;\n}\n\nasync function fetchUser(id: number): Promise<User> {\n  const response: APIResponse<User> = await fetch(`/api/users/${id}`).then(r => r.json());\n  \n  if (isAPISuccess(response)) {\n    return response.data; // TypeScript knows this is User\n  }\n  \n  if (isAPIError(response)) {\n    throw new Error(`API Error ${response.code}: ${response.error}`);\n  }\n  \n  throw new Error('Unknown response format');\n}\n```\n\n💡 Best Practices:\n• Use type guards to safely access properties on union types\n• Prefer discriminated unions over complex type guards\n• Create reusable type guard functions for common patterns\n• Use assertion functions when you're certain about types\n• Always handle the 'else' case in type guards\n• Use exhaustive checking with never type for completeness" }
        ],
      },
    ],

    finalExam: {
      id: 'TypeScript-final-exam',
      title: 'TypeScript Fundamentals Final Exam',
      completed: false,
      locked: true,
      passingScore: 80,
      questions: [
        {
          id: 'q1',
          question: 'What is the Virtual DOM in React?',
          options: [
            'A real DOM element',
            'A JavaScript representation of the real DOM',
            'A CSS framework',
            'A database'
          ],
          correctAnswer: 1,
          explanation: 'The Virtual DOM is a JavaScript representation of the real DOM that React uses to optimize updates and improve performance.'
        },
        {
          id: 'q2',
          question: 'Which hook is used to manage state in functional components?',
          options: [
            'useEffect',
            'useState',
            'useContext',
            'useReducer'
          ],
          correctAnswer: 1,
          explanation: 'useState is the primary hook for managing local state in functional components.'
        },
        {
          id: 'q3',
          question: 'What are props in React?',
          options: [
            'Internal component state',
            'CSS properties',
            'Data passed from parent to child components',
            'Event handlers'
          ],
          correctAnswer: 2,
          explanation: 'Props are read-only data passed from parent components to child components.'
        },
        {
          id: 'q4',
          question: 'When should you use the useEffect hook?',
          options: [
            'To manage component state',
            'To handle side effects like API calls',
            'To create components',
            'To style components'
          ],
          correctAnswer: 1,
          explanation: 'useEffect is used for side effects like API calls, subscriptions, and DOM manipulation.'
        },
        {
          id: 'q5',
          question: 'What is the Context API used for?',
          options: [
            'Creating components',
            'Styling components',
            'Sharing data across components without prop drilling',
            'Handling events'
          ],
          correctAnswer: 2,
          explanation: 'The Context API allows you to share data across components without having to pass props down manually at every level.'
        }
      ]
    }
  },

  
  // {
  //   id: '3',
  //   title: 'Machine Learning Fundamentals',
  //   description: 'Learn machine learning concepts, algorithms, and practical applications with Python.',
  //   instructor: 'John Doe',
  //   duration: '6 weeks',
  //   level: 'Advanced',
  //   image: '/images/placeholder-course.png',
  //   // video: '',

  //   sections: [
  //     {
  //       id: "types",
  //       title: "Type System",
  //       isOpen: true,
  //       items: [
  //         { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Dive into advanced TypeScript types like conditional types, mapped types, and template literal types. See how these can help you build robust, type-safe applications.\n\nRelated topics: Utility types, template literals, mapped types.\nPractical tip: Use template literal types for expressive string patterns." },
  //         { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in TypeScript to narrow down types within conditional blocks, ensuring type safety and improving code clarity.\n\nRelated topics: Discriminated unions, assertion functions.\nPractical tip: Use assertion functions for runtime type checks." },
  //       ],
  //     },
  //   ]
  // },
  // {
  //   id: '4',
  //   title: 'Fundamentals of Blockchain ',
  //   description: 'Fundamentals of Blockchain concepts for large-scale applications.',
  //   instructor: 'Dairling kelly',
  //   duration: '8 weeks',
  //   level: 'Advanced',
  //   image: '/images/placeholder-course.png',
  //   sections: [
  //     {
  //       id: "types",
  //       title: "Type System",
  //       isOpen: true,
  //       items: [
  //         { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced Blockchain data types and how they are used in smart contracts and distributed ledgers.\n\nRelated topics: Hashing, cryptography, smart contracts.\nPractical tip: Use strong types for security-critical blockchain logic." },
  //         { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in Blockchain applications to ensure data integrity and security.\n\nRelated topics: Validation, consensus algorithms.\nPractical tip: Always validate external data before processing in smart contracts." },
  //       ],
  //     },
  //     {
  //       id: "types",
  //       title: "Type System",
  //       isOpen: true,
  //       items: [
  //         { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced Blockchain data types and how they are used in smart contracts and distributed ledgers.\n\nRelated topics: Hashing, cryptography, smart contracts.\nPractical tip: Use strong types for security-critical blockchain logic." },
  //         { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in Blockchain applications to ensure data integrity and security.\n\nRelated topics: Validation, consensus algorithms.\nPractical tip: Always validate external data before processing in smart contracts." },
  //       ],
  //     },
  //     {
  //       id: "types",
  //       title: "Type System",
  //       isOpen: true,
  //       items: [
  //         { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced Blockchain data types and how they are used in smart contracts and distributed ledgers.\n\nRelated topics: Hashing, cryptography, smart contracts.\nPractical tip: Use strong types for security-critical blockchain logic." },
  //         { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in Blockchain applications to ensure data integrity and security.\n\nRelated topics: Validation, consensus algorithms.\nPractical tip: Always validate external data before processing in smart contracts." },
  //       ],
  //     },
  //     {
  //       id: "types",
  //       title: "Type System",
  //       isOpen: true,
  //       items: [
  //         { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced Blockchain data types and how they are used in smart contracts and distributed ledgers.\n\nRelated topics: Hashing, cryptography, smart contracts.\nPractical tip: Use strong types for security-critical blockchain logic." },
  //         { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in Blockchain applications to ensure data integrity and security.\n\nRelated topics: Validation, consensus algorithms.\nPractical tip: Always validate external data before processing in smart contracts." },
  //       ],
  //     },
  //   ]
  // },
  // {
  //   id: '5',
  //   title: 'Python for Beginners',
  //   description: 'Start your journey with Python programming from scratch.',
  //   instructor: 'Alice Johnson',
  //   duration: '5 weeks',
  //   level: 'Beginner',
  //   image: '/images/placeholder-course.png',
  //   // video: '',
  //   sections: [
  //     {
  //       id: 'intro',
  //       title: 'Introduction',
  //       isOpen: true,
  //       items: [
  //         { id: 'python-why', title: 'Why Learn Python?', completed: false, content: 'Python is a versatile language used in web development, data science, automation, and more. This lesson covers the reasons to learn Python, its real-world applications, and how it compares to other languages.\n\nRelated topics: Scripting, automation, Python vs JavaScript.\nPractical tip: Python is great for beginners due to its readable syntax.' },
  //         { id: 'python-setup', title: 'Setting Up Python', completed: false, content: 'Learn how to install Python on your computer, set up your first Python script, and use virtual environments for project isolation.\n\nRelated topics: pip, venv, IDEs for Python.\nPractical tip: Use VS Code or PyCharm for a smooth Python experience.' },
  //       ],
  //     },
  //     {
  //       id: 'basics',
  //       title: 'Python Basics',
  //       isOpen: false,
  //       items: [
  //         { id: 'variables', title: 'Variables & Data Types', completed: false, content: 'Understand variables, data types, and how to use them in Python. Learn about numbers, strings, lists, dictionaries, and more.\n\nRelated topics: Mutable vs immutable types, type conversion.\nPractical tip: Use descriptive variable names for clarity.' },
  //         { id: 'control-flow', title: 'Control Flow', completed: false, content: 'Learn about if statements, loops, and controlling the flow of your Python programs. See examples of for, while, and nested loops.\n\nRelated topics: Boolean logic, break/continue, error handling.\nPractical tip: Use list comprehensions for concise looping.' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: '6',
  //   title: 'UI/UX Design',
  //   description: 'Learn the principles of user interface and user experience design.',
  //   instructor: 'Emily Carter',
  //   duration: '3 weeks',
  //   level: 'Intermediate',
  //   image: '/images/placeholder-course.png',
  //   // video: '',
  //   sections: [
  //     {
  //       id: 'ui-basics',
  //       title: 'UI Basics',
  //       isOpen: true,
  //       items: [
  //         { id: 'color-theory', title: 'Color Theory', completed: false, content: 'Explore how color choices affect user perception and usability. Learn about color psychology, palettes, and accessibility.\n\nRelated topics: Contrast, branding, accessibility.\nPractical tip: Use online tools to test color contrast for accessibility.' },
  //         { id: 'typography', title: 'Typography', completed: false, content: 'Learn about font choices, hierarchy, and readability in design. See examples of good and bad typography in UI.\n\nRelated topics: Font pairing, line height, responsive text.\nPractical tip: Use web-safe fonts for cross-platform consistency.' },
  //       ],
  //     },
  //     {
  //       id: 'ux-basics',
  //       title: 'UX Basics',
  //       isOpen: false,
  //       items: [
  //         { id: 'user-research', title: 'User Research', completed: false, content: 'Discover methods for understanding user needs and behaviors. Learn about interviews, surveys, and usability testing.\n\nRelated topics: Personas, analytics, A/B testing.\nPractical tip: Always validate design decisions with real users.' },
  //         { id: 'wireframing', title: 'Wireframing & Prototyping', completed: false, content: 'Learn how to create wireframes and prototypes to test your ideas. See tools and techniques for rapid prototyping.\n\nRelated topics: Figma, Sketch, user flows.\nPractical tip: Start with low-fidelity wireframes before moving to high-fidelity prototypes.' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: '7',
  //   title: 'Data Science Essentials',
  //   description: 'A practical introduction to data science concepts and tools.',
  //   instructor: 'Michael Lee',
  //   duration: '7 weeks',
  //   level: 'Intermediate',
  //   image: '/images/placeholder-course.png',
  //   // video: '',
  //   sections: [
  //     {
  //       id: 'data-intro',
  //       title: 'Getting Started with Data',
  //       isOpen: true,
  //       items: [
  //         { id: 'data-types', title: 'Types of Data', completed: false, content: 'Learn about structured, unstructured, and semi-structured data. See examples from real-world datasets.\n\nRelated topics: CSV, JSON, databases.\nPractical tip: Always check data quality before analysis.' },
  //         { id: 'data-collection', title: 'Data Collection', completed: false, content: 'Explore methods for collecting and cleaning data for analysis. Learn about web scraping, APIs, and manual data entry.\n\nRelated topics: ETL, data cleaning, missing values.\nPractical tip: Use Pandas for efficient data cleaning in Python.' },
  //       ],
  //     },
  //     {
  //       id: 'tools',
  //       title: 'Tools & Techniques',
  //       isOpen: false,
  //       items: [
  //         { id: 'python-pandas', title: 'Python & Pandas', completed: false, content: 'Use Python and the Pandas library to manipulate and analyze data. Learn about DataFrames, filtering, and aggregation.\n\nRelated topics: NumPy, Matplotlib, Jupyter.\nPractical tip: Use Jupyter notebooks for interactive data exploration.' },
  //         { id: 'visualization', title: 'Data Visualization', completed: false, content: 'Learn how to visualize data using charts and graphs for better insights. See examples of bar, line, and scatter plots.\n\nRelated topics: Seaborn, dashboarding, storytelling with data.\nPractical tip: Choose the right chart type for your data and audience.' },
  //       ],
  //     },
  //   ],
  // },
];
