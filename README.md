# Mini Event Platform

A production-ready MERN stack application for creating, joining, and managing events with a robust concurrency-safe RSVP system.

## 🚀 features

- **User Authentication**: Secure JWT-based registration and login.
- **Event Management**: Create events with details (Date, Location, Capacity, Image).
- **RSVP System**: 
  - **Concurrency Safe**: Uses MongoDB atomic operators (`$inc`, `$push`) with condition checks in a single query to prevent overbooking.
  - **Duplicate Prevention**: Ensures users cannot RSVP twice.
- **Dashboard**: View all upcoming events and a personal dashboard for events hosted/attended.
- **Image Upload**: Integrated with Cloudinary via Multer.
- **Responsive Design**: Modern UI using pure CSS variables and flexbox/grid.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Axios, CSS Variables
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Image Storage**: Cloudinary

## ⚙️ Environment Variables

Create a `.env` file in `/server` and `/client`:

**Server** (`/server/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Client** (`/client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Local Setup

1. **Clone the repository**
2. **Install Dependencies**
   ```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
   ```

3. **Start the Application**
   ```bash
   # Terminal 1: Backend
   cd server
   npm run dev

   # Terminal 2: Frontend
   cd client
   npm run dev
   ```

## 📦 Deployment

### Backend (Render/Railway)
1. Push code to GitHub.
2. Connect repository to Render/Railway.
3. Set `ROOT DIRECTORY` to `server`.
4. Add environment variables.
5. Deploy.

### Frontend (Vercel/Netlify)
1. Push code to GitHub.
2. Connect repository to Vercel.
3. Set `ROOT DIRECTORY` to `client`.
4. Set Build Command `npm run build` and Output Directory `dist`.
5. Add `VITE_API_URL` environment variable (point to deployed backend URL).
6. Deploy.

## 🧠 RSVP Concurrency Solution

**The Problem**: In a high-traffic scenario, if multiple users try to RSVP to the last spot simultaneously, a standard "Read-Check-Write" approach will fail.
- User A reads `filledSpots: 9` (Capacity 10).
- User B reads `filledSpots: 9`.
- Both update `filledSpots` to 10.
- Result: 11/10 Attendees (Overbooking).

**Our Solution**: MongoDB Atomic Updates.
We perform the check **AND** the update in a single atomic database operation:

```javascript
db.events.findOneAndUpdate({
    _id: eventId,
    filledSpots: { $lt: capacity }, // 1. Condition: Only match if spots available
    attendees: { $ne: userId }      // 2. Condition: Only match if user not already joined
}, {
    $inc: { filledSpots: 1 },       // 3. Update: Increment count
    $push: { attendees: userId }    // 4. Update: Add user
});
```
If the condition fails (e.g., spots filled), the document is not found/modified, and the operation fails safely without race conditions.
