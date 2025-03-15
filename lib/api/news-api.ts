import type { NewsArticle } from "@/components/news/news-section"

// Simulated API for news data
export async function fetchNewsData(category: string, page = 1) {
  // In a real app, this would be an API call to NewsAPI
  return new Promise<{
    articles: NewsArticle[]
    totalResults: number
    totalPages: number
  }>((resolve) => {
    setTimeout(() => {
      const articles = generateNewsArticles(category, page)
      resolve({
        articles,
        totalResults: 100,
        totalPages: 10,
      })
    }, 800)
  })
}

function generateNewsArticles(category: string, page: number): NewsArticle[] {
  const articles = []
  const today = new Date()

  const categoryTitles: Record<string, string[]> = {
    general: [
      "Global Summit Addresses Climate Change",
      "New Economic Policy Announced",
      "International Relations Strengthen Between Nations",
      "Major Infrastructure Project Launched",
      "Cultural Festival Celebrates Diversity",
      "Education Reform Bill Passes",
    ],
    technology: [
      "New AI Model Breaks Performance Records",
      "Tech Giant Unveils Revolutionary Smartphone",
      "Quantum Computing Breakthrough Announced",
      "Cybersecurity Threats on the Rise",
      "New Programming Language Gains Popularity",
      "Robotics Innovation Changes Manufacturing",
    ],
    business: [
      "Stock Market Reaches All-Time High",
      "Major Merger Between Industry Leaders",
      "Startup Secures Record Funding Round",
      "Economic Forecast Predicts Growth",
      "New Trade Agreement Signed",
      "Retail Sales Exceed Expectations",
    ],
    sports: [
      "Championship Final Ends in Dramatic Fashion",
      "Athlete Breaks World Record",
      "Team Announces New Coach",
      "Olympic Committee Reveals Future Plans",
      "Player Signs Record-Breaking Contract",
      "Tournament Expands to New Countries",
    ],
    health: [
      "New Medical Treatment Shows Promise",
      "Health Study Reveals Surprising Findings",
      "Pandemic Response Strategies Evaluated",
      "Mental Health Awareness Campaign Launched",
      "Breakthrough in Disease Prevention",
      "Fitness Trend Gains Global Popularity",
    ],
    entertainment: [
      "Blockbuster Movie Breaks Box Office Records",
      "Celebrity Announces New Project",
      "Award Show Celebrates Outstanding Achievements",
      "Streaming Platform Releases Original Series",
      "Music Festival Lineup Revealed",
      "Theater Production Receives Critical Acclaim",
    ],
    science: [
      "Astronomers Discover New Exoplanet",
      "Climate Research Shows Concerning Trends",
      "Breakthrough in Renewable Energy Technology",
      "Marine Biologists Document New Species",
      "Space Mission Reveals Surprising Data",
      "Genetic Research Opens New Possibilities",
    ],
  }

  const sources = [
    { name: "Tech News", url: "https://technews.com" },
    { name: "Business Daily", url: "https://businessdaily.com" },
    { name: "Sports Center", url: "https://sportscenter.com" },
    { name: "Health Journal", url: "https://healthjournal.com" },
    { name: "Entertainment Weekly", url: "https://entertainmentweekly.com" },
    { name: "Science Today", url: "https://sciencetoday.com" },
    { name: "Global Post", url: "https://globalpost.com" },
  ]

  const titles = categoryTitles[category] || categoryTitles.general

  for (let i = 0; i < 6; i++) {
    const date = new Date()
    date.setHours(today.getHours() - Math.floor(Math.random() * 24))
    date.setMinutes(Math.floor(Math.random() * 60))

    const titleIndex = ((page - 1) * 6 + i) % titles.length
    const title = titles[titleIndex]
    const sourceIndex = Math.floor(Math.random() * sources.length)

    articles.push({
      id: `${category}-${page}-${i}`,
      title,
      description: `This is a summary of the article about ${title.toLowerCase()}. The article provides in-depth analysis and expert opinions on this topic.`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`,
      url: `https://example.com/news/${category}/${page}/${i}`,
      image: getRelevantImageForCategory(category, i),
      publishedAt: date.toISOString(),
      source: sources[sourceIndex],
    })
  }

  return articles
}

function getRelevantImageForCategory(category: string, index: number): string {
  const categoryImages: Record<string, string[]> = {
    general: [
      "/placeholder.svg?height=400&width=600&text=Global+Summit",
      "/placeholder.svg?height=400&width=600&text=Economic+Policy",
      "/placeholder.svg?height=400&width=600&text=International+Relations",
      "/placeholder.svg?height=400&width=600&text=Infrastructure+Project",
      "/placeholder.svg?height=400&width=600&text=Cultural+Festival",
      "/placeholder.svg?height=400&width=600&text=Education+Reform",
    ],
    technology: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    ],
    business: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    ],
    sports: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=400&fit=crop",
    ],
    health: [
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop",
    ],
    entertainment: [
      "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1578022761797-b8636ac1773c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop",
    ],
    science: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1564325724739-bae0bd08762c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=600&h=400&fit=crop",
    ],
  }

  const images = categoryImages[category] || categoryImages.general
  return images[index % images.length]
}

