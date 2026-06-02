# LLM Playground - Frontend Setup

## Project Structure

```
frontend/
├── app/
│   ├── globals.css          # Global styles with custom animations
│   ├── layout.tsx           # Root layout with dark mode support
│   └── page.tsx             # Main chat interface page
├── components/
│   ├── ChatWindow.tsx       # Chat message display area
│   ├── ChatInput.tsx        # Text input and send button
│   └── MessageBubble.tsx    # Individual message component
├── lib/
│   └── api.ts              # Backend API integration
├── .env.local              # Environment variables (local development)
├── .env.example            # Environment variables template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## Features

✅ **Modern SaaS Design** - Clean, professional interface inspired by ChatGPT
✅ **Responsive Layout** - Mobile, tablet, and desktop optimization
✅ **Dark Mode Support** - Built-in dark mode with Tailwind CSS
✅ **Professional Header** - Title, navigation, and action buttons
✅ **Chat Conversation History** - Full message history with timestamps
✅ **Message Bubbles** - User messages on right (blue), AI on left (gray)
✅ **Scrollable Chat Area** - Auto-scroll to latest message
✅ **Fixed Input Area** - Text input always visible at bottom
✅ **Loading Indicator** - Animated dots while AI responds
✅ **Error Handling** - User-friendly error messages
✅ **Clean Component Architecture** - Reusable, maintainable components

## Installation

### Prerequisites
- Node.js 18+ (preferably 20 or later)
- npm or yarn package manager

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - `.env.local` is already set with the default backend URL
   - For production, update `NEXT_PUBLIC_API_URL` to your backend address

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks

## Component Overview

### ChatWindow (`components/ChatWindow.tsx`)
- Displays all messages in conversation history
- Auto-scrolls to latest message
- Shows loading state with animated indicator
- Empty state with welcome message

### ChatInput (`components/ChatInput.tsx`)
- Text input field with placeholder
- Send button with icon
- Disabled states for loading and empty input
- Responsive design (shows button text on desktop, icon only on mobile)

### MessageBubble (`components/MessageBubble.tsx`)
- Displays individual messages with avatar
- User messages: blue bubble, right-aligned
- AI messages: gray bubble, left-aligned
- Message timestamps
- Loading animation with three bouncing dots

### API Integration (`lib/api.ts`)
- `sendChatMessage(prompt)` - Sends prompt to backend
- Handles request/response with proper error handling
- TypeScript interfaces for type safety
- Configurable API base URL via environment variables

## API Integration

Backend endpoint: `POST /api/v1/chat`

Request format:
```json
{
  "prompt": "Hello"
}
```

Response format:
```json
{
  "response": "Hello! How can I help?"
}
```

## Styling

- **Framework**: Tailwind CSS v4
- **Dark Mode**: Built-in with `dark:` prefix utilities
- **Custom Animations**: 
  - `animate-in` and `fade-in` for message appearance
  - Custom bounce animation for loading indicator
  - Smooth scroll behavior

## Dependencies

- **next** (16.2.6) - React framework
- **react** (19.2.4) - UI library
- **react-dom** (19.2.4) - React DOM renderer
- **tailwindcss** (4) - Utility CSS framework
- **lucide-react** (0.408.0) - Icon library
- **typescript** (5) - Type safety

## Development Tips

1. **Add new messages types** - Update the Message interface in `lib/api.ts`
2. **Customize colors** - Modify Tailwind classes in component files
3. **Add chat history** - Implement localStorage in main page component
4. **Improve animations** - Add more keyframe animations in `app/globals.css`
5. **Backend URL** - Update NEXT_PUBLIC_API_URL when deploying

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### API connection issues
- Verify backend is running at configured URL
- Check NEXT_PUBLIC_API_URL in .env.local
- Review browser console for detailed errors

### Build errors
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

## Production Build

```bash
npm run build
npm start
```

The application will be optimized and ready for deployment.

## Notes

- All components use client-side rendering (`"use client"`)
- Path alias `@/` is configured for absolute imports
- Dark mode is enabled by default but respects system preferences
- Message IDs use timestamps for simplicity (consider UUIDs for production)
