const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
  focusable: 'false' as const,
}

export function GithubIcon() {
  return (
    <svg {...base} fill="currentColor">
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49v-1.9c-2.84.62-3.44-1.2-3.44-1.2-.47-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.92 1.57 2.4 1.12 2.99.86.09-.67.36-1.12.65-1.38-2.27-.26-4.65-1.13-4.65-5.04 0-1.11.4-2.02 1.05-2.74-.11-.26-.46-1.3.1-2.71 0 0 .86-.28 2.8 1.05a9.7 9.7 0 0 1 5.1 0c1.94-1.33 2.8-1.05 2.8-1.05.56 1.41.21 2.45.1 2.71.65.72 1.05 1.63 1.05 2.74 0 3.92-2.39 4.78-4.66 5.03.37.32.7.94.7 1.9v2.82c0 .27.18.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  )
}

export function LinkedinIcon() {
  return (
    <svg {...base} fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.25h4V21H3V9.25ZM9.5 9.25h3.83v1.6h.05c.53-.95 1.84-1.95 3.78-1.95 4.04 0 4.79 2.5 4.79 5.76V21h-4v-5.5c0-1.31-.03-3-1.9-3-1.9 0-2.19 1.42-2.19 2.9V21h-4V9.25Z" />
    </svg>
  )
}

export function MailIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 7 7.5 5.4a2 2 0 0 0 2 0L20.5 7" />
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 19.5h16" />
    </svg>
  )
}

export function ArrowIcon() {
  return (
    <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13" />
      <path d="m12.5 6 6 6-6 6" />
    </svg>
  )
}

export function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 4h6v6" />
      <path d="M20 4 10.5 13.5" />
      <path d="M19 14.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6.5A1.5 1.5 0 0 1 5 5h4.5" />
    </svg>
  )
}

export function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </svg>
  )
}
