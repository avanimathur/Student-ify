const roadmapsData = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        description: 'Learn to build modern user interfaces and web applications',
        icon: '🌐',
        color: '#3b82f6',
        topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js']
    },
    {
        id: 'backend',
        title: 'Backend Development',
        description: 'Master server-side programming and API development',
        icon: '🗄️',
        color: '#10b981',
        topics: ['Node.js', 'Python', 'Databases', 'APIs', 'Security']
    },
    {
        id: 'fullstack',
        title: 'Full Stack Development',
        description: 'Become proficient in both frontend and backend technologies',
        icon: '💻',
        color: '#F50B51FF',
        topics: ['Web Dev', 'Databases', 'APIs', 'DevOps', 'Testing']
      },
      {
        id: 'mobile',
        title: 'Mobile Development',
        description: 'Build native and cross-platform mobile applications',
        icon: '🗄️',
        color: '#BBF63BFF',
        topics: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile Design']
      },
      {
        id: 'devops',
        title: 'DevOps Engineering',
        description: 'Learn cloud platforms, CI/CD, and infrastructure automation',
        icon: '🛠️',
        color: '#F50BB3FF',
        topics: ['Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring']
      },
      {
        id: 'security',
        title: 'Cybersecurity',
        description: 'Master security principles and protect digital assets',
        icon: '🛡️',
        color: '#F50B0BFF',
        topics: ['Network Security', 'Cryptography', 'Pen Testing', 'Security Tools']
      },
      {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        description: 'Dive into artificial intelligence and machine learning',
        icon: '🤖',
        color: '#111010FF',
        topics: ['Python', 'Math', 'ML Algorithms', 'Deep Learning', 'NLP']
      },
      {
        id: 'data',
        title: 'Data Science',
        description: 'Learn data analysis, visualization, and statistical modeling',
        icon: '💾',
        color: 'bg-blue-500',
        topics: ['Statistics', 'Python', 'R', 'Data Visualization', 'Big Data']
      }
];

