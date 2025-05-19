# FinalProject_INST377_ehaque1
README
1. Title
Coffee Explorer - A Coffee Discovery and Management Application

2. Description
Coffee Explorer is a web application that allows coffee enthusiasts to:

Discover and explore different coffee varieties

Add their favorite coffee experiences to a shared database

View random coffee images from an external API

Analyze coffee strength distribution through interactive charts

The application features a responsive design with a clean, modern interface and full CRUD (Create, Read, Update, Delete) functionality for coffee entries.

3. Target Browsers
Coffee Explorer is designed to work on:

Desktop browsers:

Chrome (latest version)

Firefox (latest version)

Safari (latest version)

Edge (latest version)

Mobile browsers:

iOS Safari (iOS 13+)

Chrome for Android (latest version)

Minimum requirements:

JavaScript enabled

Screen width ≥ 320px

Modern browser supporting ES6+ features

Link to Developer Manual

Developer Manual
1. Installation
Prerequisites
Node.js (v16 or higher)

npm (v8 or higher)

Supabase account (for database)

Setup Instructions
Clone the repository:

bash
git clone https://github.com/ehaque1/coffee-explorer.git
cd coffee-explorer
Install dependencies:

bash
npm install
Set up environment variables:
Create a .env file in the root directory with:

env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
Database setup:

Create a table named "Coffees" in your Supabase project with these columns:

sql
CREATE TABLE Coffees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  origin TEXT NOT NULL,
  brewing_method TEXT NOT NULL,
  strength INTEGER NOT NULL CHECK (strength BETWEEN 1 AND 5),
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
2. Running the Application
Development Mode
bash
npm start
The application will be available at http://localhost:3000

Production Mode
bash
npm install -g pm2
pm2 start index.js
3. Testing
Currently, the application includes manual testing procedures. Automated tests can be added using:

bash
npm install --save-dev jest supertest
Example test file (tests/app.test.js):

javascript
const request = require('supertest');
const app = require('../index');

describe('Coffee API', () => {
  it('should get all coffees', async () => {
    const res = await request(app).get('/coffees');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
Run tests with:

bash
npm test
4. API Documentation
Base URL: http://localhost:3000
Endpoints:
Method	Endpoint	Description	Request Body
GET	/coffees	Get all coffee entries	-
POST	/add-coffee	Add a new coffee entry	{ name, origin, brewing_method, strength, description, image_url? }
DELETE	/delete-coffee/:id	Delete a coffee entry by ID	-
GET	/random-coffee	Get a random coffee image from external API	-
Example Requests:

Get all coffees:

bash
curl http://localhost:3000/coffees
Add a new coffee:

bash
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Espresso",
  "origin": "Italy",
  "brewing_method": "Espresso machine",
  "strength": 4,
  "description": "Strong and concentrated coffee"
}' http://localhost:3000/add-coffee
Delete a coffee:

bash
curl -X DELETE http://localhost:3000/delete-coffee/123e4567-e89b-12d3-a456-426614174000
5. Known Issues & Roadmap
Known Bugs:
Image URL validation could be more robust

No pagination for coffee list (performance impact with many entries)

No user authentication system

Roadmap:
Next Release (v1.1):

Add user authentication

Implement pagination for coffee list

Add search functionality

Future Features:

Coffee rating system

User profiles with favorite coffees

Social sharing features

Mobile app version

Technical Improvements:

Add comprehensive test suite

Implement CI/CD pipeline

Add rate limiting for API

Implement caching for frequently accessed data

Contribution Guidelines:
Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -am 'Add some feature')

Push to the branch (git push origin feature/your-feature)

Create a new Pull Request
