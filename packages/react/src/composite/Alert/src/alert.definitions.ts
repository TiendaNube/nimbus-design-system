import {
  InfoCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@tiendanube/icons";

export const alertVariants = {
  neutral: {
    icon: InfoCircleIcon,
    role: "status",
  },
  primary: {
    icon: InfoCircleIcon,
    role: "status",
  },
  success: {
    icon: CheckCircleIcon,
    role: "status",
  },
  warning: {
    icon: ExclamationCircleIcon,
    role: "alert",
  },
  danger: {
    icon: ExclamationTriangleIcon,
    role: "alert",
  },
};
