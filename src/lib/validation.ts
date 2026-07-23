import toast from "react-hot-toast";

export interface ValidationRule {
  field: any;
  message: string;
  /** Set to true if the field is a string and should be checked for emptiness after trimming whitespace */
  isString?: boolean;
}

/**
 * Common utility to validate a list of required fields.
 * If any field fails validation, it immediately shows a toast error and returns false.
 * Returns true if all fields pass validation.
 *
 * @param rules Array of validation rules
 * @returns boolean
 */
export const validateFields = (rules: ValidationRule[]): boolean => {
  for (const rule of rules) {
    if (rule.isString) {
      if (typeof rule.field !== "string" || !rule.field.trim()) {
        toast.error(rule.message);
        return false;
      }
    } else {
      if (!rule.field) {
        toast.error(rule.message);
        return false;
      }
    }
  }
  return true;
};
