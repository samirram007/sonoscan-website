# AI Agent Instruction — Website Home, Services, Department & Doctor UI Updates

## Objective

Update the existing website UI and functionality according to the requirements below.

**Important:** First inspect the existing project structure, routing, components, API/data models, and current UI. Reuse the existing architecture and components wherever possible. Do not unnecessarily rewrite working functionality.

---

## 1. Home Page

### Services / Department Chart

- Locate the existing **Services/Department chart** on the Home Page.
- Each department/service item that currently has a **tick mark or clickable indicator** must be properly clickable.
- When the user clicks a department/service:
  - Navigate to the corresponding **Centre + Department page**.
  - The opened page must show the doctors and information belonging to that selected department.
- Ensure the route is generated dynamically from the selected centre and department where the existing application architecture supports it.

### OPD Doctors

- Show the **OPD Doctor List** on the Home Page.
- Use the existing doctor data/API where available.
- Do not create duplicate/static doctor data if the backend already provides it.
- Doctor cards should link to the appropriate doctor profile/details page.

### About Us

- Keep the existing **About Us** section on the Home Page.
- Improve its presentation only if necessary to match the existing website design.
- Do not remove existing content or functionality.

---

## 2. Year-wise List

The existing year-wise list should **not load/display all years initially**.

### Required behavior

- Initially display only the **latest 5 years**.
- Add a **"See More"** link/button below the list.
- Clicking **"See More"** should reveal/load the next available years.
- Avoid loading unnecessary data if the API/backend supports pagination or limit/offset.
- Preserve the existing year sorting order.
- Prefer:

```text
Latest Year
Previous Year
Previous Year
Previous Year
Previous Year

        See More
```

instead of displaying the complete historical list immediately.

### Performance

The implementation should minimize:

- Initial API payload
- DOM elements
- Rendering time
- Unnecessary API requests

If the backend already supports pagination, use it instead of downloading all years and hiding them on the frontend.

---

# 3. Services Page

Update the Services page so that:

- Every department/service is clickable.
- Clicking a department opens its dedicated **Department Page**.
- The selected department must be reflected in the URL.
- The Department Page must load the correct department-specific information dynamically.

Example:

```text
Services
   ↓
Cardiology
   ↓
/departments/cardiology
```

or, if the application uses centre-specific routing:

```text
Services
   ↓
Centre A → Cardiology
   ↓
/centres/centre-a/departments/cardiology
```

Use the project's existing routing convention instead of introducing a conflicting route structure.

---

# 4. Diagnostic Doctors

The **Diagnostic Doctors** should be displayed in the appropriate Diagnostic section only.

Requirements:

- Do not unnecessarily display Diagnostic Doctors in other doctor sections.
- Do not duplicate the same doctor across OPD, Outdoor, and Diagnostic sections unless the underlying business rules explicitly require it.
- Use the existing doctor type/category/department information from the backend.
- If filtering already exists in the project, reuse it.

Expected concept:

```text
Doctors
│
├── OPD Doctors
│
├── Outdoor Doctors
│
└── Diagnostic Doctors
        └── Display here only
```

---

# 5. Outdoor Doctors

Create/maintain a separate **Outdoor Doctor** section based on the existing application structure.

- Display doctors classified as Outdoor Doctors.
- Use backend/API filtering where possible.
- Do not hardcode doctor lists.
- Maintain consistent doctor-card design with OPD doctors.

---

# 6. Branch → Department UI

The existing **Branch UI** should be used as the visual/reference pattern for displaying Departments.

If Branch currently looks like:

```text
Branch A
Branch B
Branch C
```

then Departments should follow the same design language.

For example:

```text
Departments

┌────────────────────┐
│ Cardiology         │
└────────────────────┘

┌────────────────────┐
│ Neurology          │
└────────────────────┘

┌────────────────────┐
│ Orthopedics        │
└────────────────────┘
```

or the equivalent existing Branch component structure.

### Important

Do not create a completely different UI unless necessary.

Reuse:

- Existing cards
- Existing spacing
- Existing typography
- Existing colors
- Existing hover effects
- Existing responsive behavior
- Existing icons

The Department UI should feel like a natural extension of the Branch UI.

---

# 7. Department Selection & Doctor Listing

When a user clicks a department:

```text
Department
     ↓
Department Page
     ↓
Doctors belonging to that Department
```

The Department Page should automatically show the relevant doctor list.

Example:

```text
Cardiology
────────────────────────

About Cardiology

Services
• Cardiac Consultation
• ECG
• Cardiac Monitoring

Doctors

[Dr. A] [Dr. B] [Dr. C]
```

If no department is selected, the general doctor listing should be displayed in **alphabetical order**.

### Alphabetical ordering

Default:

```text
Dr. Amit
Dr. Ananya
Dr. Arindam
Dr. Debashis
Dr. Rahul
Dr. Suman
```

Use the doctor's actual display/name field from the existing data model.

Do not implement alphabetical sorting based on hardcoded names.

---

# 8. Department Page Design

Improve the Department Pages so they look more polished and professional.

The existing Department Page functionality must be preserved, but the visual presentation can be enhanced.

Recommended structure:

```text
┌─────────────────────────────────────────────┐
│ Breadcrumb                                   │
│ Home / Services / Cardiology                 │
│                                              │
│ Cardiology                                   │
│ Department description                       │
└─────────────────────────────────────────────┘


Department Overview
─────────────────────────────────────────────

Department Description


Services / Facilities
─────────────────────────────────────────────

[Service]   [Service]   [Service]


Our Doctors
─────────────────────────────────────────────

[ Doctor Card ] [ Doctor Card ] [ Doctor Card ]


OPD / Consultation Information
─────────────────────────────────────────────

Timing
Location
Appointment information
```

