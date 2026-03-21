export interface Family {
  id: string;
  name: string;
  postcode: string;
  phone_primary: string;
  phone_secondary?: string;
  address_line_1?: string;
  town?: string;
}

export interface Guardian {
  id: string;
  family_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_primary: boolean;
}

export interface YoungPerson {
  id: string;
  family_id: string;
  first_name: string;
  last_name: string;
  preferred_name?: string;
  date_of_birth: string;
  school_name?: string;
  school_year?: string;
  additional_support_needs?: string;
  medical_info?: string;
  dietary_requirements?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  is_active: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  programme?: string;
  location_name: string;
  location_address: string;
  postcode: string;
  age_min: number;
  age_max: number;
  capacity: number;
  booking_required: boolean;
  drop_in_allowed: boolean;
  tags: string[];
  status: "active" | "archived";
}

export interface EventInstance {
  id: string;
  event_id: string;
  event_name: string;
  date: string;
  start_time: string;
  end_time: string;
  capacity: number;
  booked_count: number;
  location_name: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
}

export interface Booking {
  id: string;
  event_instance_id: string;
  young_person_id: string;
  young_person_name: string;
  guardian_id: string;
  status: "confirmed" | "waitlisted" | "cancelled";
  attended?: boolean;
  created_at: string;
}

export interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "superadmin" | "coordinator" | "staff" | "finance" | "reporting";
  is_active: boolean;
  phone?: string;
}

export type AdminRole = "superadmin" | "coordinator" | "staff" | "finance" | "reporting";
