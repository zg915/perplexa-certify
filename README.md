# Perplexa Certify

## Overview

Perplexa Certify is a modern, interactive web application for exploring and managing export certifications. It features a real-time chat interface, dynamic certification cards, filtering, and deep integration with a backend that streams certification data.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn-ui components
- **Backend:** Expects a streaming API (see below)

---

## Project Structure

### Pages (`src/pages/`)
- **Index.tsx**: Main entry point. Manages tab switching, state for streamed answers/certifications, and composes the main layout.
- **NotFound.tsx**: 404 page for undefined routes.

### Components (`src/components/`)
- **Sidebar.tsx**: Fixed vertical navigation bar.
- **SearchHeader.tsx**: Centered search/question input at the top.
- **TabBar.tsx**: Tab navigation (Answer, Certifications) with minimal, modern styling.
- **AnswerContent.tsx**: Displays the streamed answer and certification pills as they arrive from the backend.
- **CertificationsGrid.tsx**: Shows all certifications as cards, supports filtering (All, Required, Optional), and displays a modal with full details on card click. Only certifications streamed from the backend are shown.
- **CertificationCard.tsx**: Renders a certification in a modern card layout, showing all backend fields. Clickable to open a modal for more details.
- **ChatInput.tsx**: Handles user input, streams questions to the backend, and manages loading state.
- **ui/**: Reusable UI primitives (buttons, badges, dialogs, etc.) from shadcn-ui or custom.

### Hooks (`src/hooks/`)
- **use-mobile.tsx**: Detects mobile devices.
- **use-toast.ts**: Toast notification logic.

### Utilities (`src/lib/`)
- **utils.ts**: General utility functions.

---

## Data Flow & Backend Integration

### Streaming Chat & Certifications
- When a user submits a question, the frontend POSTs to the backend at `/ask/stream` with `{ session_id, content }`.
- The backend responds with a stream of events (Server-Sent Events/SSE), including:
  - `user_message`: The user's message.
  - `answer_chunk`: Chunks of the assistant's answer (for streaming effect).
  - `flashcard`: Certification objects (see below).
  - `completed`: Final answer and a list of certifications.
- The frontend displays the answer and certifications in real time as they stream in.
- Loading state is shown while streaming.

### Certification Data Structure (from backend)
Each certification object must have:
- `name` (string): Title of the certification.
- `issuing_body` (string): Who issues the certification.
- `region` (string): Country or region.
- `description` (string): Main description.
- `classifications` (string[]): Tags/pills for quick filtering.
- `mandatory` (boolean): Whether the certification is required (shows a badge if true).
- `validity` (string): Duration or renewal info.
- `official_link` (string): URL to the official source or more info.

### Example Certification Object
```json
{
  "name": "FSSAI License",
  "issuing_body": "Food Safety and Standards Authority of India (FSSAI)",
  "region": "India",
  "description": "Mandatory license for all food business operators in India, ensuring compliance with food safety and hygiene standards under the Food Safety and Standards Act, 2006. It is essential for manufacturing, processing, storage, distribution, and sale of food products.",
  "classifications": ["product", "market_access"],
  "mandatory": true,
  "validity": "1 to 5 years, renewable; apply 30 days before expiry to avoid penalties.",
  "official_link": "https://fssai.gov.in"
}
```

---

## UI/UX Features

### Certification Cards
- Modern, info-rich cards showing all certification fields.
- Required certifications display a red "Required" badge.
- Tags are shown as colored pills.
- Cards are clickable; clicking opens a modal with full details.

### Filtering
- Pills above the grid allow filtering certifications by All, Required, or Optional.
- Filtering is applied to the streamed certifications only.

### Modal/Popup
- Clicking a card opens a dialog/modal with all details, including official link and tags.

### Real-Time Chat
- User can ask questions in the chat input at the bottom.
- Answers and certifications stream in real time from the backend.
- Loading spinner is shown while waiting for the backend.

### Certification Pills in Answer Tab
- Only the first 3 certifications are shown as pills below the answer.
- If there are more than 3, a "Show more" button appears. Clicking it switches to the Certifications tab to view all certifications.

---

## How to Run
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the frontend:
   ```sh
   npm run dev
   ```
3. Ensure your backend is running and accessible at the configured endpoint (default: `http://127.0.0.1:8000/ask/stream`).

---

## Customization & Extensibility
- To change the certification card layout, edit `src/components/CertificationCard.tsx`.
- To add more fields, update both the backend and the card component.
- To change the streaming/chat logic, see `src/components/ChatInput.tsx` and `src/pages/Index.tsx`.
- All UI primitives can be themed or replaced via the `ui/` directory.

---

## Contribution & Further Development
- Fork the repo and create a feature branch for your changes.
- Ensure your backend always returns the expected certification structure for seamless integration.
- PRs and suggestions are welcome!


