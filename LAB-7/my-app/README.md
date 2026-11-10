# PawConnect – Pet Adoption Platform

PawConnect helps shelters and animal caregivers share pet profiles, helps prospective adopters find a match, and provides an adoption request workflow. The React frontend communicates with an Express REST API backed by MongoDB and Mongoose.

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

`backend/.env` defaults to `mongodb://127.0.0.1:27017/pawconnect`. Change `MONGODB_URI` if your MongoDB server uses a different address. The API won't start until it can connect to MongoDB.

Start the frontend and API together:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The API listens on [http://localhost:5000](http://localhost:5000); Vite proxies `/api` requests to it. For a production frontend build, run `npm run build`. Start just the API with `npm start`.

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

## Notes

The React app lives in `frontend/` and the Express/Mongoose API lives in `backend/`. Pet profiles accept an optional public photo URL; a stock-photo fallback is shown when one is omitted. Adoption request status is managed from the Adoption requests page.

```text
frontend/src/
  assets/       Pet image placeholder
  components/   Navigation, forms, cards, filters, and shared UI
  context/      Shared pet state
  hooks/        Reusable React hooks
  pages/        Home, browse, details, pet forms, and requests
  services/     Axios API client
  styles/       Responsive application styles
backend/
  config/       MongoDB connection
  controllers/  Pet and request handlers
  middleware/   Logging, validation, and error handling
  models/       Mongoose schemas
  routes/       REST API routers
```
