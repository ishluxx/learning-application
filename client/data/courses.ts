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
    sections: [
      {
        id: "getting-started",
        title: "Getting Started",
        isOpen: true,
        items: [
          { id: "react-intro", title: "Introduction to React", completed: true, isActive: true, content: "Welcome to the Introduction to React! In this lesson, we'll cover the very basics of what React is and why it's used. We will set up our first React application." },
          { id: "react-components", title: "Components & Props", completed: true, content: "Components are the building blocks of React applications. Props (short for properties) allow you to pass data from a parent component to a child component. This lesson dives deep into creating and using them." },
          { id: "react-state", title: "State & Lifecycle", completed: false, content: "State allows React components to change their output over time in response to user actions, network responses, and anything else. Lifecycle methods allow you to run code at specific points in a component's life. Learn all about them here." },
        ],
      },
      {
        id: "advanced",
        title: "Advanced Concepts",
        isOpen: true,
        items: [
          { id: "react-hooks", title: "Hooks in Depth", completed: false, content: "Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. This lesson provides an in-depth look at useState, useEffect, and custom Hooks." },
          { id: "react-context", title: "Context API", completed: false, content: "Context provides a way to pass data through the component tree without having to pass props down manually at every level. This is useful for 'global' data for a tree of React components, such as the current authenticated user, theme, or preferred language." },
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
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "lorme ipsume to digital some thing ths cnadfdffd" },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "predicates in TypeScript to narrow down types within conditional blocks, ensuring type safety and improving code clarity." },
        ],
      },
    ]
  },
  {
    id: '3',
    title: 'Advanced Machine Learning',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    duration: '6 weeks',
    level: 'Advanced',
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Dive into advanced TypeScript types like conditional types, mapped types, and template literal types to build more robust and type-safe applications." },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in TypeScript to narrow down types within conditional blocks, ensuring type safety and improving code clarity." },
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
    sections: [
      {
        id: "types",
        title: "Type System",
        isOpen: true,
        items: [
          { id: "advanced-types", title: "Advanced Types", completed: false, isActive: true, content: "Dive into Fundamentals of Blockchain types like conditional types, mapped types, and template literal types to build more robust and type-safe applications." },
          { id: "type-guards", title: "Type Guards & Type Predicates", completed: false, content: "Learn how to use type guards and type predicates in TypeScript to narrow down types within conditional blocks, ensuring type safety and improving code clarity." },
        ],
      },
    ]
  },
  // Add other courses from your courses/page.tsx here if they need detailed status tracking
  // For now, only courses with 'sections' will have detailed progress.
  // Others will default to 'Start Learning'.
];
