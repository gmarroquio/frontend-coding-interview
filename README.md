## How to Run This Project

To run this project, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend-coding-interview
   ```
2. Install dependencies using npm:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_PEXELS_API_KEY=
```

### Running the Project

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Should be improved

- Pagination/infinite scroll
  - Use tanstack query with paginated queries/infinite queries
- Real login provider (eg: Clerk, WorkOS, built-in, ...)
- Ability to add new users and change their names/passwords
  - Add a user dashboard/setting page
- Real database
- Better error message/handling on login and photos page
