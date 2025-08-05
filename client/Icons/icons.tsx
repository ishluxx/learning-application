import { LucideProps, LogIn, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Calculator, Briefcase, Code, Pen, Landmark, FlaskConical } from "lucide-react"

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <path d="M12 3v9l9 0" />
    </svg>
  ),
  login: LogIn,
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  calculator:Calculator,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  briefcase:Briefcase,
  code:Code,
  pen:Pen,
  landmark:Landmark,
  flask:FlaskConical
  // Add more icons as needed
}