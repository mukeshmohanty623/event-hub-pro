import type { Event, EventInstance, Booking, StaffMember, YoungPerson, Family, Guardian } from "./types";

export const mockFamily: Family = {
  id: "fam-1",
  name: "MacGregor family",
  postcode: "FK10 1AB",
  phone_primary: "07700 123456",
  address_line_1: "14 Mill Street",
  town: "Alloa",
};

export const mockGuardian: Guardian = {
  id: "g-1",
  family_id: "fam-1",
  first_name: "Sarah",
  last_name: "MacGregor",
  email: "sarah.macgregor@email.com",
  phone: "07700 123456",
  is_primary: true,
};

export const mockChildren: YoungPerson[] = [
  {
    id: "yp-1",
    family_id: "fam-1",
    first_name: "Jamie",
    last_name: "MacGregor",
    preferred_name: "Jay",
    date_of_birth: "2014-03-15",
    school_name: "Alloa Academy",
    school_year: "P6",
    is_active: true,
    emergency_contact_name: "Sarah MacGregor",
    emergency_contact_phone: "07700 123456",
  },
  {
    id: "yp-2",
    family_id: "fam-1",
    first_name: "Isla",
    last_name: "MacGregor",
    date_of_birth: "2016-07-22",
    school_name: "Sunnyside Primary",
    school_year: "P4",
    is_active: true,
    emergency_contact_name: "Sarah MacGregor",
    emergency_contact_phone: "07700 123456",
  },
];

export const mockEvents: Event[] = [
  {
    id: "ev-1",
    name: "Friday Football",
    description: "Weekly football sessions for all abilities. Come along and have fun!",
    programme: "Sports",
    location_name: "Alloa Leisure Bowl",
    location_address: "Clackmannan Rd, Alloa",
    postcode: "FK10 1RY",
    age_min: 8,
    age_max: 14,
    capacity: 24,
    booking_required: true,
    drop_in_allowed: true,
    tags: ["after-school", "sports"],
    status: "active",
  },
  {
    id: "ev-2",
    name: "Creative Arts Workshop",
    description: "Express yourself through art, music and drama. All materials provided.",
    programme: "Arts",
    location_name: "OYCI Hub",
    location_address: "15 Primrose St, Alloa",
    postcode: "FK10 1JJ",
    age_min: 10,
    age_max: 16,
    capacity: 16,
    booking_required: true,
    drop_in_allowed: false,
    tags: ["after-school", "arts"],
    status: "active",
  },
  {
    id: "ev-3",
    name: "Holiday Adventure Camp",
    description: "A week of outdoor activities including hiking, canoeing and team challenges.",
    programme: "Holidays",
    location_name: "Gartmorn Dam",
    location_address: "Gartmorn Dam Country Park",
    postcode: "FK10 3AU",
    age_min: 8,
    age_max: 16,
    capacity: 20,
    booking_required: true,
    drop_in_allowed: false,
    tags: ["holiday", "outdoor"],
    status: "active",
  },
  {
    id: "ev-4",
    name: "Homework Club",
    description: "Quiet space with support to help with homework and studying.",
    programme: "Education",
    location_name: "OYCI Hub",
    location_address: "15 Primrose St, Alloa",
    postcode: "FK10 1JJ",
    age_min: 10,
    age_max: 18,
    capacity: 12,
    booking_required: false,
    drop_in_allowed: true,
    tags: ["after-school", "education"],
    status: "active",
  },
];

