# Directions UI Web Element - Design Specification

## Overview
A high-fidelity, interactive Directions UI component inspired by modern map interfaces (as seen in the reference screenshot), built with **React**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

The element includes the floating Directions card, interactive departure/traffic slider, search along route POI slider, panel collapse/expand slider handle, and an interactive background map with route polylines and map controls.

---

## 1. Component Architecture & Hierarchy

```
App.tsx (Main Preview Page)
├── MapView (Background map canvas)
│   ├── MapTiles / VectorLayer (Light style matching the Poland geography)
│   ├── RoutePolyline (Active route: purple line connecting Warsaw to Bialystok; Alt route: dashed/lighter)
│   ├── Markers (Origin marker at Warsaw/Skierniewice, Destination pin at Bialystok)
│   ├── SatelliteToggle (Bottom-left satellite image button with map/satellite switch)
│   └── MapControls (Bottom-right: Locate Me / Compass button, Zoom In [+], Zoom Out [-])
│
└── DirectionsCard (Floating responsive card, max-w-[420px])
    ├── CardHeader
    │   ├── HamburgerMenuButton (☰)
    │   ├── Title ("Directions")
    │   └── CloseButton (✕)
    │
    ├── TravelModes
    │   ├── Drive (Car icon, active purple badge, "2h 32m")
    │   ├── Transit (Train icon, "3h 29m")
    │   ├── Cycling (Bike icon, "1d")
    │   └── Rideshare (Taxi/Cab icon)
    │
    ├── RouteInputs
    │   ├── FromInput ("From: Your location")
    │   ├── SwapButton (Vertical arrows ⇅ to swap origin and destination)
    │   ├── ToInput ("To: Bialystok")
    │   └── AddStopButton ("+ Add stop")
    │
    ├── TripPlanningBar
    │   ├── LeaveNowDropdown ("Leave now ▼" with Depart At / Arrive By options)
    │   ├── PlanTripLink ("Plan a trip")
    │   └── DepartureTimeSlider (Collapsible slider to scrub departure time and see estimated traffic)
    │
    ├── RouteAlternativesList
    │   ├── ActiveRouteItem
    │   │   ├── ActiveIndicator (Vertical purple indicator bar on left border)
    │   │   ├── ModeIcon (Car)
    │   │   ├── RouteTitle ("via Trasa Bohaterów Bitwy Warszawskiej 1920")
    │   │   ├── Stats ("2h 32m • 249km")
    │   │   ├── TrafficBadge ("Fastest route, due to traffic.")
    │   │   └── DirectionsButton ("Directions")
    │   └── AlternativeRouteItem
    │       ├── ModeIcon (Car)
    │       ├── RouteTitle ("via S8")
    │       ├── Stats ("2h 55m • 230km")
    │       ├── TrafficBadge ("Straight route, big traffic.")
    │       └── DirectionsButton ("Directions")
    │
    ├── SearchAlongRoute
    │   ├── SectionTitle ("Search along route")
    │   ├── RadiusSlider (Interactive slider to adjust POI search radius: 1km - 15km)
    │   └── CategorySlider (Horizontal scrollable/slider pills):
    │       ├── Toilets (Restroom icon in purple circle)
    │       ├── Gas stations (Fuel icon in purple circle)
    │       ├── Restaurants (Utensils icon in purple circle)
    │       ├── Hotels (Bed icon in purple circle)
    │       ├── Cafes (Coffee icon in purple circle)
    │       └── More (Ellipsis icon in purple circle)
    │
    └── DrawerSliderHandle (Side slider button to collapse/expand panel off-screen)
```

---

## 2. Interactive Features & States

1. **Travel Mode Switching**: Clicking Car, Transit, Bike, or Rideshare updates the active state, recomputes travel times, and updates the displayed routes.
2. **Swap From/To**: Clicking the swap button exchanges the origin and destination inputs with a smooth flip animation.
3. **Dynamic Stops**: Clicking "+ Add stop" inserts an intermediate waypoint between origin and destination with a remove button.
4. **Departure Time Slider**:
   - Scrubbing the slider adjusts the departure time (e.g. 08:00 to 20:00).
   - Traffic indicator dynamically shifts between green (low traffic), orange (moderate), and purple/red (congested).
5. **Route Selection**: Clicking any route card makes it active, shifts the purple vertical indicator bar, and highlights the corresponding polyline on the map.
6. **POI Search & Distance Slider**:
   - Allows scrubbing the search radius along the route.
   - Clicking a category (Gas, Food, Restrooms) shows simulated POI markers along the active route line.
7. **Drawer Slider / Collapse**:
   - A toggle tab/handle on the right edge of the card allows sliding the panel into collapsed/expanded states.
8. **Map Controls**:
   - Satellite button toggles between satellite imagery and minimalist vector road map.
   - `+` and `-` zoom the map in and out.
   - Location button centers the viewport on user's location.

---

## 3. Technology Stack

* **Framework:** React 18 / 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (modern typography, custom rounded badges, box shadows, fluid transitions)
* **Icons:** `lucide-react`
* **Map:** Leaflet / OpenStreetMap or custom styled SVG interactive vector map matching the screenshot
* **Preview Server:** Vite dev server / static build preview

---

## 4. Verification Plan

* **Visual Accuracy:** Compare against `media_1789773655370.png` ensuring font weights, purple brand color (`#5B4DF5`), border radii (`rounded-3xl`), shadows, and badge styling match.
* **Component Testing:**
  - Tab selection changes active style.
  - From/To swap button swaps text.
  - Route selection activates the indicator.
  - Sliders respond smoothly to touch and mouse drag.
  - Drawer handle collapses/expands the card.
* **Static Web Page Preview:** Run Vite preview / dev server and verify local URL accessibility.