const getRoadmapData = (id) => {
    const roadmaps = {
      frontend: {
        title: 'Frontend Development',
        description: 'Complete guide to becoming a frontend developer',
        sections: [
          {
            title: 'HTML Fundamentals',
            items: [
              'HTML5 Basics',
              'Semantic HTML',
              'Forms and Validation',
              'SEO Basics',
              'Accessibility'
            ]
          },
          {
            title: 'CSS Essentials',
            items: [
              'CSS Fundamentals',
              'Flexbox',
              'Grid',
              'Responsive Design',
              'CSS Animations'
            ]
          },
          {
            title: 'JavaScript Core',
            items: [
              'JavaScript Basics',
              'DOM Manipulation',
              'ES6+ Features',
              'Async Programming',
              'Error Handling'
            ]
          },
          {
            title: 'Frontend Frameworks',
            items: [
              'React Fundamentals',
              'State Management',
              'Routing',
              'API Integration',
              'Testing'
            ]
          }
        ]
      },
      backend: {
        title: 'Backend Development',
        description: 'Master server-side programming and API development',
        sections: [
          {
            title: 'Programming Fundamentals',
            items: [
              'Data Structures',
              'Algorithms',
              'Object-Oriented Programming',
              'Functional Programming',
              'Design Patterns'
            ]
          },
          {
            title: 'Backend Languages',
            items: [
              'Node.js & Express',
              'Python & Django/Flask',
              'Java & Spring Boot',
              'PHP & Laravel',
              'Go Basics'
            ]
          },
          {
            title: 'Database Management',
            items: [
              'SQL Fundamentals',
              'MongoDB & NoSQL',
              'Database Design',
              'Query Optimization',
              'Data Modeling'
            ]
          },
          {
            title: 'API Development',
            items: [
              'REST API Design',
              'GraphQL',
              'API Security',
              'API Documentation',
              'API Testing'
            ]
          },
          {
            title: 'Server Management',
            items: [
              'Linux Basics',
              'Web Servers (Nginx/Apache)',
              'Caching Strategies',
              'Message Queues',
              'Microservices'
            ]
          }
        ]
      },
      fullstack: {
        title: 'Full Stack Development',
        description: 'Become proficient in both frontend and backend technologies',
        sections: [
          {
            title: 'Frontend Essentials',
            items: [
              'HTML/CSS/JavaScript',
              'React/Vue/Angular',
              'State Management',
              'Responsive Design',
              'Web Performance'
            ]
          },
          {
            title: 'Backend Fundamentals',
            items: [
              'Node.js Ecosystem',
              'Express/NestJS',
              'API Development',
              'Authentication/Authorization',
              'Server Management'
            ]
          },
          {
            title: 'Database Technologies',
            items: [
              'SQL Databases',
              'NoSQL Databases',
              'ORM/ODM',
              'Database Design',
              'Data Migration'
            ]
          },
          {
            title: 'DevOps & Deployment',
            items: [
              'Git Version Control',
              'CI/CD Pipelines',
              'Docker Basics',
              'Cloud Platforms',
              'Monitoring & Logging'
            ]
          },
          {
            title: 'Advanced Concepts',
            items: [
              'System Design',
              'Security Best Practices',
              'Testing Strategies',
              'Performance Optimization',
              'Scalability Patterns'
            ]
          }
        ]
      },
      mobile: {
        title: 'Mobile Development',
        description: 'Build native and cross-platform mobile applications',
        sections: [
          {
            title: 'Mobile Fundamentals',
            items: [
              'Mobile UI/UX Principles',
              'App Lifecycle',
              'Mobile Architecture',
              'State Management',
              'Offline Storage'
            ]
          },
          {
            title: 'React Native',
            items: [
              'React Native Basics',
              'Native Components',
              'Navigation',
              'Device APIs',
              'Performance Optimization'
            ]
          },
          {
            title: 'Native Android',
            items: [
              'Kotlin Fundamentals',
              'Android Studio',
              'Material Design',
              'Android APIs',
              'App Publishing'
            ]
          },
          {
            title: 'Native iOS',
            items: [
              'Swift Basics',
              'Xcode & Interface Builder',
              'UIKit/SwiftUI',
              'iOS APIs',
              'App Store Guidelines'
            ]
          },
          {
            title: 'Advanced Topics',
            items: [
              'Push Notifications',
              'App Security',
              'Analytics Integration',
              'CI/CD for Mobile',
              'App Optimization'
            ]
          }
        ]
      },
      devops: {
        title: 'DevOps Engineering',
        description: 'Learn cloud platforms, CI/CD, and infrastructure automation',
        sections: [
          {
            title: 'Version Control',
            items: [
              'Git Advanced Concepts',
              'Branching Strategies',
              'Git Workflows',
              'Code Review Process',
              'Monorepo Management'
            ]
          },
          {
            title: 'CI/CD',
            items: [
              'Jenkins/GitLab CI',
              'GitHub Actions',
              'Pipeline Design',
              'Automated Testing',
              'Deployment Strategies'
            ]
          },
          {
            title: 'Container Technologies',
            items: [
              'Docker Fundamentals',
              'Kubernetes Basics',
              'Container Orchestration',
              'Service Mesh',
              'Container Security'
            ]
          },
          {
            title: 'Cloud Platforms',
            items: [
              'AWS Services',
              'Azure Fundamentals',
              'GCP Essentials',
              'Cloud Architecture',
              'Cost Optimization'
            ]
          },
          {
            title: 'Infrastructure as Code',
            items: [
              'Terraform',
              'Ansible',
              'CloudFormation',
              'Pulumi',
              'Configuration Management'
            ]
          }
        ]
      },
      security: {
        title: 'Cybersecurity',
        description: 'Master security principles and protect digital assets',
        sections: [
          {
            title: 'Security Fundamentals',
            items: [
              'Security Principles',
              'Cryptography Basics',
              'Network Security',
              'Security Protocols',
              'Authentication Methods'
            ]
          },
          {
            title: 'Application Security',
            items: [
              'OWASP Top 10',
              'Secure Coding Practices',
              'Security Testing',
              'Vulnerability Assessment',
              'Code Analysis'
            ]
          },
          {
            title: 'Network Security',
            items: [
              'Firewall Configuration',
              'VPN Setup',
              'IDS/IPS Systems',
              'Network Monitoring',
              'Traffic Analysis'
            ]
          },
          {
            title: 'Incident Response',
            items: [
              'Incident Handling',
              'Forensics Basics',
              'Malware Analysis',
              'Threat Hunting',
              'Security Automation'
            ]
          },
          {
            title: 'Compliance & Governance',
            items: [
              'Security Frameworks',
              'Compliance Standards',
              'Risk Assessment',
              'Security Policies',
              'Audit Procedures'
            ]
          }
        ]
      }
    }
  
    return roadmaps[id] || null
  }
