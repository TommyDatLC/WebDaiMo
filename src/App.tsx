import { useState } from 'react';
import {
  Car,
  Train,
  Bike,
  CarFront,
  Users,
  Fuel,
  Utensils,
  MoreHorizontal,
  Coffee,
  Sliders,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';

import {
  Slider,
  InputField,
  RouteInputGroup,
  TabBar,
  CircleButton,
  Dropdown,
  ListItemCard,
  ZoomControls,
  LocateButton,
  SatelliteToggle,
  HeaderBar,
} from './components/ui';

import { MapBackground } from './components/Map/MapBackground';

export function App() {
  const [viewMode, setViewMode] = useState<'assembled' | 'elements'>('assembled');

  // Interactive states for UI elements showcase
  const [sliderVal1, setSliderVal1] = useState(65);
  const [sliderVal2, setSliderVal2] = useState(8);
  const [timeMinutes, setTimeMinutes] = useState(510); // 08:30

  const [inputVal1, setInputVal1] = useState('Your location');
  const [inputVal2, setInputVal2] = useState('Bialystok');
  const [stops, setStops] = useState<string[]>(['Warszawa']);

  const [activeTab, setActiveTab] = useState('car');
  const [activeCircleBtn, setActiveCircleBtn] = useState('toilets');
  const [dropdownVal, setDropdownVal] = useState('leave_now');
  const [activeListItem, setActiveListItem] = useState('route-1');
  const [isSatellite, setIsSatellite] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const formatMinutes = (totalMin: number) => {
    const hours = Math.floor(totalMin / 60);
    const mins = totalMin % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F0F2F6] text-gray-900 font-sans flex flex-col">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#5B4DF5] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">
              UI Elements Design System
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Styled after reference map interface
            </p>
          </div>
        </div>

        {/* View Switcher: Assembled Map Preview vs Elements Showcase */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200/80">
          <button
            type="button"
            onClick={() => setViewMode('assembled')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'assembled'
                ? 'bg-white text-[#5B4DF5] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Assembled Layout
            </span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('elements')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'elements'
                ? 'bg-white text-[#5B4DF5] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Individual UI Elements
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'assembled' ? (
        /* ASSEMBLED PREVIEW (Matching Screenshot Pixel-for-Pixel) */
        <div className="relative flex-1 w-full h-[calc(100vh-57px)] overflow-hidden">
          {/* Map Background Layer */}
          <MapBackground activeRouteId={activeListItem} />

          {/* Floating UI Card composed of the atomic UI elements */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
            <div className="w-[390px] sm:w-[410px] bg-white rounded-3xl shadow-floating border border-black/5 p-6 overflow-hidden">
              {/* UI Element 1: HeaderBar */}
              <HeaderBar
                title="Directions"
                onMenuClick={() => triggerNotice('Menu toggled')}
                onClose={() => triggerNotice('Close action triggered')}
                className="mb-5"
              />

              {/* UI Element 2: TabBar */}
              <TabBar
                activeId={activeTab}
                onChange={(id) => {
                  setActiveTab(id);
                  triggerNotice(`Selected travel mode: ${id.toUpperCase()}`);
                }}
                className="mb-6 px-2"
                items={[
                  {
                    id: 'car',
                    icon: <Car className="w-5 h-5 fill-current" />,
                    subLabel: '2h 32m',
                    label: 'Driving',
                  },
                  {
                    id: 'transit',
                    icon: <Train className="w-5 h-5" />,
                    subLabel: '3h 29m',
                    label: 'Transit',
                  },
                  {
                    id: 'bike',
                    icon: <Bike className="w-5 h-5" />,
                    subLabel: '1d',
                    label: 'Cycling',
                  },
                  {
                    id: 'rideshare',
                    icon: <CarFront className="w-5 h-5" />,
                    label: 'Rideshare',
                  },
                ]}
              />

              {/* UI Element 3: RouteInputGroup (InputFields with Swap & Add Stop) */}
              <RouteInputGroup
                fromValue={inputVal1}
                toValue={inputVal2}
                onFromChange={setInputVal1}
                onToChange={setInputVal2}
                onSwap={() => {
                  const temp = inputVal1;
                  setInputVal1(inputVal2);
                  setInputVal2(temp);
                  triggerNotice('Swapped From & To locations');
                }}
                stops={stops}
                onAddStop={() => {
                  if (stops.length < 3) setStops([...stops, '']);
                  triggerNotice('Added new stop');
                }}
                onRemoveStop={(idx) => {
                  setStops(stops.filter((_, i) => i !== idx));
                  triggerNotice('Removed stop');
                }}
                onStopChange={(idx, val) => {
                  const updated = [...stops];
                  updated[idx] = val;
                  setStops(updated);
                }}
                className="mb-4"
              />

              {/* UI Element 4: Dropdown & Time Planning Bar */}
              <div className="flex items-center justify-between py-1 mb-4">
                <Dropdown
                  value={dropdownVal}
                  onChange={(val) => {
                    setDropdownVal(val);
                    triggerNotice(`Timing set to: ${val.replace('_', ' ')}`);
                  }}
                  options={[
                    { value: 'leave_now', label: 'Leave now' },
                    { value: 'depart_at', label: `Depart at ${formatMinutes(timeMinutes)}` },
                    { value: 'arrive_by', label: `Arrive by ${formatMinutes(timeMinutes)}` },
                  ]}
                />
                <button
                  type="button"
                  onClick={() => triggerNotice('Plan a trip opened')}
                  className="text-[12px] font-semibold text-[#5B4DF5] hover:underline focus:outline-none"
                >
                  Plan a trip
                </button>
              </div>

              {/* UI Element 5: ListItemCard (Route Alternatives with vertical purple indicator bar) */}
              <div className="space-y-3.5 mb-6 -mx-6">
                <ListItemCard
                  id="route-1"
                  icon={<Car className="w-5 h-5 fill-current" />}
                  title="via Trasa Bohaterów Bitwy Warszawskiej 1920"
                  subtitle="Fastest route, due to traffic."
                  primaryStat="2h 32m"
                  secondaryStat="249km"
                  actionText="Directions"
                  isActive={activeListItem === 'route-1'}
                  onClick={() => {
                    setActiveListItem('route-1');
                    triggerNotice('Switched to fastest route');
                  }}
                  onActionClick={() => triggerNotice('Started turn-by-turn navigation')}
                />
                <ListItemCard
                  id="route-2"
                  icon={<Car className="w-5 h-5 fill-current" />}
                  title="via S8"
                  subtitle="Straight route, big traffic."
                  primaryStat="2h 55m"
                  secondaryStat="230km"
                  actionText="Directions"
                  isActive={activeListItem === 'route-2'}
                  onClick={() => {
                    setActiveListItem('route-2');
                    triggerNotice('Switched to S8 route');
                  }}
                  onActionClick={() => triggerNotice('Started turn-by-turn navigation')}
                />
              </div>

              {/* UI Element 6: CircleButton (Search along route) */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    Search along route
                  </h2>
                  <span className="text-xs font-semibold text-gray-400">
                    {sliderVal2} km
                  </span>
                </div>

                <div className="flex items-start justify-between">
                  <CircleButton
                    icon={<Users className="w-5 h-5 stroke-[2.2]" />}
                    label="Toilets"
                    isActive={activeCircleBtn === 'toilets'}
                    onClick={() => {
                      setActiveCircleBtn('toilets');
                      triggerNotice('Finding restrooms along route...');
                    }}
                  />
                  <CircleButton
                    icon={<Fuel className="w-5 h-5 stroke-[2.2]" />}
                    label={'Gas\nstations'}
                    isActive={activeCircleBtn === 'gas'}
                    onClick={() => {
                      setActiveCircleBtn('gas');
                      triggerNotice('Finding gas stations along route...');
                    }}
                  />
                  <CircleButton
                    icon={<Utensils className="w-5 h-5 stroke-[2.2]" />}
                    label="Restaurants"
                    isActive={activeCircleBtn === 'restaurants'}
                    onClick={() => {
                      setActiveCircleBtn('restaurants');
                      triggerNotice('Finding restaurants along route...');
                    }}
                  />
                  <CircleButton
                    icon={<MoreHorizontal className="w-5 h-5 stroke-[2.5]" />}
                    label="More"
                    isActive={activeCircleBtn === 'more'}
                    onClick={() => {
                      setActiveCircleBtn('more');
                      triggerNotice('More categories...');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INDIVIDUAL UI ELEMENTS CATALOG SHOWCASE */
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-8 space-y-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Design System Component Library
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Every element crafted in the exact visual style, typography, and color palette of your reference image.
            </p>
          </div>

          {/* Grid of UI Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. SLIDERS */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">1. Sliders</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;Slider /&gt; with custom thumb, purple track, and live values
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  Slider.tsx
                </span>
              </div>

              <div className="space-y-6 pt-1">
                {/* Continuous Range Slider */}
                <Slider
                  label="Search Corridor Radius"
                  min={1}
                  max={25}
                  unit=" km"
                  value={sliderVal2}
                  onChange={setSliderVal2}
                  minLabel="1 km (close)"
                  maxLabel="25 km (wide)"
                />

                {/* Percentage / Value Slider */}
                <Slider
                  label="Route Speed / Traffic Threshold"
                  min={0}
                  max={100}
                  unit="%"
                  value={sliderVal1}
                  onChange={setSliderVal1}
                  minLabel="Low traffic"
                  maxLabel="High traffic"
                />

                {/* Time of Day Slider */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-800">Departure Time Scrub</span>
                    <span className="font-bold text-[#5B4DF5] bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                      {formatMinutes(timeMinutes)}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={1425}
                    step={15}
                    value={timeMinutes}
                    showValueBadge={false}
                    showMinMaxLabels={true}
                    minLabel="00:00"
                    maxLabel="23:45"
                    onChange={setTimeMinutes}
                  />
                </div>
              </div>
            </section>

            {/* 2. INPUT FIELDS */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">2. Input Fields</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;InputField /&gt; and &lt;RouteInputGroup /&gt; with swap action
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  InputField.tsx
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <InputField
                  label="Search:"
                  placeholder="Enter address, city or waypoint..."
                  value={inputVal1}
                  onChange={setInputVal1}
                />

                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-bold text-gray-500 mb-2">Paired Group with Swap & Dynamic Stops:</p>
                  <RouteInputGroup
                    fromValue={inputVal1}
                    toValue={inputVal2}
                    onFromChange={setInputVal1}
                    onToChange={setInputVal2}
                    onSwap={() => {
                      const t = inputVal1;
                      setInputVal1(inputVal2);
                      setInputVal2(t);
                    }}
                    stops={stops}
                    onAddStop={() => setStops([...stops, ''])}
                    onRemoveStop={(idx) => setStops(stops.filter((_, i) => i !== idx))}
                    onStopChange={(idx, v) => {
                      const copy = [...stops];
                      copy[idx] = v;
                      setStops(copy);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* 3. TAB BAR / MODE SELECTOR */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">3. Tab Bar</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;TabBar /&gt; with rounded square badges & duration indicators
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  TabBar.tsx
                </span>
              </div>

              <div className="p-4 bg-gray-50/70 rounded-2xl">
                <TabBar
                  activeId={activeTab}
                  onChange={setActiveTab}
                  items={[
                    {
                      id: 'car',
                      icon: <Car className="w-5 h-5 fill-current" />,
                      subLabel: '2h 32m',
                      label: 'Driving',
                    },
                    {
                      id: 'transit',
                      icon: <Train className="w-5 h-5" />,
                      subLabel: '3h 29m',
                      label: 'Transit',
                    },
                    {
                      id: 'bike',
                      icon: <Bike className="w-5 h-5" />,
                      subLabel: '1d',
                      label: 'Cycling',
                    },
                    {
                      id: 'rideshare',
                      icon: <CarFront className="w-5 h-5" />,
                      subLabel: '35m',
                      label: 'Rideshare',
                    },
                  ]}
                />
              </div>
            </section>

            {/* 4. CIRCLE BUTTONS */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">4. Circular Action Buttons</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;CircleButton /&gt; in primary brand purple (#5B4DF5)
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  CircleButton.tsx
                </span>
              </div>

              <div className="flex items-start justify-around p-4 bg-gray-50/70 rounded-2xl">
                <CircleButton
                  icon={<Users className="w-5 h-5 stroke-[2.2]" />}
                  label="Toilets"
                  isActive={activeCircleBtn === 'toilets'}
                  onClick={() => setActiveCircleBtn('toilets')}
                />
                <CircleButton
                  icon={<Fuel className="w-5 h-5 stroke-[2.2]" />}
                  label={'Gas\nstations'}
                  isActive={activeCircleBtn === 'gas'}
                  onClick={() => setActiveCircleBtn('gas')}
                />
                <CircleButton
                  icon={<Utensils className="w-5 h-5 stroke-[2.2]" />}
                  label="Restaurants"
                  isActive={activeCircleBtn === 'restaurants'}
                  onClick={() => setActiveCircleBtn('restaurants')}
                />
                <CircleButton
                  icon={<Coffee className="w-5 h-5 stroke-[2.2]" />}
                  label="Cafes"
                  isActive={activeCircleBtn === 'cafes'}
                  onClick={() => setActiveCircleBtn('cafes')}
                />
                <CircleButton
                  icon={<MoreHorizontal className="w-5 h-5 stroke-[2.5]" />}
                  label="More"
                  isActive={activeCircleBtn === 'more'}
                  onClick={() => setActiveCircleBtn('more')}
                />
              </div>
            </section>

            {/* 5. LIST ITEM CARDS WITH VERTICAL INDICATOR */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5 md:col-span-2">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">5. List Item Cards</h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;ListItemCard /&gt; with vertical active indicator bar, stats & action links
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  ListItemCard.tsx
                </span>
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
                <ListItemCard
                  id="route-1"
                  icon={<Car className="w-5 h-5 fill-current" />}
                  title="via Trasa Bohaterów Bitwy Warszawskiej 1920"
                  subtitle="Fastest route, due to traffic."
                  primaryStat="2h 32m"
                  secondaryStat="249km"
                  actionText="Directions"
                  isActive={activeListItem === 'route-1'}
                  onClick={() => setActiveListItem('route-1')}
                  onActionClick={() => triggerNotice('Action link clicked: Directions')}
                />
                <ListItemCard
                  id="route-2"
                  icon={<Car className="w-5 h-5 fill-current" />}
                  title="via S8"
                  subtitle="Straight route, big traffic."
                  primaryStat="2h 55m"
                  secondaryStat="230km"
                  actionText="Directions"
                  isActive={activeListItem === 'route-2'}
                  onClick={() => setActiveListItem('route-2')}
                  onActionClick={() => triggerNotice('Action link clicked: Directions')}
                />
                <ListItemCard
                  id="route-3"
                  icon={<MapPin className="w-5 h-5" />}
                  title="via DK61 and Ostroleka Bypass"
                  subtitle="Scenic highway route, clear conditions."
                  primaryStat="3h 10m"
                  secondaryStat="262km"
                  actionText="Directions"
                  isActive={activeListItem === 'route-3'}
                  onClick={() => setActiveListItem('route-3')}
                  onActionClick={() => triggerNotice('Action link clicked: Directions')}
                />
              </div>
            </section>

            {/* 6. DROPDOWN, HEADER BAR, AND MAP CONTROLS */}
            <section className="bg-white rounded-3xl p-6 shadow-card border border-black/5 space-y-5 md:col-span-2">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    6. Dropdown, Header Bar & Map Controls
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">
                    &lt;Dropdown /&gt;, &lt;HeaderBar /&gt;, &lt;ZoomControls /&gt;, &lt;LocateButton /&gt;, &lt;SatelliteToggle /&gt;
                  </p>
                </div>
                <span className="text-[11px] font-mono bg-purple-50 text-[#5B4DF5] px-2 py-0.5 rounded-md font-semibold">
                  HeaderBar.tsx, Dropdown.tsx, MapControls.tsx
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                {/* Header Bar element */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2">Header Bar:</p>
                  <HeaderBar
                    title="Directions"
                    onMenuClick={() => triggerNotice('Menu clicked')}
                    onClose={() => triggerNotice('Close clicked')}
                  />
                </div>

                {/* Dropdown element */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-2">Dropdown Selector:</p>
                  <Dropdown
                    value={dropdownVal}
                    onChange={setDropdownVal}
                    options={[
                      { value: 'leave_now', label: 'Leave now' },
                      { value: 'depart_at', label: 'Depart at 08:30' },
                      { value: 'arrive_by', label: 'Arrive by 11:00' },
                    ]}
                  />
                </div>

                {/* Map Controls elements */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-around">
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-2">Satellite:</p>
                    <SatelliteToggle
                      isSatellite={isSatellite}
                      onToggle={() => setIsSatellite(!isSatellite)}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-2">Locate:</p>
                    <LocateButton onClick={() => triggerNotice('Centering on location')} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-2">Zoom:</p>
                    <ZoomControls
                      onZoomIn={() => triggerNotice('Zoom In')}
                      onZoomOut={() => triggerNotice('Zoom Out')}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      {/* Floating toast notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#5B4DF5] animate-pulse" />
            <span>{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
