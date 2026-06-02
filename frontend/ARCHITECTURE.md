# LLM Playground - Frontend Architecture

## System Overview

```
┌─────────────────────────────────────────────────┐
│         LLM Playground Frontend                 │
│          (Next.js 15 + TypeScript)             │
└─────────────────────────────────────────────────┘
             │
             ├─ Components Layer
             │  ├── ChatWindow.tsx (Message Display)
             │  ├── ChatInput.tsx (User Input)
             │  └── MessageBubble.tsx (Message UI)
             │
             ├─ Business Logic Layer
             │  └── page.tsx (State Management)
             │
             ├─ Data Layer
             │  └── lib/api.ts (Backend Communication)
             │
             └─ Styling Layer
                ├── globals.css (Global Styles)
                └── layout.tsx (Layout & Theme)
```

## Component Hierarchy

```
<Home (page.tsx)>
  │
  ├─ <header>
  │  ├─ Sidebar Toggle (Mobile)
  │  ├─ Title & Logo
  │  └─ Action Buttons
  │
  ├─ <aside> (Sidebar)
  │  ├─ New Chat Button
  │  ├─ Recent Conversations
  │  └─ Settings Button
  │
  └─ <main>
     ├─ <ChatWindow>
     │  └─ {messages.map(msg => <MessageBubble />)}
     │
     ├─ {error && <ErrorAlert />}
     │
     └─ <ChatInput>
        ├─ Text Input Field
        └─ Send Button
```

## Data Flow

```
1. User types message
   ↓
2. Click Send or Press Enter
   ↓
3. handleSendMessage() called
   ├─ Create user message object
   ├─ Add to messages state
   ├─ Set loading = true
   │
   ↓ (async)
4. sendChatMessage() (API call)
   ├─ POST to backend
   ├─ Wait for response
   │
   ↓
5. Process response
   ├─ Create assistant message
   ├─ Add to messages state
   ├─ Set loading = false
   │
   ↓
6. ChatWindow updates
   ├─ Display new messages
   ├─ Auto-scroll to bottom
   ├─ Show loading indicator (if loading)
```

## Type Definitions

```typescript
// Message type (from lib/api.ts)
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// API Request/Response
interface ChatRequest {
  prompt: string;
}

interface ChatResponse {
  response: string;
}
```

## State Management

**Home Component (page.tsx):**
- `messages: Message[]` - All conversation messages
- `isLoading: boolean` - Loading state during API call
- `error: string | null` - Error message if API fails
- `sidebarOpen: boolean` - Sidebar visibility (mobile)

## API Integration

**Endpoint:** `POST http://127.0.0.1:8000/api/v1/chat`

**Function:** `sendChatMessage(prompt: string): Promise<ChatResponse>`

**Error Handling:**
- Network errors caught and logged
- User-friendly error messages displayed
- Loading state cleared on error
- Error dismissible via button

## Responsive Breakpoints

- **Mobile** (<640px): Sidebar hidden, single column
- **Tablet** (640px-1024px): Sidebar hidden by default, collapsible
- **Desktop** (>1024px): Sidebar always visible, two columns

## Dark Mode Implementation

- `dark:` prefix utilities throughout components
- Configured in layout.tsx root element
- Smooth color transitions
- Custom scrollbar styling for dark mode

## Performance Optimizations

1. **Component Memoization**
   - `useCallback` for message handler

2. **Conditional Rendering**
   - Empty state when no messages
   - Loading indicator instead of full re-render

3. **Event Handling**
   - Input trimming and validation
   - Debounced button states

4. **Auto-Scroll**
   - Smooth scroll only when new messages added
   - Uses Intersection Observer pattern

## File Sizes (Estimated)

- **page.tsx**: ~3.5 KB
- **ChatWindow.tsx**: ~2.2 KB
- **ChatInput.tsx**: ~2.1 KB
- **MessageBubble.tsx**: ~2.5 KB
- **api.ts**: ~1.2 KB
- **globals.css**: ~2 KB
- **layout.tsx**: ~1 KB

**Total**: ~14.5 KB (uncompressed, before Tailwind purging)

## Dependencies Graph

```
next (16.2.6)
├── react (19.2.4)
├── react-dom (19.2.4)
└── lucide-react (0.408.0)

tailwindcss (4)
├── @tailwindcss/postcss
└── postcss

typescript (5)
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome for Android)

## Accessibility Features

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels on interactive elements
- Proper heading hierarchy
- Color contrast ratios meet WCAG standards

## Security Considerations

- Input sanitization (trim + validation)
- CORS handled by backend
- No sensitive data in localStorage (yet)
- XSS prevention via React's default escaping
- NEXT_PUBLIC_ prefix for client-side env vars only

## Future Enhancement Ideas

1. **Message Persistence**
   - Save to localStorage
   - IndexedDB for large histories
   - Backend persistence

2. **User Features**
   - Chat history sidebar
   - Export conversations
   - Copy message to clipboard
   - Edit sent messages

3. **AI Features**
   - Streaming responses
   - Token counter
   - Model selection
   - Temperature/parameter adjustments

4. **UI/UX**
   - Voice input
   - File uploads
   - Code syntax highlighting
   - Markdown rendering
   - Dark/Light mode toggle

5. **Performance**
   - Virtual scrolling for long histories
   - Message pagination
   - Code splitting
   - Image optimization
