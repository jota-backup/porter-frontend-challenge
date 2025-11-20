# Product Requirements Document (PRD)

## User Management Application

**Version:** 1.0  
**Last Updated:** November 20, 2025  
**Project Type:** Frontend Technical Challenge

---

## 1. Executive Summary

This document outlines the requirements for building a user management web application that consumes data from a public API. The application will display users in a list/card format, allow users to view details, favorite/unfavorite users, and filter the list. This is a technical assessment project designed to evaluate React/JavaScript proficiency, API consumption, componentization, architectural best practices, testing, and solution clarity.

---

## 2. Goals and Objectives

### Primary Goals
- Demonstrate proficiency in React and JavaScript
- Showcase ability to consume and handle public REST APIs
- Implement clean, maintainable, and scalable code architecture
- Apply testing best practices
- Create a responsive and user-friendly interface

### Success Criteria
- Functional application meeting all core requirements
- Well-organized codebase with clear separation of concerns
- Proper error handling and loading states
- At least one unit test implemented
- Clear documentation in README
- Conventional commits pattern usage

---

## 3. API Selection

### Suggested APIs
1. **Random User API** - https://randomuser.me/
2. **Rick and Morty API** - https://rickandmortyapi.com/

### Minimum Required Data Fields
- `id` - Unique identifier
- `name` - User's name
- `email` - User's email (or equivalent contact field)
- `photo/avatar` - User's profile image

---

## 4. Core Features

### 4.1 User Listing
**Priority:** Critical

**Description:**  
Display users in a list or card layout with pagination or infinite scroll.

**Requirements:**
- Display users in list OR card format
- Show minimum data: photo, name, and email
- Implement pagination OR infinite scroll for loading more users
- Responsive design for different screen sizes

**Acceptance Criteria:**
- Users are displayed clearly with all required fields
- Pagination/infinite scroll works smoothly
- Loading state is shown while fetching data
- Error messages display if API fails

---

### 4.2 User Details View
**Priority:** Critical

**Description:**  
When clicking on a user, open a details screen showing additional information from the API.

**Requirements:**
- Clickable user cards/list items
- Details page/modal with extended user information
- Additional fields based on chosen API (location, status, species, phone, etc.)
- Navigation back to list view

**Acceptance Criteria:**
- Click interaction opens details view
- All available relevant data is displayed
- User can return to list view easily
- Details view is responsive

---

### 4.3 Favorite Users
**Priority:** Critical

**Description:**  
Allow users to favorite/unfavorite users with local persistence.

**Requirements:**
- Toggle favorite/unfavorite functionality
- Persist favorites using localStorage or persisted state
- Separate view/list for favorited users
- Visual indicator showing favorited status

**Acceptance Criteria:**
- Favorite toggle works immediately
- Favorites persist after page refresh
- Favorites list displays only favorited users
- Visual feedback confirms favorite status

---

### 4.4 Filtering
**Priority:** High

**Description:**  
Provide filtering capabilities to help users find specific entries.

**Requirements:**
- Filter by name (simple search)
- Filter to show only favorites
- Filters can be combined or work independently
- Clear filter option

**Acceptance Criteria:**
- Name search filters results in real-time or on submit
- Favorite filter shows only favorited users
- No results state is handled gracefully
- Filters can be cleared easily

---

### 4.5 User Feedback
**Priority:** High

**Description:**  
Provide clear feedback for all user actions and system states.

**Requirements:**
- Loading indicators when fetching data
- Success messages for actions (favoriting, etc.)
- Clear error messages when operations fail
- Empty states when no data is available

**Acceptance Criteria:**
- Loading states are visible and not blocking
- Error messages are user-friendly and actionable
- Success feedback is clear but not intrusive
- All states (loading, error, empty, success) are handled

---

## 5. Technical Requirements

### 5.1 Mandatory Technologies
- **React** - Core framework
- **Public REST API** - Data source (must choose one from suggestions)
- **State Management** - React Context, Zustand, OR Redux (justify choice in README)
- **CSS-in-JS** - Styled Components or similar solution
- **Git** - Version control with conventional commits

