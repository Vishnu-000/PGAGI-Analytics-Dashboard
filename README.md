# **PGAGI Analytics Dashboard**  

## **Project Overview**  
A **comprehensive analytics dashboard** built with **Next.js, TypeScript, and Tailwind CSS**. It integrates data from **multiple APIs** and provides an **interactive, user-friendly experience** with features like **drag-and-drop customization, animations, and dark mode**.  

## **Features**  
✅ **Weather, News, and Stock Data Fetching** (OpenWeather, NewsAPI, Alpha Vantage)  
✅ **Drag-and-Drop Widget Customization** (Rearrange dashboard elements easily)  
✅ **Dark Mode Toggle** for a seamless user experience  
✅ **Animations & Performance Optimizations** using **Framer Motion** and **lazy loading**  
✅ **Unit & E2E Testing** with **Jest & Cypress**  
✅ **Global Error Handling & API Fallback Mechanisms**  

## **Tech Stack**  
- **Framework**: Next.js (React, TypeScript)  
- **Styling**: Tailwind CSS, SCSS  
- **State Management**: Redux Toolkit, React Query  
- **Animations**: Framer Motion  
- **Data Visualization**: Recharts  
- **Drag-and-Drop**: react-beautiful-dnd  
- **Testing**: Jest, React Testing Library, Cypress  
- **Deployment**: Vercel  

## **Installation & Setup**  
### **1. Clone the Repository**  
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/pgagi-analytics-dashboard.git
cd pgagi-analytics-dashboard
```

### **2. Install Dependencies**  
```bash
yarn install
```

### **3. Set Up Environment Variables**  
Create a `.env.local` file and add your API keys:  
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_FINANCE_API_KEY=your_finance_api_key
```

### **4. Start Development Server**  
```bash
yarn dev
```
The application runs at **http://localhost:3000**  

## **Deployment**  
The project is **deployed on Vercel**: **[Live Demo](https://your-vercel-link.vercel.app/)**  

## **Testing**  
### **Run Unit Tests**  
```bash
yarn test
```

### **Run End-to-End (E2E) Tests**  
```bash
yarn e2e
```

## **Project Structure**  
```
/components    # Reusable UI components
/pages         # Next.js pages
/store         # Redux state management
/hooks         # Custom hooks
/services      # API integrations
/utils         # Utility functions
/tests         # Unit & E2E tests
```

## **Contributing**  
1. Fork the repository  
2. Create a new branch: `git checkout -b feature-branch`  
3. Commit your changes: `git commit -m "Added new feature"`  
4. Push to the branch: `git push origin feature-branch`  
5. Submit a Pull Request  

## **License**  
This project is licensed under the **MIT License**.  

---

Let me know if you need **any modifications** before adding this to your **GitHub repository**! 🚀
