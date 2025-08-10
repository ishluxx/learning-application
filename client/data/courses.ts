export interface CourseItem {
  id: string;
  title: string;
  completed: boolean;
  isActive?: boolean;
  content?: string; // Added content field for lesson material
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
  image?: string; // Image for course card and lesson page
  sections?: CourseSection[]; // Made sections optional for courses that don't have detailed progress
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
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        isOpen: true,
        items: [
          { id: "react-intro", title: "Introduction to React", completed: true, isActive: true, content: "Welcome to the Introduction to React! In this lesson, you'll learn what React is, its history, and why it's so popular for building user interfaces. You'll also see real-world examples of React apps and get tips for setting up your first project.\n\nRelated topics: JavaScript frameworks, SPA, Virtual DOM.\nPractical tip: Use Create React App or Vite for quick setup." },
          { id: "react-components", title: "Components & Props", completed: true, content: "Components are the building blocks of React applications. You'll learn how to create functional and class components, pass data using props, and organize your UI into reusable pieces.\n\nRelated topics: Component hierarchy, prop drilling, composition.\nPractical tip: Keep components small and focused for better maintainability." },
          { id: "react-state", title: "State & Lifecycle", completed: false, content: "State allows React components to change their output over time in response to user actions, network responses, and anything else. You'll learn about useState, setState, and lifecycle methods like componentDidMount.\n\nRelated topics: useEffect, local vs global state, state management libraries.\nPractical tip: Use state wisely to avoid unnecessary re-renders." },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Concepts",
        isOpen: true,
        items: [
          { id: "react-hooks", title: "Hooks in Depth", completed: false, content: "Hooks let you use state and other React features in functional components. You'll learn about useState, useEffect, useContext, and how to build custom hooks for reusable logic.\n\nRelated topics: Dependency arrays, custom hooks, rules of hooks.\nPractical tip: Always start custom hook names with 'use' and follow the rules of hooks." },
          { id: "react-context", title: "Context API", completed: false, content: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. You'll learn how to create and use context for global state like themes and authentication.\n\nRelated topics: Provider pattern, useContext, Redux.\nPractical tip: Use context for truly global data, not for every prop." },
        ],
      },
    ]
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    duration: '6 weeks',
    level: 'Advanced',
    image: '/images/learn_typescipt.jpeg',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced TypeScript types like union, intersection, mapped, and conditional types. Learn how to use them to write safer and more expressive code.\n\nRelated topics: Generics, keyof, typeof, infer.\nPractical tip: Use mapped types for DRY code and conditional types for flexible APIs." },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Type guards and predicates help you narrow down types within conditional blocks, ensuring type safety and improving code clarity.\n\nRelated topics: typeof, instanceof, custom type guards.\nPractical tip: Use type predicates for complex type checks in large codebases." },
        ],
      },
    ]
  },
  {
    id: '3',
    title: ' Machine Learning',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    duration: '6 weeks',
    level: 'Advanced',
    image: '/images/placeholder-course.png',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Dive into advanced TypeScript types like conditional types, mapped types, and template literal types. See how these can help you build robust, type-safe applications.\n\nRelated topics: Utility types, template literals, mapped types.\nPractical tip: Use template literal types for expressive string patterns." },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in TypeScript to narrow down types within conditional blocks, ensuring type safety and improving code clarity.\n\nRelated topics: Discriminated unions, assertion functions.\nPractical tip: Use assertion functions for runtime type checks." },
        ],
      },
    ]
  },
  {
    id: '4',
    title: 'Fundamentals of Blockchain ',
    description: 'Fundamentals of Blockchain concepts for large-scale applications.',
    instructor: 'Dairling kelly',
    duration: '8 weeks',
    level: 'Advanced',
    image: '/images/placeholder-course.png',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Explore advanced Blockchain data types and how they are used in smart contracts and distributed ledgers.\n\nRelated topics: Hashing, cryptography, smart contracts.\nPractical tip: Use strong types for security-critical blockchain logic." },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in Blockchain applications to ensure data integrity and security.\n\nRelated topics: Validation, consensus algorithms.\nPractical tip: Always validate external data before processing in smart contracts." },
        ],
      },
    ]
  },
  {
    id: '5',
    title: 'Python for Beginners',
    description: 'Start your journey with Python programming from scratch.',
    instructor: 'Alice Johnson',
    duration: '5 weeks',
    level: 'Beginner',
    image: '/images/placeholder-course.png',
    sections: [
      {
        id: 'intro',
        title: 'Introduction',
        isOpen: true,
        items: [
          { id: 'python-why', title: 'Why Learn Python?', completed: false, content: 'Python is a versatile language used in web development, data science, automation, and more. This lesson covers the reasons to learn Python, its real-world applications, and how it compares to other languages.\n\nRelated topics: Scripting, automation, Python vs JavaScript.\nPractical tip: Python is great for beginners due to its readable syntax.' },
          { id: 'python-setup', title: 'Setting Up Python', completed: false, content: 'Learn how to install Python on your computer, set up your first Python script, and use virtual environments for project isolation.\n\nRelated topics: pip, venv, IDEs for Python.\nPractical tip: Use VS Code or PyCharm for a smooth Python experience.' },
        ],
      },
      {
        id: 'basics',
        title: 'Python Basics',
        isOpen: false,
        items: [
          { id: 'variables', title: 'Variables & Data Types', completed: false, content: 'Understand variables, data types, and how to use them in Python. Learn about numbers, strings, lists, dictionaries, and more.\n\nRelated topics: Mutable vs immutable types, type conversion.\nPractical tip: Use descriptive variable names for clarity.' },
          { id: 'control-flow', title: 'Control Flow', completed: false, content: 'Learn about if statements, loops, and controlling the flow of your Python programs. See examples of for, while, and nested loops.\n\nRelated topics: Boolean logic, break/continue, error handling.\nPractical tip: Use list comprehensions for concise looping.' },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'UI/UX Design',
    description: 'Learn the principles of user interface and user experience design.',
    instructor: 'Emily Carter',
    duration: '3 weeks',
    level: 'Intermediate',
    image: '/images/placeholder-course.png',
    sections: [
      {
        id: 'ui-basics',
        title: 'UI Basics',
        isOpen: true,
        items: [
          { id: 'color-theory', title: 'Color Theory', completed: false, content: 'Explore how color choices affect user perception and usability. Learn about color psychology, palettes, and accessibility.\n\nRelated topics: Contrast, branding, accessibility.\nPractical tip: Use online tools to test color contrast for accessibility.' },
          { id: 'typography', title: 'Typography', completed: false, content: 'Learn about font choices, hierarchy, and readability in design. See examples of good and bad typography in UI.\n\nRelated topics: Font pairing, line height, responsive text.\nPractical tip: Use web-safe fonts for cross-platform consistency.' },
        ],
      },
      {
        id: 'ux-basics',
        title: 'UX Basics',
        isOpen: false,
        items: [
          { id: 'user-research', title: 'User Research', completed: false, content: 'Discover methods for understanding user needs and behaviors. Learn about interviews, surveys, and usability testing.\n\nRelated topics: Personas, analytics, A/B testing.\nPractical tip: Always validate design decisions with real users.' },
          { id: 'wireframing', title: 'Wireframing & Prototyping', completed: false, content: 'Learn how to create wireframes and prototypes to test your ideas. See tools and techniques for rapid prototyping.\n\nRelated topics: Figma, Sketch, user flows.\nPractical tip: Start with low-fidelity wireframes before moving to high-fidelity prototypes.' },
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Data Science Essentials',
    description: 'A practical introduction to data science concepts and tools.',
    instructor: 'Michael Lee',
    duration: '7 weeks',
    level: 'Intermediate',
    image: '/images/placeholder-course.png',
    sections: [
        {
        id: 'data-intro',
        title: 'Getting Started with Data',
        isOpen: true,
        items: [
          { id: 'data-types', title: 'Types of Data', completed: false, content: 'Learn about structured, unstructured, and semi-structured data. See examples from real-world datasets.\n\nRelated topics: CSV, JSON, databases.\nPractical tip: Always check data quality before analysis.' },
          { id: 'data-collection', title: 'Data Collection', completed: false, content: 'Explore methods for collecting and cleaning data for analysis. Learn about web scraping, APIs, and manual data entry.\n\nRelated topics: ETL, data cleaning, missing values.\nPractical tip: Use Pandas for efficient data cleaning in Python.' },
        ],
      },
      {
        id: 'tools',
        title: 'Tools & Techniques',
        isOpen: false,
        items: [
          { id: 'python-pandas', title: 'Python & Pandas', completed: false, content: 'Use Python and the Pandas library to manipulate and analyze data. Learn about DataFrames, filtering, and aggregation.\n\nRelated topics: NumPy, Matplotlib, Jupyter.\nPractical tip: Use Jupyter notebooks for interactive data exploration.' },
          { id: 'visualization', title: 'Data Visualization', completed: false, content: 'Learn how to visualize data using charts and graphs for better insights. See examples of bar, line, and scatter plots.\n\nRelated topics: Seaborn, dashboarding, storytelling with data.\nPractical tip: Choose the right chart type for your data and audience.' },
        ],
      },
    ],
  },
];
