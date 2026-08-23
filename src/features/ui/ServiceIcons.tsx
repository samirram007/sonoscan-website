/** Hover-state SVG icons for each medical service — replaces emoji on hover */
export const hoverIcons: Record<string, React.ReactNode> = {
  'primary-care': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  'mental-health': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.364-.364l-2.121 2.121M21 12h-3m-.364 6.364l-2.121-2.121M12 21v-3m-6.364.364l2.121-2.121M3 12h3m.364-6.364l2.121 2.121" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  'speciality-care': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 3.75v-1.5a.75.75 0 00-.75-.75H3.75a.75.75 0 00-.75.75v5.5a.75.75 0 00.75.75h5.5a.75.75 0 00.75-.75v-1.5m0-2.5l-3.75 3.75M21 21l-5.25-5.25m-2.25-1.5a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
    </svg>
  ),
  'dental-care': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5C8.5 4.5 6 7 6 10c0 3 1.5 5.5 2.5 7 .5.75 1 1.5 2 2 1 .5 2 0 2-1v-1.5c0-.83.5-1.5 1.5-1.5s1.5.67 1.5 1.5V18c0 1 1 .5 2-1 1-1.5 2.5-4 2.5-7 0-3-2.5-5.5-6-5.5z" />
    </svg>
  ),
  'eye-care': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  'skin-care': (
    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  ),
}

/** Hover-state SVG icons for each doctor specialty — replaces initials avatar on hover */
export const doctorHoverIcons: Record<string, React.ReactNode> = {
  'sarah-mitchell': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </div>
  ),
  'james-wilson': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    </div>
  ),
  'emily-chen': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    </div>
  ),
  'michael-torres': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.364-.364l-2.121 2.121M21 12h-3m-.364 6.364l-2.121-2.121M12 21v-3m-6.364.364l2.121-2.121M3 12h3m.364-6.364l2.121 2.121" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    </div>
  ),
  'lisa-patel': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    </div>
  ),
  'robert-kim': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    </div>
  ),
  'amanda-foster': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    </div>
  ),
  'david-nguyen': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    </div>
  ),
  'rachel-osei': (
    <div className="w-7 h-7 text-violet-600 flex items-center justify-center">
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    </div>
  ),
}
