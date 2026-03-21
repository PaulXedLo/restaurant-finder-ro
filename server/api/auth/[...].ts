import { auth } from "../../../server/utils/auth";

export default defineEventHandler(async (e) => {
  return auth.handler(toWebRequest(e));
});