export const mockEventInstances: EventInstance[] = [
  { id: "ei-1", event_id: "ev-1", event_name: "Friday Football", date: "2026-03-27", start_time: "16:00", end_time: "17:30", capacity: 24, booked_count: 18, location_name: "Alloa Leisure Bowl", status: "scheduled" },
  { id: "ei-2", event_id: "ev-1", event_name: "Friday Football", date: "2026-04-03", start_time: "16:00", end_time: "17:30", capacity: 24, booked_count: 12, location_name: "Alloa Leisure Bowl", status: "scheduled" },
  { id: "ei-3", event_id: "ev-2", event_name: "Creative Arts Workshop", date: "2026-03-25", start_time: "15:30", end_time: "17:00", capacity: 16, booked_count: 14, location_name: "OYCI Hub", status: "scheduled" },
  { id: "ei-4", event_id: "ev-3", event_name: "Holiday Adventure Camp", date: "2026-04-07", start_time: "09:00", end_time: "15:00", capacity: 20, booked_count: 20, location_name: "Gartmorn Dam", status: "scheduled" },
  { id: "ei-5", event_id: "ev-4", event_name: "Homework Club", date: "2026-03-24", start_time: "15:30", end_time: "17:00", capacity: 12, booked_count: 5, location_name: "OYCI Hub", status: "scheduled" },
  { id: "ei-6", event_id: "ev-2", event_name: "Creative Arts Workshop", date: "2026-03-21", start_time: "15:30", end_time: "17:00", capacity: 16, booked_count: 16, location_name: "OYCI Hub", status: "in_progress" },
];

export const mockBookings: Booking[] = [
  { id: "b-1", event_instance_id: "ei-1", young_person_id: "yp-1", young_person_name: "Jamie MacGregor", guardian_id: "g-1", status: "confirmed", created_at: "2026-03-18T10:00:00Z" },
  { id: "b-2", event_instance_id: "ei-3", young_person_id: "yp-1", young_person_name: "Jamie MacGregor", guardian_id: "g-1", status: "confirmed", created_at: "2026-03-18T10:05:00Z" },
  { id: "b-3", event_instance_id: "ei-4", young_person_id: "yp-2", young_person_name: "Isla MacGregor", guardian_id: "g-1", status: "waitlisted", created_at: "2026-03-19T14:00:00Z" },
];

export const mockStaff: StaffMember[] = [
  { id: "s-1", first_name: "Claire", last_name: "Henderson", email: "claire@oyci.org.uk", role: "superadmin", is_active: true, phone: "07700 900001" },
  { id: "s-2", first_name: "Rory", last_name: "Campbell", email: "rory@oyci.org.uk", role: "coordinator", is_active: true, phone: "07700 900002" },
  { id: "s-3", first_name: "Aisha", last_name: "Patel", email: "aisha@oyci.org.uk", role: "staff", is_active: true, phone: "07700 900003" },
  { id: "s-4", first_name: "Marcus", last_name: "Brown", email: "marcus@oyci.org.uk", role: "staff", is_active: true, phone: "07700 900004" },
  { id: "s-5", first_name: "Fiona", last_name: "Wallace", email: "fiona@oyci.org.uk", role: "finance", is_active: true, phone: "07700 900005" },
  { id: "s-6", first_name: "Liam", last_name: "Stewart", email: "liam@oyci.org.uk", role: "staff", is_active: false, phone: "07700 900006" },
];

export const mockAttendance: Booking[] = [
  { id: "b-10", event_instance_id: "ei-6", young_person_id: "yp-1", young_person_name: "Jamie MacGregor", guardian_id: "g-1", status: "confirmed", attended: true, created_at: "2026-03-18T10:00:00Z" },
  { id: "b-11", event_instance_id: "ei-6", young_person_id: "yp-2", young_person_name: "Isla MacGregor", guardian_id: "g-1", status: "confirmed", attended: false, created_at: "2026-03-18T10:00:00Z" },
  { id: "b-12", event_instance_id: "ei-6", young_person_id: "yp-3", young_person_name: "Callum Reid", guardian_id: "g-2", status: "confirmed", attended: true, created_at: "2026-03-18T11:00:00Z" },
  { id: "b-13", event_instance_id: "ei-6", young_person_id: "yp-4", young_person_name: "Emma Thomson", guardian_id: "g-3", status: "confirmed", attended: undefined, created_at: "2026-03-18T11:30:00Z" },
];
