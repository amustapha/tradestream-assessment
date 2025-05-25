import { useToast } from "vue-toastification";

const toast = useToast();

export const notify = (message: string, type = "info", timeout = 3000) => {
  switch (type) {
    case "info":
      toast.info(message, {
        timeout,
        hideProgressBar: true,
      });
      break;
    case "success":
      toast.success(message, {
        timeout,
        hideProgressBar: true,
      });
      break;
    case "error":
      toast.error(message, {
        timeout,
        hideProgressBar: true,
      });
      break;

    default:
      toast.info(message, {
        timeout,
        hideProgressBar: true,
      });
      break;
  }
};
