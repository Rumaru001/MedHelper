import { links } from "./Links";

const rules = {
  0: {
    static: [
      links.personal_account.page,
      links.personal_account.settings,
      links.reminders,
      links.tag.list,
      links.tag.add,
      links.tag.edit,
      links.assignment.add,
      links.assignment.edit,
      links.assignment.view,
      links.medical_card,
      links.requests,
    ],
  },
  1: {
    static: [
      links.personal_account.page,
      links.personal_account.settings,
      links.reminders,
      links.tag.list,
      links.tag.add,
      links.tag.edit,
      links.assignment.add,
      links.assignment.edit,
      links.assignment.view,
      links.medical_card,
      links.requests,
      links.doctors,
    ],
  },
  2: {
    static: [
      links.personal_account.page,
      links.personal_account.settings,
      links.tag.list,
      links.tag.add,
      links.tag.edit,
      links.assignment.add,
      links.assignment.edit,
      links.assignment.view,
      links.requests,
      links.patients,
    ],
  },
};

export default rules;
