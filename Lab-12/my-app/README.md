# Orbit Identity and PawConnect Workspace

Orbit is a React authentication experience backed by an Express REST API and MongoDB. It supports account registration and login, JWT-protected profiles, and student/admin roles. Its authenticated workspace also includes the existing PawConnect pet-adoption features.

## Requirements

- Node.js 20 or newer
- MongoDB running locally or a MongoDB connection string

## Setup

Install dependencies from the repository root:

```bash
npm install
```

Copy the example environment file and set the MongoDB connection:

```powershell
Copy-Item backend/.env.example backend/.env
```

`backend/.env` defaults to `mongodb://127.0.0.1:27017/pawconnect`. Change `MONGODB_URI` if your MongoDB server uses a different address. Set `JWT_SECRET` to a long, unique random value before running the API; do not commit your `.env` file. The API won't start until it can connect to MongoDB.

Start the frontend and API together:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API listens on [http://localhost:5000](http://localhost:5000); Vite proxies `/api` requests to it. For a production frontend build, run `npm run build`. Start just the API with `npm start`.

To run either side separately from the repository root, use `npm run client` for Vite or `npm run server` for Express. The backend can also be started with `npm start`; run `npm install` once at the root to install both workspace dependencies.

## REST API

### Pets

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/pets` | List pets; accepts `search`, `animalType`, `age`, and `adoptionStatus` filters |
| `GET` | `/api/pets/:id` | Get a pet profile |
| `POST` | `/api/pets` | Add a pet |
| `PUT` | `/api/pets/:id` | Update a pet profile |
| `DELETE` | `/api/pets/:id` | Remove a pet and its adoption requests |

Animal type is `Dog`, `Cat`, or `Other`; adoption status is `Available` or `Adopted`. Age filter values are `puppy` (<1), `young` (1–3), `adult` (4–7), and `senior` (8+).

### Adoption requests

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/requests` | List adoption requests |
| `GET` | `/api/requests/:id` | Get an adoption request |
| `POST` | `/api/requests` | Submit a request for an available pet |
| `PUT` | `/api/requests/:id` | Update `requestStatus` to `Pending`, `Approved`, or `Rejected` |
| `DELETE` | `/api/requests/:id` | Delete a request |

Approving a request marks the pet as adopted and automatically declines its other pending applications.

### Authentication and roles

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a student account |
| `POST` | `/api/auth/login` | Sign in and receive a one-day JWT |
| `GET` | `/api/auth/profile` | Return the signed-in user's profile |
| `GET` | `/api/auth/admin` | Demonstrate an admin-only endpoint |

Send protected requests with `Authorization: Bearer <token>`. New registrations always receive the `student` role. Pet creation/updates/deletion and viewing or managing adoption requests require an `admin` account; submitting an adoption application remains public. The frontend keeps the JWT in session storage for the current browser tab and attaches it to API requests.

To promote an account to administrator for a practical demonstration, first register it, then use `mongosh` with the same database configured by `MONGODB_URI`:

```javascript
use pawconnect
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Replace `pawconnect` with the database name in your `MONGODB_URI` if you changed the default. Sign out and sign in again after promotion. User passwords are hashed with bcrypt and are never returned by the API.

## Notes

The React app lives in `frontend/` and the Express/Mongoose API lives in `backend/`. Pet profiles accept an optional public photo URL; a stock-photo fallback is shown when one is omitted. Adoption request status is managed from the Adoption requests page.

```text
frontend/src/
  assets/       Pet image placeholder
  components/   Navigation, auth forms, route guards, and shared UI
  context/      Shared pet and authentication state
  hooks/        Reusable React hooks
  pages/        Home, auth, profile, admin, pets, and adoption requests
  services/     Axios API client
  styles/       Responsive application styles
backend/
  config/       MongoDB connection
  controllers/  Auth, pet, and request handlers
  middleware/   JWT auth, role checks, logging, and validation
  models/       User, pet, and adoption-request schemas
  routes/       REST API routers
```
