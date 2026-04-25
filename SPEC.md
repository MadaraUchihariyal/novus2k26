# AidBridge - Disaster Coordination Platform

## Project Overview

**Project Name:** AidBridge
**Type:** Multi-page web application
**Core Functionality:** Real-time disaster relief coordination platform connecting those in need with volunteers
**Target Users:** Disaster-affected individuals seeking help, Volunteers/relief workers, Admin users

---

## Pages

1. **Login Page** (`login.html`) - Authentication portal
2. **Main Application** (`index.html`) - Help request & volunteer dashboard

---

## UI/UX Specification

### Layout Structure

**Login Page:**
- Brand logo and tagline
- Email/password authentication form
- Social login options (Google)
- Anonymous login option
- Remember me checkbox
- Forgot password link

**Main Application (Single HTML with panel switching):**
1. Home/Landing - App branding and navigation
2. Request Help Form - Form panel for submitting requests
3. Volunteer Dashboard - Real-time dashboard for volunteers

**Responsive Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px 
- Desktop: > 1024px

### Visual Design

**Color Palette (Dark Civic/Humanitarian Tech Theme):**
- Primary: `#00F5D4` (Cyan - trust, clarity)
- Secondary: `#7B2CBF` (Purple - hope, growth)
- Accent: `#FF6B6B` (Coral - urgency, warmth)
- Background: `#050508` (Deep black)
- Glass Background: `rgba(255, 255, 255, 0.06)`
- Text Primary: `#FFFFFF`
- Text Secondary: `rgba(255, 255, 255, 0.7)`
- Text Muted: `rgba(255, 255, 255, 0.4)`
- Status Colors:
  - Pending: `#FFE66D` (Amber)
  - Accepted: `#00F5D4` (Cyan)
  - Completed: `#4CC9F0` (Blue)
- Urgency Colors:
  - High: `#FF6B6B`
  - Medium: `#FFE66D`
  - Low: `#4CC9F0`

**Typography:**
- Headings: 'Syne', sans-serif (modern, bold)
- Body: 'Syne', sans-serif
- Monospace: 'Space Mono', monospace (for technical info)
- Font Sizes:
  - Logo: 80px (mobile: 36px)
  - Page headings: 42px
  - Section headings: 26px
  - Body: 15px
  - Small: 12px

**Spacing System:**
- Section padding: 80px (mobile: 40px)
- Card padding: 32px
- Element gaps: 16px-24px
- Input padding: 18px

**Visual Effects:**
- Glassmorphism cards with backdrop blur
- Animated gradient orbs in background
- Grid overlay pattern
- Noise texture overlay
- Smooth panel transitions
- Button hover animations with glow

### Components

**Login Page:**
- Brand logo with animated icon
- Form with icon inputs
- Primary sign-in button
- Social login buttons (Google, Anonymous)
- Divider with "or"
- Remember me checkbox
- Forgot password link
- Footer with legal links

**App Header:**
- Logo with gradient text
- Tagline
- Navigation buttons (Request Help, Volunteer)
- Logout button
- User email display

**Request Help Form:**
- Name input (text)
- Anonymous checkbox
- Location input with geolocation button
- Help Type dropdown (Food, Medical, Rescue, Shelter)
- Urgency selector (Low, Medium, High)
- Submit button
- Confirmation message

**Volunteer Dashboard:**
- Dashboard title
- Stats badges (Pending, Accepted, Completed)
- Filter tabs (All, Pending, Active, Done)
- Request cards grid (responsive)
- Each card displays:
  - Name or "Anonymous"
  - Location
  - Help Type badge
  - Urgency badge
  - Status badge
  - Accept/Mark Done buttons

---

## Functionality Specification

### Authentication

1. **Login Methods:**
   - Email + Password (validates email format, password min 6 chars)
   - Google OAuth (simulated)
   - Anonymous (no credentials required)

2. **Session Management:**
   - `isLoggedIn` flag in localStorage
   - `loginType` (real/anonymous) in localStorage
   - `userEmail` stored for display

3. **Access Control:**
   - Real account login: stays logged in
   - Anonymous login: requires re-login each visit
   - Redirect to login if not authenticated

### Core Features

1. **Request Submission**
   - Form fields: name, isAnonymous, location, helpType, urgency
   - Validation: location and helpType required
   - Generates unique request ID (REQ001, REQ002, etc.)
   - Stores in localStorage for persistence
   - Shows confirmation message on success

2. **Volunteer Dashboard**
   - Displays all requests as cards
   - Real-time filtering by status
   - Sort by urgency (High first)
   - Stats counters animate on change

3. **Status Management**
   - New requests: status = "pending"
   - Accept button: status → "accepted"
   - Mark Done button: status → "completed"
   - No page reload (JavaScript DOM updates)

4. **Geolocation**
   - Get current location button
   - Uses Nominatim API for reverse geocoding
   - Falls back to coordinates if API fails

5. **Logout**
   - Clears authentication data
   - Redirects to login page

---

## Acceptance Criteria

1. Login page loads first every time
2. Real account login stays authenticated
3. Anonymous login requires re-authentication
4. All 3 login methods work
5. User email displayed when logged in
6. Logout clears session and redirects
7. Request form has all specified fields
8. Anonymous checkbox works
9. Geolocation button functions
10. Form validation prevents empty submission
11. Confirmation shown after submission
12. Dashboard shows all requests
13. Filter tabs work correctly
14. Accept button changes status
15. Mark Done button changes status
16. Responsive on mobile devices

---

## Technical Implementation

- HTML5 with semantic structure
- CSS custom properties for theming
- Vanilla JavaScript (no frameworks)
- localStorage for data persistence
- CSS Grid/Flexbox for layout
- CSS animations for transitions
- Form validation in JavaScript