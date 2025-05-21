# ☕ Coffee Explorer

## Project Overview
A web application for coffee enthusiasts to discover, share, and explore coffee recipes. Users can submit their favorite coffees, browse a global collection, and get random coffee images from an external API.

### Target Browsers
- **Desktop**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Not optimized for**: IE11 or older browsers

### Key Features
- Add new coffee entries with details (name, origin, brewing method, etc.)
- View community-submitted coffees
- Fetch random coffee images from [Coffee API](https://coffee.alexflipnote.dev/)
- Responsive design for mobile and desktop

---

# 👨‍💻 Developer Manual

## Table of Contents
1. [Installation](#installation)
2. [Running Locally](#running-locally)
3. [Deployment](#deployment)
4. [API Documentation](#api-documentation)
5. [Troubleshooting](#troubleshooting)
6. [Future Improvements](#future-improvements)

---

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/ehaque1/coffee-explorer.git
cd coffee-explorer
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Create a `.env` file in the root directory with your Supabase credentials:
```env
SUPABASE_URL=your-supabase-url  
SUPABASE_KEY=your-supabase-key
```

---

## Running Locally

Start the development server:
```bash
npm start
```

The application will be available at: [http://localhost:3000](http://localhost:3000)

---

## 📡 **API Documentation**

### Available Endpoints

| Method | Endpoint         | Description                          | Parameters                    |
|--------|------------------|--------------------------------------|-------------------------------|
| GET    | `/coffees`       | Get all coffee entries               | None                          |
| POST   | `/add-coffee`    | Add a new coffee entry               | JSON body with coffee details |
| GET    | `/random-coffee` | Get random coffee image from external API | None                     |

---

## 🧪 **Example Requests**

**Get all coffees:**
```javascript
fetch('/coffees')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Add a new coffee:**
```javascript
fetch('/add-coffee', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Espresso",
    origin: "Italy",
    brewing_method: "Espresso machine",
    strength: 4,
    description: "Strong and aromatic"
  })
});
```

---

## 🚀 **Deployment**

We used **Vercel** to deploy the site. It was working initially, but is currently not working 😞.  
Check environment variables, routing, and build settings if redeploying.

---

## 🔮 **Future Improvements**

### ✅ Planned Features
- User authentication system  
- Coffee rating and reviews  
- Advanced search and filtering  
- Coffee brewing timer  

---

## 🐞 **Known Issues**
- No input validation on client-side  
- Limited error handling in some API endpoints  
- No pagination for coffee list  
