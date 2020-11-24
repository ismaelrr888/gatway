import * as Yup from "yup";

export const createDeviceSchema = Yup.object().shape({
  uid: Yup.string().uuid("Uid is not valid").required("Uid is required"),
  vendor: Yup.string().required("Vendor is required"),
  status: Yup.string().required("Status is required"),
});