### Visual improvements

Use the existing design system, but consider:

- Better hero/banner section
- Clean typography hierarchy
- Department icon/image
- Modern cards
- Consistent border radius
- Subtle shadows
- Hover states
- Better spacing
- Responsive grid
- Breadcrumb navigation
- Clear CTA
- Mobile-friendly layout

Do not introduce excessive animations.

---

# 9. Doctor Cards

Doctor cards should consistently contain relevant information such as:

```text
Doctor Photo

Dr. Doctor Name
Specialization
Department

View Profile
```

Only display fields that actually exist in the current data model.

Do not invent doctor information.

If the existing system already supports:

- Qualification
- Experience
- Specialization
- Consultation timing
- Department
- Centre
- Appointment

then display those fields where appropriate.

---

# 10. Routing Requirements

Inspect the existing routing architecture before implementing routes.

Department navigation should follow the application's current routing convention.

Possible structure:

```text
/services
/departments/:department
/doctors/:doctor
```

or:

```text
/centres/:centre/departments/:department
/centres/:centre/doctors/:doctor
```

Use the project's existing convention.

### Requirements

- Browser refresh must work on Department pages.
- Direct URL access must work.
- Back/forward navigation must work.
- Invalid department IDs/slugs should show the existing 404/not-found handling.
- Avoid passing large objects through navigation state when an ID/slug can be used.

---

# 11. Data/API Requirements

Before changing frontend logic, inspect:

- Existing API endpoints
- Department model/data
- Centre/Branch model/data
- Doctor model/data
- Doctor category/type
- Existing filters
- Existing pagination
- Existing relationships

Prefer:

```text
Centre
   ↓
Department
   ↓
Doctors
```

rather than maintaining separate manually duplicated frontend datasets.

If an existing API already supports:

```text
?department_id=
?centre_id=
?type=opd
?type=outdoor
```

reuse it.

Do not create a new API endpoint unless the existing API genuinely cannot satisfy the requirement.

---

# 12. Loading & Performance

Avoid unnecessary full-page loading.

For lists that can become large:

- Use pagination where available.
- Use "See More" for the year list.
- Use appropriate loading states.
- Avoid rendering hundreds of doctor cards unnecessarily.
- Avoid duplicate API requests.
- Reuse cached data if the existing frontend architecture supports caching.

For async data:

```text
Loading
   ↓
Data
   ↓
Empty State
   ↓
Error State
```

All four states should be handled appropriately.

---

# 13. Empty States

If a department has no doctors, do not show an empty blank section.

Display an appropriate message such as:

```text
No doctors are currently available for this department.
```

Similarly handle:

- No departments
- No services
- No OPD doctors
- No Outdoor doctors
- No Diagnostic doctors
- No additional years

Use the project's existing empty-state component if available.

---

# 14. Responsive Design

The complete implementation must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Pay particular attention to:

- Department cards
- Doctor cards
- Department hero
- Year list
- Services section
- Navigation
- Breadcrumbs

Do not introduce horizontal scrolling unless intentionally required.

---

# 15. Accessibility

Ensure:

- Clickable department elements are actual links/buttons.
- Images have meaningful `alt` text where appropriate.
- Keyboard navigation works.
- Focus states are visible.
- Buttons/links have clear labels.
- Do not use a `<div>` with only an `onClick` when a proper `<button>` or `<a>`/router link is appropriate.

---

# 16. Implementation Rules

Before coding:

1. Inspect the existing project.
2. Identify the current Home Page.
3. Identify the Services component/page.
4. Identify the Branch component.
5. Identify the Department component/page.
6. Identify doctor listing/card components.
7. Identify routing.
8. Identify API/data fetching logic.
9. Identify existing styling/design system.
10. Then implement the changes.

### Do not:

- Rewrite the whole application.
- Replace the existing design system unnecessarily.
- Create duplicate APIs.
- Hardcode doctor lists.
- Hardcode department lists if data already exists.
- Duplicate doctor records.
- Remove existing functionality.
- Introduce unnecessary dependencies.
- Break existing routes.
- Modify unrelated modules.

---

# 17. Final Verification

After implementation, verify the following:

### Home

- [ ] Services department/tick marks are clickable.
- [ ] Correct Centre + Department page opens.
- [ ] OPD doctors are displayed.
- [ ] About Us remains functional.
- [ ] Only 5 years initially display.
- [ ] See More works correctly.

### Services

- [ ] Departments are clickable.
- [ ] Correct Department Page opens.
- [ ] Correct doctors are displayed.

### Doctors

- [ ] OPD doctors are correctly filtered.
- [ ] Outdoor doctors are correctly filtered.
- [ ] Diagnostic doctors appear only in the Diagnostic section.
- [ ] General doctor listing is alphabetically ordered.
- [ ] Doctor profile links work.

### Department

- [ ] Branch-style Department UI is implemented.
- [ ] Department pages are visually improved.
- [ ] Department-specific doctors display correctly.
- [ ] Empty states work.
- [ ] Mobile layout works.
- [ ] Direct URL access works.
- [ ] Browser back/forward works.

### Performance

- [ ] No unnecessary API calls.
- [ ] No duplicate doctor data requests.
- [ ] Year list does not load unnecessary records initially.
- [ ] Existing caching/pagination mechanisms are reused where available.

### Code Quality

- [ ] Existing architecture is respected.
- [ ] No unnecessary dependencies.
- [ ] No unrelated files changed.
- [ ] No TypeScript/ESLint errors.
- [ ] No console errors.
- [ ] Existing functionality continues to work.