export interface Enrollment {
  id?: number;
  course_name: string;
  course_type: string;
  shift: string;
  institution_name: string;
  start_date: string;
  end_date: string;
  status: string;
  special_needs?: string;
}

export interface Aluno {
  id: number;
  name: string;
  academic_id: string;
  contact_phone: string;
  email: string;
  date_of_birth: string;
  enrollments: Enrollment[];
}