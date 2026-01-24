// components/CheckIcon.jsx

export default function CheckIcon({ className = "text-blue-600", ...props }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      // We keep the structural classes and allow dynamic ones via template literals
      className={`w-6 h-6 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      // {...props} allows you to pass extra attributes like 'id' or 'onClick' if needed
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
      <path d="M22 4L12 14.01l-3-3"></path>
    </svg>
  );
}
