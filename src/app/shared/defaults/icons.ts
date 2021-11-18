import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import {
  faHome,
  faBuilding,
  faSuitcase,
  faUsers,
  faPlaneDeparture
} from '@fortawesome/free-solid-svg-icons';

type IconsType = {
  home: IconDefinition;
  clients: IconDefinition;
  jobPositions: IconDefinition;
  employees: IconDefinition;
  employeeLeaves: IconDefinition;
};

const defaultIcons: IconsType = {
  home: faHome,
  clients: faBuilding,
  jobPositions: faSuitcase,
  employees: faUsers,
  employeeLeaves: faPlaneDeparture
};

export { IconsType, defaultIcons };
