const skillsData = [
      {
            name_id: "Core-Java",
            name: "Core Java",
            points: [
                  "Intro",
                  "JVM",
                  "Data type / variable / operators",
                  "Controle Statement",
                  "Loop",
                  "Array",
                  "String - Buffer/Builder",
                  "OOPS",
                  "Exception Handling",
                  "Multithreading",
                  "Synchronization",
                  "Collection Framework",
                  "Map Interface",
                  "JDBC",
                  "File Handling"
            ],
            tag: "core",
            sequence: 1
      },

      {
            name_id: "DSA-ADV-DSA(Java)",
            name: "DSA & ADV-DSA ( Java )",
            points: [
                  "Arrays",
                  "2D Arrays",
                  "Strings",
                  "Recursion",
                  "Divide & Conquer",
                  "Backtracking",
                  "Bit Manipulation",
                  "Time & Space Complexity",
                  "Greedy Algorithms",
                  "OOPS",
                  "ArrayLists",
                  "Linked lists",
                  "Stacks and Queues",
                  "Binary Trees & BST",
                  "Heaps/Priority Queues",
                  "Hashing (Maps & Sets)",
                  "Tries",
                  "Graphs",
                  "Segment Trees",
                  "DP"
            ],
            tag: "core",
            sequence: 2
      },

      {
            name_id: "Rate-Limiting-Caching",
            name: "Rate Limiting & Caching",
            points: [
                  "Create Bucket",
                  "Use Existing Bucket",
                  "Refill Tokens",
                  "Delete Inactive Bucket",
                  "Multi-Route Configuration",
                  "Bucket Scope & Isolation",
                  "Performance Optimization"
            ],
            tag: "backend",
            sequence: 3
      },

      {
            name_id: "Debouncing",
            name: "Debouncing",
            points: [
                  "Debouncing Basics",
                  "Delay User Input",
                  "Clear Existing Timer",
                  "Create New Timer",
                  "Reduce API Requests",
                  "Optimize Search Performance",
                  "Improve User Experience"
            ],
            tag: "frontend",
            sequence: 4
      },

      {
            name_id: "HTML-5",
            name: "HTML 5",
            points: [
                  "Structure",
                  "HTML Tags",
                  "Block v/s Inline",
                  "Listings",
                  "Tables",
                  "Forms",
                  "Selectors"
            ],
            tag: "core",
            sequence: 5
      },

      {
            name_id: "CSS-3",
            name: "CSS 3",
            points: [
                  "Css Basic's",
                  "Selectors",
                  "Box Model",
                  "CSS Units",
                  "Transition",
                  "Flex",
                  "Media Queries",
                  "Animations & 3d Space"
            ],
            tag: "core",
            sequence: 6
      },

      {
            name_id: "Bootstrap-CSS",
            name: "Bootstrap CSS",
            points: [
                  "Reboot CSS",
                  "Responsive Design",
                  "Container Classes",
                  "Typography",
                  "Colors",
                  "Spacing",
                  "Borders & Radius",
                  "Helpers",
                  "Positioning",
                  "Flex Utility"
            ],
            tag: "core",
            sequence: 7
      },

      {
            name_id: "JS-(ES6)",
            name: "JS ( ES6 )",
            points: [
                  "Variables",
                  "Operators",
                  "Conditionals",
                  "Loops",
                  "Scope",
                  "Functions expressions",
                  "Function declaration",
                  "Arrays",
                  "Objects",
                  "Object functions",
                  "DOM",
                  "Events",
                  "IIFE",
                  "Closures",
                  "Arrow Functions",
                  "“this” Keyword",
                  "Prototypes",
                  "Class",
                  "Promises",
                  "Callback Timed Events",
                  "Async Await"
            ],
            tag: "core",
            sequence: 8
      },

      {
            name_id: "React-js",
            name: "React.js",
            points: [
                  "Intro To React",
                  "JSX",
                  "Fragments",
                  "Styling in React",
                  "Props",
                  "React Devloper Tools",
                  "State's",
                  "Hooks",
                  "useState()",
                  "Closure",
                  "Work of Re-rendering",
                  "Callback in Set State",
                  "Array/Object and State",
                  "Fn as Props",
                  "Forms - Lables",
                  "Inputs",
                  "Validation",
                  "useEffect()",
                  "Meterial-UI"
            ],
            tag: "core",
            sequence: 9
      },

      {
            name_id: "Node-js",
            name: "Node.js",
            points: [
                  "Basics",
                  "REPL",
                  "File Handling",
                  "Data Handling",
                  "NPM",
                  "MVC",
                  "Intro to Servers"
            ],
            tag: "core",
            sequence: 10
      },

      {
            name_id: "Express-js",
            name: "Express.js",
            points: [
                  "Basics",
                  "Ejs",
                  "Middleware"
            ],
            tag: "core",
            sequence: 11
      },

      {
            name_id: "SQL-Data-Base",
            name: "SQL Data Base",
            points: [
                  "Introduction",
                  "Select",
                  "Create",
                  "Alter",
                  "Drop",
                  "Truncate",
                  "Insert",
                  "Update",
                  "Delete",
                  "Grant",
                  "Revoke",
                  "Relationships"
            ],
            tag: "core",
            sequence: 12
      },

      {
            name_id: "Mongo-DB",
            name: "Mongo DB",
            points: [
                  "Introduction",
                  "Use",
                  "CRUD",
                  "Mongoose",
                  "Session Stores"
            ],
            tag: "core",
            sequence: 13
      },

      {
            name_id: "Redux",
            name: "Redux",
            points: [
                  "State Management",
                  "Store",
                  "Reducers",
                  "Action",
                  "Slice"
            ],
            tag: "core",
            sequence: 14
      },

      {
            name_id: "Terminal",
            name: "Terminal",
            points: [
                  "Introduction",
                  "Directories",
                  "Commands",
                  "paths",
                  "operations on files"
            ],
            tag: "soft",
            sequence: 15
      },

      {
            name_id: "Git-GitHub",
            name: "Git & GitHub",
            points: [
                  "Introduction",
                  "Branches",
                  "Workflow",
                  "Clone To Repo...",
                  "Commits",
                  "Push",
                  "Pull"
            ],
            tag: "soft",
            sequence: 16
      },

      {
            name_id: "Other-Mega-Work",
            name: "Other Mega Work",
            points: [
                  "API's Handling",
                  "Error Handling - [ Client side & Server side ]",
                  "Validation Handling - [ Client side & Server side ]",
                  "Validation in Schema - [ Joy Validation ]",
                  "UUID",
                  "Session Management"
            ],
            tag: "soft",
            sequence: 17
      }
];

export default skillsData;