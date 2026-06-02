# Quick Start Guide - LLM Playground Frontend

## ⚡ 30-Second Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser. ✅

## 📋 Pre-flight Checklist

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn available (`npm --version`)
- [ ] Backend server running at `http://127.0.0.1:8000`
- [ ] `.env.local` file exists with `NEXT_PUBLIC_API_URL` set

## 📦 Installation Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

**Expected output:**
```
added 123 packages in 2m
```

### Step 2: Verify Installation
```bash
npm list next react tailwindcss typescript
```

**Should show:**
- next@16.2.6
- react@19.2.4
- tailwindcss@4.x
- typescript@5.x

### Step 3: Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

## 🧪 Testing the Application

1. **Open Browser**
   - Navigate to: `http://localhost:3000`

2. **Verify Layout**
   - ✓ Header with "LLM Playground" title visible
   - ✓ Sidebar visible on desktop (or toggle on mobile)
   - ✓ Chat area in center
   - ✓ Input field at bottom

3. **Test Message Sending**
   - Type: "Hello"
   - Click Send or press Enter
   - Wait for AI response (check backend is running)

4. **Verify Features**
   - ✓ User message appears on right (blue bubble)
   - ✓ AI message appears on left (gray bubble)
   - ✓ Messages have timestamps
   - ✓ Input clears after sending
   - ✓ Auto-scrolls to latest message

## 🔧 Configuration

### Environment Variables (`.env.local`)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

# For production:
# NEXT_PUBLIC_API_URL=https://api.your-domain.com
```

### For CORS Issues

If you get CORS errors:

1. **Backend must handle CORS:**
   ```python
   # FastAPI (backend/app/main.py)
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["http://localhost:3000"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Update .env.local** with correct backend URL

## 🚀 Build for Production

### Create Production Build
```bash
npm run build
```

### Verify Build Succeeded
```bash
npm start
```

**Expected output:**
```
  ▲ Next.js 16.2.6
  - Local:        http://localhost:3000

✓ Ready
```

## 🐛 Troubleshooting

### Issue: Port 3000 in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Issue: "Cannot find module" errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Issue: API connection fails
```bash
# Check backend is running
# Check .env.local has correct URL
# Check browser console for actual error message
# Verify CORS configuration on backend
```

### Issue: Tailwind styles not loading
```bash
# Rebuild next.js
npm run build
# or clear cache
rm -rf .next
npm run dev
```

### Issue: lucide-react icons not showing
```bash
# Reinstall lucide-react
npm install lucide-react
```

## 📚 File Reference

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main chat interface |
| `app/layout.tsx` | Root layout & dark mode |
| `app/globals.css` | Global styles & animations |
| `components/ChatWindow.tsx` | Message display area |
| `components/ChatInput.tsx` | Input & send button |
| `components/MessageBubble.tsx` | Individual message UI |
| `lib/api.ts` | Backend API calls |
| `.env.local` | Environment config |
| `package.json` | Dependencies |
| `tsconfig.json` | TypeScript config |

## 🎨 Customization Quick Tips

### Change Primary Color
Find `bg-blue-600` and `focus:ring-blue-500` in components, replace with:
- `bg-purple-600` for purple
- `bg-green-600` for green
- `bg-red-600` for red

### Change Message Bubble Width
Edit `MessageBubble.tsx`:
```tsx
// Current: max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl
// Change to: max-w-sm md:max-w-lg lg:max-w-2xl
```

### Add Auto-Clear Error Message
Edit `page.tsx`:
```tsx
// Add after setError(errorMessage):
setTimeout(() => setError(null), 5000); // Auto-clear after 5s
```

### Enable Local Chat History
Edit `page.tsx`:
```tsx
useEffect(() => {
  localStorage.setItem("chatHistory", JSON.stringify(messages));
}, [messages]);
```

## 📞 Support

### Check Logs
1. **Browser Console**: `F12` → Console tab
2. **Terminal**: Watch output in terminal where `npm run dev` is running
3. **Network**: `F12` → Network tab → Find `/api/v1/chat` requests

### Common Error Messages

| Error | Solution |
|-------|----------|
| `ECONNREFUSED 127.0.0.1:8000` | Backend not running |
| `CORS error` | Add CORS middleware to backend |
| `Cannot GET /` | Port already in use or server crashed |
| `Module not found: @/components` | Path alias issue, restart dev server |

## ✅ Verification Checklist

After installation, verify all of these work:

- [ ] `npm run dev` starts without errors
- [ ] Browser shows LLM Playground interface
- [ ] Sidebar visible on desktop
- [ ] Dark mode applied
- [ ] Can type in input field
- [ ] Send button clickable
- [ ] Chat window scrollable
- [ ] Backend responds to messages
- [ ] Error messages display properly
- [ ] Mobile responsive (test with F12 device emulation)

## 🎯 Next Steps

1. **Customize Branding**
   - Update title in `layout.tsx`
   - Change logo/icon in components

2. **Add Features**
   - Message history persistence
   - User authentication
   - Model selection
   - Settings panel

3. **Deploy**
   - Vercel (automatic from GitHub)
   - Docker container
   - AWS, Netlify, etc.

4. **Optimize**
   - Add analytics
   - Performance monitoring
   - Error tracking (Sentry)

---

**Status:** ✅ Production-Ready
**Last Updated:** June 1, 2026
**Version:** 1.0.0
