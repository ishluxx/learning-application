import { LucideProps, LogIn,Users, Mail, Phone,Calendar,FolderIcon,FileText,ThumbsUp,MessageSquare, MapPin, Facebook,Image,Link, Twitter, Linkedin, Instagram, Calculator, FlaskConical, Landmark, Pen, Code, Briefcase } from "lucide-react"

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
  users:Users,
  facebook: Facebook,
  image:Image,
  messageSquare:MessageSquare,
  thumbsUp:ThumbsUp,
  link:Link,
  fileText:FileText,
  folder:FolderIcon,
  calendar:Calendar,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  calculator: Calculator,
  flask: FlaskConical,
  landmark: Landmark,
  pen: Pen,
  code: Code,
  briefcase: Briefcase,
  // Add more icons as needed
}