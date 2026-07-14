const resourceMap: Record<string, { title: string; url: string; type: string }[]> = {
  "react": [
    { title: "React Official Docs", url: "https://react.dev", type: "docs" },
    { title: "React Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", type: "video" },
    { title: "React Tutorial - W3Schools", url: "https://www.w3schools.com/react", type: "article" }
  ],
  "next.js": [
    { title: "Next.js Official Docs", url: "https://nextjs.org/docs", type: "docs" },
    { title: "Next.js Full Course - Traversy Media", url: "https://www.youtube.com/watch?v=mTz0GXj8NN0", type: "video" },
    { title: "Next.js Tutorial - freeCodeCamp", url: "https://www.freecodecamp.org/news/nextjs-tutorial", type: "article" }
  ],
  "typescript": [
    { title: "TypeScript Official Docs", url: "https://www.typescriptlang.org/docs", type: "docs" },
    { title: "TypeScript Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=30LWjhZzg50", type: "video" },
    { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "docs" }
  ],
  "javascript": [
    { title: "JavaScript MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "docs" },
    { title: "JavaScript Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg", type: "video" },
    { title: "JavaScript.info", url: "https://javascript.info", type: "article" }
  ],
  "html": [
    { title: "HTML MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", type: "docs" },
    { title: "HTML Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=pQN-pnXPaVg", type: "video" },
    { title: "HTML Tutorial - W3Schools", url: "https://www.w3schools.com/html", type: "article" }
  ],
  "css": [
    { title: "CSS MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", type: "docs" },
    { title: "CSS Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", type: "video" },
    { title: "CSS Tricks", url: "https://css-tricks.com", type: "article" }
  ],
  "tailwind": [
    { title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", type: "docs" },
    { title: "Tailwind CSS Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=ft30zcMlFa8", type: "video" }
  ],

  "node.js": [
    { title: "Node.js Official Docs", url: "https://nodejs.org/en/docs", type: "docs" },
    { title: "Node.js Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=Oe421EPjeBE", type: "video" },
    { title: "Node.js Tutorial - W3Schools", url: "https://www.w3schools.com/nodejs", type: "article" }
  ],
  "express": [
    { title: "Express.js Official Docs", url: "https://expressjs.com", type: "docs" },
    { title: "Express.js Full Course - Traversy Media", url: "https://www.youtube.com/watch?v=SccSCuHhOw0", type: "video" }
  ],
  "python": [
    { title: "Python Official Docs", url: "https://docs.python.org/3", type: "docs" },
    { title: "Python Full Course - freeCodeCamp", url: "https://youtu.be/rfscVS0vtbw?si=uqoncQ_5DcLYBEAL", type: "video" },
    { title: "Python Tutorial - W3Schools", url: "https://www.w3schools.com/python", type: "article" }
  ],
  "django": [
    { title: "Django Official Docs", url: "https://docs.djangoproject.com", type: "docs" },
    { title: "Django Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=F5mRW0jo-U4", type: "video" }
  ],
  "fastapi": [
    { title: "FastAPI Official Docs", url: "https://fastapi.tiangolo.com", type: "docs" },
    { title: "FastAPI Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=0sOvCWFmrtA", type: "video" }
  ],

  "sql": [
    { title: "SQL Tutorial - W3Schools", url: "https://www.w3schools.com/sql", type: "article" },
    { title: "SQL Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY", type: "video" }
  ],
  "postgresql": [
    { title: "PostgreSQL Official Docs", url: "https://www.postgresql.org/docs", type: "docs" },
    { title: "PostgreSQL Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=qw--VYLpxG4", type: "video" }
  ],
  "mongodb": [
    { title: "MongoDB Official Docs", url: "https://www.mongodb.com/docs", type: "docs" },
    { title: "MongoDB Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=4yqu8YF29cU", type: "video" }
  ],
  "mysql": [
    { title: "MySQL Official Docs", url: "https://dev.mysql.com/doc", type: "docs" },
    { title: "MySQL Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", type: "video" }
  ],

  "git": [
    { title: "Git Official Docs", url: "https://git-scm.com/doc", type: "docs" },
    { title: "Git Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", type: "video" },
    { title: "Git Tutorial - W3Schools", url: "https://www.w3schools.com/git", type: "article" }
  ],
  "docker": [
    { title: "Docker Official Docs", url: "https://docs.docker.com", type: "docs" },
    { title: "Docker Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=fqMOX6JJhGo", type: "video" }
  ],
  "kubernetes": [
    { title: "Kubernetes Official Docs", url: "https://kubernetes.io/docs/home", type: "docs" },
    { title: "Kubernetes Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=X48VuDVv0do", type: "video" }
  ],
  "aws": [
    { title: "AWS Official Docs", url: "https://docs.aws.amazon.com", type: "docs" },
    { title: "AWS Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=ulprqHHWlng", type: "video" }
  ],

  "machine learning": [
    { title: "ML Course - Andrew Ng Coursera", url: "https://www.coursera.org/learn/machine-learning", type: "course" },
    { title: "ML Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=NWONeJKn6kc", type: "video" }
  ],
  "deep learning": [
    { title: "Deep Learning Specialization - Coursera", url: "https://www.coursera.org/specializations/deep-learning", type: "course" },
    { title: "Deep Learning Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=VyWAvY2CF9c", type: "video" }
  ],
  "tensorflow": [
    { title: "TensorFlow Official Docs", url: "https://www.tensorflow.org/learn", type: "docs" },
    { title: "TensorFlow Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=tPYj3fFJGjk", type: "video" }
  ],
  "pytorch": [
    { title: "PyTorch Official Docs", url: "https://pytorch.org/docs/stable/index.html", type: "docs" },
    { title: "PyTorch Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=c36lUUr864M", type: "video" }
  ],

  "data structures": [
    { title: "DSA Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=8hly31xKli0", type: "video" },
    { title: "DSA - GeeksForGeeks", url: "https://www.geeksforgeeks.org/data-structures", type: "article" }
  ],
  "algorithms": [
    { title: "Algorithms Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=8hly31xKli0", type: "video" },
    { title: "Algorithms - GeeksForGeeks", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms", type: "article" }
  ],
  "system design": [
    { title: "System Design Primer - GitHub", url: "https://github.com/donnemartin/system-design-primer", type: "article" },
    { title: "System Design Full Course - freeCodeCamp", url: "https://www.youtube.com/watch?v=F2FmTdLtb_4", type: "video" }
  ]
}

// Default resources when skill not found in map
const defaultResources = (skill: string) => [
  {
    title: `${skill} Tutorial - GeeksForGeeks`,
    url: `https://www.geeksforgeeks.org/${skill.toLowerCase().replace(/\s+/g, "-")}`,
    type: "article"
  },
  {
    title: `${skill} - MDN Web Docs`,
    url: `https://developer.mozilla.org/en-US/search?q=${encodeURIComponent(skill)}`,
    type: "docs"
  },
  {
    title: `Learn ${skill} - freeCodeCamp`,
    url: `https://www.freecodecamp.org/news/search/?query=${encodeURIComponent(skill)}`,
    type: "article"
  }
]

export function getResourcesForSkill(skill: string) {
  const key = skill.toLowerCase().trim()
  if (resourceMap[key]) return resourceMap[key]

  for (const mapKey of Object.keys(resourceMap)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return resourceMap[mapKey]
    }
  }

  return defaultResources(skill)
}