### 5.2 Testing Requirements
- Minimum: 1 unit test (e.g., favorite functionality)
- Tests should be well-written and meaningful
- Use Jest and/or React Testing Library

### 5.3 Code Quality Standards
- Clean code principles
- Clear separation of layers
- Component reusability
- Clear naming conventions
- Proper file/folder organization
- DRY (Don't Repeat Yourself) principle

### 5.4 Git Requirements
- Organized commit history
- **Conventional Commits** pattern mandatory
- Frequent commits showing development progress
- Clear commit messages

---

## 6. Differentiators (Bonus Points)

The following are **optional** features that demonstrate advanced skills:

- **GraphQL**: Adapt REST API using Apollo Client
- **TypeScript**: Well-typed implementation without `any`
- **Additional Tests**: More comprehensive test coverage with React Testing Library/Jest
- **Internationalization**: Implementation with react-i18next
- **Docker**: Containerization setup
- **Polished UI**: Microinteractions and accessibility features

---

## 7. Evaluation Criteria

The solution will be assessed on:

1. **Code Organization & Scalability** - Structure and maintainability
2. **API Consumption** - Proper requests, loading/error handling
3. **Architecture & Componentization** - Easy to maintain and expand
4. **State Management** - Clear manipulation of favorites and filters
5. **Testability** - Quality of tests even if minimal
6. **User Experience** - Simple but consistent and responsive interface
7. **Conventional Commits** - Proper commit message standards
8. **Documentation** - Clear README with setup and technical decisions

---

## 8. Delivery Requirements

### 8.1 Repository
- Public GitHub repository
- Share link via email to: `gente.gestao@portergroup.com.br`
- **Alternative**: If private repository preferred, share with GitHub users: `vainercesario` and `gmorfim`

### 8.2 README.md Must Include
- How to run the project
- Which public API was chosen and why
- How favorites persistence works
- Justification for architectural choices (especially state management)
- Setup instructions
- Dependencies and installation steps

### 8.3 Timeline
- **Maximum time**: 5 days from receipt of challenge
- Make frequent commits throughout development

---

## 9. User Stories

### US-01: View User List
**As a** user  
**I want to** see a list of users  
**So that** I can browse available profiles

**Acceptance Criteria:**
- Users display in list/card format
- Photo, name, and email are visible
- Can load more users via pagination/scroll

---

### US-02: View User Details
**As a** user  
**I want to** click on a user to see more details  
**So that** I can learn more about them

**Acceptance Criteria:**
- Clicking opens details view
- Additional information is displayed
- Can navigate back to list

---

### US-03: Favorite Users
**As a** user  
**I want to** mark users as favorites  
**So that** I can easily find them later

**Acceptance Criteria:**
- Can toggle favorite status
- Favorites persist after refresh
- Can view all favorites in separate list

---

### US-04: Search Users
**As a** user  
**I want to** search users by name  
**So that** I can quickly find specific people

**Acceptance Criteria:**
- Search field filters results
- Results update based on search input
- Can clear search

---

### US-05: Filter by Favorites
**As a** user  
**I want to** filter to show only favorites  
**So that** I can focus on my preferred users

**Acceptance Criteria:**
- Toggle shows only favorited users
- Can return to full list view
- Works in combination with name search

---

## 10. Non-Functional Requirements

### Performance
- Initial page load under 3 seconds
- Smooth scrolling and interactions
- Efficient API calls (avoid unnecessary requests)

### Accessibility
- Semantic HTML
- Keyboard navigation support
- Appropriate ARIA labels (bonus)

### Responsiveness
- Works on mobile, tablet, and desktop
- Touch-friendly interactions on mobile

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)

---

## 11. Out of Scope

The following are explicitly **NOT** required:
- Backend development
- User authentication/authorization
- Real database integration
- Deployment to production environment
- Creating/editing/deleting users (read-only application)

**End of PRD**
