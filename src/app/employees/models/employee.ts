interface Employee {
  id: string;
  client_id: string;
  job_position_id: string;
  national_identity: string;
  type: 'employee' | 'partner' | 'intern';
  name: string;
  birthdate: Date;
  active: boolean;
  salary: number;
}
